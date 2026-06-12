#!/usr/bin/env bash
# ==============================================================================
# Compile llama.cpp with Vulkan compute support inside Linux
# ==============================================================================
set -e

echo "[+] Cloning llama.cpp repository..."
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp

echo "[+] Building with Vulkan compute backend..."
cmake -B build -DGGML_VULKAN=ON -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release -j$(nproc)

echo "[+] Compile successful. Executable located at: build/bin/llama-server"
