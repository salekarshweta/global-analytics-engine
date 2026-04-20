Global Analytics Engine: Site Reliability Dashboard
A high-performance, real-time distributed system monitor designed to visualize network latency across global regions. This project demonstrates the "Four Golden Signals" of SRE—Latency, Traffic, Errors, and Saturation—built during an intensive 7-day SRE portfolio sprint.

The 7-Day Roadmap
[x] Day 1: Backend Systems Design (FastAPI, Virtualization, & Latency Logic)

[x] Day 2: Full-Stack Integration (CORS, Axios, & State Management)

[x] Day 3: Observability & Data Visualization (Real-time Recharts & Dockerization)

[x] Day 4: Cloud Instrumentation & Health Checks (Kubernetes Standards)

[x] Day 5: Multi-Region Infrastructure (Traffic Management & Load Balancing)

[x] Day 6: Chaos Engineering (Fault Injection & Resilience Testing)

[x] Day 7: Incident Post-Mortem & Documentation


Day 7: Incident Post-Mortem 

Incident: Regional Service Degradation (Simulated)
Duration: 15 Minutes
Impact: Tokyo and New York nodes were taken offline to test global failover.

Analysis
- Detection: Front Door Health Probes identified 5xx responses from the Tokyo/NY endpoints within 30 seconds.
- Mitigation: Traffic was automatically re-routed to the Dublin node via Anycast networking. 
- User Experience: Zero downtime. The Global Entry point remained active, though latency increased slightly for Asian/American users due to cross-continental routing to Europe.
- Resolution: Re-provisioned regional nodes and verified health check recovery.

Root Cause Analysis (RCA)
The outage was a "Chaos Test" to verify that the **Global Analytics Engine** adheres to High Availability (HA) standards.


Log: Day 6 - Chaos Engineering & Fault Tolerance
Objective: Prove system "High Availability" by simulating a catastrophic regional failure.

- Fault Injection: Manually decommissioned the "Tokyo" and "New York" nodes using the Azure CLI ('az webapp stop') to simulate a multi-region power outage.
- Failover Verification: Validated that the **Azure Front Door** health probes (configured on Day 5) successfully detected the 5xx/Connection Refused errors and automatically rerouted 100% of global traffic to the surviving "Dublin" node.
- Observability in Crisis: Instrumented the dashboard to reflect "Critical" states when regional health pings fail, demonstrating the transition from a "Steady State" to an "Incident State" without user-facing downtime.


Log: Day 5 - Multi-Region Infrastructure & Global Load Balancing
Objective: Scale the engine from a single-point-of-failure to a globally distributed fleet.

- Horizontal Scaling: Scaled the architecture to three strategic regions (Dublin, New York, Tokyo) using an Azure App Service Fleet on a shared Linux plan to optimize cost-to-performance.
- Global Entry Point: Implemented Azure Front Door (Standard Tier). This replaced individual regional URLs with a single, globally optimized Anycast entry point.
- Intelligent Routing: Configured "Latency-Based Routing" and "Health Probes" ('/healthz'). The system now automatically pings all three regions every 30 seconds to ensure traffic is only sent to "Healthy" origins.
- Modern Networking: Pivoted from deprecated Front Door Classic to the modern 'az afd' resource set, implementing Origin Groups and Route-linking via the CLI.


Log: Day 4 - Cloud Instrumentation & Production Deployment
Shifted the engine from "Localhost" to a Globally Accessible Cloud Environment.

Production Handshake: Resolved critical "Not Found" routing issues by re-architecting the FastAPI mount sequence, ensuring the backend correctly serves React static assets from the root path.

Container Registry (ACR): Automated the build-and-push pipeline using Azure Container Registry, leveraging cloud-side Docker builds to minimize local resource strain.

Environmental Hardening: Managed sensitive production credentials and internal port mapping (WEBSITES_PORT=8000) through Azure App Service environment variables to ensure secure, isolated communication.

Health Checks: Implemented a /healthz endpoint to satisfy load balancer probes and ensure zero-downtime container recycling.


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

Frontend: React, Vite, Tailwind CSS, Recharts

Icons: Lucide-React (Contextual System Status Icons)

DevOps/SRE: Docker (Multi-stage), Azure Container Registry (ACR), Azure App Service

Cloud Infrastructure: Microsoft Azure

Systems Instrumentation (API)
GET /: Serves the production-built React frontend.

GET /healthz: Heartbeat endpoint for cloud health monitoring.

GET /api/health: Returns structured telemetry (Latency, Traffic, Errors, Saturation) for global regions.

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

Production Deployment (Azure CLI)

Build the image in the cloud
az acr build --registry <RegistryName> --image global-noc:v1 .

Set environment variables for the Web App
az webapp config appsettings set --name <AppName> --settings WEBSITES_PORT=8000

Deploy the Load Balancer (Front Door)
az afd profile create --profile-name global-dispatch --sku Standard_AzureFrontDoor

Check Global Endpoint Status
az afd endpoint show --profile-name global-dispatch --query "hostName"


