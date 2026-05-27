import os
import pypdf
import chromadb

from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

load_dotenv()

api_key = os.getenv("MISTRAL_API_KEY")

pdf_path = "data/sample.pdf"

reader = pypdf.PdfReader(pdf_path)

full_text = ""

for page in reader.pages:
    full_text += page.extract_text()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

chunks = splitter.split_text(full_text)

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

embeddings = embedding_model.encode(chunks)

client = chromadb.Client()

collection = client.create_collection(name="decoda_docs")

collection.add(
    embeddings=embeddings.tolist(),
    documents=chunks,
    ids=[f"chunk_{i}" for i in range(len(chunks))]
)

query = "What is PEC registration procedure?"

query_embedding = embedding_model.encode(query)

results = collection.query(
    query_embeddings=[query_embedding.tolist()],
    n_results=3
)

retrieved_context = "\n\n".join(results["documents"][0])

mistral_client = MistralClient(api_key=api_key)

response = mistral_client.chat(
    model="mistral-small-latest",
    messages=[
        ChatMessage(
            role="user",
            content=f"""
Answer the question using only the provided context.

Context:
{retrieved_context}

Question:
{query}
"""
        )
    ]
)

print(response.choices[0].message.content)