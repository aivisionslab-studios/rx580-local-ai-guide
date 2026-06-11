---
id: "linhatempo"
title: "30.A. COLLECTIVE TIMELINE — The Evolution of the RX 580 as an AI Platform"
description: "A descriptive chronology of three independent peer efforts (Amihart, DadHacks, AIVisionsLab) bypassing obsolescence blocks on GCN4 via Vulkan."
category: "builds"
lang: "en"
---

<p>The deployment of the AMD Radeon RX 580 as a modern local AI server is not the output of a single workspace, but a <strong>collective milestones pyramid</strong>. Built atop Georgi Gerganov's <code>ggml</code> mathematical core, three distinct stages shaped this resplendent revival:</p>

  <!-- Visual Timeline -->
  <div style="position:relative;margin:2rem 0;padding-left:1.5rem;border-left:2px solid var(--b)">
    <div style="margin-bottom:1.5rem;position:relative">
      <div style="position:absolute;left:-29px;top:2px;width:12px;height:12px;border-radius:50%;background:var(--r);border:2px solid #07080a"></div>
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--r);font-weight:bold">JANUARY 2025</span>
      <h5 style="color:#fff;margin:.25rem 0;font-size:.88rem">The Amihart Method (Debian Linux)</h5>
      <p>Initial breakthrough. Proved Vulkan operations on the RX 580 inside <code>llama.cpp</code>, clocking 24.56 t/s. Noted: <em>"Vulkan doesn't work with Stable Diffusion"</em>, which was correct regarding software code boundaries available in early 2025.</p>
    </div>
    <div style="margin-bottom:1.5rem;position:relative">
      <div style="position:absolute;left:-29px;top:2px;width:12px;height:12px;border-radius:50%;background:#eab308;border:2px solid #07080a"></div>
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#eab308;font-weight:bold">DECEMBER 2025</span>
      <h5 style="color:#fff;margin:.25rem 0;font-size:.88rem">The DadHacks Method (Linux/Debian)</h5>
      <p>Overthrew the prior limitations. Leveraged the newly minted <code>stable-diffusion.cpp</code> compiled with <code>-DSD_VULKAN=ON</code> to load and sample Flux Schnell weights on Vulkan with offloaded CPU arrays.</p>
    </div>
    <div style="position:relative">
      <div style="position:absolute;left:-29px;top:2px;width:12px;height:12px;border-radius:50%;background:#22c55e;border:2px solid #07080a"></div>
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#22c55e;font-weight:bold">SEASON 2026</span>
      <h5 style="color:#fff;margin:.25rem 0;font-size:.88rem">AIVisionsLab (Windows Native + WSL2)</h5>
      <p>Unified local production suite. Set up native <code>.bat</code> routines, bridged Vulkan engines to Dockerized interfaces (OpenWebUI), configured stable server memory fallbacks on Xeon rigs, and detailed exactly why legacy APIs like DirectML and ROCm fail.</p>
    </div>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:2rem 0 .75rem 0;text-transform:uppercase">A. The Core Hypothesis Solved by Each Phase</h4>
  <p>The development and maturity of local Polaris AI can be traced by checking the core focus of each researcher:</p>
  <ul style="padding-left:1.2rem;font-size:.82rem;color:#94a3b8;line-height:1.8;margin-bottom:1.25rem">
    <li><strong>Amihart (Jan 2025):</strong> <em>"Can we accelerate high-parameter text models on old AMD cards without ROCm?"</em> <strong>Yes</strong>, by compiling llama.cpp on pure Vulkan header arrays.</li>
    <li><strong>DadHacks (Dec 2025):</strong> <em>"Can we generate image weights with Vulkan on legacy silicons?"</em> <strong>Yes</strong>, compiling stable-diffusion.cpp with Vulkan bindings.</li>
    <li><strong>AIVisionsLab (2026):</strong> <em>"Can we run a seamless, user-friendly production system on Windows?"</em> <strong>Yes</strong>, mapping Docker tunnels, Windows batch commands, and server RAM fallbacks for heavy models.</li>
  </ul>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">B. Unified Master Comparative Table</h4>
  <p>Cross-referenced capabilities and cumulative milestones tracking:</p>
  <div class="tbl">
    <table>
      <thead>
        <tr>
          <th>Capability</th>
          <th>Amihart (2025)</th>
          <th>DadHacks (2025)</th>
          <th>AIVisionsLab (2026)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Base OS</strong></td><td>Debian Linux</td><td>Linux Debian</td><td>Windows 10 Pro + WSL2 Linux</td></tr>
        <tr><td><strong>LLM Speed</strong></td><td>✅ Vulkan (24.56 t/s)</td><td>✅ Vulkan (llama.cpp)</td><td>✅ Vulkan (15-16 t/s)</td></tr>
        <tr><td><strong>Image Engine</strong></td><td>❌ No Vulkan path</td><td>✅ Vulkan CLI tool</td><td>✅ Vulkan server (~72s SD1.5)</td></tr>
        <tr><td><strong>Flux GGUF</strong></td><td>❌ Not available</td><td>✅ CLI generation base</td><td>✅ Stable hybrid GPU/CPU arrays</td></tr>
        <tr><td><strong>UI Dashboard</strong></td><td>❌ Console / Raw Docker WebUI</td><td>❌ CLI only</td><td>✅ OpenWebUI + API Tunnel</td></tr>
        <tr><td><strong>Automations</strong></td><td>❌ Not developed</td><td>❌ Not developed</td><td>✅ Direct desktop .bat scripts</td></tr>
        <tr><td><strong>VRAM Guardrails</strong></td><td>❌ Physical boundaries</td><td>⚠️ Manual CLI splits</td><td>✅ VAE Tiling integration</td></tr>
        <tr><td><strong>Models &gt; 8GB</strong></td><td>❌ OOM failures</td><td>⚠️ Basic offloading</td><td>✅ Quad-Channel REG ECC fallbacks</td></tr>
        <tr><td><strong>Video Render</strong></td><td>❌ Not addressed</td><td>❌ Not addressed</td><td>✅ AnimateDiff WSL2 CPU Xeon</td></tr>
        <tr><td><strong>Format Mappings</strong></td><td>❌ Not addressed</td><td>❌ Not addressed</td><td>✅ Multi-GGUF format diagnostics</td></tr>
      </tbody>
    </table>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">C. Denominator of Freedom — GGML Engine</h4>
  <p>The core engine enabling this legacy resurrection is Georgi Gerganov's creation (<strong>ggml / llama.cpp / stable-diffusion.cpp</strong>). By carrying deep learning math directly onto optimized C libraries and showing clean hooks to the open <strong>Vulkan API</strong>, the project freed obsolete computer chips from the constraints of corporate greed (Nvidia-only CUDA and AMD's ROCm deprecations).</p>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">D. Philosophy Alignment</h4>
  <p>Words mirroring the shared intent of our community of hackers:</p>
  <blockquote>
    <strong>Amihart:</strong> "Despite how ancient this card is, it is technically possible to use it... legacy silicon screams for better code."
  </blockquote>
  <blockquote>
    <strong>DadHacks:</strong> "This setup provides an accessible pathway for leveraging existing hardware investments for modern AI without requiring expensive upgrades or specialized software stacks."
  </blockquote>
  <blockquote>
    <strong>AIVisionsLab:</strong> "Commercial planned obsolescence is a market choice of profits, not a physical property of silicon. Legacy hardware never dies; it is set free by native coding."
  </blockquote>

  <div class="card">
    <strong>Technical peer credit:</strong> Timeline of computing history compiled with deep respect to the labor of <strong>艾米心 (Amihart)</strong>, <strong>DH (DadHacks)</strong>, <strong>leejet</strong>, <strong>ggerganov</strong>, <strong>woodrex</strong>, and all digital curators of past silicon.
  </div>
