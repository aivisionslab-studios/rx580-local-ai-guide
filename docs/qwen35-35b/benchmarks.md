# Qwen3.5-35B MoE on RX 580: Benchmark Results (Speed, Temperature, Resource Usage)

**Problem:** What real-world speed, temperature, and resource usage can you expect running a 35B MoE model hybrid on an 8GB GPU + CPU?

## Environment

RX 580 2048SP 8GB + Xeon E5-2690 v3 + 31.8GB DDR4 ECC RAM. Full setup details: [Running a 35B model on 8GB VRAM](./running-35b-on-8gb-vram.md).

## Generation Speed by Quantization

| Quantization | Context | Prompt eval | Generation | Notes |
|---|---|---|---|---|
| Q6_K | 4,096 tok | 34.13 tok/s | 5.57–5.64 tok/s | Baseline, file 26.55 GiB |
| Q4_K_M | 4,096 tok | — | 6.57 tok/s | via direct curl, no client timeout |
| Q4_K_M | 8,192 tok | — | 6.42 tok/s | full reasoning fits, file 21.17 GiB |

**Takeaway:** dropping from Q6_K to Q4_K_M improved speed by ~15–18% and reduced RAM pressure (21.17 GiB vs 26.55 GiB file size), with no loss of functional output across these tests.

## Temperature

| Condition | Q6_K | Q4_K_M |
|---|---|---|
| Idle | 33–41°C | — |
| Normal inference (no web search) | 44–64°C | 51°C |
| Loaded inference (web search active) | 70–75°C | — |
| Parallel load (4 concurrent slots) | — | 63°C |
| **Peak recorded** | **80°C** | **74°C** |

RX 580 throttling threshold: ~90°C. Both quantizations stayed well within margin — **zero throttling events across all test sessions.**

## Resource Utilization (Q6_K, during inference)

| Resource | Idle | During inference | Peak |
|---|---|---|---|
| VRAM | 6.7/8.0 GB | 6.8–7.2/8.0 GB | 7.4/8.0 GB |
| System RAM | ~29.0 GB | 30.7–31.1 GB | 31.2/31.8 GB (98%) |
| Xeon CPU | 3% | 62–70% | 70% |
| GPU 3D utilization | 0% | 1–3% | 3% (PCIe bus-bound, not compute-bound) |
| HDD swap activity | 0% | 13–42% | 98–100% |

## Results: The Real Bottleneck

GPU compute utilization stayed under 3% throughout — this workload is **not GPU-bound**. The actual constraints, in order of impact:

1. **HDD swap I/O** — when system RAM hits ~98%, generation throughput drops toward the disk's ~120–180 MB/s ceiling. This is the single biggest lever: moving swap to NVMe/SSD would likely yield the largest speed improvement.
2. **Context window size** — directly trades against reasoning-token budget. See [thinking mode context overflow](./thinking-mode-context-overflow.md).
3. **Quantization level** — Q4_K_M vs Q6_K trades a small quality difference for meaningfully less RAM pressure and ~10°C cooler operation.

## Notes

- Generation speed remained consistent (~5.6 tok/s for Q6_K) regardless of whether the session was cold or already under load — the hybrid pipeline doesn't degrade with sustained use.
- GPU 3D utilization figures (1–3%) confirm this setup is fundamentally a **memory-bandwidth and I/O problem**, not a raw compute problem — consistent with the MoE sparsity model (see [running 35B on 8GB VRAM](./running-35b-on-8gb-vram.md)).

---
**See also:** [Running 35B on 8GB VRAM](./running-35b-on-8gb-vram.md) · [ctx-size and quantization tuning](./ctx-size-and-quantization-tuning.md)
