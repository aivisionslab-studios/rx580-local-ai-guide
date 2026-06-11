---
id: "sdserver"
title: "10. INICIALIZAÇÃO DO SERVIDOR SD-SERVER (GPU)"
description: "Ativação do serviço de imagem na porta local para escuta das chamadas de API da interface gráfica."
category: "guides"
lang: "pt-BR"
---

<div class="note ok">✅ Inicialização homologada: Execute este bloco de código dentro do <strong>PowerShell Comum</strong></div>
  <div class="code"><pre># Levantar o servidor apontando para o modelo quantizado e definindo o host de escuta
E:\stable-diffusion.cpp\build\bin\Release\sd-server.exe \
  -m "E:\models\dreamshaper8.gguf" \
  --host 0.0.0.0 \
  --port 7860</pre></div>
  <div class="code ok" style="margin-top:.75rem"><pre># Monitoramento do terminal:
ggml_vulkan: Found 1 Vulkan device(s)
ggml_vulkan: 0 = AMD Radeon RX 580 2048SP | VRAM: 8192MB
Server listening on http://0.0.0.0:7860 ✅</pre></div>
