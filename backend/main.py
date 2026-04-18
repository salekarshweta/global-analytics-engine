import random
import time
import os
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Global Analytics Engine - SRE Edition")

# Enable CORS so React frontend can talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- INTELLIGENCE LAYER ---
# We store the last 10 latency readings to calculate trends
history = {
    "Dublin": [],
    "New York": [],
    "Tokyo": []
}

def analyze_trend(region, current_latency):
    """
    Inculcating the 'Intelligence Layer'. 
    If latency is 20% higher than the 10-query average, we flag it as 'degraded'.
    """
    region_history = history[region]
    region_history.append(current_latency)
    
    # Keep only the last 10 readings
    if len(region_history) > 10:
        region_history.pop(0)
    
    if len(region_history) < 5:
        return "calibrating" # Not enough data yet
        
    avg = sum(region_history) / len(region_history)
    
    if current_latency > (avg * 1.25):
        return "degraded_risk"
    elif current_latency > (avg * 1.1):
        return "unstable"
    return "stable"

# --- API ENDPOINTS ---

@app.get("/api/health")
async def get_global_health():
    """
    The main telemetry endpoint. 
    Returns the 'Four Golden Signals' for each region.
    """
    regions = [
        {"name": "Dublin", "base": 40},
        {"name": "New York", "base": 85},
        {"name": "Tokyo", "base": 170}
    ]
    
    payload = []
    
    for r in regions:
        # 1. Latency Signal (with random 'noise' to simulate real internet)
        latency = r["base"] + random.randint(-5, 40)
        
        # 2. Intelligence Layer: Analyze the trend
        trend = analyze_trend(r["name"], latency)
        
        # 3. Saturation & Traffic Signals
        payload.append({
            "region": r["name"],
            "metrics": {
                "latency": latency,                    # Signal 1: Latency
                "traffic": random.randint(800, 1500),  # Signal 2: Traffic (RPS)
                "errors": 1 if latency > 200 else 0,   # Signal 3: Errors
                "saturation": round(random.uniform(0.1, 0.7), 2) # Signal 4: Saturation
            },
            "prediction": trend,
            "timestamp": time.time()
        })
        
    return payload

#'Healthz' endpoint for Load Balancers
@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

#The "Home Page" Route
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.get("/")
async def read_index():
    index_path = os.path.join(BASE_DIR, "static", "index.html")
    if not os.path.exists(index_path):
        return {"error": f"Index file not found at {index_path}. Check your Docker build!"}
    return FileResponse(index_path) 

# THE MOUNT LINE 
app.mount("/", StaticFiles(directory=os.path.join(BASE_DIR, "static"), html=True), name="static")