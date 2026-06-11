---
id: "animatediff-video"
title: "17. ANIMATEDIFF E INTERPOLAÇÃO DE QUADROS (VÍDEO)"
description: "Injetando consistência temporal no ComfyUI sobre hardware legado para estruturar loops fluidos coprocessados no Intel Xeon."
category: "guides"
lang: "pt-BR"
---

<p>
  O <strong>AnimateDiff</strong> é um framework de modelagem temporal projetado especificamente para converter modelos de difusão estática (como Stable Diffusion 1.5) em geradores de vídeo consistentes. Ele funciona injetando módulos de atenção temporal sobrepostos no ComfyUI/WSL2. Essa técnica permite calcular transições de quadros adjacentes de forma matematicamente coordenada, gerando loops fluidos e eliminando os efeitos estáticos caóticos de ruído cintilante.
</p>

<!-- Stat cards of render cost -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.5rem">
  <div class="stat-card" style="display:flex;align-items:center;gap:1rem;background:#14171a;border:1px solid var(--b);padding:18px;border-radius:4px">
    <div style="font-size:1.8rem">🎬</div>
    <div>
      <div class="stat-lbl" style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:2px">Pipeline de Vídeo</div>
      <div class="stat-val" style="font-family:'Syne',sans-serif;font-weight:800;font-size:14px;color:#fff">AnimateDiff (WSL2 Pure CPU)</div>
      <div style="font-size:.65rem;color:#64748b;margin-top:2px">24 Threads Intel Xeon E5</div>
    </div>
  </div>
  <div class="stat-card" style="display:flex;align-items:center;gap:1rem;background:#14171a;border:1px solid var(--b);padding:18px;border-radius:4px">
    <div style="font-size:1.8rem">⏳</div>
    <div>
      <div class="stat-lbl" style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:2px">Métrica de Processamento</div>
      <div class="stat-val" style="font-family:'Syne',sans-serif;font-weight:800;font-size:14px;color:#34d399">~141s por Segundo de Frame</div>
      <div style="font-size:.65rem;color:#64748b;margin-top:2px">Renderização temporal interpolada</div>
    </div>
  </div>
</div>

