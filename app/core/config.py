import os

from dotenv import load_dotenv


load_dotenv()


class Settings:
    MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")

    CHUNK_SIZE = 500
    CHUNK_OVERLAP = 50

    UPLOAD_DIR = "app/data/uploads"
    DATABASE_DIR = "app/data"


settings = Settings()

# Auto-create required directories on startup
# Fixes FileNotFoundError on Railway (fresh container has no folders)
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.DATABASE_DIR, exist_ok=True)