import chromadb


client = chromadb.Client()

collection = client.get_or_create_collection(name="decoda_docs")


def store_chunks(chunks, embeddings, document_id):
    ids = [f"{document_id}_chunk_{i}" for i in range(len(chunks))]

    existing = collection.get(ids=ids)

    if existing["ids"]:
        return

    collection.add(
        embeddings=embeddings.tolist(),
        documents=chunks,
        ids=ids
    )


def retrieve_relevant_chunks(question_embedding, top_k=3):
    results = collection.query(
        query_embeddings=[question_embedding.tolist()],
        n_results=top_k
    )

    return results["documents"][0]