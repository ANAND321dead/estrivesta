import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.database import AsyncSessionLocal
from app.models.question import Question
from app.core.enums import InterviewRole, QuestionCategory, DifficultyLevel

SAMPLE_QUESTIONS = [
    {
        "category": QuestionCategory.BEHAVIORAL,
        "difficulty": DifficultyLevel.MEDIUM,
        "role": InterviewRole.SOFTWARE_ENGINEER,
        "question_text": "Tell me about a time when you had a disagreement with a team member on a technical design. How did you resolve it?",
        "expected_topics": ["Conflict Resolution", "Technical Communication", "Trade-off Analysis", "Empathy"],
        "sample_answer": "I focused on objective criteria by setting up a benchmark performance comparison and weighing trade-offs together..."
    },
    {
        "category": QuestionCategory.TECHNICAL,
        "difficulty": DifficultyLevel.MEDIUM,
        "role": InterviewRole.SOFTWARE_ENGINEER,
        "question_text": "How does Garbage Collection work in Python or Java, and how can you diagnose memory leaks in production?",
        "expected_topics": ["Memory Management", "Reference Counting", "Heap/Stack", "Profiling Tools"],
        "sample_answer": "Python uses reference counting supplemented by a generational garbage collector to detect reference cycles..."
    },
    {
        "category": QuestionCategory.SYSTEM_DESIGN,
        "difficulty": DifficultyLevel.HARD,
        "role": InterviewRole.SYSTEM_DESIGNER,
        "question_text": "Design a distributed rate-limiting service capable of handling millions of requests per second.",
        "expected_topics": ["Token Bucket", "Sliding Window", "Redis Cluster", "Latency & Availability"],
        "sample_answer": "I would design a distributed sliding window counter using Redis with atomic Lua scripts..."
    }
]

async def seed_questions():
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(func.count(Question.id)))
        count = result.scalar_one()
        if count == 0:
            for q_data in SAMPLE_QUESTIONS:
                db.add(Question(**q_data, is_active=True))
            await db.commit()
            print(f"Seeded {len(SAMPLE_QUESTIONS)} sample interview questions into database.")

if __name__ == "__main__":
    asyncio.run(seed_questions())