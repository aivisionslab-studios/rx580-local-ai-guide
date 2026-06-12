<div align="center">

```
██████╗ ██╗  ██╗    ███████╗ █████╗  ██████╗
██╔══██╗╚██╗██╔╝    ██╔════╝██╔══██╗██╔═████╗
██████╔╝ ╚███╔╝     ███████╗╚█████╔╝██║██╔██║
██╔══██╗ ██╔██╗     ╚════██║██╔══██╗████╔╝██║
██║  ██║██╔╝ ██╗    ███████║╚█████╔╝╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝    ╚══════╝ ╚════╝  ╚═════╝
AIVisionsLab · Polaris Revival Project · 2026
```

**GPU from 2017. SOTA AI in 2026. No CUDA. No cloud. No excuses.**

[![Docs](https://img.shields.io/badge/Docs-setup--ia--local--rx580--vulkan.web.app-blueviolet?style=flat-square&logo=googlechrome)](https://setup-ia-local-rx580-vulkan.web.app/)
[![Vercel](https://img.shields.io/badge/Mirror-rx580--ai--local.vercel.app-black?style=flat-square&logo=vercel)](https://rx580-ai-local.vercel.app/)
[![GPU](https://img.shields.io/badge/GPU-RX_580_2048SP_8GB-ED1C24?style=flat-square&logo=amd)](https://github.com/aivisionslab-studios/rx580-local-ai-guide)
[![Backend](https://img.shields.io/badge/Backend-Vulkan_1.4.341.1-AC162C?style=flat-square)](https://github.com/aivisionslab-studios/rx580-local-ai-guide)
[![LLM](https://img.shields.io/badge/LLM-17_tok%2Fs_Vulkan-orange?style=flat-square)](https://github.com/aivisionslab-studios/rx580-local-ai-guide)
[![SD](https://img.shields.io/badge/SD_1.5-72s%2Fimage-blue?style=flat-square)](https://github.com/aivisionslab-studios/rx580-local-ai-guide)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-@aivisionslab--hub-red?style=flat-square&logo=youtube)](https://youtube.com/@aivisionslab-hub)

</div>

---

## The narrative

> *"Your RX 580 can't run AI. Buy a new GPU."*

AMD dropped ROCm for Polaris in v5.x.
DirectML crashes with `OpaqueTensorImpl`.
OpenVINO fails silently on Forge.

We compiled from source. We used Vulkan. We documented everything.

```
RX 580 8GB  ──►  Vulkan API  ──►  ggml engine  ──►  17 tok/s LLM  +  72s/image SD
Xeon 2014   ──►  WSL2 CPU    ──►  ComfyUI       ──►  FLUX 16GB  +  AnimateDiff
```

---

## Benchmarks (real logs, not synthetic)

| Workload | Model | Backend | Result |
|----------|-------|---------|--------|
| LLM inference | Mistral 7B Q4 | RX 580 Vulkan | **17 tok/s** |
| LLM baseline | Mistral 7B Q4 | Xeon CPU only | 3–5 tok/s |
| Image gen | DreamShaper 8 | RX 580 Vulkan | **~72s / 512×512** |
| FLUX hybrid | flux1-schnell-q4k | GPU+CPU | **~14 min @ 1024×1024** |
| FLUX full | fp8 16GB | Xeon WSL2 | ~24 min |
| Video | AnimateDiff | Xeon WSL2 | ~141s/frame |
| Voice clone | Applio RVC | Xeon CPU | ~30 min / 2h audio |

> Storage impact: NVMe reduced FLUX 16GB load from **25 min → 30 seconds**.
> The bottleneck was never the GPU.

---

## Stack

```
OpenWebUI  :3000  (Docker)
    │
    ├──► llama-server  :8081  ──►  RX 580 Vulkan  (llama.cpp)
    │         └── Ollama      :11434  ──►  CPU fallback
    │
    └──► sd-server     :7860  ──►  RX 580 Vulkan  (stable-diffusion.cpp)
              └── ComfyUI    :8188  ──►  Xeon CPU WSL2
```

---

## Critical: two GGUF formats for FLUX

| Source | Compatible with |
|--------|----------------|
| **city96** (HuggingFace) | ComfyUI + ComfyUI-GGUF node only |
| **leejet** (HuggingFace) | **stable-diffusion.cpp** ✅ |

Using city96 GGUF on sd-server returns `new_sd_ctx_t failed`.
Always download from: `huggingface.co/leejet/FLUX.1-schnell-gguf`

---

## Repository

```
rx580-local-ai-guide/
├── scripts/
│   ├── start-ai.bat              # Full stack — all services
│   ├── iniciar_sd_server.bat     # SD 1.5 only
│   ├── iniciar_flux_server.bat   # FLUX hybrid GPU/CPU
│   ├── reboot_stack.bat          # Kill all + restart
│   ├── vulkan-diagnostic.bat     # ← Vulkan check (Windows)
│   ├── vulkan-diagnostic.sh      # ← Vulkan check (Linux/WSL2)
│   ├── build-llamacpp.sh         # Compile llama.cpp (WSL2)
│   └── build-sdcpp.sh            # Compile stable-diffusion.cpp
│
└── docs/
    ├── benchmarks.md             # Real hardware logs
    ├── what-failed.md            # DirectML, ROCm, OpenVINO autopsy
    ├── flux-setup.md             # FLUX hybrid memory architecture
    ├── firewall-fix.md           # Docker + Windows Firewall
    └── wsl2-setup.md             # ComfyUI CPU on WSL2
```

---

## 🛡️ Vulkan Environment Diagnostics

Disponibilizamos scripts automatizados na pasta raiz do projeto para que os usuários possam testar instantaneamente se suas placas RX 580 / Polaris estão com suporte Vulkan ativado pelo driver nativo.

```bash
# Linux / WSL2
./vulkan-diagnostic.sh
```

```cmd
:: Windows CMD
vulkan-diagnostic.bat
```

Expected output:
```
ggml_vulkan: Found 1 Vulkan device(s)
ggml_vulkan: 0 = AMD Radeon RX 580 2048SP | VRAM: 8192MB  ✅
```

If your card doesn't appear — driver or Vulkan SDK issue. See Master Documentation.

---

## Quick start

```powershell
# 1. Compile llama.cpp (Developer PowerShell)
cd E:\
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
cmake -B build -DGGML_VULKAN=ON -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release -j20

# 2. Validate GPU detection
cd build\bin\Release
.\llama-cli.exe --list-devices
# Expected: Vulkan0: AMD Radeon RX 580 2048SP ✅

# 3. Start LLM server
llama-server.exe -m "E:\models\Mistral-7B-Q4_K_M.gguf" ^
  --host 0.0.0.0 --port 8081 --device Vulkan0

# 4. Compile stable-diffusion.cpp
git clone --recursive https://github.com/leejet/stable-diffusion.cpp
cd stable-diffusion.cpp && mkdir build && cd build
cmake .. -DGGML_VULKAN=ON -DCMAKE_BUILD_TYPE=Release
cmake --build . --config Release -j20
```

---

## What failed (and why it's documented)

| Attempt | Error | Root cause |
|---------|-------|------------|
| DirectML | `OpaqueTensorImpl` | MS tensors incompatible with ComfyUI backends |
| ROCm | Kernel panics | GCN4/Polaris dropped in v5.x — permanent |
| OpenVINO + Forge | `No module 'ldm'` | Extension targets old A1111 — incompatible |
| CPU + HDD | ~19 min/image | No GPU + mechanical I/O bottleneck |

---

## Community timeline

| Date | Author | Contribution |
|------|--------|-------------|
| Jan 2025 | [艾米心 Amihart](https://medium.com/@amihart) | First LLM via Vulkan RX 580 — 24.56 tok/s on Debian |
| Dec 2025 | [DH / DadHacks](https://dadhacks.org/2025/12/05/ai-image-generation-on-rx-580-using-vulkan-a-cost-effective-solution/) | First SD via Vulkan RX 580 — sd.cpp breakthrough |
| 2026 | AIVisionsLab | Full Windows stack + voice (Applio RVC) + Linux + OpenWebUI |

Three independent researchers. Same GPU. Same conclusion.

---

## Hardware

| Component | Spec |
|-----------|------|
| GPU | AMD RX 580 **2048SP** 8GB GDDR5 (Polaris / GCN4) |
| CPU | Intel Xeon **E5-2690 v3** — 12c/24t · 3.5GHz (2014) |
| RAM | **32GB DDR4 REG ECC** Quad Channel |
| Storage | **NVMe 1TB** — 1.7–3.5 GB/s |
| OS | Windows 10 Pro + WSL2 Ubuntu 22.04.5 |
| Vulkan SDK | 1.4.341.1 |

---

## Full documentation

📖 Master docs (PT/EN/ES/FR/AR) — architecture, benchmarks, failure analysis, automation:
**[setup-ia-local-rx580-vulkan.web.app](https://setup-ia-local-rx580-vulkan.web.app/)**

---

<div align="center">
  <sub>Built in São Paulo 🇧🇷 · Hardware from 2014–2017 · Running SOTA AI in 2026</sub><br><br>
  <sub><em>"The problem was never the GPU."</em></sub>
</div>
