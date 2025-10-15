@echo off
echo 🚀 Starting AIverse Development Environment...

REM Start development services
echo 📦 Starting development services...
docker-compose up -d

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 15 /nobreak > nul

REM Show service status
echo 🔍 Service status:
docker-compose ps

echo ✅ Development environment is ready!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo 🌍 Nginx: http://localhost:80
echo.
echo 📋 To view logs: docker-compose logs -f
echo 🛑 To stop: docker-compose down
pause
