import os
import pypdf
import chromadb

from dotenv import dotenv_values
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from langsmith import traceable

config = dotenv_values(".env")

os.environ["LANGSMITH_API_KEY"] = config["LANGSMITH_API_KEY"]
os.environ["LANGSMITH_TRACING"] = config["LANGSMITH_TRACING"]
os.environ["LANGSMITH_ENDPOINT"] = config["LANGSMITH_ENDPOINT"]
os.environ["LANGSMITH_PROJECT"] = config["LANGSMITH_PROJECT"]

api_key = config["MISTRAL_API_KEY"]

# Load models once
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
mistral_client = MistralClient(api_key=api_key)


def extract_text_from_pdf(pdf_path):
    reader = pypdf.PdfReader(pdf_path)

    full_text = ""

    for page in reader.pages:
        full_text += page.extract_text()

    return full_text


def chunk_text(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    return splitter.split_text(text)


def retrieve_relevant_chunks(chunks, question):
    embeddings = embedding_model.encode(chunks)

    client = chromadb.Client()

    collection = client.create_collection(name="decoda_docs")

    collection.add(
        embeddings=embeddings.tolist(),
        documents=chunks,
        ids=[f"chunk_{i}" for i in range(len(chunks))]
    )

    query_embedding = embedding_model.encode(question)

    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=3
    )

    return "\n\n".join(results["documents"][0])


@traceable
def generate_answer(context, question, language):
    response = mistral_client.chat(
        model="mistral-small-latest",
        messages=[
            ChatMessage(
                role="user",
                content=f"""
Answer the question using only the provided context.

Respond in {language}.

Context:
{context}

Question:
{question}
"""
            )
        ]
    )

    return response.choices[0].message.content


@traceable
def ask_document(pdf_path, question, language):
    full_text = extract_text_from_pdf(pdf_path)

    chunks = chunk_text(full_text)

    context = retrieve_relevant_chunks(chunks, question)

    answer = generate_answer(context, question, language)

    return answer


question = "What is PEC registration procedure?"

answer = ask_document(
    "data/sample.pdf",
    question,
    "Kannada"
)

print(answer)