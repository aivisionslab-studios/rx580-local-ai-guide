---
id: "solucao"
title: "04. A SOLUÇÃO — ARQUITETURA DUPLA"
description: "A estratégia de engenharia definitiva: Divisão inteligente de workloads entre GPU Vulkan e CPU Xeon."
category: "builds"
lang: "pt-BR"
---

<div class="card acc">
    <h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-bottom:.9rem">Lógica de Fluxo do Systema</h3>
    <div class="code"><pre>CAMINHO 1 — GPU VULKAN (Aceleração Local RX 580):
O ecossistema llama.cpp mapeia a GPU via chamadas nativas Vulkan
        ↓
O stable-diffusion.cpp herda e compartilha a mesma base limpa da engine ggml
        ↓
Modelos SD 1.5 convertidos para GGUF geram imagens estáveis em ~72 segundos ✅

CAMINHO 2 — CPU XEON (Escalonamento para Modelos SOTA Pesados):
O modelo FLUX.1 Schnell FP8 exige 16GB e excede os 8GB de VRAM física da placa
        ↓
Mapeamento do workflow para o ComfyUI rodando via CPU dentro do WSL2 Linux
        ↓
A memória RAM DDR4 REG ECC atua como uma "VRAM virtual de alta estabilidade"
        ↓
Geração completa do FLUX.1 em resolução 768x768 finalizada em ~24 minutos ✅</pre></div>
  </div>
  <h4 class="s" style="margin-top:1.25rem;margin-bottom:.6rem;color:#fff;font-family:'Syne',sans-serif">Mapeamento de Portas e Serviços Coordenados</h4>
  <div class="code"><pre>Interface do Usuário (OpenWebUI via Docker — Porta :3000)
        │
        ├──► Orquestração de Texto: llama-server.exe (Porta :8081 — Backend Vulkan na RX 580)
        │     └── Alternativa de Contingência: Ollama Engine (Porta :11434 — Modo CPU Pura)
        │
        └──► Orquestração de Imagem (Rotas Dinâmicas de Prompt):
              ├──► Demanda Ultra Rápida (SD 1.5 GGUF): sd-server.exe (Porta :7860 — Backend Vulkan)
              └──► Demanda SOTA/Complexa (FLUX.1): ComfyUI Server (Porta :8188 — WSL2 CPU Xeon)</pre></div>
