---
id: "llama"
title: "07. LLAMA.CPP VULKAN COMPILATION"
description: "Terminal loops to generate optimized LLM server runtimes targeting AMD cards."
category: "guides"
lang: "en"
---

<div class="code"><pre># Run commands using the Developer PowerShell environment
cmake -B build -DGGML_VULKAN=ON -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release -j20</pre></div>
