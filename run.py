import os
import uvicorn
from dotenv import load_dotenv

load_dotenv()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 10000))
    uvicorn.run(
        "quizgen_api.main:app",
        host="0.0.0.0",
        port=port,
        reload=False
    )