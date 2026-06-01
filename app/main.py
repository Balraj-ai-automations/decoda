from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.services.db_service import create_documents_table


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    print("Startup lifespan running")

    create_documents_table()

    yield

    # Shutdown logic (future use)


app = FastAPI(
    title="Decoda API",
    version="0.1.0",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://decoda-turo.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(router)