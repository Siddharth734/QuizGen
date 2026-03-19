from langchain.chat_models import init_chat_model
from quizgen_api.core.config import settings
from quizgen_api.utils.message_builder import build_messages
from quizgen_api.services.session_service import get_session, append_message

model = init_chat_model(
    model = settings.LLM_MODEL,
    model_provider = settings.LLM_PROVIDER,
    api_key=settings.API_KEY
)

async def get_chat_response(session_id: str, user_message: str) -> str:
    append_message(session_id, "user", user_message)
    history = get_session(session_id)
    lc_messages = build_messages(history)

    # waits & returns full response at once
    response = model.invoke(lc_messages)
    reply  = response.content

    append_message(session_id, "assistant", reply)
    return reply

async def stream_chat_response(session_id: str, user_message: str):
    append_message(session_id, "user", user_message)
    history = get_session(session_id)
    lc_messages = build_messages(history)

    # yield keyword is to create generator functions, that produce values one at a time
    async def token_generator():
        """Returns the generator object itself, not its output."""
        full_response = ""
        try:
            #yeilds & returns token by token as generates
            for chunk in model.stream(lc_messages):
                token = chunk.content
                if token:
                    full_response += token
                    yield token
        except Exception as e:
            yield f"\n[ERROR]: {str(e)}"
            return
        append_message(session_id, "assistant", full_response)

    return token_generator()