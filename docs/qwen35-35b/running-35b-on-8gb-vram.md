# Running a 35B Parameter Model on an 8GB VRAM GPU (RX 580 + Vulkan)

**Problem:** You have a GPU with 8GB of VRAM (e.g. AMD RX 580) and want to run a 35B-parameter MoE model that requires 26GB+ of weights. Does it fit, and how?

## Environment

| Component | Spec |
|---|---|
| GPU | AMD Radeon RX 580 2048SP — 8GB GDDR5 (Polaris/GCN4, 2017) |
| CPU | Intel Xeon E5-2690 v3 — 12c/24t, 3.05GHz (2014) |
| RAM | 31.8GB DDR4 REG ECC (quad-channel) |
| Backend | llama.cpp + Vulkan (no CUDA, no ROCm) |
| Model | Qwen3.5-35B-A3B (MoE), 34.66B params, Q6_K quant, 26.55 GiB file |
| llama.cpp build | b9049-2496f9c14 |
| Vulkan SDK | 1.4.350.0 |

## Why It's Possible: MoE Sparsity

A dense 35B model activates all 35B parameters per token. Qwen3.5 is **Mixture of Experts**: only 8 of 256 experts (≈3.1%) activate per token. That means most of the 26GB file sits in memory unused at any given instant — it doesn't need to all be in fast VRAM simultaneously, just reachable.

## Solution: Let llama.cpp's Automatic Fitting Handle It

No manual layer-offload flags (`-ngl`) were used. llama.cpp's built-in fitting algorithm analyzed available VRAM and solved the split in **1.15 seconds**:

```
Required GPU memory (full model): 32,961 MiB
Available free VRAM:                7,366 MiB
Deficit:                           26,618 MiB  →  won't fit whole
```

It then executed four automatic steps:

1. **Reduce context** from 262,144 → 4,096 tokens (frees 5,347 MiB)
2. **Move all 256 MoE experts to host RAM** via mmap (25,613 MiB), keep only dense residual layers on GPU
3. **Reallocate dense layers back to GPU** back-to-front (41 layers → 3,048 MiB used)
4. **Front-to-back fill with fractional overflow** (GATE-type overflow) until VRAM is nearly saturated

## Commands

```powershell
cd E:\llama.cpp\build\bin\Release
.\llama-server.exe -m "E:\models\Qwen3.5-35B-A3B-Q6_K.gguf" --host 0.0.0.0 --port 8081
```

No `-ngl`, no `--override-tensor`. Manual flags fought the fitting algorithm and produced worse results than letting llama.cpp decide.

## Results: Final Memory Distribution

| Location | Content | Size |
|---|---|---|
| Vulkan0 (RX 580, 8GB) | 41 dense layers + output layer | 5,154 MiB |
| CPU_Mapped (RAM via mmap) | 256 MoE experts | 26,784 MiB |

**4-tier memory architecture in practice:**

- **Tier 1 — VRAM (GDDR5, ~400 GB/s):** dense layers, nanosecond latency
- **Tier 2 — DDR4 ECC RAM (~51 GB/s):** MoE experts via mmap
- **Tier 3 — NVMe SSD (1.7–3.5 GB/s):** source .gguf file, used at load time
- **Tier 4 — HDD swap (~120–180 MB/s):** activates when RAM exceeds ~97% usage — this is the real bottleneck (see [benchmarks](./benchmarks.md))

Effective VRAM usage during inference: ~6.2–7.2GB of 8GB (77–90%).

## Notes

- This works because of MoE sparsity specifically. A dense 35B model would need to actively compute all 35B weights per token and would not benefit from this offload strategy the same way.
- Automatic fitting only took 1.15 seconds — faster and more efficient than any manually-tuned `--override-tensor` configuration tested.
- The resulting context window (4,096 tokens) is small. See [ctx-size and quantization tuning](./ctx-size-and-quantization-tuning.md) for how to recover more headroom.

---
**See also:** [Benchmarks](./benchmarks.md) · [Thinking mode context overflow](./thinking-mode-context-overflow.md) · [ctx-size tuning](./ctx-size-and-quantization-tuning.md)
