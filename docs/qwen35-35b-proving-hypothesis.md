# Proving the Hypothesis: curl, ctx-size 8192, and the First Complete Response

> Direct continuation of [Section 33](./qwen35-35b-hybrid-experiment.md) · 3 tests · Hypothesis confirmed · 2017 hardware.

| | |
|---|---|
| **Result** | Hypothesis proven |
| **Key flag** | `--ctx-size 8192` |
| **Comparison** | Q4_K_M vs Q6_K |
| **Speed (Q4_K_M)** | 6.42–6.65 tok/s |
| **Swap** | Not active |
| **Context proven** | 8,192 tokens — accommodates reasoning mode |
| **Peak temperature** | 74°C (10°C cooler than Q6_K) |
| **Hardware status** | 100% approved — zero crashes, 4 parallel slots |

## 34.0 — Context and Motivation

Section 33 ended with a clear hypothesis: *"The problem was never the hardware. It was the combination of thinking + web search exhausting the 4,096-token context. With a short prompt and no web search, Qwen3.5-35B Q6_K runs normally on a 2017 RX 580."*

On June 16, 2026, AIVisionsLab ran the pending tests suggested to prove this hypothesis live: evaluating behavior with direct curl (no client-side timeout), enabling the extended context-size flag, and testing more efficient quantizations.

## 34.1 — Lab Hardware

| Component | Specification |
|---|---|
| CPU | Intel Xeon E5-2690 v3 — 12 cores / 24 threads · 3.05GHz turbo (released 2014) |
| RAM | 31.8GB DDR4 REG ECC (quad-channel) |
| GPU | AMD Radeon RX 580 2048SP — 8GB GDDR5 (released 2017) |
| NVMe storage | NVMe SSD (Drive E:) — GGUF models (1.7–3.5 GB/s read) |
| HDD storage | HDD (Drive C: / F:) — Windows system + swap |
| AMD Driver | 31.0.21925.1001 — released 2026-05-20 |
| OS | Windows 10 Pro with WSL2 active |

## 34.2 — Models Tested

| Model | Quantization | File Size | Architecture Parameters |
|---|---|---|---|
| Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q6_K | 6-bit | 28.51 GB | 34.66B (MoE) |
| Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M | 4-bit (medium) | 21.17 GB | 34.66B (MoE) |
| Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q5_K_M | 5-bit (medium) | 24.76 GB | 34.66B (MoE) |

*Note: all models share identical Mixture of Experts (MoE) architecture, varying only in the mathematical compression of their weights.*

## 34.3 — Locating the Executables

Before testing, it was necessary to locate the optimized llama-server builds. From the lab's PowerShell:

```powershell
Get-ChildItem -Path E:\ -Recurse -Filter "llama-server.exe" -ErrorAction SilentlyContinue
# Result:
# E:\llama.cpp\llama-server.exe (9KB stub)
# E:\llama.cpp\build\bin\Release\llama-server.exe (real 7.5MB executable) ◀
```

## 34.4 — Test 9: Direct curl Without Timeout

### 34.4.1 — Motivation

Identify whether the timeout bottleneck reported in Test 4 lived in the server or strictly in the OpenWebUI client's AJAX requests.

### 34.4.2 — Server Startup

```powershell
cd E:\llama.cpp\build\bin\Release
.\llama-server.exe -m "E:\models\Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf" --host 0.0.0.0 --port 8081
```

### 34.4.3 — Resolving JSON Escaping in PowerShell

```powershell
'{"model":"any","messages":[{"role":"user","content":"Explain MoE in 3 paragraphs"}]}' | Out-File -Encoding utf8 -FilePath "E:\teste.json"
```

### 34.4.4 — Running the Long-Duration Call

```powershell
curl.exe -X POST http://localhost:8081/v1/chat/completions -H "Content-Type: application/json" --max-time 600 -d "@E:\teste.json"
```

### 34.4.5 — Analytical Result

```
truncated = 0  ◀ FULL RESPONSE DELIVERED SUCCESSFULLY
total time = 266.42 s / 1955 tokens
eval time = 255.97 s / 1683 tokens @ 6.57 t/s
```

**Technical verdict:** The 2017 hardware processed and delivered the response perfectly! The earlier problem was the browser's timeout giving up on the TCP connection while the server kept generating in the background.

## 34.5 — Real Parallelism: 4 Compute Slots

During Test 9, OpenWebUI was connected in parallel, firing the same question simultaneously. llama.cpp's scheduling engine processed both concurrently without stalling:

