---
id: "comfyui-directml-func"
title: "15. REMÉDIO PARA DIRECTML (FIX MANUAL)"
description: "Instalação da roda de desenvolvimento específica para forçar estabilidade operacional."
category: "guides"
lang: "pt-BR"
---

<p>Caso haja necessidade de executar testes comparativos na camada DirectML sem crashes de inicialização, é preciso fazer o downgrade forçado dos pacotes utilizando a build de desenvolvimento de maio de 2024:</p>
  <div class="code"><pre># Comando para expurgar dependências conflitantes e instalar o dev wheel estável
pip uninstall torch torch-directml torchaudio
pip install torch==2.3.1+cpu --index-url https://download.pytorch.org/whl/cpu
pip install torch-directml==0.2.1.dev240521 --no-deps</pre></div>
