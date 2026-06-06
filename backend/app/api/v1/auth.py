from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.auth import (
    TokenResponse,
    UserLoginRequest,
    UserRegisterRequest,
)
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED
)
def register(
    user_data: UserRegisterRequest,
    db: Session = Depends(get_db)
):

    try:
        user = AuthService.register_user(
            db=db,
            user_data=user_data
        )

        return {
            "message": "User registered successfully",
            "user_id": user.id
        }

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    user_data: UserLoginRequest,
    db: Session = Depends(get_db)
):

    try:
        token = AuthService.login_user(
            db=db,
            user_data=user_data
        )

        return TokenResponse(
            access_token=token,
            token_type="bearer"
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )