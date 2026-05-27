from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.core.config import settings


def chunk_text(text: str) -> list[str]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP
    )

    chunks = splitter.split_text(text)

    return chunks