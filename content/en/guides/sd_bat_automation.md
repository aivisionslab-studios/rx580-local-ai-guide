---
id: "sd_bat_automation"
title: "11 — AUTOMATION OF INITIALIZATION (.BAT)"
description: "Dedicated batch script for secure and reproducible initialization of the AI server."
category: "guides"
lang: "en"
---

<p>To avoid manual errors, incorrect paths, or ports stuck in VRAM when rebooting Windows, the server must be started exclusively via a <code>.bat</code> file on the Desktop.</p>

<p><strong>Production Script (iniciar_ia_server.bat):</strong></p>
<pre style="font-family:'JetBrains Mono',monospace;font-size:11px">@echo off
title Local Stable Diffusion Server - Production
cls

:: 1. Clean zombie processes in VRAM/RAM
taskkill /f /im sd-server.exe 2>nul
taskkill /f /im sd-cli.exe 2>nul
timeout /t 2 /nobreak >nul

:: 2. Jump drive unit and set native path (CMD syntax)
E:
cd "E:\stable-diffusion.cpp\build\bin\Release"

:: 3. Execution with open listen for Docker
sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 -m "E:\ia_storage\models\Stable-diffusion\checkpoints\dreamshaper_8.safetensors"

pause</pre>

<div class="tbl">
  <table>
    <thead>
      <tr><th>Rule</th><th>Reason</th></tr>
    </thead>
    <tbody>
      <tr><td>Never use <code>.\</code> before the executable</td><td>Traditional CMD does not recognize it — breaks terminal execution</td></tr>
      <tr><td>Mandatory <code>taskkill</code> block</td><td>Frees port 7860 from background processes stuck in memory</td></tr>
      <tr><td>Drive jump (<code>E:</code>) before <code>cd</code></td><td>CMD does not change drive without the explicit drive leap prefix</td></tr>
    </tbody>
  </table>
</div>

<div class="card">
  <span style="color:#22c55e; font-weight:bold">✅ STATUS: AUTOMATION VALIDATED IN PRODUCTION</span><br>
  <span style="font-size:.8rem; color:#94a3b8">Two clicks on the .bat file initialize the complete ecosystem — cleanup, route, and port bind in sequence</span>
</div>
