from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class OpportunityCreateRequest(BaseModel):
    title: str
    description: str
    opportunity_type: str
    location: str
    skills_required: str
    application_deadline: datetime


class OpportunityUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    opportunity_type: Optional[str] = None
    location: Optional[str] = None
    skills_required: Optional[str] = None
    application_deadline: Optional[datetime] = None
    is_active: Optional[bool] = None


class OpportunityResponse(BaseModel):
    id: int
    organization_id: int

    title: str
    description: str

    opportunity_type: str
    location: str

    skills_required: str

    application_deadline: datetime

    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True