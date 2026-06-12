# Applio RVC (Voice Cloning) Setup on AMD/Windows (2026)

This document covers voice cloning using Applio RVC on AMD GPUs. Due to hardware limitations, RVC runs in CPU mode on our configuration, which works perfectly for high-quality, stable inference and training.

---

## 1. Why Antony Neural (TTS) + Yuri RVC is Better than Pure XTTS

Traditional zero-shot TTS models (like XTTS v2) usually sound robotic and degrade over long paragraphs. Our RVC approach decouples prosody from identity:

```
[Text Screenplay]
        │
        ▼
[Standard TTS / Balabolka (Antônio Neural)] (Provides steady, crisp reading rhythm)
        │
        ▼
[High Quality WAV Audio]
        │
        ▼
[Applio RVC Voice Conversion (e.g., Yuri)] (Overlays exact vocal fingerprint)
        │
        ▼
[Stunningly Human Cloned Voice] (Retains perfect human cadences)
```

---

## 2. Hard AMD Windows Applio Insights (2026)

DirectML acceleration is effectively dead — `torch-directml` has a version lock at standard PyTorch `2.4.1`, while Applio requires PyTorch `2.7.1`. Any attempt to resolve this results in fatal package conflicts.

**The Solution:** Use **CPU Execution Mode**.
Executing RVC on a Xeon E5-2690 v3 with 24 threads yields excellent results:
- **Training speed:** ~6 minutes per epoch. A robust 200-epoch voice model completes in roughly 20 hours of solid background processing.
- **Inference speed:** Processing a massive 2-hour audiobook takes ~30 minutes.

---

## 3. Critical Gotchas (Avoid Silent Training Failures)

Many users write helper scripts or run commands setting CUDA overrides:
```powershell
# ❌ NEVER RUN THESE WITH APPLIO:
# set CUDA_VISIBLE_DEVICES=-1
# set ROCM_VISIBLE_DEVICES=-1
```

**Why it fails:** Applio uses auxiliary sub-modules (like Whisper or Harvest/Crepe pitch extractors). Forcing these environment variables often crashes feature extraction subprocesses silently. The training console prints "Succeeded", but your `logs/project/extracted/` folder remains empty, yielding a corrupted, silent voice weight file!

Always open a clean, standard PowerShell terminal and double-check after extraction:
```powershell
# Run this to verify files exist before starting training!
dir logs\my-project\extracted\
# Expected: Multiple .npy files with sizes > 0 bytes ✅
```

---

## 4. How to Generate Required Applio Mute Files

Clean git installations of Applio often contain silent directories under `logs/mute/` which crash the training cycle during logging.

Run this simple Python bootstrap inside your Applio folder to create these dummy files:

```powershell
python -c "
import numpy as np, soundfile as sf, os
[os.makedirs(d, exist_ok=True) for d in [
    'logs/mute/sliced_audios','logs/mute/extracted',
    'logs/mute/f0','logs/mute/f0_voiced'
]]
sf.write('logs/mute/sliced_audios/mute40000.wav', np.zeros(int(40000*3.7)), 40000)
sf.write('logs/mute/sliced_audios/mute48000.wav', np.zeros(int(48000*3.7)), 48000)
np.save('logs/mute/extracted/mute.npy', np.zeros((196, 768)))  # shape (196,768) critical
np.save('logs/mute/f0/mute.wav.npy', np.zeros(100))
np.save('logs/mute/f0_voiced/mute.wav.npy', np.zeros(100))
print('[SUCCESS] All mute artifacts generated successfully.')
"
```

Once generated, launch Applio using `go-applio.bat` and select CPU mode for both model training and inference.
        
