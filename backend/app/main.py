import os
from contextlib import asynccontextmanager
# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.routers import auth, questions, interview, score, dashboard, upload
from app.core.seed import seed_questions

@asynccontextmanager
async def lifespan(app: FastAPI):
    os.makedirs(os.path.join(os.getcwd(), "uploads", "audio"), exist_ok=True)
    try:
        await seed_questions()
    except Exception as e:
        print(f"Seed startup status: {e}")
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(questions.router, prefix=settings.API_V1_STR)
app.include_router(interview.router, prefix=settings.API_V1_STR)
app.include_router(score.router, prefix=settings.API_V1_STR)
app.include_router(dashboard.router, prefix=settings.API_V1_STR)
app.include_router(upload.router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "ok",
        "project": settings.PROJECT_NAME,
        "environment": getattr(settings, "ENVIRONMENT", "development")
    }

if __name__ == "__main__":
    # pyrefly: ignore [missing-import]
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)