from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:

    @staticmethod
    def get_user_by_email(
        db: Session,
        email: str
    ) -> User | None:

        return (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

    @staticmethod
    def get_user_by_id(
        db: Session,
        user_id: int
    ) -> User | None:

        return (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    @staticmethod
    def create_user(
        db: Session,
        email: str,
        password_hash: str,
        role: str
    ) -> User:

        user = User(
            email=email,
            password_hash=password_hash,
            role=role
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user