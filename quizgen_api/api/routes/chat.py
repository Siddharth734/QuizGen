from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from quizgen_api.model.schema import ChatRequest, ChatResponse
from quizgen_api.services.llm_service import get_chat_response, stream_chat_response
from quizgen_api.services.session_service import get_session

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    response = await get_chat_response(request.session_id, request.message)
    history = get_session(request.session_id)
    return ChatResponse(
        session_id = request.session_id,
        reply = response, 
        history = history
    )

@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    generator = await stream_chat_response(request.session_id, request.message)
    return StreamingResponse(generator, media_type="text/plain")