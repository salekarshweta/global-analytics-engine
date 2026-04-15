from fastapi import FastAPI
import uvicorn
import random

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Global Analytics API is Live"}

@app.get("/api/health")
def get_health():
    regions = ["Dublin", "New York", "Tokyo"]
    return {
        "status": "Online",
        "data": [
            {"region": r, "latency": f"{random.randint(10, 150)}ms"} 
            for r in regions
        ]
    }


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)