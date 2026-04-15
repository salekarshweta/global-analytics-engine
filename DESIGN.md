# Technical Design: Global Analytics Engine

## Problem Statement
Users across different continents experience varying latencies. We need a way to visualize this and ensure system health.

## Proposed Solution
A FastAPI-based backend that simulates multi-region health data, which will eventually be served via Azure Front Door to minimize real-world latency.