from sqlalchemy.orm import Session
from datetime import datetime
from app.models.opportunity import Opportunity
from app.schemas.opportunity import (
    OpportunityCreateRequest,
    OpportunityUpdateRequest
)


class OpportunityRepository:

    @staticmethod
    def create_opportunity(
        db: Session,
        organization_id: int,
        opportunity_data: OpportunityCreateRequest
    ) -> Opportunity:

        opportunity = Opportunity(
            organization_id=organization_id,
            title=opportunity_data.title,
            description=opportunity_data.description,
            opportunity_type=opportunity_data.opportunity_type,
            location=opportunity_data.location,
            skills_required=opportunity_data.skills_required,
            application_deadline=opportunity_data.application_deadline
        )

        db.add(opportunity)
        db.commit()
        db.refresh(opportunity)

        return opportunity

    @staticmethod
    def get_opportunity_by_id(
        db: Session,
        opportunity_id: int
    ) -> Opportunity | None:

        return (
            db.query(Opportunity)
            .filter(
                Opportunity.id == opportunity_id
            )
            .first()
        )

    @staticmethod
    def update_opportunity(
        db: Session,
        opportunity: Opportunity,
        opportunity_data: OpportunityUpdateRequest
    ) -> Opportunity:

        updates = opportunity_data.model_dump(
            exclude_unset=True
        )

        for field, value in updates.items():
            setattr(opportunity, field, value)

        db.commit()
        db.refresh(opportunity)

        return opportunity

   

    @staticmethod
    def get_all_opportunities(
        db: Session
    ) -> list[Opportunity]:

        opportunities = (
            db.query(Opportunity)
            .all()
        )

        updated = False

        for opportunity in opportunities:

            if (
                opportunity.is_active and
                opportunity.application_deadline.date() < datetime.today().date()
            ):

                opportunity.is_active = False
                updated = True

        if updated:
            db.commit()

        return opportunities

    @staticmethod
    def get_organization_opportunities(
        db: Session,
        organization_id: int
    ) -> list[Opportunity]:

        return (
            db.query(Opportunity)
            .filter(
                Opportunity.organization_id
                == organization_id
            )
            .all()
        )
    @staticmethod
    def filter_opportunities(
        db: Session,
        opportunity_type: str | None = None,
        location: str | None = None,
        is_active: bool | None = None
    ) -> list[Opportunity]:

        query = db.query(Opportunity)

        if opportunity_type:
            query = query.filter(
                Opportunity.opportunity_type.ilike(
                    f"%{opportunity_type}%"
                )
            )

        if location:
            query = query.filter(
                Opportunity.location.ilike(
                    f"%{location}%"
                )
            )

        if is_active is not None:
            query = query.filter(
                Opportunity.is_active == is_active
            )

        return query.all()