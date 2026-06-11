---
id: "falhas"
title: "03. O QUE NÃO FUNCIONOU (O CEMITÉRIO TÉCNICO)"
description: "Análise detalhada de erros: os motivos técnicos da rejeição do DirectML nativo, OpenVINO e ROCm."
category: "troubleshooting"
lang: "pt-BR"
---

<div class="err">
    <div class="err-t">3.1 DirectML + ComfyUI Windows Nativo — ABANDONADO</div>
    <p><strong>Tentativas:</strong> Invocação via <code>torch-directml</code> e flag <code>--directml</code>. O ecossistema foi detectado como <code>privateuseone0</code>, mas revelou instabilidade crônica devido à falta de atualizações estruturais da Microsoft.</p>
    <p><strong>Logs de Erro Críticos:</strong></p>
    <div class="code"><span class="code-lang">stderr</span><pre>WARNING: torch-directml barely works, is very slow, has not been updated in over 1 year and might be removed soon, please don't use it.

OSError: [WinError 127] Não foi possível encontrar o procedimento especificado
# Causado por um mismatch de DLL entre o torchaudio e a build de CPU do torch 2.4.1

NotImplementedError: Cannot access storage of OpaqueTensorImpl
# CLIPTextEncode quebra ao tentar manipular tensores opacos gerados pelo DirectML</pre></div>
    <p><strong>Causa Raiz:</strong> O DirectML gera tensores opacos incapazes de se comunicar com os backends de atenção modernos do ComfyUI. Além disso, o instalador força a importação do <code>torchaudio</code> dentro do módulo <code>audio_vae.py</code>, quebrando a inicialização mesmo que você não use áudio.</p>
  </div>
  <div class="err" style="margin-top:1rem">
    <div class="err-t">3.2 OpenVINO + Stable Diffusion Forge</div>
    <p><strong>Tentativa:</strong> Acoplamento da extensão <code>sd-webui-openvino</code> desenvolvida pela Intel dentro do ecossistema Forge.</p>
    <div class="code"><span class="code-lang">stderr</span><pre>ModuleNotFoundError: No module named 'ldm'
ModuleNotFoundError: No module named 'sgm'
Error build_unet: Invalid backend: 'openvino'</pre></div>
    <p><strong>Causa Raiz:</strong> A extensão foi desenhada para a arquitetura antiga do Automatic1111. Como o Forge reestruturou completamente o código e substituiu os módulos nativos de <code>ldm</code> e <code>sgm</code>, a injeção do backend OpenVINO falha por completo.</p>
  </div>
  <div class="err" style="margin-top:1rem">
    <div class="err-t">3.3 ROCm — Inviável por Design em Polaris</div>
    <ul>
      <li>A AMD encerrou oficialmente o suporte à arquitetura GCN4 (Polaris/RX 580) nas branches modernas do ROCm (v5.x+).</li>
      <li>Inexistência de suporte oficial para ROCm nativo em ambiente Windows.</li>
      <li>Camadas de compatibilidade via WSL2 para placas antigas geram Kernel Panics constantes em inferências de alta carga.</li>
    </ul>
  </div>
  <div class="err" style="margin-top:1rem">
    <div class="err-t">3.4 WebUI Forge em CPU Pura (HDD)</div>
    <p><strong>Métricas:</strong> Startup time de 85 segundos. Tempo de renderização insustentável de ~19 minutos por imagem simples (512x512, 20 steps). O gargalo do HDD em concorrência com o gerenciamento de paginação do <code>memory_management.py</code> tornou o setup impraticável.</p>
  </div>
