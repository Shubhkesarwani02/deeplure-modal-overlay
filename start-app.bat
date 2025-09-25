@echo off
echo ========================================
echo   Deeplure Modal Overlay - Docker Setup
echo ========================================
echo.

echo [1/4] Checking if Docker is running...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running or not installed.
    echo Please make sure Docker Desktop is running and try again.
    pause
    exit /b 1
)
echo Docker is ready! ✓

echo.
echo [2/4] Building the application (this may take 5-10 minutes)...
echo Please wait while we build your app...
docker build -t deeplure-modal-overlay .
if %errorlevel% neq 0 (
    echo ERROR: Build failed. Please check the output above.
    pause
    exit /b 1
)
echo Build completed! ✓

echo.
echo [3/4] Starting the application container...
docker stop deeplure-modal-overlay >nul 2>&1
docker rm deeplure-modal-overlay >nul 2>&1
docker run -d -p 80:80 --name deeplure-modal-overlay deeplure-modal-overlay
if %errorlevel% neq 0 (
    echo ERROR: Failed to start container. Please check if port 80 is available.
    echo You can try running: docker run -d -p 8080:80 --name deeplure-modal-overlay deeplure-modal-overlay
    pause
    exit /b 1
)
echo Container started! ✓

echo.
echo [4/4] Application is ready!
echo ========================================
echo   🎉 SUCCESS! Your app is now running!
echo ========================================
echo.
echo 🌐 Open your browser and go to: http://localhost
echo.
echo 📋 Useful commands:
echo   • To stop:    docker stop deeplure-modal-overlay
echo   • To start:   docker start deeplure-modal-overlay
echo   • To rebuild: run this script again
echo   • View logs:  docker logs deeplure-modal-overlay
echo.

echo Opening your browser...
timeout /t 3 >nul
start http://localhost

echo Press any key to exit...
pause >nul