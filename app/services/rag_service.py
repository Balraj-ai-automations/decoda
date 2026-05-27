import os

from app.services.pdf_service import extract_text_from_pdf
from app.services.chunking_service import chunk_text
from app.services.embedding_service import generate_embeddings
from app.services.retrieval_service import store_chunks, retrieve_relevant_chunks
from app.services.llm_service import generate_answer


def run_rag_pipeline(
    pdf_path: str,
    question: str,
    language: str = "English"
):
    text = extract_text_from_pdf(pdf_path)

    if not text.strip():
        raise ValueError("PDF contains no extractable text.")

    chunks = chunk_text(text)

    embeddings = generate_embeddings(chunks)

    document_id = os.path.basename(pdf_path)

    store_chunks(
        chunks=chunks,
        embeddings=embeddings,
        document_id=document_id
    )

    question_embedding = generate_embeddings([question])[0]

    retrieved_chunks = retrieve_relevant_chunks(question_embedding)

    context = "\n\n".join(retrieved_chunks)

    answer = generate_answer(
        context=context,
        question=question,
        language=language
    )

    return answer