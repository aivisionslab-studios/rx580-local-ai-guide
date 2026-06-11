---
id: "comfyui-portable-amd"
title: "26. COMFYUI PORTÁTIL v0.3.48 — IMPLEMENTAÇÃO AMD"
description: "Configurações específicas e injeção de variáveis de ambiente para a arquitetura Polaris."
category: "guides"
lang: "pt-BR"
---

<div class="card">
    <p>Para implementações que utilizam pacotes portáteis pré-compilados do ComfyUI focados em compatibilidade AMD DirectML no Windows, o interpretador Python precisa de ajuda para identificar corretamente as capacidades de hardware da GPU antiga:</p>
    <div class="code"><span class="code-lang">batch</span><pre># Inserir no topo do arquivo run_nvidia_gpu.bat ou do script portátil customizado:
set HSA_OVERRIDE_GFX_VERSION=8.0.3
set DXVK_ASYNC=1

.\python_embeded\python.exe main.py --directml</pre></div>
    <p>O sinalizador <code>8.0.3</code> emula o ID de arquitetura de compilação necessário para que as bibliotecas numéricas processem tensores sem travar o barramento PCIe da série RX 500.</p>
  </div>
