# DLXStudios.ai Local Development Startup Script
# Runs on LuxRig for local development

Write-Host "🎨 Starting DLXStudios.ai Development Environment..." -ForegroundColor Cyan
Write-Host ""

# Check if LM Studio is running
Write-Host "📡 Checking LM Studio..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:1234/v1/models" -ErrorAction Stop
    Write-Host "✅ LM Studio is running" -ForegroundColor Green
} catch {
    Write-Host "❌ LM Studio not detected at http://127.0.0.1:1234" -ForegroundColor Red
    Write-Host "   Please start LM Studio first." -ForegroundColor Yellow
    Exit 1
}

Write-Host ""

# Build the project
Write-Host "🔨 Building projects..." -ForegroundColor Yellow
Set-Location $PSScriptRoot
npm run build -w apps/backend | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    Exit 1
}

Write-Host "✅ Build successful" -ForegroundColor Green
Write-Host ""

# Start backend
Write-Host "🚀 Starting Backend (Port 5000)..." -ForegroundColor Cyan
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PSScriptRoot
    npm run dev -w apps/backend
}

# Wait for backend to start
Start-Sleep -Seconds 2

# Start frontend
Write-Host "🚀 Starting Frontend (Port 3000)..." -ForegroundColor Cyan
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:PSScriptRoot
    npm run dev -w apps/frontend
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "✅ DLXStudios.ai is running!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Frontend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "📍 Backend:   http://localhost:5000" -ForegroundColor Cyan
Write-Host "📍 LM Studio: http://127.0.0.1:1234" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow
Write-Host ""

# Keep script running
$backendJob | Wait-Job
$frontendJob | Wait-Job

# Cleanup
Write-Host "Cleaning up jobs..." -ForegroundColor Yellow
Stop-Job -Job $backendJob, $frontendJob
Remove-Job -Job $backendJob, $frontendJob
