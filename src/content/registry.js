// src/content/registry.js
export const SECTION_GROUPS = [
  {
    id: "grp-foundation",
    labelKey: "grp-foundation",
    sections: [
      { id: "contexto", key: "sh-s01", icon: "📖" },
      { id: "hardware", key: "sh-s02", icon: "⚙️" },
      { id: "falhas", key: "sh-s03", icon: "⚠️" },
      { id: "solucao", key: "sh-s04", icon: "💡" },
      { id: "prereqs", key: "sh-s05", icon: "📋" },
      { id: "jornada", key: "sh-s06", icon: "🚀" }
    ]
  },
  {
    id: "grp-compilation",
    labelKey: "grp-compilation",
    sections: [
      { id: "llama", key: "sh-s07", icon: "🦙" },
      { id: "sdcpp", key: "sh-s08", icon: "🎨" },
      { id: "modelos", key: "sh-s09", icon: "📦" }
    ]
  },
  {
    id: "grp-deployment",
    labelKey: "grp-deployment",
    sections: [
      { id: "sdserver", key: "sh-s10", icon: "📡" },
      { id: "flux_server", key: "sh-s10a", icon: "⚛️" },
      { id: "sd_bat_automation", key: "sh-s11", icon: "📜" },
      { id: "sd_openwebui_integration", key: "sh-s11b", icon: "🌐" }
    ]
  },
  {
    id: "grp-experimental",
    labelKey: "grp-experimental",
    sections: [
      { id: "comfyui-modelos", key: "sh-s12", icon: "📂" },
      { id: "comfyui-wsl", key: "sh-s13", icon: "🐧" },
      { id: "comfyui-directml", key: "sh-s14", icon: "❌" },
      { id: "comfyui-directml-func", key: "sh-s15", icon: "⚙️" }
    ]
  },
  {
    id: "grp-experimental-2",
    labelKey: "grp-experimental-2",
    sections: [
      { id: "comfyui-flux", key: "sh-s16", icon: "⚛️" },
      { id: "animatediff-video", key: "sh-s17", icon: "🎬" },
      { id: "stack", key: "sh-s18", icon: "🥞" },
      { id: "scripts", key: "sh-s19", icon: "📜" },
      { id: "guia", key: "sh-s20", icon: "⌨️" }
    ]
  },
  {
    id: "grp-ops",
    labelKey: "grp-operations",
    sections: [
      { id: "benchmarks", key: "sh-s21", icon: "📊" },
      { id: "cpu", key: "sh-s22", icon: "🧠" },
      { id: "flux-vulkan", key: "sh-s23", icon: "⚡" },
      { id: "troubleshooting", key: "sh-s24", icon: "🩺" },
      { id: "troubleshoot-comfyui", key: "sh-s25", icon: "🛠️" },
      { id: "comfyui-portable-amd", key: "sh-s26", icon: "🎒" }
    ]
  },
  {
    id: "grp-archive",
    labelKey: "grp-maintenance",
    sections: [
      { id: "comunidade", key: "sh-s27", icon: "🤝" },
      { id: "amihart", key: "sh-s27a", icon: "🌸" },
      { id: "dadhacks", key: "sh-s27b", icon: "🛠️" },
      { id: "proximos", key: "sh-s28", icon: "🔮" },
      { id: "arquivos", key: "sh-s29", icon: "🗄️" },
      { id: "meta", key: "sh-s30", icon: "📔" },
      { id: "linhatempo", key: "sh-s30a", icon: "⏳" }
    ]
  }
];

export const ALL_SECTION_IDS = SECTION_GROUPS.flatMap(g => g.sections.map(s => s.id));
