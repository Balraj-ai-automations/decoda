import os
from mistralai import Mistral

client = Mistral(api_key=os.getenv("MISTRAL_API_KEY"))

def generate_embeddings(text_chunks: list[str]):
    response = client.embeddings.create(
        model="mistral-embed",
        inputs=text_chunks
    )
    return [item.embedding for item in response.data]