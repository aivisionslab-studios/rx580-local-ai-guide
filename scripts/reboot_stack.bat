@echo off
title Reboot AI Stack - Vulkan RX 580
cls

echo ==============================================================================
echo [REBOOT] Killing all running AI instances...
echo ==============================================================================
taskkill /f /im sd-server.exe 2>nul
taskkill /f /im llama-server.exe 2>nul
timeout /t 2 /nobreak >nul

echo [+] Rebooting stack...
start "Servidor IA Local Completo" "%~dp0\start-ai.bat"

echo.
echo Complete. Stack refreshed.
timeout /t 5
