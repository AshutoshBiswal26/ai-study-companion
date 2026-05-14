import ollama


def generate_answer(question, context):
    prompt = f"""
You are an AI study assistant.

Answer ONLY using the provided context.

If the answer is not in the context,
say:
"I could not find this information in the uploaded material."

Context:
{context}

Question:
{question}

Answer:
"""

    response = ollama.chat(
        model='gemma3',
        messages=[
            {
                'role': 'user',
                'content': prompt
            }
        ]
    )

    return response['message']['content']