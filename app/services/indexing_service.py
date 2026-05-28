from app.services.pdf_service import (
    extract_text_from_pdf
)

from app.services.chunking_service import (
    chunk_text
)

from app.services.embedding_service import (
    generate_embeddings
)

from app.services.retrieval_service import (
    store_chunks
)


def index_document(
    pdf_path,
    document_id
):
    # Extract structured pages
    pages = extract_text_from_pdf(
        pdf_path
    )

    # Store all chunks
    all_chunks = []

    # Store metadata for each chunk
    all_metadata = []

    # Process every page
    for page_data in pages:
        page_number = page_data["page"]

        page_text = page_data["text"]

        # Chunk page text
        page_chunks = chunk_text(
            page_text
        )

        # Store chunks
        all_chunks.extend(page_chunks)

        # Store metadata for every chunk
        for _ in page_chunks:
            all_metadata.append({
                "document_id": document_id,
                "page": page_number
            })

    # Ensure chunks exist
    if not all_chunks:
        raise ValueError(
            "No text chunks were created."
        )

    # Generate embeddings
    embeddings = generate_embeddings(
        all_chunks
    )

    # Store chunks + metadata
    store_chunks(
        chunks=all_chunks,
        embeddings=embeddings,
        metadata_list=all_metadata,
        document_id=document_id
    )

    return len(all_chunks)