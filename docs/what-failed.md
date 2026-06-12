# What Failed (and Why): Polaris Autopsy Log

The mainstream machine learning ecosystem (built for NVIDIA and modern AMD architectures like RDNA3) did not cater to the Polaris/GCN4 architecture. We documented all official failures, tracking driver registers, stack traces, and direct root causes.

---

## 1. DirectML on ComfyUI / Automatic1111

### Symptom:
When running image generation using the Microsoft DirectML PyTorch extension backend, the software crashed during the initial noise prediction step.

### Log Signature:
```
NotImplementedError: Cannot access storage of OpaqueTensorImpl
```
Or:
```
RuntimeError: DML compile error: 0x80070057 (Invalid parameter)
```

### Root Cause:
DirectML represents underlying backend tensors inside opaque wrapped objects to maximize memory layout safety for native DirectX. However, optimization architectures inside modern Attention models (including ComfyUI's SDPA attention or cross-attention pipelines) attempt to directly slice and inspect underlying memory bounds. Because of this, PyTorch yields an opaque tensor read error.
Furthermore, Microsoft effectively paused updating `torch-directml` for consumer apps (last major support was pinned to Torch 2.4.1 in late 2024).

---

## 2. Bare-Metal ROCm on Polaris/GCN4 (Windows & Modern Linux)

### Symptom:
Attempting to force Ollama or PyTorch to run on Polaris via ROCm resulted in kernel crashes, system lockups, or host compilation errors.

### Log Signature:
```
hipErrorNoDevice: no HIP-capable device is detected
```
Or (on Linux):
```
[drm:amdgpu_job_timedout [amdgpu]] *ERROR* ring gfx timeout, signaled seq ...
```

### Root Cause:
AMD officially declared Polaris legacy and dropped GCN4 support starting with ROCm 5.0. While you can bypass check warnings using legacy environmental overrides like `HSA_OVERRIDE_GFX_VERSION=8.0.3`, compiling modern matrix shaders (e.g., in PyTorch 2.5+) produces instruction mismatches. This triggers hardware faults, causing GPU kernel resets and system lockups under load.

---

## 3. OpenVINO Integration on SD WebUI Forge

### Symptom:
Installing the Intel OpenVINO acceleration extension to utilize the CPU/GPU hybrid path resulted in web interface crashes or silent generation falls back to CPU.

### Log Signature:
```
ModuleNotFoundError: No module named 'ldm'
```

### Root Cause:
Most community OpenVINO integrations were compiled and validated specifically for stable-diffusion-webui (A1111 style version 1.6-1.9). WebUI Forge fundamentally restructured its attention layers and eliminated traditional `ldm` (Latent Diffusion Models) and `sgm` (Stability Generative Models) namespaces in favor of a specialized, unified execution backend modeled after ComfyUI. The extension is architecturally incompatible with Forge's internal engine.

---

## 4. Legacies of "Torch-DirectML" with Applio RVC

### Symptom:
Attempting to bind RVC model training to the GPU using DirectML libraries resulted in Python interpreter dependency conflicts.

### Log Signature:
```
pkg_resources.VersionConflict: (torch 2.7.1 (...), Requirement.parse('torch==2.4.1'))
```

### Root Cause:
Applio RVC and its underlying audio extraction dependencies require modern torch features introduced in PyTorch 2.7+. However, `torch-directml` is coupled specifically with standard PyTorch 2.4.1. Forcing version downgrades breaks the entire audio DSP pipelines inside RVC.

---

## Conclusion
Vulkan compute is the only stable path for local AI on the RX 580. By writing workloads in pure C++ through `ggml`, we completely bypass the fragile Python/PyTorch extension tree, and unlock bare-metal speeds directly on Vulkan drivers.
