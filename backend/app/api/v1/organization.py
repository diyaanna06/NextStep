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
from app.schemas.organization_profile import (
    OrganizationProfileCreateRequest,
    OrganizationProfileUpdateRequest,
    OrganizationProfileResponse
)
from app.services.organization_profile_service import (
    OrganizationProfileService
)

router = APIRouter(
    prefix="/organization",
    tags=["Organizations"]
)


@router.post(
    "/profile",
    response_model=OrganizationProfileResponse,
    status_code=status.HTTP_201_CREATED
)
def create_profile(
    profile_data: OrganizationProfileCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        return OrganizationProfileService.create_profile(
            db,
            current_user,
            profile_data
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get(
    "/profile/me",
    response_model=OrganizationProfileResponse
)
def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        return OrganizationProfileService.get_profile(
            db,
            current_user.id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.put(
    "/profile/me",
    response_model=OrganizationProfileResponse
)
def update_profile(
    profile_data: OrganizationProfileUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        return OrganizationProfileService.update_profile(
            db,
            current_user.id,
            profile_data
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.get(
    "",
    response_model=list[OrganizationProfileResponse]
)
def get_all_organizations(
    db: Session = Depends(get_db)
):

    return (
        OrganizationProfileService.get_all_organizations(
            db
        )
    )


@router.get(
    "/{organization_id}",
    response_model=OrganizationProfileResponse
)
def get_organization(
    organization_id: int,
    db: Session = Depends(get_db)
):

    try:
        return (
            OrganizationProfileService.get_organization_by_id(
                db,
                organization_id
            )
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )