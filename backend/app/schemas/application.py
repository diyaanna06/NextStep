from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ApplicationCreateRequest(BaseModel):
    opportunity_id: int


class ApplicationStatusUpdateRequest(BaseModel):
    status: str


class ApplicationResponse(BaseModel):
    id: int
    student_id: int
    opportunity_id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True