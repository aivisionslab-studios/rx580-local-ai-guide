# Docker and Windows Defender Firewall Mitigation

If you are running **OpenWebUI** inside a Docker container while running **llama-server.exe** and **sd-server.exe** natively on the Windows host, the Docker container may fail to connect to your host ports (`8081` and `7860`).

This guide solves that silent connection timeout.

---

## The Symptom

In OpenWebUI, checking the LLM status badge returns red, or logs display connection timeouts:
```
aiohttp.client_exceptions.ClientConnectorError: Cannot connect to host host.docker.internal:8081 ssl:default [Connect call failed ('192.168.x.x', 8081)]
```

---

## Why This Happens

Docker Desktop on Windows spins up an isolated Virtual Machine (via WSL2 utility layers). This virtual container subnet utilizes a virtual IP address pool within the `172.x.x.x` or `192.168.x.x` range.
By default, the **Windows Defender Public/Private Firewall** treats incoming requests from virtual networks as unauthorized and drops them silently to secure the host.

---

## The Fix: Run PowerShell Rules

To permit Docker subnets to communicate directly with your running Vulkan servers, you must append explicit inbound network permission maps.

Open **PowerShell as an Administrator** and execute:

```powershell
# 1. Allow llama-server incoming port
New-NetFirewallRule -DisplayName "llama-server AIVisionsLab" `
  -Direction Inbound `
  -Protocol TCP `
  -LocalPort 8081 `
  -Action Allow `
  -Description "Allow OpenWebUI Docker container to send requests to Vulkan LLM server"

# 2. Allow sd-server incoming port
New-NetFirewallRule -DisplayName "sd-server AIVisionsLab" `
  -Direction Inbound `
  -Protocol TCP `
  -LocalPort 7860 `
  -Action Allow `
  -Description "Allow OpenWebUI Docker container to request Vulkan stable-diffusion image generation"
```

Once executed successfully, you can verify your active connection inside OpenWebUI.

---

## Running Docker OpenWebUI Correctly

When spawning your Docker container, ensure you pass the host integration gateway parameter:

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

Inside the OpenWebUI Connection page:
- **Set LLM Engine endpoint to:** `http://host.docker.internal:8081/v1`
- **Set Image Engine endpoint to:** `http://192.168.x.x:7860/` (use the host's actual local LAN IP with a trailing slash)
