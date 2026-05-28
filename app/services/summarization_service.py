from app.services.retrieval_service import get_document_chunks
from app.services.llm_service import generate_answer


def summarize_document(
    document_id,
    language="English"
):
    # Retrieve all chunks for the document
    chunks = get_document_chunks(document_id)

    # Ensure chunks exist
    if not chunks:
        raise ValueError(
            "No chunks found for document."
        )

    # Combine all chunks into one context
    context = "\n\n".join(chunks)

    # Create summarization prompt
    summary_question = """
    Summarize this document clearly
    in simple language.
    """

    # Generate summary using LLM
    summary = generate_answer(
        context=context,
        question=summary_question,
        language=language
    )

    return summary