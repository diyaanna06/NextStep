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

from app.schemas.application import (
    ApplicationCreateRequest,
    ApplicationResponse,
    ApplicationStatusUpdateRequest
)

from app.services.application_service import (
    ApplicationService
)

router = APIRouter(
    prefix="/application",
    tags=["Applications"]
)


@router.post(
    "",
    response_model=ApplicationResponse,
    status_code=status.HTTP_201_CREATED
)
def create_application(
    application_data: ApplicationCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        return ApplicationService.create_application(
            db,
            current_user,
            application_data
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get(
    "/me",
    response_model=list[ApplicationResponse]
)
def get_my_applications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return (
        ApplicationService.get_student_applications(
            db,
            current_user.id
        )
    )


@router.get(
    "/opportunity/{opportunity_id}",
    response_model=list[ApplicationResponse]
)
def get_opportunity_applications(
    opportunity_id: int,
    db: Session = Depends(get_db)
):

    return (
        ApplicationService.get_opportunity_applications(
            db,
            opportunity_id
        )
    )

@router.put(
    "/{application_id}/status",
    response_model=ApplicationResponse
)
def update_application_status(
    application_id: int,
    status_data: ApplicationStatusUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        return ApplicationService.update_status(
            db,
            current_user,
            application_id,
            status_data.status
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )