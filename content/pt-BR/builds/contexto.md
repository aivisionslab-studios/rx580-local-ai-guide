---
id: "contexto"
title: "01. CONTEXTO E PROBLEMA"
description: "Em 2026, a narrativa padrão era clara: RX 580 não roda IA. Análise dos ecossistemas travados e a quebra de paradigma via Vulkan."
category: "builds"
lang: "pt-BR"
---

<p>Em 2026, a narrativa padrão era clara: <strong>RX 580 não roda IA</strong>. Os ecossistemas disponíveis eram:</p>
  <div class="tbl"><table>
    <thead><tr><th>Solução</th><th>Status para RX 580</th></tr></thead>
    <tbody>
      <tr><td>CUDA (Nvidia)</td><td>❌ Exclusivo Nvidia</td></tr>
      <tr><td>ROCm (AMD oficial)</td><td>❌ Removeu suporte a Polaris/GCN4 na versão 5.x</td></tr>
      <tr><td>DirectML (Microsoft)</td><td>❌ Abandonado antes de amadurecer — instável, lento</td></tr>
      <tr><td>OpenVINO (Intel)</td><td>❌ Incompatible com Forge no Windows</td></tr>
    </tbody>
  </table></div>
  <div class="tbl"><table>
    <thead><tr><th>Item</th><th>Status (antes da solução)</th></tr></thead>
    <tbody>
      <tr><td>LLM</td><td>CPU pura — 25 a 40 minutos por resposta</td></tr>
      <tr><td>Geração de imagens</td><td>ComfyUI via CPU — 50+ minutos por imagem no HDD</td></tr>
      <tr><td>RX 580</td><td>Ociosa, 0% de uso para IA</td></tr>
      <tr><td>Storage</td><td>HDD lento (gargalo crítico de I/O)</td></tr>
    </tbody>
  </table></div>
  <div class="card acc">
    <blockquote>"Polaris é obsoleta. Só serve pra mineração. AMD antiga não roda IA. Troca de placa."</blockquote>
    <p>Essa crença era falsa. O poder computacional sempre esteve lá. O problema era o software, não o hardware.</p>
  </div>
  <p>O projeto <code>ggml</code> (base do <code>llama.cpp</code> e <code>stable-diffusion.cpp</code>) usa Vulkan como backend de GPU — padrão aberto que funciona em qualquer GPU moderna. A RX 580 suporta Vulkan 1.x desde os drivers originais de 2017. ROCm e CUDA são desnecessários.</p>
  <p>Para modelos maiores (FLUX.1 Schnell 16GB, por exemplo), a solução é rodar via <strong>CPU Xeon + RAM ECC abundante</strong> através do ComfyUI no WSL2, com link simbólico para os modelos no Windows — sem duplicar arquivos, sem perder espaço.</p>
