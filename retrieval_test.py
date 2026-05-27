import pypdf
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter
import chromadb

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

model = SentenceTransformer("all-MiniLM-L6-v2")

embeddings = model.encode(chunks)

client = chromadb.Client()

collection = client.create_collection(name="decoda_docs")

collection.add(
    embeddings=embeddings.tolist(),
    documents=chunks,
    ids=[f"chunk_{i}" for i in range(len(chunks))]
)
query = "What is PEC registration procedure?"
query_embedding = model.encode(query)
results = collection.query(
    query_embeddings=[query_embedding.tolist()],
    n_results=3
)
print(results["documents"])