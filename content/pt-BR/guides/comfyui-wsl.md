---
id: "comfyui-wsl"
title: "13. INFRAESTRUTURA COMFYUI NO WSL2 (CPU)"
description: "Configurando o ambiente Linux virtualizado para herdar o poder computacional do Xeon e RAM ECC."
category: "guides"
lang: "pt-BR"
---

<p>Para contornar o limite de VRAM física da GPU em modelos massivos, o ComfyUI é instanciado dentro do subsistema Linux apontando a execução estritamente para os cores do processador:</p>
  <div class="code"><span class="code-lang">bash</span><pre># Ativar o ambiente virtual isolado via Miniconda no terminal do Ubuntu
conda activate comfy_env

# Chamar o script principal forçando o uso do hardware de processamento central
python main.py --cpu --listen 0.0.0.0 --port 8188</pre></div>
  <div class="note info" style="margin-top:.75rem">O painel de nós do ComfyUI estará totalmente disponível no lado do Windows através da rota mapeada: <strong>http://localhost:8188</strong></div>
