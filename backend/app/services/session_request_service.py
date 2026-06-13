from sqlalchemy.orm import Session

from app.models.session_request import (
    SessionRequest
)
from app.models.user import User

from app.repositories.session_request_repository import (
    SessionRequestRepository
)
from app.repositories.student_profile_repository import (
    StudentProfileRepository
)
from app.repositories.mentor_profile_repository import (
    MentorProfileRepository
)

from app.schemas.session_request import (
    SessionRequestCreateRequest
)


class SessionRequestService:

    @staticmethod
    def create_session_request(
        db: Session,
        current_user: User,
        request_data: SessionRequestCreateRequest
    ) -> SessionRequest:

        if current_user.role != "student":
            raise ValueError(
                "Only students can request sessions"
            )

        student_profile = (
            StudentProfileRepository.get_profile_by_user_id(
                db,
                current_user.id
            )
        )

        if student_profile is None:
            raise ValueError(
                "Student profile not found"
            )

        mentor_profile = (
            MentorProfileRepository.get_profile_by_user_id(
                db,
                request_data.mentor_id
            )
        )

        if mentor_profile is None:
            raise ValueError(
                "Mentor profile not found"
            )

        existing_requests = (
            SessionRequestRepository.get_student_requests(
                db,
                current_user.id
            )
        )

        for request in existing_requests:
            if request.mentor_id == request_data.mentor_id:
                raise ValueError(
                    "Session request already exists"
                )

        return (
            SessionRequestRepository.create_session_request(
                db,
                current_user.id,
                request_data
            )
        )

    @staticmethod
    def get_student_requests(
        db: Session,
        student_id: int
    ) -> list[SessionRequest]:

        return (
            SessionRequestRepository.get_student_requests(
                db,
                student_id
            )
        )

    @staticmethod
    def get_mentor_requests(
        db: Session,
        mentor_id: int
    ) -> list[SessionRequest]:

        return (
            SessionRequestRepository.get_mentor_requests(
                db,
                mentor_id
            )
        )

    @staticmethod
    def update_status(
        db: Session,
        current_user: User,
        request_id: int,
        status: str
    ) -> SessionRequest:

        if current_user.role != "mentor":
            raise ValueError(
                "Only mentors can update session status"
            )

        allowed_statuses = [
            "Pending",
            "Accepted",
            "Rejected"
        ]

        if status not in allowed_statuses:
            raise ValueError(
                "Invalid session status"
            )

        session_request = (
            SessionRequestRepository.get_session_request_by_id(
                db,
                request_id
            )
        )

        if session_request is None:
            raise ValueError(
                "Session request not found"
            )

        updated_request = (
            SessionRequestRepository.update_status(
                db,
                session_request,
                status
            )
        )

        if status == "Accepted":

            mentor_profile = (
                MentorProfileRepository.get_profile_by_user_id(
                    db,
                    current_user.id
                )
            )

            if mentor_profile:

                mentor_profile.availability_status = False

                db.commit()

                db.refresh(
                    mentor_profile
                )

        return updated_request