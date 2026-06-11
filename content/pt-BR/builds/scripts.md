---
id: "scripts"
title: "19. AUTOMAÇÃO E MATADORES DE PROCESSOS"
description: "Scripts em lote para limpar a memória de vídeo e inicializar os servidores locais sem conflitos."
category: "builds"
lang: "pt-BR"
---

<p>Para alternar os fluxos de trabalho ou limpar travamentos latentes na GPU de 8GB, utiliza-se um script de automação em lote (.bat) para expurgar resíduos de processos na VRAM:</p>
  <div class="code"><span class="code-lang">batch</span><pre>@echo off
title INFRASTRUCTURE IA - REBOOT STACK
echo Encerramento forcado de instancias ativas em background...
taskkill /F /IM sd-server.exe 2>nul
taskkill /F /IM llama-server.exe 2>nul

echo Inicializando servidor de linguagem local via backend Vulkan...
E:\llama.cpp\build\bin\Release\llama-server.exe -m "E:\models\mistral-7b-instruct.Q4_K_M.gguf" --port 8081 --device Vulkan0</pre></div>
