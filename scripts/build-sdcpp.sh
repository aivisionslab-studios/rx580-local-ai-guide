#!/usr/bin/env bash
# ==============================================================================
# Compile stable-diffusion.cpp with Vulkan compute support inside Linux
# ==============================================================================
set -e

echo "[+] Cloning stable-diffusion.cpp recursively..."
git clone --recursive https://github.com/leejet/stable-diffusion.cpp
cd stable-diffusion.cpp

echo "[+] Creating build directories and running CMake (Vulkan)..."
mkdir -p build && cd build
cmake .. -DGGML_VULKAN=ON -DCMAKE_BUILD_TYPE=Release
cmake --build . --config Release -j$(nproc)

echo "[+] Compile successful. Executable located at: build/bin/sd-server"
