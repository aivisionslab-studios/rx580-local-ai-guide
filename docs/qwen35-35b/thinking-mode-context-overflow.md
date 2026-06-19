# Fixing "Context Exhausted" / Truncated Responses with Qwen3.5 Thinking Mode

**Problem:** Qwen3.5 (and similar reasoning models) silently truncate or fail to deliver a response when thinking mode is enabled, especially combined with web search or long conversation history. Error looks like:

```
stop processing: n_tokens = 3285, truncated = 1
```
or
```
stop processing: n_tokens = 4095, truncated = 1
```

## Environment

- Model: Qwen3.5-35B-A3B (MoE), thinking mode enabled by default (`thinking = 1` in Jinja2 template)
- Server: llama.cpp with automatic context fitting (see [running 35B on 8GB VRAM](./running-35b-on-8gb-vram.md))
- Frontend: OpenWebUI with SearXNG web search integration

## Root Cause

When VRAM is tight, llama.cpp's automatic fitting algorithm shrinks the context window to make the model fit (e.g. 262,144 → 4,096 tokens). This is correct behavior for VRAM-constrained hardware, but it creates a hidden conflict:

**Qwen3.5's thinking mode consumes 3,000+ tokens of internal reasoning before producing any visible output.** On a 4,096-token context, that leaves under 1,000 tokens for the actual response — and any additional context consumption (web search results, conversation history) pushes the total over the limit, truncating the output entirely.

## Observed Failure Patterns

| Scenario | Prompt tokens | Result | Cause |
|---|---|---|---|
| Web search ON (10 sources) + thinking ON | ~936 tok | ❌ Protocol error | Response prefill incompatible with `thinking=1` |
| Web search ON (30 searches) | ~357 tok | ❌ `n_tokens=3285, truncated=1` | Search results + thinking overflow 4,096 limit |
| Web search ON (25 searches, accumulated history) | ~3,385 tok | ❌ `n_tokens=4095, truncated=1` | Conversation history resend hits exact ceiling |
| Web search OFF, long internal reasoning | ~350 tok | ❌ Client timeout (`truncated=0`) | Reasoning took too long; **this is a different problem** — see [OpenWebUI timeout vs server truncation](./openwebui-timeout-vs-server-truncation.md) |
| Web search OFF, short prompt (45 tok) | 45 tok | ✅ Success | Thinking + response fit comfortably |

## Solution

**Option 1 — Keep web search and history short.** A 45-token prompt with no web search and no accumulated history fit entirely within a 4,096-token context, including the full thinking block.

**Option 2 (recommended) — Increase context size explicitly.** Don't rely on the automatic-fit default; force more headroom:

```powershell
.\llama-server.exe -m "E:\models\your-model.gguf" --host 0.0.0.0 --port 8081 --ctx-size 8192
```

With `--ctx-size 8192`, a full 3,000-token thinking block plus a complete response was delivered with zero truncation, even on more complex prompts. See [ctx-size and quantization tuning](./ctx-size-and-quantization-tuning.md) for the full before/after comparison.

**Option 3 — Disable thinking mode** if you don't need the reasoning trace (newer llama.cpp builds support a server-side flag):

```powershell
.\llama-server.exe -m "E:\models\your-model.gguf" --host 0.0.0.0 --port 8081 --no-thinking
```

## Notes

- Disable web search and image generation during constrained hybrid inference — both add context pressure that competes directly with the thinking budget.
- The "protocol error" failure mode (`Assistant response prefill is incompatible with enable_thinking`) is a separate, frontend-specific bug — not a context problem — but it's easy to misdiagnose as the same issue. Verify the actual error message before assuming context exhaustion.

---
**See also:** [Running 35B on 8GB VRAM](./running-35b-on-8gb-vram.md) · [OpenWebUI timeout vs server truncation](./openwebui-timeout-vs-server-truncation.md) · [ctx-size and quantization tuning](./ctx-size-and-quantization-tuning.md)
