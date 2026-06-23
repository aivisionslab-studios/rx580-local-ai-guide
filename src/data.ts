import { SECTION_CONTENT } from './content/data.js';

export interface SectionContent {
  title: string;
  desc: string;
  html: string;
}

export interface LanguagePack {
  meta: {
    title: string;
    description: string;
    lang: string;
  };
  nav: {
    languageLabel: string;
    github: string;
    theme: string;
    themeLight: string;
    themeDark: string;
  };
  sidebar: {
    title: string;
    search: string;
    sections: string;
    progress: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    stats: {
      gpu: string;
      gpuValue: string;
      cpu: string;
      cpuValue: string;
      ram: string;
      ramValue: string;
      storage: string;
      storageValue: string;
    };
  };
  share: {
    title: string;
    copy: string;
    copied: string;
  };
  footer: {
    rights: string;
    disclaimer: string;
  };
  sections: Record<string, SectionContent>;
}

// Headers curtos para sobrescrever títulos quando necessário (por idioma)
const PT_SECTION_HEADERS: Record<string, { title?: string; desc?: string }> = {};
const EN_SECTION_HEADERS: Record<string, { title?: string; desc?: string }> = {
  contexto: { title: "01. CONTEXT AND PROBLEM", desc: "In 2026, the standard narrative was clear: RX 580 can't run AI. Analysis of locked ecosystems and Vulkan acceleration viability." },
  hardware: { title: "02. LABORATORY HARDWARE", desc: "Detailed Master Configuration: Xeon E5-2690 v3, RX 580 8GB, 32GB ECC RAM and the critical impact of NVMe." },
  falhas: { title: "03. WHAT DIDN'T WORK (THE TECHNICAL GRAVEYARD)", desc: "Detailed analysis of failures: technical reasons for rejecting native DirectML, OpenVINO and ROCm." },
  solucao: { title: "04. THE SOLUTION — DUAL ARCHITECTURE", desc: "The definitive engineering strategy: intelligent workload division between Vulkan GPU and Xeon CPU." },
  prereqs: { title: "05. SYSTEM PREREQUISITES", desc: "Tooling required to compile open binaries and spin up local servers." },
  jornada: { title: "06. COMPLETE JOURNEY — THE 5 PHASES", desc: "The lab timeline: from initial CPU slowness to total control of legacy hardware." },
  llama: { title: "07. LLAMA.CPP COMPILATION (VULKAN BACKEND)", desc: "Step-by-step master commands to generate LLM-optimized binaries for the RX 580." },
  sdcpp: { title: "08. STABLE-DIFFUSION.CPP COMPILATION", desc: "Building the clean C++ engine for GPU-accelerated image rendering without CUDA dependencies." },
  modelos: { title: "09. MODEL CONVERSION TO GGUF FORMAT", desc: "Optimization and quantization of standard .safetensors files to the format accepted by the ggml engine." },
  sdserver: { title: "10. SD-SERVER INITIALIZATION (GPU)", desc: "Activation of the image service on the local port to listen for API calls from the graphical interface." },
  flux_server: { title: "10.A — RUNNING FLUX ON SD-SERVER (GPU + CPU HYBRID)", desc: "Mapping and initialization of the 12B-parameter Flux ecosystem with segmented memory architecture." },
  sd_bat_automation: { title: "11.A — LOCAL SD-SERVER / BOOT SEQUENCE", desc: "Dedicated batch script for safe and reproducible AI server initialization." },
  sd_openwebui_integration: { title: "11.B — OPENWEBUI + DOCKER INTEGRATION", desc: "Network bridge between the OpenWebUI Docker container and the native C++ engine running on the host GPU." },
  "comfyui-wsl": { title: "12 — COMFYUI WSL2", desc: "Setting up the virtualized Linux environment to inherit the computational power of the Xeon and ECC RAM." },
  "comfyui-directml": { title: "13 — DIRECTML", desc: "Detailed technical explanation of the chronic failures encountered during tests on the Windows branch." },
  "comfyui-directml-func": { title: "14 — DIRECTML FIXES", desc: "Installing the specific development wheel to force operational stability." },
  "comfyui-flux": { title: "15. CRITICAL PARAMETRIZATION OF FLUX.1 SCHNELL", desc: "Mandatory mathematical configuration to process the SOTA model on CPU without blowing RAM limits." },
  "comfyui-modelos": { title: "11.C — ZERO-COPY MODEL MANAGEMENT ON NVME", desc: "Symbolic link technique to unify storage of heavy checkpoints without duplicating files." },
  "animatediff-video": { title: "16. ANIMATEDIFF AND FRAME INTERPOLATION (VIDEO)", desc: "Injecting temporal consistency into ComfyUI on legacy hardware to structure fluid loops co-processed on Intel Xeon." },
  stack: { title: "17. INTEGRATED STACK SERVICE MAP", desc: "Infrastructure monitoring table, local traffic routing and active backends." },
  scripts: { title: "18. SCRIPTS AND AUTOMATION", desc: "Batch scripts to clean video memory and initialize local servers without conflicts." },
  guia: { title: "19. STRATEGIC GUIDE BY USE CASE", desc: "Decision matrix: when to direct processing to the GPU or to the Xeon." },
  benchmarks: { title: "20. REAL LAB BENCHMARKS", desc: "Consolidated telemetry data measured directly in the inference logs of both architectures." },
  cpu: { title: "21. XEON PARAMETRIZATION AND ADJUSTMENTS", desc: "BIOS configurations and structural limits of fp32 instructions for the LGA 2011-3 processor." },
  troubleshooting: { title: "23. TROUBLESHOOTING GUIDE", desc: "Quick diagnostics to work around API timeout failures and null seeds on the server." },
  "flux-vulkan": { title: "22. COMPLEMENTARY EXPLORATION: FLUX VIA VULKAN", desc: "Alternative acceleration of Flux models using ultra-compact quantizations in C++." },
  "troubleshoot-comfyui": { title: "24. MEMORY CATASTROPHE IN COMFYUI WINDOWS", desc: "Handling physical VRAM allocation overflows and emergency use of paging flags." },
  "comfyui-portable-amd": { title: "25. COMFYUI PORTABLE V0.3.48 — AMD IMPLEMENTATION", desc: "Specific settings and environment variable injection for the Polaris architecture." },
  comunidade: { title: "26. COMMUNITY CONTEXT AND SOURCES", desc: "Hacker knowledge repositories and forums dedicated to preserving and optimizing legacy hardware." },
  amihart: { title: "26.A. AMIHART METHOD — RX580 INFERENCE ON POLARIS/DEBIAN", desc: "Credit Note: Documentary section honoring the proof of concept by 艾米心 (Amihart), pioneer in validating Vulkan under Debian GCN4/Polaris." },
  dadhacks: { title: "26.B. DADHACKS METHOD — AI IMAGE GENERATION ON RX 580 USING VULKAN: A COST-EFFECTIVE SOLUTION", desc: "Analysis of the experimental consolidation by DH (DadHacks) in December 2025, establishing compatibility paths for image generation on legacy GPU." },
  codacus: { title: "26.C — CODACUS METHOD vs AIVisionsLab", desc: "Experiment of the 5 flags that saved a GTX 1060 — do they work on an RX 580?" },
  proximos: { title: "27. NEXT STEPS (2027 ROADMAP)", desc: "Next development goals: Vulkan Multi-GPU Clusters and local mesh of autonomous agents." },
  arquivos: { title: "28. NVME FILE TAXONOMY AND STRUCTURE", desc: "Unified directory tree for tracking compiled binaries and shared models." },
  meta: { title: "29. DOCUMENT REFERENCES AND METADATA", desc: "Technical analysis of the physical lifecycle of legacy hardware and the lab's reuse philosophy." },
  linhatempo: { title: "29.A. COLLECTIVE TIMELINE — THE EVOLUTION OF RX 580 AS AN AI PLATFORM", desc: "Unified historical and comparative analysis documenting the breaking of barriers and obsolescence of the RX 580 in three revolutionary stages (2025-2026)." },
  audio_rvc: { title: "30. LOCAL VOICE CONVERSION — APPLIO RVC ON AMD RX 580", desc: "Voice cloning pipeline on Windows without NVIDIA CUDA" },
  audio_whisper: { title: "31. WHISPER.CPP LOCAL — AUDIO TRANSCRIPTION ON AMD RX 580", desc: "GPU AMD-accelerated audio/video transcription via Vulkan on Windows (large-v3-turbo model)." },
  linux_nativo: { title: "40. NATIVE LINUX — Ubuntu 26.04 LTS + RX 580 + Vulkan", desc: "AIVisionsLab — Complete Stack Documentation on Real Linux" },
  audio_srt_ptbr: { title: "32. COMPLETE PIPELINE — TRANSCRIPTION + EN→PT-BR TRANSLATION WITH RX 580", desc: "English video transcription with automatic translation to Brazilian Portuguese, from .mp4 to .srt without any paid service." },
  limit_qwen_35b: { title: "33. PUSHING QWEN3.5 35B Q6_K TO THE LIMIT ON RX 580 8GB VIA VULKAN", desc: "Extreme hybrid execution experiment of a 34.66B-parameter model on the Polaris GPU and 2014 Xeon." },
  proving_hypothesis_35b: { title: "34. PROVING THE HYPOTHESIS: CURL, CTX-SIZE 8192 AND THE FIRST COMPLETE RESPONSE", desc: "Direct continuation of Section 33 · 3 tests · Hypothesis confirmed · 2017 hardware" }
};

