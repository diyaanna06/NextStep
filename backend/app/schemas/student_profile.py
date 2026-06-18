from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ProfileCreateRequest(BaseModel):
    full_name: str
    college: str
    degree: str
    graduation_year: int
    skills: Optional[str] = None
    career_interests: Optional[str] = None


class ProfileUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    college: Optional[str] = None
    degree: Optional[str] = None
    graduation_year: Optional[int] = None
    skills: Optional[str] = None
    career_interests: Optional[str] = None


class ProfileResponse(BaseModel):
    user_id: int
    full_name: str
    college: str
    degree: str
    graduation_year: int
    skills: Optional[str]
    career_interests: Optional[str]

    resume_filename: Optional[str]
    resume_uploaded_at: Optional[datetime]

    class Config:
        from_attributes = True