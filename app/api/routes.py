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
    documents = get_all_documents()
    return documents


@router.delete("/documents/{document_id}")
def delete_uploaded_document(
    document_id: str
):
    file_path = os.path.join(
        settings.UPLOAD_DIR,
        document_id
    )

    try:
        # Delete file only if it exists
        # Railway resets disk on redeploy so file may be gone
        if os.path.exists(file_path):
            os.remove(file_path)

        # Always clean up DB and vector chunks
        delete_document_chunks(document_id)
        delete_document(document_id)

        return {
            "message": "Document deleted successfully"
        }

    except Exception as e:
        print("DELETE ERROR:", str(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post(
    "/upload",
    response_model=UploadResponse
)
def upload_pdf(
    file: UploadFile = File(...)
):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    document_id = f"{uuid.uuid4()}.pdf"

    file_path = os.path.join(
        settings.UPLOAD_DIR,
        document_id
    )

    try:
        with open(file_path, "wb") as buffer:
            buffer.write(file.file.read())

        chunk_count = index_document(
            pdf_path=file_path,
            document_id=document_id
        )

        insert_document(
            document_id=document_id,
            filename=file.filename,
            uploaded_at=str(datetime.utcnow()),
            chunk_count=chunk_count,
            file_size=file.size
        )

        return {
            "message": "PDF uploaded successfully",
            "document_id": document_id
        }

    except Exception as e:
        print("UPLOAD ERROR:", str(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post(
    "/ask",
    response_model=AskResponse
)
def ask_question(
    request: AskRequest
):
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

    except Exception as e:
        print("ASK ERROR:", str(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post(
    "/summarize",
    response_model=SummarizeResponse
)
def summarize(
    request: SummarizeRequest
):
    try:
        summary = summarize_document(
            document_id=request.document_id,
            language=request.language
        )
        return {"summary": summary}

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:
        print("SUMMARIZE ERROR:", str(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )