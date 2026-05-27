import os

from dotenv import load_dotenv


load_dotenv()


class Settings:
    MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")

    CHUNK_SIZE = 500
    CHUNK_OVERLAP = 50

    UPLOAD_DIR = "app/data/uploads"


settings = Settings()