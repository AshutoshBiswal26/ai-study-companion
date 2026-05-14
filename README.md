# AI Study Companion

Offline-capable RAG learning assistant powered by Gemma 3.

## Problem

Students in low-connectivity environments struggle to access personalized AI learning tools that work with their own study material.

## Solution

AI Study Companion allows students to:

- Upload PDFs
- Ask questions from study material
- Generate summaries
- Generate quizzes
- Learn interactively using local AI

The system works using Retrieval-Augmented Generation (RAG) with Gemma 3.

---

# Features

- PDF Upload
- PDF Text Extraction
- Intelligent Chunking
- Semantic Search
- AI Question Answering
- AI Summarization
- AI Quiz Generation
- Source Grounding
- Local LLM using Ollama + Gemma 3

---

# Tech Stack

## Frontend
- React
- Axios

## Backend
- FastAPI
- Python

## AI / RAG
- Sentence Transformers
- ChromaDB
- Ollama
- Gemma 3

---

# Architecture

User PDF
↓
Text Extraction
↓
Chunking
↓
Embeddings
↓
ChromaDB Vector Storage
↓
Semantic Retrieval
↓
Gemma 3 Grounded Generation

---

# Setup Instructions

## Frontend

```bash
cd frontend
npm install
npm run dev