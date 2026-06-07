from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.session import get_db
from app.models.user import User

from app.schemas.opportunity import (
    OpportunityCreateRequest,
    OpportunityUpdateRequest,
    OpportunityResponse
)

from app.services.opportunity_service import (
    OpportunityService
)

router = APIRouter(
    prefix="/opportunity",
    tags=["Opportunities"]
)


@router.post(
    "",
    response_model=OpportunityResponse,
    status_code=status.HTTP_201_CREATED
)
def create_opportunity(
    opportunity_data: OpportunityCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        return OpportunityService.create_opportunity(
            db,
            current_user,
            opportunity_data
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get(
    "",
    response_model=list[OpportunityResponse]
)
def get_all_opportunities(
    opportunity_type: str | None = None,
    location: str | None = None,
    is_active: bool | None = None,
    db: Session = Depends(get_db)
):

    if (
        opportunity_type is not None or
        location is not None or
        is_active is not None
    ):
        return (
            OpportunityService.filter_opportunities(
                db,
                opportunity_type,
                location,
                is_active
            )
        )

    return (
        OpportunityService.get_all_opportunities(
            db
        )
    )


@router.get(
    "/{opportunity_id}",
    response_model=OpportunityResponse
)
def get_opportunity(
    opportunity_id: int,
    db: Session = Depends(get_db)
):

    try:
        return OpportunityService.get_opportunity(
            db,
            opportunity_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.put(
    "/{opportunity_id}",
    response_model=OpportunityResponse
)
def update_opportunity(
    opportunity_id: int,
    opportunity_data: OpportunityUpdateRequest,
    db: Session = Depends(get_db)
):

    try:
        return OpportunityService.update_opportunity(
            db,
            opportunity_id,
            opportunity_data
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.get(
    "/organization/{organization_id}",
    response_model=list[OpportunityResponse]
)
def get_organization_opportunities(
    organization_id: int,
    db: Session = Depends(get_db)
):

    return (
        OpportunityService.get_organization_opportunities(
            db,
            organization_id
        )
    )