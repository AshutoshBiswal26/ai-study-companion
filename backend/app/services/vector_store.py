import chromadb

# Create Chroma client
client = chromadb.Client()

# Create or get collection
collection = client.get_or_create_collection(
    name="study_materials"
)


# Store chunks + embeddings
def store_chunks(chunks, embeddings):

    ids = [f"id_{i}" for i in range(len(chunks))]

    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=ids
    )


# Semantic search
def search_chunks(query_embedding, top_k=5):

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    return results