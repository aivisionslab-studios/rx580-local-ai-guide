---
id: "llama"
title: "07. COMPILAÇÃO DO LLAMA.CPP (BACKEND VULKAN)"
description: "Passo a passo com os comandos mestre para gerar os binários otimizados de LLM para a RX 580."
category: "guides"
lang: "pt-BR"
---

<div class="note">⚠ Certifique-se de executar os comandos abaixo exclusivamente dentro do <strong>Developer PowerShell do Visual Studio</strong></div>
  <div class="code"><pre># Navegar para a partição de alta velocidade e clonar o repositório oficial
cd E:\
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp

# Instanciar o diretório de build injetando a flag compiladora do backend Vulkan
cmake -B build -DGGML_VULKAN=ON -DCMAKE_BUILD_TYPE=Release

# Disparar a compilação utilizando 20 threads paralelas do processador Xeon
cmake --build build --config Release -j20</pre></div>
  <h4 class="s" style="margin-top:1rem;margin-bottom:.5rem;color:#fff">Comando de Validação do Dispositivo de Aceleração</h4>
  <div class="code"><pre>cd build\bin\Release
.\llama-cli.exe --list-devices
# Retorno esperado do console: Vulkan0: AMD Radeon RX 580 2048SP ✅</pre></div>
