@echo off
echo 🚀 Deploying AIverse...

REM Check if .env file exists
if not exist .env (
    echo ❌ .env file not found. Please create it from .env.prod.example
    pause
    exit /b 1
)

REM Build and start services
echo 📦 Building and starting services...
docker-compose -f docker-compose.prod.yml up -d --build

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 30 /nobreak > nul

REM Check if services are running
echo 🔍 Checking service status...
docker-compose -f docker-compose.prod.yml ps

REM Show logs
echo 📋 Recent logs:
docker-compose -f docker-compose.prod.yml logs --tail=50

echo ✅ Deployment completed!
echo 🌐 Your app should be available at: http://localhost
pause
