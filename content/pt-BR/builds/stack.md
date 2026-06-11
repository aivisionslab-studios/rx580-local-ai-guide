---
id: "stack"
title: "18. MAPA DE SERVIÇOS DO STACK INTEGRADO"
description: "Tabela de monitoramento de infraestrutura, roteamento de tráfego local e backends ativos."
category: "builds"
lang: "pt-BR"
---

<div class="tbl"><table>
    <thead><tr><th>Serviço de IA</th><th>Porta de Acesso</th><th>Protocolo / Engine</th><th>Backend de Hardware Ativo</th></tr></thead>
    <tbody>
      <tr><td><strong>Open WebUI</strong></td><td><code>:3000</code></td><td>Docker Container</td><td>Ambiente Virtualizado WSL2</td></tr>
      <tr class="hig"><td><strong>llama-server</strong></td><td><code>:8081</code></td><td>Nativo ggml Executável</td><td>GPU AMD Radeon RX 580 (Vulkan 1.x)</td></tr>
      <tr class="hig"><td><strong>sd-server</strong></td><td><code>:7860</code></td><td>Nativo ggml Executável</td><td>GPU AMD Radeon RX 580 (Vulkan 1.x)</td></tr>
      <tr><td><strong>ComfyUI Server</strong></td><td><code>:8188</code></td><td>Python Runtime Isolado</td><td>CPU Xeon E5-2690 v3 (Modo Pure CPU)</td></tr>
      <tr><td><strong>Ollama Engine</strong></td><td><code>:11434</code></td><td>Serviço de Contingência</td><td>CPU Xeon E5-2690 v3 (Modo Pure CPU)</td></tr>
    </tbody>
  </table></div>
