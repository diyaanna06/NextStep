from typing import Optional

from pydantic import BaseModel


class MentorProfileCreateRequest(BaseModel):
    full_name: str
    current_role: str
    company: str
    years_of_experience: int
    expertise_areas: str
    availability_status: bool = True


class MentorProfileUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    current_role: Optional[str] = None
    company: Optional[str] = None
    years_of_experience: Optional[int] = None
    expertise_areas: Optional[str] = None
    availability_status: Optional[bool] = None


class MentorProfileResponse(BaseModel):
    user_id: int
    full_name: str
    current_role: str
    company: str
    years_of_experience: int
    expertise_areas: str
    availability_status: bool

    class Config:
        from_attributes = True