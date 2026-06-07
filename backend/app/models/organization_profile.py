from sqlalchemy import (
    Boolean,
    ForeignKey,
    String,
    Text
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.db.base import Base


class OrganizationProfile(Base):
    __tablename__ = "organization_profiles"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        primary_key=True
    )

    organization_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    industry: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    website: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    location: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    user = relationship(
        "User",
        back_populates="organization_profile"
    )
    opportunities = relationship(
    "Opportunity",
    back_populates="organization"
)