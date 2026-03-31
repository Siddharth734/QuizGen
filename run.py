import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "quizgen_api.main:app",
        host="0.0.0.0",
        port= 10000,
        reload=True
    )