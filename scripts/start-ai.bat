@echo off
title Servidor IA Local Completo - Vulkan RX 580
cls

echo ==============================================================================
echo              🔬 AIVisionsLab — FULL LOCAL ACCELERATION RUNTIME STACK
echo ==============================================================================
echo.

:: Kill prior instances
echo [+] Stopping prior ghost backends...
taskkill /f /im sd-server.exe 2>nul
taskkill /f /im llama-server.exe 2>nul
timeout /t 2 /nobreak >nul

:: Start LLM Server
echo [+] Launching llama-server (Mistral Q4_K_M via Vulkan)...
start "LLM Server - Vulkan RX580" "C:\llama.cpp\build\bin\Release\llama-server.exe" ^
  -m "E:\models\Mistral-7B-Q4_K_M.gguf" ^
  --host 0.0.0.0 --port 8081 --device Vulkan0

timeout /t 3 /nobreak >nul

:: Start Stable Diffusion Server
echo [+] Launching sd-server (DreamShaper 8 via Vulkan)...
E:
cd "E:\stable-diffusion.cpp\build\build\bin\Release" || cd "E:\stable-diffusion.cpp\build\bin\Release"
start "SD Server - Vulkan RX580" sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 ^
  -m "E:\models\dreamshaper8.gguf"

echo ==============================================================================
echo [SUCCESS] Both servers booted. Please ensure your models exist at E:\models\
echo           llama-server port: 8081
echo           sd-server port: 7860
echo ==============================================================================
pause
