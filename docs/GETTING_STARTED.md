# Getting Started Guide

## Quick Start (5 minutes)

### Prerequisites
- Docker and Docker Compose installed
- Google Cloud account (for Gemini API key)

### 1. Clone and Setup

```bash
git clone <repository-url>
cd CODE-RUN-HACKATHON
cp .env.example .env
```

### 2. Get Google Gemini API Key

1. Visit https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add to `.env`:
   ```
   GOOGLE_API_KEY=your-api-key-here
   ```

### 3. Start the Application

```bash
docker-compose up -d
```

Wait 30 seconds for services to start, then open:
- **Dashboard**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs

### 4. See It in Action

The system will automatically:
- Generate sample disruption predictions every 15-45 seconds
- Display them on the interactive map
- Show agent activity in real-time
- Update metrics and analytics

## Project Structure

```
CODE-RUN-HACKATHON/
├── frontend/              # Next.js dashboard
│   ├── app/              # Pages and components
│   ├── package.json
│   └── Dockerfile
├── backend/              # FastAPI server
│   ├── agents/          # AI agents
│   ├── main.py          # API endpoints
│   ├── database.py      # Database config
│   └── Dockerfile
├── gpu-processor/        # GPU image processing
│   ├── process_images.py
│   └── Dockerfile
├── database/            # PostgreSQL schema
│   └── init.sql
├── cloudrun/            # Cloud Run configs
│   ├── deploy.sh
│   └── *.yaml
├── docs/                # Documentation
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   └── GETTING_STARTED.md
├── docker-compose.yml   # Local development
└── README.md           # Main documentation
```

## Understanding the System

### Three AI Agents

The system uses three AI agents that work together:

1. **Prediction Agent** (`backend/agents/prediction_agent.py`)
   - Analyzes satellite imagery and IoT data
   - Uses Google Gemini for multimodal analysis
   - Predicts disruptions 24-72 hours ahead

2. **Optimization Agent** (`backend/agents/optimization_agent.py`)
   - Calculates alternative routes
   - Rebalances inventory across warehouses
   - Optimizes for cost, time, and risk

3. **Alert Agent** (`backend/agents/alert_agent.py`)
   - Creates comprehensive alerts
   - Identifies and notifies stakeholders
   - Tracks resolution progress

### Data Flow

```
Satellite Images → GPU Processor → Prediction Agent
                                         ↓
IoT Sensors ────────────────────→ Prediction Agent
                                         ↓
News/Social Media ──────────────→ Prediction Agent
                                         ↓
                                  Optimization Agent
                                         ↓
                                    Alert Agent
                                         ↓
                                   Frontend Dashboard
```

## Development Workflow

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000

### Backend Development

```bash
cd backend
pip install -r requirements.txt
uvicorn main:socket_app --reload
```

Visit http://localhost:8000/docs

### Database Access

```bash
# Connect to PostgreSQL
docker exec -it supply-chain-db psql -U postgres -d supply_chain

# List tables
\dt

# Query predictions
SELECT * FROM predictions ORDER BY prediction_time DESC LIMIT 10;
```

## Testing the Agents

### Test Prediction Agent

```python
from agents.prediction_agent import PredictionAgent

agent = PredictionAgent()
result = await agent.predict_disruption()
print(result)
```

### Test Optimization Agent

```python
from agents.optimization_agent import OptimizationAgent

agent = OptimizationAgent()
plan = await agent.optimize({
    "affected_routes": ["route-1", "route-2"],
    "confidence": 0.87
})
print(plan)
```

### Test Alert Agent

```python
from agents.alert_agent import AlertAgent

agent = AlertAgent()
alert = await agent.process_alert(
    disruption={"type": "Port Congestion"},
    optimization_plan={"alternative_routes": []}
)
print(alert)
```

## Customization

### Add New Disruption Types

Edit `backend/main.py`:

```python
disruption_types = [
    "Port Congestion",
    "Severe Weather",
    "Your New Type Here"  # Add here
]
```

### Modify Map Appearance

Edit `frontend/app/components/MapContainer.tsx`:

```typescript
style: 'mapbox://styles/mapbox/dark-v11',  // Change map style
center: [0, 20],  // Change default center
zoom: 2,          // Change default zoom
```

### Adjust Agent Behavior

Each agent has configurable parameters in their respective files under `backend/agents/`.

## Common Issues

### Port Already in Use

```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Database Connection Failed

```bash
# Restart PostgreSQL container
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### No Disruptions Showing

- Wait 30 seconds after startup
- Check backend logs: `docker-compose logs backend`
- Verify WebSocket connection in browser console

## Next Steps

1. **Add Real Satellite Data**: Replace synthetic images with real satellite imagery
2. **Train Custom Models**: Fine-tune models for your specific use case
3. **Integrate Real IoT**: Connect actual sensor data streams
4. **Deploy to Production**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for Cloud Run
5. **Add More Agents**: Extend with additional specialized agents

## Resources

- [Architecture Diagram](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Google Cloud Run Docs](https://cloud.google.com/run/docs)
- [Google ADK Docs](https://cloud.google.com/agent-development-kit)
- [Gemini API Docs](https://ai.google.dev/docs)

## Support

For issues or questions:
1. Check the [documentation](../README.md)
2. Review [common issues](#common-issues)
3. Open an issue on GitHub
