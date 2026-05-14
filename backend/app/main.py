from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from app.services.pdf_service import (
    extract_text_from_pdf,
    chunk_text
)

from app.services.embedding_service import (
    generate_embeddings
)

from app.services.vector_store import (
    store_chunks,
    search_chunks
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {"message": "Backend is running"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text_from_pdf(file_path)

    chunks = chunk_text(text)

    embeddings = generate_embeddings(chunks)

    store_chunks(chunks, embeddings)

    return {
        "message": "PDF embedded successfully",
        "total_chunks": len(chunks)
    }


@app.get("/search")
def search(query: str):
    query_embedding = generate_embeddings([query])[0]

    results = search_chunks(query_embedding)

    return results