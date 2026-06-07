from fastapi import FastAPI
from app.api.v1.profile import router as profile_router
from app.api.v1.auth import router as auth_router
from app.api.v1.mentor import router as mentor_router
from app.api.v1.organization import router as organization_router
from app.api.v1.opportunity import router as opportunity_router

app = FastAPI(
    title="HerPath API",
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


@app.get("/")
def root():
    return {
        "message": "HerPath Backend Running"
    }