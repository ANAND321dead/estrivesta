from enum import Enum

class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"

class InterviewRole(str, Enum):
    SOFTWARE_ENGINEER = "software_engineer"
    PRODUCT_MANAGER = "product_manager"
    DATA_SCIENTIST = "data_scientist"
    SYSTEM_DESIGNER = "system_designer"
    LEADERSHIP = "leadership"

class QuestionCategory(str, Enum):
    BEHAVIORAL = "behavioral"
    TECHNICAL = "technical"
    SYSTEM_DESIGN = "system_design"
    LEADERSHIP = "leadership"

class DifficultyLevel(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class SessionStatus(str, Enum):
    DRAFT = "draft"
    RECORDING = "recording"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"