import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI-Powered Threat Intelligence Platform"
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb+srv://ullasshetty11_db_user:Ullas%40100@cluster0.hkysoiq.mongodb.net/?appName=Cluster0")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "threat_intel")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # Analysis Configuration
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_EXTENSIONS: list = ["pdf", "docx", "txt", "csv"]

settings = Settings()
