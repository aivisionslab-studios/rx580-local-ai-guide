---
id: "cpu"
title: "22. PARAMETRIZAÇÃO E AJUSTES DO XEON"
description: "Configurações de BIOS e limites estruturais de instruções fp32 para o processador LGA 2011-3."
category: "builds"
lang: "pt-BR"
---

<div class="card acc">
    <p>Diretrizes Técnicas para Processadores Xeon de Microarquitetura Haswell (v3):</p>
    <p>O processador Intel Xeon E5-2690 v3 lançado em 2014 possui suporte nativo ao conjunto de instruções vetoriais <strong>AVX2</strong>. No entanto, ele não possui hardware dedicado para cálculos matemáticos de precisão reduzida em <strong>FP16 (Half-Precision)</strong>.</p>
    <p>Ao instanciar os loaders de modelos dentro do ComfyUI no Linux, certifique-se de configurar a precisão de cálculo para <strong>FP32 (Single-Precision)</strong>. Caso force a execução em FP16, o processador precisará emular as instruções via software, reduzindo a velocidade de processamento pela metade.</p>
  </div>
