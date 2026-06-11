---
id: "falhas"
title: "03. TECHNICAL GRAVEYARD (WHAT FAILED)"
description: "In-depth root cause analysis of DirectML OpaqueTensorImpl exceptions and broken Forge extensions."
category: "troubleshooting"
lang: "en"
---

<div class="err">
    <div class="err-t">DirectML + ComfyUI Windows — CRITICAL FAILURE</div>
    <p>Using <code>torch-directml</code> forced the runtime into unhandled exceptions due to broken attention code blocks:</p>
    <div class="code"><span class="code-lang">stderr</span><pre>WARNING: torch-directml barely works, is very slow...
NotImplementedError: Cannot access storage of OpaqueTensorImpl</pre></div>
    <p><strong>Root Cause:</strong> Microsoft's DirectML engine isolates execution states within opaque tensor representations. Modern high-resolution attention nodes within ComfyUI cannot map or write to these blocks, causing immediate memory segmentation faults.</p>
  </div>
