@echo off
chcp 65001 >nul
echo ========================================
echo  Auto Worker URL Extractor and Saver
echo ========================================
echo.

echo This script will help extract Worker URL from the deployment.
echo.

:: Find the most recent wrangler log file
echo Searching for recent deployment logs...
set LATEST_LOG=""
set LATEST_TIME=0

for /f "tokens=*" %%f in ('dir /b /od "%APPDATA%\xdg.config\.wrangler\logs\wrangler-*.log"') do (
    set LATEST_LOG=%APPDATA%\xdg.config\.wrangler\logs\%%f
)

if "%LATEST_LOG%"=="" (
    echo [ERROR] No wrangler log files found in %APPDATA%\xdg.config\.wrangler\logs\
    echo Please deploy the Worker first with get-worker-url.bat
    pause
    exit /b 1
)

echo Found log file: %LATEST_LOG%
echo.
echo Extracting Worker URL from log...

:: Try to extract the URL
findstr /C:"Your worker has been deployed to:" "%LATEST_LOG%" > url_temp.txt
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Could not find Worker URL in log file.
    echo Trying alternative method...
    
    :: Try alternative pattern
    findstr /C:"https://" "%LATEST_LOG%" | findstr /C:".workers.dev" > url_temp.txt
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Could not extract Worker URL using any method.
        echo Please copy the URL manually from the deployment terminal.
        del url_temp.txt 2>nul
        pause
        exit /b 1
    )
)

:: Extract just the URL
for /f "tokens=*" %%a in (url_temp.txt) do (
    echo %%a | findstr /C:"https://" > url_temp2.txt
)

:: Get the URL part
for /f "tokens=*" %%a in ('findstr /C:"https://" url_temp2.txt') do (
    for /f "tokens=1,2,3,4,5,6,7,8,9" %%b in ("%%a") do (
        if "%%b"=="Your" (
            echo %%e > saved_worker_url.txt
        ) else (
            echo %%a > saved_worker_url.txt
        )
    )
)

:: Clean up temporary files
del url_temp.txt 2>nul
del url_temp2.txt 2>nul

:: Check if URL was extracted
if exist saved_worker_url.txt (
    echo [SUCCESS] Worker URL has been extracted and saved to saved_worker_url.txt
    echo.
    echo URL:
    type saved_worker_url.txt
) else (
    echo [ERROR] Failed to extract and save Worker URL.
    echo Please deploy the Worker and copy the URL manually.
)

echo.
echo You can view the saved URL anytime by running get-saved-url.bat
echo.
pause 