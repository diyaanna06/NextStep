from sqlalchemy.orm import Session

from app.models.mentor_profile import MentorProfile
from app.schemas.mentor_profile import (
    MentorProfileCreateRequest,
    MentorProfileUpdateRequest
)


class MentorProfileRepository:

    @staticmethod
    def create_profile(
        db: Session,
        user_id: int,
        profile_data: MentorProfileCreateRequest
    ) -> MentorProfile:

        profile = MentorProfile(
            user_id=user_id,
            full_name=profile_data.full_name,
            current_role=profile_data.current_role,
            company=profile_data.company,
            years_of_experience=profile_data.years_of_experience,
            expertise_areas=profile_data.expertise_areas,
            availability_status=profile_data.availability_status
        )

        db.add(profile)
        db.commit()
        db.refresh(profile)

        return profile

    @staticmethod
    def get_profile_by_user_id(
        db: Session,
        user_id: int
    ) -> MentorProfile | None:

        return (
            db.query(MentorProfile)
            .filter(MentorProfile.user_id == user_id)
            .first()
        )

    @staticmethod
    def update_profile(
        db: Session,
        profile: MentorProfile,
        profile_data: MentorProfileUpdateRequest
    ) -> MentorProfile:

        updates = profile_data.model_dump(
            exclude_unset=True
        )

        for field, value in updates.items():
            setattr(profile, field, value)

        db.commit()
        db.refresh(profile)

        return profile

    @staticmethod
    def get_all_mentors(
        db: Session
    ) -> list[MentorProfile]:

        return (
            db.query(MentorProfile)
            .all()
        )

    @staticmethod
    def get_mentor_by_id(
        db: Session,
        mentor_id: int
    ) -> MentorProfile | None:

        return (
            db.query(MentorProfile)
            .filter(MentorProfile.user_id == mentor_id)
            .first()
        )
    @staticmethod
    def filter_mentors(
        db: Session,
        expertise: str | None = None,
        company: str | None = None,
        available: bool | None = None
    ) -> list[MentorProfile]:

        query = db.query(MentorProfile)

        if expertise:
            query = query.filter(
                MentorProfile.expertise_areas.ilike(
                    f"%{expertise}%"
                )
            )

        if company:
            query = query.filter(
                MentorProfile.company.ilike(
                    f"%{company}%"
                )
            )

        if available is not None:
            query = query.filter(
                MentorProfile.availability_status == available
            )

        return query.all()