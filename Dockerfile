# --- Stage 1: Build the React Frontend ---
FROM node:22-alpine AS build-stage
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
# This allows us to inject the API URL at build time
ARG VITE_API_URL
ENV VITE_APP_API_URL=$VITE_API_URL
RUN npm run build

# --- Stage 2: Build the Python Backend & Serve Frontend ---
FROM python:3.11-slim
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy the React build from Stage 1 into a folder called 'static'
COPY --from=build-stage /app/dist ./static

# Expose the port
EXPOSE 8000

# Command to run the app
# We use '0.0.0.0' so it's accessible from the outside world
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]