#!/bin/bash

# Deployment script for Global Supply Chain Intelligence Network
# Deploys all services to Google Cloud Run

set -e

# Configuration
PROJECT_ID=${GCP_PROJECT_ID:-"your-project-id"}
REGION=${GCP_REGION:-"us-central1"}
GPU_REGION=${GPU_REGION:-"europe-west1"}

echo "=================================="
echo "Cloud Run Deployment Script"
echo "=================================="
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo "GPU Region: $GPU_REGION"
echo "=================================="

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Please install Google Cloud SDK."
    exit 1
fi

# Set project
echo "📍 Setting GCP project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable \
    run.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com \
    sqladmin.googleapis.com \
    pubsub.googleapis.com \
    storage.googleapis.com

# Create Cloud SQL instance (if not exists)
echo "🗄️  Creating Cloud SQL instance..."
gcloud sql instances create supply-chain-db \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=$REGION \
    --root-password=postgres \
    || echo "Cloud SQL instance already exists"

# Create database
echo "📊 Creating database..."
gcloud sql databases create supply_chain \
    --instance=supply-chain-db \
    || echo "Database already exists"

# Create Cloud Storage bucket for satellite images
echo "🪣 Creating Cloud Storage bucket..."
gsutil mb -l $REGION gs://$PROJECT_ID-satellite-images || echo "Bucket already exists"

# Create Pub/Sub topics
echo "📮 Creating Pub/Sub topics..."
gcloud pubsub topics create satellite-analysis-results || echo "Topic already exists"
gcloud pubsub topics create disruption-predictions || echo "Topic already exists"

# Build and push Docker images
echo "🏗️  Building Docker images..."

# Backend
echo "  Building backend..."
gcloud builds submit ./backend \
    --tag gcr.io/$PROJECT_ID/supply-chain-backend:latest

# Frontend
echo "  Building frontend..."
gcloud builds submit ./frontend \
    --tag gcr.io/$PROJECT_ID/supply-chain-frontend:latest

# GPU Processor
echo "  Building GPU processor..."
gcloud builds submit ./gpu-processor \
    --tag gcr.io/$PROJECT_ID/satellite-image-processor:latest

# Deploy Backend Service
echo "🚀 Deploying backend service..."
gcloud run deploy supply-chain-backend \
    --image gcr.io/$PROJECT_ID/supply-chain-backend:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --min-instances 1 \
    --max-instances 10 \
    --memory 2Gi \
    --cpu 2 \
    --add-cloudsql-instances $PROJECT_ID:$REGION:supply-chain-db \
    --set-env-vars POSTGRES_USER=postgres,POSTGRES_DB=supply_chain,POSTGRES_PORT=5432,GCP_PROJECT_ID=$PROJECT_ID \
    --set-secrets POSTGRES_PASSWORD=db-password:latest,GOOGLE_API_KEY=google-api-key:latest

# Get backend URL
BACKEND_URL=$(gcloud run services describe supply-chain-backend --platform managed --region $REGION --format 'value(status.url)')
echo "✅ Backend deployed: $BACKEND_URL"

# Deploy Frontend Service
echo "🚀 Deploying frontend service..."
gcloud run deploy supply-chain-frontend \
    --image gcr.io/$PROJECT_ID/supply-chain-frontend:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --min-instances 1 \
    --max-instances 5 \
    --memory 1Gi \
    --cpu 1 \
    --set-env-vars NEXT_PUBLIC_API_URL=$BACKEND_URL \
    --set-secrets NEXT_PUBLIC_MAPBOX_TOKEN=mapbox-token:latest

# Get frontend URL
FRONTEND_URL=$(gcloud run services describe supply-chain-frontend --platform managed --region $REGION --format 'value(status.url)')
echo "✅ Frontend deployed: $FRONTEND_URL"

# Create GPU Job
echo "🚀 Creating GPU processing job..."
gcloud run jobs create satellite-image-processor \
    --image gcr.io/$PROJECT_ID/satellite-image-processor:latest \
    --region $GPU_REGION \
    --memory 16Gi \
    --cpu 4 \
    --gpu 1 \
    --gpu-type nvidia-l4 \
    --max-retries 2 \
    --parallelism 5 \
    --tasks 10 \
    --set-env-vars GCS_BUCKET=$PROJECT_ID-satellite-images,GCP_PROJECT_ID=$PROJECT_ID,CLOUD_RUN_JOB=true \
    || echo "GPU job already exists, updating..."

echo ""
echo "=================================="
echo "✅ Deployment Complete!"
echo "=================================="
echo "Frontend URL: $FRONTEND_URL"
echo "Backend URL: $BACKEND_URL"
echo ""
echo "To run the GPU job:"
echo "  gcloud run jobs execute satellite-image-processor --region $GPU_REGION"
echo ""
echo "To view logs:"
echo "  gcloud run services logs read supply-chain-backend --region $REGION"
echo "  gcloud run services logs read supply-chain-frontend --region $REGION"
echo "=================================="
