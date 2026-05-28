import chromadb

client = chromadb.PersistentClient(
    path="app/data/chroma_db"
)

collection = client.get_or_create_collection(
    name="decoda_docs"
)

def store_chunks(
    chunks,
    embeddings,
    metadata_list,
    document_id
):
    # Create unique chunk IDs
    ids = [
        f"{document_id}_chunk_{i}"
        for i in range(len(chunks))
    ]

    # Check if chunks already exist
    existing = collection.get(
        ids=ids
    )

    # Prevent duplicate storage
    if existing["ids"]:
        return

    # Store chunks + embeddings + metadata
    collection.add(
        embeddings=embeddings.tolist(),
        documents=chunks,
        ids=ids,
        metadatas=metadata_list
    )


def retrieve_relevant_chunks(
    question_embedding,
    top_k=5
):
    # Query ChromaDB
    results = collection.query(
        query_embeddings=[
            question_embedding.tolist()
        ],
        n_results=top_k
    )

    # Return retrieved chunks + metadata
    return {
        "documents": results["documents"][0],
        "metadatas": results["metadatas"][0]
    }

def get_document_chunks(document_id):
    # Fetch all chunks belonging to one document
    results = collection.get(
        where={"document_id": document_id}
    )

    return results["documents"]

def delete_document_chunks(document_id):
    # Delete all chunks belonging to document
    collection.delete(
        where={
            "document_id": document_id
        }
    )