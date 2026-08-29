# pyrefly: ignore [missing-import]
import bcrypt
from datetime import datetime, timedelta, timezone
from typing import Optional, Any, Dict
from jose import jwt, JWTError
from app.core.config import settings

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def create_token(
    subject: str,
    token_type: str,
    expires_delta: timedelta,
    additional_claims: Optional[Dict[str, Any]] = None
) -> str:
    now = datetime.now(timezone.utc)
    expire = now + expires_delta
    to_encode = {"sub": str(subject), "type": token_type, "exp": expire, "iat": now}
    if additional_claims:
        to_encode.update(additional_claims)
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def create_access_token(subject: str) -> str:
    return create_token(subject, "access", timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))

def create_refresh_token(subject: str) -> str:
    return create_token(subject, "refresh", timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS))

def decode_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except JWTError:
        return None