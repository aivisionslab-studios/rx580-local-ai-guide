// src/content/data.js
export const SECTION_CONTENT = {
  "pt-BR": {
    "contexto": {
      "title": "01. CONTEXTO E PROBLEMA",
      "desc": "Em 2026, a narrativa padrão era clara: RX 580 não roda IA. Análise dos ecossistemas travados e viabilidade de aceleração via Vulkan.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">Em 2026, a narrativa padrão era clara: <strong style="color:#fff">RX 580 não roda IA</strong>. Os ecossistemas disponíveis eram:</p>
  <div class="tbl"><table>
    <thead><tr><th>Solução</th><th>Status para RX 580</th></tr></thead>
    <tbody>
      <tr><td>CUDA (Nvidia)</td><td>❌ Exclusivo Nvidia</td></tr>
      <tr><td>ROCm (AMD oficial)</td><td>❌ Removeu suporte a Polaris/GCN4 na versão 5.x</td></tr>
      <tr><td>DirectML (Microsoft)</td><td>❌ Abandonado antes de amadurecer — instável, lento</td></tr>
      <tr><td>OpenVINO (Intel)</td><td>❌ Incompatible com Forge no Windows</td></tr>
    </tbody>
  </table></div>
  <div class="tbl" style="margin-top:.9rem"><table>
    <thead><tr><th>Item</th><th>Status (antes da solução)</th></tr></thead>
    <tbody>
      <tr><td>LLM</td><td>CPU pura — 25 a 40 minutos por resposta</td></tr>
      <tr><td>Geração de imagens</td><td>ComfyUI via CPU — 50+ minutos por imagem no HDD</td></tr>
      <tr><td>RX 580</td><td>Ociosa, 0% de uso para IA</td></tr>
      <tr><td>Storage</td><td>HDD lento (gargalo crítico de I/O)</td></tr>
    </tbody>
  </table></div>
  <div class="card acc" style="margin-top:1.25rem">
    <blockquote style="font-size:.88rem;color:#94a3b8;font-style:italic;line-height:1.9;border-left:3px solid var(--r);padding-left:.9rem">"Polaris é obsoleta. Só serve pra mineração. AMD antiga não roda IA. Troca de placa."</blockquote>
    <p style="margin-top:.9rem;font-size:.88rem;color:#e2e8f0;font-weight:600">Essa crença era falsa. O poder computacional sempre esteve lá. O problema era o software, não o hardware.</p>
  </div>
  <p style="margin-top:1.25rem;font-size:.88rem;color:#94a3b8;line-height:1.9">O projeto <code style="color:var(--r)">ggml</code> (base do <code style="color:var(--r)">llama.cpp</code> and <code style="color:var(--r)">stable-diffusion.cpp</code>) usa Vulkan como backend de GPU — padrão aberto que funciona em qualquer GPU moderna. A RX 580 suporta Vulkan 1.x desde os drivers originais de 2017. ROCm e CUDA são desnecessários.</p>
  <p style="margin-top:.9rem;font-size:.88rem;color:#94a3b8;line-height:1.9">Para modelos maiores (FLUX.1 Schnell 16GB, por exemplo), a solução é rodar via <strong style="color:#fff">CPU Xeon + RAM ECC abundante</strong> através do ComfyUI no WSL2, com link simbólico para os modelos no Windows — sem duplicar arquivos, sem perder espaço.</p>`
    },
    "hardware": {
      "title": "02. HARDWARE DO LABORATÓRIO",
      "desc": "Configuração Master detalhada: Xeon E5-2690 v3, RX 580 8GB, 32GB RAM ECC e o impacto crítico do NVMe.",
      "html": `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:.85rem;margin-bottom:1.25rem">
    <div class="stat"><div class="stat-icon">🖥️</div><div><div class="stat-lbl">GPU</div><div class="stat-val" style="font-size:.82rem">RX 580 2048SP</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">8GB GDDR5 VRAM</div></div></div>
    <div class="stat"><div class="stat-icon">⚙️</div><div><div class="stat-lbl">CPU</div><div class="stat-val" style="font-size:.82rem">Xeon E5-2690 v3</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">12c/24t · 3.5GHz boost</div></div></div>
    <div class="stat"><div class="stat-icon">💾</div><div><div class="stat-lbl">RAM</div><div class="stat-val" style="font-size:.82rem">32GB DDR4 REG ECC</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">Quad Channel RDIMM</div></div></div>
    <div class="stat"><div class="stat-icon">📀</div><div><div class="stat-lbl">Storage</div><div class="stat-val" style="font-size:.82rem">NVMe E: 1TB</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">1.7–3.5 GB/s leitura</div></div></div>
    <div class="stat"><div class="stat-icon">🖥️</div><div><div class="stat-lbl">OS</div><div class="stat-val" style="font-size:.82rem">Windows 10 Pro</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">WSL2 Ubuntu 22.04.5</div></div></div>
    <div class="stat"><div class="stat-icon">🔧</div><div><div class="stat-lbl">Driver AMD</div><div class="stat-val" style="font-size:.82rem">31.0.21924.61</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">Amdnolk (11/12/2025)</div></div></div>
  </div>
  <div class="tbl"><table>
    <thead><tr><th>Componente</th><th>Especificação no Ambiente</th></tr></thead>
    <tbody>
      <tr><td>Placa-mãe</td><td>Machinist MR9A Pro (Chipset X99, LGA 2011-3)</td></tr>
      <tr><td>Storage Secundário</td><td>HDD C: (Gargalo de I/O — modelos mantidos no NVMe E:)</td></tr>
      <tr><td>Kernel WSL2</td><td>6.6.87.2-microsoft-standard-WSL2</td></tr>
      <tr><td>Vulkan SDK</td><td>1.4.341.1</td></tr>
      <tr><td>CMake</td><td>4.3.2</td></tr>
      <tr><td>Visual Studio</td><td>2022/2026 Community (MSVC 19.50)</td></tr>
      <tr><td>Python (WSL2)</td><td>3.11.15</td></tr>
      <tr><td>PyTorch (WSL2)</td><td>2.4.1+cu121</td></tr>
      <tr><td>ComfyUI Versões</td><td>0.19.3 (WSL2 CPU) | 0.21.0 (Windows DirectML)</td></tr>
    </tbody>
  </table></div>
  <div class="card" style="margin-top:.9rem">
    <p style="font-size:.85rem;color:#64748b;line-height:1.9"><strong style="color:#fff">RX 580 2048SP:</strong> Variante com 2048 Shader Processors (vs 2304SP original). Placa extremamente comum de mineração que performa de forma impecável via Vulkan.</p>
    <p style="font-size:.85rem;color:#64748b;line-height:1.9;margin-top:.65rem"><strong style="color:#fff">NVMe vs HDD:</strong> A mudança para o NVMe reduziu o carregamento do LLM de 25 minutos para 4 minutos. No caso do FLUX (16GB), o carregamento caiu de 25 minutos no HDD para apenas ~30 segundos no NVMe. <strong style="color:var(--r)">O storage é tão crítico quanto a capacidade de processamento.</strong></p>
    <p style="font-size:.85rem;color:#64748b;line-height:1.9;margin-top:.65rem"><strong style="color:#fff">32GB REG ECC:</strong> Operando com o FLUX.1 Schnell FP8, o sistema consome 94% da memória disponível de forma contínua. A RAM de servidor ECC mantém estabilidade absoluta e evita corrupção de tensores sob carga extrema.</p>
  </div>`
    },
    "falhas": {
      "title": "03. O QUE NÃO FUNCIONOU (O CEMITÉRIO TÉCNICO)",
      "desc": "Análise detalhada de erros: os motivos técnicos da rejeição do DirectML nativo, OpenVINO e ROCm.",
      "html": `<div class="err">
    <div class="err-t">3.1 DirectML + ComfyUI Windows Nativo — ABANDONADO</div>
    <p><strong style="color:#e2e8f0">Tentativas:</strong> Invocação via <code>torch-directml</code> e flag <code>--directml</code>. O ecossistema foi detectado como <code>privateuseone0</code>, mas revelou instabilidade crônica devido à falta de atualizações estruturais da Microsoft.</p>
    <p style="margin-top:.45rem"><strong style="color:#e2e8f0">Logs de Erro Críticos:</strong></p>
    <div class="code"><span class="code-lang">stderr</span><pre>WARNING: torch-directml barely works, is very slow, has not been updated in over 1 year and might be removed soon, please don't use it.

OSError: [WinError 127] Não foi possível encontrar o procedimento especificado
# Causado por um mismatch de DLL entre o torchaudio e a build de CPU do torch 2.4.1

NotImplementedError: Cannot access storage of OpaqueTensorImpl
# CLIPTextEncode quebra ao tentar manipular tensores opacos gerados pelo DirectML</pre></div>
    <p style="margin-top:.45rem"><strong style="color:#e2e8f0">Causa Raiz:</strong> O DirectML gera tensores opacos incapazes de se comunicar com os backends de atenção modernos do ComfyUI. Além disso, o instalador força a importação do <code>torchaudio</code> dentro do módulo <code>audio_vae.py</code>, quebrando a inicialização mesmo que você não use áudio.</p>
  </div>
  <div class="err" style="margin-top:1rem">
    <div class="err-t">3.2 OpenVINO + Stable Diffusion Forge</div>
    <p><strong style="color:#e2e8f0">Tentativa:</strong> Acoplamento da extensão <code>sd-webui-openvino</code> desenvolvida pela Intel dentro do ecossistema Forge.</p>
    <div class="code"><span class="code-lang">stderr</span><pre>ModuleNotFoundError: No module named 'ldm'
ModuleNotFoundError: No module named 'sgm'
Error build_unet: Invalid backend: 'openvino'</pre></div>
    <p style="margin-top:.45rem"><strong style="color:#e2e8f0">Causa Raiz:</strong> A extensão foi desenhada para a arquitetura antiga do Automatic1111. Como o Forge reestruturou completamente o código e substituiu os módulos nativos de <code>ldm</code> e <code>sgm</code>, a injeção do backend OpenVINO falaha por completo.</p>
  </div>
  <div class="err" style="margin-top:1rem">
    <div class="err-t">3.3 ROCm — Inviável por Design em Polaris</div>
    <ul>
      <li>A AMD encerrou oficialmente o suporte à arquitetura GCN4 (Polaris/RX 580) nas branches modernas do ROCm (v5.x+).</li>
      <li>Inexistência de suporte oficial para ROCm nativo em ambiente Windows.</li>
      <li>Camadas de compatibilidade via WSL2 para placas antigas geram Kernel Panics constantes em inferências de alta carga.</li>
    </ul>
  </div>
  <div class="err" style="margin-top:1rem">
    <div class="err-t">3.4 WebUI Forge em CPU Pura (HDD)</div>
    <p><strong style="color:#e2e8f0">Métricas:</strong> Startup time de 85 segundos. Tempo de renderização insustentável de ~19 minutos por imagem simples (512x512, 20 steps). O gargalo do HDD em concorrência com o gerenciamento de paginação do <code>memory_management.py</code> tornou o setup impraticável.</p>
  </div>`
    },
    "solucao": {
      "title": "04. A SOLUÇÃO — ARQUITETURA DUPLA",
      "desc": "A estratégia de engenharia definitiva: Divisão inteligente de workloads entre GPU Vulkan e CPU Xeon.",
      "html": `<div class="card acc">
    <h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-bottom:.9rem">Lógica de Fluxo do Systema</h3>
    <div class="code"><pre>CAMINHO 1 — GPU VULKAN (Aceleração Local RX 580):
O ecossistema llama.cpp mapeia a GPU via chamadas nativas Vulkan
        ↓
O stable-diffusion.cpp herda e compartilha a mesma base limpa da engine ggml
        ↓
Modelos SD 1.5 convertidos para GGUF geram imagens estáveis em ~72 segundos ✅

CAMINHO 2 — CPU XEON (Escalonamento para Modelos SOTA Pesados):
O modelo FLUX.1 Schnell FP8 exige 16GB e excede os 8GB de VRAM física da placa
        ↓
Mapeamento do workflow para o ComfyUI rodando via CPU dentro do WSL2 Linux
        ↓
A memória RAM DDR4 REG ECC atua como uma "VRAM virtual de alta estabilidade"
        ↓
Geração completa do FLUX.1 em resolução 768x768 finalizada em ~24 minutos ✅</pre></div>
  </div>
  <h4 class="s" style="margin-top:1.25rem;margin-bottom:.6rem;color:#fff;font-family:'Syne',sans-serif">Mapeamento de Portas e Serviços Coordenados</h4>
  <div class="code"><pre>Interface do Usuário (OpenWebUI via Docker — Porta :3000)
        │
        ├──► Orquestração de Texto: llama-server.exe (Porta :8081 — Backend Vulkan na RX 580)
        │     └── Alternativa de Contingência: Ollama Engine (Porta :11434 — Modo CPU Pura)
        │
        └──► Orquestração de Imagem (Rotas Dinâmicas de Prompt):
              ├──► Demanda Ultra Rápida (SD 1.5 GGUF): sd-server.exe (Porta :7860 — Backend Vulkan)
              └──► Demanda SOTA/Complexa (FLUX.1): ComfyUI Server (Porta :8188 — WSL2 CPU Xeon)</pre></div>`
    },
    "prereqs": {
      "title": "05. PRÉ-REQUISITOS DO SISTEMA",
      "desc": "Ferramental necessário para compilar os binários abertos e subir os servidores locais.",
      "html": `<div class="c2">
    <div class="card"><p style="font-size:.58rem;color:var(--r);text-transform:uppercase;letter-spacing:.15em;margin-bottom:.45rem;font-weight:700">⚠ AMBIENTE DE COMPILAÇÃO (GPU)</p><p style="font-size:.85rem;color:#e2e8f0;font-weight:600">Developer PowerShell do VS</p><p style="font-size:.72rem;color:#475569;margin-top:.2rem">Abre através do Menu Iniciar → "Developer PowerShell for VS 2022"</p></div>
    <div class="card"><p style="font-size:.58rem;color:#22c55e;text-transform:uppercase;letter-spacing:.15em;margin-bottom:.45rem;font-weight:700">✅ AMBIENTE DE EXECUÇÃO (RUNTIME)</p><p style="font-size:.85rem;color:#e2e8f0;font-weight:600">PowerShell Padrão do Windows</p><p style="font-size:.72rem;color:#475569;margin-top:.2rem">Executa os binários finais compilados sem overhead do ecossistema dev</p></div>
  </div>
  <div class="tbl" style="margin-top:1rem"><table>
    <thead><tr><th>Software / SDK</th><th>Versão Homologada</th><th>Notas de Configuração Essenciais</th></tr></thead>
    <tbody>
      <tr><td>Visual Studio Community</td><td>2022 ou 2026</td><td>Obrigatório marcar a carga de trabalho: "Desenvolvimento para desktop com C++"</td></tr>
      <tr><td>CMake Compiler</td><td>v4.3.2+</td><td>Disponível em cmake.org. Lembrar de marcar: "Add CMake to system PATH"</td></tr>
      <tr><td>Vulkan SDK</td><td>v1.4.341.1</td><td>Baixar via LunarG. Instalação padrão obrigatoriamente em <code>C:\\VulkanSDK\\</code></td></tr>
      <tr><td>Git Windows</td><td>Última estável</td><td>Instalador oficial para clonagem dos repositórios open-source</td></tr>
      <tr><td>Docker Desktop</td><td>v4.x+</td><td>Necessário para rodar o ecossistema OpenWebUI e pipelines auxiliares como SearXNG</td></tr>
      <tr><td>WSL2 Subsystem</td><td>Ubuntu 22.04.5 LTS</td><td>Base de execução estável para o ambiente Python do ComfyUI e Ollama</td></tr>
      <tr><td>Miniconda Linux</td><td>Branch Python 3.11</td><td>Gerenciador isolado de pacotes rodando dentro do subsistema Linux WSL2</td></tr>
    </tbody>
  </table></div>
  <div class="code"><pre># Comandos de validação do ambiente de compilação
cmake --version
# Retorno esperado: cmake version 4.3.2 ✅

dir C:\\VulkanSDK
# Retorno esperado: exibição do diretório da versão 1.4.341.1 ✅</pre></div>`
    },
    "jornada": {
      "title": "06. JORNADA COMPLETA — AS 5 FASES",
      "desc": "A linha do tempo do laboratório: da lentidão inicial della CPU ao controle total do hardware de herança.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.75rem">O sucesso técnico do ecossistema local foi alcançado através de 5 marcos evolutivos e decisões estratégicas de hardware:</p>
  <div class="phase">
    <div class="phase-num">01</div>
    <div class="phase-body">
      <div class="phase-hdr"><span class="phase-title">WebUI Forge em CPU Pura (HDD)</span><span class="lbl lbl-b">BASELINE INICIAL</span></div>
      <p style="font-size:.85rem;color:#64748b;line-height:1.9">Primeira infraestrutura funcional. Boot demorado de 85 segundos e marcas de renderização batendo ~19 minutos por imagem. Sistema completamente inviável para uso produtivo.</p>
    </div>
  </div>
  <div class="phase">
    <div class="phase-num">02</div>
    <div class="phase-body">
      <div class="phase-hdr"><span class="phase-title">Aceleração de LLM via Vulkan (RX 580)</span><span class="lbl lbl-r">BREAKTHROUGH TÉCNICO</span></div>
      <p style="font-size:.85rem;color:#64748b;line-height:1.9">Compilação bem-sucedida do llama.cpp ativando a flag <code>-DGGML_VULKAN=ON</code>. O motor passou a identificar a placa de vídeo Polaris nativamente, saltando a taxa de inferência de 3-5 t/s para expressivos 15-16 t/s.</p>
    </div>
  </div>
  <div class="phase">
    <div class="phase-num">03</div>
    <div class="phase-body">
      <div class="phase-hdr"><span class="phase-title">Migração de Armazenamento Centralizado para NVMe</span><span class="lbl lbl-y">MARCO DECISIVO</span></div>
      <p style="font-size:.85rem;color:#64748b;line-height:1.9">Substituição do HDD mecânico pelo drive NVMe de alta velocidade (1.7–3.5 GB/s). O tempo de carga na memória do modelo de linguagem caiu de 25 minutos para apenas 4 minutos, eliminando o principal gargalo de I/O do laboratório.</p>
    </div>
  </div>
  <div class="phase">
    <div class="phase-num">04</div>
    <div class="phase-body">
      <div class="phase-hdr"><span class="phase-title">stable-diffusion.cpp nativo via Vulkan</span><span class="lbl lbl-g">OBJETIVO GPU CONCLUÍDO ✅</span></div>
      <p style="font-size:.85rem;color:#64748b;line-height:1.9">Primeira imagem renderizada localmente utilizando 100% da GPU RX 580 no ambiente Windows. Ciclo de geração do modelo de pesos quânticos SD 1.5 GGUF estabilizado na marca de ~72 segundos.</p>
    </div>
  </div>
  <div class="phase">
    <div class="phase-num">05</div>
    <div class="phase-body">
      <div class="phase-hdr"><span class="phase-title">Escalonamento do FLUX.1 Schnell via Xeon + RAM ECC</span><span class="lbl lbl-b">EXPANSÃO DE CAPACIDADE ✅</span></div>
      <p style="font-size:.85rem;color:#64748b;line-height:1.9">Implementação estável do modelo SOTA de 16GB rodando no processador de servidor. Prova empírica de que uma infraestrutura corporativa de 2014 consegue processar de forma robusta inteligências artificiais de última geração de 2026.</p>
    </div>
  </div>`
    },
    "llama": {
      "title": "07. COMPILAÇÃO DO LLAMA.CPP (BACKEND VULKAN)",
      "desc": "Passo a passo com os comandos mestre para gerar os binários otimizados de LLM para a RX 580.",
      "html": `<div class="note">⚠ Certifique-se de executar os comandos abaixo exclusivamente dentro do <strong>Developer PowerShell do Visual Studio</strong></div>
  <div class="code"><pre># Navegar para a partição de alta velocidade e clonar o repositório oficial
cd E:\\
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp

# Instanciar o diretório de build injetando a flag compiladora do backend Vulkan
cmake -B build -DGGML_VULKAN=ON -DCMAKE_BUILD_TYPE=Release

# Disparar a compilação utilizando 20 threads paralelas do processador Xeon
cmake --build build --config Release -j20</pre></div>
  <h4 class="s" style="margin-top:1rem;margin-bottom:.5rem;color:#fff">Comando de Validação do Dispositivo de Aceleração</h4>
  <div class="code"><pre>cd build\\bin\\Release
.\\llama-cli.exe --list-devices
# Retorno esperado do console: Vulkan0: AMD Radeon RX 580 2048SP ✅</pre></div>`
    },
    "sdcpp": {
      "title": "08. COMPILAÇÃO DO STABLE-DIFFUSION.CPP",
      "desc": "Gerando o motor limpo em C++ para renderização de imagens acelerada por GPU sem dependências CUDA.",
      "html": `<div class="note">⚠ Compilação via <strong>Developer PowerShell</strong> · Execução posterior via <strong>PowerShell Comum</strong></div>
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
[100%] Built target sd-server ✅</pre></div>`
    },
    "modelos": {
      "title": "09. CONVERSÃO DE MODELOS PARA FORMATO GGUF",
      "desc": "Otimização e quantização de arquivos .safetensors padrão para o formato aceito pela engine ggml.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:.9rem">Os runtimes otimizados em C++ do <code>stable-diffusion.cpp</code> exigem o formato de arquivo estruturado em <code style="color:var(--r)">.gguf</code>. Modelos tradicionais baixados do Civitai (.safetensors) precisam passar pelo conversor nativo:</p>
  <div class="code"><pre># Comando para conversão direta e aplicação de quantização estável em 8-bits (q8_0)
.\\sd-cli.exe -M convert -m "E:\\models\\DreamShaper_8.safetensors" -o "E:\\models\\dreamshaper8.gguf" --type q8_0</pre></div>
  <div class="code ok" style="margin-top:.75rem"><pre># Log de encerramento do processo:
[INFO] convert 'DreamShaper_8.safetensors' to 'dreamshaper8.gguf' success ✅</pre></div>`
    },
    "sdserver": {
      "title": "10. INICIALIZAÇÃO DO SERVIDOR SD-SERVER (GPU)",
      "desc": "Ativação do serviço de imagem na porta local para escuta das chamadas de API da interface gráfica.",
      "html": `<div class="note ok">✅ Inicialização homologada: Execute este bloco de código dentro do <strong>PowerShell Comum</strong></div>
  <div class="code"><pre># Levantar o servidor apontando para o modelo quantizado e definindo o host de escuta
E:\\stable-diffusion.cpp\\build\\bin\\Release\\sd-server.exe \\
  -m "E:\\models\\dreamshaper8.gguf" \\
  --host 0.0.0.0 \\
  --port 7860</pre></div>
  <div class="code ok" style="margin-top:.75rem"><pre># Monitoramento do terminal:
ggml_vulkan: Found 1 Vulkan device(s)
ggml_vulkan: 0 = AMD Radeon RX 580 2048SP | VRAM: 8192MB
Server listening on http://0.0.0.0:7860 ✅</pre></div>`
    },
    "flux_server": {
      "title": "10.A — RODAR FLUX NO SD-SERVER (GPU + CPU HÍBRIDO)",
      "desc": "Mapeamento e inicialização do ecossistema Flux de 12B parâmetros com arquitetura de memória segmentada.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">O Flux exige segmentação precisa entre VRAM e RAM host. Utilizando as flags <code>--vae-on-cpu</code> e <code>--vae-tiling</code>, evitamos o estouro de memória (OOM) na RX 580 2048SP. O T5XXL (fp16) e o VAE residem na RAM; o modelo de difusão ocupa a VRAM.</p>
  <div class="tbl">
    <table>
      <thead>
        <tr><th>Componente</th><th>Arquivo Homologado</th><th>Alocação Final</th><th>Tamanho</th></tr>
      </thead>
      <tbody>
        <tr><td>Diffusion Model</td><td><code>flux1-schnell-q4_k.gguf</code></td><td><strong>GPU (VRAM)</strong></td><td>~6.5 GB</td></tr>
        <tr><td>VAE</td><td><code>ae.safetensors</code></td><td><strong>CPU (RAM)</strong></td><td>~160 MB</td></tr>
        <tr><td>CLIP L</td><td><code>clip_l.safetensors</code></td><td><strong>GPU (VRAM)</strong></td><td>~235 MB</td></tr>
        <tr><td>T5XXL</td><td><code>t5xxl_fp16.safetensors</code></td><td><strong>CPU (RAM)</strong></td><td>~9.3 GB</td></tr>
      </tbody>
    </table>
  </div>
  <p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-top:1.25rem">⚠️ <strong style="color:#fff">Notas de Estabilidade:</strong> A remoção da flag <code>--timeout</code> (não suportada pela versão atual) e a inclusão de <code>--vae-tiling</code> eliminaram os erros de <em>DeviceMemoryAllocation</em>. O uso de RAM total chega a ~9.5 GB (T5XXL fp16). Para economizar RAM, substituir por <code>t5xxl_fp8</code> reduz para ~5 GB.</p>
  <p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:.5rem"><strong style="color:#fff">Comando de Produção (iniciar.bat):</strong></p>
  <pre style="font-family:'JetBrains Mono',monospace;font-size:11px">sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 ^
  --diffusion-model "E:\\ia_storage\\models\\Stable-diffusion\\flux1-schnell-q4_k.gguf" ^
  --vae "E:\\ia_storage\\models\\Stable-diffusion\\ae.safetensors" ^
  --clip_l "E:\\ia_storage\\models\\Stable-diffusion\\clip_l.safetensors" ^
  --t5xxl "E:\\ia_storage\\models\\Stable-diffusion\\t5xxl_fp16.safetensors" ^
  --cfg-scale 1.0 --steps 4 --clip-on-cpu --vae-on-cpu --vae-tiling</pre>
  <div class="tbl" style="margin-top:1.25rem; margin-bottom:1.25rem">
    <table>
      <thead>
        <tr><th>Etapa</th><th>Tempo Real</th></tr>
      </thead>
      <tbody>
        <tr><td>Condicionamento (T5XXL)</td><td>11.49s</td></tr>
        <tr><td>Sampling — 4 steps @ 1024x1024</td><td>~838s (~14 min)</td></tr>
        <tr><td>VAE Decode — 9 tiles</td><td>40.45s</td></tr>
        <tr><td><strong>Total por imagem</strong></td><td><strong>~838s (~14 min)</strong></td></tr>
      </tbody>
    </table>
  </div>
  <div class="card" style="margin-bottom:1.25rem; background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e;">
    <span style="color:#22c55e; font-weight:bold">✅ STATUS: SERVIDOR EM PRODUÇÃO — IMAGEM GERADA COM SUCESSO</span><br>
    <span style="font-size:.8rem; color:#94a3b8">Listening on http://0.0.0.0:7860 | VRAM: 7.6/8.0 GB | RAM: ~9.5 GB | GPU: RX 580 2048SP | Temp: 66°C</span>
  </div>`
    },
    "sd_bat_automation": {
      "title": "11.A — SD-SERVER LOCAL / BOOT SEQUENCE",
      "desc": "Script de lote dedicado para inicialização segura e reproduzível do servidor de IA.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">Para evitar erros manuais, caminhos incorretos ou portas presas na VRAM ao reiniciar o Windows, o servidor deve ser iniciado exclusivamente via arquivo <code>.bat</code> na Área de Trabalho.</p>

<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:.5rem"><strong style="color:#fff">Script de Produção (iniciar_ia_server.bat):</strong></p>
<pre style="font-family:'JetBrains Mono',monospace;font-size:11px">@echo off
title Servidor Stable Diffusion Local - Producao
cls

:: 1. Limpeza de processos fantasmas na VRAM/RAM
taskkill /f /im sd-server.exe 2>nul
taskkill /f /im sd-cli.exe 2>nul
timeout /t 2 /nobreak >nul

:: 2. Salto de unidade e rota nativa (CMD syntax)
E:
cd "E:\\stable-diffusion.cpp\\build\\bin\\Release"

:: 3. Execucao com escuta aberta para Docker
sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 -m "E:\\ia_storage\\models\\Stable-diffusion\\checkpoints\\dreamshaper_8.safetensors"

pause</pre>

<div class="tbl" style="margin:1.25rem 0">
  <table>
    <thead>
      <tr><th>Regra</th><th>Motivo</th></tr>
    </thead>
    <tbody>
      <tr><td>Nunca usar <code>.\\</code> antes do executável</td><td>CMD tradicional não reconhece — quebra o terminal</td></tr>
      <tr><td>Bloco <code>taskkill</code> obrigatório</td><td>Libera porta 7860 travada em processos background</td></tr>
      <tr><td>Salto de unidade (<code>E:</code>) antes do <code>cd</code></td><td>CMD não muda de drive sem o salto explícito</td></tr>
    </tbody>
  </table>
</div>

<div class="card" style="margin-bottom:1.25rem; background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e;">
  <span style="color:#22c55e; font-weight:bold">✅ STATUS: AUTOMAÇÃO VALIDADA EM PRODUÇÃO</span><br>
  <span style="font-size:.8rem; color:#94a3b8">Dois cliques no .bat inicializan o ecossistema completo — limpeza, rota e bind de porta em sequência</span>
</div>`
    },
    "sd_openwebui_integration": {
      "title": "11.B — INTEGRAÇÃO OPENWEBUI + DOCKER",
      "desc": "Ponte de rede entre o contêiner Docker do OpenWebUI e o motor C++ nativo rodando na GPU do host.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">Quando o motor de geração roda fora do contêiner Docker, a comunicação local padrão (<code>127.0.0.1</code>) é bloqueada pelo isolamento de rede e pelo Firewall do Windows. A inicialização e a rota precisam ser explícitas.</p>

<p style="font-size:.88rem;color:#fff;margin-bottom:.5rem">⚙️ <strong>Parâmetros Críticos de Inicialização</strong></p>
<div class="tbl" style="margin-bottom:1.25rem">
  <table>
    <thead>
      <tr><th>Flag</th><th>Valor</th><th>Descrição</th></tr>
    </thead>
    <tbody>
      <tr><td><code>--listen-ip</code></td><td><code>0.0.0.0</code></td><td>Abre escuta para requisições externas ao host (Docker)</td></tr>
      <tr><td><code>--listen-port</code></td><td><code>7860</code></td><td>Porta padrão de integração com OpenWebUI</td></tr>
      <tr><td><code>-m</code></td><td>caminho absoluto</td><td>Modelo SD 1.5 / XL em <code>.safetensors</code> ou <code>.gguf</code></td></tr>
    </tbody>
  </table>
</div>

<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:.5rem"><strong style="color:#fff">Comando de Produção — SD 1.5 / DreamShaper:</strong></p>
<pre style="font-family:'JetBrains Mono',monospace;font-size:11px">sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 -m "E:\\ia_storage\\models\\Stable-diffusion\\checkpoints\\dreamshaper_8.safetensors"</pre>

<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin:1rem 0">⚠️ <strong style="color:#fff">Nota de Arquitetura:</strong> Modelos Flux.1 não são compatíveis com esta build via flag <code>-m</code> simples — retornam <code>[ERROR] main.cpp:92 - new_sd_ctx_t failed</code>. Para Flux, use o comando dedicado da seção 10.A com flags <code>--diffusion-model</code>, <code>--vae</code>, <code>--clip_l</code> e <code>--t5xxl</code> separadamente.</p>

<p style="font-size:.88rem;color:#fff;margin-bottom:.75rem">🔌 <strong>Configuração de Rota no OpenWebUI</strong></p>
<ol style="font-size:.88rem;color:#94a3b8;line-height:2;margin-left:1.25rem">
  <li>Acesse <code>http://localhost:3000</code></li>
  <li>Vá em <strong>Configurações &gt; Imagens</strong> (Painel do Administrador)</li>
  <li>Selecione o motor <strong>Automatic1111</strong></li>
  <li>Insira o IP local da máquina com <code>/</code> obrigatório no final:<br>
    <code style="color:#22c55e">http://192.168.15.68:7860/</code>
  </li>
  <li>Clique em <strong>Salvar</strong> — tarja verde confirmará a ponte de rede</li>
</ol>

<div class="card" style="border:1px solid rgba(239,68,68,0.2);background:rgba(239,68,68,0.02);padding:1rem;border-radius:4px;margin:1.25rem 0">
  <strong style="color:#ef4444;display:block;margin-bottom:.4rem">🔒 Liberação Obrigatória no Windows Defender Firewall</strong>
  <p style="font-size:.82rem;color:#94a3b8;line-height:1.7;margin-bottom:.5rem">O Windows Defender bloqueia silenciosamente conexões vindas da subrede interna do Docker (<code>172.17.0.0/16</code>) e do WSL2 (<code>172.x.x.x</code>) por padrão. Sem esta regra, o OpenWebUI não consegue alcançar o sd-server mesmo com <code>--listen-ip 0.0.0.0</code> ativo.</p>
  <p style="font-size:.82rem;color:#fff;margin-bottom:.25rem"><strong>Método 1 — Interface Gráfica (recomendado para primeira instalação):</strong></p>
  <ol style="font-size:.82rem;color:#94a3b8;line-height:1.6;margin-left:1.25rem;margin-bottom:.5rem">
    <li>Abra: <code>Painel de Controle → Windows Defender Firewall → Configurações Avançadas</code></li>
    <li>Clique em: <code>Regras de Entrada → Nova Regra</code></li>
    <li>Tipo: <code>Porta</code></li>
    <li>Protocolo: <code>TCP</code> | Porta: <code>7860</code></li>
    <li>Ação: <code>Permitir a conexão</code></li>
    <li>Perfis: marque <code>Domínio</code>, <code>Privado</code> e <code>Público</code></li>
    <li>Nome: <code>sd-server AIVisionsLab</code></li>
  </ol>
  <p style="font-size:.82rem;color:#fff;margin-bottom:.25rem"><strong>Método 2 — PowerShell (uma linha, execução como Administrador):</strong></p>
  <pre style="font-family:'JetBrains Mono',monospace;font-size:10px;margin-bottom:.5rem">New-NetFirewallRule -DisplayName "sd-server AIVisionsLab" -Direction Inbound -Protocol TCP -LocalPort 7860 -Action Allow</pre>
  <p style="font-size:.82rem;color:#94a3b8;margin:0"><strong>Validação:</strong> Após criar a regra, reinicie o sd-server e tente gerar uma imagem pelo OpenWebUI. A tarja verde na configuração de imagens confirma a ponte ativa.</p>
</div>

<p style="font-size:.88rem;color:#fff;margin:1rem 0 .5rem">📊 <strong>Logs de Sucesso Esperados</strong></p>
<pre style="font-family:'JetBrains Mono',monospace;font-size:11px">[INFO] main.cpp:148 - listening on: http://0.0.0.0:7860
[INFO] stable-diffusion.cpp:3987 - generate_image 512x512
[INFO] stable-diffusion.cpp:4218 - generate_image completed in X.XXs</pre>

<div class="card" style="border-left:3px dashed var(--r);padding:1rem;border-radius:4px;background:rgba(255,255,255,0.01);border:1px solid var(--b);margin-top:1.25rem">
  <strong style="color:#fff;display:block;margin-bottom:.4rem">⚠️ Nota de Compatibilidade de Flags — sd-server</strong>
  <p style="font-size:.82rem;color:#94a3b8;line-height:1.7;margin-bottom:.5rem">O repositório <code>leejet/stable-diffusion.cpp</code> passou por renomeação de argumentos CLI ao longo de suas versões. Dependendo do commit compilado:</p>
  <div class="tbl" style="margin-bottom:.75rem">
    <table>
      <thead>
        <tr><th>Versão / Build</th><th>Flags Corretas</th></tr>
      </thead>
      <tbody>
        <tr><td>Builds antigas (pré master-600)</td><td><code>--host 0.0.0.0 --port 7860</code></td></tr>
        <tr><td>Builds recentes (master-600+)</td><td><code>--listen-ip 0.0.0.0 --listen-port 7860</code></td></tr>
      </tbody>
    </table>
  </div>
  <p style="font-size:.82rem;color:#94a3b8;line-height:1.7;margin-bottom:.5rem"><strong>Diagnóstico rápido:</strong> Se o terminal retornar <code>error: unknown argument '--listen-ip'</code>, substitua imediatamente por <code>--host</code> e <code>--port</code>. O comportamento de rede é idêntico — apenas a nomenclatura do argumento foi atualizada.</p>
  <p style="font-size:.82rem;color:#fff;margin-bottom:.25rem"><strong>Validação da sua versão:</strong></p>
  <pre style="font-family:'JetBrains Mono',monospace;font-size:10px;margin:0">E:\\stable-diffusion.cpp\\build\\bin\\Release\\sd-server.exe --help
# Procure na listagem: se aparecer "--listen-ip", use a sintaxe nova.
# Se aparecer "--host", use a sintaxe antiga.</pre>
</div>`
    },
    "comfyui-wsl": {
      "title": "12 — COMFYUI WSL2",
      "desc": "Configurando o ambiente Linux virtualizado para herdar o poder computacional do Xeon e RAM ECC.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1rem">Para contornar o limite de VRAM física da GPU em modelos massivos, o ComfyUI é instanciado dentro do subsistema Linux apontando a execução estritamente para os cores do processador:</p>
  <div class="code"><span class="code-lang">bash</span><pre># Ativar o ambiente virtual isolado via Miniconda no terminal do Ubuntu
conda activate comfy_env

# Chamar o script principal forçando o uso do hardware de processamento central
python main.py --cpu --listen 0.0.0.0 --port 8188</pre></div>
  <div class="note info" style="margin-top:.75rem">O painel de nós do ComfyUI estará totalmente disponível no lado do Windows através da rota mapeada: <strong>http://localhost:8188</strong></div>`
    },
    "comfyui-directml": {
      "title": "13 — DIRECTML",
      "desc": "Explicação técnica detalhada das falhas crônicas encontradas durante os testes na branch Windows.",
      "html": `<div class="err">
    <div class="err-t">Falha Estrutural — Incompatibilidade do Módulo CLIPTextEncode</div>
    <p>Ao carregar os fluxos básicos de geração de imagem utilizando o instalador nativo DirectML para placas AMD, o console aborta a execução retornando a seguinte exceção impeditiva:</p>
    <div class="code"><span class="code-lang">stderr</span><pre>File "comfy\\utils.py", line 245, in encode_token
NotImplementedError: Cannot access storage of OpaqueTensorImpl</pre></div>
    <p style="margin-top:.45rem"><strong style="color:#e2e8f0">Análise de Engenharia:</strong> O driver DirectML encapsula os dados de memória em objetos conhecidos como <code>OpaqueTensorImpl</code>. Quando as funções internas de otimização de atenção matemática do ComfyUI tentam ler o conteúdo bruto desses tensores na memória física, a camada do ecossistema Microsoft bloqueia o acesso, interrompendo o pipeline de renderização.</p>
  </div>`
    },
    "comfyui-directml-func": {
      "title": "14 — FIXES DIRECTML",
      "desc": "Instalação da roda de desenvolvimento específica para forçar estabilidade operacional.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1rem">Caso haja necessidade de executar testes comparativos na camada DirectML sem crashes de inicialização, é preciso fazer o downgrade forçado dos pacotes utilizando a build de desenvolvimento de maio de 2024:</p>
  <div class="code"><pre># Comando para expurgar dependências conflitantes e instalar o dev wheel estável
pip uninstall torch torch-directml torchaudio
pip install torch==2.3.1+cpu --index-url https://download.pytorch.org/whl/cpu
pip install torch-directml==0.2.1.dev240521 --no-deps</pre></div>`
    },
    "comfyui-flux": {
      "title": "15. PARAMETRIZAÇÃO CRÍTICA DO FLUX.1 SCHNELL",
      "desc": "Configuração matemática obrigatória para processar o modelo SOTA na CPU sem estourar os limites da RAM.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1rem">O processamento do FLUX.1 Schnell de 16GB em modo de CPU exige limites de amostragem fixos. Desvios nestas regras provocam o travamento da máquina por saturação extrema de memória:</p>
  <div class="tbl"><table>
    <thead><tr><th>Parâmetro de Amostragem</th><th>Valor de Ajuste Obrigatório</th><th>Explicação Técnica no Xeon</th></tr></thead>
    <tbody>
      <tr class="hig"><td>Sampling Steps</td><td>4 Steps</td><td>O modelo Schnell foi desenhado para fechar a convergência de ruído em apenas 4 interações.</td></tr>
      <tr class="hig"><td>CFG Scale</td><td>1.0</td><td>Valores acima de 1.0 destroem a fidelidade das texturas e distorcem a distribuição de tensores.</td></tr>
      <tr><td>Scheduler Type</td><td>sgm_uniform</td><td>Garante a interpolação linear dos tensores de difusão de forma otimizada para instruções AVX2.</td></tr>
    </tbody>
  </table></div>`
    },
    "comfyui-modelos": {
      "title": "11.C — GESTÃO ZERO-COPY DE MODELOS NO NVMe",
      "desc": "Técnica de links simbólicos para unificar o armazenamento de checkpoints pesados sem duplicar arquivos.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1rem">Para evitar o desperdício de espaço no drive SSD NVMe e eliminar a necessidade de manter cópias gigantes idênticas entre o Windows e o Linux (WSL2), cria-se um link simbólico direto apontando para o sistema de arquivos cruzado:</p>
  <div class="code"><span class="code-lang">bash</span><pre># Executar este bloco dentro do terminal do subsistema Linux Ubuntu
cd ~/ComfyUI/models/checkpoints/

# Criar o ponto de ancoragem virtual espelhando o arquivo físico localizado na partição E: do Windows
ln -s "/mnt/e/ComfyUI_Models/checkpoints/flux1-schnell-fp8.safetensors" ./flux1-schnell-fp8.safetensors</pre></div>`
    },
    "animatediff-video": {
      "title": "16. ANIMATEDIFF E INTERPOLAÇÃO DE QUADROS (VÍDEO)",
      "desc": "Injetando consistência temporal no ComfyUI sobre hardware legado para estruturar loops fluidos coprocessados no Intel Xeon.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">
  O <strong>AnimateDiff</strong> é um framework de modelagem temporal projetado especificamente para converter modelos de difusão estática (como Stable Diffusion 1.5) em geradores de vídeo consistentes. Ele funciona injetando módulos de atenção temporal sobrepostos no ComfyUI/WSL2. Essa técnica permite calcular transições de quadros adjacentes de forma matematicamente coordenada, gerando loops fluidos e eliminando os efeitos estáticos caóticos de ruído cintilante.
</p>

<!-- Stat cards of render cost -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.5rem">
  <div class="stat-card" style="display:flex;align-items:center;gap:1rem;background:#14171a;border:1px solid var(--b);padding:18px;border-radius:4px">
    <div style="font-size:1.8rem">🎬</div>
    <div>
      <div class="stat-lbl" style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:2px">Pipeline de Vídeo</div>
      <div class="stat-val" style="font-family:'Syne',sans-serif;font-weight:800;font-size:14px;color:#fff">AnimateDiff (WSL2 Pure CPU)</div>
      <div style="font-size:.65rem;color:#64748b;margin-top:2px">24 Threads Intel Xeon E5</div>
    </div>
  </div>
  <div class="stat-card" style="display:flex;align-items:center;gap:1rem;background:#14171a;border:1px solid var(--b);padding:18px;border-radius:4px">
    <div style="font-size:1.8rem">⏳</div>
    <div>
      <div class="stat-lbl" style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:2px">Métrica de Processamento</div>
      <div class="stat-val" style="font-family:'Syne',sans-serif;font-weight:800;font-size:14px;color:#34d399">~141s por Segundo de Frame</div>
      <div style="font-size:.65rem;color:#64748b;margin-top:2px">Renderização temporal interpolada</div>
    </div>
  </div>
</div>

<!-- Visual Exhibition Player -->
<div style="background:#0F1115;border:1px solid rgba(255,255,255,0.04);border-radius:6px;padding:1.5rem;margin-bottom:1.5rem">
  <h4 style="font-size:.85rem;color:#fff;text-transform:uppercase;letter-spacing:1px;margin-bottom:1rem;display:flex;align-items:center;gap:.5rem;margin-top:0">
    <span>🎥</span> Vitrine Interativa de Geração (Breathe-Loop de Vídeo por Cache Local)
  </h4>
  <p style="font-size:.8rem;color:#64748b;line-height:1.6;margin-bottom:1.25rem">
    Abaixo estão representados os dois outputs renderizados pela sua pilha de IA local. Passe o mouse para ativar a sensação de vídeo interpolada, ou clique no botão simulador para iniciar o render sintético do Xeon:
  </p>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.25rem">
    <!-- Player 1: Cyberpunk -->
    <div class="video-preview-box" style="position:relative;background:#050608;border:1px solid rgba(255,255,255,0.04);border-radius:4px;overflow:hidden;aspect-ratio:1">
      <img src="/images/cyberpunk_alley_0_1779586391528.png" alt="Cyberpunk Neon Alley" referrerPolicy="no-referrer" class="animatediff-img-1" style="width:100%;height:100%;object-fit:cover;transition:transform 8s ease-in-out, filter 2s ease;filter:brightness(0.9)" />
      <div style="position:absolute;top:.5rem;left:.5rem;background:rgba(0,0,0,0.85);font-family:monospace;font-size:9px;color:#fff;padding:.2rem .4rem;border-radius:2px;display:flex;align-items:center;gap:.3rem">
        <span class="pulse-red" style="width:5px;height:5px;border-radius:50%;background:#ef4444;display:inline-block"></span>
        <span>CYBER_STREET_00.GIF</span>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent, rgba(0,0,0,0.95));padding:.75rem .5rem .5rem .75rem;display:flex;justify-content:space-between;align-items:center">
        <span style="font-family:monospace;font-size:9px;color:#64748b">Stable Diffusion 1.5</span>
        <span style="font-family:monospace;font-size:9px;color:#ef4444;font-weight:bold">VULKAN_OK</span>
      </div>
    </div>

    <!-- Player 2: Cosmic Glass -->
    <div class="video-preview-box" style="position:relative;background:#050608;border:1px solid rgba(255,255,255,0.04);border-radius:4px;overflow:hidden;aspect-ratio:1">
      <img src="/images/cosmic_glass_0_1779586410888.png" alt="Cosmic Glass Flask" referrerPolicy="no-referrer" class="animatediff-img-2" style="width:100%;height:100%;object-fit:cover;transition:transform 6s ease-in-out, filter 3s ease;filter:brightness(0.85)" />
      <div style="position:absolute;top:.5rem;left:.5rem;background:rgba(0,0,0,0.85);font-family:monospace;font-size:9px;color:#fff;padding:.2rem .4rem;border-radius:2px;display:flex;align-items:center;gap:.3rem">
        <span class="pulse-red" style="width:5px;height:5px;border-radius:50%;background:#ef4444;display:inline-block"></span>
        <span>ALCHEM_COSMOS_01.GIF</span>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent, rgba(0,0,0,0.95));padding:.5rem .75rem;display:flex;justify-content:space-between;align-items:center">
        <span style="font-family:monospace;font-size:9px;color:#64748b">Pure Xeon Model</span>
        <span style="font-family:monospace;font-size:9px;color:#ef4444;font-weight:bold">THREADED_OK</span>
      </div>
    </div>
  </div>

  <div style="text-align:center;margin-top:.5rem">
    <button onclick="toggleAnimateDiffSim(this)" style="background:rgba(239, 68, 68, 0.1);border:1px solid rgba(239, 68, 68, 0.4);border-radius:3px;color:#fca5a5;font-family:monospace;padding:.5rem 1rem;font-size:.72rem;cursor:pointer;transition:all 0.2s;text-transform:uppercase">
      ▶ Ativar Simulação de Movimento
    </button>
  </div>
  
  <div id="sim-log-box" style="background:#07080a;border:1px solid rgba(255,255,255,0.01);border-radius:3px;padding:0.75rem;margin-top:1rem;font-family:monospace;font-size:10px;color:#475569;line-height:1.5;display:none;max-height:120px;overflow-y:auto;text-align:left">
  </div>
</div>

<style>
  .video-preview-box:hover .animatediff-img-1 {
    transform: scale(1.1) rotate(0.5deg);
    filter: brightness(1.1) saturate(1.15) !important;
  }
  .video-preview-box:hover .animatediff-img-2 {
    transform: scale(1.08) rotate(-0.5deg);
    filter: brightness(1.05) saturate(1.2) !important;
  }
  .animate-active-1 {
    animation: panCyberpunk 12s infinite alternate ease-in-out;
    filter: brightness(1.1) saturate(1.15) !important;
  }
  .animate-active-2 {
    animation: panGlass 10s infinite alternate ease-in-out;
    filter: brightness(1.05) saturate(1.2) !important;
  }
  @keyframes panCyberpunk {
    0% { transform: scale(1); filter: hue-rotate(0deg); }
    50% { transform: scale(1.12) translate(5px, -3px); filter: hue-rotate(15deg); }
    100% { transform: scale(1.02) translate(-5px, 2px); filter: hue-rotate(-10deg); }
  }
  @keyframes panGlass {
    0% { transform: scale(1.02) rotate(0deg); }
    50% { transform: scale(1.15) translate(-2px, 4px) rotate(1deg); filter: hue-rotate(5deg); }
    100% { transform: scale(1.05) translate(4px, -2px) rotate(-0.5deg); filter: hue-rotate(-5deg); }
  }
  @keyframes heartbeat {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  .pulse-red {
    animation: heartbeat 1s infinite;
  }
</style>`
    },
    "stack": {
      "title": "17. MAPA DE SERVIÇOS DO STACK INTEGRADO",
      "desc": "Tabela de monitoramento de infraestrutura, roteamento de tráfego local e backends ativos.",
      "html": `<div class="tbl"><table>
    <thead><tr><th>Serviço de IA</th><th>Porta de Acesso</th><th>Protocolo / Engine</th><th>Backend de Hardware Ativo</th></tr></thead>
    <tbody>
      <tr><td><strong>Open WebUI</strong></td><td><code>:3000</code></td><td>Docker Container</td><td>Ambiente Virtualizado WSL2</td></tr>
      <tr class="hig"><td><strong>llama-server</strong></td><td><code>:8081</code></td><td>Nativo ggml Executável</td><td>GPU AMD Radeon RX 580 (Vulkan 1.x)</td></tr>
      <tr class="hig"><td><strong>sd-server</strong></td><td><code>:7860</code></td><td>Nativo ggml Executável</td><td>GPU AMD Radeon RX 580 (Vulkan 1.x)</td></tr>
      <tr><td><strong>ComfyUI Server</strong></td><td><code>:8188</code></td><td>Python Runtime Isolado</td><td>CPU Xeon E5-2690 v3 (Modo Pure CPU)</td></tr>
      <tr><td><strong>Ollama Engine</strong></td><td><code>:11434</code></td><td>Serviço de Contingência</td><td>CPU Xeon E5-2690 v3 (Modo Pure CPU)</td></tr>
    </tbody>
  </table></div>`
    },
    "scripts": {
      "title": "18. SCRIPTS E AUTOMAÇÃO",
      "desc": "Scripts em lote para limpar a memória de vídeo e inicializar os servidores locais sem conflitos.",
      "html": `<h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">19.A — Script Master (Todos os Serviços)</h4>
  <div class="code"><span class="code-lang">batch</span><pre>@echo off
title INFRASTRUCTURE IA - REBOOT STACK
cls
echo Encerramento forcado de instancias ativas em background...
taskkill /F /IM sd-server.exe 2>nul
taskkill /F /IM llama-server.exe 2>nul
timeout /t 2 /nobreak >nul

echo Inicializando LLM via Vulkan na RX 580 (porta 8081)...
start "LLM Server - Vulkan RX580" C:\\llama.cpp\\build\\bin\\Release\\llama-server.exe ^
  -m "E:\\MODELO LLM PARA GPU\\Mistral-7B-Q4_K_M.gguf" ^
  --host 0.0.0.0 ^
  --port 8081 ^
  --device Vulkan0

timeout /t 3 /nobreak >nul

echo Inicializando SD Server via Vulkan na RX 580 (porta 7860)...
E:
cd "E:\\stable-diffusion.cpp\\build\\bin\\Release"
sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 ^
  -m "E:\\ia_storage\\models\\Stable-diffusion\\checkpoints\\dreamshaper_8.safetensors"

pause</pre></div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:1.5rem 0 .75rem 0;text-transform:uppercase">19.B — Conectar LLM no OpenWebUI</h4>
  <p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:.75rem">Após subir o llama-server, conecte no OpenWebUI:</p>
  <ol style="font-size:.88rem;color:#94a3b8;line-height:2;padding-left:1.2rem;margin-bottom:.75rem">
    <li>Acesse <code style="color:var(--r)">http://localhost:3000</code></li>
    <li>Clique no avatar → <strong style="color:#fff">Painel de Administração</strong></li>
    <li>Vá em <strong style="color:#fff">Configurações → Conexões</strong></li>
    <li>Na seção <strong style="color:#fff">API OpenAI</strong> clique em <strong style="color:#fff">"+"</strong></li>
    <li>Preencha os campos abaixo:</li>
  </ol>
  <div class="tbl"><table>
    <thead><tr><th>Campo</th><th>Valor</th></tr></thead>
    <tbody>
      <tr><td>URL</td><td><code>http://host.docker.internal:8081/v1</code></td></tr>
      <tr><td>API Key</td><td><code>sk-local</code></td></tr>
    </tbody>
  </table></div>
  <ol start="6" style="font-size:.88rem;color:#94a3b8;line-height:2;padding-left:1.2rem;margin-top:.75rem">
    <li>Clique no ícone de <strong style="color:#fff">refresh</strong> — deve aparecer tarja verde ✅</li>
    <li>Salva</li>
  </ol>
  <div class="card" style="margin-top:.75rem;border-left:3px solid #eab308;padding-left:.9rem">
    <p style="font-size:.85rem;color:#94a3b8;line-height:1.8"><strong style="color:#eab308">⚠️ Não use <code>127.0.0.1</code></strong> — o Docker roda em rede isolada WSL2 e não enxerga o localhost do Windows. Use sempre <code style="color:var(--r)">host.docker.internal</code>.</p>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:1.5rem 0 .75rem 0;text-transform:uppercase">19.C — Validação no Chat</h4>
  <p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:.75rem">Após salvar, abra um <strong style="color:#fff">Novo Chat</strong> no OpenWebUI:</p>
  <ul style="font-size:.88rem;color:#94a3b8;line-height:2;padding-left:1.2rem">
    <li>O modelo <code style="color:var(--r)">Mistral-7B-Q4_K_M.gguf</code> aparece na lista em <strong style="color:#fff">Externo</strong></li>
    <li>Seleciona e conversa normalmente</li>
    <li>O modelo roda 100% na <strong style="color:#fff">RX 580 via Vulkan</strong> — não no Ollama</li>
  </ul>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:1.5rem 0 .75rem 0;text-transform:uppercase">19.D — Verificar se está na GPU (não na CPU)</h4>
  <p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:.5rem">No terminal do llama-server, confirme:</p>
  <div class="code"><span class="code-lang">log</span><pre>ggml_vulkan: Found 1 Vulkan device(s)
ggml_vulkan: 0 = AMD Radeon RX 580 2048SP | VRAM: 8192MB
llama server listening at http://0.0.0.0:8081</pre></div>
  <p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin:.75rem 0 .5rem 0">E durante inferência o benchmark aparece:</p>
  <div class="code"><span class="code-lang">log</span><pre>17.77 t/s  ← RX 580 Vulkan ✅</pre></div>
  <div class="card" style="margin-top:.75rem">
    <p style="font-size:.85rem;color:#64748b;line-height:1.8">Se aparecer apenas <code>3-5 t/s</code> sem linha <code>ggml_vulkan</code> — está rodando na CPU. Verifique se o <code style="color:var(--r)">--device Vulkan0</code> está no comando.</p>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:1.5rem 0 .75rem 0;text-transform:uppercase">19.E — Três Interfaces Disponíveis</h4>
  <div class="tbl"><table>
    <thead><tr><th>Interface</th><th>URL</th><th>Quando Usar</th></tr></thead>
    <tbody>
      <tr><td><strong style="color:#fff">llama.cpp UI nativa</strong></td><td><code>http://127.0.0.1:8081</code></td><td>Testes rápidos direto no browser</td></tr>
      <tr class="hig"><td><strong style="color:#fff">OpenWebUI</strong></td><td><code>http://localhost:3000</code></td><td>Uso diário com histórico e RAG</td></tr>
      <tr><td><strong style="color:#fff">API direta</strong></td><td><code>http://192.168.15.68:8081/v1</code></td><td>Integração com outros apps</td></tr>
    </tbody>
  </table></div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:1.5rem 0 .75rem 0;text-transform:uppercase">19.F — Regras Críticas do Script</h4>
  <div class="tbl"><table>
    <thead><tr><th>Regra</th><th>Motivo</th></tr></thead>
    <tbody>
      <tr class="hig"><td><code>--host 0.0.0.0</code> obrigatório</td><td><code>127.0.0.1</code> bloqueia Docker</td></tr>
      <tr class="hig"><td><code>--device Vulkan0</code> obrigatório</td><td>Sem isso cai em CPU (3-5 t/s)</td></tr>
      <tr><td><code>taskkill</code> antes de iniciar</td><td>Libera VRAM de processos travados</td></tr>
      <tr><td><code>host.docker.internal</code> no OpenWebUI</td><td>Único endereço que Docker enxerga no host Windows</td></tr>
    </tbody>
  </table></div>`
    },
    "guia": {
      "title": "19. GUIA ESTRATÉGICO POR CASO DE USO",
      "desc": "Matriz de tomada de decisão: quando direcionar o processamento para a GPU ou para o Xeon.",
      "html": `<div class="tbl"><table>
    <thead><tr><th>Objetivo do Workflow</th><th>Modelo Recomendado</th><th>Backend Alocado</th><th>Métrica Real de Geração</th></tr></thead>
    <tbody>
      <tr class="hig"><td>Chat de Texto e Assistência Local</td><td>Mistral 7B / Llama 3 8B GGUF</td><td>GPU RX 580 (Vulkan)</td><td>Alta Performance (15-16 tokens/s) ⚡</td></tr>
      <tr class="hig"><td>Geração de Imagens Veloz (512x512)</td><td>DreamShaper 8 (SD 1.5 GGUF)</td><td>GPU RX 580 (Vulkan)</td><td>Renderização Fluida (~72 segundos)</td></tr>
      <tr><td>Criação de Alta Resolução e Detalhe SOTA</td><td>FLUX.1 Schnell (16GB Weights)</td><td>CPU Xeon (WSL2)</td><td>Processamento Pesado (~24 minutos)</td></tr>
      <tr><td>Interpolação de Quadros e Animação Video</td><td>AnimateDiff Pipeline Standard</td><td>CPU Xeon (WSL2)</td><td>Processamento Estável (~141 segundos)</td></tr>
    </tbody>
  </table></div>`
    },
    "benchmarks": {
      "title": "20. BENCHMARKS REAIS DO LABORATÓRIO",
      "desc": "Dados consolidados de telemetria medidos diretamente nos logs de inferência das duas arquiteturas.",
      "html": `<div class="tbl"><table>
    <thead><tr><th>Modo de Execução do Modelo</th><th>Arquitetura Alocada</th><th>Métrica Comercial Obtida</th><th>Status de Viabilidade</th></tr></thead>
    <tbody>
      <tr><td>Inferência de Texto Comum</td><td>CPU Xeon Pura (Sem Aceleração)</td><td>3 a 5 tokens por segundo</td><td>❌ Ineficiente / Respostas Lentas</td></tr>
      <tr class="hig"><td>Inferência de Texto Compilada</td><td>RX 580 8GB via Vulkan Backend</td><td>15 a 16 tokens por segundo</td><td>✅ Altamente Produtivo / Instantâneo</td></tr>
      <tr><td>Amostragem SD 1.5 (20 Steps)</td><td>ComfyUI Windows via DirectML</td><td>~450 segundos por imagem</td><td>❌ Instável / Descarte por Erro Crítico</td></tr>
      <tr class="hig"><td>Amostragem SD 1.5 (20 Steps)</td><td>stable-diffusion.cpp via Vulkan</td><td>72 segundos por imagem</td><td>✅ Otimizado / Resposta Rápida</td></tr>
    </tbody>
  </table></div>`
    },
    "cpu": {
      "title": "21. PARAMETRIZAÇÃO E AJUSTES DO XEON",
      "desc": "Configurações de BIOS e limites estruturais de instruções fp32 para o processador LGA 2011-3.",
      "html": `<div class="card acc">
    <p style="font-size:.88rem;color:#e2e8f0;font-weight:600;line-height:1.6">Diretrizes Técnicas para Processadores Xeon de Microarquitetura Haswell (v3):</p>
    <p style="margin-top:.5rem;font-size:.85rem;color:#94a3b8;line-height:1.9">O processador Intel Xeon E5-2690 v3 lançado em 2014 possui suporte nativo ao conjunto de instruções vetoriais <strong style="color:#fff">AVX2</strong>. No entanto, ele não possui hardware dedicado para cálculos matemáticos de precisão reduzida em <strong style="color:var(--r)">FP16 (Half-Precision)</strong>.</p>
    <p style="margin-top:.5rem;font-size:.85rem;color:#94a3b8;line-height:1.9">Ao instanciar os loaders de modelos dentro do ComfyUI no Linux, certifique-se de configurar a precisão de cálculo para <strong style="color:#22c55e">FP32 (Single-Precision)</strong>. Caso force a execução em FP16, o processador precisará emular as instruções via software, reduzindo a velocidade de processamento pela metade.</p>
  </div>`
    },
    "troubleshooting": {
      "title": "23. GUIA DE RESOLUÇÃO DE PROBLEMAS (TROUBLESHOOTING)",
      "desc": "Diagnósticos rápidos para contornar falhas de timeout de API e sementes nulas no servidor.",
      "html": `<div class="err">
    <div class="err-t">Sintoma Crítico: generate_image returned no results / Terminal congelado</div>
    <p style="margin-top:.35rem"><strong style="color:#e2e8f0">Causa Identificada:</strong> O servidor <code>sd-server.exe</code> apresenta um bug de estouro numérico intermitente ao processar gerações enviadas com a semente configurada em modo randômico (Seed: -1).</p>
    <p style="margin-top:.35rem"><strong style="color:#22c55e">Ação Corretiva:</strong> Dentro da interface do OpenWebUI, desative a chave de semente dinâmica nas opções avançadas do prompt e force um valor numérico inteiro fixo e válido (Exemplo: <code>42</code>, <code>1337</code>).</p>
  </div>`
    },
    "flux-vulkan": {
      "title": "22. EXPLORAÇÃO COMPLEMENTAR: FLUX VIA VULKAN",
      "desc": "Aceleração alternativa de modelos Flux utilizando quantizações ultra-compactas em C++.",
      "html": `<div class="card">
    <p style="font-size:.88rem;color:#94a3b8;line-height:1.9">Embora o checkpoint nativo do FLUX.1 de 16GB exija o processamento robusto da CPU Xeon, é totalmente viável realizar inferências diretamente na GPU RX 580 utilizando o binário do <code>stable-diffusion.cpp</code> acoplado com quantizações agressivas de 3-bits:</p>
    <div class="note info" style="margin-top:.5rem">Peso Recomendado para Testes VRAM: <strong>flux1-schnell-Q3_K_S.gguf (~5.2GB)</strong>. Esta variação se acomoda com folga dentro do limite físico de 8GB da placa Polaris, entregando gerações SOTA aceleradas por hardware.</div>
  </div>`
    },
    "troubleshoot-comfyui": {
      "title": "24. CATASTROFE DE MEMÓRIA NO COMFYUI WINDOWS",
      "desc": "Tratamento de estouros de alocação física de VRAM e uso emergencial de sinalizadores de paginação.",
      "html": `<div class="err">
    <div class="err-t">Exceção de Runtime: RuntimeError: Could not allocate tensor with...</div>
    <p style="margin-top:.35rem"><strong style="color:#e2e8f0">Mecanismo da Falha:</strong> Ocorre ao tentar rodar fluxos de imagem complexos no Windows utilizando backends de aceleração instáveis que tentam reservar mais blocos contínuos de memória do que a placa dispõe livremente no momento.</p>
    <p style="margin-top:.35rem"><strong style="color:#fff">Flags de Sobrevivência:</strong> Altere a chamada do arquivo de inicialização injetando os comandos de fragmentação de carga: <code>--lowvram</code> ou <code>--normalvram</code>. Isso força o gerenciador do ComfyUI a descarregar as camadas do CLIP da memória de vídeo antes de inicializar o processamento do KSampler.</p>
  </div>`
    },
    "comfyui-portable-amd": {
      "title": "25. COMFYUI PORTÁTIL v0.3.48 — IMPLEMENTAÇÃO AMD",
      "desc": "Configurações específicas e injeção de variáveis de ambiente para a arquitetura Polaris.",
      "html": `<div class="card">
    <p style="font-size:.88rem;color:#94a3b8;line-height:1.9">Para implementações que utilizam pacotes portáteis pré-compilados do ComfyUI focados em compatibilidade AMD DirectML no Windows, o interpretador Python precisa de ajuda para identificar corretamente as capacidades de hardware da GPU antiga:</p>
    <div class="code"><span class="code-lang">batch</span><pre># Inserir no topo do arquivo run_nvidia_gpu.bat ou do script portátil customizado:
set HSA_OVERRIDE_GFX_VERSION=8.0.3
set DXVK_ASYNC=1

.\\python_embeded\\python.exe main.py --directml</pre></div>
    <p style="margin-top:.5rem;font-size:.82rem;color:#64748b;line-height:1.6">O sinalizador <code>8.0.3</code> emula o ID de arquitetura de compilação necessário para que as bibliotecas numéricas processem tensores sem travar o barramento PCIe da série RX 500.</p>
  </div>`
    },
    "comunidade": {
      "title": "26. CONTEXTO E FONTES DA COMUNIDADE",
      "desc": "Repositórios de conhecimento hacker e fóruns dedicados à preservação e otimização de hardware legado.",
      "html": `<div class="card acc">
    <p style="font-size:.85rem;color:#94a3b8;line-height:1.9">A engenharia reversa e a viabilidade técnica deste laboratório baseiam-se em discussões de otimização documentadas por comunidades focadas na extração de performance máxima de componentes de baixo custo:</p>
    <ul style="padding-left:1.2rem;margin-top:.5rem;font-size:.85rem;color:#e2e8f0;line-height:2">
      <li>Comunidade Global de Engenharia de Servidores de Herança: <strong style="color:var(--r)">r/X99_Lab</strong></li>
      <li>Discussões de Otimização e Rimes de Compilação GGUF: <strong style="color:#fff">Github: ggerganov/llama.cpp/discussions</strong></li>
    </ul>
  </div>`
    },
    "amihart": {
      "title": "26.A. MÉTODO AMIHART — INFERÊNCIA RX580 EM POLARIS/DEBIAN",
      "desc": "Nota de Crédito: Seção documental em homenagem à prova de conceito realizada por 艾米心 (Amihart), pioneira na validação de Vulkan sob Debian GCN4/Polaris.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">Em janeiro de 2025, o desenvolvedor <strong style="color:#fff">艾米心 (Amihart)</strong> publicou um estudo técnico demonstrando que, apesar das limitações oficiais impostas pela AMD (fim do suporte oficial do ROCm para arquiteturas Polaris/GCN4), o hardware RX 580 ainda possui pleno potencial de aceleração de IA.</p>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:.85rem;margin-bottom:1.25rem">
    <div class="card" style="border-left:3px solid var(--r);padding:1rem;border-radius:4px;background:rgba(255,255,255,0.01);border:1px solid var(--b);border-left:3px solid var(--r)">
      <p style="font-size:.88rem;font-weight:600;color:#fff;margin-bottom:.5rem">Abordagem AIVisionsLab (Windows Nativo)</p>
      <ul style="padding-left:1.2rem;font-size:0.8rem;color:#94a3b8;line-height:1.8">
        <li>Execução no sistema hospedeiro (Windows).</li>
        <li>Foco em produção diária de alta estabilidade.</li>
        <li>Tuning de orquestração Vulkan nativo.</li>
        <li>Segmentação VRAM/CPU híbrida no WSL.</li>
      </ul>
    </div>
    <div class="card" style="border-left:3px solid #22c55e;padding:1rem;border-radius:4px;background:rgba(255,255,255,0.01);border:1px solid var(--b);border-left:3px solid #22c55e">
      <p style="font-size:.88rem;font-weight:600;color:#fff;margin-bottom:.5rem">O Método Amihart (Linux/Debian)</p>
      <ul style="padding-left:1.2rem;font-size:0.8rem;color:#94a3b8;line-height:1.8">
        <li>Execução em ecossistema Linux/Debian.</li>
        <li>Isolamento robusto via containers Docker.</li>
        <li>Compilação estrita com flags do Vulkan API.</li>
        <li>Sandbox ROCm adaptado virtualizado.</li>
      </ul>
    </div>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">A. Setup de LLM — Vulkan no Debian</h4>
  <p style="font-size:0.85rem;color:#94a3b8;line-height:1.8">O llama.cpp é compilado com Vulkan API puro para contornar a ausência do driver ROCm:</p>
  <div class="code" style="margin-bottom:1.25rem"><pre style="background:#07080a;border:1px solid var(--b);padding:1rem;border-radius:4px;margin:0"><code style="color:#e2e8f0;font-size:11px"># Passo 1: Instalar drivers Vulkan e pré-requisitos de compilação
sudo apt install vulkan-tools libtcmalloc-minimal4 libcurl4-openssl-dev glslc cmake make git pkg-config libvulkan-dev

# Passo 2: Clonar e compilar o llama.cpp com Vulkan habilitado
cd ~
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp && mkdir build && cd build
cmake .. -DGGML_VULKAN=on -DCMAKE_BUILD_TYPE=Release -DLLAMA_CURL=ON

# Passo 3: Adicionar binários ao PATH de execução
echo 'export PATH=$PATH:'$(realpath bin) >> ~/.bashrc
source ~/.bashrc

# Passo 4: Executar DeepSeek R1 8B (Aceleração Vulkan0)
llama-cli -m deepseek-r1:8B --device Vulkan0 -ngl 100</code></pre></div>

  <p style="font-size:.85rem;color:#94a3b8;line-height:1.9;margin-bottom:1rem"><strong>Métrica de Desempenho (Amihart):</strong> No Celeron G6900 operando sem GPU, a resposta é de 5,45 tokens/s. Utilizando aceleração Vulkan pura na RX 580 com 100 camadas offload, a performance sobe para <strong style="color:var(--r)">24,56 tokens/s</strong>, tornando o modelo viável e ágil.</p>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:1.5rem 0 .75rem 0;text-transform:uppercase">B. Setup de Stable Diffusion — Sandbox Docker</h4>
  <p style="font-size:0.85rem;color:#94a3b8;line-height:1.8">Como geradores de imagem exigem dependências ROCm, Amihart utiliza containers virtuais isolados para rodar a WebUI de forma limpa no Debian:</p>
  <div class="code" style="margin-bottom:1.25rem"><pre style="background:#07080a;border:1px solid var(--b);padding:1rem;border-radius:4px;margin:0"><code style="color:#e2e8f0;font-size:11px"># Passo 1: Instalação do motor Docker e chaves estritas
sudo apt update && sudo apt install -y ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io

# Passo 2: Clonagem da WebUI e execução sob isolamento ROCm gfx803
cd ~
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd ~/stable-diffusion-webui

sudo docker run -it \\
  --network=host --device=/dev/kfd --device=/dev/dri \\
  --ipc=host --shm-size 16G --group-add video \\
  --cap-add=SYS_PTRACE \\
  --rm -v $(pwd)/cache:/root/.cache \\
  -v $(pwd)/data:/stable-diffusion-webui/data \\
  woodrex/sd-webui-for-gfx803:latest</code></pre></div>

  <p style="font-size:.85rem;color:#94a3b8;line-height:1.9;margin-bottom:1rem"><strong>Otimização Crítica do Cache Amihart:</strong> Para evitar re-loadings de dependências todas as vezes que o container iniciar:</p>
  <div class="code" style="margin-bottom:1.5rem"><pre style="background:#07080a;border:1px solid var(--b);padding:1rem;border-radius:4px;margin:0"><code style="color:#e2e8f0;font-size:11px"># Obter o CONTAINER ID ativo
sudo docker ps -l
# Cometer o estado para uma nova imagem persistente
sudo docker commit [CONTAINER_ID]
# Ver o ID da imagem persistida e substituir a chamada de docker run por ele
sudo docker images</code></pre></div>

  <div class="card" style="border:1px dashed rgba(255,255,255,0.08);background:rgba(255,255,255,0.01);padding:1rem;border-radius:4px;margin-top:1.25rem">
    <strong style="color:var(--r)">Métricas e Referências Técnicas:</strong> Roteamento baseado na publicação original de <a href="https://amihart.medium.com/inference-with-an-rx580-13e9c1055472" target="_blank" rel="noopener noreferrer" style="color:var(--r);text-decoration:underline;font-weight:bold">艾米心 (Amihart)</a> (Medium, Janeiro de 2025). O conhecimento é aberto e útil à comunidade.
  </div>`
    },
    "dadhacks": {
      "title": "26.B. MÉTODO DADHACKS — AI IMAGE GENERATION ON RX 580 USING VULKAN: A COST-EFFECTIVE SOLUTION",
      "desc": "Análise da consolidação experimental realizada por DH (DadHacks) em dezembro de 2025, estabelecendo caminhos de compatibilidade para geração de imagens na GPU legado.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">Em 05 de dezembro de 2025, o desenvolvedor <strong style="color:#fff">DH (DadHacks)</strong> publicou um guia técnico inovador no site <a href="https://dadhacks.org/2025/12/05/ai-image-generation-on-rx-580-using-vulkan-a-cost-effective-solution/" target="_blank" rel="noopener noreferrer" style="color:var(--r);text-decoration:underline">dadhacks.org</a> demonstrando que a GPU AMD RX 580 de 8GB é perfeitamente viável para geração de IA moderna sem depender de soluções de software proprietárias ou do ROCm.</p>

  <div class="card" style="border-left:3px solid var(--r);padding:1rem;border-radius:4px;background:rgba(255,255,255,0.01);border:1px solid var(--b);margin-bottom:1.25rem">
    <strong style="color:#fff;display:block;margin-bottom:.4rem">📌 Resultados da Validação Técnica:</strong>
    <p style="font-size:.82rem;color:#94a3b8;line-height:1.7;margin:0">O estudo de DadHacks demonstrou de forma experimental que é viável executar o Stable Diffusion via Vulkan, refinando a conclusão preliminar de janeiro de 2025. A maturidade gradual do ecossistema do <code>stable-diffusion.cpp</code> ampliou as taxas de transferência até o fim de 2025.</p>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">A. Compilação do Motor — stable-diffusion.cpp</h4>
  <p style="font-size:0.85rem;color:#94a3b8;line-height:1.8">DH detalhou o fluxo de compilação no Linux utilizando a flag compiladora nativa <code>-DSD_VULKAN=ON</code>:</p>
  <div class="code" style="margin-bottom:1.25rem"><span class="code-lang">bash</span><pre># Clonar de forma recursiva (obrigatório para trazer submódulos do ggml)
git clone --recursive https://github.com/leejet/stable-diffusion.cpp
cd stable-diffusion.cpp && mkdir build && cd build

# Configurar CMake usando Vulkan ativado
cmake .. -DSD_VULKAN=ON

# Compilar binários
cmake --build . --config Release</pre></div>

  <p style="font-size:.82rem;color:#64748b;line-height:1.6;margin-bottom:1.25rem">🧬 <strong>Divergência de Flags Documentada:</strong> O DadHacks usou <code>-DSD_VULKAN=ON</code> (camada de aplicação), enquanto o AIVisionsLab homologou <code>-DGGML_VULKAN=ON</code> (camada de engine de tensores). Ambas geram o mesmo binário eficiente na prática, mas referenciam caminhos diferentes da evolução do repositório leejet.</p>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">B. Comandos de Geração Originais (DadHacks)</h4>
  <p style="font-size:0.85rem;color:#94a3b8;line-height:1.8">Demonstração original de chamada offline via terminal para Flux Schnell (modelo quantizado de 4-bits) e Flux Dev, usando segmentação de memória para poupar VRAM:</p>
  <div class="code" style="margin-bottom:1.25rem"><span class="code-lang">bash</span><pre># Executar Flux Schnell (4 steps de amostragem)
sd --diffusion-model SD-Models/flux1-schnell-q4_0.gguf \\
   --vae SD-Models/ae.safetensors \\
   --clip_l SD-Models/clip_l.safetensors \\
   --t5xxl SD-Models/t5xxl_fp16.safetensors \\
   -p "a lovely beagle holding a sign says 'hello'" \\
   --cfg-scale 1.0 \\
   --sampling-method euler \\
   -v --steps 4 \\
   --clip-on-cpu</pre></div>

  <div class="card" style="border:1px solid rgba(239,68,68,0.2);background:rgba(239,68,68,0.02);padding:1rem;border-radius:4px;margin-bottom:1.25rem">
    <strong style="color:#ef4444;display:block;margin-bottom:.4rem">🚨 ALERTA CRÍTICO: Incompatibilidade GGUF (Descoberta AIVisionsLab)</strong>
    <p style="font-size:.82rem;color:#94a3b8;line-height:1.7;margin:0">O DadHacks não listou uma incompatibilidade de formato muito comum: pesos GGUF publicados pelo mantenedor <strong>city96</strong> são compatíveis <em>apenas</em> com o ComfyUI. Para execução no stable-diffusion.cpp / sd-server, é obrigatório utilizar os modelos publicados oficialmente pelo mantenedor <strong>leejet</strong> (ex: <code style="color:#fff">FLUX.1-schnell-gguf</code>).</p>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:1.5rem 0 .75rem 0;text-transform:uppercase">C. O Que o DadHacks Não Cobriu (Que o AIVisionsLab Expandiu)</h4>
  <p style="font-size:0.85rem;color:#94a3b8;line-height:1.8;margin-bottom:1rem">O guia original de DadHacks focou no ecossistema Linux/terminal com comandos manuais. O AIVisionsLab expandiu agressivamente essa base técnica:</p>
  <table style="width:100%;border-collapse:collapse;font-size:.78rem;color:#94a3b8;line-height:1.8;margin-bottom:1.25rem;border:1px solid var(--b)">
    <thead>
      <tr style="background:rgba(255,255,255,0.02);color:#fff;border-bottom:1px solid var(--b)">
        <th style="padding:.5rem;text-align:left;border-right:1px solid var(--b)">Funcionalidade</th>
        <th style="padding:.5rem;text-align:left;border-right:1px solid var(--b)">DadHacks (Linux)</th>
        <th style="padding:.5rem;text-align:left">AIVisionsLab (Windows Nativo)</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid var(--b)">
        <td style="padding:.5rem;border-right:1px solid var(--b);font-weight:bold;color:#fff">Hospedagem no Windows</td>
        <td style="padding:.5rem;border-right:1px solid var(--b)">❌ Não abordada</td>
        <td style="padding:.5rem;color:#22c55e">✅ Mapeamento via MSVC / Cmd executáveis</td>
      </tr>
      <tr style="border-bottom:1px solid var(--b)">
        <td style="padding:.5rem;border-right:1px solid var(--b);font-weight:bold;color:#fff">Integração Gráfica</td>
        <td style="padding:.5rem;border-right:1px solid var(--b)">❌ Apenas terminal CLI</td>
        <td style="padding:.5rem;color:#22c55e">✅ Servidor API + OpenWebUI / Docker link</td>
      </tr>
      <tr style="border-bottom:1px solid var(--b)">
        <td style="padding:.5rem;border-right:1px solid var(--b);font-weight:bold;color:#fff">Automação .bat</td>
        <td style="padding:.5rem;border-right:1px solid var(--b)">❌ Scripts manuais shell</td>
        <td style="padding:.5rem;color:#22c55e">✅ Scripts automáticos double-click no Desktop</td>
      </tr>
      <tr>
        <td style="padding:.5rem;border-right:1px solid var(--b);font-weight:bold;color:#fff">Segurança VRAM</td>
        <td style="padding:.5rem;border-right:1px solid var(--b)">⚠️ Limitação a base CLI</td>
        <td style="padding:.5rem;color:#22c55e">✅ Otimizações com VAE Tiling contra bugs OOM</td>
      </tr>
    </tbody>
  </table>

  <div class="card" style="border:1px dashed rgba(255,255,255,0.08);background:rgba(255,255,255,0.01);padding:1rem;border-radius:4px;margin-top:1.25rem">
    <strong style="color:var(--r)">Crédito Comunitário Extensivo:</strong> Seção documental baseada na publicação original de <a href="https://dadhacks.org/2025/12/05/ai-image-generation-on-rx-580-using-vulkan-a-cost-effective-solution/" target="_blank" rel="noopener noreferrer" style="color:var(--r);text-decoration:underline;font-weight:bold">DH (DadHacks)</a>, intitulada <em>"AI Image Generation on RX 580 Using Vulkan"</em>. O conhecimento é livre e evolutivo.
  </div>`
    },
    "codacus": {
      "title": "26.C — MÉTODO CODACUS vs AIVisionsLab",
      "desc": "Experimento das 5 flags que salvaram uma GTX 1060 — funcionam numa RX 580?",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">
  O canal Codacus publicou um vídeo de grande repercussão demonstrando como rodar um modelo de <strong>35B parâmetros numa GTX 1060 de 6GB</strong> usando 5 flags específicas do <code>llama.cpp</code>, saltando de 3.0 tokens/s no baseline para 17.0 tokens/s pós-otimizações. O AIVisionsLab testou essa hipótese na antiga <strong>RX 580 2048SP 8GB com Vulkan</strong> — comparando Windows e Linux nativo.
</p>

<div class="tbl">
  <table>
    <thead>
      <tr>
        <th>Métrica / Configuração</th>
        <th>Setup Codacus (Ref)</th>
        <th>Setup AIVisionsLab</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>GPU</strong></td>
        <td>Nvidia GTX 1060 6GB</td>
        <td>AMD Radeon RX 580 2048SP 8GB</td>
      </tr>
      <tr>
        <td><strong>Backend</strong></td>
        <td>CUDA</td>
        <td>Vulkan (Mesa RADV)</td>
      </tr>
      <tr>
        <td><strong>OS</strong></td>
        <td>Linux + Docker</td>
        <td>Windows 10 / Ubuntu 26.04</td>
      </tr>
      <tr>
        <td><strong>CPU</strong></td>
        <td>Intel Core i3-8100</td>
        <td>Intel Xeon E5-2690 v3 (12c/24t)</td>
      </tr>
      <tr>
        <td><strong>Modelo de Teste</strong></td>
        <td>Qwen3.6 35B-A3B Q4_K_M</td>
        <td>Qwen3.6 35B-A3B Q4_K_M (Mesmo modelo)</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;margin-top:1.5rem;margin-bottom:.5rem">O Impacto das 5 Flags no Vulkan AMD</h3>

<div class="tbl">
  <table>
    <thead>
      <tr>
        <th>Flag Aplicada</th>
        <th>Impacto na GTX 1060 (CUDA)</th>
        <th>Impacto na RX 580 (Vulkan Windows)</th>
        <th>Impacto na RX 580 (Vulkan Linux Native)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Baseline</strong></td>
        <td>3.0 tokens/s (-ngl 20)</td>
        <td><strong>7.62 tokens/s (-ngl 10)</strong></td>
        <td><strong>5.18 tokens/s (-ngl 20)</strong></td>
      </tr>
      <tr>
        <td><code>--override-tensor exps=CPU</code></td>
        <td>10.0 tokens/s (+233%)</td>
        <td>6.92 tokens/s (❌ -9%)</td>
        <td>4.62 tokens/s (❌ -11%)</td>
      </tr>
      <tr>
        <td><code>--no-mmap</code> (ou <code>-mmp 0</code>)</td>
        <td>13.5 tokens/s (+35%)</td>
        <td>7.44 tokens/s (❌ -2%)</td>
        <td>4.86 tokens/s (❌ -6%)</td>
      </tr>
      <tr>
        <td>Quantização KV cache (<code>-ctk/ctv</code>)</td>
        <td>17.0 tokens/s (+26%)</td>
        <td>7.58 tokens/s (❌ -1%)</td>
        <td><strong>5.41 tokens/s (✅ +4%)</strong></td>
      </tr>
      <tr>
        <td><code>--mlock</code> / ngl extra</td>
        <td>Estabilidade ampliada</td>
        <td>OOM acima de ngl 10 (❌)</td>
        <td>OOM acima de ngl 20 (❌)</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="card bg-black/40 border border-white/5 p-4 rounded-md my-4">
  <h4 style="color:#fff;font-weight:700;font-size:0.9rem;margin-bottom:0.5rem">⚠️ Análise das Descobertas Técnicas</h4>
  <p style="font-size:0.8rem;color:#94a3b8;line-height:1.7">
    <strong>1. Modelo de Alocação de VRAM:</strong> Por que ngl 20 dava OOM no Windows mas passou no Linux? O driver proprietário da AMD no Windows aloca a memória de forma mais conservadora, enquanto o driver open-source <strong>Mesa RADV no Linux</strong> permite que mais layers sejam descarregados no buffer (teto máximo real de 20 layers vs 10 layers no Windows).
  </p>
  <p style="font-size:0.8rem;color:#94a3b8;line-height:1.7;margin-top:0.5rem">
    <strong>2. Incompatibilidade de Backend:</strong> O roteamento <code>override-tensor exps=CPU</code> para isolar experts Mixtral/MoE da GPU funciona de forma espetacular em CUDA devido ao acesso PCIe de alta velocidade nativo da Nvidia. Sob o backend Vulkan, o overhead dessa movimentação destrói os ganhos de processamento.
  </p>
  <p style="font-size:0.8rem;color:#94a3b8;line-height:1.7;margin-top:0.5rem">
    <strong>3. O Xeon Superior Compensou o Backend:</strong> Mesmo com menor otimização de VRAM, a infraestrutura da CPU Xeon E5-2690 v3 (24 threads) do AIVisionsLab garantiu um baseline original superior de 7.62 tokens/s — batendo os 3.0 tokens/s baselines do i3-8100 do Codacus.
  </p>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;margin-top:1.5rem;margin-bottom:.5rem">Comparativo Mistral 7B — CPU Pura vs Vulkan</h3>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9">
  Para demonstrar o valor bruto e absoluto do backend Vulkan em hardware legado Polaris:
</p>
<div class="code ok">
  <pre>💻 WSL2 Ubuntu (CPU Pura)  ·  24 threads  ·  1.79 tokens/s
🎮 Windows 10 (Vulkan GPU)  ·  12 threads  ·  18.54 tokens/s (⚡ 10x Mais Rápido!)</pre>
</div>
<blockquote style="font-size:.82rem;color:#64748b;font-style:italic;line-height:1.8;border-left:3px solid #E11D48;padding-left:.9rem;margin-top:1rem">
  "As 5 flags do Codacus funcionam perfeitamente para marcas NVIDIA + CUDA + Linux Docker. No ecossistema AMD + Vulkan, nossa própria receita é diferente mas incrivelmente sólida!"
</blockquote>`
    },
    "proximos": {
      "title": "27. PRÓXIMOS PASSOS (ROADMAP 2027)",
      "desc": "Próximas metas de desenvolvimento: Clusters Multi-GPU Vulkan e malha local de agentes autônomos.",
      "html": `<div class="card" style="border-left:3px solid #22c55e">
    <p style="font-size:.88rem;color:#fff;font-weight:600">Planejamento de Expansão do Infraestrutura Computacional:</p>
    <ul style="padding-left:1.2rem;margin-top:.45rem;font-size:.85rem;color:#94a3b8;line-height:2">
      <li><strong style="color:#fff">[ ] Homologação de Cluster Multi-GPU:</strong> Acoplamento de uma segunda placa de vídeo RX 580 em paralelo via Vulkan para distribuição de tensores de peso.</li>
      <li><strong style="color:#fff">[ ] Mapeamento de Agentes Locais Autônomos:</strong> Integração completa do framework CrewAI rodando nativamente sobre a API do OpenWebUI para automação empresarial.</li>
    </ul>
  </div>`
    },
    "arquivos": {
      "title": "28. TAXONOMIA E ESTRUTURA DE ARQUIVOS NVMe",
      "desc": "Árvore de diretórios unificada para rastreamento de binários compilados e modelos compartilhados.",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:.75rem">Organização estrutural rigorosa dos caminhos físicos mantidos dentro da partição de alta velocidade do SSD:</p>
  <pre style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#e2e8f0;background:rgba(0,0,0,.3);padding:.9rem;border-radius:4px;border:1px solid var(--b)">
E:\\
├── llama.cpp\\
│   └── build\\bin\\Release\\
│       ├── llama-server.exe     <span style="color:#64748b"># Servidor de Linguagem Local</span>
│       └── llama-cli.exe        <span style="color:#64748b"># Utilitario de Diagnostico</span>
├── stable-diffusion.cpp\\
│   └── build\\bin\\Release\\
│       ├── sd-server.exe        <span style="color:#64748b"># Servidor de Imagem Vulkan</span>
│       └── sd-cli.exe           <span style="color:#64748b"># Conversor de Modelos GGUF</span>
└── models\\
    ├── mistral-7b-instruct.Q4_K_M.gguf
    └── dreamshaper8.gguf        <span style="color:#64748b"># Checkpoint SD 1.5 Quantizado</span></pre>`
    },
    "meta": {
      "title": "29. REFERÊNCIAS E METADADOS DO DOCUMENTO",
      "desc": "Análise técnica do ciclo de vida físico do hardware legado e filosofia de reaproveitamento do laboratório.",
      "html": `<blockquote style="font-size:.9rem;color:#94a3b8;font-style:italic;line-height:1.9;border-left:3px solid var(--r);padding-left:.9rem;margin-bottom:1rem">
    "A obsolescência programada comercial é uma escolha de mercado, não uma barreira de engenharia. O hardware de herança não morre; ele é libertado pelo software correto."
  </blockquote>
  <div class="tbl" style="margin-top:.9rem"><table>
    <thead><tr><th>Metadado do Sistema</th><th>Registro de Auditoria</th></tr></thead>
    <tbody>
      <tr><td>Versão do Deploy</td><td>VULKAN_DEPLOY_V3.0_COMPLETO</td></tr>
      <tr><td>Ano do Registro</td><td>Histórico Consolidado // Temporada 2026</td></tr>
      <tr><td>Escopo de Autoria</td><td>Arquitetura de Sistemas Black Tuxedo AI Solutions</td></tr>
    </tbody>
  </table></div>`
    },
    "linhatempo": {
      "title": "29.A. LINHA DO TEMPO COLETIVA — A EVOLUÇÃO DO RX 580 COMO PLATAFORMA DE IA",
      "desc": "Análise histórica e comparativa unificada documentando a quebra de barreiras e obsolescência da RX 580 em três etapas revolucionárias (2025-2026).",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">O resgate técnico e a ascensão da AMD Radeon RX 580 como uma plataforma de inteligência artificial prática não é fruto de uma única mente, mas sim de uma <strong>evolução coletiva ascendente</strong>. Três projetos independentes, construídos sobre a base matemática comum do ecossistema <code>ggml</code>, pavimentaram esta jornada:</p>

  <!-- Linha do Tempo Visual -->
  <div style="position:relative;margin:2rem 0;padding-left:1.5rem;border-left:2px solid var(--b)">
    <div style="margin-bottom:1.5rem;position:relative">
      <div style="position:absolute;left:-29px;top:2px;width:12px;height:12px;border-radius:50%;background:var(--r);border:2px solid #07080a"></div>
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--r);font-weight:bold">JANEIRO DE 2025</span>
      <h5 style="color:#fff;margin:.25rem 0;font-size:.88rem">Método Amihart (Debian Linux)</h5>
      <p style="font-size:.8rem;color:#94a3b8;line-height:1.6;margin:0">Primeiro marco documentado. Validou LLMs acelerados por Vulkan no <code>llama.cpp</code> obtendo 24.56 t/s. No entanto, declarou: <em>"Vulkan não funciona para Stable Diffusion"</em>, devido às limitações do software na época, recorrendo ao ROCm via Docker.</p>
    </div>
    <div style="margin-bottom:1.5rem;position:relative">
      <div style="position:absolute;left:-29px;top:2px;width:12px;height:12px;border-radius:50%;background:#eab308;border:2px solid #07080a"></div>
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#eab308;font-weight:bold">DEZEMBRO DE 2025</span>
      <h5 style="color:#fff;margin:.25rem 0;font-size:.88rem">Método DadHacks (Linux/Debian)</h5>
      <p style="font-size:.8rem;color:#94a3b8;line-height:1.6;margin:0">Refutou empiricamente a impossibilidade de Stable Diffusion via Vulkan. Utilizou o recém-lançado motor <code>stable-diffusion.cpp</code> com a flag compiladora <code>-DSD_VULKAN=ON</code> para rodar geração GGUF do Flux Schnell com segmentação CPU/GPU.</p>
    </div>
    <div style="position:relative">
      <div style="position:absolute;left:-29px;top:2px;width:12px;height:12px;border-radius:50%;background:#22c55e;border:2px solid #07080a"></div>
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#22c55e;font-weight:bold">TEMPORADA 2026</span>
      <h5 style="color:#fff;margin:.25rem 0;font-size:.88rem">AIVisionsLab (Windows Nativo + WSL2)</h5>
      <p style="font-size:.8rem;color:#94a3b8;line-height:1.6;margin:0">Unificação do ecossistema de produção. Desenvolveu automação nativa via <code>.bat</code>, integrou renderização Vulkan local a painéis amigáveis (OpenWebUI via Docker), documentou os fallbacks para CPU Xeon em modelos SOTA e mapeou de forma exaustiva os motivos de falhas do DirectML/ROCm no Windows.</p>
    </div>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:2rem 0 .75rem 0;text-transform:uppercase">A. A Pergunta que Cada Projeto Respondeu</h4>
  <p style="font-size:.82rem;color:#94a3b8;line-height:1.7;margin-bottom:1rem">A evolução da maturidade técnica da RX 580 pode ser traduzida pelas premissas respondidas pelos autores:</p>
  <ul style="padding-left:1.2rem;font-size:.82rem;color:#94a3b8;line-height:1.8;margin-bottom:1.25rem">
    <li><strong style="color:#fff">Amihart (Jan 2025):</strong> <em>"É possível rodar LLMs de forma rápida na RX 580 sem ROCm oficial?"</em> <strong style="color:var(--r)">Sim</strong>, compilando o llama.cpp com Vulkan API puro.</li>
    <li><strong style="color:#fff">DadHacks (Dez 2025):</strong> <em>"É possível gerar imagens via IA aceleradas por Vulkan na RX 580?"</em> <strong style="color:var(--r)">Sim</strong>, compilando stable-diffusion.cpp e utilizando o formato alternativo estável GGUF.</li>
    <li><strong style="color:#fff">AIVisionsLab (2026):</strong> <em>"É possível colocar toda essa infraestrutura em produção integrada e amigável no Windows?"</em> <strong style="color:var(--r)">Sim</strong>, construindo pontes de rede de contêineres Docker, automações unificadas e fallbacks inteligentes de CPU para excedentes de VRAM.</li>
  </ul>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">B. Tabela Mestre Comparativa Unificada</h4>
  <p style="font-size:.82rem;color:#94a3b8;line-height:1.7;margin-bottom:1rem">Mapeamento estruturado cruzado das capacidades e conquistas cumulativas:</p>
  <div class="tbl" style="margin-bottom:1.5rem">
    <table>
      <thead>
        <tr>
          <th>Capacidade</th>
          <th>Amihart (2025)</th>
          <th>DadHacks (2025)</th>
          <th>AIVisionsLab (2026)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Sistema Base</strong></td><td>Debian Linux</td><td>Linux Debian</td><td>Windows 10 Pro + WSL2 Linux</td></tr>
        <tr><td><strong>Motor de LLM</strong></td><td>✅ Vulkan (24.56 t/s)</td><td>✅ Vulkan (llama.cpp)</td><td>✅ Vulkan (15-16 t/s)</td></tr>
        <tr><td><strong>Motor SD</strong></td><td>❌ Não viável em Vulkan</td><td>✅ Vulkan puro</td><td>✅ Vulkan puro (~72s SD1.5)</td></tr>
        <tr><td><strong>Flux GGUF</strong></td><td>❌ Inexistente</td><td>✅ Linha de comando</td><td>✅ Híbrido GPU/CPU Estável</td></tr>
        <tr><td><strong>Interface Gráfica</strong></td><td>❌ Apenas Console / WebUI Docker</td><td>❌ Apenas CLI</td><td>✅ OpenWebUI + API integrada</td></tr>
        <tr><td><strong>Automação</strong></td><td>❌ Não desenvolvido</td><td>❌ Não desenvolvido</td><td>✅ Scripts .bat double-click</td></tr>
        <tr><td><strong>Estabilidade VRAM</strong></td><td>❌ Limitação física ROCm</td><td>⚠️ Manual CLI</td><td>✅ VAE Tiling integrado</td></tr>
        <tr><td><strong>Modelos &gt; 8GB</strong></td><td>❌ OOM crônicos</td><td>⚠️ CPU offload básico</td><td>✅ Quad-Channel REG ECC fallbacks</td></tr>
        <tr><td><strong>Animação Video</strong></td><td>❌ Não abordado</td><td>❌ Não abordado</td><td>✅ AnimateDiff WSL2 CPU Xeon</td></tr>
        <tr><td><strong>Detecção GGUF</strong></td><td>❌ Não abordado</td><td>❌ Não abordado</td><td>✅ Mapeamento leejet vs city96</td></tr>
      </tbody>
    </table>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">C. O Denominador Técnico Comum — Engine GGML</h4>
  <p style="font-size:.85rem;color:#94a3b8;line-height:1.8;margin-bottom:1rem">A tecnologia central de compressão e execução que viabilizou o aproveitamento de GPUs legacy foi o ecossistema desenvolvido por Georgi Gerganov (<strong>ggml / llama.cpp / stable-diffusion.cpp</strong>). Ao portar as operações tensoriais diretamente para a linguagem C/C++ e expor ganchos nativos à biblioteca gráfica aberta do <strong>Vulkan API</strong>, esta implementação permite que placas sem pacotes modernos de driver proprietário realizem cálculos massivos nativos (contornando drivers de vendor restritivos).</p>
 
   <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">D. Filosofia Convergente</h4>
   <p style="font-size:0.85rem;color:#94a3b8;line-height:1.8">Manifestações diretas que eternizam o propósito livre destes pesquisadores:</p>
   <blockquote style="font-size:.82rem;color:#94a3b8;font-style:italic;line-height:1.7;border-left:3px solid var(--r);padding-left:.9rem;margin-bottom:.85rem">
     <strong>Amihart:</strong> "Apesar de quão antiga é esta GPU, é tecnicamente possível utilizá-la para IA se adaptarmos o fluxo de execução... otimização de baixo nível é a chave para o reaproveitamento de hardware legado."
   </blockquote>
   <blockquote style="font-size:.82rem;color:#94a3b8;font-style:italic;line-height:1.7;border-left:3px solid var(--r);padding-left:.9rem;margin-bottom:.85rem">
     <strong>DadHacks:</strong> "Esse setup fornece uma ponte viável de aproveitamento técnico dos investimentos existentes em hardware sem exigir upgrades caros ou dependência de pacotes de software inchados."
   </blockquote>
   <blockquote style="font-size:.82rem;color:#94a3b8;font-style:italic;line-height:1.7;border-left:3px solid var(--r);padding-left:.9rem;margin-bottom:1.25rem">
     <strong>AIVisionsLab:</strong> "A degradação por obsolescência de drivers e ecossistemas fechados é um fator comercial e não uma limitação material da placa. O hardware legado mantém sua utilidade operacional mediante suporte de software aberto."
   </blockquote>
 
   <div class="card" style="border:1px dashed rgba(255,255,255,0.08);background:rgba(255,255,255,0.01);padding:1rem;border-radius:4px;margin-top:1.25rem">
     <strong style="color:var(--r)">Crédito de Co-autoria e Referência:</strong> Linha do tempo técnica dedicada ao esforço experimental cumulativo de <strong>艾米心 (Amihart)</strong>, <strong>DH (DadHacks)</strong>, <strong>leejet</strong>, <strong>ggerganov</strong>, <strong>woodrex</strong> e a todos os desenvolvedores independentes focados em reaproveitamento digital e preservação de hardware.
       </div>`
    },
    "audio_rvc": {
      "title": "31. VOICE CONVERSION LOCAL — APPLIO RVC EM AMD RX 580",
      "desc": "Pipeline de clonagem de voz no Windows sem CUDA NVIDIA",
      "html": `<blockquote style="font-size:.82rem;color:#94a3b8;font-style:italic;line-height:1.7;border-left:3px solid var(--r);padding-left:.9rem;margin-bottom:1.25rem">
  Documentação honesta de uma instalação real, incluindo todas as tentativas, erros e soluções.<br />
  Conduzida em duas sessões: ChatGPT (fases iniciais) + Claude (fases finais).
</blockquote>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">CONTEXTO DO PROJETO</h3>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">O objetivo era montar um pipeline de produção audiovisual para canal do YouTube estilo dark/documentário:</p>
<div class="code" style="margin-bottom:1.25rem">
  <pre><code>Texto → Balabolka + Antônio Neural (TTS) → WAV → Applio/RVC → Yuri (voz clonada)</code></pre>
</div>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">A ideia central: separar <strong>atuação</strong> de <strong>identidade vocal</strong>.</p>
<ul style="list-style-type:disc;padding-left:1.5rem;margin-bottom:1.25rem;color:#94a3b8;line-height:1.8">
  <li><strong style="color:#fff">Antônio Neural</strong> faz a interpretação, prosódia e emoção (voz Microsoft Neural)</li>
  <li><strong style="color:#fff">Yuri</strong> (modelo RVC treinado) aplica a identidade vocal por cima</li>
</ul>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.5rem">Isso produz resultado muito mais natural que TTS generativo puro.</p>

<div class="tbl" style="margin-bottom:1.5rem">
  <table>
    <thead>
      <tr>
        <th>Aspecto</th>
        <th>XTTS/TTS puro</th>
        <th>Antônio → Yuri (RVC)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Prosódia</td>
        <td>Artificial</td>
        <td>Humana (ator real)</td>
      </tr>
      <tr>
        <td>Termos técnicos</td>
        <td>Tropeça</td>
        <td>Lê corretamente</td>
      </tr>
      <tr>
        <td>Textos longos</td>
        <td>Degrada</td>
        <td>Estável</td>
      </tr>
      <tr>
        <td>Identidade vocal</td>
        <td>Genérica</td>
        <td>Clonada</td>
      </tr>
      <tr>
        <td>Naturalidade</td>
        <td>60-70%</td>
        <td>80-95%</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">HARDWARE UTILIZADO</h3>
<div class="tbl" style="margin-bottom:1.5rem">
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Especificação</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CPU</td>
        <td>Intel Xeon E5-2690 v3 (24 núcleos)</td>
      </tr>
      <tr>
        <td>GPU</td>
        <td>AMD Radeon RX 580 2048SP (8GB VRAM)</td>
      </tr>
      <tr>
        <td>RAM</td>
        <td>31.8 GB DDR4 REG ECC</td>
      </tr>
      <tr>
        <td>OS</td>
        <td>Windows 11</td>
      </tr>
      <tr>
        <td>Storage</td>
        <td>SSD NVMe (E:)</td>
      </tr>
      <tr>
        <td>Python</td>
        <td>3.11.9</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">FASE 0 — TENTATIVA COM DATASET DO ANTÔNIO (fracasso documentado)</h3>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">A ideia original era treinar o modelo RVC com horas de áudio do Antônio Neural. Foi criado um script <code>split.py</code> com Whisper para segmentar automaticamente o áudio em clips de 6-12 segundos.</p>
<p style="font-size:.88rem;color:#ef4444;font-weight:700;margin-bottom:0.5rem"><strong>O problema: estouro de memória</strong></p>
<div class="code" style="margin-bottom:1.25rem">
  <pre><code>MemoryError
concurrent.futures.process.BrokenProcessPool</code></pre>
</div>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">O pré-processamento de dataset grande (~2h34 de áudio) estourou RAM e VRAM simultaneamente. Mesmo quando terminava, o volume de 1000+ clips causava instabilidade no pipeline do Applio.</p>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem"><strong>Decisão:</strong> abandonar o dataset do Antônio e usar diretamente <strong>9 minutos de TTS do ElevenLabs</strong> com a voz do Yuri. Menor, mais limpo, mais controlado.</p>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">FASE 1 — INSTALAÇÃO DO AMBIENTE BASE</h3>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Estrutura de pastas:</strong></p>
<div class="code" style="margin-bottom:1.25rem">
  <pre><code>E:\\tts-audio_pra_youtube\\
├── Applio\\
├── voices\\
│   └── YURI-TTS.wav  (9 minutos, ElevenLabs, voz Yuri)
├── output\\
└── scripts\\</code></pre>
</div>

<div class="err" style="margin-bottom:1.25rem">
  <div class="err-t">⚠️ Problema: Python 3.10 incompatível</div>
  <p>O Applio moderno exige Python 3.11+. O numpy 2.4.4 requerido não existe para 3.10.</p>
</div>

<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Solução:</strong> instalar Python 3.11 em paralelo sem remover o 3.10:</p>
<div class="code" style="margin-bottom:1.25rem">
  <span class="code-lang">powershell</span>
  <pre><code>py -0
# -V:3.11  Python 3.11 (64-bit)   ← usar esta
# -V:3.10  Python 3.10 (64-bit)   ← manter para outros projetos

py -3.11 -m venv venv
venv\\Scripts\\activate
python --version
# Python 3.11.9  ✅</code></pre>
</div>

<div class="err" style="margin-bottom:1.25rem">
  <div class="err-t">⚠️ Problema: requirements.txt com CUDA forçado</div>
  <div class="code" style="margin-top:0.5rem;margin-bottom:0.5rem">
    <pre><code># O Applio traz esta linha que quebra no AMD Windows:
torch==2.7.1+cu128; sys_platform == 'linux' or sys_platform == 'win32'</code></pre>
  </div>
  <p>O sufixo <code>+cu128</code> é CUDA 12.8 exclusivo NVIDIA. No Windows (<code>win32</code>), essa condição sempre é verdadeira.</p>
</div>

<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Solução:</strong> editar o <code>requirements.txt</code>:</p>
<div class="code" style="margin-bottom:1.25rem">
  <pre><code># REMOVER:
torch==2.7.1+cu128; sys_platform == 'linux' or sys_platform == 'win32'
torchaudio==2.7.1+cu128; sys_platform == 'linux' or sys_platform == 'win32'
torchvision==0.22.1+cu128; sys_platform == 'linux' or sys_platform == 'win32'

# SUBSTITUIR POR:
torch==2.7.1; sys_platform == 'win32'
torchaudio==2.7.1; sys_platform == 'win32'
torchvision==0.22.1; sys_platform == 'win32'</code></pre>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">FASE 2 — TENTATIVA DIRECTML (fracasso documentado)</h3>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">Com o Applio rodando em CPU (~10 min por época), tentou-se acelerar com DirectML.</p>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Instalação e teste:</strong></p>
<div class="code" style="margin-bottom:1.25rem">
  <span class="code-lang">powershell</span>
  <pre><code>pip install torch==2.4.1 torchaudio==2.4.1 torchvision==0.19.1
pip install torch-directml

python -c "import torch_directml; dml = torch_directml.device(); print(dml)"
# privateuseone:0  ✅  — RX 580 reconhecida</code></pre>
</div>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Resultado real:</strong></p>
<ul style="list-style-type:disc;padding-left:1.5rem;margin-bottom:1.25rem;color:#94a3b8;line-height:1.8">
  <li>GPU uso: 7-10%</li>
  <li>VRAM: 1.2GB usada</li>
  <li>Velocidade com DirectML: <strong>4.27s/it</strong></li>
  <li>Velocidade sem DirectML (CPU): <strong>4.46s/it</strong></li>
  <li>Diferença real: <strong>~5%</strong> — irrelevante</li>
</ul>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Por que foi abandonado:</strong></p>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">O <code>torch-directml</code> está preso na versão <code>0.2.5.dev240914</code> (setembro 2024) e exige <code>torch==2.4.1</code>. O Applio precisa de <code>torch==2.7.1</code>. Conflito irreconciliável:</p>
<div class="code" style="margin-bottom:1.25rem">
  <pre><code>torch-directml 0.2.5 requires torch==2.4.1
hyper-connections 0.4.11 requires torch>=2.5   ← conflito
torch-einops-utils 0.1.1 requires torch>=2.5   ← conflito</code></pre>
</div>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">A Microsoft parou de investir no DirectML para IA. O projeto está essencialmente abandonado.</p>
<p style="font-size:.88rem;color:#10b981;line-height:1.9;margin-bottom:1.25rem">✅ <strong>Conclusão:</strong> DirectML para RVC em Windows AMD em 2026 = não vale a pena.</p>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">FASE 3 — ERRO CRÍTICO: VARIÁVEIS DE AMBIENTE</h3>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">Durante tentativas de forçar CPU, foram usados comandos que <strong>silenciosamente quebravam a extração de características</strong>:</p>
<div class="code" style="margin-bottom:1.25rem">
  <span class="code-lang">powershell</span>
  <pre><code># ❌ NUNCA FAZER ISSO com Applio AMD:
set USE_DIRECTML=0
set CUDA_VISIBLE_DEVICES=-1
set ROCM_VISIBLE_DEVICES=-1
set HIP_VISIBLE_DEVICES=-1</code></pre>
</div>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">Esses comandos deixavam a pasta <code>extracted</code> vazia após a extração. O treino terminava em <strong>segundos</strong> dizendo "Model trained successfully" sem gerar nenhum <code>.pth</code>.</p>
<div class="code" style="margin-bottom:1.25rem">
  <pre><code>Not enough data present in the training set.
Feature files in logs\\my-project\\extracted could not be loaded correctly.</code></pre>
</div>
<div class="err" style="margin-bottom:1.25rem">
  <div class="err-t">⚠️ Armadilha: "Model trained successfully" em segundos = treino fake.</div>
  <p>Sempre verificar se <code>logs/projeto/extracted/</code> tem arquivos <code>.npy</code> antes de treinar.</p>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">FASE 4 — INSTALAÇÃO LIMPA (solução final)</h3>
<div class="code" style="margin-bottom:1.25rem">
  <span class="code-lang">powershell</span>
  <pre><code># 1. Destruir ambiente corrompido
deactivate
Remove-Item -Recurse -Force venv
Remove-Item -Recurse -Force logs

# 2. Criar venv limpo
py -3.11 -m venv venv
venv\\Scripts\\activate
python -m pip install --upgrade pip

# 3. Instalar torch base
pip install torch==2.4.1 torchaudio==2.4.1 torchvision==0.19.1
pip install torch-directml

# 4. Instalar dependências sem sobrescrever torch
pip install -r requirements.txt --no-deps

# 5. Corrigir dependências faltantes
pip install gradio-client==1.14.0
pip install cffi soupsieve local-attention
pip install "aiofiles&lt;25.0" "pandas&lt;3.0" "pydantic&lt;=2.12.3"
pip install "starlette&lt;1.0,&gt;=0.40.0" "tomlkit&lt;0.14.0"
pip install "tokenizers&gt;=0.22.0,&lt;=0.23.0"
pip install audioread decorator lazy-loader msgpack pooch scikit-learn resampy</code></pre>
</div>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>config.py — versão final (sem DirectML):</strong></p>
<div class="code" style="margin-bottom:1.25rem">
  <span class="code-lang">python</span>
  <pre><code>import torch
import json
import os

@singleton
class Config:
    def __init__(self):
        self.device = "cuda:0" if torch.cuda.is_available() else "cpu"
        # No AMD Windows sem CUDA, usa "cpu" automaticamente</code></pre>
</div>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Iniciar:</strong></p>
<div class="code" style="margin-bottom:1.25rem">
  <span class="code-lang">powershell</span>
  <pre><code># PowerShell LIMPO, sem nenhum 'set' antes
python app.py
# * Running on local URL: http://127.0.0.1:6969  ✅</code></pre>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">FASE 5 — ARQUIVOS MUTE FALTANDO</h3>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">Na instalação via git, os arquivos de silêncio não são criados. Aparecem um por um durante o treino:</p>
<div class="code" style="margin-bottom:1.25rem">
  <pre><code>FileNotFoundError: logs\\mute\\sliced_audios\\mute40000.wav
FileNotFoundError: logs\\mute\\extracted\\mute.npy          ← shape errado causa crash
FileNotFoundError: logs\\mute\\f0\\mute.wav.npy
FileNotFoundError: logs\\mute\\f0_voiced\\mute.wav.npy
RuntimeError: tensor (100) must match size (768)</code></pre>
</div>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Solução — criar todos de uma vez:</strong></p>
<div class="code" style="margin-bottom:1.25rem">
  <span class="code-lang">powershell</span>
  <pre><code>python -c "
import numpy as np, soundfile as sf, os
[os.makedirs(d, exist_ok=True) for d in [
    'logs/mute/sliced_audios','logs/mute/extracted',
    'logs/mute/f0','logs/mute/f0_voiced'
]]
sf.write('logs/mute/sliced_audios/mute40000.wav', np.zeros(int(40000*3.7)), 40000)
sf.write('logs/mute/sliced_audios/mute48000.wav', np.zeros(int(48000*3.7)), 48000)
sf.write('logs/mute/sliced_audios/mute32000.wav', np.zeros(int(32000*3.7)), 32000)
np.save('logs/mute/extracted/mute.npy', np.zeros((196, 768)))
np.save('logs/mute/f0/mute.wav.npy', np.zeros(100))
np.save('logs/mute/f0_voiced/mute.wav.npy', np.zeros(100))
print('OK')
"</code></pre>
</div>
<div class="err" style="margin-bottom:1.25rem">
  <div class="err-t">⚠️ Crítico: mute.npy precisa ter shape (196, 768)</div>
  <p>dimensão 768 do embedder contentvec. Qualquer outro shape causa crash.</p>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">FASE 6 — DATASET E TREINO</h3>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Dataset usado:</strong></p>
<div class="tbl" style="margin-bottom:1.5rem">
  <table>
    <thead>
      <tr>
        <th>Parâmetro</th>
        <th>Valor</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Arquivo</td>
        <td>YURI-TTS.wav</td>
      </tr>
      <tr>
        <td>Duração</td>
        <td>9 minutos</td>
      </tr>
      <tr>
        <td>Fonte</td>
        <td>ElevenLabs TTS</td>
      </tr>
      <tr>
        <td>Nota</td>
        <td>Mínimo aceitável. Ideal: 15-25 min</td>
      </tr>
    </tbody>
  </table>
</div>

<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Configurações do Applio:</strong></p>
<div class="tbl" style="margin-bottom:1.5rem">
  <table>
    <thead>
      <tr>
        <th>Parâmetro</th>
        <th>Valor</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Taxa de amostragem</td>
        <td>40000 Hz</td>
      </tr>
      <tr>
        <td>Vocoder</td>
        <td>HiFi-GAN</td>
      </tr>
      <tr>
        <td>Algoritmo de pitch</td>
        <td>RMVPE</td>
      </tr>
      <tr>
        <td>Embedder</td>
        <td>contentvec</td>
      </tr>
      <tr>
        <td>Tamanho do lote</td>
        <td>4</td>
      </tr>
      <tr>
        <td>Total de épocas</td>
        <td>200</td>
      </tr>
      <tr>
        <td>Número da GPU</td>
        <td><strong>vazio</strong> (não colocar 0, -1 ou cpu)</td>
      </tr>
    </tbody>
  </table>
</div>

<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Métricas reais:</strong></p>
<div class="tbl" style="margin-bottom:1.5rem">
  <table>
    <thead>
      <tr>
        <th>Época</th>
        <th>Loss</th>
        <th>Tempo por época</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>27.181</td>
        <td>7:21</td>
      </tr>
      <tr>
        <td>8</td>
        <td>17.93</td>
        <td>7:02</td>
      </tr>
      <tr>
        <td>20</td>
        <td>16.212</td>
        <td>7:43</td>
      </tr>
      <tr>
        <td>43</td>
        <td>15.785</td>
        <td>5:43</td>
      </tr>
    </tbody>
  </table>
</div>
<ul style="list-style-type:disc;padding-left:1.5rem;margin-bottom:1.25rem;color:#94a3b8;line-height:1.8">
  <li>Velocidade: ~6 minutos por época</li>
  <li>Total: ~20 horas para 200 épocas</li>
  <li>Hardware efetivo: CPU Xeon 24 núcleos</li>
</ul>
<blockquote style="font-size:.82rem;color:#94a3b8;font-style:italic;line-height:1.7;border-left:3px solid var(--r);padding-left:.9rem;margin-bottom:1.25rem">
  <strong>ℹ️ Buffer do PowerShell:</strong> de treino overnight o terminal pode parecer travado. O treino continua normalmente — verificar o contador no Applio.
</blockquote>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">LIÇÕES APRENDIDAS</h3>
<p style="font-size:.88rem;color:#10b981;font-weight:700;margin-top:1rem;margin-bottom:0.5rem">✅ O que funciona:</p>
<ol style="font-size:.88rem;color:#94a3b8;line-height:2;padding-left:1.2rem;margin-bottom:1.25rem">
  <li>Applio + CPU puro no AMD Windows — estável e funcional</li>
  <li>Python 3.11 obrigatório (não 3.10)</li>
  <li><code>requirements.txt</code> editado — remover <code>+cu128</code></li>
  <li>PowerShell limpo — sem variáveis <code>CUDA_VISIBLE_DEVICES</code></li>
  <li>Arquivos mute criados manualmente antes do treino</li>
  <li>Campo "Número da GPU" <strong>vazio</strong> no Applio</li>
</ol>
<p style="font-size:.88rem;color:#ef4444;font-weight:700;margin-top:1rem;margin-bottom:0.5rem">❌ O que não funciona:</p>
<ol style="font-size:.88rem;color:#94a3b8;line-height:2;padding-left:1.2rem;margin-bottom:1.25rem">
  <li>DirectML + torch 2.7.1 — incompatível em 2026</li>
  <li><code>set CUDA_VISIBLE_DEVICES=-1</code> — quebra a extração de features</li>
  <li><code>pip install -r requirements.txt</code> sem editar — instala CUDA e falha</li>
  <li>Dataset grande (horas de áudio) — estouro de RAM/VRAM</li>
</ol>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">PIPELINE FINAL DE PRODUÇÃO</h3>
<div class="code" style="margin-bottom:1.25rem">
  <pre><code>1. Escrever roteiro
   ↓
2. Balabolka + Antônio Neural → WAV com interpretação humana
   ↓
3. Applio — Inferência
   Modelo: my-project_200e.pth
   Índice: my-project.index
   ↓
4. Output: WAV com voz do Yuri
   ↓
5. Edição e publicação no YouTube</code></pre>
</div>
<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:0.75rem"><strong>Velocidade de inferência (pós-treino):</strong></p>
<ul style="list-style-type:disc;padding-left:1.5rem;margin-bottom:1.25rem;color:#94a3b8;line-height:1.8">
  <li>~5-30 segundos por minuto de áudio</li>
  <li>2 horas de áudio → ~30 minutos de processamento</li>
  <li>Modo Lote disponível no Applio</li>
</ul>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">CHECKLIST — REPRODUZINDO DO ZERO</h3>
<ul style="list-style-type:none;padding-left:0;margin-bottom:1.25rem;color:#94a3b8;line-height:1.8">
  <li><span style="color:#475569">[ ]</span> Python 3.11 instalado</li>
  <li><span style="color:#475569">[ ]</span> Git instalado</li>
  <li><span style="color:#475569">[ ]</span> FFmpeg no PATH</li>
  <li><span style="color:#475569">[ ]</span> Dataset WAV limpo (mínimo 5 min, ideal 15-25 min)</li>
  <li><span style="color:#475569">[ ]</span> <code>requirements.txt</code> editado (remover <code>+cu128</code>)</li>
  <li><span style="color:#475569">[ ]</span> <code>config.py</code> sem referências ao <code>torch_directml</code></li>
  <li><span style="color:#475569">[ ]</span> Arquivos mute criados</li>
  <li><span style="color:#475569">[ ]</span> PowerShell limpo (sem <code>set CUDA_VISIBLE_DEVICES</code>)</li>
  <li><span style="color:#475569">[ ]</span> Campo "Número da GPU" <strong>vazio</strong> no Applio</li>
  <li><span style="color:#475569">[ ]</span> Após extração: verificar que <code>logs/projeto/extracted/</code> tem arquivos <code>.npy</code></li>
</ul>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-top:1.5rem;margin-bottom:.9rem">AMD vs NVIDIA EM IA — POSIÇÃO DO APPLIO/RVC (2026)</h3>
<div class="tbl" style="margin-bottom:1.5rem">
  <table>
    <thead>
      <tr>
        <th>Plataforma</th>
        <th>Situação</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>NVIDIA CUDA</td>
        <td>✅ Excelente — suporte nativo</td>
      </tr>
      <tr>
        <td>AMD ROCm Linux</td>
        <td>⚠️ Razoável — funciona com esforço</td>
      </tr>
      <tr>
        <td>AMD Windows DirectML</td>
        <td>❌ Abandonado</td>
      </tr>
      <tr>
        <td>AMD Windows CPU</td>
        <td>✅ Funcional — lento mas estável</td>
      </tr>
    </tbody>
  </table>
</div>
<p style="font-size:.85rem;color:#94a3b8;font-style:italic;line-height:1.8"><em>*Hardware legado não morre — só precisa do backend certo.</em></p>`
    },
    "audio_whisper": {
      "title": "32. WHISPER.CPP LOCAL — TRANSCRIÇÃO DE ÁUDIO EM AMD RX 580",
      "desc": "Transcrição de áudio/vídeo acelerada por GPU AMD via Vulkan no Windows (modelo large-v3-turbo).",
      "html": `<div class="whisper-doc">
<style>
.whisper-doc {
  --color-border-secondary: rgba(255, 255, 255, 0.05);
  --color-border-tertiary: rgba(255, 255, 255, 0.08);
  --color-background-secondary: #0c0d10;
  --color-background-primary: #07080a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #94a3b8;
  font-family: inherit;
}
.whisper-doc * { box-sizing: border-box; }
.whisper-doc .badge { display: inline-block; font-size: 11px; font-weight: 500; padding: 2px 8px; border-radius: 4px; letter-spacing: 0.04em; text-transform: uppercase; }
.whisper-doc .badge-gpu { background: rgba(225, 29, 72, 0.1); border: 1px solid rgba(225, 29, 72, 0.3); color: #fda4af; }
.whisper-doc .badge-win { background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); color: #a7f3d0; }
.whisper-doc .badge-ok { background: rgba(14, 165, 233, 0.1); border: 1px solid rgba(14, 165, 233, 0.3); color: #bae6fd; }
.whisper-doc .badge-warn { background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); color: #fef08a; }
.whisper-doc .hero { border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 6px; padding: 1.5rem; margin-bottom: 2rem; background: #0c0d10; }
.whisper-doc .hero-title { font-size: 26px; font-weight: 700; color: var(--color-text-primary); line-height: 1.2; margin-bottom: 0.5rem; font-family: 'Syne', var(--font-sans); text-transform: uppercase; }
.whisper-doc .hero-title span { color: #E11D48; }
.whisper-doc .hero-sub { font-size: 13px; color: var(--color-text-secondary); margin-bottom: 1.25rem; line-height: 1.6; font-family: var(--font-sans); }
.whisper-doc .hero-badges { display: flex; flex-wrap: wrap; gap: 6px; }
.whisper-doc .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 2rem; }
.whisper-doc .stat { background: #0c0d10; border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 6px; padding: 0.875rem 1rem; }
.whisper-doc .stat-label { font-size: 11px; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; font-family: var(--font-sans); }
.whisper-doc .stat-value { font-size: 20px; font-weight: 700; color: var(--color-text-primary); font-family: var(--font-mono); }
.whisper-doc .stat-sub { font-size: 11px; color: var(--color-text-secondary); margin-top: 2px; font-family: var(--font-sans); }
.whisper-doc .section { margin-bottom: 2.5rem; }
.whisper-doc .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #E11D48; margin-top: 2rem; margin-bottom: 1rem; font-family: var(--font-sans); padding-bottom: 6px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
.whisper-doc .step { border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 6px; margin-bottom: 10px; overflow: hidden; background: #050506; }
.whisper-doc .step-header { display: flex; align-items: center; gap: 10px; padding: 0.75rem 1rem; background: #0c0d10; border-bottom: 1px solid rgba(255, 255, 255, 0.03); }
.whisper-doc .step-num { width: 24px; height: 24px; border-radius: 50%; background: #E11D48; color: #fff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: var(--font-mono); }
.whisper-doc .step-name { font-size: 13px; font-weight: 700; color: var(--color-text-primary); font-family: var(--font-sans); }
.whisper-doc .step-desc { font-size: 11px; color: var(--color-text-secondary); font-family: var(--font-sans); margin-left: auto; }
.whisper-doc .step-body { padding: 0.875rem 1rem; }
.whisper-doc .cmd { background: #050506; border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 4px; padding: 0.625rem 0.875rem; font-size: 12px; color: #fff; font-family: var(--font-mono); margin-bottom: 6px; overflow-x: auto; white-space: nowrap; border-left: 3px solid #E11D48; }
.whisper-doc .note { font-size: 12px; color: var(--color-text-secondary); font-family: var(--font-sans); line-height: 1.6; margin-top: 4px; padding-left: 8px; border-left: 2px solid #E11D48; }
.whisper-doc .flag-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.whisper-doc .flag-table th { text-align: left; padding: 8px 10px; font-weight: 700; color: var(--color-text-primary); font-family: var(--font-sans); font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background: #111215; }
.whisper-doc .flag-table td { padding: 8px 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.03); font-family: var(--font-mono); }
.whisper-doc .flag-table td:first-child { color: #fda4af; }
.whisper-doc .flag-table td:last-child { font-family: var(--font-sans); color: var(--color-text-secondary); }
.whisper-doc .flag-table tr:last-child td { border-bottom: none; }
.whisper-doc .perf-bar-wrap { margin: 0.5rem 0 1rem; background: #0c0d10; border: 1px solid rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 6px; }
.whisper-doc .perf-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.whisper-doc .perf-row:last-child { margin-bottom: 0; }
.whisper-doc .perf-label { font-size: 12px; color: var(--color-text-secondary); width: 120px; flex-shrink: 0; font-family: var(--font-sans); text-align: right; }
.whisper-doc .perf-bar-bg { flex: 1; height: 8px; background: rgba(255, 255, 255, 0.03); border-radius: 4px; overflow: hidden; }
.whisper-doc .perf-bar { height: 100%; border-radius: 4px; }
.whisper-doc .perf-time { font-size: 12px; font-family: var(--font-mono); color: var(--color-text-primary); width: 70px; flex-shrink: 0; margin-left: 8px; }
.whisper-doc .lesson { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.03); align-items: flex-start; }
.whisper-doc .lesson:last-child { border-bottom: none; }
.whisper-doc .lesson-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
.whisper-doc .lesson-text { font-size: 12.5px; color: var(--color-text-secondary); font-family: var(--font-sans); line-height: 1.6; }
.whisper-doc .lesson-text strong { font-weight: 700; color: var(--color-text-primary); }
.whisper-doc .footer { text-align: center; font-size: 11px; color: #475569; font-family: var(--font-mono); padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 2rem; }
.whisper-doc .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 600px) { .whisper-doc .two-col { grid-template-columns: 1fr; } }
.whisper-doc .env-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.03); font-size: 12px; }
.whisper-doc .env-row:last-child { border-bottom: none; }
.whisper-doc .env-key { color: var(--color-text-secondary); font-family: var(--font-sans); }
.whisper-doc .env-val { font-family: var(--font-mono); color: var(--color-text-primary); text-align: right; }
.whisper-doc .card-inner { background: #0c0d10; border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 6px; padding: 1rem 1.25rem; }
</style>

  <div class="hero">
    <div class="hero-title"><span>whisper.cpp</span> + RX 580 via Vulkan</div>
    <div class="hero-sub">Transcrição de áudio/vídeo com aceleração GPU AMD no Windows — usando Vulkan para rodar modelos Whisper direto na VRAM da RX 580. Uma GPU de 2017 botando pra trabalhar em 2026.</div>
    <div class="hero-badges">
      <span class="badge badge-gpu">AMD RX 580 8GB</span>
      <span class="badge badge-win">Windows + PowerShell</span>
      <span class="badge badge-ok">Vulkan Backend</span>
      <span class="badge badge-ok">large-v3-turbo</span>
      <span class="badge badge-warn">FFmpeg pré-req</span>
    </div>
  </div>

  <div class="stat-grid">
    <div class="stat">
      <div class="stat-label">tempo total</div>
      <div class="stat-value">~5 min</div>
      <div class="stat-sub">para 15 min de vídeo</div>
    </div>
    <div class="stat">
      <div class="stat-label">VRAM usada</div>
      <div class="stat-value">2.6 GB</div>
      <div class="stat-sub">de 8 GB disponíveis</div>
    </div>
    <div class="stat">
      <div class="stat-label">speedup vs CPU</div>
      <div class="stat-value">~150×</div>
      <div class="stat-sub">antes: 12h para 40min</div>
    </div>
    <div class="stat">
      <div class="stat-label">modelo</div>
      <div class="stat-value">1.6 GB</div>
      <div class="stat-sub">large-v3-turbo</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">pré-requisitos verificados</div>
    <div class="card-inner">
      <div class="env-row"><span class="env-key">Vulkan SDK</span><span class="env-val">glslc v2026.1</span></div>
      <div class="env-row"><span class="env-key">Git</span><span class="env-val">2.54.0.windows.1</span></div>
      <div class="env-row"><span class="env-key">CMake</span><span class="env-val">4.3.2</span></div>
      <div class="env-row"><span class="env-key">MSVC (Build Tools)</span><span class="env-val">14.52.36328 — VS 2026</span></div>
      <div class="env-row"><span class="env-key">GPU detectada</span><span class="env-val">AMD Radeon RX 580 2048SP</span></div>
      <div class="env-row"><span class="env-key">FFmpeg</span><span class="env-val">2026-04-19 (Gyan full build)</span></div>
    </div>
    <p class="note" style="margin-top: 8px;">Verificar RX 580 no Vulkan: <span style="font-family:var(--font-mono); color:#fda4af;">vulkaninfo --summary</span> → deve aparecer AMD Radeon RX 580 2048SP</p>
  </div>

  <div class="section">
    <div class="section-title">compilação — passo a passo</div>

    <div class="step">
      <div class="step-header">
        <div class="step-num">1</div>
        <div class="step-name">ativar ambiente MSVC x64</div>
        <div class="step-desc">a cada nova sessão</div>
      </div>
      <div class="step-body">
        <div class="cmd">& "C:\\Program Files (x86)\\Microsoft Visual Studio\\18\\BuildTools\\VC\\Auxiliary\\Build\\vcvars64.bat"</div>
        <p class="note">Precisa repetir toda vez que abrir um novo PowerShell antes de compilar. Saída esperada: "Environment initialized for: 'x64'"</p>
      </div>
    </div>

    <div class="step">
      <div class="step-header">
        <div class="step-num">2</div>
        <div class="step-name">clonar repositório</div>
        <div class="step-desc">~40 MB</div>
      </div>
      <div class="step-body">
        <div class="cmd">cd C:\\</div>
        <div class="cmd">git clone https://github.com/ggml-org/whisper.cpp</div>
        <div class="cmd">cd whisper.cpp</div>
      </div>
    </div>

    <div class="step">
      <div class="step-header">
        <div class="step-num">3</div>
        <div class="step-name">cmake com Vulkan habilitado</div>
        <div class="step-desc">flag crítica: -DGGML_VULKAN=ON</div>
      </div>
      <div class="step-body">
        <div class="cmd">cmake -B build -DGGML_VULKAN=ON -DGGML_HIPBLAS=OFF -DGGML_HIP=OFF -DGGML_CUDA=OFF</div>
        <div class="cmd">cmake --build build --config Release -j4</div>
        <p class="note">Dura ~5-10 min. Warnings de C4267/C4244 são normais — não afetam o funcionamento. Binários ficam em build\\bin\\Release\\</p>
      </div>
    </div>

    <div class="step">
      <div class="step-header">
        <div class="step-num">4</div>
        <div class="step-name">baixar modelo large-v3-turbo</div>
        <div class="step-desc">~1.6 GB</div>
      </div>
      <div class="step-body">
        <div class="cmd">Invoke-WebRequest -Uri "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo.bin" -OutFile "models\\ggml-large-v3-turbo.bin"</div>
        <p class="note">Outros modelos: large-v3 (~6GB VRAM, melhor qualidade), medium (~2.5GB), small (~1GB)</p>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">uso — fluxo completo mp4 → txt</div>

    <div class="step">
      <div class="step-header">
        <div class="step-num" style="background:#1D9E75;">1</div>
        <div class="step-name">extrair áudio com FFmpeg</div>
        <div class="step-desc">whisper não lê mp4 direto no Windows</div>
      </div>
      <div class="step-body">
        <div class="cmd">ffmpeg -i "E:\\videos\\video.mp4" -ar 16000 -ac 1 -c:a pcm_s16le "E:\\videos\\video.wav"</div>
        <p class="note">-ar 16000 = 16kHz (obrigatório para o Whisper) · -ac 1 = mono · -c:a pcm_s16le = WAV sem compressão</p>
      </div>
    </div>

    <div class="step">
      <div class="step-header">
        <div class="step-num" style="background:#1D9E75;">2</div>
        <div class="step-name">transcrever / traduzir</div>
        <div class="step-desc">GPU cuida do resto</div>
      </div>
      <div class="step-body">
        <div class="cmd">.\\build\\bin\\Release\\whisper-cli.exe -m models\\ggml-large-v3-turbo.bin -f "E:\\videos\\video.wav" -l pt --output-txt</div>
        <p style="font-size:12px; color:var(--color-text-secondary); margin: 6px 0 4px; font-family:var(--font-sans);">com tradução para inglês:</p>
        <div class="cmd">.\\build\\bin\\Release\\whisper-cli.exe -m models\\ggml-large-v3-turbo.bin -f "E:\\videos\\video.wav" -l pt --translate --output-txt</div>
        <p class="note">--translate sempre gera inglês (limitação do Whisper). Para outros idiomas de destino, usar etapa adicional de tradução.</p>
      </div>
    </div>

    <div style="margin-top: 1rem;">
      <div class="section-title" style="margin-bottom: 0.75rem;">flags úteis</div>
      <div class="card-inner">
        <table class="flag-table">
          <thead><tr><th>flag</th><th>descrição</th></tr></thead>
          <tbody>
            <tr><td>-l pt</td><td>idioma fonte: português</td></tr>
            <tr><td>-l en</td><td>idioma fonte: inglês</td></tr>
            <tr><td>--translate</td><td>traduz tudo para inglês</td></tr>
            <tr><td>--output-txt</td><td>salva .txt com transcrição</td></tr>
            <tr><td>--output-srt</td><td>salva legendas .srt com timestamps</td></tr>
            <tr><td>--output-vtt</td><td>salva legendas .vtt</td></tr>
            <tr><td>-t 8</td><td>usa 8 threads de CPU (padrão: 4)</td></tr>
            <tr><td>--device 0</td><td>seleciona GPU 0 (padrão)</td></tr>
            <tr><td>--no-gpu</td><td>força CPU (modo lento)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">performance — vídeo de 15 min</div>
    <div class="perf-bar-wrap">
      <div class="perf-row">
        <div class="perf-label">load modelo</div>
        <div class="perf-bar-bg"><div class="perf-bar" style="width:1.3%; background:#E11D48;"></div></div>
        <div class="perf-time">4 s</div>
      </div>
      <div class="perf-row">
        <div class="perf-label">mel (áudio)</div>
        <div class="perf-bar-bg"><div class="perf-bar" style="width:0.4%; background:#E11D48;"></div></div>
        <div class="perf-time">1.2 s</div>
      </div>
      <div class="perf-row">
        <div class="perf-label">encode GPU</div>
        <div class="perf-bar-bg"><div class="perf-bar" style="width:23.7%; background:#1D9E75;"></div></div>
        <div class="perf-time">73 s</div>
      </div>
      <div class="perf-row">
        <div class="perf-label">decode + batch</div>
        <div class="perf-bar-bg"><div class="perf-bar" style="width:54.7%; background:#1D9E75;"></div></div>
        <div class="perf-time">168 s</div>
      </div>
      <div class="perf-row">
        <div class="perf-label" style="font-weight:700; color:var(--color-text-primary);">total</div>
        <div class="perf-bar-bg"><div class="perf-bar" style="width:100%; background:#E11D48;"></div></div>
        <div class="perf-time" style="font-weight:700;">307 s</div>
      </div>
    </div>
    <p class="note">CPU em ~5% durante toda a transcrição. VRAM: 2.6 GB de 8 GB. A GPU fez o trabalho — CPU ficou de molho.</p>
  </div>

  <div class="section">
    <div class="section-title">lições aprendidas nas peripécias</div>
    <div class="card-inner">
      <div class="lesson">
        <div class="lesson-icon">⚠️</div>
        <div class="lesson-text"><strong>WSL2 não expõe a RX 580 via Vulkan</strong> — usar sempre PowerShell/Windows nativo para aproveitar a GPU.</div>
      </div>
      <div class="lesson">
        <div class="lesson-icon">⚠️</div>
        <div class="lesson-text"><strong>Whisper não lê MP4 no Windows</strong> — sempre extrair o áudio com FFmpeg antes. Usar -ar 16000 -ac 1 -c:a pcm_s16le.</div>
      </div>
      <div class="lesson">
        <div class="lesson-icon">ℹ️</div>
        <div class="lesson-text"><strong>--translate só gera inglês</strong> — é limitação do Whisper, não da configuração. Para PT como destino, precisa de etapa extra.</div>
      </div>
      <div class="lesson">
        <div class="lesson-icon">ℹ️</div>
        <div class="lesson-text"><strong>vcvars64.bat precisa ser reativado</strong> a cada nova sessão do PowerShell antes de qualquer compilação.</div>
      </div>
      <div class="lesson">
        <div class="lesson-icon">✅</div>
        <div class="lesson-text"><strong>8 GB de VRAM em 2026 ainda é sólido</strong> — large-v3-turbo usa apenas 2.6 GB. GPU "velha" com VRAM decente bate GPU nova com 4 GB fácil.</div>
      </div>
      <div class="lesson">
        <div class="lesson-icon">✅</div>
        <div class="lesson-text"><strong>Warnings C4267/C4244 durante compilação são normais</strong> — conversões de tipo esperadas no código do ggml, não impactam funcionamento.</div>
      </div>
    </div>
  </div>

  <div class="footer">
    RX 580 — velha de 580 anos, mas ainda na ativa 🚀 · Peripécias documentadas em junho/2026
  </div>

</div>`
    },
    "linux_nativo": {
      "title": "33. LINUX NATIVO — Ubuntu 26.04 LTS + RX 580 + Vulkan",
      "desc": "AIVisionsLab — Documentação da Stack Completa em Linux Real",
      "html": `<p style="font-size:.88rem;color:#94a3b8;line-height:1.9;margin-bottom:1.25rem">
  Documentação detalhada e homologada de execução direta em Linux nativo. Sem WSL2, sem emulação de contêiner ou Docker Passthrough: acesso bare-metal real através de drivers open-source <strong>Mesa RADV</strong> sobre o novíssimo <strong>Ubuntu 26.04 LTS (Resolute Raccoon)</strong> rodando o kernel Linux 7.0.
</p>

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.85rem;margin-bottom:1.25rem">
  <div class="stat"><div class="stat-icon">🐧</div><div><div class="stat-lbl">Plataforma Linux</div><div class="stat-val" style="font-size:.82rem">Ubuntu 26.04 LTS</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">Kernel 7.0 (Resolute)</div></div></div>
  <div class="stat"><div class="stat-icon">🎛️</div><div><div class="stat-lbl">Vulkan Driver</div><div class="stat-val" style="font-size:.82rem">Mesa RADV 26.0.3</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">Vulkan Core version 1.4.341</div></div></div>
  <div class="stat"><div class="stat-icon">💽</div><div><div class="stat-lbl">Particionamento</div><div class="stat-val" style="font-size:.82rem">Ext4 dedidada 97GB</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">HDD sdb6 Dual Boot</div></div></div>
  <div class="stat"><div class="stat-icon">📦</div><div><div class="stat-lbl">Docker Runtime</div><div class="stat-val" style="font-size:.82rem">Nativo Linux Engine</div><div style="font-size:.65rem;color:#475569;margin-top:.15rem">Pontes OpenWebUI a 100%</div></div></div>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;margin-top:1.5rem;margin-bottom:.5rem">Tabela Comparativa Bruta: Windows 10 vs Linux Nativo</h3>
<div class="tbl">
  <table>
    <thead>
      <tr>
        <th>Cenário / Carga de Trabalho</th>
        <th>Windows 10 (AMD oficial)</th>
        <th>Linux Ubuntu 26.04 (Mesa RADV)</th>
        <th>Vencedor Crucial</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>LLM (Qwen3 4B GGUF) @ 99 layers</strong></td>
        <td>~15-17 tokens/s</td>
        <td><strong>~35 tokens/s (RADV engine)</strong></td>
        <td>🏆 <strong>Linux (2x mais veloz)</strong></td>
      </tr>
      <tr>
        <td><strong>LLM Grande (Qwen3.6 35B) @ Max layers</strong></td>
        <td><strong>7.62 tokens/s (max 10 layers)</strong></td>
        <td>5.18 tokens/s (max 20 layers)</td>
        <td>⚖️ <strong>Empate Técnico</strong> (Linux permite 2x mais layers, Windows é mais rápido por layer)</td>
      </tr>
      <tr>
        <td><strong>Stable Diffusion (Dreamshaper8 - 50st)</strong></td>
        <td><strong>~72 segundos (1.44s/it)</strong></td>
        <td>~85 segundos (1.65s/it)</td>
        <td>🏆 <strong>Windows (estável por driver)</strong></td>
      </tr>
      <tr>
        <td><strong>Flux Schnell (4 steps, 512x512)</strong></td>
        <td>~84 segundos (OOM se 1024x1024)</td>
        <td><strong>~52 segundos sampling (Total: 95s)</strong></td>
        <td>🏆 <strong>Linux (melhor swap VRAM)</strong></td>
      </tr>
      <tr>
        <td><strong>whisper.cpp (large-v3-turbo, áudio 106s)</strong></td>
        <td>307 s (Uso de VRAM: 2.6 GB)</td>
        <td><strong>23.58 s (Uso de VRAM: 1.6 GB)</strong></td>
        <td>🏆 <strong>Linux (Absurdamente superior)</strong></td>
      </tr>
    </tbody>
  </table>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;margin-top:1.5rem;margin-bottom:.5rem">Instalação e Dual-Boot sem Sobrescrever Registros</h3>
<p style="font-size:.82rem;color:#94a3b8;line-height:1.75">
  1. No Windows, libere espaço usando o Gerenciador de Discos (Diminuir Volume).<br>
  2. Prepare o pendrive com a ISO desktop do <strong>Ubuntu 26.04 amd64</strong>.<br>
  3. No instalador do Ubuntu, selecione a opção "Instalar ao lado do Windows Boot Manager". O instalador criará a partição e configurará o menu GRUB para permitir a seleção de boot em cada reinicialização automaticamente.
</p>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;margin-top:1.5rem;margin-bottom:.5rem">Pós-Instalação: Validação Bare-Metal da GPU Polaris</h3>
<div class="code">
  <span class="code-lang">bash</span>
  <pre>lspci | grep -i vga
# AMD Radeon RX 580 2048SP detectada!

vulkaninfo --summary 2>/dev/null | grep -A5 "Devices"
# Deve exibir: GPU0: DRIVER_ID_MESA_RADV | driverInfo = Mesa 26.0.3 ✅</pre>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;margin-top:1.5rem;margin-bottom:.5rem">Pilha de Comandos de Execução Homologados no Ubuntu</h3>

<h4 style="color:#fff;font-size:.85rem;font-weight:600;margin-top:.85rem">1. Inicializando llama-server via Vulkan</h4>
<div class="code">
  <span class="code-lang">bash</span>
  <pre>~/llama.cpp/build/bin/llama-server \\
  -m "/run/media/aivisions-lab-studio/NVMe/models/qwen3/Qwen3-4B-Q4_K_M.gguf" \\
  --host 0.0.0.0 --port 8081 \\
  -ngl 99 -t 24</pre>
</div>

<h4 style="color:#fff;font-size:.85rem;font-weight:600;margin-top:.85rem">2. Geração de Imagens (Flux Schnell) — Segredos Contra Travamento do GNOME</h4>
<div class="code">
  <span class="code-lang">bash</span>
  <pre>~/stable-diffusion.cpp/build/bin/sd-server \\
  --listen-ip 0.0.0.0 --listen-port 7860 \\
  --diffusion-model /run/media/aivisions-lab-studio/NVMe/ia_storage/models/Stable-diffusion/flux1-schnell-q4_k.gguf \\
  --vae /run/media/aivisions-lab-studio/NVMe/ia_storage/models/Stable-diffusion/ae.safetensors \\
  --clip_l /run/media/aivisions-lab-studio/NVMe/ia_storage/models/Stable-diffusion/clip_l.safetensors \\
  --t5xxl /run/media/aivisions-lab-studio/NVMe/ia_storage/models/Stable-diffusion/t5xxl_fp16.safetensors \\
  --cfg-scale 1.0 --steps 4 --clip-on-cpu --vae-on-cpu --vae-tiling</pre>
</div>
<p style="font-size:.8rem;color:#64748b;line-height:1.6;margin-top:.35rem">
  💡 <strong>Flags Críticas:</strong> O parâmetro <code>--vae-tiling</code> é estritamente obrigatório. Sem ele, a decodificação do VAE estoura o limite de memória física e trava o ambiente gráfico GNOME. Evite usar <code>--backend vulkan0</code> para este modelo pesado no Linux, pois gera bugs de contexto perdidos.
</p>

<h4 style="color:#fff;font-size:.85rem;font-weight:600;margin-top:.85rem">3. Transcrição Rápida de Áudio via whisper.cpp</h4>
<div class="code">
  <span class="code-lang">bash</span>
  <pre>~/whisper.cpp/build/bin/whisper-cli \\
  -m ~/whisper.cpp/models/ggml-large-v3-turbo.bin \\
  -f "/caminho/para/audio.wav" \\
  -l pt --output-txt</pre>
</div>

<h3 style="color:#fff;font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;margin-top:1.5rem;margin-bottom:.5rem">Serviços e Contêineres Docker Rodando Paralelos</h3>
<div class="tbl">
  <table>
    <thead>
      <tr>
        <th>Contêiner ativo</th>
        <th>Imagem Base</th>
        <th>Porta Mapeada</th>
        <th>Finalidade</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>open-webui</strong></td>
        <td>ghcr.io/open-webui/open-webui:main</td>
        <td>3000 -> 8080</td>
        <td>Painel unificado de Chat com LLM e render SD</td>
      </tr>
      <tr>
        <td><strong>portainer</strong></td>
        <td>portainer/portainer-ce</td>
        <td>9000</td>
        <td>Gerenciamento visual de processos e pilhas Docker</td>
      </tr>
      <tr>
        <td><strong>searxng</strong></td>
        <td>searxng/searxng:latest</td>
        <td>8080</td>
        <td>Mecanismo de busca privado para as respostas ancoradas de IA</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="card bg-black/40 border border-white/5 p-4 rounded-md my-4">
  <h4 style="color:#fff;font-weight:700;font-size:0.9rem;margin-bottom:0.5rem">⚠️ Lições Autônomas Aprendidas em Linux</h4>
  <p style="font-size:0.8rem;color:#94a3b8;line-height:1.7">
    <strong>ROCm Abandonado:</strong> Placas GCN4 / Polaris como a RX 580 não têm mais suporte no SDK ROCm oficial. Tentar rodar Ollama oficial via GPU Docker nela falhará. A rota de ouro é rodar o <strong>Ollama na CPU Xeon</strong> ou usar o <strong>llama-server nativo compilado com Vulkan</strong>! Docker só deve ser empregado para frontends e servidores secundários livres.
  </p>
</div>`
    }
  }
};
