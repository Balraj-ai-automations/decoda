# Decoda

Multilingual AI-powered document intelligence platform built with Retrieval-Augmented Generation (RAG), semantic search, vector embeddings, and LLM-powered grounded question answering.

## Overview

Decoda is an AI system that allows users to upload documents, understand their content semantically, and ask natural language questions to receive accurate grounded answers.

Current prototype supports PDF-based document question answering with multilingual response generation.

---

## Current Features

- PDF text extraction
- intelligent document chunking
- semantic embeddings
- vector similarity search
- contextual retrieval
- grounded answer generation
- multilingual responses
- LangSmith tracing for observability
- modular RAG pipeline architecture

---

## Tech Stack

### AI / LLM
- Mistral AI
- Sentence Transformers
- LangSmith

### Vector Search
- ChromaDB (development)
- Supabase pgvector (planned production)

### Backend
- Python
- FastAPI (Phase 4)

### Utilities
- pypdf
- python-dotenv
- LangChain text splitters

---

## Current Architecture

```text
PDF
 ↓
Text Extraction
 ↓
Chunking
 ↓
Embeddings
 ↓
Vector Storage
 ↓
Semantic Retrieval
 ↓
LLM Generation
 ↓
Multilingual Response
