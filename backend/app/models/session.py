from __future__ import annotations
import uuid
from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from sqlalchemy import String, Integer, ForeignKey, Text, Enum as SQLEnum, DateTime, func, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin
from app.core.enums import SessionStatus, InterviewRole, DifficultyLevel

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.question import Question
    from app.models.score import InterviewScore

class InterviewSession(Base, TimestampMixin):
    __tablename__ = "interview_sessions"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    question_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("questions.id", ondelete="SET NULL"), nullable=True, index=True
    )
    role: Mapped[InterviewRole] = mapped_column(
        SQLEnum(InterviewRole, native_enum=False), nullable=False
    )
    difficulty: Mapped[DifficultyLevel] = mapped_column(
        SQLEnum(DifficultyLevel, native_enum=False), nullable=False
    )
    status: Mapped[SessionStatus] = mapped_column(
        SQLEnum(SessionStatus, native_enum=False), default=SessionStatus.RECORDING, nullable=False
    )
    started_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    completed_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    user: Mapped[User] = relationship("User", back_populates="sessions")
    question: Mapped[Optional[Question]] = relationship("Question", back_populates="sessions")
    responses: Mapped[List[InterviewResponse]] = relationship(
        "InterviewResponse", back_populates="session", cascade="all, delete-orphan"
    )
    score: Mapped[Optional[InterviewScore]] = relationship(
        "InterviewScore", back_populates="session", uselist=False, cascade="all, delete-orphan"
    )

    __table_args__ = (
        Index("idx_sessions_user_started", "user_id", "started_at"),
    )

class InterviewResponse(Base):
    __tablename__ = "interview_responses"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    session_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("interview_sessions.id", ondelete="CASCADE"), nullable=False, index=True
    )
    transcript: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    audio_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    duration_seconds: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    session: Mapped[InterviewSession] = relationship("InterviewSession", back_populates="responses")