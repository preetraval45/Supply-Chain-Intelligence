# Run Application Locally Without Docker
# PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SUPPLY CHAIN INTELLIGENCE - LOCAL RUN" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$ProjectRoot = $PSScriptRoot

# Check if Node.js is installed
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not installed!" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Check if Python is installed
Write-Host "Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "✅ Python installed: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python not installed!" -ForegroundColor Red
    Write-Host "Download from: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Check if PostgreSQL is installed
Write-Host "Checking PostgreSQL..." -ForegroundColor Yellow
try {
    $psqlVersion = psql --version
    Write-Host "✅ PostgreSQL installed: $psqlVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  PostgreSQL not found in PATH" -ForegroundColor Yellow
    Write-Host "If installed, add to PATH or skip database setup" -ForegroundColor Gray
}

Write-Host ""

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Cyan
cd "$ProjectRoot\frontend"
if (!(Test-Path "node_modules")) {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Frontend dependencies ready" -ForegroundColor Green

Write-Host ""

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Cyan
cd "$ProjectRoot\backend"
pip install -r requirements.txt --quiet
Write-Host "✅ Backend dependencies ready" -ForegroundColor Green

Write-Host ""

# Setup environment
Write-Host "⚙️  Setting up environment..." -ForegroundColor Cyan
cd $ProjectRoot
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file" -ForegroundColor Green
} else {
    Write-Host "✅ .env file exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  STARTING SERVICES" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "🚀 Starting Backend..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    param($path)
    cd "$path\backend"
    $env:PYTHONPATH = $path + "\backend"
    uvicorn main:socket_app --host 0.0.0.0 --port 8000
} -ArgumentList $ProjectRoot

Start-Sleep -Seconds 3

Write-Host "🚀 Starting Frontend..." -ForegroundColor Yellow
$frontendJob = Start-Job -ScriptBlock {
    param($path)
    cd "$path\frontend"
    npm run dev
} -ArgumentList $ProjectRoot

Write-Host ""
Write-Host "⏳ Waiting for services to start..." -ForegroundColor Yellow
for ($i = 1; $i -le 15; $i++) {
    Write-Progress -Activity "Starting Services" -Status "$i of 15 seconds" -PercentComplete (($i / 15) * 100)
    Start-Sleep -Seconds 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅ SERVICES RUNNING!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📊 Service Status:" -ForegroundColor Cyan
Write-Host "  Backend:  " -NoNewline -ForegroundColor White
Write-Host "http://localhost:8000" -ForegroundColor Green
Write-Host "  Frontend: " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3000" -ForegroundColor Green
Write-Host ""

Write-Host "🌐 Opening dashboard..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "📝 NOTE: Services are running in background jobs" -ForegroundColor Yellow
Write-Host ""
Write-Host "To view logs:" -ForegroundColor Cyan
Write-Host "  Backend:  " -NoNewline -ForegroundColor White
Write-Host "Receive-Job $($backendJob.Id)" -ForegroundColor Gray
Write-Host "  Frontend: " -NoNewline -ForegroundColor White
Write-Host "Receive-Job $($frontendJob.Id)" -ForegroundColor Gray
Write-Host ""

Write-Host "To stop services:" -ForegroundColor Cyan
Write-Host "  " -NoNewline
Write-Host "Stop-Job $($backendJob.Id), $($frontendJob.Id)" -ForegroundColor Gray
Write-Host "  " -NoNewline
Write-Host "Remove-Job $($backendJob.Id), $($frontendJob.Id)" -ForegroundColor Gray
Write-Host ""

Write-Host "Press any key to stop all services and exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "Stopping services..." -ForegroundColor Yellow
Stop-Job $backendJob, $frontendJob
Remove-Job $backendJob, $frontendJob

Write-Host "✅ All services stopped" -ForegroundColor Green
Write-Host ""
