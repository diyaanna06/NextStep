from datetime import datetime

from pydantic import BaseModel

from app.schemas.student_profile import (
    ProfileResponse
)
from app.schemas.mentor_profile import (
    MentorProfileResponse
)


class SessionRequestCreateRequest(BaseModel):
    mentor_id: int
    message: str


class SessionRequestStatusUpdateRequest(BaseModel):
    status: str


class SessionRequestResponse(BaseModel):
    id: int

    student: ProfileResponse

    mentor: MentorProfileResponse

    message: str

    status: str

    created_at: datetime

    class Config:
        from_attributes = True