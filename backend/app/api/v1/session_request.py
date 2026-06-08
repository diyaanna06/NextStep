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

from app.schemas.session_request import (
    SessionRequestCreateRequest,
    SessionRequestResponse,
    SessionRequestStatusUpdateRequest
)

from app.services.session_request_service import (
    SessionRequestService
)

router = APIRouter(
    prefix="/session-request",
    tags=["Session Requests"]
)


@router.post(
    "",
    response_model=SessionRequestResponse,
    status_code=status.HTTP_201_CREATED
)
def create_session_request(
    request_data: SessionRequestCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        return (
            SessionRequestService.create_session_request(
                db,
                current_user,
                request_data
            )
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get(
    "/me",
    response_model=list[SessionRequestResponse]
)
def get_my_requests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return (
        SessionRequestService.get_student_requests(
            db,
            current_user.id
        )
    )


@router.get(
    "/mentor/{mentor_id}",
    response_model=list[SessionRequestResponse]
)
def get_mentor_requests(
    mentor_id: int,
    db: Session = Depends(get_db)
):

    return (
        SessionRequestService.get_mentor_requests(
            db,
            mentor_id
        )
    )


@router.put(
    "/{request_id}/status",
    response_model=SessionRequestResponse
)

def update_session_status(
    request_id: int,
    status_data: SessionRequestStatusUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        return (
            SessionRequestService.update_status(
                db,
                current_user,
                request_id,
                status_data.status
            )
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )