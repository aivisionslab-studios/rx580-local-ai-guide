# Benchmarks Real Hardware Logs & Performance (2026)

This document contains a complete compilation of real benchmarks run on the **AMD RX 580 8GB** (Polaris / 2048SP) paired with an **Intel Xeon E5-2690 v3** CPU (12 cores, 24 threads, 2014) and **32GB DDR4 RAM**.

---

## Summarized Benchmark Table

| Workload | Model | Backend & OS | Core Result | VRAM Used | Notes / Context |
|----------|-------|--------------|-------------|-----------|-----------------|
| **LLM Inference** | Mistral 7B Q4_K_M | RX 580 Vulkan (Windows) | **17.77 tok/s** | ~4.8 GB | Very fluid, suitable as a daily driver. |
| **LLM Inference** | Qwen3 4B Q4_K_M | RX 580 Vulkan (Linux RADV) | **~35 tok/s** | ~3.1 GB | Extremely fast. RADV driver optimizes small models. |
| **LLM Baseline** | Mistral 7B Q4_K_M | CPU Xeon (24t pure) | **3.80 tok/s** | Close to 0 | Painfully slow, typing lag is noticeable. |
| **Image Generation**| DreamShaper 8 (SD 1.5) | RX 580 Vulkan (Windows) | **~72s / 512×512** | ~3.8 GB | 50 steps, Euler a. Robust for image creation. |
| **FLUX Generation** | flux1-schnell-q4_k | GPU + CPU Hybrid | **~14 min @ 1024×1024** | ~6.5 GB | 4 steps. VAE tiling, diffusion on GPU. |
| **FLUX Baseline** | FLUX.1 fp8 (16GB) | Pure CPU Xeon (WSL2) | **~24 min @ 1024×1024** | Close to 0 | Heavy RAM swapping. 32GB ECC RAM acts as backing. |
| **Audio Transcription**| Whisper large-v3-turbo| RX 580 Vulkan (Windows) | **307s for 15m audio** | ~2.6 GB | Fully usable. CPU remains at ~5% load. |
| **Audio Transcription**| Whisper large-v3-turbo| RX 580 Vulkan (Linux RADV) | **23.58s for 106s audio**| ~1.6 GB | Absurd speedup on Linux (13× faster). |
| **Video Generation**| SD 1.5 AnimateDiff | CPU Xeon WSL2 (24t) | **~141s / frame** | Close to 0 | 16-frame loop takes ~37 minutes. |
| **Voice Cloning** | Applio RVC (Inference) | CPU Xeon pure | **~30 mins (2h audio)** | Close to 0 | Audio chunks batched. Completely acceptable offline. |

---

## Detailed Run Diagnostics

### Load Logs: `llama-server` (Mistral 7B)
```
ggml_vulkan: Found 1 Vulkan device(s)
ggml_vulkan: 0 = AMD Radeon RX 580 2048SP | VRAM: 8192MB
llm_load_print_meta: format         = gguf
llm_load_print_meta: arch           = llama
llm_load_print_meta: vocab type     = SPM
llm_load_print_meta: model type     = 7B
llm_load_print_meta: model params   = 7.24 B
llm_load_print_meta: model size     = 4.07 GiB (4.57 BPW) 
...
llama_new_context_with_model: n_ctx_train = 32768
llama_new_context_with_model: n_ctx       = 4096
llama_kv_cache_init: kv_backend = vulkan
...
ggml_vulkan: eval: 17.77 tok/s (4096 ctx, batch 512)
```

### Prompt & Gen Logs: `sd-server` (DreamShaper 8 / SD 1.5)
```
[INFO] stable-diffusion.cpp compile backend: Vulkan-enabled
[INFO] loading model from E:\models\dreamshaper8.gguf
ggml_vulkan: 0 = AMD Radeon RX 580 2048SP | VRAM: 8192MB
[INFO] Model loaded successfully. Ready for inference.
[INFO] Prompt: "A hyperrealistic cinematic shot of a cybernetic raven, glowing circuits"
[INFO] Steps: 50 | Width: 512 | Height: 512 | Seed: 1337 | CFG: 7.0 
[INFO] Running sampling...
[1/50] sampling step completed...
[50/50] sampling done in 71.49 seconds.
[INFO] Image written to output.png successfully.
```

---

## Key Core Takeaways
1. **The NVMe Advantage:** When transferring heavy tensors (such as during FLUX model loads), transitioning from a mechanical SATA HDD to an M.2 NVMe SSD minimized local delay from ~25 minutes to roughly ~30 seconds.
2. **Thermal & Power Profiles:** Polaris AMD GPUs (like the RX 580) often run hot during intensive matrix multiplication compute passes. To avoid thermal throttling, a small under-volt configuration (e.g., limit state 7 to `1150MHz @ 1000mV`) improves both frame consistency and power efficiency by up to 20%.
