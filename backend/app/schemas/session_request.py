from datetime import datetime

from pydantic import BaseModel


class SessionRequestCreateRequest(BaseModel):
    mentor_id: int
    message: str


class SessionRequestStatusUpdateRequest(BaseModel):
    status: str


class SessionRequestResponse(BaseModel):
    id: int
    student_id: int
    mentor_id: int
    message: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True