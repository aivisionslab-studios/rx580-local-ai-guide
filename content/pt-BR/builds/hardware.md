---
id: "hardware"
title: "02. HARDWARE DO LABORATÓRIO"
description: "Configuração Master detalhada: Xeon E5-2690 v3, RX 580 8GB, 32GB RAM ECC e o impacto crítico do NVMe."
category: "builds"
lang: "pt-BR"
---

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:.85rem;margin-bottom:1.25rem">
    <div class="stat"><div class="stat-icon">🖥️</div><div><div class="stat-lbl">GPU</div><div class="stat-val" style="font-size:.82rem">RX 580 2048SP</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">8GB GDDR5 VRAM</div></div></div>
    <div class="stat"><div class="stat-icon">⚙️</div><div><div class="stat-lbl">CPU</div><div class="stat-val" style="font-size:.82rem">Xeon E5-2690 v3</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">12c/24t · 3.5GHz boost</div></div></div>
    <div class="stat"><div class="stat-icon">💾</div><div><div class="stat-lbl">RAM</div><div class="stat-val" style="font-size:.82rem">32GB DDR4 REG ECC</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">Quad Channel RDIMM</div></div></div>
    <div class="stat"><div class="stat-icon">📀</div><div><div class="stat-lbl">Storage</div><div class="stat-val" style="font-size:.82rem">NVMe E: 1TB</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">1.7–3.5 GB/s leitura</div></div></div>
    <div class="stat"><div class="stat-icon">🖥️</div><div><div class="stat-lbl">OS</div><div class="stat-val" style="font-size:.82rem">Windows 10 Pro</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">WSL2 Ubuntu 22.04.5</div></div></div>
    <div class="stat"><div class="stat-icon">🔧</div><div><div class="stat-lbl">Driver AMD</div><div class="stat-val" style="font-size:.82rem">31.0.21924.61</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">Amdnolk (11/12/2025)</div></div></div>
  </div>
  <div class="tbl"><table>
    <thead><tr><th>Componente</th><th>Especificação no Ambiente</th></tr></thead>
    <tbody>
      <tr><td>Placa-mãe</td><td>Machinist MR9A Pro (Chipset X99, LGA 2011-3)</td></tr>
      <tr><td>Storage Secundário</td><td>HDD C: (Gargalo de I/O — modelos mantidos no NVMe E:)</td></tr>
      <tr><td>Kernel WSL2</td><td>6.6.87.2-microsoft-standard-WSL2</td></tr>
      <tr><td>Vulkan SDK</td><td>1.4.341.1</td></tr>
      <tr><td>CMake</td><td>4.3.2</td></tr>
      <tr><td>Visual Studio</td><td>2022/2026 Community (MSVC 19.50)</td></tr>
      <tr><td>Python (WSL2)</td><td>3.11.15</td></tr>
      <tr><td>PyTorch (WSL2)</td><td>2.4.1+cu121</td></tr>
      <tr><td>ComfyUI Versões</td><td>0.19.3 (WSL2 CPU) | 0.21.0 (Windows DirectML)</td></tr>
    </tbody>
  </table></div>
  <div class="card">
    <p><strong>RX 580 2048SP:</strong> Variante com 2048 Shader Processors (vs 2304SP original). Placa extremamente comum de mineração que performa de forma impecável via Vulkan.</p>
    <p><strong>NVMe vs HDD:</strong> A mudança para o NVMe reduziu o carregamento do LLM de 25 minutos para 4 minutos. No caso do FLUX (16GB), o carregamento caiu de 25 minutos no HDD para apenas ~30 segundos no NVMe. <strong>O storage é tão crítico quanto a capacidade de processamento.</strong></p>
    <p><strong>32GB REG ECC:</strong> Operando com o FLUX.1 Schnell FP8, o sistema consome 94% da memória disponível de forma contínua. A RAM de servidor ECC mantém estabilidade absoluta e evita corrupção de tensores sob carga extrema.</p>
  </div>
