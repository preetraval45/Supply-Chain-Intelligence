"""
FastAPI Backend for Global Supply Chain Intelligence Network
Handles API requests, WebSocket connections, and orchestrates AI agents
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import socketio
import uvicorn
from datetime import datetime
import asyncio
from typing import List
import random

from database import engine, Base, get_db
from models import Disruption, Route, SensorReading
from agents.prediction_agent import PredictionAgent
from agents.optimization_agent import OptimizationAgent
from agents.alert_agent import AlertAgent

# Initialize Socket.IO
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*'
)

# Agents
prediction_agent = PredictionAgent()
optimization_agent = OptimizationAgent()
alert_agent = AlertAgent()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup: Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Start background tasks
    asyncio.create_task(simulate_disruption_detection())

    yield

    # Shutdown
    await engine.dispose()

app = FastAPI(
    title="Global Supply Chain Intelligence API",
    description="AI-powered supply chain disruption prediction and optimization",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Wrap with Socket.IO
socket_app = socketio.ASGIApp(sio, app)

# In-memory store for demo (replace with database queries in production)
disruptions_store: List[dict] = []

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Global Supply Chain Intelligence Network",
        "version": "1.0.0",
        "agents": {
            "prediction": "active",
            "optimization": "active",
            "alert": "active"
        }
    }

@app.get("/api/disruptions")
async def get_disruptions():
    """Get all recent disruptions"""
    return disruptions_store[:50]  # Return last 50 disruptions

@app.get("/api/routes")
async def get_routes():
    """Get all supply chain routes"""
    return [
        {
            "id": "route-1",
            "origin": "Shanghai",
            "destination": "Los Angeles",
            "status": "normal",
            "estimated_delay": 0,
            "risk_score": 0.15
        },
        {
            "id": "route-2",
            "origin": "Rotterdam",
            "destination": "New York",
            "status": "warning",
            "estimated_delay": 12,
            "risk_score": 0.67
        },
        {
            "id": "route-3",
            "origin": "Singapore",
            "destination": "Dubai",
            "status": "normal",
            "estimated_delay": 0,
            "risk_score": 0.22
        }
    ]

@app.get("/api/metrics")
async def get_metrics():
    """Get system performance metrics"""
    return {
        "prediction_accuracy": 0.987,
        "avg_warning_time_hours": 48,
        "cost_saved_today": 2400000,
        "disruptions_prevented": 23,
        "routes_optimized": 156,
        "active_agents": 3
    }

@sio.event
async def connect(sid, environ):
    """Handle WebSocket connection"""
    print(f"Client connected: {sid}")
    await sio.emit('connection_established', {'sid': sid})

@sio.event
async def disconnect(sid):
    """Handle WebSocket disconnection"""
    print(f"Client disconnected: {sid}")

async def simulate_disruption_detection():
    """
    Background task that simulates the AI agents detecting disruptions
    In production, this would be triggered by real satellite imagery,
    IoT sensors, and Gemini analysis
    """
    await asyncio.sleep(5)  # Wait for startup

    disruption_types = [
        "Port Congestion",
        "Severe Weather",
        "Geopolitical Event",
        "Infrastructure Failure",
        "Cyber Security Threat",
        "Labor Strike",
        "Natural Disaster"
    ]

    locations = [
        (121.47, 31.23, "Shanghai"),    # Shanghai
        (4.47, 51.92, "Rotterdam"),      # Rotterdam
        (103.85, 1.29, "Singapore"),     # Singapore
        (-118.24, 33.74, "Los Angeles"), # LA
        (-74.00, 40.71, "New York"),     # NYC
        (55.27, 25.20, "Dubai"),         # Dubai
    ]

    while True:
        try:
            await asyncio.sleep(random.randint(15, 45))  # Random interval

            # Simulate prediction agent detecting a disruption
            location = random.choice(locations)
            disruption = {
                "id": f"disruption-{len(disruptions_store) + 1}",
                "type": random.choice(disruption_types),
                "location": [location[0], location[1]],
                "locationName": location[2],
                "severity": random.choice(["low", "medium", "high", "critical"]),
                "confidence": round(random.uniform(0.75, 0.99), 2),
                "affectedRoutes": random.randint(1, 15),
                "timestamp": datetime.utcnow().isoformat(),
                "description": f"AI agents detected potential disruption in {location[2]}"
            }

            # Store disruption
            disruptions_store.insert(0, disruption)
            if len(disruptions_store) > 100:
                disruptions_store.pop()

            # Emit to all connected clients
            await sio.emit('disruption_update', disruption)

            print(f"New disruption detected: {disruption['type']} in {disruption['locationName']}")

        except Exception as e:
            print(f"Error in disruption simulation: {e}")
            await asyncio.sleep(10)

if __name__ == "__main__":
    uvicorn.run(
        "main:socket_app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
