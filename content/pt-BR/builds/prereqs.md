---
id: "prereqs"
title: "05. PRÉ-REQUISITOS DO SISTEMA"
description: "Ferramental necessário para compilar os binários abertos e subir os servidores locais."
category: "builds"
lang: "pt-BR"
---

<div class="c2">
    <div class="card"><p>⚠ AMBIENTE DE COMPILAÇÃO (GPU)</p><p>Developer PowerShell do VS</p><p>Abre através do Menu Iniciar → "Developer PowerShell for VS 2022"</p></div>
    <div class="card"><p>✅ AMBIENTE DE EXECUÇÃO (RUNTIME)</p><p>PowerShell Padrão do Windows</p><p>Executa os binários finais compilados sem overhead do ecossistema dev</p></div>
  </div>
  <div class="tbl"><table>
    <thead><tr><th>Software / SDK</th><th>Versão Homologada</th><th>Notas de Configuração Essenciais</th></tr></thead>
    <tbody>
      <tr><td>Visual Studio Community</td><td>2022 ou 2026</td><td>Obrigatório marcar a carga de trabalho: "Desenvolvimento para desktop com C++"</td></tr>
      <tr><td>CMake Compiler</td><td>v4.3.2+</td><td>Disponível em cmake.org. Lembrar de marcar: "Add CMake to system PATH"</td></tr>
      <tr><td>Vulkan SDK</td><td>v1.4.341.1</td><td>Baixar via LunarG. Instalação padrão obrigatoriamente em <code>C:\VulkanSDK\</code></td></tr>
      <tr><td>Git Windows</td><td>Última estável</td><td>Instalador oficial para clonagem dos repositórios open-source</td></tr>
      <tr><td>Docker Desktop</td><td>v4.x+</td><td>Necessário para rodar o ecossistema OpenWebUI e pipelines auxiliares como SearXNG</td></tr>
      <tr><td>WSL2 Subsystem</td><td>Ubuntu 22.04.5 LTS</td><td>Base de execução estável para o ambiente Python do ComfyUI e Ollama</td></tr>
      <tr><td>Miniconda Linux</td><td>Branch Python 3.11</td><td>Gerenciador isolado de pacotes rodando dentro do subsistema Linux WSL2</td></tr>
    </tbody>
  </table></div>
  <div class="code"><pre># Comandos de validação do ambiente de compilação
cmake --version
# Retorno esperado: cmake version 4.3.2 ✅

dir C:\VulkanSDK
# Retorno esperado: exibição do diretório da versão 1.4.341.1 ✅</pre></div>
