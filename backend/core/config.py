from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """This kinf of acts as a middleware between all the other files and .env"""
    LLM_MODEL: str
    LLM_PROVIDER: str
    API_KEY: str

    ALLOWED_ORIGINS: str = "http://localhost:5173"

    APP_TITLE: str = "QUIZGen API"
    APP_VERSION: str = "1.0.0"

    class Config:
        env_file = ".env"

settings = Settings()