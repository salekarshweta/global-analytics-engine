# Global Analytics Engine 
A high-performance distributed system dashboard designed to visualize network latency across global regions. Built as a part of an intensive **7-day portfolio sprint**.

##  The 7-Day Roadmap
- [x] **Day 1:** Project Architecture & Backend Foundation (Python/FastAPI)
- [x] **Day 2:** React Frontend & Full-Stack Bridge (CORS & Axios)
- [ ] **Day 3:** Data Visualization (Live Recharts & UI/UX Polish)
- [ ] **Day 4:** Azure Cloud Infrastructure & Containerization
- [ ] **Day 5:** Multi-Region Deployment & Traffic Manager
- [ ] **Day 6:** Edge Optimization & Performance Tuning
- [ ] **Day 7:** Final Presentation & Documentation

---

## Log: Day 2 - The Full-Stack Bridge
Today, I successfully connected the Python "Brain" to the React "Face" of the application.
* **The "Bridge" (CORS):** Implemented Cross-Origin Resource Sharing in FastAPI to allow the React frontend to securely talk to the backend.
* **Data Flow:** Established the first API connection using `axios` to fetch real-time latency data.
* **Dynamic UI:** Created an interactive card-based dashboard that updates latency stats for Dublin, New York, and Tokyo.

##  Log: Day 1 - Backend Foundation
The first day focused on setting up the core engine and the development environment.
* **API Development:** Built a RESTful API using **FastAPI** to handle regional health checks.
* **Environment Setup:** Configured a Python Virtual Environment (`venv`) to keep dependencies isolated and professional.
* **Data Simulation:** Wrote a logic layer to simulate global network latency fluctuations for testing purposes.

---

## Tech Stack
- **Backend:** Python (FastAPI, Uvicorn)
- **Frontend:** React (Vite, Axios, Lucide-React)
- **DevOps:** Git, GitHub
- **Cloud (Planned):** Azure

## API Endpoints
- `GET /`: Basic health check.
- `GET /api/health`: Returns simulated global latency data.

---

## How to Run Locally
### 1. Backend Setup
```powershell
cd backend
.\venv\Scripts\activate
python main.py
```

### 2. Frontend Setup
```powershell
cd frontend
npm run dev
```