from sqlalchemy.orm import Session

from app.models.student_profile import StudentProfile
from app.schemas.student_profile import (
    ProfileCreateRequest,
    ProfileUpdateRequest
)


class StudentProfileRepository:

    @staticmethod
    def create_profile(
        db: Session,
        user_id: int,
        profile_data: ProfileCreateRequest
    ) -> StudentProfile:

        profile = StudentProfile(
            user_id=user_id,
            full_name=profile_data.full_name,
            college=profile_data.college,
            degree=profile_data.degree,
            graduation_year=profile_data.graduation_year,
            skills=profile_data.skills,
            career_interests=profile_data.career_interests,
            
        )

        db.add(profile)
        db.commit()
        db.refresh(profile)

        return profile

    @staticmethod
    def get_profile_by_user_id(
        db: Session,
        user_id: int
    ) -> StudentProfile | None:

        return (
            db.query(StudentProfile)
            .filter(StudentProfile.user_id == user_id)
            .first()
        )

    @staticmethod
    def update_profile(
        db: Session,
        profile: StudentProfile,
        profile_data: ProfileUpdateRequest
    ) -> StudentProfile:

        updates = profile_data.model_dump(
            exclude_unset=True
        )

        for field, value in updates.items():
            setattr(profile, field, value)

        db.commit()
        db.refresh(profile)

        return profile
    @staticmethod
    def update_resume_metadata(
        db: Session,
        profile: StudentProfile,
        s3_key: str,
        filename: str,
        uploaded_at
    ) -> StudentProfile:

        profile.resume_s3_key = s3_key
        profile.resume_filename = filename
        profile.resume_uploaded_at = uploaded_at

        db.commit()
        db.refresh(profile)

        return profile
    @staticmethod
    def clear_resume_metadata(
        db: Session,
        profile: StudentProfile
    ) -> StudentProfile:

        profile.resume_s3_key = None
        profile.resume_filename = None
        profile.resume_uploaded_at = None

        db.commit()
        db.refresh(profile)

        return profile
    @staticmethod
    def update_resume_metadata(
        db: Session,
        profile: StudentProfile,
        s3_key: str,
        filename: str,
        uploaded_at
    ) -> StudentProfile:

        profile.resume_s3_key = s3_key
        profile.resume_filename = filename
        profile.resume_uploaded_at = uploaded_at

        db.commit()
        db.refresh(profile)

        return profile


    @staticmethod
    def clear_resume_metadata(
        db: Session,
        profile: StudentProfile
    ) -> StudentProfile:

        profile.resume_s3_key = None
        profile.resume_filename = None
        profile.resume_uploaded_at = None

        db.commit()
        db.refresh(profile)

        return profile