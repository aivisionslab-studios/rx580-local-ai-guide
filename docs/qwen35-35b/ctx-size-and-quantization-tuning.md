# Tuning ctx-size and Quantization for Large MoE Models on Limited VRAM

**Problem:** You've identified that your context window is too small for reasoning models (see [thinking mode context overflow](./thinking-mode-context-overflow.md)) or that swap/RAM pressure is hurting speed (see [benchmarks](./benchmarks.md)). What's the actual fix?

## Environment

RX 580 8GB + Xeon E5-2690 v3 + 31.8GB DDR4 ECC RAM, llama.cpp + Vulkan, Qwen3.5-35B MoE.

## Solution 1: Force a Larger Context with `--ctx-size`

By default, llama.cpp's automatic fitting may shrink context aggressively to guarantee the model fits in VRAM (e.g. down to 4,096 tokens). If you have RAM headroom, override it explicitly:

```powershell
cd E:\llama.cpp\build\bin\Release
.\llama-server.exe `
  -m "E:\models\Qwen3.5-35B-A3B-Q4_K_M.gguf" `
  --host 0.0.0.0 `
  --port 8081 `
  --ctx-size 8192
```

### Before/After Comparison

| Config | Context | Reasoning budget | Result |
|---|---|---|---|
| Default auto-fit | 4,096 tok | ~1,000 tok after thinking | Frequent truncation on complex prompts |
| `--ctx-size 8192` | 8,192 tok | ~5,000 tok after thinking | Full responses, even with 9-minute reasoning traces |

With 8,192 tokens, a prompt requiring ~3,000 tokens of internal reasoning plus a full structured answer completed with **zero truncation** (`truncated = 0`).

## Solution 2: Switch from Q6_K to Q4_K_M

| Aspect | Q6_K | Q4_K_M |
|---|---|---|
| File size | 26.55 GiB | 21.17 GiB (saves ~5.4 GB) |
| Generation speed | 5.57–5.64 tok/s | 6.42–6.65 tok/s |
| Peak temperature | 80°C | 74°C |
| RAM/swap pressure | Higher | Lower |

Dropping quantization precision frees enough host RAM to meaningfully reduce dependence on HDD swap — which is the actual throughput bottleneck (see [benchmarks](./benchmarks.md)). The combination of **Q4_K_M + `--ctx-size 8192`** was the best-performing configuration tested.

## Recommended Production Command

```powershell
cd E:\llama.cpp\build\bin\Release
.\llama-server.exe `
  -m "E:\models\Qwen3.5-35B-A3B-Q4_K_M.gguf" `
  --host 0.0.0.0 `
  --port 8081 `
  --ctx-size 8192
```

Pair this with:
- Web search and image generation **disabled** during heavy hybrid inference (both add context pressure)
- Direct API calls or a client with a long timeout for requests expected to take minutes (see [OpenWebUI timeout vs server truncation](./openwebui-timeout-vs-server-truncation.md))

## Results

Across 3 validation tests with this configuration:

| Test | Context | Speed | Truncated |
|---|---|---|---|
| Direct curl, no timeout | 4,096 tok | 6.57 tok/s | 0 |
| Parallel slots (curl + OpenWebUI) | 4,096 tok | 5.08–5.96 tok/s | 0 |
| Full reasoning trace | 8,192 tok | 6.42 tok/s | 0 |

Zero crashes, zero throttling, zero truncated responses across all three.

## Notes

- Don't use `--override-tensor` flags tuned for CUDA/PCIe (e.g. `exps=CPU`) on a Vulkan backend — the CPU↔GPU transfer overhead under Vulkan negates any offloading gains those flags provide on Nvidia hardware.
- Let llama.cpp's automatic fitting choose the GPU/RAM split; only override `--ctx-size`, not the layer placement.

---
**See also:** [Running 35B on 8GB VRAM](./running-35b-on-8gb-vram.md) · [Thinking mode context overflow](./thinking-mode-context-overflow.md) · [Benchmarks](./benchmarks.md)
