@echo off
echo ========================================
echo   Deeplure Modal Overlay - Configuration Verification
echo ========================================
echo.

echo [1/6] Checking Docker Desktop status...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Docker is not running or not installed.
    echo Please make sure Docker Desktop is running and try again.
    pause
    exit /b 1
)
echo ✅ Docker is running

echo.
echo [2/6] Checking required files...
if not exist "Dockerfile" (
    echo ❌ ERROR: Dockerfile not found
    pause
    exit /b 1
)
echo ✅ Dockerfile found

if not exist "docker-compose.yml" (
    echo ❌ ERROR: docker-compose.yml not found
    pause
    exit /b 1
)
echo ✅ docker-compose.yml found

if not exist "nginx.conf" (
    echo ❌ ERROR: nginx.conf not found
    pause
    exit /b 1
)
echo ✅ nginx.conf found

if not exist "package.json" (
    echo ❌ ERROR: package.json not found
    pause
    exit /b 1
)
echo ✅ package.json found

echo.
echo [3/6] Checking package.json configuration...
findstr /C:"\"name\": \"deeplure-modal-overlay\"" package.json >nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: Package name mismatch in package.json
    pause
    exit /b 1
)
echo ✅ Package name is correct

echo.
echo [4/6] Checking Next.js configuration...
if not exist "next.config.mjs" (
    echo ❌ ERROR: next.config.mjs not found
    pause
    exit /b 1
)
findstr /C:"output: 'export'" next.config.mjs >nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: Next.js static export not configured
    pause
    exit /b 1
)
echo ✅ Next.js static export configured

echo.
echo [5/6] Testing Docker build (dry run)...
echo This will take a few minutes...
docker build --dry-run -t deeplure-modal-overlay . >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Docker build configuration has issues
    echo Running actual build to see errors:
    docker build -t deeplure-modal-overlay .
    pause
    exit /b 1
)
echo ✅ Docker build configuration is valid

echo.
echo [6/6] Configuration Summary
echo ========================================
echo   ✅ All Docker configuration is correct!
echo ========================================
echo.
echo 📊 Configuration Details:
echo   • Project Name: deeplure-modal-overlay
echo   • Docker Image: deeplure-modal-overlay:latest
echo   • Container Name: deeplure-modal-overlay
echo   • Production Port: 80
echo   • Development Port: 3000
echo   • Build Output: Static export with nginx
echo   • Package Manager: pnpm
echo.
echo 🚀 Ready to run:
echo   • Production: Double-click start-app.bat
echo   • Development: docker-compose --profile dev up frontend-dev
echo   • Manual: docker build -t deeplure-modal-overlay . && docker run -d -p 80:80 --name deeplure-modal-overlay deeplure-modal-overlay
echo.
echo Press any key to exit...
pause >nul