const ES_SECTION_HEADERS: Record<string, { title?: string; desc?: string }> = {
  contexto: { title: "01. CONTEXTO Y PROBLEMA", desc: "En 2026, la narrativa estándar era clara: la RX 580 no ejecuta IA. Análisis de los ecosistemas bloqueados y viabilidad de aceleración vía Vulkan." },
  hardware: { title: "02. HARDWARE DEL LABORATORIO", desc: "Configuración Master detallada: Xeon E5-2690 v3, RX 580 8GB, 32GB RAM ECC y el impacto crítico del NVMe." },
  falhas: { title: "03. LO QUE NO FUNCIONÓ (EL CEMENTERIO TÉCNICO)", desc: "Análisis detallado de errores: las razones técnicas del rechazo de DirectML nativo, OpenVINO y ROCm." },
  solucao: { title: "04. LA SOLUCIÓN — ARQUITECTURA DUAL", desc: "La estrategia de ingeniería definitiva: división inteligente de workloads entre GPU Vulkan y CPU Xeon." },
  prereqs: { title: "05. REQUISITOS DEL SISTEMA", desc: "Herramientas necesarias para compilar los binarios abiertos y levantar los servidores locales." },
  jornada: { title: "06. JORNADA COMPLETA — LAS 5 FASES", desc: "La línea de tiempo del laboratorio: de la lentitud inicial de la CPU al control total del hardware heredado." },
  llama: { title: "07. COMPILACIÓN DE LLAMA.CPP (BACKEND VULKAN)", desc: "Paso a paso con los comandos maestro para generar los binarios optimizados de LLM para la RX 580." },
  sdcpp: { title: "08. COMPILACIÓN DE STABLE-DIFFUSION.CPP", desc: "Generando el motor limpio en C++ para renderizado de imágenes acelerado por GPU sin dependencias CUDA." },
  modelos: { title: "09. CONVERSIÓN DE MODELOS A FORMATO GGUF", desc: "Optimización y cuantización de archivos .safetensors estándar al formato aceptado por el motor ggml." },
  sdserver: { title: "10. INICIALIZACIÓN DEL SERVIDOR SD-SERVER (GPU)", desc: "Activación del servicio de imagen en el puerto local para escuchar las llamadas de API de la interfaz gráfica." },
  flux_server: { title: "10.A — EJECUTAR FLUX EN SD-SERVER (GPU + CPU HÍBRIDO)", desc: "Mapeo e inicialización del ecosistema Flux de 12B parámetros con arquitectura de memoria segmentada." },
  sd_bat_automation: { title: "11.A — SD-SERVER LOCAL / SECUENCIA DE ARRANQUE", desc: "Script por lotes dedicado a la inicialización segura y reproducible del servidor de IA." },
  sd_openwebui_integration: { title: "11.B — INTEGRACIÓN OPENWEBUI + DOCKER", desc: "Puente de red entre el contenedor Docker de OpenWebUI y el motor C++ nativo ejecutándose en la GPU del host." },
  "comfyui-wsl": { title: "12 — COMFYUI WSL2", desc: "Configurando el entorno Linux virtualizado para heredar el poder computacional del Xeon y RAM ECC." },
  "comfyui-directml": { title: "13 — DIRECTML", desc: "Explicación técnica detallada de las fallas crónicas encontradas durante las pruebas en la rama Windows." },
  "comfyui-directml-func": { title: "14 — CORRECCIONES DIRECTML", desc: "Instalación de la rueda de desarrollo específica para forzar estabilidad operacional." },
  "comfyui-flux": { title: "15. PARAMETRIZACIÓN CRÍTICA DE FLUX.1 SCHNELL", desc: "Configuración matemática obligatoria para procesar el modelo SOTA en CPU sin exceder los límites de RAM." },
  "comfyui-modelos": { title: "11.C — GESTIÓN ZERO-COPY DE MODELOS EN NVME", desc: "Técnica de enlaces simbólicos para unificar el almacenamiento de checkpoints pesados sin duplicar archivos." },
  animatediff_video: { title: "16. ANIMATEDIFF E INTERPOLACIÓN DE FOTOGRAMAS (VÍDEO)", desc: "Inyectando consistencia temporal en ComfyUI sobre hardware heredado para estructurar loops fluidos coprocesados en Intel Xeon." },
  stack: { title: "17. MAPA DE SERVICIOS DEL STACK INTEGRADO", desc: "Tabla de monitoreo de infraestructura, enrutamiento de tráfico local y backends activos." },
  scripts: { title: "18. SCRIPTS Y AUTOMATIZACIÓN", desc: "Scripts por lotes para limpiar la memoria de vídeo e inicializar los servidores locales sin conflictos." },
  guia: { title: "19. GUÍA ESTRATÉGICA POR CASO DE USO", desc: "Matriz de toma de decisiones: cuándo dirigir el procesamiento a la GPU o al Xeon." },
  benchmarks: { title: "20. BENCHMARKS REALES DEL LABORATORIO", desc: "Datos consolidados de telemetría medidos directamente en los logs de inferencia de ambas arquitecturas." },
  cpu: { title: "21. PARAMETRIZACIÓN Y AJUSTES DEL XEON", desc: "Configuraciones de BIOS y límites estructurales de instrucciones fp32 para el procesador LGA 2011-3." },
  troubleshooting: { title: "23. GUÍA DE RESOLUCIÓN DE PROBLEMAS (TROUBLESHOOTING)", desc: "Diagnósticos rápidos para sortear fallos de timeout de API y semillas nulas en el servidor." },
  "flux-vulkan": { title: "22. EXPLORACIÓN COMPLEMENTARIA: FLUX VÍA VULKAN", desc: "Aceleración alternativa de modelos Flux utilizando cuantizaciones ultra-compactas en C++." },
  "troubleshoot-comfyui": { title: "24. CATASTROFE DE MEMORIA EN COMFYUI WINDOWS", desc: "Manejo de desbordamientos de asignación física de VRAM y uso emergencial de señalizadores de paginación." },
  "comfyui-portable-amd": { title: "25. COMFYUI PORTABLE V0.3.48 — IMPLEMENTACIÓN AMD", desc: "Configuraciones específicas e inyección de variables de entorno para la arquitectura Polaris." },
  comunidade: { title: "26. CONTEXTO Y FUENTES DE LA COMUNIDAD", desc: "Repositorios de conocimiento hacker y foros dedicados a la preservación y optimización de hardware heredado." },
  amihart: { title: "26.A. MÉTODO AMIHART — INFERENCIA RX580 EN POLARIS/DEBIAN", desc: "Nota de Crédito: Sección documental en homenaje a la prueba de concepto realizada por 艾米心 (Amihart), pionera en validar Vulkan bajo Debian GCN4/Polaris." },
  dadhacks: { title: "26.B. MÉTODO DADHACKS — AI IMAGE GENERATION ON RX 580 USING VULKAN: A COST-EFFECTIVE SOLUTION", desc: "Análisis de la consolidación experimental realizada por DH (DadHacks) en diciembre de 2025, estableciendo caminos de compatibilidad para generación de imágenes en GPU heredada." },
  codacus: { title: "26.C — MÉTODO CODACUS vs AIVisionsLab", desc: "Experimento de las 5 flags que salvaron una GTX 1060 — ¿funcionan en una RX 580?" },
  proximos: { title: "27. PRÓXIMOS PASOS (ROADMAP 2027)", desc: "Próximas metas de desarrollo: Clusters Multi-GPU Vulkan y malla local de agentes autónomos." },
  arquivos: { title: "28. TAXONOMÍA Y ESTRUCTURA DE ARCHIVOS NVME", desc: "Árbol de directorios unificado para rastrear binarios compilados y modelos compartidos." },
  meta: { title: "29. REFERENCIAS Y METADATOS DEL DOCUMENTO", desc: "Análisis técnico del ciclo de vida físico del hardware heredado y filosofía de reaprovechamiento del laboratorio." },
  linhatempo: { title: "29.A. LÍNEA DE TIEMPO COLECTIVA — LA EVOLUCIÓN DE LA RX 580 COMO PLATAFORMA DE IA", desc: "Análisis histórico y comparativo unificado documentando la ruptura de barreras y obsolescencia de la RX 580 en tres etapas revolucionarias (2025-2026)." },
  audio_rvc: { title: "30. CONVERSIÓN DE VOZ LOCAL — APPLIO RVC EN AMD RX 580", desc: "Pipeline de clonación de voz en Windows sin CUDA NVIDIA" },
  audio_whisper: { title: "31. WHISPER.CPP LOCAL — TRANSCRIPCIÓN DE AUDIO EN AMD RX 580", desc: "Transcripción de audio/vídeo acelerada por GPU AMD vía Vulkan en Windows (modelo large-v3-turbo)." },
  linux_nativo: { title: "40. LINUX NATIVO — Ubuntu 26.04 LTS + RX 580 + Vulkan", desc: "AIVisionsLab — Documentación del Stack Completo en Linux Real" },
  audio_srt_ptbr: { title: "32. PIPELINE COMPLETO — TRANSCRIPCIÓN + TRADUCCIÓN ES DE VÍDEO EN INGLÉS CON RX 580", desc: "Transcripción de vídeo en inglés con traducción automática al español, del .mp4 al .srt sin ningún servicio de pago." },
  limit_qwen_35b: { title: "33. LLEVANDO AL LÍMITE QWEN3.5 35B Q6_K EN RX 580 8GB VÍA VULKAN", desc: "Experimento de ejecución híbrida extrema de un modelo de 34.66B parámetros en la GPU Polaris y Xeon de 2014." },
  proving_hypothesis_35b: { title: "34. PROBANDO LA HIPÓTESIS: CURL, CTX-SIZE 8192 Y LA PRIMERA RESPUESTA COMPLETA", desc: "Continuación directa de la Sección 33 · 3 pruebas · Hipótesis confirmada · Hardware de 2017" }
};

