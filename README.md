```
██████╗ ██╗  ██╗    ███████╗ █████╗  ██████╗
██╔══██╗╚██╗██╔╝    ██╔════╝██╔══██╗██╔═████╗
██████╔╝ ╚███╔╝     ███████╗╚█████╔╝██║██╔██║
██╔══██╗ ██╔██╗     ╚════██║██╔══██╗████╔╝██║
██║  ██║██╔╝ ██╗    ███████║╚█████╔╝╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝    ╚══════╝ ╚════╝  ╚═════╝
AIVisionsLab · Polaris Revival Project · 2026
```

> **GPU from 2017. SOTA AI in 2026. No CUDA. No ROCm. No cloud. No excuses.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GPU: AMD RX 580](https://img.shields.io/badge/GPU-AMD%20RX%20580%208GB-red.svg)]()
[![Backend: Vulkan](https://img.shields.io/badge/Backend-Vulkan-orange.svg)]()
[![OS: Windows + Linux](https://img.shields.io/badge/OS-Windows%2010%2F11%20%2B%20Ubuntu%2026.04-blue.svg)]()
[![Docs](https://img.shields.io/badge/Docs-Firebase%20Portal-brightgreen.svg)](https://setup-ia-local-rx580-vulkan.web.app)
[![YouTube](https://img.shields.io/badge/YouTube-AIVisionsLab-red.svg)](https://youtube.com/@aivisionslab)

---

## The Narrative

```
"Your RX 580 can't run AI. Buy a new GPU."
```

AMD dropped ROCm for Polaris/GCN4 in v5.x. DirectML crashes with `OpaqueTensorImpl`. OpenVINO fails silently on Forge. The mainstream AI stack gave up on this card.

We didn't.

By compiling `llama.cpp` and `stable-diffusion.cpp` from source with Vulkan support, the RX 580 runs real, useful AI inference in 2026 — locally, offline, privately. This repository is the complete technical record of how.

```
RX 580 8GB  ──►  Vulkan API  ──►  ggml engine  ──►  17 tok/s LLM  +  72s/image SD
Xeon 2014   ──►  WSL2 CPU    ──►  ComfyUI       ──►  FLUX 16GB  +  AnimateDiff
```

---

## Table of Contents

- [Hardware](#hardware)
- [Benchmarks](#benchmarks-real-logs)
- [Architecture: Dual-Path Stack](#architecture-dual-path-stack)
- [Critical: Two GGUF Formats for FLUX](#critical-two-gguf-formats-for-flux)
- [What Failed (and Why)](#what-failed-and-why)
- [Quick Start: LLM via Vulkan](#quick-start-llm-via-vulkan-windows)
- [Quick Start: Image Generation via Vulkan](#quick-start-image-generation-via-vulkan)
- [FLUX Hybrid Setup](#flux-hybrid-setup-gpu--cpu)
- [OpenWebUI + Docker Integration](#openwebui--docker-integration)
- [whisper.cpp: Audio Transcription](#whispercpp-audio-transcription-on-rx-580)
- [Applio RVC: Voice Cloning](#applio-rvc-voice-cloning-on-amd-windows)
- [AnimateDiff: Video Generation](#animatediff-video-generation)
- [Linux Native: Ubuntu 26.04 LTS](#linux-native-ubuntu-2604-lts)
- [Windows vs Linux Comparison](#windows-vs-linux-benchmarks)
- [Troubleshooting](#troubleshooting)
- [Automation Scripts](#automation-scripts)
- [Community Timeline](#community-timeline)
- [Repository Structure](#repository-structure)

---

## Hardware

| Component | Spec |
|-----------|------|
| GPU | AMD RX 580 2048SP 8GB GDDR5 (Polaris / GCN4) |
| CPU | Intel Xeon E5-2690 v3 — 12c/24t · 3.5GHz (2014) |
| RAM | 32GB DDR4 REG ECC Quad Channel |
| Storage | NVMe 1TB — 1.7–3.5 GB/s read |
| OS | Windows 10 Pro + WSL2 Ubuntu 22.04.5 / Ubuntu 26.04 LTS |
| AMD Driver | 31.0.21924.61 (Amdnolk, Nov 2025) |
| Vulkan SDK | 1.4.341.1 |
| CMake | 4.3.2 |

> **RX 580 2048SP note:** The mining-variant with 2048 shader processors (vs the original 2304SP) performs identically through Vulkan. Both are Polaris/GCN4.

> **NVMe impact:** Upgrading from HDD to NVMe reduced FLUX.1 model load time from 25 minutes to ~30 seconds. Storage is as critical as compute.

---

## Benchmarks (Real Logs)

| Workload | Model | Backend | Result |
|----------|-------|---------|--------|
| LLM inference | Mistral 7B Q4_K_M | RX 580 Vulkan | **17–18 tok/s** |
| LLM inference | Qwen3 4B Q4_K_M | RX 580 Vulkan (Linux) | **~35 tok/s** |
| LLM baseline | Mistral 7B Q4_K_M | Xeon CPU pure | 3–5 tok/s |
| Image gen | DreamShaper 8 (SD 1.5) | RX 580 Vulkan | **~72s / 512×512** |
| Image gen | flux1-schnell-q4_k | GPU+CPU hybrid | **~14 min @ 1024×1024** |
| Image gen | FLUX.1 fp8 (16GB) | Xeon WSL2 CPU | ~24 min |
| Audio transcription | Whisper large-v3-turbo | RX 580 Vulkan (Windows) | **307s for 15min audio** |
| Audio transcription | Whisper large-v3-turbo | RX 580 Vulkan (Linux) | **23.58s for 106s audio** |
| Video / AnimateDiff | SD 1.5 pipeline | Xeon WSL2 CPU | ~141s/frame |
| Voice clone inference | Applio RVC | Xeon CPU (2h audio) | ~30 min processing |

> Whisper on Linux (Mesa RADV) is absurdly faster than Windows — ~150× speedup over pure CPU. VRAM usage: only 1.6GB of 8GB available.

---

## Architecture: Dual-Path Stack

The core insight of this project: not every workload fits in 8GB of VRAM. The solution is routing intelligently between GPU and CPU rather than forcing everything through one path.

```
OpenWebUI  :3000  (Docker)
    │
    ├──► llama-server  :8081  ──►  RX 580 Vulkan  [llama.cpp]
    │         └── Ollama      :11434  ──►  CPU fallback
    │
    └──► sd-server     :7860  ──►  RX 580 Vulkan  [stable-diffusion.cpp]
              ├── SD 1.5 GGUF      ──►  72s / image   ✅
              └── FLUX hybrid      ──►  ~14 min / image  ✅
    
    └──► ComfyUI       :8188  ──►  Xeon CPU WSL2   [heavy models > 8GB VRAM]
```

**Path 1 — GPU Vulkan (RX 580):** All LLM inference + SD 1.5 image generation. Fast, responsive, daily driver.

**Path 2 — CPU Xeon (WSL2):** FLUX.1 16GB models, AnimateDiff video pipelines. Slow but stable. The 32GB ECC RAM acts as "virtual VRAM."

---

## Critical: Two GGUF Formats for FLUX

⚠️ **This trips up almost everyone.**

| Source | Compatible with |
|--------|----------------|
| `city96` (HuggingFace) | ComfyUI + ComfyUI-GGUF node **only** |
| `leejet` (HuggingFace) | `stable-diffusion.cpp` / `sd-server` ✅ |

Using a `city96` GGUF in `sd-server` returns:
```
[ERROR] main.cpp:92 - new_sd_ctx_t failed
```

Always download FLUX weights from: **[huggingface.co/leejet/FLUX.1-schnell-gguf](https://huggingface.co/leejet/FLUX.1-schnell-gguf)**

---

## What Failed (and Why)

We documented every dead end. These aren't opinions — they're error logs.

| Attempt | Error | Root Cause |
|---------|-------|------------|
| **DirectML + ComfyUI** | `NotImplementedError: Cannot access storage of OpaqueTensorImpl` | DirectML wraps tensors in opaque objects that ComfyUI's attention backends can't read. Also: abandoned by Microsoft, last update Sep 2024. |
| **ROCm on Polaris** | Kernel panics under load | AMD officially dropped GCN4/Polaris in ROCm v5.x. No Windows support either. |
| **OpenVINO + Forge** | `ModuleNotFoundError: No module named 'ldm'` | Extension targets old A1111 architecture. Forge restructured `ldm`/`sgm` modules completely. |
| **CPU-only + HDD** | ~19 min/image, 85s startup | No GPU acceleration + mechanical I/O bottleneck. The HDD was the hidden killer. |
| **torch-directml + Applio** | Version conflict | `torch-directml` requires `torch==2.4.1`. Applio requires `torch==2.7.1`. Irreconcilable. |

Full autopsy with logs: [`docs/what-failed.md`](docs/what-failed.md)

---

## Quick Start: LLM via Vulkan (Windows)

> Run these commands in **Developer PowerShell for Visual Studio**.

```powershell
# Clone and compile with Vulkan backend
cd E:\
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
cmake -B build -DGGML_VULKAN=ON -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release -j20

# Validate GPU detection
cd build\bin\Release
.\llama-cli.exe --list-devices
# Expected: Vulkan0: AMD Radeon RX 580 2048SP ✅

# Start LLM server
.\llama-server.exe -m "E:\models\Mistral-7B-Q4_K_M.gguf" `
  --host 0.0.0.0 --port 8081 --device Vulkan0
```

**Verify it's using the GPU** (not CPU):
```
log output during inference:
ggml_vulkan: Found 1 Vulkan device(s)
ggml_vulkan: 0 = AMD Radeon RX 580 2048SP | VRAM: 8192MB
17.77 t/s  ← RX 580 Vulkan ✅
```

If you see 3–5 t/s with no `ggml_vulkan` line — it's running on CPU. Check that `--device Vulkan0` is present.

---

## Quick Start: Image Generation via Vulkan

```powershell
# Clone with submodules (required for ggml dependency)
git clone --recursive https://github.com/leejet/stable-diffusion.cpp
cd stable-diffusion.cpp
mkdir build && cd build
cmake .. -DGGML_VULKAN=ON -DCMAKE_BUILD_TYPE=Release
cmake --build . --config Release -j20

# Successful build log:
# -- Found Vulkan: C:/VulkanSDK/1.4.341.1/Lib/vulkan-1.lib
# [100%] Built target sd-server ✅

# Start SD server (SD 1.5)
E:
cd "E:\stable-diffusion.cpp\build\build\bin\Release"
.\sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 `
  -m "E:\models\dreamshaper8.gguf"

# Server output confirms GPU:
# ggml_vulkan: 0 = AMD Radeon RX 580 2048SP | VRAM: 8192MB
# Server listening on http://0.0.0.0:7860 ✅
```

> **Flag compatibility note:** Older builds use `--host` / `--port`. Newer builds (master-600+) use `--listen-ip` / `--listen-port`. Run `sd-server.exe --help` to check which your build expects.

---

## FLUX Hybrid Setup (GPU + CPU)

FLUX.1 Schnell requires ~16GB total. The strategy: put the diffusion model on VRAM, offload T5XXL and VAE to RAM.

| Component | File | Allocation | Size |
|-----------|------|------------|------|
| Diffusion Model | `flux1-schnell-q4_k.gguf` | GPU (VRAM) | ~6.5 GB |
| VAE | `ae.safetensors` | CPU (RAM) | ~160 MB |
| CLIP L | `clip_l.safetensors` | GPU (VRAM) | ~235 MB |
| T5XXL | `t5xxl_fp16.safetensors` | CPU (RAM) | ~9.3 GB |

```batch
sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 ^
  --diffusion-model "E:\models\flux1-schnell-q4_k.gguf" ^
  --vae "E:\models\ae.safetensors" ^
  --clip_l "E:\models\clip_l.safetensors" ^
  --t5xxl "E:\models\t5xxl_fp16.safetensors" ^
  --cfg-scale 1.0 --steps 4 --clip-on-cpu --vae-on-cpu --vae-tiling
```

> `--vae-tiling` is not optional — without it, VAE decode causes OOM and crashes the server.
> To save RAM: replace `t5xxl_fp16` (~9.3GB) with `t5xxl_fp8` (~5GB).

**Timing per image (1024×1024):**
| Stage | Time |
|-------|------|
| T5XXL conditioning | 11.49s |
| Sampling (4 steps) | ~838s |
| VAE decode (9 tiles) | 40.45s |
| **Total** | **~14 min** |

Full memory architecture: [`docs/flux-setup.md`](docs/flux-setup.md)

---

## OpenWebUI + Docker Integration

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

**Connect LLM server:**
1. Go to `http://localhost:3000` → Admin Panel → Settings → Connections
2. Under OpenAI API, add:
   - URL: `http://host.docker.internal:8081/v1`
   - API Key: `sk-local`
3. Green badge = connected ✅

**Connect image server:**
1. Settings → Images → Engine: Automatic1111
2. URL: `http://192.168.x.x:7860/` (use your local IP, not 127.0.0.1, with trailing slash)

> Never use `127.0.0.1` for Docker connections — Docker runs in an isolated network and cannot reach the host's localhost. Use `host.docker.internal` for services, or your machine's LAN IP.

**Windows Firewall fix** (Docker subnet blocked by default):
```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "sd-server AIVisionsLab" `
  -Direction Inbound -Protocol TCP -LocalPort 7860 -Action Allow
```

Full networking guide: [`docs/firewall-fix.md`](docs/firewall-fix.md)

---

## whisper.cpp: Audio Transcription on RX 580

Vulkan-accelerated audio transcription. The `large-v3-turbo` model uses only 2.6GB of VRAM — plenty of headroom.

**Compile (Developer PowerShell):**
```powershell
# Activate MSVC environment first (required each session)
& "C:\Program Files (x86)\Microsoft Visual Studio\...\vcvars64.bat"

cd C:\
git clone https://github.com/ggml-org/whisper.cpp
cd whisper.cpp
cmake -B build -DGGML_VULKAN=ON -DGGML_HIPBLAS=OFF -DGGML_HIP=OFF -DGGML_CUDA=OFF
cmake --build build --config Release -j4
```

**Download model:**
```powershell
Invoke-WebRequest `
  -Uri "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo.bin" `
  -OutFile "models\ggml-large-v3-turbo.bin"
```

**Transcribe (MP4 → TXT):**
```powershell
# Step 1: Extract audio (Whisper requires WAV on Windows)
ffmpeg -i "video.mp4" -ar 16000 -ac 1 -c:a pcm_s16le "audio.wav"

# Step 2: Transcribe
.\build\bin\Release\whisper-cli.exe `
  -m models\ggml-large-v3-turbo.bin `
  -f "audio.wav" -l pt --output-txt

# With translation to English:
.\build\bin\Release\whisper-cli.exe `
  -m models\ggml-large-v3-turbo.bin `
  -f "audio.wav" -l pt --translate --output-txt
```

**Performance (15-min video, Windows):**
| Stage | Time |
|-------|------|
| Model load | 4s |
| Mel spectrogram | 1.2s |
| GPU encode | 73s |
| Decode + batch | 168s |
| **Total** | **307s** |

VRAM used: 2.6GB of 8GB. CPU stays at ~5%.

> ⚠️ WSL2 does not expose the RX 580 to Vulkan — always use native Windows PowerShell for GPU transcription.
> ⚠️ `--translate` only outputs English. For other target languages, add a translation step after.

---

## Applio RVC: Voice Cloning on AMD Windows

Full pipeline: `Text → Balabolka (TTS) → WAV → Applio RVC (voice conversion) → final audio`

**Why this pipeline instead of pure TTS:**

| Aspect | Pure XTTS | Antônio Neural → Yuri RVC |
|--------|-----------|---------------------------|
| Prosody | Artificial | Human (real actor) |
| Long texts | Degrades | Stable |
| Vocal identity | Generic | Cloned |
| Naturalness | 60–70% | 80–95% |

**Key findings for AMD Windows (2026):**

DirectML acceleration is effectively dead — `torch-directml` requires `torch==2.4.1` while Applio requires `torch==2.7.1`. The version conflict is irreconcilable. **Use CPU mode — it works, just takes time.**

Training speed on Xeon E5-2690 v3: ~6 min/epoch. 200 epochs = ~20 hours.

**Critical gotchas:**
```powershell
# NEVER set these — they silently break feature extraction:
# set CUDA_VISIBLE_DEVICES=-1
# set ROCM_VISIBLE_DEVICES=-1
# They leave logs/project/extracted/ empty, training "succeeds" but produces nothing.

# Always verify after extraction:
dir logs\my-project\extracted\   # Must contain .npy files
```

**Create required mute files** (missing from git install):
```powershell
python -c "
import numpy as np, soundfile as sf, os
[os.makedirs(d, exist_ok=True) for d in [
    'logs/mute/sliced_audios','logs/mute/extracted',
    'logs/mute/f0','logs/mute/f0_voiced'
]]
sf.write('logs/mute/sliced_audios/mute40000.wav', np.zeros(int(40000*3.7)), 40000)
sf.write('logs/mute/sliced_audios/mute48000.wav', np.zeros(int(48000*3.7)), 48000)
np.save('logs/mute/extracted/mute.npy', np.zeros((196, 768)))  # shape (196,768) critical
np.save('logs/mute/f0/mute.wav.npy', np.zeros(100))
np.save('logs/mute/f0_voiced/mute.wav.npy', np.zeros(100))
print('OK')
"
```

Full guide: [`docs/applio-rvc.md`](docs/applio-rvc.md)

---

## AnimateDiff: Video Generation

AnimateDiff injects temporal attention modules into SD 1.5, converting still-image diffusion into coherent video loops. Runs on Xeon CPU via ComfyUI in WSL2.

```bash
# WSL2 Ubuntu
conda activate comfy_env
python main.py --cpu --listen 0.0.0.0 --port 8188
```

Access from Windows: `http://localhost:8188`

Performance: ~141 seconds per frame on Xeon E5-2690 v3 (24 threads).

---

## Linux Native: Ubuntu 26.04 LTS

Bare-metal Linux (no WSL2, no Docker GPU passthrough) with Mesa RADV open-source drivers.

**System:** Ubuntu 26.04 LTS (Resolute Raccoon), Kernel 7.0, Mesa RADV 26.0.3, Vulkan 1.4.341

**Validate GPU:**
```bash
lspci | grep -i vga
# AMD Radeon RX 580 2048SP detected

vulkaninfo --summary 2>/dev/null | grep -A5 "Devices"
# GPU0: DRIVER_ID_MESA_RADV | driverInfo = Mesa 26.0.3 ✅
```

**LLM server:**
```bash
~/llama.cpp/build/bin/llama-server \
  -m "/run/media/user/NVMe/models/Qwen3-4B-Q4_K_M.gguf" \
  --host 0.0.0.0 --port 8081 \
  -ngl 99 -t 24
```

**FLUX image server:**
```bash
~/stable-diffusion.cpp/build/bin/sd-server \
  --listen-ip 0.0.0.0 --listen-port 7860 \
  --diffusion-model /path/to/flux1-schnell-q4_k.gguf \
  --vae /path/to/ae.safetensors \
  --clip_l /path/to/clip_l.safetensors \
  --t5xxl /path/to/t5xxl_fp16.safetensors \
  --cfg-scale 1.0 --steps 4 --clip-on-cpu --vae-on-cpu --vae-tiling
```

> `--vae-tiling` is mandatory on Linux too — without it, VAE decode crashes the GNOME display server.
> Avoid `--backend vulkan0` for heavy models on Linux — causes context-loss bugs.

**Whisper transcription:**
```bash
~/whisper.cpp/build/bin/whisper-cli \
  -m ~/whisper.cpp/models/ggml-large-v3-turbo.bin \
  -f "audio.wav" -l pt --output-txt
```

**Docker services running in parallel:**

| Container | Image | Port | Purpose |
|-----------|-------|------|---------|
| open-webui | `ghcr.io/open-webui/open-webui:main` | 3000 | Chat UI |
| portainer | `portainer/portainer-ce` | 9000 | Docker management |
| searxng | `searxng/searxng:latest` | 8080 | Private search for RAG |

> ⚠️ **ROCm is not usable on Polaris/GCN4.** AMD dropped support. Running Ollama with GPU via Docker on RX 580 will fail. Use `llama-server` compiled with Vulkan instead, and keep Docker for frontends only.

---

## Windows vs Linux Benchmarks

| Workload | Windows 10 | Ubuntu 26.04 (Mesa RADV) | Winner |
|----------|-----------|--------------------------|--------|
| LLM Qwen3 4B @ 99 layers | ~15–17 tok/s | **~35 tok/s** | 🏆 Linux (2×) |
| LLM Qwen3.6 35B @ max layers | 7.62 tok/s (max 10 layers) | 5.18 tok/s (max 20 layers) | ⚖️ Technical tie |
| SD 1.5 DreamShaper (50 steps) | **~72s** | ~85s | 🏆 Windows |
| FLUX Schnell (4 steps, 512×512) | ~84s | **~52s sampling (~95s total)** | 🏆 Linux |
| Whisper large-v3-turbo (106s audio) | 307s · 2.6GB VRAM | **23.58s · 1.6GB VRAM** | 🏆 Linux (absurd) |

**Why Linux is faster for LLM:** Mesa RADV allows up to 20 GPU layers for the 35B model where Windows AMD drivers cap at 10. For smaller models, RADV's memory management is simply more efficient.

**Why Windows wins SD 1.5:** The proprietary AMD driver has more stable direct rendering for this specific workload.

**Whisper gap explained:** Mesa RADV's Vulkan compute path for whisper.cpp is significantly more optimized than the Windows AMD driver equivalent. A 13× speedup on the same GPU, same model.

---

## Troubleshooting

**`generate_image returned no results` / frozen terminal**
Cause: `sd-server` integer overflow bug with random seeds (`Seed: -1`).
Fix: Set a fixed integer seed in OpenWebUI advanced options (e.g., `42`, `1337`).

**Model trained successfully instantly (Applio)**
This is a silent failure. Training completes in seconds and produces nothing.
Cause: `CUDA_VISIBLE_DEVICES=-1` or similar environment variables were set, breaking feature extraction.
Fix: Open a clean PowerShell with no prior `set` commands. Verify `logs/project/extracted/` contains `.npy` files after extraction before starting training.

**FLUX OOM / DeviceMemoryAllocation crash**
Fix: Ensure `--vae-tiling` flag is present. Confirm T5XXL is on CPU (`--clip-on-cpu --vae-on-cpu`). Consider switching to `t5xxl_fp8` to save ~4.3GB RAM.

**`new_sd_ctx_t failed` with FLUX GGUF**
You're using a `city96` GGUF. These only work in ComfyUI with the ComfyUI-GGUF node.
Fix: Download from [leejet's repo](https://huggingface.co/leejet/FLUX.1-schnell-gguf) instead.

**Docker can't reach `sd-server` or `llama-server`**
Cause: Windows Defender blocks Docker's `172.x.x.x` subnet by default.
Fix: See [OpenWebUI + Docker Integration](#openwebui--docker-integration) — add the firewall rule.

**Compilation errors in WSL2 for Vulkan builds**
WSL2 does not expose the RX 580 for Vulkan compute. Compile and run GPU workloads from native Windows PowerShell only. Use WSL2 exclusively for CPU workloads (ComfyUI, Applio, Ollama CPU fallback).

**`--override-tensor exps=CPU` slows down inference on Vulkan**
This flag is optimized for CUDA/PCIe on Nvidia. Under Vulkan, the CPU↔GPU memory transfer overhead destroys any MoE offloading gains. Do not apply CUDA-optimized flags to Vulkan backends.

---

## Automation Scripts

Save as `iniciar_ia_server.bat` on the Desktop:

```batch
@echo off
title Servidor IA Local - Producao
cls

:: Kill ghost processes holding VRAM/ports
taskkill /f /im sd-server.exe 2>nul
taskkill /f /im llama-server.exe 2>nul
timeout /t 2 /nobreak >nul

:: Start LLM server (Vulkan)
start "LLM Server - Vulkan RX580" C:\llama.cpp\build\bin\Release\llama-server.exe ^
  -m "E:\models\Mistral-7B-Q4_K_M.gguf" ^
  --host 0.0.0.0 --port 8081 --device Vulkan0

timeout /t 3 /nobreak >nul

:: Start SD server (Vulkan)
E:
cd "E:\stable-diffusion.cpp\build\build\bin\Release"
sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 ^
  -m "E:\models\dreamshaper8.gguf"

pause
```

**Critical rules:**
- `taskkill` before start: releases VRAM from stuck background processes
- `--host 0.0.0.0`: required for Docker to reach the server
- `--device Vulkan0`: without this, inference falls back to CPU (3–5 tok/s)
- Never use `.\` before executables in CMD — it breaks the shell
- Jump drive (`E:`) before `cd` — CMD doesn't change drives automatically

---

## Vulkan Diagnostics

Instant validation scripts — run before building anything.

```bash
# Linux / WSL2
./vulkan-diagnostic.sh
```

```batch
:: Windows CMD
vulkan-diagnostic.bat
```

Expected output:
```
ggml_vulkan: Found 1 Vulkan device(s)
ggml_vulkan: 0 = AMD Radeon RX 580 2048SP | VRAM: 8192MB  ✅
```

If your card doesn't appear — driver or Vulkan SDK issue. See [Master Documentation](https://setup-ia-local-rx580-vulkan.web.app).

---

## Community Timeline

Three independent researchers. Same GPU. Same conclusion: the hardware was never the problem.

| Date | Author | Contribution |
|------|--------|-------------|
| Jan 2025 | 艾米心 Amihart | First documented LLM via Vulkan on RX 580 — 24.56 tok/s on Debian. Declared SD via Vulkan "not viable" (limitation of `sd.cpp` at that time). |
| Dec 2025 | DH / DadHacks | Refuted Amihart's SD conclusion. Used `stable-diffusion.cpp` with `-DSD_VULKAN=ON`, ran FLUX Schnell GGUF generation on RX 580 from terminal. |
| 2026 | AIVisionsLab | Full Windows production stack: Vulkan LLM + SD + FLUX hybrid + OpenWebUI + Docker networking + Applio RVC + AnimateDiff + whisper.cpp + Linux native benchmarks. |

| Capability | Amihart | DadHacks | AIVisionsLab |
|------------|---------|----------|--------------|
| LLM Vulkan | ✅ 24.56 tok/s | ✅ | ✅ 15–35 tok/s |
| SD via Vulkan | ❌ | ✅ CLI | ✅ Server + API |
| FLUX GGUF | ❌ | ✅ CLI | ✅ Hybrid GPU/CPU |
| GUI / OpenWebUI | Docker only | ❌ | ✅ Full integration |
| Windows native | ❌ | ❌ | ✅ |
| Automation scripts | ❌ | ❌ | ✅ .bat double-click |
| Voice cloning | ❌ | ❌ | ✅ Applio RVC |
| Video / AnimateDiff | ❌ | ❌ | ✅ |
| Audio transcription | ❌ | ❌ | ✅ whisper.cpp |
| Linux native (Ubuntu 26.04) | Debian | Debian | ✅ Ubuntu 26.04 LTS |
| GGUF format mapping | ❌ | ❌ | ✅ city96 vs leejet |

The shared technical foundation: `ggml` / `llama.cpp` / `stable-diffusion.cpp` by Georgi Gerganov. Vulkan compute backends in pure C++ that bypass the entire ROCm/CUDA ecosystem.

Credit: 艾米心 (Amihart), DH (DadHacks), leejet, ggerganov, woodrex, and all independent developers working on hardware preservation and open inference.

---

## Repository Structure

```
rx580-local-ai-guide/
│
├── scripts/
│   ├── start-ai.bat              # Full stack — all services
│   ├── iniciar_sd_server.bat     # SD 1.5 only
│   ├── iniciar_flux_server.bat   # FLUX hybrid GPU/CPU
│   ├── reboot_stack.bat          # Kill all + restart
│   ├── vulkan-diagnostic.bat     # Vulkan validation (Windows)
│   ├── vulkan-diagnostic.sh      # Vulkan validation (Linux/WSL2)
│   ├── build-llamacpp.sh         # Compile llama.cpp (Linux/WSL2)
│   └── build-sdcpp.sh            # Compile stable-diffusion.cpp
│
├── docs/
│   ├── benchmarks.md             # Real hardware logs, full tables
│   ├── what-failed.md            # DirectML, ROCm, OpenVINO autopsy
│   ├── flux-setup.md             # FLUX hybrid memory architecture
│   ├── firewall-fix.md           # Docker + Windows Firewall
│   ├── wsl2-setup.md             # ComfyUI CPU on WSL2
│   ├── applio-rvc.md             # Voice cloning full guide
│   ├── whisper-cpp.md            # Audio transcription guide
│   └── linux-ubuntu2604.md       # Ubuntu 26.04 bare-metal guide
│
├── vulkan-diagnostic.bat         # Quick validation (root, Windows)
├── vulkan-diagnostic.sh          # Quick validation (root, Linux)
└── README.md
```

---

## Related Projects

- [llama.cpp](https://github.com/ggerganov/llama.cpp) — The engine behind LLM inference
- [stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp) — Image generation in C++
- [whisper.cpp](https://github.com/ggml-org/whisper.cpp) — Audio transcription in C++
- [OpenWebUI](https://github.com/open-webui/open-webui) — The chat/image interface
- [AIVisionsLab Portal](https://setup-ia-local-rx580-vulkan.web.app) — Full documentation (PT/EN)

---

## Contributing

This guide is built from real hardware testing, real error logs, and real failures. If you:

- Got this working on a related card (RX 570, RX 590, RX 5500 XT)
- Found better build flags or quantization settings for Vulkan
- Have benchmarks from a different CPU/RAM configuration
- Fixed a bug in the scripts

Open a PR or issue. Everything here is MIT licensed — use it, fork it, share it.

---

## License

MIT — do whatever you want with this. Just don't tell people their old GPU is useless.

---

*Built in São Paulo, Brazil 🇧🇷 · Hardware from 2014–2017 · Running SOTA AI in 2026*

> *"The problem was never the GPU."*
