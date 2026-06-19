# OpenWebUI Times Out on Long-Running Local LLM Requests — It's the Client, Not the Server

**Problem:** A large local model (e.g. 35B MoE on limited hardware) appears to "fail" or "hang" when queried through OpenWebUI, with errors like:

```
stop: cancel task, id_task = 6887 (truncated = 0)
```

Note `truncated = 0` — this is the key diagnostic clue this guide is about.

## Environment

- Backend: llama.cpp server (any large/slow model where generation takes minutes)
- Frontend: OpenWebUI (or any browser-based chat client)
- Symptom: request appears to fail or get cancelled after some time, even though the model is still producing output

## Root Cause

`truncated = 0` means the server **did not** cut off the response due to a context limit — the generation was still in progress and complete. The failure is a **client-side HTTP timeout**: the browser/OpenWebUI gave up waiting on the TCP connection before the model finished generating, and cancelled the task.

This is easy to misdiagnose as a hardware or context problem. It is neither — it's purely a front-end persistence/timeout setting.

## How to Confirm

Bypass the browser entirely and call the server directly with `curl`, using an explicit long timeout:

### Commands

```powershell
# 1. Write the request payload to a file (avoids PowerShell JSON-escaping issues)
'{"model":"any","messages":[{"role":"user","content":"Your prompt here"}]}' | Out-File -Encoding utf8 -FilePath "E:\request.json"

# 2. Call the server with a generous timeout (in seconds)
curl.exe -X POST http://localhost:8081/v1/chat/completions `
  -H "Content-Type: application/json" `
  --max-time 600 `
  -d "@E:\request.json"
```

## Results

In testing, this resolved the issue completely:

```
truncated = 0   ◀ FULL RESPONSE DELIVERED
total time = 266.42 s / 1955 tokens
eval time  = 255.97 s / 1683 tokens @ 6.57 t/s
```

The same model that "failed" through OpenWebUI's default client timeout delivered a complete, correct response in ~4.5 minutes via direct `curl` with `--max-time 600`.

**Bonus finding — real parallelism confirmed:** while the curl request was running, an OpenWebUI request was fired concurrently on the same server. Both completed without conflict, confirming llama.cpp's scheduler correctly handles concurrent slots:

```
Task 0 (curl)        — n_decoded = 1125, tg = 5.96 t/s
Task 875 (OpenWebUI) — n_decoded = 243,  tg = 5.08 t/s
```

## Solution for Production Use

- If you control the OpenWebUI deployment, increase the client/proxy timeout settings to match your expected generation time for large models.
- For scripting or automation, prefer direct API calls with an explicit `--max-time` (curl) or request timeout (any HTTP client) over relying on a chat UI's default timeout.
- Don't conflate this with context truncation — always check the `truncated` field in the response/log before troubleshooting context size. `truncated = 1` → context problem (see [thinking mode context overflow](./thinking-mode-context-overflow.md)). `truncated = 0` with a failed/cancelled request → client timeout problem (this page).

## Notes

- This applies to any slow local inference setup, not just Qwen3.5 or RX 580 hardware — it's a general lesson about browser-based LLM frontends and large/slow models.

---
**See also:** [Thinking mode context overflow](./thinking-mode-context-overflow.md) · [Benchmarks](./benchmarks.md)
