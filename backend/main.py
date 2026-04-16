from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import random

app = FastAPI()

# This is the "Security Pass" that allows React (Port 5173) 
# to talk to FastAPI (Port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Global Analytics API is Live"}

@app.get("/api/health")
def get_health():
    # We simulate data for our global dashboard
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