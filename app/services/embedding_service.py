from mistralai.client import Mistral

from app.core.config import settings

client = Mistral(
    api_key=settings.MISTRAL_API_KEY
)


def generate_embeddings(text_chunks: list[str]):
    response = client.embeddings.create(
        model="mistral-embed",
        inputs=text_chunks
    )

    embeddings = [
        item.embedding
        for item in response.data
    ]

    return embeddings