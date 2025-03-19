@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
echo Cloudflare-Flux Schnell WebUI Startup Script
echo =============================
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

:: Install dependencies only if node_modules doesn't exist
if not exist "%CD%\node_modules" (
  echo [1/3] Installing dependencies...
  call npm install
  if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
  )
) else (
  echo [1/3] Dependencies already installed, skipping...
)

:: Check if any source files have been modified since the last build
set REBUILD=0

:: Check if out directory doesn't exist
if not exist "%CD%\out" (
  set REBUILD=1
  echo [INFO] Build output directory not found, will build the application.
)

:: Check if package.json is newer than the out directory
if exist "%CD%\package.json" (
  for %%I in ("%CD%\package.json") do set PKG_DATE=%%~tI
  if exist "%CD%\out" (
    for %%I in ("%CD%\out") do set OUT_DATE=%%~tI
    if "!PKG_DATE!" GTR "!OUT_DATE!" (
      set REBUILD=1
      echo [INFO] package.json has been modified, will rebuild the application.
    )
  )
)

:: Check if any source file in src directory is newer than out directory
if exist "%CD%\src" (
  for /r "%CD%\src" %%I in (*) do (
    set SRC_DATE=%%~tI
    if exist "%CD%\out" (
      for %%J in ("%CD%\out") do set OUT_DATE=%%~tJ
      if "!SRC_DATE!" GTR "!OUT_DATE!" (
        set REBUILD=1
        echo [INFO] Source files have been modified, will rebuild the application.
        goto BUILD_CHECK_DONE
      )
    )
  )
)

:BUILD_CHECK_DONE

:: Build application if needed
if "%REBUILD%"=="1" (
  echo [2/3] Building application...
  call npm run build
  if %ERRORLEVEL% neq 0 (
    echo [ERROR] Build failed! Starting development server instead...
    goto START_DEV
  )
) else (
  echo [2/3] Application already built and up-to-date, skipping build...
)

:: Check if serve is installed globally or install it if needed
echo [3/3] Preparing to start the application...
call npm list -g serve >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo [INFO] Installing serve globally...
  call npm install -g serve
  if %ERRORLEVEL% neq 0 (
    echo [WARNING] Failed to install serve globally, will use npx instead.
  )
)

echo.
echo ==================================================
echo Cloudflare-Flux Schnell WebUI is running!
echo Server URL: http://localhost:3000
echo Press Ctrl+C to stop the server
echo ==================================================
echo.

:: Function to open browser after a short delay
echo [INFO] Browser will open automatically in a few seconds...
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

:: Use serve to start static website if out directory exists
if exist "%CD%\out" (
  call npx serve -s out -p 3000
  goto END
)

:START_DEV
echo [INFO] Starting development server...
call npm run dev

:END
pause 