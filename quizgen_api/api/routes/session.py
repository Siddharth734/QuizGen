from fastapi import APIRouter, HTTPException
from quizgen_api.services.session_service import get_session, delete_session, list_sessions

# creates router instance
router = APIRouter()

@router.get("/session/{session_id}")
async def get_session_history(session_id: str):
    history = get_session(session_id)
    if not history:
        raise HTTPException(status_code=404, detail=f"Session '{session_id}' not found")
    return {"session_id": session_id, "history": history}

@router.delete("/session/{session_id}")
async def session_remover(session_id: str):
    deleted = delete_session(session_id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"Session '{session_id}' was not found")
    return {"message": f"Session '{session_id}' deleted successfully"}

@router.get("/sessions")
async def get_all_sessions():
    return {"sessions": list_sessions()}