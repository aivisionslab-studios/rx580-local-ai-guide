---
id: "troubleshoot-comfyui"
title: "25. CATASTROFE DE MEMÓRIA NO COMFYUI WINDOWS"
description: "Tratamento de estouros de alocação física de VRAM e uso emergencial de sinalizadores de paginação."
category: "troubleshooting"
lang: "pt-BR"
---

<div class="err">
    <div class="err-t">Exceção de Runtime: RuntimeError: Could not allocate tensor with...</div>
    <p><strong>Mecanismo da Falha:</strong> Ocorre ao tentar rodar fluxos de imagem complexos no Windows utilizando backends de aceleração instáveis que tentam reservar mais blocos contínuos de memória do que a placa dispõe livremente no momento.</p>
    <p><strong>Flags de Sobrevivência:</strong> Altere a chamada do arquivo de inicialização injetando os comandos de fragmentação de carga: <code>--lowvram</code> ou <code>--normalvram</code>. Isso força o gerenciador do ComfyUI a descarregar as camadas do CLIP da memória de vídeo antes de inicializar o processamento do KSampler.</p>
  </div>
