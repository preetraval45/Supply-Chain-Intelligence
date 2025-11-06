# Deployment Guide

## Prerequisites

1. **Google Cloud Account**: With billing enabled
2. **Google Cloud SDK**: Installed and configured
3. **Docker**: For local development
4. **Node.js 20+**: For frontend development
5. **Python 3.11+**: For backend development

## Local Development

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CODE-RUN-HACKATHON
```

### 2. Set Environment Variables

Create a `.env` file in the root directory:

```env
# Google Cloud
GCP_PROJECT_ID=your-project-id
GOOGLE_API_KEY=your-gemini-api-key

# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=supply_chain

# Mapbox (optional)
MAPBOX_TOKEN=your-mapbox-token
```

### 3. Start Services with Docker Compose

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- FastAPI backend on port 8000
- Next.js frontend on port 3000

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Cloud Run Deployment

### Option 1: Automated Deployment Script

```bash
cd cloudrun
chmod +x deploy.sh
./deploy.sh
```

The script will:
1. Enable required Google Cloud APIs
2. Create Cloud SQL instance
3. Create Cloud Storage bucket
4. Set up Pub/Sub topics
5. Build and push Docker images
6. Deploy all services to Cloud Run

### Option 2: Manual Deployment

#### Step 1: Set Up Google Cloud

```bash
# Set project
gcloud config set project YOUR_PROJECT_ID

# Enable APIs
gcloud services enable \
    run.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    sqladmin.googleapis.com \
    pubsub.googleapis.com \
    storage.googleapis.com
```

#### Step 2: Create Infrastructure

```bash
# Create Cloud SQL instance
gcloud sql instances create supply-chain-db \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=us-central1

# Create database
gcloud sql databases create supply_chain \
    --instance=supply-chain-db

# Create Cloud Storage bucket
gsutil mb -l us-central1 gs://YOUR_PROJECT_ID-satellite-images

# Create Pub/Sub topics
gcloud pubsub topics create satellite-analysis-results
gcloud pubsub topics create disruption-predictions
```

#### Step 3: Set Up Secrets

```bash
# Database password
echo -n "postgres" | gcloud secrets create db-password --data-file=-

# Google API key
echo -n "YOUR_GEMINI_API_KEY" | gcloud secrets create google-api-key --data-file=-

# Mapbox token (optional)
echo -n "YOUR_MAPBOX_TOKEN" | gcloud secrets create mapbox-token --data-file=-
```

#### Step 4: Build and Push Images

```bash
# Backend
gcloud builds submit ./backend \
    --tag gcr.io/YOUR_PROJECT_ID/supply-chain-backend:latest

# Frontend
gcloud builds submit ./frontend \
    --tag gcr.io/YOUR_PROJECT_ID/supply-chain-frontend:latest

# GPU Processor
gcloud builds submit ./gpu-processor \
    --tag gcr.io/YOUR_PROJECT_ID/satellite-image-processor:latest
```

#### Step 5: Deploy Services

```bash
# Backend
gcloud run deploy supply-chain-backend \
    --image gcr.io/YOUR_PROJECT_ID/supply-chain-backend:latest \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --min-instances 1 \
    --max-instances 10 \
    --memory 2Gi \
    --cpu 2 \
    --add-cloudsql-instances YOUR_PROJECT_ID:us-central1:supply-chain-db \
    --set-env-vars POSTGRES_USER=postgres,POSTGRES_DB=supply_chain \
    --set-secrets POSTGRES_PASSWORD=db-password:latest,GOOGLE_API_KEY=google-api-key:latest

# Get backend URL
BACKEND_URL=$(gcloud run services describe supply-chain-backend --region us-central1 --format 'value(status.url)')

# Frontend
gcloud run deploy supply-chain-frontend \
    --image gcr.io/YOUR_PROJECT_ID/supply-chain-frontend:latest \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --min-instances 1 \
    --max-instances 5 \
    --memory 1Gi \
    --cpu 1 \
    --set-env-vars NEXT_PUBLIC_API_URL=$BACKEND_URL \
    --set-secrets NEXT_PUBLIC_MAPBOX_TOKEN=mapbox-token:latest

# GPU Job
gcloud run jobs create satellite-image-processor \
    --image gcr.io/YOUR_PROJECT_ID/satellite-image-processor:latest \
    --region europe-west1 \
    --memory 16Gi \
    --cpu 4 \
    --gpu 1 \
    --gpu-type nvidia-l4 \
    --max-retries 2 \
    --parallelism 5 \
    --tasks 10 \
    --set-env-vars GCS_BUCKET=YOUR_PROJECT_ID-satellite-images,GCP_PROJECT_ID=YOUR_PROJECT_ID
```

#### Step 6: Run the GPU Job

```bash
gcloud run jobs execute satellite-image-processor --region europe-west1
```

## Database Initialization

The database is automatically initialized with the schema from `database/init.sql` when the PostgreSQL container starts.

For Cloud SQL, run the initialization manually:

```bash
# Connect to Cloud SQL
gcloud sql connect supply-chain-db --user=postgres

# Run the init script
\i database/init.sql
```

## Monitoring and Logs

### View Logs

```bash
# Backend logs
gcloud run services logs read supply-chain-backend --region us-central1

# Frontend logs
gcloud run services logs read supply-chain-frontend --region us-central1

# GPU job logs
gcloud run jobs describe satellite-image-processor --region europe-west1
```

### Monitoring Dashboard

Access Cloud Console:
- https://console.cloud.google.com/run
- Select your project
- View metrics for each service

## Scaling Configuration

### Backend

```yaml
autoscaling.knative.dev/minScale: '1'
autoscaling.knative.dev/maxScale: '10'
```

### Frontend

```yaml
autoscaling.knative.dev/minScale: '1'
autoscaling.knative.dev/maxScale: '5'
```

### GPU Job

```yaml
parallelism: 5
taskCount: 10
```

## Cost Optimization

1. **Use minimum instances**: Set `minScale: 0` for development
2. **Right-size resources**: Adjust CPU/memory based on actual usage
3. **GPU region**: Use europe-west1 or europe-west4 for L4 availability
4. **Database tier**: Start with db-f1-micro, upgrade as needed

## Troubleshooting

### Backend won't connect to database

- Check Cloud SQL connection string
- Verify secrets are configured correctly
- Ensure Cloud SQL Proxy is enabled

### GPU job fails

- Verify region supports L4 GPUs (europe-west1, europe-west4)
- Check GPU quotas in your project
- Review job logs for specific errors

### Frontend can't reach backend

- Verify CORS is configured correctly
- Check backend URL environment variable
- Ensure both services are in same region for lower latency

## Production Checklist

- [ ] Enable Cloud Armor for DDoS protection
- [ ] Set up Cloud CDN for frontend
- [ ] Configure custom domain
- [ ] Enable Cloud Monitoring alerts
- [ ] Set up backup strategy for Cloud SQL
- [ ] Review IAM permissions
- [ ] Enable VPC Service Controls
- [ ] Configure Cloud Armor security policies
- [ ] Set up Cloud Scheduler for periodic GPU job runs
- [ ] Implement proper logging and monitoring
