@echo off
rem ==============================================================================
rem 🔬 AIVisionsLab — Vulkan API Local Environment Diagnostic Tool for AMD GPUs
rem Target Architecture: Polaris (RX 400/500 Series, RX 580 8GB)
rem Operational System: Microsoft Windows 10 & Windows 11
rem ==============================================================================

title AIVisionsLab -- Vulkan Diagnostic Utility 

echo ==============================================================================
echo              🔬 AIVisionsLab -- VULKAN ACCELERATION DIAGNOSTIC INTERFACE       
echo                      [Analyzing Hardware for Local AI Inference]             
echo ==============================================================================
echo Operational Profile: Windows Engine Core (2026)
echo.

rem 1. Checking Vulkan system dll
echo [+] STEP 1: Verifying Vulkan Host Driver DLL...
if exist "C:\Windows\System32\vulkan-1.dll" (
    echo   --^> [OK] Found "vulkan-1.dll" in C:\Windows\System32
    for /f "usebackq tokens=*" %%f in (`powershell -NoProfile -Command "(Get-Item 'C:\Windows\System32\vulkan-1.dll').VersionInfo.FileVersion"`) do (
        echo         Library File Version: %%f
    )
) else (
    echo   --^> [WARNING] "vulkan-1.dll" was not found in system32 folder!
    echo         If you have an AMD GPU installed, ensure the Crimson/Adrenalin drivers are installed properly.
)
echo.

rem 2. Checking for Vulkan SDK registry entries
echo [+] STEP 2: Checking Vulkan SDK Registrations...
reg query "HKLM\SOFTWARE\Khronos\Vulkan\Drivers" /s >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo   --^> [OK] Vulkan drivers found registered in HKEY_LOCAL_MACHINE Registry.
    reg query "HKLM\SOFTWARE\Khronos\Vulkan\Drivers" /s | findstr /i "json"
) else (
    echo   --^> [WARNING] No explicit driver maps found in main Vulkan registry branch.
)
echo.

rem 3. Checking for AMD Radeon Hardware Adaptor
echo [+] STEP 3: Checking System Graphics Controllers...
powershell -NoProfile -Command "Get-CimInstance -ClassName Win32_VideoController | Select-Object Name, DriverVersion, Status"
echo.

rem 4. Final Recommendation Summary
echo ==============================================================================
echo                        🔬 RECOMMENDATIONS^& MITIGATIONS                       
echo ==============================================================================
echo * Minimum Driver recommendation for Polaris (RX 580):
echo   Ensure you have AMD Software: Adrenalin Edition installed (version 22.11.2 or 23.Qx enterprise recommended).
echo.
echo * If launching Ollama, llama.cpp, or stable-diffusion.cpp:
echo   Vulkan works automatically out of the box once the driver is installed.
echo   Avoid using DirectML inside Forge/Automatic1111 due to OpaqueTensor binding errors.
echo.
echo * For full interactive guides, benchmarks, and community live chat, visit:
echo   👉 https://setup-ia-local-rx580-vulkan.web.app/
echo ==============================================================================
pause
