---
id: "sd_openwebui_integration"
title: "11.B — OPENWEBUI (DOCKER) + STABLE-DIFFUSION.CPP (LOCAL) INTEGRATION"
description: "Network bridge between the OpenWebUI Docker container and the native C++ engine running on the host GPU."
category: "guides"
lang: "en"
---

<p>When the generation engine runs outside the Docker container, host-to-container communication (<code>127.0.0.1</code>) is blocked by default WSL2/Docker network isolation and the Windows Firewall. Run bindings and endpoint routing must be explicit.</p>

<p>⚙️ <strong>Critical Initialization Parameters</strong></p>
<div class="tbl">
  <table>
    <thead>
      <tr><th>Flag</th><th>Value</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td><code>--listen-ip</code></td><td><code>0.0.0.0</code></td><td>Opens listen socket for incoming requests external to the host (Docker)</td></tr>
      <tr><td><code>--listen-port</code></td><td><code>7860</code></td><td>Standard integration port with OpenWebUI</td></tr>
      <tr><td><code>-m</code></td><td>absolute path</td><td>SD 1.5 / XL model path under <code>.safetensors</code> or <code>.gguf</code> formats</td></tr>
    </tbody>
  </table>
</div>

<p><strong>Production Command — SD 1.5 / DreamShaper:</strong></p>
<pre style="font-family:'JetBrains Mono',monospace;font-size:11px">sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 -m "E:\ia_storage\models\Stable-diffusion\checkpoints\dreamshaper_8.safetensors"</pre>

<p>⚠️ <strong>Architecture Note:</strong> Flux.1 models are not compatible with this build using a simple <code>-m</code> flag — they return <code>[ERROR] main.cpp:92 - new_sd_ctx_t failed</code>. For Flux, use the dedicated command in section 10.A using <code>--diffusion-model</code>, <code>--vae</code>, <code>--clip_l</code>, and <code>--t5xxl</code> flags individually.</p>

<p>🔌 <strong>Route Configuration inside OpenWebUI</strong></p>
<ol style="font-size:.88rem;color:#94a3b8;line-height:2;margin-left:1.25rem">
  <li>Access your browser at <code>http://localhost:3000</code></li>
  <li>Navigate to <strong>Settings &gt; Images</strong> (Admin Panel)</li>
  <li>Select the <strong>Automatic1111</strong> engine option</li>
  <li>Enter the real local IP of your Windows host machine with a mandatory trailing slash <code>/</code>:<br>
    <code>http://192.168.15.68:7860/</code>
  </li>
  <li>Click <strong>Save</strong> — a green connection banner will confirm the network bridge</li>
</ol>

<div class="card">
  <strong>🔒 Mandatory Windows Defender Firewall Rule</strong>
  <p>Windows Defender silently blocks connections originating from the internal Docker subnet (<code>172.17.0.0/16</code>) and WSL2 (<code>172.x.x.x</code>) by default. Without this explicit firewall rule, OpenWebUI will be unable to access the sd-server even if <code>--listen-ip 0.0.0.0</code> is active.</p>
  <p><strong>Method 1 — Graphical Interface (Recommended for initial setup):</strong></p>
  <ol style="font-size:.82rem;color:#94a3b8;line-height:1.6;margin-left:1.25rem;margin-bottom:.5rem">
    <li>Open: <code>Control Panel → Windows Defender Firewall → Advanced Settings</code></li>
    <li>Click: <code>Inbound Rules → New Rule</code></li>
    <li>Type: <code>Port</code></li>
    <li>Protocol: <code>TCP</code> | Port: <code>7860</code></li>
    <li>Action: <code>Allow the connection</code></li>
    <li>Profiles: Check <code>Domain</code>, <code>Private</code>, and <code>Public</code></li>
    <li>Name: <code>sd-server AIVisionsLab</code></li>
  </ol>
  <p><strong>Method 2 — PowerShell (One-liner, Run as Administrator):</strong></p>
  <pre style="font-family:'JetBrains Mono',monospace;font-size:10px;margin-bottom:.5rem">New-NetFirewallRule -DisplayName "sd-server AIVisionsLab" -Direction Inbound -Protocol TCP -LocalPort 7860 -Action Allow</pre>
  <p><strong>Validation:</strong> After creating the rule, restart sd-server and try generating an image on OpenWebUI. The green save confirmation badge validates the active bridge.</p>
</div>

<p>📊 <strong>Expected Success Logs</strong></p>
<pre style="font-family:'JetBrains Mono',monospace;font-size:11px">[INFO] main.cpp:148 - listening on: http://0.0.0.0:7860
[INFO] stable-diffusion.cpp:3987 - generate_image 512x512
[INFO] stable-diffusion.cpp:4218 - generate_image completed in X.XXs</pre>

<div class="card">
  <strong>⚠️ Compatibility Flag Note — sd-server</strong>
  <p>The <code>leejet/stable-diffusion.cpp</code> repository has undergone CLI argument renaming across various commits. Depending on your compiled version:</p>
  <div class="tbl">
    <table>
      <thead>
        <tr><th>Version / Build</th><th>Correct Flags</th></tr>
      </thead>
      <tbody>
        <tr><td>Legacy Builds (pre-master-600)</td><td><code>--host 0.0.0.0 --port 7860</code></td></tr>
        <tr><td>Modern Builds (master-600+)</td><td><code>--listen-ip 0.0.0.0 --listen-port 7860</code></td></tr>
      </tbody>
    </table>
  </div>
  <p><strong>Quick Diagnosis:</strong> If your terminal returns <code>error: unknown argument '--listen-ip'</code>, immediately replace them with <code>--host</code> and <code>--port</code>. The network bridging behavior remains identical — only the argument syntax was updated.</p>
  <p><strong>Validate your version:</strong></p>
  <pre style="font-family:'JetBrains Mono',monospace;font-size:10px;margin:0">E:\stable-diffusion.cpp\build\bin\Release\sd-server.exe --help
# Look for: if "--listen-ip" is present, use the newer syntax.
# If "--host" is present, use the legacy syntax.</pre>
</div>
