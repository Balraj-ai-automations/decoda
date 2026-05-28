import os
import uuid
from datetime import datetime

from fastapi import (
    APIRouter,
    File,
    UploadFile,
    HTTPException
)

from app.core.config import settings

from app.schemas.request import (
    AskRequest,
    SummarizeRequest
)

from app.schemas.response import (
    HealthResponse,
    UploadResponse,
    AskResponse,
    SummarizeResponse
)

from app.services.rag_service import (
    run_rag_pipeline
)

from app.services.indexing_service import (
    index_document
)

from app.services.retrieval_service import (
    delete_document_chunks
)

from app.services.db_service import (
    insert_document,
    get_all_documents,
    delete_document
)

from app.services.summarization_service import (
    summarize_document
)

router = APIRouter()


@router.get(
    "/health",
    response_model=HealthResponse
)
def health_check():
    return {
        "status": "healthy"
    }


@router.get("/documents")
def get_documents():
    # Fetch all uploaded documents
    documents = get_all_documents()

    return documents


@router.delete("/documents/{document_id}")
def delete_uploaded_document(
    document_id: str
):
    # Build PDF path
    file_path = os.path.join(
        settings.UPLOAD_DIR,
        document_id
    )

    # Ensure file exists
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    try:
        # Delete PDF file
        os.remove(file_path)

        # Delete vector chunks
        delete_document_chunks(
            document_id
        )

        # Delete SQLite metadata
        delete_document(
            document_id
        )

        return {
            "message": (
                "Document deleted successfully"
            )
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Failed to delete document."
        )


@router.post(
    "/upload",
    response_model=UploadResponse
)
def upload_pdf(
    file: UploadFile = File(...)
):
    # Validate file type
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    # Generate unique document ID
    document_id = f"{uuid.uuid4()}.pdf"

    # Build file path
    file_path = os.path.join(
        settings.UPLOAD_DIR,
        document_id
    )

    try:
        # Save uploaded PDF
        with open(file_path, "wb") as buffer:
            buffer.write(file.file.read())

        # Index document into ChromaDB
        chunk_count = index_document(
            pdf_path=file_path,
            document_id=document_id
        )

        # Store metadata into SQLite
        insert_document(
            document_id=document_id,
            filename=file.filename,
            uploaded_at=str(datetime.utcnow()),
            chunk_count=chunk_count,
            file_size=file.size
        )

        return {
            "message": (
                "PDF uploaded successfully"
            ),
            "document_id": document_id
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Failed to upload document."
        )


@router.post(
    "/ask",
    response_model=AskResponse
)
def ask_question(
    request: AskRequest
):
    # Build document path
    file_path = os.path.join(
        settings.UPLOAD_DIR,
        request.document_id
    )

    # Ensure document exists
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    try:
        # Run RAG pipeline
        result = run_rag_pipeline(
            question=request.question,
            language=request.language
        )

        return result

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


@router.post(
    "/summarize",
    response_model=SummarizeResponse
)
def summarize(
    request: SummarizeRequest
):
    try:
        # Generate document summary
        summary = summarize_document(
            document_id=request.document_id,
            language=request.language
        )

        return {
            "summary": summary
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail=(
                "Internal summarization error."
            )
        )