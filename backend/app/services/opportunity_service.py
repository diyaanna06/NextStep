from sqlalchemy.orm import Session

from app.models.opportunity import Opportunity
from app.models.user import User

from app.repositories.organization_profile_repository import (
    OrganizationProfileRepository
)
from app.repositories.opportunity_repository import (
    OpportunityRepository
)

from app.schemas.opportunity import (
    OpportunityCreateRequest,
    OpportunityUpdateRequest
)


class OpportunityService:

    @staticmethod
    def create_opportunity(
        db: Session,
        current_user: User,
        opportunity_data: OpportunityCreateRequest
    ) -> Opportunity:

        if current_user.role != "organization":
            raise ValueError(
                "Only organizations can create opportunities"
            )

        organization_profile = (
            OrganizationProfileRepository.get_profile_by_user_id(
                db,
                current_user.id
            )
        )

        if organization_profile is None:
            raise ValueError(
                "Organization profile not found"
            )

        return (
            OpportunityRepository.create_opportunity(
                db,
                current_user.id,
                opportunity_data
            )
        )

    @staticmethod
    def get_opportunity(
        db: Session,
        opportunity_id: int
    ) -> Opportunity:

        opportunity = (
            OpportunityRepository.get_opportunity_by_id(
                db,
                opportunity_id
            )
        )

        if opportunity is None:
            raise ValueError(
                "Opportunity not found"
            )

        return opportunity

    @staticmethod
    def update_opportunity(
        db: Session,
        opportunity_id: int,
        opportunity_data: OpportunityUpdateRequest
    ) -> Opportunity:

        opportunity = (
            OpportunityRepository.get_opportunity_by_id(
                db,
                opportunity_id
            )
        )

        if opportunity is None:
            raise ValueError(
                "Opportunity not found"
            )

        return (
            OpportunityRepository.update_opportunity(
                db,
                opportunity,
                opportunity_data
            )
        )

    @staticmethod
    def get_all_opportunities(
        db: Session
    ) -> list[Opportunity]:

        return (
            OpportunityRepository.get_all_opportunities(
                db
            )
        )

    @staticmethod
    def get_organization_opportunities(
        db: Session,
        organization_id: int
    ) -> list[Opportunity]:

        return (
            OpportunityRepository.get_organization_opportunities(
                db,
                organization_id
            )
        )
    @staticmethod
    def filter_opportunities(
        db: Session,
        opportunity_type: str | None = None,
        location: str | None = None,
        is_active: bool | None = None
    ):

        return (
            OpportunityRepository.filter_opportunities(
                db,
                opportunity_type,
                location,
                is_active
            )
        )