---
id: "amihart"
title: "27.A. MÉTODO AMIHART — INFERÊNCIA RX580 EM POLARIS/DEBIAN"
description: "Nota de Crédito: Seção documental em homenagem à prova de conceito realizada por 艾米心 (Amihart), pioneira na validação de Vulkan sob Debian GCN4/Polaris."
category: "guides"
lang: "pt-BR"
---

<p>Em janeiro de 2025, o desenvolvedor <strong>艾米心 (Amihart)</strong> publicou um estudo técnico demonstrando que, apesar das limitações oficiais impostas pela AMD (fim do suporte oficial do ROCm para arquiteturas Polaris/GCN4), o hardware RX 580 ainda possui pleno potencial de aceleração de IA.</p>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:.85rem;margin-bottom:1.25rem">
    <div class="card">
      <p>Abordagem AIVisionsLab (Windows Nativo)</p>
      <ul style="padding-left:1.2rem;font-size:0.8rem;color:#94a3b8;line-height:1.8">
        <li>Execução no sistema hospedeiro (Windows).</li>
        <li>Foco em produção diária de alta estabilidade.</li>
        <li>Tuning de orquestração Vulkan nativo.</li>
        <li>Segmentação VRAM/CPU híbrida no WSL.</li>
      </ul>
    </div>
    <div class="card">
      <p>O Método Amihart (Linux/Debian)</p>
      <ul style="padding-left:1.2rem;font-size:0.8rem;color:#94a3b8;line-height:1.8">
        <li>Execução em ecossistema Linux/Debian.</li>
        <li>Isolamento robusto via containers Docker.</li>
        <li>Compilação estrita com flags do Vulkan API.</li>
        <li>Sandbox ROCm adaptado virtualizado.</li>
      </ul>
    </div>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">A. Setup de LLM — Vulkan no Debian</h4>
  <p>O llama.cpp é compilado com Vulkan API puro para contornar a ausência do driver ROCm:</p>
  <div class="code" style="margin-bottom:1.25rem"><pre style="background:#07080a;border:1px solid var(--b);padding:1rem;border-radius:4px;margin:0"><code># Passo 1: Instalar drivers Vulkan e pré-requisitos de compilação
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

  <p><strong>Métrica de Desempenho (Amihart):</strong> No Celeron G6900 operando sem GPU, a resposta é de 5,45 tokens/s. Utilizando aceleração Vulkan pura na RX 580 com 100 camadas offload, a performance sobe para <strong>24,56 tokens/s</strong>, tornando o modelo viável e ágil.</p>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:1.5rem 0 .75rem 0;text-transform:uppercase">B. Setup de Stable Diffusion — Sandbox Docker</h4>
  <p>Como geradores de imagem exigem dependências ROCm, Amihart utiliza containers virtuais isolados para rodar a WebUI de forma limpa no Debian:</p>
  <div class="code" style="margin-bottom:1.25rem"><pre style="background:#07080a;border:1px solid var(--b);padding:1rem;border-radius:4px;margin:0"><code># Passo 1: Instalação do motor Docker e chaves estritas
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

sudo docker run -it \
  --network=host --device=/dev/kfd --device=/dev/dri \
  --ipc=host --shm-size 16G --group-add video \
  --cap-add=SYS_PTRACE \
  --rm -v $(pwd)/cache:/root/.cache \
  -v $(pwd)/data:/stable-diffusion-webui/data \
  woodrex/sd-webui-for-gfx803:latest</code></pre></div>

  <p><strong>Otimização Crítica do Cache Amihart:</strong> Para evitar re-loadings de dependências todas as vezes que o container iniciar:</p>
  <div class="code" style="margin-bottom:1.5rem"><pre style="background:#07080a;border:1px solid var(--b);padding:1rem;border-radius:4px;margin:0"><code># Obter o CONTAINER ID ativo
sudo docker ps -l
# Cometer o estado para uma nova imagem persistente
sudo docker commit [CONTAINER_ID]
# Ver o ID da imagem persistida e substituir a chamada de docker run por ele
sudo docker images</code></pre></div>

  <div class="card">
    <strong>Crédito de Imortalização:</strong> Métricas e roteamento técnico baseados na publicação original de <a href="https://amihart.medium.com/inference-with-an-rx580-13e9c1055472" target="_blank" rel="noopener noreferrer" style="color:var(--r);text-decoration:underline;font-weight:bold">艾米心 (Amihart)</a> (Medium, Janeiro de 2025). O conhecimento é aberto e deve ser documentado.
  </div>
