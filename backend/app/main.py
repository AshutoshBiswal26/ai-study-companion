from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import shutil
import os

# PDF processing
from app.services.pdf_service import (
    extract_text_from_pdf,
    chunk_text
)

# Embeddings
from app.services.embedding_service import (
    generate_embeddings
)

# Vector database
from app.services.vector_store import (
    store_chunks,
    search_chunks
)

# Gemma / Ollama
from app.services.llm_service import (
    generate_answer
)

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Upload folder
UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# Home route
@app.get("/")
def home():
    return {
        "message": "Backend is running"
    }


# Upload PDF route
@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    # Save uploaded PDF
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    text = extract_text_from_pdf(file_path)

    # Split text into chunks
    chunks = chunk_text(text)

    # Generate embeddings
    embeddings = generate_embeddings(chunks)

    # Store in vector database
    store_chunks(chunks, embeddings)

    return {
        "message": "PDF embedded successfully",
        "total_chunks": len(chunks)
    }


# Semantic search route
@app.get("/search")
def search(query: str):

    # Convert query into embedding
    query_embedding = generate_embeddings([query])[0]

    # Search similar chunks
    results = search_chunks(query_embedding)

    return results


# RAG Question Answering Route
@app.post("/ask")
def ask_question(question: str):

    # Convert question into embedding
    query_embedding = generate_embeddings([question])[0]

    # Retrieve relevant chunks
    results = search_chunks(query_embedding)

    retrieved_chunks = results["documents"][0]

    # Combine chunks into context
    context = "\n\n".join(retrieved_chunks)

    # Generate grounded answer using Gemma
    answer = generate_answer(
        question,
        context
    )

    return {
        "question": question,
        "answer": answer,
        "context_used": retrieved_chunks
    }