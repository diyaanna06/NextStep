from sqlalchemy.orm import Session

from app.models.student_profile import StudentProfile
from app.schemas.student_profile import (
    ProfileCreateRequest,
    ProfileUpdateRequest
)
from app.repositories.student_profile_repository import (
    StudentProfileRepository
)


class StudentProfileService:

    @staticmethod
    def create_profile(
        db: Session,
        user_id: int,
        profile_data: ProfileCreateRequest
    ) -> StudentProfile:

        existing_profile = (
            StudentProfileRepository.get_profile_by_user_id(
                db,
                user_id
            )
        )

        if existing_profile:
            raise ValueError(
                "Profile already exists"
            )

        return (
            StudentProfileRepository.create_profile(
                db,
                user_id,
                profile_data
            )
        )

    @staticmethod
    def get_profile(
        db: Session,
        user_id: int
    ) -> StudentProfile:

        profile = (
            StudentProfileRepository.get_profile_by_user_id(
                db,
                user_id
            )
        )

        if profile is None:
            raise ValueError(
                "Profile not found"
            )

        return profile

    @staticmethod
    def update_profile(
        db: Session,
        user_id: int,
        profile_data: ProfileUpdateRequest
    ) -> StudentProfile:

        profile = (
            StudentProfileRepository.get_profile_by_user_id(
                db,
                user_id
            )
        )

        if profile is None:
            raise ValueError(
                "Profile not found"
            )

        return (
            StudentProfileRepository.update_profile(
                db,
                profile,
                profile_data
            )
        )