@echo off
chcp 65001 >nul
echo ========================================
echo      Saved Worker URL Viewer
echo ========================================
echo.

if exist saved_worker_url.txt (
  echo Your Cloudflare Worker URL:
  echo.
  type saved_worker_url.txt
  echo.
  echo [TIP] Please copy this URL for use in WeiUI.
) else (
  echo [WARNING] No saved Worker URL found!
  echo.
  echo Possible reasons:
  echo  1. You haven't successfully deployed the Worker yet
  echo  2. The URL wasn't successfully saved during deployment
  echo.
  echo Please run get-worker-url.bat script to deploy Worker and get the URL.
  echo Or visit the Cloudflare dashboard: https://dash.cloudflare.com/ 
  echo  -> Workers & Pages -> Overview
  echo Look for the "cf-flux-schnell" Worker in the listing.
)

echo.
pause 