@echo off
title Servidor SD 1.5 - Vulkan RX 580
cls

echo [+] Stopping prior sd-server instances...
taskkill /f /im sd-server.exe 2>nul
timeout /t 2 /nobreak >nul

echo [+] Launching sd-server (DreamShaper 8 via Vulkan)...
E:
cd "E:\stable-diffusion.cpp\build\build\bin\Release" || cd "E:\stable-diffusion.cpp\build\bin\Release"
sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 ^
  -m "E:\models\dreamshaper8.gguf"

pause
