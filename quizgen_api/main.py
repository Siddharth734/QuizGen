from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from quizgen_api.core.config import settings
from quizgen_api.api.routes import chat, health, session

app = FastAPI(
    title = settings.APP_TITLE,
    version = settings.APP_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
async def root():
    return {
        "message": "QuizGen API",
        "status": "running",
        "version": settings.APP_VERSION
    }

app.include_router(chat.router)
app.include_router(health.router)
app.include_router(session.router)

# uvicorn quizgen_api.main:app --reload