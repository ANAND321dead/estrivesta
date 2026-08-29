from __future__ import annotations
import uuid
from typing import List, TYPE_CHECKING
from datetime import datetime
from sqlalchemy import Float, ForeignKey, JSON, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

if TYPE_CHECKING:
    from app.models.session import InterviewSession

class InterviewScore(Base):
    __tablename__ = "interview_scores"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    session_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("interview_sessions.id", ondelete="CASCADE"), nullable=False, unique=True, index=True
    )
    communication: Mapped[float] = mapped_column(Float, nullable=False)
    technical: Mapped[float] = mapped_column(Float, nullable=False)
    confidence: Mapped[float] = mapped_column(Float, nullable=False)
    structure: Mapped[float] = mapped_column(Float, nullable=False)
    relevance: Mapped[float] = mapped_column(Float, nullable=False)
    overall: Mapped[float] = mapped_column(Float, nullable=False)

    strengths: Mapped[List[str]] = mapped_column(JSON, default=list, nullable=False)
    weaknesses: Mapped[List[str]] = mapped_column(JSON, default=list, nullable=False)
    recommendations: Mapped[List[str]] = mapped_column(JSON, default=list, nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    session: Mapped[InterviewSession] = relationship("InterviewSession", back_populates="score")