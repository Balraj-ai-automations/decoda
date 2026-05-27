from fastapi import FastAPI

from app.api.routes import router
from app.services.pdf_service import extract_text_from_pdf

app = FastAPI(
    title="Decoda API",
    version="0.1.0"
)

app.include_router(router)


@app.get("/test-pdf")
def test_pdf():
    text = extract_text_from_pdf("sample.pdf")

    return {
        "characters": len(text)
    }