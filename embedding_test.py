from sentence_transformers import SentenceTransformer
import pypdf
from langchain_text_splitters import RecursiveCharacterTextSplitter

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
print(len(embeddings))
print(len(embeddings[0]))