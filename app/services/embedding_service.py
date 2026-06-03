from sentence_transformers import SentenceTransformer

embedding_model = None


def get_embedding_model():
    global embedding_model

    if embedding_model is None:
        embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

    return embedding_model


def generate_embeddings(text_chunks: list[str]):
    model = get_embedding_model()
    embeddings = model.encode(text_chunks)

    return embeddings