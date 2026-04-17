# Global Analytics Engine - Project Summary

## Overview
Global Analytics Engine is a full-stack monitoring dashboard for visualizing simulated network latency across global regions.  
The project pairs a Python FastAPI backend with a React frontend to show near real-time health and trend data for edge locations.

## Purpose
- Demonstrate full-stack integration between a Python API and a React UI.
- Simulate multi-region performance behavior for observability and dashboard development.
- Serve as a portfolio sprint project with incremental daily milestones.

## Current Architecture
- **Backend (`backend/main.py`)**
  - Built with FastAPI and served with Uvicorn.
  - Enables CORS so the frontend can call the API during local development.
  - Exposes:
    - `GET /` - service health/status message.
    - `GET /api/health` - randomized latency values for Dublin, New York, and Tokyo.
- **Frontend (`frontend/src/App.jsx`)**
  - Built with React + Vite.
  - Polls backend data every 3 seconds using Axios.
  - Displays:
    - Region latency cards with ms values and color-based severity.
    - Real-time trend lines using Recharts.
  - Uses `lucide-react` icons and Tailwind + custom CSS styling.

## Key Features Implemented
- Live API-to-UI connection from FastAPI to React.
- Simulated global latency generation in backend logic.
- Time-series history in the UI (last 15 points).
- Interactive line chart for region trend comparison.
- Dashboard card system for current per-region latency snapshot.

## Technology Stack
- **Backend:** Python, FastAPI, Uvicorn
- **Frontend:** React, Vite, Axios, Recharts, Lucide React
- **Styling:** Tailwind CSS (with custom CSS variables)
- **Tooling:** ESLint, PostCSS, Autoprefixer
- **Version Control:** Git/GitHub
- **Planned Cloud Direction:** Azure deployment and edge routing

## How to Run Locally
1. Start backend:
   - From repo root: `cd backend`
   - Activate environment and run: `python main.py`
2. Start frontend:
   - From repo root: `cd frontend`
   - Install dependencies if needed: `npm install`
   - Run dev server: `npm run dev`
3. Open the Vite local URL in a browser (typically `http://127.0.0.1:5173`).

## API Contract (Current)
- **Endpoint:** `GET /api/health`
- **Response shape:**
  - `status` (string)
  - `latency_ms` (object with numeric values)
    - `Dublin`
    - `New York`
    - `Tokyo`

## Progress Snapshot
Based on project notes and roadmap:
- Completed: backend foundation, full-stack connection, and dynamic dashboard baseline.
- In progress / next: deeper visualization polish, cloud/container setup, multi-region deployment, and performance optimization.

## Notes
- Latency values are simulated for development/demo purposes and not sourced from live probes yet.
- Frontend currently points to local backend URL (`http://127.0.0.1:8000`), which should be environment-configurable for deployment.
