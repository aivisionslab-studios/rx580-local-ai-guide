@echo off
title Servidor FLUX Hybrid - Vulkan RX 580 + CPU
cls

echo [+] Stopping prior sd-server instances...
taskkill /f /im sd-server.exe 2>nul
timeout /t 2 /nobreak >nul

echo [+] Launching FLUX Schnell Hybrid (GPU+CPU)...
E:
cd "E:\stable-diffusion.cpp\build\build\bin\Release" || cd "E:\stable-diffusion.cpp\build\bin\Release"

sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 ^
  --diffusion-model "E:\models\flux1-schnell-q4_k.gguf" ^
  --vae "E:\models\ae.safetensors" ^
  --clip_l "E:\models\clip_l.safetensors" ^
  --t5xxl "E:\models\t5xxl_fp16.safetensors" ^
  --cfg-scale 1.0 --steps 4 --clip-on-cpu --vae-on-cpu --vae-tiling

pause
