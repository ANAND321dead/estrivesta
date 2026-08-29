from __future__ import annotations
import uuid
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.core.enums import SessionStatus, InterviewRole, DifficultyLevel
from app.schemas.question import QuestionResponse

class InterviewStartRequest(BaseModel):
    role: InterviewRole
    difficulty: DifficultyLevel
    question_id: Optional[uuid.UUID] = None

class InterviewResponseOut(BaseModel):
    id: uuid.UUID
    session_id: uuid.UUID
    transcript: Optional[str] = None
    audio_url: Optional[str] = None
    duration_seconds: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class InterviewSessionDetail(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    question_id: Optional[uuid.UUID] = None
    role: InterviewRole
    difficulty: DifficultyLevel
    status: SessionStatus
    started_at: datetime
    completed_at: Optional[datetime] = None
    created_at: datetime
    question: Optional[QuestionResponse] = None
    responses: List[InterviewResponseOut] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True)

class InterviewHistoryResponse(BaseModel):
    items: List[InterviewSessionDetail]
    total: int