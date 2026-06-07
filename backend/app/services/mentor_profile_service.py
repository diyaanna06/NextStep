from sqlalchemy.orm import Session

from app.models.mentor_profile import MentorProfile
from app.models.user import User
from app.repositories.mentor_profile_repository import (
    MentorProfileRepository
)
from app.schemas.mentor_profile import (
    MentorProfileCreateRequest,
    MentorProfileUpdateRequest
)


class MentorProfileService:

    @staticmethod
    def create_profile(
        db: Session,
        current_user: User,
        profile_data: MentorProfileCreateRequest
    ) -> MentorProfile:

        if current_user.role != "mentor":
            raise ValueError(
                "Only mentors can create mentor profiles"
            )

        existing_profile = (
            MentorProfileRepository.get_profile_by_user_id(
                db,
                current_user.id
            )
        )

        if existing_profile:
            raise ValueError(
                "Mentor profile already exists"
            )

        return (
            MentorProfileRepository.create_profile(
                db,
                current_user.id,
                profile_data
            )
        )

    @staticmethod
    def get_profile(
        db: Session,
        user_id: int
    ) -> MentorProfile:

        profile = (
            MentorProfileRepository.get_profile_by_user_id(
                db,
                user_id
            )
        )

        if profile is None:
            raise ValueError(
                "Mentor profile not found"
            )

        return profile

    @staticmethod
    def update_profile(
        db: Session,
        user_id: int,
        profile_data: MentorProfileUpdateRequest
    ) -> MentorProfile:

        profile = (
            MentorProfileRepository.get_profile_by_user_id(
                db,
                user_id
            )
        )

        if profile is None:
            raise ValueError(
                "Mentor profile not found"
            )

        return (
            MentorProfileRepository.update_profile(
                db,
                profile,
                profile_data
            )
        )

    @staticmethod
    def get_all_mentors(
        db: Session
    ) -> list[MentorProfile]:

        return (
            MentorProfileRepository.get_all_mentors(
                db
            )
        )

    @staticmethod
    def get_mentor_by_id(
        db: Session,
        mentor_id: int
    ) -> MentorProfile:

        mentor = (
            MentorProfileRepository.get_mentor_by_id(
                db,
                mentor_id
            )
        )

        if mentor is None:
            raise ValueError(
                "Mentor not found"
            )

        return mentor
    @staticmethod
    def filter_mentors(
        db: Session,
        expertise: str | None = None,
        company: str | None = None,
        available: bool | None = None
    ) -> list[MentorProfile]:

        return MentorProfileRepository.filter_mentors(
            db,
            expertise,
            company,
            available
        )