---
id: "comfyui-directml"
title: "14. COMFYUI DIRECTML NATIVO — CRÍTICA DOS ERROS"
description: "Explicação técnica detalhada das falhas crônicas encontradas durante os testes na branch Windows."
category: "troubleshooting"
lang: "pt-BR"
---

<div class="err">
    <div class="err-t">Falha Estrutural — Incompatibilidade do Módulo CLIPTextEncode</div>
    <p>Ao carregar os fluxos básicos de geração de imagem utilizando o instalador nativo DirectML para placas AMD, o console aborta a execução retornando a seguinte exceção impeditiva:</p>
    <div class="code"><span class="code-lang">stderr</span><pre>File "comfy\utils.py", line 245, in encode_token
NotImplementedError: Cannot access storage of OpaqueTensorImpl</pre></div>
    <p><strong>Análise de Engenharia:</strong> O driver DirectML encapsula os dados de memória em objetos conhecidos como <code>OpaqueTensorImpl</code>. Quando as funções internas de otimização de atenção matemática do ComfyUI tentam ler o conteúdo bruto desses tensores na memória física, a camada do ecossistema Microsoft bloqueia o acesso, interrompendo o pipeline de renderização.</p>
  </div>