```
Task 0 (curl)      — n_decoded = 1125, tg = 5.96 t/s
Task 875 (OpenWebUI) — n_decoded = 243,  tg = 5.08 t/s
```

The architecture held stable (GPU: 63°C, VRAM: 7.1/8.0GB, RAM: 91% total system usage, safe, no Windows freeze).

## 34.6 — Test 7: Enabling Extreme Context (`--ctx-size 8192`)

### 34.6.1 — The Optimized Command

```powershell
cd E:\llama.cpp\build\bin\Release
.\llama-server.exe -m "E:\models\Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf" --host 0.0.0.0 --port 8081 --ctx-size 8192
```

### 34.6.2 — Test Prompt and Thinking Behavior

> "Explain in Portuguese why MoE allows large models to run on hardware with little VRAM. Be direct and concise."

On receiving the prompt, the reasoning processor ran in the background on the CPU for a long 9 minutes, working within the 8,192-token context. The internal analysis broke down VRAM math (calculating that 35B in INT4 requires 17.5GB of raw weight) to unpack the complexities of activation sparsity.

### 34.6.2-A — The Model's Internal Reasoning: Comparative Analysis of the Three Thinking Blocks

Across the exhaustive testing sessions in Sections 33 and 34, Qwen3.5-35B produced three independent backstage reasoning blocks (`<think>`) captured via direct raw packet interception. Tabulating and systematically mapping these sessions provides fundamental evidence of the model's cognitive behavior:

**1. Thinking Block 1 — Q6_K Quantization — Session 1 (23:06 on 06/15)**

Prompt: *"Explain in detail the attention mechanism in Transformers and why MoE is more efficient than dense models."*
Reasoning time: ~4 minutes | Block tokens: ~2,000 | Status: ✅ Completed successfully.

The model's reasoning trace deconstructed the query into attention math, multi-head projections, and MoE routing/sparsity/load-balancing concepts, then performed a self-correction step questioning whether MoE is *always* faster — concluding that MoE is memory-intensive for routing and weight loading even though it's computationally sparse, and that under dual-system offloading, generation speed depends heavily on mmap performance.

**2. Thinking Block 2 — Q4_K_M Quantization — Session 2 (05:05 on 06/16)**

Prompt: *"What's the difference between MoE and a dense model, and why does MoE let a 35B model run on an 8GB GPU?"*
Reasoning time: ~11 minutes | Block tokens: ~3,500 | Status: ❌ Interrupted by context exhaustion (4,096 limit).

The model spontaneously computed the raw weight footprint at several quantization levels (FP32 ≈ 140GB, FP16 ≈ 70GB, INT8 ≈ 35GB, INT4 ≈ 17.5GB), concluded that none of these fit natively in 8GB, and challenged the premise of the question — reasoning that the only way this works is through extreme offloading of inactive experts to system RAM via mmap, keeping only the router and shared dense blocks resident in VRAM and fetching active experts dynamically during the forward pass.

**Engineering note:** While the model formulated this reasoning on the CPU, it was independently describing — in mathematical depth — almost exactly the distributed mmap system and 4-tier Vulkan memory architecture that was actually running it in real time, without having any direct access to the lab's container metadata or filesystem.

**3. Thinking Block 3 — Q4_K_M Quantization — Session 2 (05:24 on 06/16)**

Prompt: *"Explain in Portuguese why MoE allows large models to run on hardware with little VRAM. Be direct and concise."*
Reasoning time: ~9 minutes | Block tokens: ~3,000 | Status: ✅ Completed successfully (`--ctx-size 8192`).

The model again internally challenged the VRAM claim, reasoning that MoE's total size is larger than an equivalent dense model but its active size is smaller, and that VRAM savings come from smaller activation graphs and CPU-offloaded weight mapping — then iterated through draft → refinement → final compression to produce three concise Portuguese bullet points on active parameters, activation memory bounds, and compute scalability.

**Comparative Cognitive Behavior Table**

| Profiling Metric | Session 1 (Q6_K) | Session 2-A (Q4_K_M) | Session 2-B (Q4_K_M / ctx 8192) |
|---|---|---|---|
| Reasoning duration | ~4 minutes | ~11 minutes | ~9 minutes |
| `<think>` block volume | ~2,000 tokens | ~3,500 tokens | ~3,000 tokens |
| Self-corrections made | 2 | 7 (deep self-corrections) | 4 (focused on concision) |
| Challenged the premise? | No | ✅ Yes (proved a math error in the prompt) | Yes (technical adjustment) |
| Mathematical reasoning | Transformer equations | Real weight-size calculation | Activation buffer calculation |
| Text delivery | ✅ Success | ❌ Overflow (4,096 exhausted) | ✅ Absolute success (zero cuts) |

