---
id: "guia"
title: "20. GUIA ESTRATÉGICO POR CASO DE USO"
description: "Matriz de tomada de decisão: quando direcionar o processamento para a GPU ou para o Xeon."
category: "guides"
lang: "pt-BR"
---

<div class="tbl"><table>
    <thead><tr><th>Objetivo do Workflow</th><th>Modelo Recomendado</th><th>Backend Alocado</th><th>Métrica Real de Geração</th></tr></thead>
    <tbody>
      <tr class="hig"><td>Chat de Texto e Assistência Local</td><td>Mistral 7B / Llama 3 8B GGUF</td><td>GPU RX 580 (Vulkan)</td><td>Alta Performance (15-16 tokens/s) ⚡</td></tr>
      <tr class="hig"><td>Geração de Imagens Veloz (512x512)</td><td>DreamShaper 8 (SD 1.5 GGUF)</td><td>GPU RX 580 (Vulkan)</td><td>Renderização Fluida (~72 segundos)</td></tr>
      <tr><td>Criação de Alta Resolução e Detalhe SOTA</td><td>FLUX.1 Schnell (16GB Weights)</td><td>CPU Xeon (WSL2)</td><td>Processamento Pesado (~24 minutos)</td></tr>
      <tr><td>Interpolação de Quadros e Animação Video</td><td>AnimateDiff Pipeline Standard</td><td>CPU Xeon (WSL2)</td><td>Processamento Estável (~141 segundos)</td></tr>
    </tbody>
  </table></div>
