# Bare-Metal Linux Native Setup: Ubuntu 26.04 LTS

Running native bare-metal Linux (no WSL2, no Windows overheads) using the open-source **Mesa RADV** driver stack unlocks magnificent performance gains. 

This guide details configuring **Ubuntu 26.04 LTS (Resolute Raccoon)** with an **AMD RX 580 8GB**.

---

## 1. System Specifications & Verification

Verify your hardware is recognized correctly by the Linux Kernel:

```bash
# Check VGA controllers
lspci | grep -i vga
# Expected: Radeon RX 470/480/570/570X/580/580X

# Verify active Vulkan drivers with vulkaninfo
vulkaninfo --summary 2>/dev/null | grep -A5 "Devices"
# GPU0: DRIVER_ID_MESA_RADV | driverInfo = Mesa 26.0.3
```

---

## 2. Driver Stack Setup

Mesa RADV is the high-performance open-source Vulkan driver for AMD hardware on Linux, which outperforms both AMDVLK and AMD's proprietary drivers.

Install the necessary components:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y mesa-vulkan-drivers vulkan-tools libvulkan-dev build-essential git cmake
```

---

## 3. High Performance LLM Server Setup

Compile llama.cpp with native Vulkan compute flags:

```bash
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
cmake -B build -DGGML_VULKAN=ON -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release -j$(nproc)
```

Launch the server utilizing your GPU:

```bash
./build/bin/llama-server \
  -m "/path/to/Mistral-7B-Q4_K_M.gguf" \
  --host 0.0.0.0 --port 8081 \
  --device Vulkan0
```

---

## 4. Why Linux Dominates for LLM & Whisper

Mesa RADV's Vulkan memory mapping layer handles hardware device queues far more efficiently than the proprietary Windows AMD Adrenalin drivers.

### Comparative Metrics (Same RX 580 / Xeon Hardware):

| Task | Windows 10 (Adrenalin Driver) | Ubuntu 26.04 LTS (RADV Driver) | Absolute Winner |
|---|---|---|---|
| **Qwen3 4B Inference** | ~17.15 tok/s | **~35.40 tok/s** | **Linux (2x Speedup!)** |
| **Whisper (106s Audio File)** | 307.00 seconds | **23.58 seconds** | **Linux (13x Faster!)** |

### Explaining the performance gap:
- **Whisper compute efficiency:** whisper.cpp's custom Vulkan pipeline triggers specific shader dispatches that are heavily optimized under Mesa RADV, whereas the Windows driver incurs significant driver-overhead penalties.
- **VRAM layer limits:** Mesa RADV allows small and mid-sized LLMs to map context tables over larger continuous VRAM pages, keeping tokens per second consistently high.
