---
id: "comfyui-modelos"
title: "12. GESTÃO ZERO-COPY DE MODELOS NO NVMe"
description: "Técnica de links simbólicos para unificar o armazenamento de checkpoints pesados sem duplicar arquivos."
category: "guides"
lang: "pt-BR"
---

<p>Para evitar o desperdício de espaço no drive SSD NVMe e eliminar a necessidade de manter cópias gigantes idênticas entre o Windows e o Linux (WSL2), cria-se um link simbólico direto apontando para o sistema de arquivos cruzado:</p>
  <div class="code"><span class="code-lang">bash</span><pre># Executar este bloco dentro do terminal do subsistema Linux Ubuntu
cd ~/ComfyUI/models/checkpoints/

# Criar o ponto de ancoragem virtual espelhando o arquivo físico localizado na partição E: do Windows
ln -s "/mnt/e/ComfyUI_Models/checkpoints/flux1-schnell-fp8.safetensors" ./flux1-schnell-fp8.safetensors</pre></div>
