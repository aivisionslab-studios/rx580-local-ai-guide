# Qwen3.5-35B MoE Hybrid Inference on RX 580 8GB

Six focused docs from the AIVisionsLab lab sessions running a 34.66B-parameter MoE model on an 8GB-VRAM AMD RX 580 via Vulkan, with no CUDA and no ROCm. Each page answers one specific question.

| Page | Answers |
|---|---|
| [Running 35B on 8GB VRAM](./running-35b-on-8gb-vram.md) | How does a 35B model fit in 8GB VRAM at all? (automatic fitting, MoE sparsity, 4-tier memory) |
| [Benchmarks](./benchmarks.md) | What speed/temperature/resource usage should I expect? |
| [Thinking mode context overflow](./thinking-mode-context-overflow.md) | Why do my responses get truncated with reasoning models? |
| [OpenWebUI timeout vs server truncation](./openwebui-timeout-vs-server-truncation.md) | Why does my request "fail" even though the model is still generating? |
| [ctx-size and quantization tuning](./ctx-size-and-quantization-tuning.md) | What's the actual fix/config for stable, complete responses? |
| [Model reasoning about its own architecture](./model-reasoning-about-its-own-architecture.md) | What did the model's internal `<think>` traces actually look like? |

**Hardware:** AMD RX 580 2048SP 8GB · Intel Xeon E5-2690 v3 · 32GB DDR4 ECC · Vulkan SDK 1.4.350.0 · llama.cpp b9049
**Sessions:** 2026-06-15 and 2026-06-16 · Original experiment log (full narrative form): [Section 33](../qwen35-35b-hybrid-experiment.md) · [Section 34](../qwen35-35b-proving-hypothesis.md)
