from sqlalchemy import (
    Boolean,
    ForeignKey,
    Integer,
    String,
    Text
)
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class MentorProfile(Base):
    __tablename__ = "mentor_profiles"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        primary_key=True
    )

    full_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    current_role: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    company: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    years_of_experience: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    expertise_areas: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    availability_status: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    user = relationship(
        "User",
        back_populates="mentor_profile"
    )