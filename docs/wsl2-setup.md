# WSL2 Environment & ComfyUI CPU Setup

This document provides our complete step-by-step technical procedures for configuring **Ubuntu 22.04.5 LTS** via Windows Subsystem for Linux (WSL2), establishing automated Python execution environments, and running resource-intensive generation tasks (like **ComfyUI representing FLUX or AnimateDiff pipelines**) using host CPU processing threads.

---

## 1. Initial WSL2 Setup & Resource Boundaries

Since WSL2 runs virtualized, by default it can consume up to 80% of your total physical host RAM. To prevent system lockups during intensive CPU calculations, limit its boundaries.

Create or edit your global Windows user profile wrapper config file at:
`%USERPROFILE%\.wslconfig`

```ini
[wsl2]
memory=24GB      # Leave 8GB for Windows Host
processors=16    # Reserve some CPU cores for system background work
swap=8GB         # Extra dynamic paging space
```

---

## 2. Booting and Updating Packages

Open Windows Terminal/PowerShell and install/enter your Ubuntu configuration:

```bash
# Update WSL components from host first
wsl --update

# Boot Ubuntu
wsl -d Ubuntu
```

Inside your active WSL bash terminal, run:

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y build-essential git cmake python3-pip python3-venv ffmpeg
```

---

## 3. Creating Python Environments via Miniconda

To maintain stable packages, avoid using global system interpreters.

```bash
# Get Miniconda installer
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda3

# Set environment paths
export PATH="$HOME/miniconda3/bin:$PATH"
conda init bash
source ~/.bashrc
```

Create his isolated environment for ComfyUI:

```bash
conda create -n comfy_env python=3.10-c -y
conda activate comfy_env
```

---

## 4. Install ComfyUI (CPU Mode)

```bash
# Clone ComfyUI repository
git clone https://github.com/comfyanonymous/ComfyUI
cd ComfyUI

# Install PyTorch in CPU mode
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# Install remaining model-layer dependencies
pip install -r requirements.txt
```

---

## 5. Startup Commands

Start ComfyUI using host CPU execution threads:

```bash
python main.py --cpu --listen 0.0.0.0 --port 8188
```

You can now open the user interface from your Windows host at: **`http://localhost:8188`**.

Because WSL2 tunnels Localhost bridges out-of-the-box, no manually assigned port forwarding rules are needed!
