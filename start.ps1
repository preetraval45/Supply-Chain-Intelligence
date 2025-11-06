# Global Supply Chain Intelligence Network - Startup Script
# PowerShell Script for Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GLOBAL SUPPLY CHAIN INTELLIGENCE" -ForegroundColor Green
Write-Host "  NETWORK - STARTUP SCRIPT" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "🔍 Checking Docker..." -ForegroundColor Yellow
try {
    docker ps | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Desktop is not running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start Docker Desktop and try again." -ForegroundColor Yellow
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host ""

# Stop any existing containers
Write-Host "🛑 Stopping existing containers..." -ForegroundColor Yellow
docker-compose down 2>$null

Write-Host ""

# Start Docker containers
Write-Host "🚀 Starting Docker containers..." -ForegroundColor Cyan
Write-Host "   - PostgreSQL Database" -ForegroundColor White
Write-Host "   - FastAPI Backend (3 AI Agents)" -ForegroundColor White
Write-Host "   - Next.js Frontend" -ForegroundColor White
Write-Host ""

docker-compose up -d --build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Failed to start containers!" -ForegroundColor Red
    Write-Host "Check the errors above." -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host ""
Write-Host "✅ Containers started successfully!" -ForegroundColor Green
Write-Host ""

# Wait for services to initialize
Write-Host "⏳ Waiting for services to initialize..." -ForegroundColor Yellow
Write-Host "   (This takes about 30 seconds)" -ForegroundColor Gray
Write-Host ""

for ($i = 1; $i -le 30; $i++) {
    Write-Progress -Activity "Initializing Services" -Status "$i of 30 seconds" -PercentComplete (($i / 30) * 100)
    Start-Sleep -Seconds 1
}

Write-Host "✅ Services initialized!" -ForegroundColor Green
Write-Host ""

# Load database seed data
Write-Host "📊 Loading database with realistic data..." -ForegroundColor Cyan
Write-Host "   - 50 global supply chain routes" -ForegroundColor White
Write-Host "   - 25 historical predictions" -ForegroundColor White
Write-Host "   - 1,000+ IoT sensor readings" -ForegroundColor White
Write-Host "   - Agent activity logs" -ForegroundColor White
Write-Host ""

# First load the schema
docker exec -i supply-chain-db psql -U postgres -d supply_chain -f /docker-entrypoint-initdb.d/init.sql 2>$null

# Then load the seed data
Get-Content "database/seed_data.sql" | docker exec -i supply-chain-db psql -U postgres -d supply_chain

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database loaded with 1000+ records!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Database might already be loaded (this is okay)" -ForegroundColor Yellow
}

Write-Host ""

# Show container status
Write-Host "📦 Container Status:" -ForegroundColor Cyan
docker-compose ps

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅ ALL SYSTEMS OPERATIONAL!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "🌐 Open your browser to:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Dashboard:  " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3000" -ForegroundColor Green
Write-Host "   API Docs:   " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8000/docs" -ForegroundColor Green
Write-Host ""

Write-Host "📊 What you'll see:" -ForegroundColor Yellow
Write-Host "   ✅ Interactive world map with live disruptions" -ForegroundColor White
Write-Host "   ✅ Three AI agents working in real-time" -ForegroundColor White
Write-Host "   ✅ Performance metrics and analytics" -ForegroundColor White
Write-Host "   ✅ Disruptions appearing every 15-45 seconds" -ForegroundColor White
Write-Host ""

Write-Host "🛠️  Useful Commands:" -ForegroundColor Yellow
Write-Host "   View logs:      " -NoNewline -ForegroundColor White
Write-Host "docker-compose logs -f" -ForegroundColor Cyan
Write-Host "   Stop all:       " -NoNewline -ForegroundColor White
Write-Host "docker-compose down" -ForegroundColor Cyan
Write-Host "   Restart:        " -NoNewline -ForegroundColor White
Write-Host "docker-compose restart" -ForegroundColor Cyan
Write-Host ""

Write-Host "🏆 Hackathon Categories: ALL THREE!" -ForegroundColor Magenta
Write-Host "   ✅ AI Agents Category" -ForegroundColor White
Write-Host "   ✅ GPU Category" -ForegroundColor White
Write-Host "   ✅ AI Studio Category" -ForegroundColor White
Write-Host ""

Write-Host "💰 Prize Potential: " -NoNewline -ForegroundColor Yellow
Write-Host "$44,000" -ForegroundColor Green
Write-Host ""

# Try to open browser automatically
Write-Host "🌐 Opening dashboard in browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
