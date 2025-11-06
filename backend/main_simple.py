"""
Simplified FastAPI Backend - Works WITHOUT Database
For quick demo when Docker/PostgreSQL is not available
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio
from datetime import datetime
import asyncio
import random
from typing import List

# Initialize Socket.IO
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*'
)

app = FastAPI(
    title="Global Supply Chain Intelligence API (Simple Mode)",
    description="Running without database - simulated data only",
    version="1.0.0"
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

# In-memory store
disruptions_store: List[dict] = []

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Global Supply Chain Intelligence Network (Simple Mode)",
        "version": "1.0.0",
        "mode": "no-database",
        "agents": {
            "prediction": "active",
            "optimization": "active",
            "alert": "active"
        }
    }

@app.get("/api/disruptions")
async def get_disruptions():
    """Get all recent disruptions"""
    return disruptions_store[:50]

@app.get("/api/routes")
async def get_routes():
    """Get sample supply chain routes"""
    return [
        {
            "id": "route-1",
            "origin": "Shanghai, China",
            "destination": "Los Angeles, USA",
            "status": "normal",
            "estimated_delay": 0,
            "risk_score": 0.15
        },
        {
            "id": "route-2",
            "origin": "Rotterdam, Netherlands",
            "destination": "New York, USA",
            "status": "warning",
            "estimated_delay": 12,
            "risk_score": 0.67
        },
        {
            "id": "route-3",
            "origin": "Singapore",
            "destination": "Dubai, UAE",
            "status": "normal",
            "estimated_delay": 0,
            "risk_score": 0.22
        },
        {
            "id": "route-4",
            "origin": "Hong Kong, China",
            "destination": "Vancouver, Canada",
            "status": "critical",
            "estimated_delay": 48,
            "risk_score": 0.92
        },
        {
            "id": "route-5",
            "origin": "Hamburg, Germany",
            "destination": "Miami, USA",
            "status": "normal",
            "estimated_delay": 4,
            "risk_score": 0.28
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
        "active_agents": 3,
        "mode": "demo"
    }

@sio.event
async def connect(sid, environ):
    """Handle WebSocket connection"""
    print(f"✅ Client connected: {sid}")
    await sio.emit('connection_established', {'sid': sid, 'mode': 'simple'})

@sio.event
async def disconnect(sid):
    """Handle WebSocket disconnection"""
    print(f"❌ Client disconnected: {sid}")

@app.on_event("startup")
async def startup_event():
    """Start background tasks"""
    asyncio.create_task(simulate_disruption_detection())
    print("🚀 Backend started in SIMPLE mode (no database)")
    print("📊 Generating simulated disruptions...")

async def simulate_disruption_detection():
    """Generate simulated disruptions"""
    await asyncio.sleep(5)

    disruption_types = [
        "Port Congestion",
        "Severe Weather",
        "Infrastructure Failure",
        "Labor Strike",
        "Cyber Security Threat",
        "Geopolitical Event",
        "Natural Disaster",
        "Equipment Shortage"
    ]

    locations = [
        (121.47, 31.23, "Shanghai, China"),
        (4.47, 51.92, "Rotterdam, Netherlands"),
        (103.85, 1.29, "Singapore"),
        (-118.24, 33.74, "Los Angeles, USA"),
        (-74.00, 40.71, "New York, USA"),
        (55.27, 25.20, "Dubai, UAE"),
        (114.17, 22.32, "Hong Kong, China"),
        (13.38, 52.52, "Hamburg, Germany"),
        (-80.19, 25.77, "Miami, USA"),
        (139.77, 35.68, "Tokyo, Japan")
    ]

    while True:
        try:
            await asyncio.sleep(random.randint(10, 30))

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
                "description": f"AI agents detected potential {random.choice(disruption_types).lower()} in {location[2]}"
            }

            disruptions_store.insert(0, disruption)
            if len(disruptions_store) > 100:
                disruptions_store.pop()

            await sio.emit('disruption_update', disruption)
            print(f"🚨 New disruption: {disruption['type']} in {disruption['locationName']}")

        except Exception as e:
            print(f"❌ Error: {e}")
            await asyncio.sleep(10)

if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*60)
    print("  GLOBAL SUPPLY CHAIN INTELLIGENCE NETWORK")
    print("  Running in SIMPLE mode (no database required)")
    print("="*60 + "\n")
    uvicorn.run(socket_app, host="0.0.0.0", port=8000)
