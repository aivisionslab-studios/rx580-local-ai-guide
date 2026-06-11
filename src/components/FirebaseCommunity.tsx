import { useState, useEffect } from "react";
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { 
  Terminal, 
  Cpu, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  Send, 
  Trash2, 
  Plus, 
  Database, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  auth, 
  db, 
  signInWithGoogle, 
  logoutUser, 
  handleFirestoreError, 
  OperationType 
} from "../lib/firebase";

// Custom interface matching schema definitions in blueprint
interface Message {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  content: string;
  category: "general" | "benchmark" | "error";
  createdAt: any;
}

interface BenchmarkSubmission {
  id: string;
  userId: string;
  userName: string;
  gpuModel: string;
  cpuModel: string;
  os: "windows" | "wsl2" | "ubuntu";
  llmSpeed: number;
  sdTime: number;
  fluxTime?: number;
  createdAt: any;
}

export function CommentBoard({ lang }: { lang: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Form states
  const [newContent, setNewContent] = useState("");
  const [category, setCategory] = useState<"general" | "benchmark" | "error">("general");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Labels for translation support
  const text = {
    "pt-BR": {
      title: "PAINEL DE DISCUSSÃO COMUNITÁRIA",
      subtitle: "Interações em tempo real via Firebase Firestore",
      loginBtn: "Entrar com Google para Comentar",
      logoutBtn: "Desconectar",
      placeholder: "Digite sua dúvida, dica ou feedback de otimização...",
      sendBtn: "Enviar Mensagem",
      all: "Todos",
      general: "Geral",
      benchmark: "Discussão de Benchmark",
      error: "Relato de Erro / Falha",
      noMessages: "Nenhuma mensagem encontrada nesta categoria. Seja o primeiro a postar!",
      deleteTooltip: "Excluir sua mensagem",
      authRequired: "Você precisa fazer login para postar uma mensagem.",
      charLimit: "Limite: 0 / 2000 caracteres",
      copied: "Copiado!"
    },
    en: {
      title: "COMMUNITY DISCUSSION BOARD",
      subtitle: "Real-time communication powered by Firebase Firestore",
      loginBtn: "Sign in with Google to Comment",
      logoutBtn: "Log Out",
      placeholder: "Type your questions, optimization tips, or feedback...",
      sendBtn: "Send Message",
      all: "All",
      general: "General",
      benchmark: "Benchmark Chat",
      error: "Error Report / Failures",
      noMessages: "No messages found in this category. Be the first to post!",
      deleteTooltip: "Delete your message",
      authRequired: "You must be signed in to post a message.",
      charLimit: "Limit: 0 / 2000 characters",
      copied: "Copied!"
    }
  }[lang === "pt-BR" ? "pt-BR" : "en"];

  // Authenticated state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Real-time messages sync
  useEffect(() => {
    const messagesCollection = collection(db, "messages");
    const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const list: Message[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Message);
        });
        setMessages(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, "messages");
      }
    );

    return unsubscribe;
  }, []);

  const handlePostMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!newContent.trim()) return;

    if (newContent.length > 2000) {
      setErrorText(lang === "pt-BR" ? "A mensagem excede o limite de 2000 caracteres." : "Your message exceeds the 2000 characters limit.");
      return;
    }

    setIsSubmitting(true);
    setErrorText(null);

    const messageId = "msg_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6);
    const messageDocRef = doc(db, "messages", messageId);

    const messagePayload = {
      id: messageId,
      userId: currentUser.uid,
      userName: currentUser.displayName || "Anonymous Hacker",
      userPhoto: currentUser.photoURL || "",
      content: newContent,
      category: category,
      createdAt: new Date(), // using local timestamp with server mapping compatibility
    };

    try {
      // Create/write document
      await setDoc(messageDocRef, messagePayload);
      setNewContent("");
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.CREATE, `messages/${messageId}`);
      } catch (uiErr: any) {
        setErrorText(uiErr.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!currentUser) return;
    if (!window.confirm(lang === "pt-BR" ? "Deseja realmente excluir esta mensagem?" : "Do you really want to delete this message?")) return;

    const messageDocRef = doc(db, "messages", messageId);
    try {
      await deleteDoc(messageDocRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `messages/${messageId}`);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (activeFilter === "all") return true;
    return msg.category === activeFilter;
  });

  return (
    <div className="bg-[#111215] border border-white/5 rounded-xl p-6 shadow-2xl relative overflow-hidden mt-8">
      {/* Visual cyber line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[#E11D48] shadow-[0_0_12px_#E11D48]" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 mb-6 gap-4">
        <div>
          <h2 className="font-sans font-extrabold text-[#fff] text-xs tracking-[1px] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#E11D48] rounded-full animate-ping" />
            {text.title}
          </h2>
          <p className="text-[10px] text-[#475569] uppercase font-mono mt-0.5">
            {text.subtitle}
          </p>
        </div>

        {/* User login actions */}
        <div>
          {authLoading ? (
            <div className="text-[10px] text-[#475569] animate-pulse">Checking credentials...</div>
          ) : currentUser ? (
            <div className="flex items-center gap-3 bg-[#E11D48]/5 border border-[#E11D48]/15 px-3 py-1.5 rounded-md">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt={currentUser.displayName || ""} className="w-5 h-5 rounded-full referrerPath-none" referrerPolicy="no-referrer" />
              ) : (
                <UserIcon size={14} className="text-[#E11D48]" />
              )}
              <span className="text-[11px] text-white font-bold">{currentUser.displayName}</span>
              <button 
                onClick={logoutUser} 
                className="text-[10px] text-[#ef4444] hover:text-white transition flex items-center gap-1 cursor-pointer bg-none border-none pl-2 border-l border-white/10"
                title={text.logoutBtn}
              >
                <LogOut size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="px-3.5 py-1.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-[11px] font-bold rounded-md cursor-pointer flex items-center gap-2 transition shadow-md shadow-[#E11D48]/10 select-none"
            >
              <LogIn size={13} />
              {text.loginBtn}
            </button>
          )}
        </div>
      </div>

      {errorText && (
        <div className="bg-red-500/10 border border-red-500/30 text-rose-300 text-[11px] p-3.5 rounded-md mb-5 flex items-start gap-2.5">
          <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
          <p>{errorText}</p>
        </div>
      )}

      {/* Input Message Form */}
      {currentUser ? (
        <form onSubmit={handlePostMessage} className="mb-8 p-4 bg-black/40 rounded-lg border border-white/[0.02]">
          <div className="flex gap-2 mb-3">
            {(["general", "benchmark", "error"] as const).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded cursor-pointer border transition-all ${
                  category === cat
                    ? "bg-[#E11D48]/15 border-[#E11D48] text-white"
                    : "bg-white/[0.02] border-white/5 text-[#475569] hover:text-white"
                }`}
              >
                {cat === "general" ? text.general : cat === "benchmark" ? text.benchmark : text.error}
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder={text.placeholder}
              rows={3}
              maxLength={2000}
              className="w-full bg-[#141519] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#E11D48]/60 placeholder-[#475569] font-mono resize-none"
            />
            <div className="absolute right-3.5 bottom-3 text-[9px] text-[#475569]">
              {newContent.length} / 2000
            </div>
          </div>

          <div className="flex justify-end mt-2.5">
            <button
              type="submit"
              disabled={isSubmitting || !newContent.trim()}
              className="px-4 py-2 bg-[#E11D48] hover:bg-[#BE123C] disabled:bg-white/[0.02] disabled:text-[#475569] text-white text-[11px] font-bold rounded-md flex items-center gap-2 cursor-pointer transition select-none border-0"
            >
              <Send size={12} />
              {isSubmitting ? "Sincronizando..." : text.sendBtn}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 bg-white/[0.01] rounded-lg border border-dashed border-white/5 text-center text-xs text-[#475569] mb-8 font-sans">
          🔒 {text.authRequired}
        </div>
      )}

      {/* Categories Filtering tabs */}
      <div className="flex gap-1.5 border-b border-white/5 pb-3.5 mb-5 overflow-x-auto">
        {(["all", "general", "benchmark", "error"] as const).map((filterKey) => (
          <button
            key={filterKey}
            onClick={() => setActiveFilter(filterKey)}
            className={`px-3 py-1.5 text-[10.5px] font-semibold tracking-wider font-sans uppercase rounded cursor-pointer transition-all ${
              activeFilter === filterKey
                ? "bg-[#E11D48] text-white"
                : "bg-white/[0.02] text-[#475569] hover:text-[#94a3b8]"
            }`}
          >
            {filterKey === "all"
              ? text.all
              : filterKey === "general"
              ? text.general
              : filterKey === "benchmark"
              ? text.benchmark
              : text.error}
          </button>
        ))}
      </div>

      {/* Messages Render list */}
      <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto scrollbar pr-1">
        {filteredMessages.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#475569] italic">
            {text.noMessages}
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`p-4 rounded-lg border bg-[#0B0C0E]/50 flex gap-4 items-start ${
                msg.category === "error" 
                  ? "border-[#ef4444]/25" 
                  : msg.category === "benchmark" 
                  ? "border-[#3b82f6]/20" 
                  : "border-white/5"
              }`}
            >
              {msg.userPhoto ? (
                <img src={msg.userPhoto} alt={msg.userName} className="w-8 h-8 rounded-full border border-white/10 shrink-0 select-none referrerPath-none" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#1e293b] border border-white/10 shrink-0 flex items-center justify-center text-gray-400 select-none font-bold uppercase text-[10px]">
                  {msg.userName.slice(0, 2)}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2.5 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-white font-sans">{msg.userName}</span>
                    <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                      msg.category === "error"
                        ? "bg-red-500/10 text-rose-300 border border-red-500/20"
                        : msg.category === "benchmark"
                        ? "bg-blue-500/10 text-blue-300 border border-blue-500/25"
                        : "bg-white/[0.04] text-slate-300 border border-white/10"
                    }`}>
                      {msg.category === "general" ? text.general : msg.category === "benchmark" ? text.benchmark : text.error}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-[9px] text-[#475569]">
                      {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : new Date(msg.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}
                    </span>
                    {currentUser && currentUser.uid === msg.userId && (
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-[#475569] hover:text-[#f87171] transition p-1 cursor-pointer bg-none border-none"
                        title={text.deleteTooltip}
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed mt-2.5 break-all max-w-full font-mono">
                  {msg.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function BenchmarkDashboard({ lang }: { lang: string }) {
  const [submissions, setSubmissions] = useState<BenchmarkSubmission[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check if we start in offline fallback mode or active database
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return localStorage.getItem("rx580_local_benchmarks") !== null;
  });

  // Form Submission states
  const [gpuModel, setGpuModel] = useState("Sapphire Nitro RX 580 8GB");
  const [cpuModel, setCpuModel] = useState("Intel Xeon E5-2670 v3");
  const [os, setOs] = useState<"windows" | "wsl2" | "ubuntu">("windows");
  const [llmSpeed, setLlmSpeed] = useState<number>(15.5);
  const [sdTime, setSdTime] = useState<number>(72);
  const [fluxTime, setFluxTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [successText, setSuccessText] = useState<string | null>(null);

  // Default seed dataset
  const SEED_BENCHMARKS: BenchmarkSubmission[] = [
    {
      id: "bench_1",
      userId: "user_felipe",
      userName: "Felipe_AMD",
      gpuModel: "Sapphire Nitro RX 580 8GB",
      cpuModel: "Ryzen 5 5600",
      os: "windows",
      llmSpeed: 18.2,
      sdTime: 65,
      fluxTime: 25.5,
      createdAt: new Date("2026-06-05T12:00:00Z")
    },
    {
      id: "bench_2",
      userId: "user_renato",
      userName: "Renato_Nvidia",
      gpuModel: "PowerColor Red Devil RX 580",
      cpuModel: "Intel i7-4790K",
      os: "windows",
      llmSpeed: 10.4,
      sdTime: 82,
      fluxTime: 35.0,
      createdAt: new Date("2026-06-06T15:30:00Z")
    },
    {
      id: "bench_3",
      userId: "user_wsl",
      userName: "WSL2_Dev",
      gpuModel: "XFX GTS XXX RX 580 8GB",
      cpuModel: "Intel i5-12400F",
      os: "wsl2",
      llmSpeed: 15.0,
      sdTime: 72,
      fluxTime: 29.1,
      createdAt: new Date("2026-06-07T18:45:00Z")
    },
    {
      id: "bench_4",
      userId: "user_linux",
      userName: "LinuxPioneer",
      gpuModel: "ASUS Dual RX 580 8GB",
      cpuModel: "Ryzen 7 3700X",
      os: "ubuntu",
      llmSpeed: 21.3,
      sdTime: 55,
      fluxTime: 20.2,
      createdAt: new Date("2026-06-08T09:12:00Z")
    }
  ];

  const getLocalBenchmarks = (): BenchmarkSubmission[] => {
    try {
      const stored = localStorage.getItem("rx580_local_benchmarks");
      if (stored) {
        return JSON.parse(stored).map((b: any) => ({
          ...b,
          createdAt: b.createdAt ? new Date(b.createdAt) : new Date()
        }));
      }
    } catch (e) {
      console.error("Failed to parse local benchmarks:", e);
    }
    localStorage.setItem("rx580_local_benchmarks", JSON.stringify(SEED_BENCHMARKS));
    return SEED_BENCHMARKS;
  };

  const saveLocalBenchmark = (newBench: BenchmarkSubmission) => {
    const list = getLocalBenchmarks();
    const updated = [newBench, ...list];
    localStorage.setItem("rx580_local_benchmarks", JSON.stringify(updated));
  };

  const deleteLocalBenchmark = (id: string) => {
    const list = getLocalBenchmarks();
    const updated = list.filter((b) => b.id !== id);
    localStorage.setItem("rx580_local_benchmarks", JSON.stringify(updated));
  };

  // Labels local list
  const text = {
    "pt-BR": {
      title: "SCOREBOARD DE INFRAESTRUTURA COLETIVA",
      subtitle: "Resultados empíricos submetidos por desenvolvedores",
      intro: "Compare seu ambiente legado com as compilações enviadas e adicione seus resultados para consolidar nossa base de dados oficial.",
      loginRequired: "Faça login para submeter seu benchmark na planilha da comunidade.",
      gpuLabel: "Modelo / Versão da RX 580",
      cpuLabel: "Trabalho Computacional CPU (Processador)",
      osLabel: "Ambiente / Sistema Operacional",
      llmLabel: "Velocidade LLM (Mistral/Llama @ Q4_K_M)",
      sdLabel: "Render Estável SD 1.5 (512x512, 20 steps, segs)",
      fluxLabel: "Render Flux.1 Schnell (Opcional, em mins)",
      submitBtn: "Registrar meus Benchmarks",
      successMsg: "Benchmark sincronizado com sucesso no banco de dados!",
      tableGpu: "GPU DISPOSITIVO",
      tableCpu: "CPU PAREADA",
      tableOs: "AMBIENTE OS",
      tableLlm: "SPEED LLM",
      tableSd: "RENDER SD 1.5",
      tableFlux: "FLUX SCHNELL",
      noSubmissions: "Aguardando primeiras submissões oficiais...",
      deleteTooltip: "Excluir sua entrada",
      unitTs: "t/s",
      unitSecs: "s",
      unitMins: "min"
    },
    en: {
      title: "COLLECTIVE BENCHMARK SCOREBOARD",
      subtitle: "Empirical outcomes submitted by community engineers",
      intro: "Compare your legacy system setups with values registered by peers and submit your metrics to augment our master record.",
      loginRequired: "Sign in to compile and publish your benchmark to the global database.",
      gpuLabel: "RX 580 Model / Sub-vendor",
      cpuLabel: "Paired Host CPU Model",
      osLabel: "Environment Operating System",
      llmLabel: "LLM Tokens Speed (Mistral/Llama @ Q4_K_M)",
      sdLabel: "Stable Diffusion 1.5 Time (512x512, 20 steps, secs)",
      fluxLabel: "Flux.1 Schnell Render Time (Optional, in mins)",
      submitBtn: "Deploy my Benchmarks",
      successMsg: "Benchmark synchronized successfully to the cloud!",
      tableGpu: "HARDWARE GPU",
      tableCpu: "PAIRED CPU",
      tableOs: "TARGET OS",
      tableLlm: "LLM VELOCITY",
      tableSd: "SD 1.5 DELAY",
      tableFlux: "FLUX SCHNELL",
      noSubmissions: "Awaiting initial verified listings...",
      deleteTooltip: "Delete your entry",
      unitTs: "t/s",
      unitSecs: "s",
      unitMins: "min"
    }
  }[lang === "pt-BR" ? "pt-BR" : "en"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Real-time benchmarks data stream mapping
  useEffect(() => {
    if (isOffline) {
      setSubmissions(getLocalBenchmarks());
      return;
    }

    const benchmarksCollection = collection(db, "benchmarks");
    const benchmarksQuery = query(benchmarksCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      benchmarksQuery,
      (snapshot) => {
        const list: BenchmarkSubmission[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as BenchmarkSubmission);
        });
        setSubmissions(list);
      },
      (error) => {
        console.warn("Firestore benchmarks error, enabling offline storage fallback mode:", error);
        setIsOffline(true);
        // Load local fallback immediately
        setSubmissions(getLocalBenchmarks());
      }
    );

    return unsubscribe;
  }, [isOffline]);

  const handleSubmitBenchmark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser && !isOffline) return;

    if (!gpuModel.trim() || !cpuModel.trim()) {
      setErrorText(lang === "pt-BR" ? "Todos os campos de hardware são obrigatórios!" : "All hardware fields are required!");
      return;
    }

    if (llmSpeed <= 0 || sdTime <= 0) {
      setErrorText(lang === "pt-BR" ? "Valores devem ser maiores que zero." : "Metric parameters must exceed zero.");
      return;
    }

    setIsSubmitting(true);
    setErrorText(null);
    setSuccessText(null);

    const benchmarkId = "bench_" + Date.now();
    const fTimeNum = fluxTime && !isNaN(parseFloat(fluxTime)) ? parseFloat(fluxTime) : undefined;

    const payload: BenchmarkSubmission = {
      id: benchmarkId,
      userId: currentUser ? currentUser.uid : "local_user_" + Math.random().toString(36).substring(2, 6),
      userName: currentUser ? (currentUser.displayName || "Anonymous Specialist") : (lang === "pt-BR" ? "Especialista Local" : "Guest Peer"),
      gpuModel,
      cpuModel,
      os,
      llmSpeed: Number(llmSpeed),
      sdTime: Number(sdTime),
      ...(fTimeNum !== undefined && { fluxTime: fTimeNum }),
      createdAt: new Date(),
    };

    if (isOffline) {
      saveLocalBenchmark(payload);
      setSubmissions(getLocalBenchmarks());
      setSuccessText(text.successMsg);
      setFluxTime("");
      setIsSubmitting(false);
      setTimeout(() => setSuccessText(null), 5000);
      return;
    }

    const benchmarkDocRef = doc(db, "benchmarks", benchmarkId);
    try {
      await setDoc(benchmarkDocRef, payload);
      setSuccessText(text.successMsg);
      setFluxTime("");
      setTimeout(() => setSuccessText(null), 5000);
    } catch (error) {
      console.warn("Firestore benchmark write failed, falling back to local mode:", error);
      setIsOffline(true);
      saveLocalBenchmark(payload);
      setSubmissions(getLocalBenchmarks());
      setSuccessText(text.successMsg);
      setFluxTime("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBenchmark = async (id: string) => {
    if (!window.confirm(lang === "pt-BR" ? "Excluir este registro?" : "Delete this record?")) return;

    if (isOffline) {
      deleteLocalBenchmark(id);
      setSubmissions(getLocalBenchmarks());
      return;
    }

    const docRef = doc(db, "benchmarks", id);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.warn("Firestore benchmark delete failed, doing local fallback delete:", error);
      setIsOffline(true);
      deleteLocalBenchmark(id);
      setSubmissions(getLocalBenchmarks());
    }
  };

  return (
    <div className="bg-[#111215] border border-white/5 rounded-xl p-6 shadow-2xl relative overflow-hidden mt-8">
      {/* Laser decoration */}
      <div className="absolute top-0 right-0 w-[150px] h-[3px] bg-sky-500 shadow-[0_0_12px_#3b82f6]" />

      <div className="border-b border-white/5 pb-4 mb-6">
        <h2 className="font-sans font-extrabold text-[#fff] text-xs tracking-[1px] uppercase flex items-center gap-2">
          <Database size={13} className={isOffline ? "text-amber-500" : "text-sky-500"} />
          {text.title}
          {isOffline && (
            <span className="text-[9px] bg-amber-500/15 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-mono font-bold tracking-normal ml-auto shrink-0">
              {lang === "pt-BR" ? "Modo Offline Ativo" : "Offline Storage Mode"}
            </span>
          )}
        </h2>
        <p className="text-[10px] text-[#475569] uppercase font-mono mt-0.5">
          {text.subtitle}
        </p>
      </div>

      <p className="text-[11px] text-[#94a3b8] leading-relaxed mb-6 font-sans">
        {text.intro}
      </p>

      {successText && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] p-3.5 rounded-md mb-5 flex items-start gap-2.5 animate-pulse">
          <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
          <p>{successText}</p>
        </div>
      )}

      {errorText && (
        <div className="bg-red-500/10 border border-red-500/30 text-rose-300 text-[11px] p-3.5 rounded-md mb-5 flex items-start gap-2.5">
          <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
          <p>{errorText}</p>
        </div>
      )}

      {/* Benchmark Submission form */}
      {isOffline || (!authLoading && currentUser) ? (
        <form onSubmit={handleSubmitBenchmark} className="mb-10 p-5 bg-black/40 rounded-lg border border-white/5 font-mono">
          <div className="text-[10px] text-sky-400 font-bold mb-4 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/[0.04] pb-2">
            <Plus size={12} />
            {lang === "pt-BR" ? "REPORTE DE LABORATÓRIO" : "SUBMIT REPORT"}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[9.5px] text-[#475569] font-bold uppercase mb-1.5">{text.gpuLabel}</label>
              <input
                type="text"
                value={gpuModel}
                onChange={(e) => setGpuModel(e.target.value)}
                required
                className="w-full bg-[#141519] border border-white/10 rounded-md py-1.5 px-3 text-xs text-white focus:outline-none focus:border-sky-500/50"
              />
            </div>
            <div>
              <label className="block text-[9.5px] text-[#475569] font-bold uppercase mb-1.5">{text.cpuLabel}</label>
              <input
                type="text"
                value={cpuModel}
                onChange={(e) => setCpuModel(e.target.value)}
                required
                className="w-full bg-[#141519] border border-white/10 rounded-md py-1.5 px-3 text-xs text-white focus:outline-none focus:border-sky-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
            <div>
              <label className="block text-[9.5px] text-[#475569] font-bold uppercase mb-1.5">{text.osLabel}</label>
              <select
                value={os}
                onChange={(e) => setOs(e.target.value as any)}
                className="w-full bg-[#141519] border border-white/10 rounded-md py-1.5 px-3 text-xs text-white focus:outline-none focus:border-sky-500/50"
              >
                <option value="windows">Windows Native</option>
                <option value="wsl2">WSL2 Hub</option>
                <option value="ubuntu">Ubuntu OS Native</option>
              </select>
            </div>

            <div>
              <label className="block text-[9.5px] text-[#475569] font-bold uppercase mb-1.5">{text.llmLabel}</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="500"
                value={llmSpeed}
                onChange={(e) => setLlmSpeed(parseFloat(e.target.value))}
                required
                className="w-full bg-[#141519] border border-white/10 rounded-md py-1.5 px-3 text-xs text-white focus:outline-none focus:border-sky-500/50"
              />
            </div>

            <div>
              <label className="block text-[9.5px] text-[#475569] font-bold uppercase mb-1.5">{text.sdLabel}</label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="10000"
                value={sdTime}
                onChange={(e) => setSdTime(parseFloat(e.target.value))}
                required
                className="w-full bg-[#141519] border border-white/10 rounded-md py-1.5 px-3 text-xs text-white focus:outline-none focus:border-sky-500/50"
              />
            </div>

            <div>
              <label className="block text-[9.5px] text-[#475569] font-bold uppercase mb-1.5">{text.fluxLabel}</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1000"
                value={fluxTime}
                placeholder="N/A"
                onChange={(e) => setFluxTime(e.target.value)}
                className="w-full bg-[#141519] border border-white/10 rounded-md py-1.5 px-3 text-xs text-white focus:outline-none focus:border-sky-500/50"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-white/[0.02] disabled:text-[#475569] text-white text-[11px] font-bold rounded-md flex items-center gap-2 cursor-pointer transition border-0 select-none shadow-md shadow-sky-950/20"
            >
              <CheckCircle2 size={12} />
              {isSubmitting ? "Sincronizando..." : text.submitBtn}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 bg-white/[0.01] border border-dashed border-white/5 text-center text-xs text-[#475569] mb-8 font-sans">
          🔒 {text.loginRequired}
        </div>
      )}

      {/* Benchmarks table display wrapper */}
      <div className="w-full overflow-x-auto border border-white/5 rounded-lg bg-[#0E0F12]/80">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-[#475569] text-[9.5px] font-mono tracking-wider font-extrabold bg-white/[0.01]">
              <th className="p-4">{text.tableGpu}</th>
              <th className="p-4">{text.tableCpu}</th>
              <th className="p-4">{text.tableOs}</th>
              <th className="p-4 text-center">{text.tableLlm}</th>
              <th className="p-4 text-center">{text.tableSd}</th>
              <th className="p-4 text-center">{text.tableFlux}</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-xs text-[#475569] italic">
                  {text.noSubmissions}
                </td>
              </tr>
            ) : (
              submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/[0.02] transition font-mono">
                  <td className="p-4 text-white font-bold max-w-[200px] truncate" title={sub.gpuModel}>
                    {sub.gpuModel}
                  </td>
                  <td className="p-4 text-slate-300 max-w-[180px] truncate" title={sub.cpuModel}>
                    {sub.cpuModel}
                  </td>
                  <td className="p-4 uppercase text-[10px]">
                    <span className={`px-2 py-0.5 rounded font-extrabold ${
                      sub.os === "windows"
                        ? "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                        : sub.os === "ubuntu"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}>
                      {sub.os}
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold text-white text-xs">
                    {sub.llmSpeed} <span className="text-[#E11D48] text-[9px] font-semibold">{text.unitTs}</span>
                  </td>
                  <td className="p-4 text-center font-bold text-white text-xs">
                    {sub.sdTime} <span className="text-[#3b82f6] text-[9px] font-semibold">{text.unitSecs}</span>
                  </td>
                  <td className="p-4 text-center font-bold text-white text-xs">
                    {sub.fluxTime ? (
                      <>
                        {sub.fluxTime} <span className="text-yellow-500 text-[9px] font-semibold">{text.unitMins}</span>
                      </>
                    ) : (
                      <span className="text-[#475569]">N/A</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {(isOffline || (currentUser && currentUser.uid === sub.userId)) && (
                      <button
                        onClick={() => handleDeleteBenchmark(sub.id)}
                        className="text-[#475569] hover:text-red-400 transition p-1 cursor-pointer bg-none border-none"
                        title={text.deleteTooltip}
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
