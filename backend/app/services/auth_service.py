from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.auth import (
    UserLoginRequest,
    UserRegisterRequest,
)


class AuthService:

    @staticmethod
    def register_user(
        db: Session,
        user_data: UserRegisterRequest
    ) -> User:

        existing_user = (
            UserRepository.get_user_by_email(
                db,
                user_data.email
            )
        )

        if existing_user:
            raise ValueError(
                "Email already registered"
            )

        password_hash = hash_password(
            user_data.password
        )

        user = (
            UserRepository.create_user(
                db=db,
                email=user_data.email,
                password_hash=password_hash,
                role=user_data.role
            )
        )

        return user

    @staticmethod
    def login_user(
        db: Session,
        user_data: UserLoginRequest
    ) -> str:

        user = (
            UserRepository.get_user_by_email(
                db,
                user_data.email
            )
        )

        if not user:
            raise ValueError(
                "Invalid credentials"
            )

        if not verify_password(
            user_data.password,
            user.password_hash
        ):
            raise ValueError(
                "Invalid credentials"
            )

        token = create_access_token(
            {"sub": str(user.id)}
        )

        return token