@echo off
echo Starting Simple Flux MCP Server...

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo [ERROR] Node.js not found! Please install Node.js first.
  pause
  exit /b 1
)

:: Display current path for reference
echo Current directory: %CD%
echo.

:: Display the command that will be executed in Cursor
echo To configure in Cursor, use this EXACT command:
echo node "%CD%\simple-server-final.js"
echo.

:: Run the server
node simple-server-final.js 