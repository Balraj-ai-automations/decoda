from mistralai.client import Mistral

from app.core.config import settings


client = Mistral(api_key=settings.MISTRAL_API_KEY)


def generate_answer(context: str, question: str, language: str = "English"):
    prompt = f"""
You are a helpful AI assistant.

Answer ONLY using the provided context.

If the answer is not found in the context, say:
'I could not find the answer in the provided document.'

Respond in {language}.

Context:
{context}

Question:
{question}
"""

    response = client.chat.complete(
        model="mistral-small-latest",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content