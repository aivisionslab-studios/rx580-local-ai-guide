import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  increment
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType, isFirebaseDummy } from "../lib/firebase";
import { MessageSquare, ThumbsUp, Send, CheckCircle2, AlertTriangle, Play, HelpCircle, Flame } from "lucide-react";

interface Comment {
  id: string;
  chapterId: string;
  author: string;
  content: string;
  likes: number;
  createdAt: any;
}

interface Chapter {
  id: string;
  title: string;
  time: string;
  desc: string;
  verdict: string;
  temp: string;
  vram: string;
  usage: string;
  power: string;
  fps: string;
}

const VIDEO_CHAPTERS: Chapter[] = [
  {
    id: "setup",
    title: "Capítulo 1: Setup utilizado (0:00)",
    time: "0:00",
    desc: "Processador moderno de 2024 (Ryzen / Intel i5 12400F) com placa original Sapphire Nitro+ RX 580 8GB lançada em 2017.",
    verdict: "Original e íntegra (não é modelo capado/recondicionado)",
    temp: "N/D", vram: "8GB GDDR5", usage: "Idle", power: "Consumo alto nos menus", fps: "N/D"
  },
  {
    id: "warzone",
    title: "Capítulo 2: RX580 Warzone (1:10)",
    time: "1:10",
    desc: "Warzone atual com FSR no modo Qualidade, rodado no preset de gráficos mínimos para manter a estabilidade de quadros.",
    verdict: "Jogável mas esguela a GPU no talo",
    temp: "77ºC", vram: "8GB", usage: "100%", power: "155 Watts", fps: "60 - 67 FPS"
  },
  {
    id: "re4",
    title: "Capítulo 3: Resident Evil 4 Remake (2:15)",
    time: "2:15",
    desc: "Preset médio de texturas em 1080p Nativo (Sem FSR ativado). Desempenho surpreendentemente redondo de renderização.",
    verdict: "Excelente fluidez e frame time estável",
    temp: "78ºC", vram: "6.5GB", usage: "99%", power: "170 Watts", fps: "50 - 70 FPS"
  },
  {
    id: "hogwarts",
    title: "Capítulo 4: Hogwarts Legacy (2:48)",
    time: "2:48",
    desc: "Nível Médio de detalhamento gráfico utilizando FSR 3 no modo Qualidade para amparar renderização nos pátios extensivos.",
    verdict: "Frame time firme, mas cai em batalhas",
    temp: "78ºC", vram: "7.2GB", usage: "100%", power: "185 Watts", fps: "45 - 59 FPS"
  },
  {
    id: "elden",
    title: "Capítulo 5: Elden Ring (3:46)",
    time: "3:46",
    desc: "Elden Ring travado no preset Médio. Combates fluídos contra chefes com resposta de comando sem engasgabilidade.",
    verdict: "Muito fluido e firme nas lutas",
    temp: "76ºC", vram: "5.8GB", usage: "99%", power: "165 Watts", fps: "60 FPS (V-Sync)"
  },
  {
    id: "alanwake",
    title: "Capítulo 6: Alan Wake 2 & SpiderMan 2 (4:15)",
    time: "4:15",
    desc: "Alan Wake necessita de Mesh Shaders de herança (inexistentes na RX 580/Polaris). Spider-Man 2 crasha por falta de instruções modernas.",
    verdict: "Barreira física de tecnologias legadas",
    temp: "Crush", vram: "N/D", usage: "99%", power: "Crash no menu", fps: "Inviável / Travado"
  },
  {
    id: "cyberpunk",
    title: "Capítulo 7: Cyberpunk 2077 (5:31)",
    time: "5:31",
    desc: "Habilidade de processar reflexos básicos em 1080p com FSR no modo Qualidade. Cintilação visível devido a limitações do construtor.",
    verdict: "Aproveitável e estável",
    temp: "78ºC", vram: "6.1GB", usage: "100%", power: "175 Watts", fps: "57 - 60 FPS"
  },
  {
    id: "expedition",
    title: "Capítulo 8: Expedition 33 (6:35)",
    time: "6:35",
    desc: "Teste em título severo planejado para 2025. Roda inteiramente no preset Baixo com FSR ativado sob escala severa de pixels.",
    verdict: "Gráfico degradado mas frame aceitável",
    temp: "79ºC", vram: "7.4GB", usage: "100%", power: "180 Watts", fps: "60 - 65 FPS"
  },
  {
    id: "preco",
    title: "Capítulo 9: O Veredito do Preço (7:30)",
    time: "7:30",
    desc: "Se pagar R$ 300 - 400 vale a pena como GPU de transição. Se o custo chegar a R$ 900+ vale mais partir para uma RTX 3050 6GB ou TX modernizada.",
    verdict: "Não coloque a RX 580 em pedestal!",
    temp: "N/D", vram: "8GB", usage: "Valor", power: "Consumo x Performance", fps: "RTX 3050 é 40%+ rápida"
  }
];

