sessions: dict[str, list] = {}

def get_session(session_id: str) -> list:
    if session_id not in sessions:
        sessions[session_id] = []
        return sessions[session_id]
    
def append_message(session_id: str, role: str, content: str) -> None:
    get_session(session_id).append({"role": role, "content": content})

def delete_session(session_id: str) -> bool:
    if session_id not in sessions:
        return False
    
    del sessions[session_id]
    return True

def list_sessions() -> list[str]:
    return list(sessions.keys())