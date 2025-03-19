@echo off
chcp 65001 >nul
echo Flux Schnell - Save Worker URL Tool
echo =============================
echo.

:: Check if worker_url.txt exists
if exist worker_url.txt (
  echo Detected Worker URL file from previous deployment
  echo Content:
  type worker_url.txt
  echo.
)

echo Please enter your Cloudflare Worker URL (e.g.: https://cf-flux-schnell.xxx.workers.dev)
echo If you don't know how to get it, run get-worker-url.bat or check "Worker URL Guide.md"
echo.
set /p WORKER_URL="Worker URL: "

:: Validate URL format
echo %WORKER_URL% | findstr /r "https\?://.*.workers.dev" >nul
if %ERRORLEVEL% neq 0 (
  echo.
  echo [WARNING] The URL format doesn't seem correct!
  echo Standard Worker URL format should be: https://name.subdomain.workers.dev
  echo.
  echo Do you still want to save this URL?
  choice /c YN /n /m "Yes(Y) No(N): "
  if errorlevel 2 (
    echo Operation cancelled
    pause
    exit /b 0
  )
)

:: Save URL to configuration file
echo %WORKER_URL% > saved_worker_url.txt
echo.
echo [SUCCESS] Worker URL has been saved to saved_worker_url.txt file!
echo.
echo Next time you start WeiUI, you can use this URL directly.
echo.
pause 