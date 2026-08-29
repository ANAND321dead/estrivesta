from __future__ import annotations
import uuid
from typing import Optional, List
from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from app.core.enums import InterviewRole, QuestionCategory, DifficultyLevel

class QuestionBase(BaseModel):
    category: QuestionCategory
    difficulty: DifficultyLevel
    role: InterviewRole
    question_text: str = Field(..., min_length=5)
    expected_topics: List[str] = Field(default_factory=list)
    sample_answer: Optional[str] = None

class QuestionCreate(QuestionBase):
    pass

class QuestionUpdate(BaseModel):
    category: Optional[QuestionCategory] = None
    difficulty: Optional[DifficultyLevel] = None
    role: Optional[InterviewRole] = None
    question_text: Optional[str] = Field(None, min_length=5)
    expected_topics: Optional[List[str]] = None
    sample_answer: Optional[str] = None
    is_active: Optional[bool] = None

class QuestionResponse(QuestionBase):
    id: uuid.UUID
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class PaginatedQuestionsResponse(BaseModel):
    items: List[QuestionResponse]
    total: int
    page: int
    page_size: int
    total_pages: int