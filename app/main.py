from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.routes import router
from app.services.db_service import create_documents_table


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run startup logic
    print("Startup lifespan running")

    create_documents_table()

    yield

    # Optional shutdown logic later


app = FastAPI(
    title="Decoda API",
    version="0.1.0",
    lifespan=lifespan
)

app.include_router(router)