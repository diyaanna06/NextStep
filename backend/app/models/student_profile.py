from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text
)
from sqlalchemy.orm import relationship

from app.db.base import Base


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        primary_key=True
    )

    full_name = Column(
        String,
        nullable=False
    )

    college = Column(
        String,
        nullable=False
    )

    degree = Column(
        String,
        nullable=False
    )

    graduation_year = Column(
        Integer,
        nullable=False
    )

    skills = Column(
        Text,
        nullable=True
    )

    career_interests = Column(
        Text,
        nullable=True
    )

    resume_s3_key = Column(
    String,
    nullable=True
    )

    resume_filename = Column(
        String,
        nullable=True
    )

    resume_uploaded_at = Column(
        DateTime,
        nullable=True
    )

    user = relationship(
        "User",
        back_populates="student_profile"
    )