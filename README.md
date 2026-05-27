# Decoda

Multilingual AI-powered document intelligence platform built with Retrieval-Augmented Generation (RAG).

## Current Status

Phase 4 Complete — FastAPI Backend MVP

Decoda can now:

- upload PDF documents
- answer questions from uploaded documents
- generate multilingual grounded responses
- expose production-style backend APIs

---

## Features

Current implemented features:

- PDF upload support
- document question answering
- multilingual answering (English + Kannada)
- FastAPI backend APIs
- Swagger/OpenAPI documentation
- ChromaDB vector retrieval
- sentence-transformers embeddings
- Mistral LLM integration
- LangSmith tracing
- modular backend architecture

---

## Tech Stack

Backend:
- Python
- FastAPI
- Pydantic

AI / RAG:
- pypdf
- sentence-transformers
- ChromaDB
- Mistral AI
- LangSmith

Utilities:
- python-dotenv

---

## Project Structure

``` id="itkp43"
Decoda/
├── app/
│   ├── api/
│   ├── core/
│   ├── schemas/
│   ├── services/
│   ├── data/uploads/
│   └── main.py
│
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
