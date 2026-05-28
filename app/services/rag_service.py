from app.services.embedding_service import (
    generate_embeddings
)

from app.services.retrieval_service import (
    retrieve_relevant_chunks
)

from app.services.llm_service import (
    generate_answer
)


def run_rag_pipeline(
    question: str,
    language: str = "English"
):
    # Generate embedding for question
    question_embedding = generate_embeddings(
        [question]
    )[0]

    # Retrieve relevant chunks + metadata
    retrieval_results = retrieve_relevant_chunks(
        question_embedding
    )

    # Extract chunk text
    retrieved_chunks = retrieval_results[
        "documents"
    ]

    # Extract metadata
    retrieved_metadata = retrieval_results[
        "metadatas"
    ]

    # Store only valid citation metadata
    clean_sources = []

    for metadata in retrieved_metadata:
        if (
            metadata is not None
            and "document_id" in metadata
            and "page" in metadata
        ):
            clean_sources.append(metadata)

    # Combine chunks into one context
    context = "\n\n".join(
        retrieved_chunks
    )

    # Generate answer
    answer = generate_answer(
        context=context,
        question=question,
        language=language
    )

    # Return answer + citations
    return {
        "answer": answer,
        "sources": clean_sources
    }