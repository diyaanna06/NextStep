from sqlalchemy.orm import Session
from datetime import datetime
from app.models.student_profile import StudentProfile
from app.schemas.student_profile import (
    ProfileCreateRequest,
    ProfileUpdateRequest
)
from app.repositories.student_profile_repository import (
    StudentProfileRepository
)


from app.services.s3_service import (
    upload_resume as upload_resume_to_s3,
    generate_presigned_url,
    delete_resume as delete_resume_from_s3
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
    @staticmethod
    def upload_resume(
        db: Session,
        user_id: int,
        file
    ):

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

        object_key = (
            upload_resume_to_s3(
                file.file,
                user_id
            )
        )

        uploaded_profile = (
            StudentProfileRepository.update_resume_metadata(
                db,
                profile,
                object_key,
                file.filename,
                datetime.utcnow()
            )
        )

        return uploaded_profile
    @staticmethod
    def get_resume_url(
        db: Session,
        user_id: int
    ) -> str:

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

        if not profile.resume_s3_key:
            raise ValueError(
                "Resume not found"
            )

        return generate_presigned_url(
            profile.resume_s3_key
        )
    @staticmethod
    def delete_resume(
        db: Session,
        user_id: int
    ):

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

        if not profile.resume_s3_key:
            raise ValueError(
                "Resume not found"
            )

        delete_resume_from_s3(
            profile.resume_s3_key
        )

        StudentProfileRepository.clear_resume_metadata(
            db,
            profile
        )