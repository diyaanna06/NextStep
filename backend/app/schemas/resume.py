from datetime import datetime

from pydantic import BaseModel


class ResumeUploadResponse(BaseModel):
    message: str
    resume_filename: str
    resume_uploaded_at: datetime
class ResumeUrlResponse(BaseModel):
    url: str
class ResumeDeleteResponse(BaseModel):
    message: str