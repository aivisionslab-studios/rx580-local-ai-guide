---
id: "amihart"
title: "27.A. AMIHART METHOD — Inference on Debian"
description: "Technical Peer Credit: Section preserving the proof of concept authored by 艾米心 (Amihart), confirming Vulkan capabilities on Debian GCN4/Polaris systems."
category: "guides"
lang: "en"
---

<p>In January 2025, developer <strong>艾米心 (Amihart)</strong> published a key peer study proving that while official AMD support has dropped Polaris/GCN4 in newer ROCm versions, Vulkan operates brilliantly as an alternative for local AI.</p>
  
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:.85rem;margin-bottom:1.25rem">
    <div class="card">
      <p>AIVisionsLab (Windows Native)</p>
      <ul style="padding-left:1.2rem;font-size:0.8rem;color:#94a3b8;line-height:1.8">
        <li>Executes on the Windows host machine.</li>
        <li>Optimized for stable, daily production.</li>
        <li>Vulkan direct configuration.</li>
        <li>WSL VRAM/CPU memory segmentation.</li>
      </ul>
    </div>
    <div class="card">
      <p>The Amihart Method (Linux/Debian)</p>
      <ul style="padding-left:1.2rem;font-size:0.8rem;color:#94a3b8;line-height:1.8">
        <li>Executes inside Debian Linux setups.</li>
        <li>Isolated containerization via Docker.</li>
        <li>Strict compilation using Vulkan CLI flags.</li>
        <li>Virtual sandbox layers emulation.</li>
      </ul>
    </div>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">A. LLM Setup — Vulkan on Debian</h4>
  <p>Compilation of llama.cpp happens using pure Vulkan API headers to bypass ROCm limitations entirely:</p>
  <div class="code" style="margin-bottom:1.25rem"><pre style="background:#07080a;border:1px solid var(--b);padding:1rem;border-radius:4px;margin:0"><code># Step 1: Install Vulkan drivers and compilation dependencies
sudo apt install vulkan-tools libtcmalloc-minimal4 libcurl4-openssl-dev glslc cmake make git pkg-config libvulkan-dev

# Step 2: Clone and compile llama.cpp with Vulkan enabled
cd ~
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp && mkdir build && cd build
cmake .. -DGGML_VULKAN=on -DCMAKE_BUILD_TYPE=Release -DLLAMA_CURL=ON

# Step 3: Add binaries to execution PATH
echo 'export PATH=$PATH:'$(realpath bin) >> ~/.bashrc
source ~/.bashrc

# Step 4: Run DeepSeek R1 8B (Using accelerated Vulkan0)
llama-cli -m deepseek-r1:8B --device Vulkan0 -ngl 100</code></pre></div>

  <p><strong>Performance Metric (Amihart):</strong> Running DeepSeek R1 8B, CPU-only execution delivers ~5.45 tokens/s. Offloading 100 layers onto the RX 580 using Vulkan increases performance to <strong>24,56 tokens/s</strong>, elevating the model to a fast, smooth user experience.</p>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:1.5rem 0 .75rem 0;text-transform:uppercase">B. Stable Diffusion Setup — Docker Sandbox</h4>
  <p>Since SD architectures rely heavily on ROCm, Amihart leverages precompiled Docker layers to isolate and launch automatic1111 on Debian:</p>
  <div class="code" style="margin-bottom:1.25rem"><pre style="background:#07080a;border:1px solid var(--b);padding:1rem;border-radius:4px;margin:0"><code># Step 1: Install Docker engine and repository keys
sudo apt update && sudo apt install -y ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io

# Step 2: Clone SD and launch under woodrex Rocm container
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

  <p><strong>Critical Container Image Caching:</strong> Save the current state of libraries so Docker launches instantly on next runs without downloading layers:</p>
  <div class="code" style="margin-bottom:1.5rem"><pre style="background:#07080a;border:1px solid var(--b);padding:1rem;border-radius:4px;margin:0"><code># Find your live container ID
sudo docker ps -l
# Commit the state to a custom local image
sudo docker commit [CONTAINER_ID]
# Inspect images and use the new ID in future run calls
sudo docker images</code></pre></div>

  <div class="card">
    <strong>Technical Credit:</strong> Metrics and routing procedures are based on the peer research of <a href="https://amihart.medium.com/inference-with-an-rx580-13e9c1055472" target="_blank" rel="noopener noreferrer" style="color:var(--r);text-decoration:underline;font-weight:bold">艾米心 (Amihart)</a> (Medium, January 2025). Open source knowledge deserves to be eternal.
  </div>
