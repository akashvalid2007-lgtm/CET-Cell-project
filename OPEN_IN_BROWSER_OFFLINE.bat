@echo off
TITLE AgriPulse™ — Offline Browser Launcher
cd /d "%~dp0"
echo Opening AgriPulse offline bundle directly from disk...
start "" "%~dp0dist\index.html"
exit
