from __future__ import annotations
import uuid
from typing import Optional, List, TYPE_CHECKING
from sqlalchemy import String, Text, Enum as SQLEnum, Boolean, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin
from app.core.enums import InterviewRole, QuestionCategory, DifficultyLevel

if TYPE_CHECKING:
    from app.models.session import InterviewSession

class Question(Base, TimestampMixin):
    __tablename__ = "questions"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    category: Mapped[QuestionCategory] = mapped_column(
        SQLEnum(QuestionCategory, native_enum=False), nullable=False, index=True
    )
    difficulty: Mapped[DifficultyLevel] = mapped_column(
        SQLEnum(DifficultyLevel, native_enum=False), nullable=False, index=True
    )
    role: Mapped[InterviewRole] = mapped_column(
        SQLEnum(InterviewRole, native_enum=False), nullable=False, index=True
    )
    question_text: Mapped[str] = mapped_column(Text, nullable=False)
    expected_topics: Mapped[List[str]] = mapped_column(JSON, default=list, nullable=False)
    sample_answer: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    sessions: Mapped[List[InterviewSession]] = relationship("InterviewSession", back_populates="question")