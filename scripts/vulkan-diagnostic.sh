#!/usr/bin/env bash

# ==============================================================================
# 🔬 AIVisionsLab — Vulkan API Local Environment Diagnostic Tool for AMD GPUs
# Target Architecture: Polaris (RX 400/500 Series, RX 580 8GB)
# Operational System: Linux / WSL2 (Ubuntu / Debian derivatives)
# ==============================================================================

set -e

# Visual formatting codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}==============================================================================${NC}"
echo -e "${CYAN}             🔬 AIVisionsLab — VULKAN ACCELERATION DIAGNOSTIC INTERFACE       ${NC}"
echo -e "${CYAN}                     [Analyzing Hardware for Local AI Inference]             ${NC}"
echo -e "${CYAN}==============================================================================${NC}"
echo -e "Operational Profile: 2026 Engine Core"
echo ""

# 1. Check if lshw or lspci displays AMD GPU
echo -e "${BLUE}[+] STEP 1: Verifying AMD GPU Presence...${NC}"
if command -v lspci >/dev/null 2>&1; then
    GPU_INFO=$(lspci | grep -iE 'vga|3d|display' | grep -i 'AMD' || true)
    if [ -n "$GPU_INFO" ]; then
        echo -e "  --> ${GREEN}Found AMD Graphics Adapter via lspci:${NC}"
        echo -e "      $GPU_INFO"
    else
        echo -e "  --> ${YELLOW}Warning: AMD card not found via lspci (or running in non-desktop WSL2 container).${NC}"
    fi
else
    echo -e "  --> ${YELLOW}lspci command not available. Skipping pci lookup.${NC}"
fi

# 2. Check Vulkan Library & Vulkan loader existence
echo -e "\n${BLUE}[+] STEP 2: Checking Vulkan Loader and Drivers...${NC}"
VULKAN_LIB=false
for l in /usr/lib/x86_64-linux-gnu/libvulkan.so.1 /usr/lib/libvulkan.so.1 /lib/x86_64-linux-gnu/libvulkan.so.1; do
    if [ -f "$l" ]; then
        echo -e "  --> ${GREEN}Found Vulkan Shared Object: $l${NC}"
        VULKAN_LIB=true
    fi
done

if [ "$VULKAN_LIB" = false ]; then
    echo -e "  --> ${RED}Vulkan Loader library (.so) not detected!${NC}"
    echo -e "      Install via: sudo apt-get update && sudo apt-get install -y libvulkan1"
fi

# 3. Check for Vulkan ICD configuration files
echo -e "\n${BLUE}[+] STEP 3: Checking Vulkan Installable Client Driver (ICD) configs...${NC}"
ICD_DIR="/usr/share/vulkan/icd.d"
if [ -d "$ICD_DIR" ]; then
    ICD_FILES=$(ls -1 "$ICD_DIR" 2>/dev/null || true)
    if [ -n "$ICD_FILES" ]; then
        echo -e "  --> ${GREEN}Found active drivers registered in $ICD_DIR:${NC}"
        for f in $ICD_FILES; do
             echo -e "      - $f"
        done
        if echo "$ICD_FILES" | grep -iq "radeon\|radv\|amd"; then
             echo -e "      --> ${GREEN}AMD/RADV driver config detected!${NC}"
        else
             echo -e "      --> ${YELLOW}Warning: No explicit AMD driver mapping found inside ICD. Make sure mesa-vulkan-drivers is installed.${NC}"
        fi
    else
        echo -e "  --> ${RED}ICD directory is empty! No Vulkan drivers mapped.${NC}"
    fi
else
    echo -e "  --> ${RED}ICD drivers folder ($ICD_DIR) does not exist!${NC}"
fi

# 4. Check for vulkaninfo tool to test capability levels
echo -e "\n${BLUE}[+] STEP 4: Checking vulkaninfo diagnostic tool...${NC}"
if command -v vulkaninfo >/dev/null 2>&1; then
    echo -e "  --> ${GREEN}vulkaninfo command found! testing connection...${NC}"
    # Test runs but restrict output to a small test
    if vulkaninfo --summary >/dev/null 2>&1; then
        echo -e "  --> ${GREEN}SUCCESS: Vulkan loader successfully queried the driver summary!${NC}"
        vulkaninfo --summary | head -n 12
    else
         echo -e "  --> ${YELLOW}Warning: vulkaninfo query failed to connect to hardware device.${NC}"
         echo -e "      If you are on WSL2, verify that 'vulkan-1.dll' is available on host and Mesa is updated inside WSL.${NC}"
    fi
else
    echo -e "  --> ${YELLOW}vulkaninfo utility is not installed on system.${NC}"
    echo -e "      Install with: sudo apt-get install -y vulkan-tools"
fi

# 5. Summary Diagnosis
echo -e "\n${CYAN}==============================================================================${NC}"
echo -e "                       🔬 RECOMMENDATIONS & MITIGATIONS                       "
echo -e "${CYAN}==============================================================================${NC}"
echo -e "* To run Llama.cpp / Ollama with Vulkan on Ubuntu:"
echo -e "  Run: ${YELLOW}sudo apt-get install -y mesa-vulkan-drivers vulkan-tools libvulkan1${NC}"
echo -e "  Then launch your loader with: ${YELLOW}GGML_VULKAN=1${NC} or flag ${YELLOW}--gpu-layers${NC}"
echo ""
echo -e "* To read our full visual benchmarks and step-by-step documentation, visit:"
echo -e "  👉 ${GREEN}https://setup-ia-local-rx580-vulkan.web.app/${NC}"
echo -e "${CYAN}==============================================================================${NC}"
