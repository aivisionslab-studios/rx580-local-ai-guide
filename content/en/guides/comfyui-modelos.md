---
id: "comfyui-modelos"
title: "12. ZERO-COPY STORAGE SYSTEM VIA SYMLINKS"
description: "Eliminating duplication across cross-OS boundaries by linking folders to NVMe drives."
category: "guides"
lang: "en"
---

<div class="code"><pre># Map local Linux model directory arrays to host drives
ln -s "/mnt/e/ComfyUI_Models/checkpoints/flux1-schnell-fp8.safetensors" ./flux1-schnell-fp8.safetensors</pre></div>
