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
    # We send an object where city names are the keys
    # and the latency values are INTEGERS (no "ms" text)
    return {
        "status": "Online",
        "latency_ms": {
            "Dublin": random.randint(10, 80),
            "New York": random.randint(80, 150),
            "Tokyo": random.randint(150, 250)
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)