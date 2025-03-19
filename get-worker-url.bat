@echo off
chcp 65001 >nul
echo ========================================
echo      Cloudflare Worker URL Retrieval Tool
echo ========================================
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

:: Check if cf-flux-schnell directory exists
if not exist cf-flux-schnell (
  echo [ERROR] cf-flux-schnell directory not found!
  echo Please ensure you have downloaded the complete Flux Schnell application.
  pause
  exit /b 1
)

echo [Step 1/3] Entering cf-flux-schnell directory
cd cf-flux-schnell

echo [Step 2/3] Installing dependencies
echo Installing necessary dependencies, please wait...
call npm install
if %ERRORLEVEL% neq 0 (
  echo [ERROR] Failed to install dependencies!
  echo Please check your network connection and try again.
  cd ..
  pause
  exit /b 1
)

:: Check if wrangler.jsonc exists
if not exist wrangler.jsonc (
  echo [ERROR] wrangler.jsonc configuration file not found!
  echo Please ensure you have downloaded the complete application.
  cd ..
  pause
  exit /b 1
)

echo [Step 3/3] Deploying Worker to Cloudflare
echo.
echo About to deploy Worker to Cloudflare...
echo Note: A browser will open during deployment, please login to your Cloudflare account and authorize.
echo After deployment, note the Worker URL displayed in the command line.
echo.
echo Press any key to start deployment...
pause > nul

echo.
echo Deploying, please wait...

:: Deploy with interactive browser authentication
:: Running the deploy command in a new command window to ensure interactive mode
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

echo.
echo You can also find your Worker URL in the Cloudflare dashboard:
echo 1. Visit: https://dash.cloudflare.com/ 
echo 2. Click on Workers & Pages
echo 3. Look for the "cf-flux-schnell" Worker

pause 