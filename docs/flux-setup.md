# FLUX.1 Hybrid Memory Architecture Guide (8GB VRAM)

FLUX.1 Schnell is a State-of-the-Art (SOTA) DiT (Diffusion Transformer) image model. Although it normally demands at least 16GB–24GB of dedicated VRAM, this guide documents how to execute it on a **8GB AMD RX 580** by implementing a Hybrid GPU+CPU Offloading partition.

---

## The Strategy: Structural Offloading

Our budget constraints dictate that we only have **8,192 MB of VRAM**. Therefore, we must split FLUX's composite network components across system RAM (where the Xeon's 32GB acts as our main backing storage pool) and VRAM:

| Network Component | File Parameter | Native Footprint | Target Allocation | Safe File Choice |
|-------------------|----------------|------------------|-------------------|------------------|
| **Base Diffusion**| `--diffusion-model` | ~6.5 GB | **VRAM (GPU)** | `flux1-schnell-q4_k.gguf` |
| **VAE Decoder**   | `--vae` | ~160 MB | **RAM (CPU)** | `ae.safetensors` |
| **CLIP L Text**   | `--clip_l` | ~235 MB | **VRAM (GPU)** | `clip_l.safetensors` |
| **T5XXL Language** | `--t5xxl` | ~9.3 GB (fp16) | **RAM (CPU)** | `t5xxl_fp8.safetensors` (saves ~4.3GB RAM) |

---

## Ultimate Launch Command (PowerShell)

Ensure your model files exist inside `E:\models\`.

```powershell
# E:\stable-diffusion.cpp\build\build\bin\Release\sd-server.exe (or equivalent bin directory)
.\sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 `
  --diffusion-model "E:\models\flux1-schnell-q4_k.gguf" `
  --vae "E:\models\ae.safetensors" `
  --clip_l "E:\models\clip_l.safetensors" `
  --t5xxl "E:\models\t5xxl_fp8.safetensors" `
  --cfg-scale 1.0 --steps 4 --clip-on-cpu --vae-on-cpu --vae-tiling
```

---

## Critical Parameter Breakdown

- `--clip-on-cpu`: Offloads standard CLIP embeddings calculation to the host processor to save VRAM headroom.
- `--vae-on-cpu`: Offloads variational autoencoder image decoding to system memory. *This is mandatory on 8GB cards!* If set to GPU, the final render pass crashes with `DeviceMemoryAllocation` failures.
- `--vae-tiling`: Forces the VAE decoder to segment and process the image in dynamic spatial grid tiles instead of one massive pass. Without it, decoding a single `1024x1024` space causes a fatal program crash.
- `t5xxl_fp8.safetensors`: Replaces the bloated `fp16` model (~9.3GB) with an `fp8` quantized weight file (~5.2GB). This prevents extreme paging swap file usage on machines with 16GB–32GB RAM.

---

## Timeline of Render Execution (Real Logs)

During an active generation, you can trace the offloading steps inside your console:

```
[INFO] Loading CLIP text models...
[INFO] Loading T5XXL model (on CPU)...
[INFO] Loading Diffusion Transformer model into Vulkan VRAM...
ggml_vulkan: Allocating 6512 MB for diffusion model on AMD Radeon RX 580 2048SP
[INFO] Running conditioning pipelines...
[INFO] T5XXL execution on CPU: 11.49 seconds.
[INFO] Sampling loop started (4 steps total) on Vulkan GPU...
[GPU PASS] Step 1 of 4 completed in 209.43 seconds.
[GPU PASS] Step 2 of 4 completed in 209.41 seconds.
[GPU PASS] Step 3 of 4 completed in 209.40 seconds.
[GPU PASS] Step 4 of 4 completed in 209.41 seconds.
[INFO] Sampling finished in 837.65 seconds.
[INFO] Offloading VAE decoder to CPU...
[VAE TILE] Processing tile 1 of 9 completed.
...
[VAE TILE] Processing tile 9 of 9 completed.
[INFO] VAE Decode completed in 40.45 seconds.
[SUCCESS] Saved image output to 'output.png'
```

- **Diffusion Compute Time:** ~13.9 minutes
- **Total Pipeline Execution:** **~14.6 minutes**

While slow, this approach runs FLUX *completely offline* on a vintage $80 graphics card.
