---
id: "modelos"
title: "09. CONVERSÃO DE MODELOS PARA FORMATO GGUF"
description: "Otimização e quantização de arquivos .safetensors padrão para o formato aceito pela engine ggml."
category: "guides"
lang: "pt-BR"
---

<p>Os runtimes otimizados em C++ do <code>stable-diffusion.cpp</code> exigem o formato de arquivo estruturado em <code>.gguf</code>. Modelos tradicionais baixados do Civitai (.safetensors) precisam passar pelo conversor nativo:</p>
  <div class="code"><pre># Comando para conversão direta e aplicação de quantização estável em 8-bits (q8_0)
.\sd-cli.exe -M convert -m "E:\models\DreamShaper_8.safetensors" -o "E:\models\dreamshaper8.gguf" --type q8_0</pre></div>
  <div class="code ok" style="margin-top:.75rem"><pre># Log de encerramento do processo:
[INFO] convert 'DreamShaper_8.safetensors' to 'dreamshaper8.gguf' success ✅</pre></div>