<!-- Visual Exhibition Player -->
<div style="background:#0F1115;border:1px solid rgba(255,255,255,0.04);border-radius:6px;padding:1.5rem;margin-bottom:1.5rem">
  <h4 style="font-size:.85rem;color:#fff;text-transform:uppercase;letter-spacing:1px;margin-bottom:1rem;display:flex;align-items:center;gap:.5rem;margin-top:0">
    <span>🎥</span> Vitrine Interativa de Geração (Breathe-Loop por Coerência de Silício)
  </h4>
  <p>
    Abaixo estão representados os dois outputs renderizados pela sua pilha de IA local. Passe o mouse para ativar a sensação de vídeo interpolada, ou clique no botão simulador para iniciar o render sintético do Xeon:
  </p>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.25rem">
    <!-- Player 1: Cyberpunk -->
    <div class="video-preview-box" style="position:relative;background:#050608;border:1px solid rgba(255,255,255,0.04);border-radius:4px;overflow:hidden;aspect-ratio:1">
      <img src="/images/cyberpunk_alley_0_1779586391528.png" alt="Cyberpunk Neon Alley" referrerPolicy="no-referrer" class="animatediff-img-1" style="width:100%;height:100%;object-fit:cover;transition:transform 8s ease-in-out, filter 2s ease;filter:brightness(0.9)" />
      <div style="position:absolute;top:.5rem;left:.5rem;background:rgba(0,0,0,0.85);font-family:monospace;font-size:9px;color:#fff;padding:.2rem .4rem;border-radius:2px;display:flex;align-items:center;gap:.3rem">
        <span class="pulse-red" style="width:5px;height:5px;border-radius:50%;background:#ef4444;display:inline-block"></span>
        <span>CYBER_STREET_00.GIF</span>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent, rgba(0,0,0,0.95));padding:.75rem .5rem .5rem .75rem;display:flex;justify-content:space-between;align-items:center">
        <span style="font-family:monospace;font-size:9px;color:#64748b">Stable Diffusion 1.5</span>
        <span style="font-family:monospace;font-size:9px;color:#ef4444;font-weight:bold">VULKAN_OK</span>
      </div>
    </div>

    <!-- Player 2: Cosmic Glass -->
    <div class="video-preview-box" style="position:relative;background:#050608;border:1px solid rgba(255,255,255,0.04);border-radius:4px;overflow:hidden;aspect-ratio:1">
      <img src="/images/cosmic_glass_0_1779586410888.png" alt="Cosmic Glass Flask" referrerPolicy="no-referrer" class="animatediff-img-2" style="width:100%;height:100%;object-fit:cover;transition:transform 6s ease-in-out, filter 3s ease;filter:brightness(0.85)" />
      <div style="position:absolute;top:.5rem;left:.5rem;background:rgba(0,0,0,0.85);font-family:monospace;font-size:9px;color:#fff;padding:.2rem .4rem;border-radius:2px;display:flex;align-items:center;gap:.3rem">
        <span class="pulse-red" style="width:5px;height:5px;border-radius:50%;background:#ef4444;display:inline-block"></span>
        <span>ALCHEM_COSMOS_01.GIF</span>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent, rgba(0,0,0,0.95));padding:.5rem .75rem;display:flex;justify-content:space-between;align-items:center">
        <span style="font-family:monospace;font-size:9px;color:#64748b">Pure Xeon Model</span>
        <span style="font-family:monospace;font-size:9px;color:#ef4444;font-weight:bold">THREADED_OK</span>
      </div>
    </div>
  </div>

  <div style="text-align:center;margin-top:.5rem">
    <button onclick="toggleAnimateDiffSim(this)" style="background:rgba(239, 68, 68, 0.1);border:1px solid rgba(239, 68, 68, 0.4);border-radius:3px;color:#fca5a5;font-family:monospace;padding:.5rem 1rem;font-size:.72rem;cursor:pointer;transition:all 0.2s;text-transform:uppercase">
      ▶ Ativar Simulação de Movimento
    </button>
  </div>
  
  <div id="sim-log-box" style="background:#07080a;border:1px solid rgba(255,255,255,0.01);border-radius:3px;padding:0.75rem;margin-top:1rem;font-family:monospace;font-size:10px;color:#475569;line-height:1.5;display:none;max-height:120px;overflow-y:auto;text-align:left">
  </div>
</div>

<style>
  .video-preview-box:hover .animatediff-img-1 {
    transform: scale(1.1) rotate(0.5deg);
    filter: brightness(1.1) saturate(1.15) !important;
  }
  .video-preview-box:hover .animatediff-img-2 {
    transform: scale(1.08) rotate(-0.5deg);
    filter: brightness(1.05) saturate(1.2) !important;
  }
  .animate-active-1 {
    animation: panCyberpunk 12s infinite alternate ease-in-out;
    filter: brightness(1.1) saturate(1.15) !important;
  }
  .animate-active-2 {
    animation: panGlass 10s infinite alternate ease-in-out;
    filter: brightness(1.05) saturate(1.2) !important;
  }
  @keyframes panCyberpunk {
    0% { transform: scale(1); filter: hue-rotate(0deg); }
    50% { transform: scale(1.12) translate(5px, -3px); filter: hue-rotate(15deg); }
    100% { transform: scale(1.02) translate(-5px, 2px); filter: hue-rotate(-10deg); }
  }
  @keyframes panGlass {
    0% { transform: scale(1.02) rotate(0deg); }
    50% { transform: scale(1.15) translate(-2px, 4px) rotate(1deg); filter: hue-rotate(5deg); }
    100% { transform: scale(1.05) translate(4px, -2px) rotate(-0.5deg); filter: hue-rotate(-5deg); }
  }
  @keyframes heartbeat {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  .pulse-red {
    animation: heartbeat 1s infinite;
  }
</style>
