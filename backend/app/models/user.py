from __future__ import annotations
import uuid
from typing import Optional, List, TYPE_CHECKING
from sqlalchemy import String, Boolean, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin
from app.core.enums import UserRole

if TYPE_CHECKING:
    from app.models.session import InterviewSession

class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    avatar_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    provider: Mapped[str] = mapped_column(String(50), default="email", nullable=False)
    google_id: Mapped[Optional[str]] = mapped_column(String(255), unique=True, nullable=True)
    role: Mapped[UserRole] = mapped_column(
        SQLEnum(UserRole, native_enum=False), default=UserRole.USER, nullable=False
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    sessions: Mapped[List[InterviewSession]] = relationship("InterviewSession", back_populates="user", cascade="all, delete-orphan")