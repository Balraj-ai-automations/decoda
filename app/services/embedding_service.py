from sentence_transformers import SentenceTransformer


embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(text_chunks: list[str]):
    embeddings = embedding_model.encode(text_chunks)

    return embeddings