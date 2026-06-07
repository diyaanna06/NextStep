from typing import Optional

from pydantic import BaseModel


class OrganizationProfileCreateRequest(BaseModel):
    organization_name: str
    industry: str
    website: str
    description: str
    location: str


class OrganizationProfileUpdateRequest(BaseModel):
    organization_name: Optional[str] = None
    industry: Optional[str] = None
    website: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None


class OrganizationProfileResponse(BaseModel):
    user_id: int
    organization_name: str
    industry: str
    website: str
    description: str
    location: str
    verified: bool

    class Config:
        from_attributes = True