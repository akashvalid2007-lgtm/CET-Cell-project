@echo off
TITLE AgriPulse™ Desktop — 100% Offline Mode
COLOR 0A

echo =====================================================================
echo                 AGRIPULSE DESKTOP INTELLIGENCE
echo        100% Offline Standalone Application (Airplane Mode Ready)
echo =====================================================================
echo.
echo Launching AgriPulse Native Desktop Window...
echo No internet connection required.
echo.

cd /d "%~dp0"

:: Check if dist exists, if not build it
if not exist "dist\index.html" (
    echo Building offline application bundle...
    call npm run build
)

:: Launch the standalone Electron Desktop Window
call npx electron ./electron/main.cjs

echo.
echo Application closed.
pause
