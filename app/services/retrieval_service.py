import chromadb

client = None
collection = None


def get_collection():
    global client, collection

    if collection is None:
        client = chromadb.PersistentClient(
            path="app/data/chroma_db"
        )

        collection = client.get_or_create_collection(
            name="decoda_docs"
        )

    return collection


def store_chunks(
    chunks,
    embeddings,
    metadata_list,
    document_id
):
    collection = get_collection()

    ids = [
        f"{document_id}_chunk_{i}"
        for i in range(len(chunks))
    ]

    existing = collection.get(ids=ids)

    if existing["ids"]:
        return

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
    collection = get_collection()

    results = collection.query(
        query_embeddings=[
            question_embedding.tolist()
        ],
        n_results=top_k
    )

    return {
        "documents": results["documents"][0],
        "metadatas": results["metadatas"][0]
    }


def get_document_chunks(document_id):
    collection = get_collection()

    results = collection.get(
        where={"document_id": document_id}
    )

    return results["documents"]


def delete_document_chunks(document_id):
    collection = get_collection()

    collection.delete(
        where={
            "document_id": document_id
        }
    )