const FR_SECTION_HEADERS: Record<string, { title?: string; desc?: string }> = {
  contexto: { title: "01. CONTEXTE ET PROBLÈME", desc: "En 2026, le récit standard était clair : la RX 580 ne peut pas faire tourner l'IA. Analyse des écosystèmes verrouillés et viabilité de l'accélération via Vulkan." },
  hardware: { title: "02. MATÉRIEL DU LABORATOIRE", desc: "Configuration Master détaillée : Xeon E5-2690 v3, RX 580 8GB, 32GB RAM ECC et l'impact critique du NVMe." },
  falhas: { title: "03. CE QUI N'A PAS FONCTIONNÉ (LE CIMETIÈRE TECHNIQUE)", desc: "Analyse détaillée des erreurs : les raisons techniques du rejet de DirectML natif, OpenVINO et ROCm." },
  solucao: { title: "04. LA SOLUTION — ARCHITECTURE DUALE", desc: "La stratégie d'ingénierie définitive : division intelligente des charges entre GPU Vulkan et CPU Xeon." },
  prereqs: { title: "05. PRÉREQUIS SYSTÈME", desc: "Outils nécessaires pour compiler les binaires ouverts et démarrer les serveurs locaux." },
  jornada: { title: "06. JOURNÉE COMPLÈTE — LES 5 PHASES", desc: "La chronologie du laboratoire : de la lenteur initiale du CPU au contrôle total du matériel hérité." },
  llama: { title: "07. COMPILATION DE LLAMA.CPP (BACKEND VULKAN)", desc: "Étape par étape avec les commandes master pour générer les binaires LLM optimisés pour la RX 580." },
  sdcpp: { title: "08. COMPILATION DE STABLE-DIFFUSION.CPP", desc: "Génération du moteur propre en C++ pour le rendu d'images accéléré par GPU sans dépendances CUDA." },
  modelos: { title: "09. CONVERSION DES MODÈLES AU FORMAT GGUF", desc: "Optimisation et quantization des fichiers .safetensors standard au format accepté par le moteur ggml." },
  sdserver: { title: "10. INITIALISATION DU SERVEUR SD-SERVER (GPU)", desc: "Activation du service d'image sur le port local pour écouter les appels API de l'interface graphique." },
  flux_server: { title: "10.A — EXÉCUTER FLUX SUR SD-SERVER (GPU + CPU HYBRIDE)", desc: "Mapping et initialisation de l'écosystème Flux de 12B paramètres avec architecture mémoire segmentée." },
  sd_bat_automation: { title: "11.A — SD-SERVER LOCAL / SÉQUENCE DE DÉMARRAGE", desc: "Script batch dédié à l'initialisation sûre et reproductible du serveur IA." },
  sd_openwebui_integration: { title: "11.B — INTÉGRATION OPENWEBUI + DOCKER", desc: "Pont réseau entre le conteneur Docker OpenWebUI et le moteur C++ natif fonctionnant sur le GPU hôte." },
  "comfyui-wsl": { title: "12 — COMFYUI WSL2", desc: "Configuration de l'environnement Linux virtualisé pour hériter la puissance de calcul du Xeon et de la RAM ECC." },
  "comfyui-directml": { title: "13 — DIRECTML", desc: "Explication technique détaillée des échecs chroniques rencontrés lors des tests sur la branche Windows." },
  "comfyui-directml-func": { title: "14 — CORRECTIONS DIRECTML", desc: "Installation de la roue de développement spécifique pour forcer la stabilité opérationnelle." },
  "comfyui-flux": { title: "15. PARAMÉTRAGE CRITIQUE DE FLUX.1 SCHNELL", desc: "Configuration mathématique obligatoire pour traiter le modèle SOTA sur CPU sans dépasser les limites de RAM." },
  "comfyui-modelos": { title: "11.C — GESTION ZERO-COPY DES MODÈLES SUR NVME", desc: "Technique de liens symboliques pour unifier le stockage des checkpoints lourds sans dupliquer les fichiers." },
  animatediff_video: { title: "16. ANIMATEDIFF ET INTERPOLATION D'IMAGES (VIDÉO)", desc: "Injection de cohérence temporelle dans ComfyUI sur matériel hérité pour structurer des loops fluides coprocessés sur Intel Xeon." },
  stack: { title: "17. CARTE DES SERVICES DU STACK INTÉGRÉ", desc: "Tableau de surveillance d'infrastructure, routage du trafic local et backends actifs." },
  scripts: { title: "18. SCRIPTS ET AUTOMATISATION", desc: "Scripts batch pour nettoyer la mémoire vidéo et initialiser les serveurs locaux sans conflits." },
  guia: { title: "19. GUIDE STRATÉGIQUE PAR CAS D'USAGE", desc: "Matrice de décision : quand diriger le traitement vers le GPU ou vers le Xeon." },
  benchmarks: { title: "20. BENCHMARKS RÉELS DU LABORATOIRE", desc: "Données de télémétrie consolidées mesurées directement dans les logs d'inférence des deux architectures." },
  cpu: { title: "21. PARAMÉTRAGE ET AJUSTEMENTS DU XEON", desc: "Configurations BIOS et limites structurelles des instructions fp32 pour le processeur LGA 2011-3." },
  troubleshooting: { title: "23. GUIDE DE RÉSOLUTION DE PROBLÈMES (TROUBLESHOOTING)", desc: "Diagnostics rapides pour contourner les échecs de timeout d'API et seeds nuls sur le serveur." },
  "flux-vulkan": { title: "22. EXPLORATION COMPLÉMENTAIRE : FLUX VIA VULKAN", desc: "Accélération alternative des modèles Flux utilisant des quantizations ultra-compactes en C++." },
  "troubleshoot-comfyui": { title: "24. CATASTROPHE MÉMOIRE DANS COMFYUI WINDOWS", desc: "Gestion des dépassements d'allocation physique de VRAM et usage de secours des flags de pagination." },
  "comfyui-portable-amd": { title: "25. COMFYUI PORTABLE V0.3.48 — IMPLÉMENTATION AMD", desc: "Paramètres spécifiques et injection de variables d'environnement pour l'architecture Polaris." },
  comunidade: { title: "26. CONTEXTE ET SOURCES DE LA COMMUNAUTÉ", desc: "Dépôts de connaissance hacker et forums dédiés à la préservation et l'optimisation du matériel hérité." },
  amihart: { title: "26.A. MÉTHODE AMIHART — INFÉRENCE RX580 SUR POLARIS/DEBIAN", desc: "Note de Crédit : Section documentaire en hommage à la preuve de concept réalisée par 艾米心 (Amihart), pionnière dans la validation de Vulkan sous Debian GCN4/Polaris." },
  dadhacks: { title: "26.B. MÉTHODE DADHACKS — AI IMAGE GENERATION ON RX 580 USING VULKAN: A COST-EFFECTIVE SOLUTION", desc: "Analyse de la consolidation expérimentale réalisée par DH (DadHacks) en décembre 2025, établissant des chemins de compatibilité pour la génération d'images sur GPU hérité." },
  codacus: { title: "26.C — MÉTHODE CODACUS vs AIVisionsLab", desc: "Expérience des 5 flags qui ont sauvé une GTX 1060 — fonctionnent-elles sur une RX 580 ?" },
  proximos: { title: "27. PROCHAINES ÉTAPES (ROADMAP 2027)", desc: "Prochains objectifs de développement : Clusters Multi-GPU Vulkan et mesh local d'agents autonomes." },
  arquivos: { title: "28. TAXONOMIE ET STRUCTURE DES FICHIERS NVME", desc: "Arborescence unifiée pour le suivi des binaires compilés et des modèles partagés." },
  meta: { title: "29. RÉFÉRENCES ET MÉTADONNÉES DU DOCUMENT", desc: "Analyse technique du cycle de vie physique du matériel hérité et philosophie de réutilisation du laboratoire." },
  linhatempo: { title: "29.A. CHRONOLOGIE COLLECTIVE — L'ÉVOLUTION DE LA RX 580 COMME PLATEFORME D'IA", desc: "Analyse historique et comparative unifiée documentant la rupture des barrières et l'obsolescence de la RX 580 en trois étapes révolutionnaires (2025-2026)." },
  audio_rvc: { title: "30. CONVERSION VOCALE LOCALE — APPLIO RVC SUR AMD RX 580", desc: "Pipeline de clonage vocal sur Windows sans CUDA NVIDIA" },
  audio_whisper: { title: "31. WHISPER.CPP LOCAL — TRANSCRIPTION AUDIO SUR AMD RX 580", desc: "Transcription audio/vidéo accélérée par GPU AMD via Vulkan sur Windows (modèle large-v3-turbo)." },
  linux_nativo: { title: "40. LINUX NATIF — Ubuntu 26.04 LTS + RX 580 + Vulkan", desc: "AIVisionsLab — Documentation de la Stack Complète sur Linux Réel" },
  audio_srt_ptbr: { title: "32. PIPELINE COMPLET — TRANSCRIPTION + TRADUCTION FR DE VIDÉO ANGLAISE AVEC RX 580", desc: "Transcription de vidéo en anglais avec traduction automatique vers le français, du .mp4 au .srt sans aucun service payant." },
  limit_qwen_35b: { title: "33. POUSSER QWEN3.5 35B Q6_K À LA LIMITE SUR RX 580 8GB VIA VULKAN", desc: "Expérience d'exécution hybride extrême d'un modèle de 34.66B paramètres sur le GPU Polaris et Xeon de 2014." },
  proving_hypothesis_35b: { title: "34. PROUVANT L'HYPOTHÈSE : CURL, CTX-SIZE 8192 ET LA PREMIÈRE RÉPONSE COMPLÈTE", desc: "Suite directe de la Section 33 · 3 tests · Hypothèse confirmée · Matériel de 2017" }
};

