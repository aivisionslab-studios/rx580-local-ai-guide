---
id: "flux_server"
title: "10.A — RODAR FLUX NO SD-SERVER (GPU + CPU HÍBRIDO)"
description: "Mapeamento e inicialização do ecossistema Flux de 12B parâmetros com arquitetura de memória segmentada."
category: "guides"
lang: "pt-BR"
---

<p>O Flux exige segmentação precisa entre VRAM e RAM host. Utilizando as flags <code>--vae-on-cpu</code> e <code>--vae-tiling</code>, evitamos o estouro de memória (OOM) na RX 580 2048SP. O T5XXL (fp16) e o VAE residem na RAM; o modelo de difusão ocupa a VRAM.</p>
  <div class="tbl">
    <table>
      <thead>
        <tr><th>Componente</th><th>Arquivo Homologado</th><th>Alocação Final</th><th>Tamanho</th></tr>
      </thead>
      <tbody>
        <tr><td>Diffusion Model</td><td><code>flux1-schnell-q4_k.gguf</code></td><td><strong>GPU (VRAM)</strong></td><td>~6.5 GB</td></tr>
        <tr><td>VAE</td><td><code>ae.safetensors</code></td><td><strong>CPU (RAM)</strong></td><td>~160 MB</td></tr>
        <tr><td>CLIP L</td><td><code>clip_l.safetensors</code></td><td><strong>GPU (VRAM)</strong></td><td>~235 MB</td></tr>
        <tr><td>T5XXL</td><td><code>t5xxl_fp16.safetensors</code></td><td><strong>CPU (RAM)</strong></td><td>~9.3 GB</td></tr>
      </tbody>
    </table>
  </div>
  <p>⚠️ <strong>Notas de Estabilidade:</strong> A remoção da flag <code>--timeout</code> (não suportada pela versão atual) e a inclusão de <code>--vae-tiling</code> eliminaram os erros de <em>DeviceMemoryAllocation</em>. O uso de RAM total chega a ~9.5 GB (T5XXL fp16). Para economizar RAM, substituir por <code>t5xxl_fp8</code> reduz para ~5 GB.</p>
  <p><strong>Comando de Produção (iniciar.bat):</strong></p>
  <pre style="font-family:'JetBrains Mono',monospace;font-size:11px">sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 ^
  --diffusion-model "E:\ia_storage\models\Stable-diffusion\flux1-schnell-q4_k.gguf" ^
  --vae "E:\ia_storage\models\Stable-diffusion\ae.safetensors" ^
  --clip_l "E:\ia_storage\models\Stable-diffusion\clip_l.safetensors" ^
  --t5xxl "E:\ia_storage\models\Stable-diffusion\t5xxl_fp16.safetensors" ^
  --cfg-scale 1.0 --steps 4 --clip-on-cpu --vae-on-cpu --vae-tiling</pre>
  <div class="tbl">
    <table>
      <thead>
        <tr><th>Etapa</th><th>Tempo Real</th></tr>
      </thead>
      <tbody>
        <tr><td>Condicionamento (T5XXL)</td><td>11.49s</td></tr>
        <tr><td>Sampling — 4 steps @ 1024x1024</td><td>~838s (~14 min)</td></tr>
        <tr><td>VAE Decode — 9 tiles</td><td>40.45s</td></tr>
        <tr><td><strong>Total por imagem</strong></td><td><strong>~838s (~14 min)</strong></td></tr>
      </tbody>
    </table>
  </div>
  <div class="card">
    <span style="color:#22c55e; font-weight:bold">✅ STATUS: SERVIDOR EM PRODUÇÃO — IMAGEM GERADA COM SUCESSO</span><br>
    <span style="font-size:.8rem; color:#94a3b8">Listening on http://0.0.0.0:7860 | VRAM: 7.6/8.0 GB | RAM: ~9.5 GB | GPU: RX 580 2048SP | Temp: 66°C</span>
  </div>
