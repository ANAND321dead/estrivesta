import json
from typing import Optional, List, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "InterviewAI API"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = Field("development", description="development | staging | production")
    
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "interview_ai"
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/interview_ai"
    
    SECRET_KEY: str = Field("super_secret_jwt_key_interview_ai_2026_dev_secure", description="JWT Secret Key")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            v_trimmed = v.strip()
            if v_trimmed.startswith("["):
                try:
                    return json.loads(v_trimmed)
                except Exception:
                    pass
            return [i.strip() for i in v_trimmed.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return ["http://localhost:5173", "http://localhost:3000"]

    GOOGLE_CLIENT_ID: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None

    MAX_UPLOAD_SIZE_BYTES: int = 50 * 1024 * 1024
    ALLOWED_AUDIO_MIME_TYPES: List[str] = [
        "audio/webm", "audio/wav", "audio/x-wav", "audio/mpeg",
        "audio/mp3", "audio/m4a", "audio/ogg", "audio/x-m4a"
    ]
    STORAGE_PROVIDER: str = "local"
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_REGION: str = "us-east-1"
    AWS_S3_BUCKET_NAME: Optional[str] = None

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()