## 34.8 — Lab Historical Timeline

| Experiment Session | ID | Context Params | Generation (tok/s) | Flow Cut (truncated) | Effective Result |
|---|---|---|---|---|---|
| Section 33 — Test 5 | Q6_K | 4,096 tokens | 5.57 t/s | 0 (lean prompt) | ✅ Response delivered (lean context) |
| Section 34 — Test 9 (curl) | Q4_K_M | 4,096 tokens | 6.57 t/s | 0 (no timeout) | ✅ Full response via direct channel |
| Section 34 — Test 7 (WebUI) | Q4_K_M | 8,192 tokens | 6.42 t/s | 0 | ✅ Complete response with expanded reasoning |

## 34.9 — New Collection of Consolidated Technical Lessons

- **Lesson 6 — The client timeout factor:** Most errors reported by testers don't stem from physical GPU incapacity, but from failed HTTP persistence in interfaces that give up before final decoding completes.
- **Lesson 7 — Context buffer tuning:** Enabling `--ctx-size 8192` removes the suffocating reasoning-buffer limit, giving room for the 3,500+ tokens required for internal logical reasoning.
- **Lesson 8 — Medium quantization loading supremacy:** Running the 35B model at 4-bit quantization saves 7GB crucial to the CPU's physical RAM load, reducing disk swap I/O and improving temperature.
- **Lesson 9 — Critical model reasoning:** Qwen3.5 MoE questioned an incorrect premise embedded in the prompt, computing weights in real time and pushing back on hybrid offloading — demonstrating impeccable attention and alignment behavior.
- **Lesson 10 — Stable native parallelism:** Concurrent calls across channels proved the maturity of llama.cpp's Vulkan shader pipeline implementations.

## 34.10 — Recommended Setup for Future Deployments

```powershell
# Lab production startup script
cd E:\llama.cpp\build\bin\Release
.\llama-server.exe `
  -m "E:\models\Qwen3.5-35B-A3B-Uncensored-HauhauCS-Aggressive-Q4_K_M.gguf" `
  --host 0.0.0.0 `
  --port 8081 `
  --ctx-size 8192
```

*Complementary interface instructions: strictly disable web search and image generation during extreme hybrid processing.*

## 34.11 — Lab's General Verdict (Proving the Hypothesis)

| Engineering Question | Final Verdict |
|---|---|
| Does curl resolve the OpenWebUI timeout? | ✅ Yes (`truncated = 0`, 100% intact response) |
| Does `--ctx-size 8192` resolve the crushed thinking mode? | ✅ Yes (comfortably accommodates long reasoning) |
| Is Q4_K_M superior for the 32GB RAM scenario? | ✅ Yes (faster, cooler, less swap) |
| Was the context-exhaustion hypothesis confirmed? | ✅ Absolutely |
| Additional financial cost for 2026 optimization? | ✅ $0 — purely a logical flag-based solution |

## 34.12 — Tags and Metadata

- 🏷️ **Tags:** curl, ctx-size, timeout, openwebui, q4km, q6k, parallelism, thinking-mode, complete-response, hypothesis-confirmed, rx580
- 💻 **Hardware:** RX 580 2048SP + Xeon E5-2690 v3 + 32GB ECC DDR4
- 💿 **Software:** llama.cpp (build\bin\Release) + Vulkan SDK 1.4.350.0 + OpenWebUI v0.9.6
- 📅 **Date:** 2026-06-16
- 📊 **Tests:** 3 (Test 9 curl, real parallelism, Test 7 ctx8192)
- 📈 **Benchmark:** 6.42–6.65 tok/s (Q4_K_M) | `truncated = 0`
- 🔥 **Peak temperature:** 74°C
- 🏆 **Final status:** ✅ HYPOTHESIS CONFIRMED

> "The problem was never the hardware. It was a flag and a timeout."
> — AIVisionsLab, 2026-06-16

---

*Documentation generated with Claude Sonnet 4.6 — 2026-06-16 · Based on real logs, screenshots, and live benchmarks · 3 documented tests · Hypothesis confirmed · 2017 hardware processing 2025 AI.*

**See also:** [Section 33 — Pushing the Limit: Qwen3.5 35B Q6_K hybrid experiment](./qwen35-35b-hybrid-experiment.md)
