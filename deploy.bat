@echo off
REM ============================================================================
REM GATEKEEPER — AUTOMATED DEPLOYMENT (Astro -> Vercel), WINDOWS
REM ============================================================================
REM 1. Installs Node dependencies
REM 2. Optionally refreshes expert data from the Python backend
REM 3. Deploys to Vercel (Vercel builds the Astro site remotely)
REM ============================================================================

setlocal enabledelayedexpansion

echo.
echo ==^> Gatekeeper deployment
echo.

node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is required but not installed. Install from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo Node.js found: %%i

echo.
echo ==^> Installing dependencies
call npm install
if errorlevel 1 (
    echo Failed to install dependencies
    pause
    exit /b 1
)

python --version >nul 2>&1
if errorlevel 1 (
    echo Python not found — skipping data refresh, using existing public\expert_data.json
) else (
    set /p REFRESH="Refresh expert_data.json from live APIs before deploying? (y/n) "
    if /i "!REFRESH!"=="y" (
        python -m pip install --quiet requests
        python gatekeeper_backend_enhanced.py
        copy /y expert_data.json public\expert_data.json >nul
        echo Copied refreshed data into public\expert_data.json
    )
)

echo.
echo ==^> Deploying to Vercel

where vercel >nul 2>&1
if errorlevel 1 (
    echo Installing Vercel CLI...
    call npm install -g vercel
)

call vercel --prod

echo.
echo Done. Your live URL is printed above.
echo.
pause
