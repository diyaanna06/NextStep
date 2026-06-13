from sqlalchemy.orm import (
    Session,
    joinedload
)

from app.models.application import Application
from app.models.opportunity import Opportunity

from app.schemas.application import (
    ApplicationCreateRequest
)


class ApplicationRepository:

    @staticmethod
    def create_application(
        db: Session,
        student_id: int,
        application_data: ApplicationCreateRequest
    ) -> Application:

        application = Application(
            student_id=student_id,
            opportunity_id=application_data.opportunity_id
        )

        db.add(application)
        db.commit()

        return (
            db.query(Application)
            .options(
                joinedload(
                    Application.student
                ),
                joinedload(
                    Application.opportunity
                ).joinedload(
                    Opportunity.organization
                )
            )
            .filter(
                Application.id == application.id
            )
            .first()
        )

    @staticmethod
    def get_application_by_id(
        db: Session,
        application_id: int
    ) -> Application | None:

        return (
            db.query(Application)
            .options(
                joinedload(
                    Application.student
                ),
                joinedload(
                    Application.opportunity
                ).joinedload(
                    Opportunity.organization
                )
            )
            .filter(
                Application.id == application_id
            )
            .first()
        )

    @staticmethod
    def get_student_applications(
        db: Session,
        student_id: int
    ) -> list[Application]:

        return (
            db.query(Application)
            .options(
                joinedload(
                    Application.student
                ),
                joinedload(
                    Application.opportunity
                ).joinedload(
                    Opportunity.organization
                )
            )
            .filter(
                Application.student_id == student_id
            )
            .all()
        )

    @staticmethod
    def get_opportunity_applications(
        db: Session,
        opportunity_id: int
    ) -> list[Application]:

        return (
            db.query(Application)
            .options(
                joinedload(
                    Application.student
                ),
                joinedload(
                    Application.opportunity
                ).joinedload(
                    Opportunity.organization
                )
            )
            .filter(
                Application.opportunity_id == opportunity_id
            )
            .all()
        )

    @staticmethod
    def update_status(
        db: Session,
        application: Application,
        status: str
    ) -> Application:

        application.status = status

        db.commit()

        return (
            db.query(Application)
            .options(
                joinedload(
                    Application.student
                ),
                joinedload(
                    Application.opportunity
                ).joinedload(
                    Opportunity.organization
                )
            )
            .filter(
                Application.id == application.id
            )
            .first()
        )