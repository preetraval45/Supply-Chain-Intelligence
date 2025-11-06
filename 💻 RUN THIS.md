# How to Run

## Quick Start

### Step 1: Open PowerShell as Administrator

1. Press `Windows Key`
2. Type `PowerShell`
3. Right-click → Run as Administrator

### Step 2: Navigate to Project

```powershell
cd "C:\Users\raval\OneDrive - University of North Carolina at Charlotte\Documents\GitHub\CODE-RUN-HACKATHON"
```

### Step 3: Start Everything

```powershell
docker-compose up -d --build
```

Wait 2-3 minutes for build to complete.

### Step 4: Load Database

```powershell
Start-Sleep -Seconds 30
Get-Content "database\seed_data.sql" | docker exec -i supply-chain-db psql -U postgres -d supply_chain
```

### Step 5: Open Browser

```powershell
Start-Process "http://localhost:3000"
```

## What You'll See

- Interactive world map
- Real-time disruptions (appear every 15-45 seconds)
- Three AI agents working
- Live metrics and analytics

## To Stop

```powershell
docker-compose down
```

## Troubleshooting

**Port in use:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <number> /F
```

**No disruptions:** Wait 60 seconds, they appear automatically

**Logs:**
```powershell
docker-compose logs -f backend
```

## More Info

- [README.md](README.md) - Complete documentation
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Hackathon info
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) - Deploy to Cloud Run
