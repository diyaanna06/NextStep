from datetime import datetime

from pydantic import BaseModel

from app.schemas.opportunity import OpportunityResponse
from app.schemas.student_profile import ProfileResponse


class ApplicationCreateRequest(BaseModel):
    opportunity_id: int


class ApplicationStatusUpdateRequest(BaseModel):
    status: str


class ApplicationResponse(BaseModel):
    id: int

    student: ProfileResponse

    opportunity: OpportunityResponse

    status: str
    created_at: datetime

    class Config:
        from_attributes = True