---
id: "modelos"
title: "09. QUANTIZED MODEL CONVERSION ENGINE"
description: "Translating weights from raw safetensors arrays into structured .gguf assets."
category: "guides"
lang: "en"
---

<div class="code"><pre># Executable routine for 8-bit quantization mapping
.\sd-cli.exe -M convert -m "E:\models\DreamShaper_8.safetensors" -o "E:\models\dreamshaper8.gguf" --type q8_0</pre></div>
