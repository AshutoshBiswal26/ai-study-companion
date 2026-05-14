import ollama


# Question Answering
def generate_answer(question, context):

    prompt = f"""
You are an AI study assistant.

Answer the student's question using the provided study material context.

Be clear, educational, and concise.

If the answer is partially present,
still try to help the student.

Only say:
"I could not find this information in the uploaded material."

if the context is completely unrelated.

Study Material:
{context}

Student Question:
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


# Summary Generation
def generate_summary(context):

    prompt = f"""
You are an AI study assistant.

Summarize the following study material clearly
for a student.

Study Material:
{context}

Summary:
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


# Quiz Generation
def generate_quiz_questions(context):

    prompt = f"""
You are an AI study assistant.

Generate 5 quiz questions from the following
study material.

Study Material:
{context}

Quiz Questions:
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