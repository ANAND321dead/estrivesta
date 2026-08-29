import uuid
# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.dependencies import get_db, get_current_user
from app.models.user import User
from app.models.score import InterviewScore
from app.models.session import InterviewSession
from app.schemas.score import ScoreResponse
from app.services.score import FeedbackGenerationService

router = APIRouter(prefix="/scoring", tags=["AI Interview Scoring"])

@router.post("/evaluate/{session_id}", response_model=ScoreResponse, status_code=status.HTTP_201_CREATED)
async def evaluate_session(session_id: uuid.UUID, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await FeedbackGenerationService.evaluate_and_store_session(db, current_user, session_id)

@router.get("/session/{session_id}", response_model=ScoreResponse)
async def get_session_score(session_id: uuid.UUID, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(InterviewScore).join(InterviewSession).where(InterviewScore.session_id == session_id, InterviewSession.user_id == current_user.id))
    score = result.scalar_one_or_none()
    if not score:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Score not found")
    return score