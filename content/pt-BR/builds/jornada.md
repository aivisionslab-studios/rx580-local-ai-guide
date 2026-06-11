---
id: "jornada"
title: "06. JORNADA COMPLETA — AS 5 FASES"
description: "A linha do tempo do laboratório: da lentidão inicial da CPU ao controle total do hardware de herança."
category: "builds"
lang: "pt-BR"
---

<p>O sucesso técnico do ecossistema local foi alcançado através de 5 marcos evolutivos e decisões estratégicas de hardware:</p>
  <div class="phase">
    <div class="phase-num">01</div>
    <div class="phase-body">
      <div class="phase-hdr"><span class="phase-title">WebUI Forge em CPU Pura (HDD)</span><span class="lbl lbl-b">BASELINE INICIAL</span></div>
      <p>Primeira infraestrutura funcional. Boot demorado de 85 segundos e marcas de renderização batendo ~19 minutos por imagem. Sistema completamente inviável para uso produtivo.</p>
    </div>
  </div>
  <div class="phase">
    <div class="phase-num">02</div>
    <div class="phase-body">
      <div class="phase-hdr"><span class="phase-title">Aceleração de LLM via Vulkan (RX 580)</span><span class="lbl lbl-r">BREAKTHROUGH TÉCNICO</span></div>
      <p>Compilação bem-sucedida do llama.cpp ativando a flag <code>-DGGML_VULKAN=ON</code>. O motor passou a identificar a placa de vídeo Polaris nativamente, saltando a taxa de inferência de 3-5 t/s para expressivos 15-16 t/s.</p>
    </div>
  </div>
  <div class="phase">
    <div class="phase-num">03</div>
    <div class="phase-body">
      <div class="phase-hdr"><span class="phase-title">Migração de Armazenamento Centralizado para NVMe</span><span class="lbl lbl-y">MARCO DECISIVO</span></div>
      <p>Substituição do HDD mecânico pelo drive NVMe de alta velocidade (1.7–3.5 GB/s). O tempo de carga na memória do modelo de linguagem caiu de 25 minutos para apenas 4 minutos, eliminando o principal gargalo de I/O do laboratório.</p>
    </div>
  </div>
  <div class="phase">
    <div class="phase-num">04</div>
    <div class="phase-body">
      <div class="phase-hdr"><span class="phase-title">stable-diffusion.cpp nativo via Vulkan</span><span class="lbl lbl-g">OBJETIVO GPU CONCLUÍDO ✅</span></div>
      <p>Primeira imagem renderizada localmente utilizando 100% da GPU RX 580 no ambiente Windows. Ciclo de geração do modelo de pesos quânticos SD 1.5 GGUF estabilizado na marca de ~72 segundos.</p>
    </div>
  </div>
  <div class="phase">
    <div class="phase-num">05</div>
    <div class="phase-body">
      <div class="phase-hdr"><span class="phase-title">Escalonamento do FLUX.1 Schnell via Xeon + RAM ECC</span><span class="lbl lbl-b">EXPANSÃO DE CAPACIDADE ✅</span></div>
      <p>Implementação estável do modelo SOTA de 16GB rodando no processador de servidor. Prova empírica de que uma infraestrutura corporativa de 2014 consegue processar de forma robusta inteligências artificiais de última geração de 2026.</p>
    </div>
  </div>
