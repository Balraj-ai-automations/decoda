import os
import uuid

from fastapi import APIRouter, File, UploadFile, HTTPException

from app.core.config import settings
from app.schemas.request import AskRequest
from app.schemas.response import HealthResponse, UploadResponse, AskResponse
from app.services.rag_service import run_rag_pipeline

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health_check():
    return {"status": "healthy"}


@router.post("/upload", response_model=UploadResponse)
def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    document_id = f"{uuid.uuid4()}.pdf"
    file_path = os.path.join(settings.UPLOAD_DIR, document_id)

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return {
        "message": "PDF uploaded successfully",
        "document_id": document_id
    }


@router.post("/ask", response_model=AskResponse)
def ask_question(request: AskRequest):
    file_path = os.path.join(
        settings.UPLOAD_DIR,
        request.document_id
    )

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    try:
        answer = run_rag_pipeline(
            pdf_path=file_path,
            question=request.question,
            language=request.language
        )

        return {
            "answer": answer
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal processing error."
        )