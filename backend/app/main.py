from fastapi import FastAPI

app = FastAPI(
    title="HerPath API",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "HerPath Backend Running"}