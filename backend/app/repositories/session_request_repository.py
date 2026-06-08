from sqlalchemy.orm import Session

from app.models.session_request import (
    SessionRequest
)
from app.schemas.session_request import (
    SessionRequestCreateRequest
)


class SessionRequestRepository:

    @staticmethod
    def create_session_request(
        db: Session,
        student_id: int,
        request_data: SessionRequestCreateRequest
    ) -> SessionRequest:

        session_request = SessionRequest(
            student_id=student_id,
            mentor_id=request_data.mentor_id,
            message=request_data.message
        )

        db.add(session_request)
        db.commit()
        db.refresh(session_request)

        return session_request

    @staticmethod
    def get_session_request_by_id(
        db: Session,
        request_id: int
    ) -> SessionRequest | None:

        return (
            db.query(SessionRequest)
            .filter(
                SessionRequest.id == request_id
            )
            .first()
        )

    @staticmethod
    def get_student_requests(
        db: Session,
        student_id: int
    ) -> list[SessionRequest]:

        return (
            db.query(SessionRequest)
            .filter(
                SessionRequest.student_id == student_id
            )
            .all()
        )

    @staticmethod
    def get_mentor_requests(
        db: Session,
        mentor_id: int
    ) -> list[SessionRequest]:

        return (
            db.query(SessionRequest)
            .filter(
                SessionRequest.mentor_id == mentor_id
            )
            .all()
        )

    @staticmethod
    def update_status(
        db: Session,
        session_request: SessionRequest,
        status: str
    ) -> SessionRequest:

        session_request.status = status

        db.commit()
        db.refresh(session_request)

        return session_request