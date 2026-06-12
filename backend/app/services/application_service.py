from sqlalchemy.orm import Session

from app.models.application import Application
from app.models.user import User

from app.repositories.application_repository import (
    ApplicationRepository
)
from app.repositories.student_profile_repository import (
    StudentProfileRepository
)
from app.repositories.opportunity_repository import (
    OpportunityRepository
)

from app.schemas.application import (
    ApplicationCreateRequest
)


class ApplicationService:

    @staticmethod
    def create_application(
        db: Session,
        current_user: User,
        application_data: ApplicationCreateRequest
    ) -> Application:

        if current_user.role != "student":
            raise ValueError(
                "Only students can apply"
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

        opportunity = (
            OpportunityRepository.get_opportunity_by_id(
                db,
                application_data.opportunity_id
            )
        )

        if opportunity is None:
            raise ValueError(
                "Opportunity not found"
            )
        if not opportunity.is_active:
            raise ValueError(
                "This opportunity is no longer accepting applications"
            )

        existing_applications = (
            ApplicationRepository.get_student_applications(
                db,
                current_user.id
            )
        )

        for application in existing_applications:
            if (
                application.opportunity_id
                == application_data.opportunity_id
            ):
                raise ValueError(
                    "Already applied to this opportunity"
                )

        return (
            ApplicationRepository.create_application(
                db,
                current_user.id,
                application_data
            )
        )

    @staticmethod
    def get_student_applications(
        db: Session,
        student_id: int
    ) -> list[Application]:

        return (
            ApplicationRepository.get_student_applications(
                db,
                student_id
            )
        )

    @staticmethod
    def get_opportunity_applications(
        db: Session,
        opportunity_id: int
    ) -> list[Application]:

        return (
            ApplicationRepository.get_opportunity_applications(
                db,
                opportunity_id
            )
        )

    @staticmethod
    def update_status(
        db: Session,
        current_user: User,
        application_id: int,
        status: str
    ) -> Application:

        if current_user.role != "organization":
            raise ValueError(
                "Only organizations can update application status"
            )

        allowed_statuses = [
            "Applied",
            "Reviewed",
            "Shortlisted",
            "Accepted",
            "Rejected"
        ]

        if status not in allowed_statuses:
            raise ValueError(
                "Invalid application status"
            )

        application = (
            ApplicationRepository.get_application_by_id(
                db,
                application_id
            )
        )

        if application is None:
            raise ValueError(
                "Application not found"
            )

        return (
            ApplicationRepository.update_status(
                db,
                application,
                status
            )
        )