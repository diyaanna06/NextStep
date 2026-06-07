from sqlalchemy.orm import Session

from app.models.organization_profile import (
    OrganizationProfile
)
from app.models.user import User
from app.repositories.organization_profile_repository import (
    OrganizationProfileRepository
)
from app.schemas.organization_profile import (
    OrganizationProfileCreateRequest,
    OrganizationProfileUpdateRequest
)


class OrganizationProfileService:

    @staticmethod
    def create_profile(
        db: Session,
        current_user: User,
        profile_data: OrganizationProfileCreateRequest
    ) -> OrganizationProfile:

        if current_user.role != "organization":
            raise ValueError(
                "Only organizations can create organization profiles"
            )

        existing_profile = (
            OrganizationProfileRepository.get_profile_by_user_id(
                db,
                current_user.id
            )
        )

        if existing_profile:
            raise ValueError(
                "Organization profile already exists"
            )

        return (
            OrganizationProfileRepository.create_profile(
                db,
                current_user.id,
                profile_data
            )
        )

    @staticmethod
    def get_profile(
        db: Session,
        user_id: int
    ) -> OrganizationProfile:

        profile = (
            OrganizationProfileRepository.get_profile_by_user_id(
                db,
                user_id
            )
        )

        if profile is None:
            raise ValueError(
                "Organization profile not found"
            )

        return profile

    @staticmethod
    def update_profile(
        db: Session,
        user_id: int,
        profile_data: OrganizationProfileUpdateRequest
    ) -> OrganizationProfile:

        profile = (
            OrganizationProfileRepository.get_profile_by_user_id(
                db,
                user_id
            )
        )

        if profile is None:
            raise ValueError(
                "Organization profile not found"
            )

        return (
            OrganizationProfileRepository.update_profile(
                db,
                profile,
                profile_data
            )
        )

    @staticmethod
    def get_all_organizations(
        db: Session
    ) -> list[OrganizationProfile]:

        return (
            OrganizationProfileRepository.get_all_organizations(
                db
            )
        )

    @staticmethod
    def get_organization_by_id(
        db: Session,
        organization_id: int
    ) -> OrganizationProfile:

        organization = (
            OrganizationProfileRepository.get_organization_by_id(
                db,
                organization_id
            )
        )

        if organization is None:
            raise ValueError(
                "Organization not found"
            )

        return organization