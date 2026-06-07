from sqlalchemy.orm import Session

from app.models.organization_profile import (
    OrganizationProfile
)
from app.schemas.organization_profile import (
    OrganizationProfileCreateRequest,
    OrganizationProfileUpdateRequest
)


class OrganizationProfileRepository:

    @staticmethod
    def create_profile(
        db: Session,
        user_id: int,
        profile_data: OrganizationProfileCreateRequest
    ) -> OrganizationProfile:

        profile = OrganizationProfile(
            user_id=user_id,
            organization_name=profile_data.organization_name,
            industry=profile_data.industry,
            website=profile_data.website,
            description=profile_data.description,
            location=profile_data.location
        )

        db.add(profile)
        db.commit()
        db.refresh(profile)

        return profile

    @staticmethod
    def get_profile_by_user_id(
        db: Session,
        user_id: int
    ) -> OrganizationProfile | None:

        return (
            db.query(OrganizationProfile)
            .filter(
                OrganizationProfile.user_id == user_id
            )
            .first()
        )

    @staticmethod
    def update_profile(
        db: Session,
        profile: OrganizationProfile,
        profile_data: OrganizationProfileUpdateRequest
    ) -> OrganizationProfile:

        updates = profile_data.model_dump(
            exclude_unset=True
        )

        for field, value in updates.items():
            setattr(profile, field, value)

        db.commit()
        db.refresh(profile)

        return profile

    @staticmethod
    def get_all_organizations(
        db: Session
    ) -> list[OrganizationProfile]:

        return (
            db.query(OrganizationProfile)
            .all()
        )

    @staticmethod
    def get_organization_by_id(
        db: Session,
        organization_id: int
    ) -> OrganizationProfile | None:

        return (
            db.query(OrganizationProfile)
            .filter(
                OrganizationProfile.user_id
                == organization_id
            )
            .first()
        )