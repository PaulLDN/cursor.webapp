@echo off
echo Starting Corporate Training Platform...
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd backend && node src/server.js"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend...
start "Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Frontend will be available at http://localhost:5173
echo Backend will be available at http://localhost:5000
echo.
pause