const ZH_SECTION_HEADERS: Record<string, { title?: string; desc?: string }> = {
  contexto: { title: "01. 背景与问题", desc: "2026年,标准说法很明确:RX 580 无法运行 AI。分析被锁定的生态系统以及 Vulkan 加速的可行性。" },
  hardware: { title: "02. 实验室硬件", desc: "详细 Master 配置:Xeon E5-2690 v3、RX 580 8GB、32GB ECC 内存以及 NVMe 的关键影响。" },
  falhas: { title: "03. 失败的尝试(技术墓地)", desc: "详细错误分析:拒绝原生 DirectML、OpenVINO 和 ROCm 的技术原因。" },
  solucao: { title: "04. 解决方案 — 双架构", desc: "最终工程策略:Vulkan GPU 与 Xeon CPU 之间的智能负载分配。" },
  prereqs: { title: "05. 系统先决条件", desc: "编译开放二进制文件并启动本地服务器所需的工具链。" },
  jornada: { title: "06. 完整历程 — 五个阶段", desc: "实验室时间线:从 CPU 初始缓慢到完全掌控旧硬件。" },
  llama: { title: "07. LLAMA.CPP 编译(VULKAN 后端)", desc: "为 RX 580 生成优化 LLM 二进制文件的主控命令分步指南。" },
  sdcpp: { title: "08. STABLE-DIFFUSION.CPP 编译", desc: "构建纯净的 C++ 引擎,实现无 CUDA 依赖的 GPU 加速图像渲染。" },
  modelos: { title: "09. 模型转换为 GGUF 格式", desc: "将标准 .safetensors 文件优化并量化为 ggml 引擎接受的格式。" },
  sdserver: { title: "10. SD-SERVER 初始化(GPU)", desc: "在本地端口激活图像服务,监听图形界面发出的 API 调用。" },
  flux_server: { title: "10.A — 在 SD-SERVER 上运行 FLUX(GPU + CPU 混合)", desc: "12B 参数 Flux 生态系统的映射与初始化,采用分段内存架构。" },
  sd_bat_automation: { title: "11.A — 本地 SD-SERVER / 启动序列", desc: "专用批处理脚本,用于安全且可复现的 AI 服务器初始化。" },
  sd_openwebui_integration: { title: "11.B — OPENWEBUI + DOCKER 集成", desc: "OpenWebUI Docker 容器与运行在主机 GPU 上的原生 C++ 引擎之间的网络桥接。" },
  "comfyui-wsl": { title: "12 — COMFYUI WSL2", desc: "配置虚拟化 Linux 环境,继承 Xeon 和 ECC 内存的计算能力。" },
  "comfyui-directml": { title: "13 — DIRECTML", desc: "详细解释在 Windows 分支测试期间遇到的慢性故障的技术原因。" },
  "comfyui-directml-func": { title: "14 — DIRECTML 修复", desc: "安装特定的开发 wheel 以强制操作稳定性。" },
  "comfyui-flux": { title: "15. FLUX.1 SCHNELL 的关键参数化", desc: "在 CPU 上处理 SOTA 模型而不突破 RAM 限制的强制数学配置。" },
  "comfyui-modelos": { title: "11.C — NVME 上的零拷贝模型管理", desc: "使用符号链接技术统一存储大型检查点而不重复文件。" },
  animatediff_video: { title: "16. ANIMATEDIFF 与帧插值(视频)", desc: "在旧硬件上的 ComfyUI 中注入时间一致性,在 Intel Xeon 上协处理构建流畅循环。" },
  stack: { title: "17. 集成 STACK 服务映射", desc: "基础设施监控表、本地流量路由和活动后端。" },
  scripts: { title: "18. 脚本与自动化", desc: "用于清理显存并无冲突地启动本地服务器的批处理脚本。" },
  guia: { title: "19. 按用例的策略指南", desc: "决策矩阵:何时将处理指向 GPU 或 Xeon。" },
  benchmarks: { title: "20. 实验室真实 BENCHMARKS", desc: "直接从两种架构的推理日志中测量的综合遥测数据。" },
  cpu: { title: "21. XEON 参数化与调整", desc: "LGA 2011-3 处理器的 BIOS 配置和 fp32 指令的结构性限制。" },
  troubleshooting: { title: "23. 故障排除指南", desc: "绕过服务器上的 API 超时故障和空 seed 的快速诊断。" },
  "flux-vulkan": { title: "22. 补充探索:通过 VULKAN 运行 FLUX", desc: "使用 C++ 中的超紧凑量化对 Flux 模型进行替代加速。" },
  "troubleshoot-comfyui": { title: "24. COMFYUI WINDOWS 中的内存灾难", desc: "处理物理 VRAM 分配溢出和紧急使用分页标志。" },
  "comfyui-portable-amd": { title: "25. COMFYUI PORTABLE V0.3.48 — AMD 实现", desc: "针对 Polaris 架构的特定设置和环境变量注入。" },
  comunidade: { title: "26. 社区背景与来源", desc: "致力于保存和优化旧硬件的黑客知识库和论坛。" },
  amihart: { title: "26.A. AMIHART 方法 — 在 POLARIS/DEBIAN 上的 RX580 推理", desc: "致谢说明:纪念 艾米心 (Amihart) 概念验证的文献章节,她是 Debian GCN4/Polaris 下 Vulkan 验证的先驱。" },
  dadhacks: { title: "26.B. DADHACKS 方法 — AI IMAGE GENERATION ON RX 580 USING VULKAN: A COST-EFFECTIVE SOLUTION", desc: "分析 DH (DadHacks) 在 2025 年 12 月进行的实验性整合,为旧 GPU 上的图像生成建立兼容路径。" },
  codacus: { title: "26.C — CODACUS 方法 vs AIVisionsLab", desc: "拯救 GTX 1060 的 5 个标志实验 — 它们在 RX 580 上有效吗?" },
  proximos: { title: "27. 后续步骤(2027 路线图)", desc: "下一个开发目标:Vulkan 多 GPU 集群和本地自主代理网格。" },
  arquivos: { title: "28. NVME 文件分类与结构", desc: "用于跟踪已编译二进制文件和共享模型的统一目录树。" },
  meta: { title: "29. 文档引用与元数据", desc: "旧硬件物理生命周期的技术分析以及实验室的再利用哲学。" },
  linhatempo: { title: "29.A. 集体时间线 — RX 580 作为 AI 平台的演进", desc: "统一的历史和比较分析,记录了在三个革命性阶段(2025-2026)中突破 RX 580 障碍和过时化的过程。" },
  audio_rvc: { title: "30. 本地语音转换 — 在 AMD RX 580 上的 APPLIO RVC", desc: "在没有 NVIDIA CUDA 的 Windows 上的语音克隆流水线" },
  audio_whisper: { title: "31. 本地 WHISPER.CPP — 在 AMD RX 580 上的音频转录", desc: "在 Windows 上通过 Vulkan 进行 AMD GPU 加速的音频/视频转录(large-v3-turbo 模型)。" },
  linux_nativo: { title: "40. 原生 LINUX — Ubuntu 26.04 LTS + RX 580 + VULKAN", desc: "AIVisionsLab — 真实 Linux 上完整 Stack 的文档" },
  audio_srt_ptbr: { title: "32. 完整流水线 — 使用 RX 580 进行英文视频转录 + 中文字幕翻译", desc: "英文视频转录并自动翻译为中文,从 .mp4 到 .srt,无需任何付费服务。" },
  limit_qwen_35b: { title: "33. 通过 VULKAN 在 RX 580 8GB 上将 QWEN3.5 35B Q6_K 推向极限", desc: "在 Polaris GPU 和 2014 年 Xeon 上对 34.66B 参数模型进行极端混合执行的实验。" },
  proving_hypothesis_35b: { title: "34. 证明假设:CURL、CTX-SIZE 8192 和第一个完整响应", desc: "第 33 节的直接延续 · 3 项测试 · 假设已确认 · 2017 年硬件" }
};

