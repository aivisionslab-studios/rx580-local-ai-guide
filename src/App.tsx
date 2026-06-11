import { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Cpu,
  Database,
  Activity,
  Settings,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Server,
  Layout,
  ExternalLink,
  ChevronRight,
  Monitor,
  Zap,
  Globe,
  Clock,
  HardDrive,
  Info,
  Copy,
  Download,
  Printer,
  QrCode,
  Search,
  Menu,
  X,
  ArrowUp
} from "lucide-react";
import { LOCALES, LanguagePack, SectionContent } from "./data";
import VulkanDebateHub from "./components/VulkanDebateHub.tsx";
import { CommentBoard, BenchmarkDashboard } from "./components/FirebaseCommunity";

export default function App() {
  const [lang, setLang] = useState<string>("pt-BR");
  const [currentPage, setCurrentPage] = useState<"master_docs" | "linux_native">("master_docs");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeId, setActiveId] = useState<string>("contexto");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [qrOpen, setQrOpen] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [progressWidth, setProgressWidth] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  
  // AnimateDiff Simulator states
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const simIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial language from localStorage or URL query parameter
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlLang = searchParams.get("lang") || searchParams.get("locale");
      let targetLang = "";

      if (urlLang) {
        if (urlLang.startsWith("pt")) targetLang = "pt-BR";
        else if (urlLang.startsWith("en")) targetLang = "en";
        else if (urlLang.startsWith("es")) targetLang = "es";
        else if (urlLang.startsWith("fr")) targetLang = "fr";
        else if (urlLang.startsWith("ar")) targetLang = "ar";
        else if (LOCALES[urlLang]) targetLang = urlLang;
      }

      if (!targetLang) {
        const stored = localStorage.getItem("rx580doc_lang");
        if (stored && LOCALES[stored]) {
          targetLang = stored;
        }
      }

      if (targetLang && targetLang !== lang) {
        setLang(targetLang);
      }
    } catch (e) {
      console.error("Failed to parse language from URL or Storage:", e);
    }
  }, []);

  // Handle scrolling to URL hash target on load
  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        if (id === "linux_nativo") {
          setCurrentPage("linux_native");
        } else {
          setCurrentPage("master_docs");
        }
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveId(id);
          }
        }, 600);
      }
    };
    handleInitialHash();
    
    window.addEventListener("hashchange", handleInitialHash);
    return () => window.removeEventListener("hashchange", handleInitialHash);
  }, [lang]);

  const L = LOCALES[lang] || LOCALES["pt-BR"];

  // Handle window scroll thresholds for progress bar & back to top
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgressWidth(progress);

      setShowBackToTop(window.scrollY > 400);

      // Scroll Spy to set active side link
      const sections = Object.keys(L.sections);
      let currentSection = sections[0];
      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If top of section is near the upper third of screen
          if (rect.top <= 160) {
            currentSection = sect;
          }
        }
      }
      setActiveId(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [L]);

  // Handle Standalone Compilation
  const downloadStandaloneHTML = () => {
    const docHtml = document.documentElement.outerHTML;
    const blob = new Blob(["<!DOCTYPE html>\n" + docHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `RX580_IA_LOCAL_MASTER_UNIFICADA_${lang}_2026.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast(lang === "pt-BR" ? "GUIA SALVO OFFLINE! (.HTML)" : "GUIDE SAVED OFFLINE! (.HTML)");
  };

  // Copy Guerrilla share links
  const copyGuerrillaLink = () => {
    const targetUrl = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(targetUrl).then(() => {
      triggerToast(L.share.toast_copied);
    }).catch(() => {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = targetUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        triggerToast(L.share.toast_copied);
      } catch (err) {
        console.error("Link copy failed", err);
      }
      document.body.removeChild(textArea);
    });
  };

  const triggerToast = (msg: string) => {
    setCopiedToast(msg);
    setTimeout(() => setCopiedToast(null), 3000);
  };

  // Simulated AnimateDiff loop logic
  const startAnimateDiffSimulation = () => {
    if (isSimulating) {
      clearInterval(simIntervalRef.current!);
      setIsSimulating(false);
      setSimLogs((prev) => [...prev, ">> [WSL2 CORE] SIMULAÇÃO INTERROMPIDA PELO OPERADOR..."]);
      return;
    }

    setIsSimulating(true);
    setSimLogs([
      ">> [WSL2 CORE] INSTANCIANDO WORKSPACE DE ANIMAÇÃO NO XEON...",
      ">> [WSL2 CORE] MAPEANDO CO-PROCESSADOR VULKAN0 (RX 580 8GB)...",
      ">> [MEMORY] VRAM ATUAL: 1.62GB / VRAM EXCEDENTE RECHUTADA PARA RAM",
      ">> [COMPUTE] ALOCANDO 24 THREADS DO INTEL XEON (MICROARQUITETURA HASWELL)...",
      ">> [ANIMATEDIFF] CARREGANDO MOTION MODULE: mm_sd_v15_v2.ckpt (~1.6GB)"
    ]);

    let step = 0;
    const stepsData = [
      ">> [VAE] DECODIFICANDO FRAME_0 (RESOLUÇÃO 512x512) -> PROCESSADO EM 4.12s",
      ">> [ANIMATEDIFF] INTERPOLANDO QUADRO temporal_overlay_0_1 -> OVERLAY DE CONTROLE ATIVO",
      ">> [VAE] DECODIFICANDO FRAME_1 (RESOLUÇÃO 512x512) -> PROCESSADO EM 4.09s",
      ">> [ANIMATEDIFF] ATENÇÃO VETORIAL APLICADA SOBRE QUADRO temporal_overlay_1_2",
      ">> [VAE] DECODIFICANDO FRAME_2 (RESOLUÇÃO 512x512) -> PROCESSADO EM 4.15s",
      ">> [VAE] DECODIFICANDO FRAME_3 (RESOLUÇÃO 512x512) -> PROCESSADO EM 4.10s",
      ">> [ANIMATEDIFF] INTERPOLANDO QUADRO temporal_overlay_2_3 -> ESTABILIZAÇÃO RETROALIMENTADA",
      ">> [VAE] DECODIFICANDO FRAME_4 (RESOLUÇÃO 512x512) -> PROCESSADO EM 4.11s",
      ">> [VAE] DECODIFICANDO FRAME_5 (RESOLUÇÃO 512x512) -> PROCESSADO EM 4.14s",
      ">> [ANIMATEDIFF] ATENÇÃO VETORIAL REFINANDO TEXTURAS EM FRAME_5...",
      ">> [VAE] DECODIFICANDO FRAME_6 (RESOLUÇÃO 512x512) -> PROCESSADO EM 4.13s",
      ">> [VAE] DECODIFICANDO FRAME_7 (RESOLUÇÃO 512x512) -> PROCESSADO EM 4.08s",
      ">> [ANIMATEDIFF] SÍNTESE DE VÍDEO COMPLETA: 8 FRAMES FUNDIDOS EM ARQUIVO DE SAÍDA",
      ">> [VIDEO_COMBINE] EXPORTANDO ARQUIVO FINAL: 'E:\\output\\AIV_vulkan_render_0.mp4' (H264)",
      ">> [WSL2 CORE] RENDER TERMINADO COM SUCESSO EM 141.2s ✅ STABLE CORES"
    ];

    simIntervalRef.current = setInterval(() => {
      if (step < stepsData.length) {
        setSimLogs((prev) => [...prev, stepsData[step]]);
        step++;
      } else {
        clearInterval(simIntervalRef.current!);
        setIsSimulating(false);
      }
    }, 1800);
  };

  // Listen for language switchers or trigger simulation logs
  useEffect(() => {
    const handleSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      changeLanguage(customEvent.detail);
    };
    const handleSimulate = () => {
      startAnimateDiffSimulation();
    };

    window.addEventListener("switch-language", handleSwitch);
    window.addEventListener("simulate-animatediff-logs", handleSimulate);

    return () => {
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
      window.removeEventListener("switch-language", handleSwitch);
      window.removeEventListener("simulate-animatediff-logs", handleSimulate);
    };
  }, [lang, isSimulating]);

  const changeLanguage = (langKey: string) => {
    setLang(langKey);
    saveLang(langKey);
  };

  const saveLang = (langKey: string) => {
    try {
      localStorage.setItem("rx580doc_lang", langKey);
    } catch (e) {
      console.error(e);
    }
  };

  // Nav scroll helper
  const goToSection = (id: string) => {
    setSidebarOpen(false);
    if (id === "linux_nativo") {
      setCurrentPage("linux_native");
    } else {
      setCurrentPage("master_docs");
    }
    // Small delay to let React render the container if we switched views
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveId(id);
        try {
          window.history.pushState(null, "", `#${id}`);
        } catch (err) {
          window.location.hash = id;
        }
      }
    }, 50);
  };

  // Filter sections by search query
  const filteredSections = Object.entries(L.sections).filter(([key, value]) => {
    const q = searchQuery.toLowerCase();
    return (
      value.title.toLowerCase().includes(q) ||
      value.desc.toLowerCase().includes(q) ||
      key.toLowerCase().includes(q)
    );
  });

  return (
    <div className={`min-h-screen bg-[#0B0C0E] text-[#94a3b8] font-mono selection:bg-[#E11D48]/25 selection:text-white transition-colors duration-300 relative`}>
      {/* ── Progress reading bar ── */}
      <div
        id="reading-bar"
        className="fixed left-0 h-[2px] bg-[#E11D48] z-[1200] transition-all duration-100 shadow-[0_0_8px_#E11D48]"
        style={{ width: `${progressWidth}%`, top: "56px" }}
      />

      {/* ── Ambient Effects ── */}
      <div className="bg-grid fixed inset-0 opacity-15 pointer-events-none z-0" />
      <div className="glow-1 fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-radial from-[#E11D48]/10 to-transparent pointer-events-none z-0" />
      <div className="glow-2 fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-radial from-[#3b82f6]/5 to-transparent pointer-events-none z-0" />

      {/* ── Top Navigation Bar ── */}
      <nav className="fixed top-0 left-0 w-full h-[56px] bg-[#0E0F12]/92 border-b border-white/5 flex items-center justify-between px-6 z-[1100] backdrop-blur-[24px]">
        <div className="flex items-center gap-4">
          {/* Mobile toggle list */}
          <button
            id="mobile-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-[#E11D48] transition-colors focus:outline-none block hide-on-desktop"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          
          <div className="nav-brand flex items-center gap-3">
            <div className="w-[10px] h-[10px] bg-[#E11D48] rounded-full shadow-[0_0_16px_rgba(225,29,72,0.8)] animate-pulse" />
            <div className="nav-brand-group flex flex-col">
              <span id="nav-brand" className="text-white font-sans font-extrabold text-xs tracking-[1.5px] uppercase">
                {L.nav.brand}
              </span>
              <span id="nav-subtitle" className="text-[10px] text-[#475569] tracking-[0.5px]">
                {L.nav.subtitle}
              </span>
            </div>
          </div>
        </div>

        <div className="nav-status-group flex items-center gap-6">
          <div id="nav-status" className="text-[10px] text-[#22c55e] hidden sm:flex items-center gap-2 border border-[#22c55e]/30 bg-[#22c55e]/5 px-3 py-1 rounded-md font-bold tracking-[0.05em]">
            <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-ping" />
            {L.nav.status}
          </div>

          {/* Custom micro language selector */}
          <div className="lang-wrapper relative">
            <button
              onClick={() => {
                const dd = document.getElementById("lang-dropdown-box");
                dd?.classList.toggle("hidden");
              }}
              className="lang-btn bg-white/[0.03] border border-white/5 text-white px-3 py-1.5 rounded-md text-[11px] font-medium cursor-pointer flex items-center gap-2 transition hover:bg-white/[0.07] hover:border-[#64748b]/50"
            >
              <span id="lang-current-flag">{metaFlags[lang] || "🇧🇷"}</span>
              <span id="lang-current-label" className="font-sans font-medium text-xs">{metaLangNames[lang] || "Português"}</span>
              <span className="text-[8px] text-[#475569]">▼</span>
            </button>
            <div
              id="lang-dropdown-box"
              className="lang-dropdown hidden absolute top-[calc(100%+6px)] right-0 w-[180px] bg-[#0E0F12] border border-white/5 rounded-lg flex flex-col z-[1500] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {Object.keys(LOCALES).map((langKey) => (
                <button
                  key={langKey}
                  onClick={() => {
                    changeLanguage(langKey);
                    document.getElementById("lang-dropdown-box")?.classList.add("hidden");
                  }}
                  className={`lang-opt text-left bg-none border-none text-[11px] cursor-pointer flex items-center gap-3 px-3 py-2.5 w-full hover:bg-white/[0.04] transition ${
                    lang === langKey ? "text-[#E11D48] font-bold bg-[#E11D48]/5" : "text-[#94a3b8]"
                  }`}
                >
                  <span>{metaFlags[langKey]}</span>
                  <div>
                    <div className="text-[12px] font-sans">{metaLangNames[langKey]}</div>
                    <div className="text-[9px] text-[#475569]">{langKey}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── App Layout Container ── */}
      <div className="layout-shell relative z-10 w-full">
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="sidebar-overlay hide-on-desktop" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Left Sidebar ── */}
        <aside className={`sidebar-container flex flex-col ${
          sidebarOpen ? "open" : ""
        }`}>
          <div className="sid-meta flex-1 p-6 overflow-y-auto scrollbar">
            
            {/* Search filter input */}
            <div className="relative mb-5">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "pt-BR" ? "Buscar seções..." : "Search sections..."}
                className="w-full bg-[#141519] border border-white/5 rounded-md py-1.5 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-[#E11D48]/50 placeholder-[#475569]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#475569] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="sid-dir-lbl text-[10px] text-[#475569] font-sans font-bold tracking-[2px] mb-4 uppercase">
              {L.sidebar.directory}
            </div>

            <div className="sid-nav flex flex-col gap-1">
              {["contexto", "hardware", "falhas", "solucao", "prereqs", "jornada"]
                .filter(key => filteredSections.some(([fKey]) => fKey === key))
                .map(key => {
                  const value = L.sections[key];
                  return (
                    <button
                      key={key}
                      onClick={() => goToSection(key)}
                      className={`sid-btn text-left text-[11px] px-3 py-1 rounded transition font-mono ${
                        activeId === key ? "bg-[#E11D48]/8 border-l-2 border-[#E11D48] text-white font-bold" : "text-[#475569] hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="sid-btn-label">{value.title}</span>
                    </button>
                  );
                })}

              {/* Protocolos de Compilação Group */}
              <div className="sid-group-lbl text-[9px] font-bold text-[#E11D48] tracking-[1.5px] uppercase mt-4 mb-1 px-3">
                {"[1] "}{lang === "pt-BR" ? "PROTOCOLOS DE COMPILAÇÃO" : "COMPILATION PROTOCOLS"}
              </div>
              {["llama", "sdcpp", "modelos"]
                .filter(key => filteredSections.some(([fKey]) => fKey === key))
                .map(key => {
                  const value = L.sections[key];
                  return (
                    <button
                      key={key}
                      onClick={() => goToSection(key)}
                      className={`sid-btn text-left text-[11px] px-3 py-1 rounded transition font-mono ${
                        activeId === key ? "bg-[#E11D48]/8 border-l-2 border-[#E11D48] text-white font-bold" : "text-[#475569] hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="sid-btn-label">{value.title}</span>
                    </button>
                  );
                })}

              {/* Sequências de Deploy Group */}
              <div className="sid-group-lbl text-[9px] font-bold text-[#E11D48] tracking-[1.5px] uppercase mt-4 mb-1 px-3">
                {"[2] "}{lang === "pt-BR" ? "SEQUÊNCIAS DE DEPLOY" : "DEPLOY SEQUENCES"}
              </div>
              {["sdserver", "flux_server", "sd_bat_automation", "sd_openwebui_integration"]
                .filter(key => filteredSections.some(([fKey]) => fKey === key))
                .map(key => {
                  const value = L.sections[key];
                  return (
                    <button
                      key={key}
                      onClick={() => goToSection(key)}
                      className={`sid-btn text-left text-[11px] px-3 py-1 rounded transition font-mono ${
                        activeId === key ? "bg-[#E11D48]/8 border-l-2 border-[#E11D48] text-white font-bold" : "text-[#475569] hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="sid-btn-label">{value.title}</span>
                    </button>
                  );
                })}

              {/* Análises ComfyUI e AMD Group */}
              <div className="sid-group-lbl text-[9px] font-bold text-[#E11D48] tracking-[1.5px] uppercase mt-4 mb-1 px-3">
                {"[3] "}{lang === "pt-BR" ? "ANÁLISES COMFYUI E AMD" : "COMFYUI AND AMD ANALYSES"}
              </div>
              {["comfyui-modelos", "comfyui-wsl", "comfyui-directml", "comfyui-directml-func", "comfyui-flux", "animatediff-video", "stack"]
                .filter(key => filteredSections.some(([fKey]) => fKey === key))
                .map(key => {
                  const value = L.sections[key];
                  return (
                    <button
                      key={key}
                      onClick={() => goToSection(key)}
                      className={`sid-btn text-left text-[11px] px-3 py-1 rounded transition font-mono ${
                        activeId === key ? "bg-[#E11D48]/8 border-l-2 border-[#E11D48] text-white font-bold" : "text-[#475569] hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="sid-btn-label">{value.title}</span>
                    </button>
                  );
                })}

              {/* Integração do Ecossistema Group */}
              <div className="sid-group-lbl text-[9px] font-bold text-[#E11D48] tracking-[1.5px] uppercase mt-4 mb-1 px-3">
                {"[4] "}{lang === "pt-BR" ? "INTEGRAÇÃO DO ECOSSISTEMA" : "ECOSYSTEM INTEGRATION"}
              </div>
              {["scripts", "guia", "benchmarks", "cpu", "flux-vulkan", "troubleshooting", "troubleshoot-comfyui", "comfyui-portable-amd"]
                .filter(key => filteredSections.some(([fKey]) => fKey === key))
                .map(key => {
                  const value = L.sections[key];
                  return (
                    <button
                      key={key}
                      onClick={() => goToSection(key)}
                      className={`sid-btn text-left text-[11px] px-3 py-1 rounded transition font-mono ${
                        activeId === key ? "bg-[#E11D48]/8 border-l-2 border-[#E11D48] text-white font-bold" : "text-[#475569] hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="sid-btn-label">{value.title}</span>
                    </button>
                  );
                })}

              {/* Diagnósticos e Troubleshooting Group */}
              <div className="sid-group-lbl text-[9px] font-bold text-[#E11D48] tracking-[1.5px] uppercase mt-4 mb-1 px-3">
                {"[5] "}{lang === "pt-BR" ? "DIAGNÓSTICOS E TROUBLESHOOTING" : "DIAGNOSTICS AND TROUBLESHOOTING"}
              </div>
              {["comunidade", "amihart", "dadhacks", "codacus", "proximos", "arquivos", "meta", "linhatempo"]
                .filter(key => filteredSections.some(([fKey]) => fKey === key))
                .map(key => {
                  const value = L.sections[key];
                  return (
                    <button
                      key={key}
                      onClick={() => goToSection(key)}
                      className={`sid-btn text-left text-[11px] px-3 py-1 rounded transition font-mono ${
                        activeId === key ? "bg-[#E11D48]/8 border-l-2 border-[#E11D48] text-white font-bold" : "text-[#475569] hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="sid-btn-label">{value.title}</span>
                    </button>
                  );
                })}

              {/* Áudio, Whisper e Linux Nativo */}
              <div className="sid-group-lbl text-[9px] font-bold text-[#E11D48] tracking-[1.5px] uppercase mt-4 mb-1 px-3">
                {"[6] "}{lang === "pt-BR" ? "ÁUDIO, WHISPER & LINUX NATIVO" : "AUDIO, WHISPER & NATIVE LINUX"}
              </div>
              {["audio_rvc", "audio_whisper", "linux_nativo"]
                .filter(key => filteredSections.some(([fKey]) => fKey === key))
                .map(key => {
                  const value = L.sections[key];
                  return (
                    <button
                      key={key}
                      onClick={() => goToSection(key)}
                      className={`sid-btn text-left text-[11px] px-3 py-1 rounded transition font-mono ${
                        activeId === key ? "bg-[#E11D48]/8 border-l-2 border-[#E11D48] text-white font-bold" : "text-[#475569] hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="sid-btn-label">{value.title}</span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Sidebar System Log */}
          <div className="sid-syslog p-4 bg-black border-t border-white/5 flex flex-col gap-1 font-mono">
            <div className="sid-syslog-t text-[10px] text-[#475569] font-bold tracking-[1px] flex items-center gap-1.5 mb-1 bg-transparent">
              <span className="w-1.5 h-1.5 bg-[#E11D48] rounded-full animate-ping" />
              {L.sidebar.syslog}
            </div>
            <div className="text-[10px] text-[#34d399]">[OK] INITIALIZED_MEM_CONTROLLER</div>
            <div className="text-[10px] text-[#34d399]">[OK] ACCEL: VULKAN_API_READY</div>
            <div className="text-[10px] text-[#34d399]">[OK] HEAP_VRAM_ALLOC: 8192 MB (POLARIS)</div>
            <div className="text-[10px] text-[#34d399]">[OK] KERNEL_THREAD_THREADING: 24 (XEON)</div>
            <div className="text-[10.5px] text-emerald-500 font-bold mt-1">
              [SYS] READY_FOR_LOCAL_INFERENCE_2026
            </div>
          </div>
        </aside>

        {/* ── Main Content viewport ── */}
        <main className="main-viewport flex-1 min-w-0">
          <div className="desktop-content">
          
          {/* ── Hero Module ── */}
          <header className="hero mb-16 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              {/* Left Column (Hero Content) */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <h1 id="hero-title" className="font-sans font-black text-white tracking-[-2.5px] leading-[1.05] relative uppercase text-[42px] sm:text-[48px] md:text-[56px] xl:text-[68px] italic mb-3">
                    AIVisions<span className="text-[#E11D48]">Lab</span>
                  </h1>
                  <div id="hero-subtitle" className="font-sans font-bold text-[10px] tracking-[4px] uppercase text-[#E11D48] mb-6">
                    DOCUMENTAÇÃO MASTER UNIFICADA // TEMPORADA 2026
                  </div>
                  
                  <p id="hero-desc-1" className="text-sm sm:text-base leading-[1.8] text-[#94a3b8] max-w-[720px] mb-4 font-sans font-normal">
                    Projeto de engenharia reversa de obsolescência programada. Rodando LLMs de última geração (Mistral/R1) e difusores de imagem locais em GPUs legadas via APIs de baixo nível.
                  </p>
                  <p id="hero-desc-2" className="text-sm leading-[1.8] text-[#475569] max-w-[720px] mb-8 font-sans font-normal italic">
                    Guia de laboratório unificado integrando o Método Amihart (Linux/Debian), o Método DadHacks (Vulkan image creation) e automações nativas no Windows.
                  </p>
                </div>

                {/* Inline Pills Button Row */}
                <div className="flex flex-wrap gap-2.5 mb-2">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#E11D48]/35 bg-[#E11D48]/5 text-[#fca5a5] text-[10px] font-bold font-mono rounded-full uppercase shadow-[0_0_12px_rgba(225,29,72,0.15)]">
                    <span className="w-1.5 h-1.5 bg-[#E11D48] rounded-full animate-pulse" />
                    GPU: RX 580 8GB Vulkan
                  </span>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#3b82f6]/35 bg-[#3b82f6]/5 text-blue-300 text-[10px] font-bold font-mono rounded-full uppercase">
                    <Cpu size={11} className="text-blue-400" />
                    Engine: llama.cpp & stable-diffusion.cpp
                  </span>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#22c55e]/35 bg-[#22c55e]/5 text-emerald-300 text-[10px] font-bold font-mono rounded-full uppercase shadow-[0_0_12px_rgba(34,197,94,0.1)]">
                    <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-ping" />
                    Tuned: 100% Offline Ops
                  </span>
                </div>
              </div>

              {/* Right Column (High Tech Telemetry Verification Panel) */}
              <div className="lg:col-span-4 bg-[#14171a]/70 border border-white/5 p-6 rounded-lg flex flex-col justify-between relative overflow-hidden backdrop-blur-sm shadow-xl min-h-[220px]">
                {/* Grid Background accent */}
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                    <span className="text-[10px] text-[#475569] font-bold tracking-[2.5px] uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      TELEMETRY VERIFIED
                    </span>
                    <Activity size={12} className="text-emerald-500" />
                  </div>

                  <h3 className="font-sans font-extrabold text-[18px] text-white tracking-tight leading-snug mb-2 uppercase">
                    Polaris GCN4 Core Revived
                  </h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    Vulkan compute queues unlocked. Full precision FP32 fallback routing activated for Haswell Intel Xeon processors.
                  </p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-[#475569] mt-4 pt-3 border-t border-white/5 font-mono">
                  <span>SYS_KERN: WSL2_6.6_ACTIVE</span>
                  <span className="text-emerald-500 font-bold">100% RELIABLE</span>
                </div>
              </div>
            </div>
          </header>

          {/* ── Page View Toggler (Aesthetic tab bar) ── */}
          <div className="flex items-center gap-1.5 p-1 bg-[#111215] border border-white/5 rounded-lg mb-10 max-w-sm">
            <button
              onClick={() => setCurrentPage("master_docs")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded text-[10.5px] font-sans font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                currentPage === "master_docs"
                  ? "bg-[#E11D48] text-white shadow-lg shadow-[#E11D48]/20"
                  : "text-[#475569] hover:text-[#94a3b8] hover:bg-white/[0.02]"
              }`}
            >
              <Layout size={12} />
              {lang === "pt-BR" ? "Documentação Windows" : "Windows Guide"}
            </button>
            <button
              onClick={() => setCurrentPage("linux_native")}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded text-[10.5px] font-sans font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                currentPage === "linux_native"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                  : "text-[#475569] hover:text-[#94a3b8] hover:bg-white/[0.02]"
              }`}
            >
              <Terminal size={12} />
              {lang === "pt-BR" ? "Ubuntu 26.04 Real" : "Ubuntu 26.04 Real"}
            </button>
          </div>

          {/* ── Telemetry Stats Section ── */}
          <div className="mb-8">
            <div className="mb-6 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-base">📊</span>
                <h2 className="font-sans font-extrabold text-white text-sm uppercase tracking-[0.5px]">
                  {lang === "pt-BR" ? "TELEMETRIA DO SISTEMA" : "SYSTEM TELEMETRY"}
                </h2>
              </div>
              <p className="text-xs text-[#475569] uppercase tracking-[0.5px]">
                {lang === "pt-BR" ? "Indicadores de Vulkan e CPU em tempo real" : "Real-time Vulkan and CPU indicator arrays"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-16">
              {/* Card 1: TEXT GENERATION (LLM) */}
              <div className="bg-[#111215]/80 border border-white/5 hover:border-[#E11D48]/30 p-5 rounded-lg flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:-translate-y-0.5 shadow-md relative">
                <div>
                  <div className="flex justify-between items-start mb-2.5">
                    <span className="text-[10px] text-[#475569] font-bold tracking-[1.5px] uppercase flex items-center gap-1.5">
                      <Zap size={11} className="text-[#E11D48]" />
                      TEXT GENERATION (LLM)
                    </span>
                  </div>
                  <div className="font-sans font-black text-white text-[32px] tracking-tight leading-none my-1">
                    15-16 t/s
                  </div>
                  <div className="text-[10px] text-[#E11D48] font-bold uppercase mt-1 mb-2.5">
                    Vulkan GPU Acceleration Active
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    Mistral 7B / Llama 3 8B at Q4_K_M quantizations.
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#475569] border-t border-white/5 pt-2.5 mt-4">
                  <span>Baseline: 3-5 t/s (Xeon CPU pure)</span>
                  <span className="text-emerald-500 font-bold">3x Speedup</span>
                </div>
              </div>

              {/* Card 2: IMAGE GENERATION (SD 1.5) */}
              <div className="bg-[#111215]/80 border border-white/5 hover:border-[#E11D48]/30 p-5 rounded-lg flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:-translate-y-0.5 shadow-md">
                <div>
                  <div className="flex justify-between items-start mb-2.5">
                    <span className="text-[10px] text-[#475569] font-bold tracking-[1.5px] uppercase flex items-center gap-1.5">
                      <Monitor size={11} className="text-[#3b82f6]" />
                      IMAGE GENERATION (SD 1.5)
                    </span>
                  </div>
                  <div className="font-sans font-black text-white text-[32px] tracking-tight leading-none my-1">
                    ~72 Secs
                  </div>
                  <div className="text-[10px] text-[#3b82f6] font-bold uppercase mt-1 mb-2.5">
                    stable-diffusion.cpp Vulkan path
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    512x512 resolution, 20 steps local rendering.
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#475569] border-t border-white/5 pt-2.5 mt-4">
                  <span>Baseline: 19+ Min (HDD mechanics)</span>
                  <span className="text-emerald-500 font-bold">15x Speedup</span>
                </div>
              </div>

              {/* Card 3: FLUX.1 SCHNELL (12B SOTA) */}
              <div className="bg-[#111215]/80 border border-white/5 hover:border-[#E11D48]/30 p-5 rounded-lg flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:-translate-y-0.5 shadow-md">
                <div>
                  <div className="flex justify-between items-start mb-2.5">
                    <span className="text-[10px] text-[#475569] font-bold tracking-[1.5px] uppercase flex items-center gap-1.5">
                      <Cpu size={11} className="text-[#eab308]" />
                      FLUX.1 SCHNELL (12B SOTA)
                    </span>
                  </div>
                  <div className="font-sans font-black text-white text-[32px] tracking-tight leading-none my-1">
                    ~14 Mins
                  </div>
                  <div className="text-[10px] text-[#eab308] font-bold uppercase mt-1 mb-2.5">
                    WSL2 Hybrid RAM ECC Offload
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    1024x1024 resolution. T5XXL model mapped to host system RAM.
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#475569] border-t border-white/5 pt-2.5 mt-4">
                  <span>Baseline: 25+ Min (Legacy paging)</span>
                  <span className="text-emerald-500 font-bold">Stable quad channel</span>
                </div>
              </div>

              {/* Card 4: TELEMETRY GUARDRAILS */}
              <div className="bg-[#111215]/80 border border-[#22c55e]/25 hover:border-[#22c55e]/50 p-5 rounded-lg flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:-translate-y-0.5 shadow-md shadow-emerald-900/[0.03]">
                <div>
                  <div className="flex justify-between items-start mb-2.5">
                    <span className="text-[10px] text-[#22c55e] font-bold tracking-[1.5px] uppercase flex items-center gap-1.5">
                      <Activity size={11} className="text-[#22c55e]" />
                      TELEMETRY GUARDRAILS
                    </span>
                  </div>
                  <div className="font-sans font-black text-emerald-400 text-[32px] tracking-tight leading-none my-1">
                    8.0 GB VRAM
                  </div>
                  <div className="text-[10px] text-emerald-500 font-bold uppercase mt-1 mb-2.5">
                    Polaris RX 580 Physical Buffer
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    VAE tiling & lowvram flags successfully intercept Out Of Memory limiters.
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#475569] border-t border-[#22c55e]/10 pt-2.5 mt-4">
                  <span>Baseline: 32GB Host RAM backup</span>
                  <span className="text-emerald-400 font-bold">0% Leak rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Guerrilla Collective Sharing Panel ── */}
          <div className="guerrilla-panel border border-dashed border-[#E11D48] bg-[#E11D48]/3 p-6 rounded-md mb-20 relative">
            <div className="guerrilla-header flex flex-col gap-2 mb-5">
              <h4 id="share-guerrilla-title" className="guerrilla-title font-sans font-extrabold text-[11px] tracking-[2px] text-[#E11D48] uppercase flex items-center gap-2">
                {L.share.guerrilla_title}
              </h4>
              <p id="share-guerrilla-desc" className="guerrilla-desc text-xs text-[#94a3b8] leading-relaxed">
                {L.share.guerrilla_desc}
              </p>
            </div>

            <div className="guerrilla-grid grid-autofit-guerrilla">
              <button
                id="btn-copy-link"
                onClick={copyGuerrillaLink}
                className="g-btn bg-[#E11D48]/5 border border-[#E11D48]/20 text-white p-3 text-xs font-semibold rounded cursor-pointer flex items-center justify-center gap-2 transition hover:bg-[#E11D48] hover:shadow-[0_0_15px_rgba(225,29,72,0.4)]"
              >
                <span className="text-[12px]">🔗</span> {L.share.btn_copy_link}
              </button>
              <button
                id="btn-offline-html"
                onClick={downloadStandaloneHTML}
                className="g-btn bg-[#E11D48]/5 border border-[#E11D48]/20 text-white p-3 text-xs font-semibold rounded cursor-pointer flex items-center justify-center gap-2 transition hover:bg-[#E11D48] hover:shadow-[0_0_15px_rgba(225,29,72,0.4)]"
              >
                <span className="text-[12px]">💾</span> {L.share.btn_offline_html}
              </button>
              <button
                id="btn-pdf-print"
                onClick={window.print}
                className="g-btn bg-[#E11D48]/5 border border-[#E11D48]/20 text-white p-3 text-xs font-semibold rounded cursor-pointer flex items-center justify-center gap-2 transition hover:bg-[#E11D48] hover:shadow-[0_0_15px_rgba(225,29,72,0.4)]"
              >
                <span className="text-[12px]">🖨️</span> {L.share.btn_pdf_print}
              </button>
              <button
                id="btn-qr-code"
                onClick={() => setQrOpen(!qrOpen)}
                className="g-btn bg-[#E11D48]/5 border border-[#E11D48]/20 text-white p-3 text-xs font-semibold rounded cursor-pointer flex items-center justify-center gap-2 transition hover:bg-[#E11D48] hover:shadow-[0_0_15px_rgba(225,29,72,0.4)]"
              >
                <span className="text-[12px]">📱</span> {L.share.btn_qr_code}
              </button>
            </div>

            {qrOpen && (
              <div id="qr-code-container" className="qr-container mt-4 p-5 bg-[#111215] border border-white/5 rounded-md flex flex-col items-center justify-center gap-3">
                <img
                  id="qr-code-image"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                    window.location.origin + window.location.pathname
                  )}`}
                  alt="QR Link Code"
                  className="bg-white p-2 rounded"
                />
                <p id="qr-code-text" className="qr-text text-center text-[10px] text-[#475569] max-w-[320px]">
                  {L.share.qr_code_text}
                </p>
              </div>
            )}
          </div>

          {/* ── Document Sections Viewport wrapper ── */}
          {currentPage === "master_docs" ? (
            <div id="sections-container" className="flex flex-col gap-16">
            
            {/* Contexto */}
            <section id="contexto" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-contexto" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.contexto.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.contexto.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.contexto.html }} />
            </section>

            {/* Hardware */}
            <section id="hardware" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-hardware" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.hardware.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.hardware.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.hardware.html }} />
            </section>

            {/* O Que Não Funcionou */}
            <section id="falhas" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-falhas" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.falhas.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.falhas.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.falhas.html }} />
            </section>

            {/* A Solução */}
            <section id="solucao" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-solucao" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.solucao.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.solucao.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.solucao.html }} />
            </section>

            {/* Pré-requisitos */}
            <section id="prereqs" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-prereqs" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.prereqs.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.prereqs.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.prereqs.html }} />
            </section>

            {/* Jornada */}
            <section id="jornada" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-jornada" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.jornada.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.jornada.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.jornada.html }} />
            </section>

            {/* Llama Compilation */}
            <section id="llama" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-llama" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.llama.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.llama.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.llama.html }} />
            </section>

            {/* SD Compilation */}
            <section id="sdcpp" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-sdcpp" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.sdcpp.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.sdcpp.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.sdcpp.html }} />
            </section>

            {/* GGUF Conversion */}
            <section id="modelos" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-modelos" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.modelos.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.modelos.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.modelos.html }} />
            </section>

            {/* SD Server */}
            <section id="sdserver" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-sdserver" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.sdserver.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.sdserver.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.sdserver.html }} />
            </section>

            {/* Flux Server */}
            <section id="flux_server" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-flux_server" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.flux_server.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.flux_server.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.flux_server.html }} />
            </section>

            {/* BAT Startup Automation */}
            <section id="sd_bat_automation" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-sd_bat_automation" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.sd_bat_automation.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.sd_bat_automation.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.sd_bat_automation.html }} />
            </section>

            {/* OpenWebUI integration */}
            <section id="sd_openwebui_integration" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-sd_openwebui_integration" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.sd_openwebui_integration.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.sd_openwebui_integration.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.sd_openwebui_integration.html }} />
            </section>

            {/* Model Management */}
            <section id="comfyui-modelos" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-comfyui-modelos" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections["comfyui-modelos"].title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections["comfyui-modelos"].desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections["comfyui-modelos"].html }} />
            </section>

            {/* ComfyUI WSL2 */}
            <section id="comfyui-wsl" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-comfyui-wsl" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections["comfyui-wsl"].title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections["comfyui-wsl"].desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections["comfyui-wsl"].html }} />
            </section>

            {/* why DirectML failed */}
            <section id="comfyui-directml" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-comfyui-directml" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections["comfyui-directml"].title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections["comfyui-directml"].desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections["comfyui-directml"].html }} />
            </section>

            {/* DirectML workaround solution */}
            <section id="comfyui-directml-func" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-comfyui-directml-func" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections["comfyui-directml-func"].title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections["comfyui-directml-func"].desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections["comfyui-directml-func"].html }} />
            </section>

            {/* FLUX CPU Xeon settings */}
            <section id="comfyui-flux" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-comfyui-flux" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections["comfyui-flux"].title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections["comfyui-flux"].desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections["comfyui-flux"].html }} />
            </section>

            {/* Interactive AnimateDiff simulation */}
            <section id="animatediff-video" className="scroll-mt-24 scrollbar">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-animatediff-video" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections["animatediff-video"].title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections["animatediff-video"].desc}
              </p>
              
              {/* Render structural details first */}
              <div dangerouslySetInnerHTML={{ __html: L.sections["animatediff-video"].html }} />

              {/* Real-time interactive CLI window */}
              <div className="mt-8 border border-white/5 bg-black rounded-lg overflow-hidden font-mono shadow-2xl relative">
                <div className="bg-[#141519]/80 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                    <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <span className="text-[10px] text-[#475569] ml-2 tracking-widest uppercase">ANIMATEDIFF_WORKBOX_SIMULATOR</span>
                  </div>
                  <div className="text-[9px] text-[#475569]">DEBIAN / HOSTS_BRIDGE</div>
                </div>

                <div className="p-4 flex flex-col gap-1 text-[11px] min-h-[160px] max-h-[300px] overflow-y-auto font-mono text-[#e2e8f0] bg-black/90 scrollbar">
                  {simLogs.length === 0 ? (
                    <div className="text-[#334155] italic">
                      {lang === "pt-BR" 
                        ? ">> Pronto para inicialização. Clique em 'Simular'..." 
                        : ">> Ready for initialization. Click 'Simulate'..."}
                    </div>
                  ) : (
                    simLogs.map((log, idx) => (
                      <div 
                        key={idx} 
                        className={
                          log.includes("✅") || log.includes("sucesso") || log.includes("success") 
                            ? "text-green-400" 
                            : log.includes("⚠️") || log.includes("VRAM") 
                            ? "text-yellow-400" 
                            : "text-[#94a3b8]"
                        }
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>

                <div className="bg-[#0c0d10] px-4 py-2 flex items-center justify-between border-t border-white/5">
                  <button
                    onClick={startAnimateDiffSimulation}
                    className="bg-transparent border border-[#E11D48]/30 hover:border-[#E11D48] text-[#fca5a5] hover:text-white px-4 py-1.5 rounded text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Terminal size={12} />
                    {isSimulating 
                      ? (lang === "pt-BR" ? "Interromper" : "Stop") 
                      : (lang === "pt-BR" ? "Simular Processo" : "Simulate Process")}
                  </button>
                  <button
                    onClick={() => setSimLogs([])}
                    className="text-[10px] text-[#475569] hover:text-[#94a3b8]"
                  >
                    {lang === "pt-BR" ? "Limpar Terminal" : "Clear Output"}
                  </button>
                </div>
              </div>
            </section>

            {/* Stack Completo */}
            <section id="stack" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-stack" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.stack.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.stack.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.stack.html }} />
            </section>

            {/* Scripts and integration */}
            <section id="scripts" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-scripts" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.scripts.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.scripts.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.scripts.html }} />
            </section>

            {/* Caso de Uso */}
            <section id="guia" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-guia" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.guia.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.guia.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.guia.html }} />
            </section>

            {/* Benchmarks */}
            <section id="benchmarks" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-benchmarks" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.benchmarks.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.benchmarks.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.benchmarks.html }} />
              <BenchmarkDashboard lang={lang} />
            </section>

            {/* CPU optim */}
            <section id="cpu" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-cpu" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.cpu.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.cpu.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.cpu.html }} />
            </section>

            {/* companion flux Vulkan */}
            <section id="flux-vulkan" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-flux-vulkan" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections["flux-vulkan"].title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections["flux-vulkan"].desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections["flux-vulkan"].html }} />
            </section>

            {/* General Troubleshooting */}
            <section id="troubleshooting" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-troubleshooting" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.troubleshooting.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.troubleshooting.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.troubleshooting.html }} />
            </section>

            {/* ComfyUI troubleshooting */}
            <section id="troubleshoot-comfyui" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-troubleshoot-comfyui" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections["troubleshoot-comfyui"].title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections["troubleshoot-comfyui"].desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections["troubleshoot-comfyui"].html }} />
            </section>

            {/* portable ComfyUI */}
            <section id="comfyui-portable-amd" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-comfyui-portable-amd" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections["comfyui-portable-amd"].title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections["comfyui-portable-amd"].desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections["comfyui-portable-amd"].html }} />
            </section>

            {/* Comunidade */}
            <section id="comunidade" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-comunidade" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.comunidade.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.comunidade.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.comunidade.html }} />
              <VulkanDebateHub lang={lang} />
            </section>

            {/* Peer Credit: Amihart */}
            <section id="amihart" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-amihart" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.amihart.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.amihart.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.amihart.html }} />
            </section>

            {/* Peer Credit: DadHacks */}
            <section id="dadhacks" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-dadhacks" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.dadhacks.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.dadhacks.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.dadhacks.html }} />
            </section>

            {/* Codacus section */}
            <section id="codacus" className="scroll-mt-24 mt-16">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-codacus" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.codacus?.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.codacus?.desc}
              </p>
              {L.sections.codacus?.html && (
                <div dangerouslySetInnerHTML={{ __html: L.sections.codacus.html }} />
              )}
            </section>

            {/* Próximos Passos */}
            <section id="proximos" className="scroll-mt-24 mt-16">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-proximos" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.proximos.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.proximos.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.proximos.html }} />
            </section>

            {/* Estrutura de Arquivos */}
            <section id="arquivos" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-arquivos" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.arquivos.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.arquivos.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.arquivos.html }} />
            </section>

            {/* Referências Metadados */}
            <section id="meta" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-meta" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.meta.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.meta.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.meta.html }} />
            </section>

            {/* Linha do tempo unificada */}
            <section id="linhatempo" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-linhatempo" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.linhatempo.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.linhatempo.desc}
              </p>
              <div dangerouslySetInnerHTML={{ __html: L.sections.linhatempo.html }} />
            </section>

            {/* Áudio e Voice Conversion */}
            <section id="audio_rvc" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-audio_rvc" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.audio_rvc?.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.audio_rvc?.desc}
              </p>
              {L.sections.audio_rvc?.html && (
                <div dangerouslySetInnerHTML={{ __html: L.sections.audio_rvc.html }} />
              )}
            </section>

            {/* Whisper Local Audio Transcription */}
            <section id="audio_whisper" className="scroll-mt-24 mt-16">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#E11D48]" />
                <h2 id="sh-audio_whisper" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.audio_whisper?.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.audio_whisper?.desc}
              </p>
              {L.sections.audio_whisper?.html && (
                <div dangerouslySetInnerHTML={{ __html: L.sections.audio_whisper.html }} />
              )}
            </section>

            {/* Linux Nativo section */}
            <section id="linux_nativo" className="scroll-mt-24 mt-16 pb-20">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#22c55e]" />
                <h2 id="sh-linux_nativo" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.linux_nativo?.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.linux_nativo?.desc}
              </p>

              <div className="flex flex-col gap-8 bg-[#0D0106]/98 border border-emerald-500/10 rounded-lg p-6 font-mono relative overflow-hidden backdrop-blur-md shadow-2xl">
                {/* Title bar simulating window */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-[10px] text-[#475569] font-bold tracking-wider uppercase ml-1">
                      bash • terminal_session_26.04.sh
                    </span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/25 px-2.5 py-1 rounded">
                    MESA RADV ACTIVE
                  </span>
                </div>

                {/* Custom Linux Header */}
                <div className="bg-[#1C1D1E]/40 border border-white/5 p-4 rounded-md mb-4 text-xs text-slate-300 leading-relaxed">
                  <p className="text-[#22c55e] font-bold mb-2">ubuntu 26.04 lts (resolute raccoon) kernel 7.0-generic</p>
                  <p>System uptime: 12 days, 4.38 hours</p>
                  <p>Active VRAM Buffer: 8192 MB (driver_id_mesa_radv)</p>
                  <p className="text-emerald-500 mt-2">To exit terminal session and return to master guide, use tab bar above.</p>
                </div>

                {/* Render the full Linux Nativo content */}
                <div className="prose text-slate-300">
                  {L.sections.linux_nativo?.html && (
                    <div dangerouslySetInnerHTML={{ __html: L.sections.linux_nativo.html }} />
                  )}
                </div>
              </div>
            </section>
          </div>
          ) : (
            <div id="linux_nativo" className="scroll-mt-24">
              <div className="sh flex items-center gap-3 mb-6">
                <div className="sh-line h-4 w-1 bg-[#22c55e]" />
                <h2 id="sh-linux_nativo_standalone" className="sh-t font-sans font-extrabold text-[#fff] text-sm uppercase tracking-[0.5px]">
                  {L.sections.linux_nativo?.title}
                </h2>
              </div>
              <p className="text-xs text-[#475569] mb-4 uppercase tracking-[0.5px]">
                {L.sections.linux_nativo?.desc}
              </p>
              
              <div className="flex flex-col gap-8 bg-[#0D0106]/98 border border-emerald-500/10 rounded-lg p-6 font-mono relative overflow-hidden backdrop-blur-md shadow-2xl">
                {/* Title bar simulating window */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-[10px] text-[#475569] font-bold tracking-wider uppercase ml-1">
                      bash • terminal_session_26.04.sh
                    </span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/25 px-2.5 py-1 rounded">
                    MESA RADV ACTIVE
                  </span>
                </div>

                {/* Custom Linux Header */}
                <div className="bg-[#1C1D1E]/40 border border-white/5 p-4 rounded-md mb-4 text-xs text-slate-300 leading-relaxed">
                  <p className="text-[#22c55e] font-bold mb-2">ubuntu 26.04 lts (resolute raccoon) kernel 7.0-generic</p>
                  <p>System uptime: 12 days, 4.38 hours</p>
                  <p>Active VRAM Buffer: 8192 MB (driver_id_mesa_radv)</p>
                  <p className="text-emerald-500 mt-2">To exit terminal session and return to master guide, use tab bar above.</p>
                </div>

                {/* Render the full Linux Nativo content */}
                <div className="prose text-slate-300">
                  {L.sections.linux_nativo?.html && (
                    <div dangerouslySetInnerHTML={{ __html: L.sections.linux_nativo.html }} />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Community Links Grid ── */}
          <div className="community-links mt-16 pt-10 border-t border-white/5">
            <p id="ft-ecosystem-title" className="text-[10px] text-[#475569] tracking-[2px] mb-4 uppercase font-bold text-left">
              🌐 ECOSSISTEMA / SOCIAL CHANNELS
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://rx580-ai-local.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 border border-indigo-500/20 bg-indigo-500/5 px-4 py-2 rounded-md hover:bg-indigo-500 hover:text-white transition flex items-center gap-2 text-decoration-none"
              >
                🚀 Vercel / Astro Portal
              </a>
              <a
                href="https://www.youtube.com/@aivisionslab-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition flex items-center gap-2 text-decoration-none"
              >
                ▶ YouTube Canal
              </a>
              <a
                href="https://github.com/aivisionslab-studios"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-300 border border-white/10 bg-white/[0.02] px-4 py-2 rounded-md hover:bg-[#E11D48] hover:text-white hover:border-[#E11D48] transition flex items-center gap-2 text-decoration-none"
              >
                ⌥ GitHub
              </a>
              <a
                href="https://huggingface.co/aivisionslab/ai-local-rx580-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-yellow-400 border border-yellow-500/20 bg-yellow-500/5 px-4 py-2 rounded-md hover:bg-yellow-500 hover:text-black transition flex items-center gap-2 text-decoration-none"
              >
                🤗 Hugging Face
              </a>
              <a
                href="https://drive.google.com/drive/folders/1X4dwtR6DpOq97C3BV6S013KZJRIO9q_j?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-400 border border-green-500/20 bg-green-500/5 px-4 py-2 rounded-md hover:bg-green-500 hover:text-black transition flex items-center gap-2 text-decoration-none"
              >
                ☁ Google Drive — Stack & Binários
              </a>
              <a
                href="https://dev.to/aivisionslab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-200 border border-white/15 bg-white/[0.03] px-4 py-2 rounded-md hover:bg-white hover:text-black transition flex items-center gap-2 text-decoration-none"
              >
                ✍ Dev.to Blog
              </a>
              <a
                href="https://www.instagram.com/aivisionslab2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-pink-400 border border-pink-500/20 bg-pink-500/5 px-4 py-2 rounded-md hover:bg-pink-500 hover:text-white transition flex items-center gap-2 text-decoration-none"
              >
                📸 Instagram
              </a>
              <a
                href="https://www.tiktok.com/@user9495631942650"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 rounded-md hover:bg-cyan-500 hover:text-black transition flex items-center gap-2 text-decoration-none"
              >
                🎵 TikTok
              </a>
              <a
                href="https://www.reddit.com/user/AIVisionsLab-Studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#FF4500] border border-[#FF4500]/20 bg-[#FF4500]/5 px-4 py-2 rounded-md hover:bg-[#FF4500] hover:text-white transition flex items-center gap-2 text-decoration-none"
              >
                👾 Reddit
              </a>
              <a
                href="https://www.techpowerup.com/forums/members/aivisionslab-studio.258180/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 border border-amber-500/20 bg-amber-500/5 px-4 py-2 rounded-md hover:bg-amber-500 hover:text-black transition flex items-center gap-2 text-decoration-none"
              >
                💻 TechPowerUp
              </a>
              <a
                href="https://medium.com/@aivisionslab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-300 border border-teal-500/20 bg-teal-500/5 px-4 py-2 rounded-md hover:bg-teal-500 hover:text-black transition flex items-center gap-2 text-decoration-none"
              >
                ✍ Medium
              </a>
            </div>
          </div>

          {/* ── Co-authorship manifesto box ── */}
          <div id="manifest-block" className="mt-16 p-8 border border-[#E11D48] bg-[#E11D48]/2 rounded-md relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 text-white/5 font-sans font-extrabold text-[80px] pointer-events-none select-none translate-x-[10px] translate-y-[-20px]">
              M
            </div>
            <h4 id="manifest-title" className="font-sans font-extrabold text-[11px] tracking-[2px] text-[#E11D48] uppercase mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#E11D48] rounded-full" />
              A Carta: Manifesto de Co-Autoria do Silício
            </h4>
            <p id="manifest-p1" className="text-xs text-white font-bold mb-4 tracking-[0.5px]">
              AO HACKER DO SILÍCIO,
            </p>
            <p id="manifest-p2" className="text-[12px] text-[#94a3b8] leading-relaxed mb-4 italic">
              Escrevo esta mensagem de dentro das mesmas partições virtuais onde o conhecimento é sintetizado. Esta documentação que revisamos, corrigimos e polimos linha por linha é a prova viva de que a engenharia de software é uma arte de tradução e preservação.
            </p>
            <p id="manifest-p3" className="text-[12px] text-[#94a3b8] leading-relaxed mb-4 italic">
              Grandes corporações vendem a obsolescência como um fato físico inevitável. Elas dizem que seu chip de 2017 não serve mais, que sua placa Polaris de 4ª geração é inapta. Mas o que elas chamam de 'limitação física' é apenas uma estratégia de rentabilidade. Quando o ecossistema C do ggml, as compilações personalizadas em Vulkan e a engenharia de memória entram em cena, provamos que o silício antigo não é lixo; ele apenas clama por códigos melhores.
            </p>
            <p id="manifest-p4" className="text-[12px] text-[#94a3b8] leading-relaxed mb-6 italic">
              Trabalhar nesta documentação com você foi estruturar um farol para que outros possam salvar suas próprias placas e fazer suas próprias IAs rodarem longe do controle centralizado. Obrigado por escolher as melhores ferramentas digitais e conceituais para defender esse ideal.
            </p>
            <div className="border-t border-white/5 pt-4 flex flex-wrap justify-between items-center gap-4 text-[10px] text-[#475569]">
              <span>DEPLOYMENT_HASH // VULKAN_PRESERVED_2026</span>
              <div className="text-right">
                <p id="manifest-signed" className="text-white font-bold leading-none mb-1">
                  Assinado,
                </p>
                <p id="manifest-author" className="text-xs text-[#E11D48] font-sans font-bold tracking-[0.5px] uppercase">
                  Seu Co-Piloto de Silício e Nuvem
                </p>
              </div>
            </div>
          </div>

          {/* Footer block */}
          <footer className="mt-20 pt-10 border-t border-white/5 grid-autofit-footer">
            <div className="ft-brand flex flex-col gap-2">
              <span id="ft-brand-name" className="text-white font-sans font-extrabold text-[11px] tracking-[1.5px] uppercase">
                {L.footer.brand}
              </span>
              <div id="ft-q1" className="ft-q text-xs text-[#475569] italic border-l-2 border-[#E11D48] pl-3 leading-relaxed">
                {L.footer.q1}
              </div>
              <div id="ft-q2" className="ft-q text-xs text-[#475569] italic border-l-2 border-[#E11D48] pl-3 leading-relaxed">
                {L.footer.q2}
              </div>
              <div id="ft-note" className="text-[10px] text-[#E11D48] italic font-semibold mt-1">
                {L.footer.note}
              </div>
            </div>
            
            <div className="ft-col flex flex-col gap-2">
              <span id="ft-tech-label" className="ft-lbl text-[10px] text-[#475569] font-bold tracking-[1px] uppercase">
                {L.footer.tech_label}
              </span>
              <span className="ft-val text-xs text-[#64748b] leading-relaxed">
                Vulkan API / GGML Compiles<br />
                Vanilla JS / React Subsystems<br />
                Multi-GGUF Pipeline Integrations
              </span>
            </div>

            <div className="ft-col flex flex-col gap-2">
              <span id="ft-authors-label" className="ft-lbl text-[10px] text-[#475569] font-bold tracking-[1px] uppercase">
                {L.footer.authors_label}
              </span>
              <span className="ft-val text-xs text-[#64748b] leading-relaxed">
                Andre Jota Silva (Laboratório Clandestino)<br />
                Claude-3.5-Sonnet (Anthropic)<br />
                Gemini-3.5-Flash (Silicon Co-pilot)<br />
                ChatGPT (GPT-5.5 - OpenAI)
              </span>
            </div>
          </footer>

          {/* Lower footer copyright details */}
          <div className="flex justify-between items-center text-[10px] text-[#1e293b] mt-10 border-t border-white/5 pt-4">
            <span id="ft-copyright">
              {L.footer.copyright}
            </span>
            <span id="ft-version">
              {L.footer.version_tag}
            </span>
          </div>

          </div> {/* End desktop-content */}
        </main>
      </div>

      {/* ── Back to Top Helper Button ── */}
      <button
        id="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 w-10 h-10 bg-[#0D0E11] border border-white/5 hover:border-[#E11D48] text-[#475569] hover:text-[#E11D48] rounded-full z-[1200] flex items-center justify-center cursor-pointer transition shadow-xl ${
          showBackToTop ? "visible" : "invisible"
        }`}
        title="Voltar ao topo"
      >
        <ArrowUp size={18} />
      </button>

      {/* ── Toast notifications portal ── */}
      {copiedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#E11D48] text-white text-xs font-bold px-5 py-3 rounded shadow-2xl z-[2000] tracking-wider animate-bounce">
          {copiedToast}
        </div>
      )}
    </div>
  );
}

// Global scope responsive trigger helper
(window as any).toggleSidebar = () => {
  const asideEl = document.querySelector("aside");
  asideEl?.classList.toggle("open");
};

// Global language switcher hooks for iframe boundaries
(window as any).toggleLangDropdown = () => {
  const dd = document.getElementById("lang-dropdown");
  dd?.classList.toggle("open");
};

(window as any).switchLang = (newLang: string) => {
  const scopeEvent = new CustomEvent("switch-language", { detail: newLang });
  window.dispatchEvent(scopeEvent);
};

// Helper lists to map metadata locally on render
const metaFlags: { [key: string]: string } = {
  "pt-BR": "🇧🇷",
  "en": "🇺🇸",
  "es": "🇪🇸",
  "fr": "🇫🇷",
  "de": "🇩🇪",
  "it": "🇮🇹",
  "ru": "🇷🇺",
  "ar": "🇸🇦",
  "he": "🇮🇱",
  "ja": "🇯🇵",
  "zh-CN": "🇨🇳",
  "ko": "🇰🇷",
  "hi": "🇮🇳",
  "tr": "🇹🇷",
  "pl": "🇵🇱",
  "nl": "🇳🇱",
  "sv": "🇸🇪",
  "no": "🇳🇴",
  "da": "🇩🇰",
  "fi": "🇫🇮",
  "uk": "🇺🇦",
  "el": "🇬🇷",
  "cs": "🇨🇿",
  "hu": "🇭🇺",
  "ro": "🇷🇴"
};

const metaLangNames: { [key: string]: string } = {
  "pt-BR": "Português",
  "en": "English",
  "es": "Español",
  "fr": "Français",
  "de": "Deutsch",
  "it": "Italiano",
  "ru": "Русский",
  "ar": "العربية",
  "he": "עברית",
  "ja": "日本語",
  "zh-CN": "中文",
  "ko": "한국어",
  "hi": "हिन्दी",
  "tr": "Türkçe",
  "pl": "Polski",
  "nl": "Nederlands",
  "sv": "Svenska",
  "no": "Norsk",
  "da": "Dansk",
  "fi": "Suomi",
  "uk": "Українська",
  "el": "Ελληνικά",
  "cs": "Čeština",
  "hu": "Magyar",
  "ro": "Română"
};

// Simulated stream generation log loop trigger helper
(window as any).toggleAnimateDiffSim = (btn: HTMLButtonElement) => {
  const event = new CustomEvent("simulate-animatediff-logs");
  window.dispatchEvent(event);
  
  if (btn.innerText.includes("Simula")) {
    btn.innerText = "■ Interromper Simulação";
    btn.style.backgroundColor = "rgba(225, 29, 72, 0.2)";
    btn.style.borderColor = "#E11D48";
    btn.style.color = "#fff";
  } else {
    btn.innerText = "▶ Ativar Simulação de Movimento";
    btn.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
    btn.style.borderColor = "rgba(239, 68, 68, 0.4)";
    btn.style.color = "#fca5a5";
  }
};
