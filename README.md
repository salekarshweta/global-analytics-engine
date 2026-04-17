Global Analytics Engine: Site Reliability Dashboard
A high-performance, real-time distributed system monitor designed to visualize network latency across global regions. This project demonstrates the "Four Golden Signals" of SRE—Latency, Traffic, Errors, and Saturation—built during an intensive 7-day SRE portfolio sprint.

The 7-Day Roadmap
[x] Day 1: Backend Systems Design (FastAPI, Virtualization, & Latency Logic)

[x] Day 2: Full-Stack Integration (CORS, Axios, & State Management)

[x] Day 3: Observability & Data Visualization (Real-time Recharts & Dockerization)

[ ] Day 4: Cloud Instrumentation & Health Checks (Kubernetes Standards)

[ ] Day 5: Multi-Region Infrastructure (Traffic Management & Load Balancing)

[ ] Day 6: Chaos Engineering (Fault Injection & Resilience Testing)

[ ] Day 7: Incident Post-Mortem & Documentation

Day 3 - Observability & Containerization
Shifted focus from raw data to Actionable Insights.

Real-time Visualization: Implemented Recharts to track latency trends over a sliding 45-second window, enabling pattern recognition in network spikes.

Containerization: Architected a Multi-stage Dockerfile. This ensures a lightweight production image (Python slim) by separating the build environment (Node.js) from the runtime environment.

Theming & UX: Refined the UI to support System-level Dark Mode and added conditional status indicators (Red-lining latency above 150ms) to simulate SRE alerts.

Log: Day 2 - The Full-Stack Bridge
CORS Middleware: Secured the API handshake between the FastAPI "Brain" and the React "Face."

Stateful Polling: Established a 3000ms heartbeat interval to simulate real-time stream processing without taxing system resources.

Log: Day 1 - Backend Foundation
RESTful Engineering: Built a modular API using FastAPI designed for low-overhead data serving.

Virtualization: Standardized the dev environment using venv to ensure reproducible builds.

Tech Stack
Backend: Python 3.11, FastAPI (Asynchronous API)

Frontend: React, Vite, Tailwind CSS v4, Recharts

Icons: Lucide-React

DevOps/SRE: Docker (Multi-stage), Git, GitHub

Cloud (Planned): Azure / Google Cloud Platform (GCP)

Systems Instrumentation (API)
GET /: Root health check.

GET /api/health: Returns structured JSON containing regional latency metrics for Dublin, New York, and Tokyo.

Local Development

1. Build the Engine (Backend)

cd backend
.\venv\Scripts\activate
python main.py

2. Build the UI (Frontend)

cd frontend
npm install
npm run dev

3. Build the Container (Production)

docker build -t analytics-engine .