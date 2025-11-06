# Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Client Layer                                    │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │         Next.js Frontend (Cloud Run Service)                      │  │
│  │  - React 18 + TypeScript                                          │  │
│  │  - Tailwind CSS                                                    │  │
│  │  - Mapbox GL (Interactive Maps)                                   │  │
│  │  - Chart.js (Real-time Analytics)                                 │  │
│  │  - WebSocket (Live Updates)                                       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │ HTTPS
                                     │ WebSocket
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      API & Orchestration Layer                           │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │       FastAPI Backend (Cloud Run Service)                         │  │
│  │  - Python 3.11 + FastAPI                                          │  │
│  │  - Socket.IO (WebSocket Server)                                   │  │
│  │  - SQLAlchemy ORM                                                 │  │
│  │  - Async/Await Architecture                                       │  │
│  │  - RESTful API Endpoints                                          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└──┬────────────────────┬──────────────────────┬─────────────────────────┘
   │                    │                      │
   │                    │                      │
┌──▼────────────────┐ ┌─▼──────────────────┐ ┌▼────────────────────┐
│  Prediction       │ │  Optimization      │ │  Alert              │
│  Agent (ADK)      │ │  Agent (ADK)       │ │  Agent (ADK)        │
│                   │ │                    │ │                     │
│  • Satellite      │ │  • Route           │ │  • Alert            │
│    Analysis       │ │    Optimization    │ │    Generation       │
│  • IoT Data       │ │  • Inventory       │ │  • Stakeholder      │
│    Processing     │ │    Rebalancing     │ │    Notification     │
│  • Gemini AI      │ │  • Cost            │ │  • Resolution       │
│    Integration    │ │    Calculation     │ │    Tracking         │
└──┬────────────────┘ └─┬──────────────────┘ └┬────────────────────┘
   │                    │                      │
   │    Pub/Sub         │    Pub/Sub           │    Pub/Sub
   │    Messages        │    Messages          │    Messages
   │                    │                      │
   └────────────────────┴──────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      Processing Layer                                    │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │     GPU Image Processor (Cloud Run Job)                           │  │
│  │  - NVIDIA L4 GPU                                                  │  │
│  │  - TensorFlow 2.15                                                │  │
│  │  - OpenCV                                                         │  │
│  │  - Batch Processing (10 images/batch)                            │  │
│  │  - Parallel Execution (5 tasks)                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │     IoT Worker Pool (Cloud Run Worker)                            │  │
│  │  - Pub/Sub Consumer                                               │  │
│  │  - Real-time Sensor Data Ingestion                               │  │
│  │  - Anomaly Detection                                              │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────┬──────────────────────┬─────────────────────────────┘
                     │                      │
                     ▼                      ▼
┌──────────────────────────────┐  ┌──────────────────────────────┐
│   Cloud Storage              │  │   Cloud Pub/Sub              │
│                              │  │                              │
│  • Satellite Images          │  │  • Agent Messages            │
│  • ML Models                 │  │  • IoT Data Stream           │
│  • Processed Results         │  │  • Event Notifications       │
└──────────────────────────────┘  └──────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         Data Layer                                       │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │     Cloud SQL (PostgreSQL 15)                                     │  │
│  │  - Routes Table (supply chain paths)                             │  │
│  │  - Predictions Table (disruption forecasts)                      │  │
│  │  - Sensor Readings Table (time-series data)                      │  │
│  │  - Agent Activity Table (audit logs)                             │  │
│  │  - Connection Pooling (Cloud SQL Proxy)                          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         AI Services Layer                                │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │     Google Gemini 1.5 Pro                                         │  │
│  │  - Multimodal Analysis (Text + Images)                           │  │
│  │  - News & Social Media Analysis                                  │  │
│  │  - Context-Aware Predictions                                     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Frontend (Next.js)
- **Technology**: Next.js 14, TypeScript, Tailwind CSS
- **Deployment**: Cloud Run Service
- **Features**:
  - Real-time dashboard with live updates
  - Interactive map showing disruptions
  - Performance metrics and analytics
  - Agent status monitoring
- **Scaling**: 1-5 instances

### 2. Backend (FastAPI)
- **Technology**: Python 3.11, FastAPI, Socket.IO
- **Deployment**: Cloud Run Service
- **Features**:
  - RESTful API endpoints
  - WebSocket server for real-time updates
  - Agent orchestration
  - Database connection management
- **Scaling**: 1-10 instances

### 3. AI Agents (Google ADK)
Three specialized agents communicate via Pub/Sub:

#### Prediction Agent
- Analyzes satellite imagery
- Processes IoT sensor data
- Uses Gemini for multimodal analysis
- Predicts disruptions 24-72 hours ahead

#### Optimization Agent
- Calculates alternative routes
- Rebalances inventory
- Optimizes for cost, time, and risk

#### Alert Agent
- Creates comprehensive alerts
- Notifies stakeholders
- Tracks resolution progress

### 4. GPU Processor
- **Technology**: TensorFlow 2.15, OpenCV
- **Deployment**: Cloud Run Job with NVIDIA L4 GPU
- **Features**:
  - Batch processing of satellite images
  - Computer vision models
  - Port congestion detection
  - Weather pattern analysis
- **Region**: europe-west1 or europe-west4 (GPU availability)

### 5. Database (PostgreSQL)
- **Deployment**: Cloud SQL
- **Tables**:
  - Routes (supply chain paths)
  - Predictions (disruption forecasts)
  - Sensor Readings (time-series data)
  - Agent Activity (audit logs)

## Data Flow

1. **Satellite Image Processing**:
   - Images uploaded to Cloud Storage
   - GPU Job triggered to process batch
   - Results published to Pub/Sub
   - Prediction Agent consumes results

2. **IoT Data Ingestion**:
   - Sensors publish to Pub/Sub
   - Worker Pool consumes messages
   - Data stored in PostgreSQL
   - Anomalies trigger Prediction Agent

3. **Disruption Prediction**:
   - Prediction Agent analyzes all data sources
   - Uses Gemini for context-aware analysis
   - Sends predictions to Optimization Agent
   - Stores predictions in database

4. **Route Optimization**:
   - Optimization Agent receives predictions
   - Calculates alternative routes
   - Rebalances inventory
   - Sends plan to Alert Agent

5. **Alert Generation**:
   - Alert Agent creates comprehensive alert
   - Identifies stakeholders
   - Sends notifications
   - Updates frontend via WebSocket

## Scaling Strategy

- **Frontend**: Auto-scales 1-5 instances based on traffic
- **Backend**: Auto-scales 1-10 instances based on concurrent requests
- **GPU Jobs**: Runs 5 parallel tasks per execution
- **Database**: Cloud SQL with connection pooling

## Security

- All services use HTTPS
- Secrets stored in Google Secret Manager
- Database accessed via Cloud SQL Proxy
- IAM roles for service-to-service authentication
