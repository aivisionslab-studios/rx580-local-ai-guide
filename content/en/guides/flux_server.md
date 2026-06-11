---
id: "flux_server"
title: "10.A — RUN FLUX ON SD-SERVER (HYBRID GPU + CPU)"
description: "Mapping and initialization of the 12B parameter Flux ecosystem with segmented memory architecture."
category: "guides"
lang: "en"
---

<p>Flux requires precise segmentation between VRAM and host RAM. By using the <code>--vae-on-cpu</code> and <code>--vae-tiling</code> flags, we avoid Out of Memory (OOM) errors on the RX 580 2048SP. The T5XXL (fp16) and VAE reside in RAM; the diffusion model occupies VRAM.</p>
  <div class="tbl">
    <table>
      <thead>
        <tr><th>Component</th><th>Certified File</th><th>Final Allocation</th><th>Size</th></tr>
      </thead>
      <tbody>
        <tr><td>Diffusion Model</td><td><code>flux1-schnell-q4_k.gguf</code></td><td><strong>GPU (VRAM)</strong></td><td>~6.5 GB</td></tr>
        <tr><td>VAE</td><td><code>ae.safetensors</code></td><td><strong>CPU (RAM)</strong></td><td>~160 MB</td></tr>
        <tr><td>CLIP L</td><td><code>clip_l.safetensors</code></td><td><strong>GPU (VRAM)</strong></td><td>~235 MB</td></tr>
        <tr><td>T5XXL</td><td><code>t5xxl_fp16.safetensors</code></td><td><strong>CPU (RAM)</strong></td><td>~9.3 GB</td></tr>
      </tbody>
    </table>
  </div>
  <p>⚠️ <strong>Stability Notes:</strong> Removing the <code>--timeout</code> flag (not supported in the current version) and including <code>--vae-tiling</code> eliminated <em>DeviceMemoryAllocation</em> errors. Total RAM usage reaches ~9.5 GB (T5XXL fp16). To save RAM, replacing it with <code>t5xxl_fp8</code> reduces usage to ~5 GB.</p>
  <p><strong>Production Command (iniciar.bat):</strong></p>
  <pre style="font-family:'JetBrains Mono',monospace;font-size:11px">sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 ^
  --diffusion-model "E:\ia_storage\models\Stable-diffusion\flux1-schnell-q4_k.gguf" ^
  --vae "E:\ia_storage\models\Stable-diffusion\ae.safetensors" ^
  --clip_l "E:\ia_storage\models\Stable-diffusion\clip_l.safetensors" ^
  --t5xxl "E:\ia_storage\models\Stable-diffusion\t5xxl_fp16.safetensors" ^
  --cfg-scale 1.0 --steps 4 --clip-on-cpu --vae-on-cpu --vae-tiling</pre>
  <div class="tbl">
    <table>
      <thead>
        <tr><th>Stage</th><th>Real Time</th></tr>
      </thead>
      <tbody>
        <tr><td>Conditioning (T5XXL)</td><td>11.49s</td></tr>
        <tr><td>Sampling — 4 steps @ 1024x1024</td><td>~838s (~14 min)</td></tr>
        <tr><td>VAE Decode — 9 tiles</td><td>40.45s</td></tr>
        <tr><td><strong>Total per image</strong></td><td><strong>~838s (~14 min)</strong></td></tr>
      </tbody>
    </table>
  </div>
  <div class="card">
    <span style="color:#22c55e; font-weight:bold">✅ STATUS: SERVER IN PRODUCTION — IMAGE GENERATED SUCCESSFULLY</span><br>
    <span style="font-size:.8rem; color:#94a3b8">Listening on http://0.0.0.0:7860 | VRAM: 7.6/8.0 GB | RAM: ~9.5 GB | GPU: RX 580 2048SP | Temp: 66°C</span>
  </div>
