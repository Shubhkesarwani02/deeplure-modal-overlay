@echo off
echo ========================================
echo   Stopping Deeplure Modal Overlay
echo ========================================
echo.

echo Stopping the application...
docker stop deeplure-modal-overlay
if %errorlevel% neq 0 (
    echo No running container found or already stopped.
) else (
    echo Application stopped! ✓
)

echo.
echo Removing the container...
docker rm deeplure-modal-overlay
if %errorlevel% neq 0 (
    echo No container found to remove or already removed.
) else (
    echo Container removed! ✓
)

echo.
echo 🛑 Application has been completely stopped and removed.
echo.
echo To start again, run: start-app.bat
echo.
pause