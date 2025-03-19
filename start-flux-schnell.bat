@echo off
chcp 65001 >nul
echo Flux Schnell Startup Script
echo ===========================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo [ERROR] Node.js not found! Please install Node.js first.
  echo You can download Node.js from https://nodejs.org/
  pause
  exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo [ERROR] npm not found! Please check your Node.js installation.
  pause
  exit /b 1
)

echo Welcome to Flux Schnell!
echo.
echo Please select an option:
echo 1. Start WeiUI directly (if you already have a Worker URL)
echo 2. Deploy Worker and get URL, then start WeiUI
echo 3. Auto-extract Worker URL from recent deployment
echo.
choice /c 123 /n /m "Select option [1/2/3]: "

if errorlevel 3 (
  goto extract_url
) else if errorlevel 2 (
  goto deploy_worker
) else (
  goto start_weiui
)

:extract_url
cls
echo.
echo Running automatic URL extractor...
call auto-save-url.bat
echo Press any key to start WeiUI...
pause > nul
goto start_weiui

:deploy_worker
cls
echo.
echo Preparing to deploy Cloudflare Worker...
echo.
echo [Step 1/3] Entering cf-flux-schnell directory
cd cf-flux-schnell

echo [Step 2/3] Installing dependencies
call npm install
if %ERRORLEVEL% neq 0 (
  echo [ERROR] Failed to install dependencies!
  pause
  cd ..
  goto start_weiui
)

echo [Step 3/3] Deploying Worker
echo.
echo About to deploy Worker to Cloudflare...
echo Note: A browser will open during deployment, please login to your Cloudflare account and authorize.
echo After deployment, note the Worker URL displayed in the command line, format:
echo     Worker URL: https://cf-flux-schnell.xxx.workers.dev
echo.
echo Press any key to start deployment...
pause > nul

:: Deploy with interactive browser authentication
echo Deploying, please wait...
:: Run the deployment command directly without redirecting output
:: This ensures wrangler runs in interactive mode
cd ..
start cmd /c "cd cf-flux-schnell && npx wrangler deploy && echo. && echo Deployment complete. && echo. && echo After closing this window, the auto-url-extractor will attempt to save your Worker URL. && pause"

echo.
echo If deployment is successful, the Worker URL will be displayed in the new terminal window.
echo.

echo Waiting for deployment to complete...
echo Press any key when the deployment is finished to extract and save the Worker URL...
pause > nul

:: Run the auto URL extractor
echo.
echo Running automatic URL extractor...
call auto-save-url.bat

echo Press any key to start WeiUI...
pause > nul
goto start_weiui

:start_weiui
echo.
echo Starting WeiUI graphical interface...
cd weiui
call start-weiui.bat
cd ..

pause 