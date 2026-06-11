---
id: "arquivos"
title: "29. TAXONOMIA E ESTRUTURA DE ARQUIVOS NVMe"
description: "Árvore de diretórios unificada para rastreamento de binários compilados e modelos compartilhados."
category: "builds"
lang: "pt-BR"
---

<p>Organização estrutural rigorosa dos caminhos físicos mantidos dentro da partição de alta velocidade do SSD:</p>
  <pre style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#e2e8f0;background:rgba(0,0,0,.3);padding:.9rem;border-radius:4px;border:1px solid var(--b)">
E:\
├── llama.cpp\
│   └── build\bin\Release\
│       ├── llama-server.exe     <span style="color:#64748b"># Servidor de Linguagem Local</span>
│       └── llama-cli.exe        <span style="color:#64748b"># Utilitario de Diagnostico</span>
├── stable-diffusion.cpp\
│   └── build\bin\Release\
│       ├── sd-server.exe        <span style="color:#64748b"># Servidor de Imagem Vulkan</span>
│       └── sd-cli.exe           <span style="color:#64748b"># Conversor de Modelos GGUF</span>
└── models\
    ├── mistral-7b-instruct.Q4_K_M.gguf
    └── dreamshaper8.gguf        <span style="color:#64748b"># Checkpoint SD 1.5 Quantizado</span></pre>
