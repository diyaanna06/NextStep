from fastapi import FastAPI
from app.api.v1.profile import router as profile_router
from app.api.v1.auth import router as auth_router
from app.api.v1.mentor import router as mentor_router
from app.api.v1.organization import router as organization_router
from app.api.v1.opportunity import router as opportunity_router
from app.api.v1.application import router as application_router
from app.api.v1.session_request import router as session_request_router



app = FastAPI(
    title="NextStep",
    description="Career acceleration platform connecting students, mentors, and organizations.",
    version="1.0.0"
)


app.include_router(
    auth_router,
    prefix="/api/v1"
)
app.include_router(
    profile_router,
    prefix="/api/v1"
)
app.include_router(
    mentor_router,
    prefix="/api/v1"
)
app.include_router(
    organization_router,
    prefix="/api/v1"
)
app.include_router(
    opportunity_router,
    prefix="/api/v1"
)
app.include_router(
    application_router,
    prefix="/api/v1"
)
app.include_router(
    session_request_router,
    prefix="/api/v1"
)

@app.get("/")
def root():
    return {
        "message": "NextStep Backend Running"
    }