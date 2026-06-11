---
id: "sdcpp"
title: "08. COMPILAÇÃO DO STABLE-DIFFUSION.CPP"
description: "Gerando o motor limpo em C++ para renderização de imagens acelerada por GPU sem dependências CUDA."
category: "guides"
lang: "pt-BR"
---

<div class="note">⚠ Compilação via <strong>Developer PowerShell</strong> · Execução posterior via <strong>PowerShell Comum</strong></div>
  <div class="code"><pre># Clonagem estruturada trazendo todos os submódulos de dependência vinculados
git clone --recursive https://github.com/leejet/stable-diffusion.cpp
cd stable-diffusion.cpp
mkdir build
cd build

# Mapear o compilador ativando a engine Vulkan e compilar os binários em modo de performance
cmake .. -DGGML_VULKAN=ON -DCMAKE_BUILD_TYPE=Release
cmake --build . --config Release -j20</pre></div>
  <div class="code ok" style="margin-top:.75rem"><pre># Logs finais de compilação bem-sucedida:
-- Found Vulkan: C:/VulkanSDK/1.4.341.1/Lib/vulkan-1.lib
[100%] Built target sd-server ✅</pre></div>