// Helper para construir o pacote sections dinamicamente
function buildSections(
  locale: keyof typeof SECTION_CONTENT,
  headers: Record<string, { title?: string; desc?: string }>
): Record<string, SectionContent> {
  return Object.keys(SECTION_CONTENT[locale]).reduce((acc, key) => {
    const section = SECTION_CONTENT[locale][key];
    acc[key] = {
      title: headers[key]?.title || section.title,
      desc: headers[key]?.desc || section.desc,
      html: section.html
    };
    return acc;
  }, {} as Record<string, SectionContent>);
}

export const LOCALES: Record<string, LanguagePack> = {
  "pt-BR": {
    meta: {
      title: "RX 580 + IA Local — Guia Definitivo 2026 | AIVisionsLab",
      description: "Guia técnico completo para aceleração de Inteligência Artificial local na AMD Radeon RX 580 via Vulkan, com Xeon E5-2690 v3 e RAM ECC.",
      lang: "pt-BR"
    },
    nav: {
      languageLabel: "Idioma",
      github: "GitHub",
      theme: "Tema",
      themeLight: "Claro",
      themeDark: "Escuro"
    },
    sidebar: {
      title: "Manual Técnico",
      search: "Buscar seção...",
      sections: "Seções",
      progress: "Progresso de leitura"
    },
    hero: {
      badge: "Laboratório AIVisionsLab · 2026",
      title: "RX 580 +",
      titleAccent: "IA Local",
      subtitle: "Guia definitivo de engenharia para acelerar Inteligência Artificial na AMD Radeon RX 580 8GB via Vulkan, com Xeon E5-2690 v3 e 32GB de RAM ECC.",
      cta: "Começar a leitura",
      ctaSecondary: "Ver stack completo",
      stats: {
        gpu: "GPU",
        gpuValue: "RX 580 2048SP",
        cpu: "CPU",
        cpuValue: "Xeon E5-2690 v3",
        ram: "RAM",
        ramValue: "32GB DDR4 ECC",
        storage: "Armazenamento",
        storageValue: "NVMe 1TB"
      }
    },
    share: {
      title: "Compartilhar",
      copy: "Copiar link",
      copied: "Link copiado!"
    },
    footer: {
      rights: "Todos os direitos reservados.",
      disclaimer: "Hardware de 2017 processando IA de 2026. O conhecimento é livre e evolutivo."
    },
    sections: buildSections("pt-BR", PT_SECTION_HEADERS)
  },

  "en": {
    meta: {
      title: "RX 580 + Local AI — Definitive Guide 2026 | AIVisionsLab",
      description: "Complete technical guide for local Artificial Intelligence acceleration on AMD Radeon RX 580 via Vulkan, with Xeon E5-2690 v3 and ECC RAM.",
      lang: "en"
    },
    nav: {
      languageLabel: "Language",
      github: "GitHub",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark"
    },
    sidebar: {
      title: "Technical Manual",
      search: "Search section...",
      sections: "Sections",
      progress: "Reading progress"
    },
    hero: {
      badge: "AIVisionsLab Laboratory · 2026",
      title: "RX 580 +",
      titleAccent: "Local AI",
      subtitle: "Definitive engineering guide to accelerate Artificial Intelligence on AMD Radeon RX 580 8GB via Vulkan, with Xeon E5-2690 v3 and 32GB ECC RAM.",
      cta: "Start reading",
      ctaSecondary: "View full stack",
      stats: {
        gpu: "GPU",
        gpuValue: "RX 580 2048SP",
        cpu: "CPU",
        cpuValue: "Xeon E5-2690 v3",
        ram: "RAM",
        ramValue: "32GB DDR4 ECC",
        storage: "Storage",
        storageValue: "NVMe 1TB"
      }
    },
    share: {
      title: "Share",
      copy: "Copy link",
      copied: "Link copied!"
    },
    footer: {
      rights: "All rights reserved.",
      disclaimer: "2017 hardware processing 2026 AI. Knowledge is free and evolutionary."
    },
    sections: buildSections("en", EN_SECTION_HEADERS)
  },

  "es": {
    meta: {
      title: "RX 580 + IA Local — Guía Definitiva 2026 | AIVisionsLab",
      description: "Guía técnica completa para la aceleración de Inteligencia Artificial local en AMD Radeon RX 580 vía Vulkan, con Xeon E5-2690 v3 y RAM ECC.",
      lang: "es"
    },
    nav: {
      languageLabel: "Idioma",
      github: "GitHub",
      theme: "Tema",
      themeLight: "Claro",
      themeDark: "Oscuro"
    },
    sidebar: {
      title: "Manual Técnico",
      search: "Buscar sección...",
      sections: "Secciones",
      progress: "Progreso de lectura"
    },
    hero: {
      badge: "Laboratorio AIVisionsLab · 2026",
      title: "RX 580 +",
      titleAccent: "IA Local",
      subtitle: "Guía definitiva de ingeniería para acelerar Inteligencia Artificial en AMD Radeon RX 580 8GB vía Vulkan, con Xeon E5-2690 v3 y 32GB de RAM ECC.",
      cta: "Comenzar a leer",
      ctaSecondary: "Ver stack completo",
      stats: {
        gpu: "GPU",
        gpuValue: "RX 580 2048SP",
        cpu: "CPU",
        cpuValue: "Xeon E5-2690 v3",
        ram: "RAM",
        ramValue: "32GB DDR4 ECC",
        storage: "Almacenamiento",
        storageValue: "NVMe 1TB"
      }
    },
    share: {
      title: "Compartir",
      copy: "Copiar enlace",
      copied: "¡Enlace copiado!"
    },
    footer: {
      rights: "Todos los derechos reservados.",
      disclaimer: "Hardware de 2017 procesando IA de 2026. El conocimiento es libre y evolutivo."
    },
    sections: buildSections("es", ES_SECTION_HEADERS)
  },

  "fr": {
    meta: {
      title: "RX 580 + IA Locale — Guide Définitif 2026 | AIVisionsLab",
      description: "Guide technique complet pour l'accélération locale de l'Intelligence Artificielle sur AMD Radeon RX 580 via Vulkan, avec Xeon E5-2690 v3 et RAM ECC.",
      lang: "fr"
    },
    nav: {
      languageLabel: "Langue",
      github: "GitHub",
      theme: "Thème",
      themeLight: "Clair",
      themeDark: "Sombre"
    },
    sidebar: {
      title: "Manuel Technique",
      search: "Rechercher une section...",
      sections: "Sections",
      progress: "Progression de lecture"
    },
    hero: {
      badge: "Laboratoire AIVisionsLab · 2026",
      title: "RX 580 +",
      titleAccent: "IA Locale",
      subtitle: "Guide d'ingénierie définitif pour accélérer l'Intelligence Artificielle sur AMD Radeon RX 580 8GB via Vulkan, avec Xeon E5-2690 v3 et 32GB de RAM ECC.",
      cta: "Commencer la lecture",
      ctaSecondary: "Voir le stack complet",
      stats: {
        gpu: "GPU",
        gpuValue: "RX 580 2048SP",
        cpu: "CPU",
        cpuValue: "Xeon E5-2690 v3",
        ram: "RAM",
        ramValue: "32GB DDR4 ECC",
        storage: "Stockage",
        storageValue: "NVMe 1TB"
      }
    },
    share: {
      title: "Partager",
      copy: "Copier le lien",
      copied: "Lien copié !"
    },
    footer: {
      rights: "Tous droits réservés.",
      disclaimer: "Matériel de 2017 traitant l'IA de 2026. La connaissance est libre et évolutive."
    },
    sections: buildSections("fr", FR_SECTION_HEADERS)
  },

  "zh-CN": {
    meta: {
      title: "RX 580 + 本地 AI — 2026 权威指南 | AIVisionsLab",
      description: "通过 Vulkan 在 AMD Radeon RX 580 上加速本地人工智能的完整技术指南,搭配 Xeon E5-2690 v3 和 ECC 内存。",
      lang: "zh-CN"
    },
    nav: {
      languageLabel: "语言",
      github: "GitHub",
      theme: "主题",
      themeLight: "浅色",
      themeDark: "深色"
    },
    sidebar: {
      title: "技术手册",
      search: "搜索章节...",
      sections: "章节",
      progress: "阅读进度"
    },
    hero: {
      badge: "AIVisionsLab 实验室 · 2026",
      title: "RX 580 +",
      titleAccent: "本地 AI",
      subtitle: "通过 Vulkan 在 AMD Radeon RX 580 8GB 上加速人工智能的权威工程指南,搭配 Xeon E5-2690 v3 和 32GB ECC 内存。",
      cta: "开始阅读",
      ctaSecondary: "查看完整堆栈",
      stats: {
        gpu: "GPU",
        gpuValue: "RX 580 2048SP",
        cpu: "CPU",
        cpuValue: "Xeon E5-2690 v3",
        ram: "内存",
        ramValue: "32GB DDR4 ECC",
        storage: "存储",
        storageValue: "NVMe 1TB"
      }
    },
    share: {
      title: "分享",
      copy: "复制链接",
      copied: "链接已复制!"
    },
    footer: {
      rights: "保留所有权利。",
      disclaimer: "2017 年的硬件处理 2026 年的 AI。知识是自由且不断进化的。"
    },
    sections: buildSections("zh-CN", ZH_SECTION_HEADERS)
  }
};

export const DEFAULT_LOCALE = "pt-BR";
export const SUPPORTED_LOCALES = Object.keys(LOCALES);