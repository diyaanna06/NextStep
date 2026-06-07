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
from app.schemas.mentor_profile import (
    MentorProfileCreateRequest,
    MentorProfileUpdateRequest,
    MentorProfileResponse
)
from app.services.mentor_profile_service import (
    MentorProfileService
)

router = APIRouter(
    prefix="/mentor",
    tags=["Mentors"]
)


@router.post(
    "/profile",
    response_model=MentorProfileResponse,
    status_code=status.HTTP_201_CREATED
)
def create_profile(
    profile_data: MentorProfileCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        return MentorProfileService.create_profile(
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
    response_model=MentorProfileResponse
)
def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        return MentorProfileService.get_profile(
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
    response_model=MentorProfileResponse
)
def update_profile(
    profile_data: MentorProfileUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        return MentorProfileService.update_profile(
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
    response_model=list[MentorProfileResponse]
)
def get_all_mentors(
    expertise: str | None = None,
    company: str | None = None,
    available: bool | None = None,
    db: Session = Depends(get_db)
):

    if (
        expertise is not None or
        company is not None or
        available is not None
    ):
        return MentorProfileService.filter_mentors(
            db,
            expertise,
            company,
            available
        )

    return MentorProfileService.get_all_mentors(
        db
    )


@router.get(
    "/{mentor_id}",
    response_model=MentorProfileResponse
)
def get_mentor(
    mentor_id: int,
    db: Session = Depends(get_db)
):

    try:
        return MentorProfileService.get_mentor_by_id(
            db,
            mentor_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )