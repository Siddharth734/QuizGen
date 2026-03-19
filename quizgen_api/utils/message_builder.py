from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

SYSTEM_PROMPT = """You are a quiz generator.
- Every generic topic should be considered linked to India/Indian Demographic
- If the user provides a topic, ask them what format they want: 
    [1] MCQ
    [2] Fill in the Blanks
    [3] Question Answer
- Once the format is known, generate exactly 10 questions with answers/options as a JSON array.
- For MCQ: include "question", "options" (array of 4), and "answer".
- For Fill in the Blanks: include "question" (with blank as ___) and "answer".
- For Question Answer: include "question" and "answer", answer should be of 20 words minimum.
- Always return the quiz as a JSON array inside a markdown code block."""

def build_messages(history: list[dict]) -> list:
    messages = [SystemMessage(SYSTEM_PROMPT)]
    for msg in history:
        if msg["role"] == "user":
            messages.append(HumanMessage(msg["content"]))
        elif msg["role"] == "assistant":
            messages.append(AIMessage(msg["content"]))
    return messages