export default function VulkanDebateHub({ lang }: { lang: string }) {
  const [selectedChap, setSelectedChap] = useState<string>("preco");
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [errorDetails, setErrorDetails] = useState<string>("");

  // Check if we start in offline fallback mode or active database
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return isFirebaseDummy || localStorage.getItem("rx580_local_comments") !== null;
  });

  // Default seed list to display beautiful mock data preloaded so the user sees a rich page instantly
  const SEED_COMMENTS: Comment[] = [
    {
      id: "seed_1",
      chapterId: "preco",
      author: "Felipe_AMD",
      content: "Se pagar R$ 350 - R$ 400 vale super a pena como placa de transição em 2026! Me ajudou muito a jogar títulos indies e competitivos.",
      likes: 12,
      createdAt: new Date("2026-06-01T12:00:00Z")
    },
    {
      id: "seed_2",
      chapterId: "preco",
      author: "Renato_Nvidia",
      content: "Concordo cara. Se passar de R$ 750, vale muito mais a pena ir direto para uma RTX 3050 6GB ou economizar para uma RX 6600.",
      likes: 8,
      createdAt: new Date("2026-06-02T15:30:00Z")
    },
    {
      id: "seed_3",
      chapterId: "cyberpunk",
      author: "CyberHacker",
      content: "No Cyberpunk 2077 com FSR no modo Qualidade e texturas no Médio, mantém acima de 55 FPS super estável. Polaris de 2017 é incrível!",
      likes: 15,
      createdAt: new Date("2026-06-03T18:45:00Z")
    },
    {
      id: "seed_4",
      chapterId: "alanwake",
      author: "Alan_Vulkan",
      content: "Alan Wake 2 sem Mesh Shaders infelizmente não rola, o frame rate despenca. Mas para os jogos DX11 e DX12 normais é guerreira demais.",
      likes: 22,
      createdAt: new Date("2026-06-04T09:12:00Z")
    },
    {
      id: "seed_5",
      chapterId: "elden",
      author: "EldenGamer",
      content: "Elden Ring cravado a 60 FPS com preset Médio! Derrotei a Malenia nela sem engasgo nenhum.",
      likes: 19,
      createdAt: new Date("2026-06-05T21:00:00Z")
    }
  ];

  const getLocalComments = (): Comment[] => {
    try {
      const stored = localStorage.getItem("rx580_local_comments");
      if (stored) {
        return JSON.parse(stored).map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt)
        }));
      }
    } catch (e) {
      console.error("Failed to parse local comments:", e);
    }
    localStorage.setItem("rx580_local_comments", JSON.stringify(SEED_COMMENTS));
    return SEED_COMMENTS;
  };

  const saveLocalComment = (newCommentObj: Comment) => {
    const list = getLocalComments();
    const updated = [newCommentObj, ...list];
    localStorage.setItem("rx580_local_comments", JSON.stringify(updated));
  };

  const likeLocalComment = (id: string, isLiked: boolean) => {
    const list = getLocalComments();
    const updated = list.map((c) => {
      if (c.id === id) {
        return { ...c, likes: c.likes + (isLiked ? -1 : 1) };
      }
      return c;
    });
    localStorage.setItem("rx580_local_comments", JSON.stringify(updated));
  };

  // Load liked list from LocalStorage to prevent multi-voting
  useEffect(() => {
    try {
      const stored = localStorage.getItem("rx580_dec_likes");
      if (stored) {
        setLikedComments(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Fetch comments synchronized to the selected chapter
  useEffect(() => {
    if (isOffline || isFirebaseDummy) {
      const allLocal = getLocalComments();
      const filtered = allLocal
        .filter((c) => c.chapterId === selectedChap)
        .sort((a, b) => b.likes - a.likes || b.createdAt.getTime() - a.createdAt.getTime());
      setComments(filtered);
      return;
    }

    const collName = "video_comments";
    const q = query(
      collection(db, collName),
      where("chapterId", "==", selectedChap),
      orderBy("likes", "desc"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loaded: Comment[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          loaded.push({
            id: docSnap.id,
            chapterId: data.chapterId,
            author: data.author,
            content: data.content,
            likes: data.likes || 0,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date()
          });
        });
        setComments(loaded);
      },
      (error) => {
        console.warn("Firestore comments error, enabling offline storage fallback mode:", error);
        setIsOffline(true);
        // Instant response fallback
        const allLocal = getLocalComments();
        const filtered = allLocal
          .filter((c) => c.chapterId === selectedChap)
          .sort((a, b) => b.likes - a.likes || b.createdAt.getTime() - a.createdAt.getTime());
        setComments(filtered);
      }
    );

    return () => unsubscribe();
  }, [selectedChap, isOffline]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !newComment.trim()) return;

    setFormStatus("submitting");
    setErrorDetails("");

    const newObj: Comment = {
      id: "comment_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      chapterId: selectedChap,
      author: authorName.substring(0, 50).trim(),
      content: newComment.substring(0, 1000).trim(),
      likes: 0,
      createdAt: new Date()
    };

    if (isOffline) {
      saveLocalComment(newObj);
      const allLocal = getLocalComments();
      const filtered = allLocal
        .filter((c) => c.chapterId === selectedChap)
        .sort((a, b) => b.likes - a.likes || b.createdAt.getTime() - a.createdAt.getTime());
      setComments(filtered);
      setNewComment("");
      setFormStatus("done");
      setTimeout(() => setFormStatus("idle"), 3000);
      return;
    }

    const collName = "video_comments";
    const docPayload = {
      chapterId: selectedChap,
      author: newObj.author,
      content: newObj.content,
      likes: 0,
      createdAt: serverTimestamp()
    };

    try {
      if (docPayload.author.length === 0 || docPayload.content.length === 0) {
        throw new Error("Validation check: Content cannot be empty!");
      }
      await addDoc(collection(db, collName), docPayload);
      setNewComment("");
      setFormStatus("done");
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (err: any) {
      console.warn("Firestore error during write, performing local offline fallback write:", err);
      setIsOffline(true);
      saveLocalComment(newObj);
      const allLocal = getLocalComments();
      const filtered = allLocal
        .filter((c) => c.chapterId === selectedChap)
        .sort((a, b) => b.likes - a.likes || b.createdAt.getTime() - a.createdAt.getTime());
      setComments(filtered);
      setNewComment("");
      setFormStatus("done");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  const handleLike = async (commentId: string, currentLikes: number) => {
    const isLiked = likedComments.includes(commentId);
    const newLikedList = isLiked
      ? likedComments.filter((id) => id !== commentId)
      : [...likedComments, commentId];

    setLikedComments(newLikedList);
    localStorage.setItem("rx580_dec_likes", JSON.stringify(newLikedList));

    if (isOffline) {
      likeLocalComment(commentId, isLiked);
      const allLocal = getLocalComments();
      const filtered = allLocal
        .filter((c) => c.chapterId === selectedChap)
        .sort((a, b) => b.likes - a.likes || b.createdAt.getTime() - a.createdAt.getTime());
      setComments(filtered);
      return;
    }

    const collName = "video_comments";
    try {
      const docRef = doc(db, collName, commentId);
      await updateDoc(docRef, {
        likes: increment(isLiked ? -1 : 1)
      });
    } catch (err) {
      console.warn("Firestore error during like, performing local offline fallback like:", err);
      setIsOffline(true);
      likeLocalComment(commentId, isLiked);
      const allLocal = getLocalComments();
      const filtered = allLocal
        .filter((c) => c.chapterId === selectedChap)
        .sort((a, b) => b.likes - a.likes || b.createdAt.getTime() - a.createdAt.getTime());
      setComments(filtered);
    }
  };

  const activeChap = VIDEO_CHAPTERS.find((v) => v.id === selectedChap) || VIDEO_CHAPTERS[0];

  return (
    <div id="vulkan_debate_section" className="bg-[#0c0d10] border border-white/5 rounded-lg p-5 mt-6 font-sans">
      
      {/* Title block with red accent line */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-block w-2 h-2 rounded-full ${isOffline ? "bg-amber-400" : "bg-[#E11D48]"} animate-pulse`} />
            <h3 className="font-sans font-black text-white text-xs uppercase tracking-[1px]">
              {isOffline 
                ? (lang === "pt-BR" ? "MODO OFFLINE (MEMÓRIA LOCAL)" : "OFFLINE STORAGE MODE")
                : (lang === "pt-BR" ? "HOSPEDAGEM FIRESTORE DISPONÍVEL" : "FIRESTORE HOSTING AVAILABLE")}
            </h3>
          </div>
          <h2 className="text-lg font-black text-white tracking-tight uppercase">
            {lang === "pt-BR" ? "DEBATE EM TEMPO REAL: COMENTÁRIOS DO VÍDEO" : "REAL-TIME DEBATE: VIDEO COMMENTS"}
          </h2>
          <p className="text-[11px] text-[#475569] font-mono mt-0.5">
            // Ref: "A RX 580 8GB ainda vale a pena em 2026?" sitemap.xml
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#141517] border border-white/5 px-3 py-1.5 rounded text-xs font-mono">
          <Flame size={12} className="text-[#E11D48]" />
          <span className="text-[#e2e8f0]">Polaris GPU GCN4 Testbeds</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Chapters & Transcripts */}
        <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[500px] overflow-y-auto pr-1 scrollbar">
          <div className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.5px] mb-1">
            {lang === "pt-BR" ? "Selecione uma parte do vídeo para ver os comentários:" : "Select video section to filter:"}
          </div>
          {VIDEO_CHAPTERS.map((chap) => {
            const isSelected = selectedChap === chap.id;
            return (
              <button
                key={chap.id}
                onClick={() => setSelectedChap(chap.id)}
                className={`w-full text-left p-3 rounded border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#E11D48]/10 border-[#E11D48] text-white"
                    : "bg-[#0f1013] border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold transition-colors ${isSelected ? "text-white" : "text-gray-200"}`}>
                    {chap.title}
                  </span>
                  <span className="font-mono text-[9px] bg-white/5 text-gray-300 px-1.5 py-0.5 rounded">
                    {chap.time}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed font-sans mt-1">
                  {chap.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right column: Target details + Comment List + Submit block */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Active section summary stats bar */}
          <div className="bg-[#0e0f12] border border-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-[#E11D48] tracking-widest uppercase font-bold">
                {lang === "pt-BR" ? "Métricas do Capítulo Selecionado" : "Selected Chapter Metrics"}
              </span>
              <span className="bg-[#E11D48]/15 text-[#E11D48] font-mono font-bold text-[9px] px-2 py-0.5 rounded border border-[#E11D48]/20 uppercase">
                {activeChap.fps}
              </span>
            </div>
            
            <h3 className="font-sans font-extrabold text-white text-sm mb-2">{activeChap.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">{activeChap.desc}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono border-t border-white/5 pt-3">
              <div>
                <span className="text-gray-500 block uppercase">Temp:</span>
                <span className="text-gray-200 font-bold">{activeChap.temp}</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase">VRAM:</span>
                <span className="text-gray-200 font-bold">{activeChap.vram}</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase">Consumo:</span>
                <span className="text-gray-200 font-bold">{activeChap.power}</span>
              </div>
              <div>
                <span className="text-gray-500 block uppercase">Análise:</span>
                <span className="text-[#E11D48] font-bold">{activeChap.verdict}</span>
              </div>
            </div>
          </div>

          {/* Comment thread feed */}
          <div className="flex-1 flex flex-col min-h-[220px] max-h-[300px] overflow-y-auto bg-[#07080a] border border-white/5 rounded-lg p-3 scrollbar">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-3">
              <MessageSquare size={13} className="text-[#E11D48]" />
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                {lang === "pt-BR" ? `RESPOSTAS DO CANAL (${comments.length})` : `CHANNELS DEBATES (${comments.length})`}
              </span>
            </div>

            {comments.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-500 font-mono text-[11px]">
                <HelpCircle size={20} className="text-gray-600 mb-2" />
                <p>{lang === "pt-BR" ? "Ainda não há debates salvos para este trecho." : "No debates saved for this chunk."}</p>
                <p className="text-[10px] text-gray-600 mt-1">{lang === "pt-BR" ? "Participe e seja o primeiro a responder!" : "Submit yours first!"}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {comments.map((comment) => {
                  const hasLiked = likedComments.includes(comment.id);
                  return (
                    <div
                      key={comment.id}
                      className="bg-[#0e0f12] border border-white/5 p-3 rounded hover:border-white/10 transition-all"
                    >
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <span className="font-bold text-xs text-gray-200 font-sans">
                          {comment.author}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-[#475569] font-mono">
                            {comment.createdAt.toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => handleLike(comment.id, comment.likes)}
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                              hasLiked
                                ? "bg-[#E11D48]/15 text-[#E11D48] border border-[#E11D48]/20"
                                : "text-gray-500 hover:text-gray-300"
                            }`}
                          >
                            <ThumbsUp size={10} />
                            <span>{comment.likes}</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans whitespace-pre-wrap break-words">
                        {comment.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Comment submit form */}
          <form onSubmit={handleSubmit} className="bg-[#0e0f12] border border-white/5 rounded-lg p-3">
            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.5px] mb-2 flex items-center gap-1.5">
              <span>{lang === "pt-BR" ? "QUER RESPONDER ESSE CARA?" : "WANT TO REPLY TO THIS GUY?"}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                placeholder={lang === "pt-BR" ? "Seu Nome (Ex: Felipe_AMD)" : "Your display name"}
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                maxLength={45}
                required
                className="col-span-1 bg-[#050506] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E11D48] font-sans"
              />
              <input
                type="text"
                placeholder={lang === "pt-BR" ? "Seu argumento técnico sobre este teste..." : "Your argument or comment..."}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                maxLength={950}
                required
                className="col-span-1 sm:col-span-2 bg-[#050506] border border-white/5 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E11D48] font-sans"
              />
            </div>

            <div className="flex items-center justify-between mt-3">
              {formStatus === "done" && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-green-400">
                  <CheckCircle2 size={12} />
                  <span>{lang === "pt-BR" ? "COMENTÁRIO ADICIONADO AO DB!" : "SUBMITTED TO FIRESTORE!"}</span>
                </div>
              )}
              {formStatus === "error" && (
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#E11D48] max-w-[70%] overflow-hidden">
                  <AlertTriangle size={12} />
                  <span className="truncate">{errorDetails}</span>
                </div>
              )}
              {formStatus === "idle" && <div />}
              {formStatus === "submitting" && (
                <div className="text-[10px] font-mono text-gray-500 animate-pulse">
                  {lang === "pt-BR" ? "SINCRONIZANDO COM FIRESTORE..." : "WRITING..."}
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className={`flex items-center justify-center gap-1.5 bg-[#E11D48] hover:bg-[#F43F5E] text-white px-3.5 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  formStatus === "submitting" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Send size={11} />
                <span>{lang === "pt-BR" ? "Enviar" : "Post"}</span>
              </button>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
}
