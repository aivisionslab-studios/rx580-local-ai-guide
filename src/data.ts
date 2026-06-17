// src/data.ts
import { SECTION_CONTENT } from "./content/data.js";

export interface SectionContent {
  title: string;
  desc: string;
  html: string;
}

export interface LanguagePack {
  dir: "ltr" | "rtl";
  meta: { title: string };
  nav: {
    brand: string;
    subtitle: string;
    status: string;
  };
  sidebar: {
    directory: string;
    syslog: string;
    syslog_lines: string[];
    groups: {
      foundation: string;
      gpu: string;
      comfy: string;
      stack: string;
      experimental: string;
      operations: string;
      maintenance: string;
    };
  };
  hero: {
    title: string;
    subtitle: string;
    desc: string;
    q1: string;
    q2: string;
    q3: string;
    stat_gpu_lbl: string;
    stat_vram_lbl: string;
    stat_cpu_lbl: string;
    stat_status_lbl: string;
    stat_status_val: string;
  };
  share: {
    guerrilla_title: string;
    guerrilla_desc: string;
    btn_copy_link: string;
    btn_offline_html: string;
    btn_pdf_print: string;
    btn_qr_code: string;
    qr_code_text: string;
    toast_copied: string;
  };
  footer: {
    brand: string;
    q1: string;
    q2: string;
    note: string;
    tech_label: string;
    authors_label: string;
    copyright: string;
    version_tag: string;
  };
  sections: { [key: string]: SectionContent };
}

const EN_SECTION_HEADERS: Record<string, { title: string; desc: string }> = {
  "contexto": {
    "title": "01. CONTEXT AND PROBLEM",
    "desc": "In 2026, the standard narrative was clear: RX 580 does not run AI. Analysis of locked ecosystems and the paradigm shift via Vulkan."
  },
  "hardware": {
    "title": "02. COMPREHENSIVE LABORATORY HARDWARE",
    "desc": "Master specs: Xeon E5-2690 v3, RX 580 8GB, 32GB REG ECC, and the technical impact of high-speed NVMe storage."
  },
  "falhas": {
    "title": "03. TECHNICAL GRAVEYARD (WHAT FAILED)",
    "desc": "In-depth root cause analysis of DirectML OpaqueTensorImpl exceptions and broken Forge extensions."
  },
  "solucao": {
    "title": "04. THE SOLUTION — DUAL ARCHITECTURE",
    "desc": "Smart resource distribution: Vulkan API for GPU acceleration and native WSL2 core mapping for heavy SOTA models."
  },
  "prereqs": {
    "title": "05. SYSTEM PREREQUISITES",
    "desc": "Required tools, compiler flags, and target SDK layers for functional local building."
  },
  "jornada": {
    "title": "06. JOURNEY TIMELINE — THE 5 PHASES",
    "desc": "From painful CPU rendering speeds on mechanical drives to stable sub-minute local generation loops."
  },
  "llama": {
    "title": "07. LLAMA.CPP VULKAN COMPILATION",
    "desc": "Terminal loops to generate optimized LLM server runtimes targeting AMD cards."
  },
  "sdcpp": {
    "title": "08. STABLE-DIFFUSION.CPP ENGINE SOURCE",
    "desc": "Compiling light image generation code blocks using multi-threaded compiler routines."
  },
  "modelos": {
    "title": "09. QUANTIZED MODEL CONVERSION ENGINE",
    "desc": "Translating weights from raw safetensors arrays into structured .gguf assets."
  },
  "sdserver": {
    "title": "10. RUN SD-SERVER (GPU)",
    "desc": "Spinning up the background service thread on network ports for GUI API connection hooks."
  },
  "flux_server": {
    "title": "10.A — RUN FLUX ON SD-SERVER (HYBRID)",
    "desc": "Mapping and initialization of the 12B parameter Flux ecosystem with segmented memory architecture."
  },
  "sd_bat_automation": {
    "title": "11.A — SD-SERVER LOCAL / BOOT SEQUENCE",
    "desc": "Dedicated batch script for secure and reproducible initialization of the AI server."
  },
  "sd_openwebui_integration": {
    "title": "11.B — OPENWEBUI + DOCKER INTEGRATION",
    "desc": "Network bridge between the OpenWebUI Docker container and the native C++ engine running on the host GPU."
  },
  "comfyui-modelos": {
    "title": "11.C — ZERO-COPY STORAGE SYSTEM VIA SYMLINKS",
    "desc": "Eliminating duplication across cross-OS boundaries by linking folders to NVMe drives."
  },
  "comfyui-wsl": {
    "title": "12 — COMFYUI WSL2",
    "desc": "Isolating Python environments inside virtualized Linux nodes to maximize server stability."
  },
  "comfyui-directml": {
    "title": "13 — DIRECTML",
    "desc": "Analyzing opaque memory allocations that prevent proper graph calculations."
  },
  "comfyui-directml-func": {
    "title": "14 — FIXES DIRECTML",
    "desc": "Command strings to override development wheels and force stability checks."
  },
  "comfyui-flux": {
    "title": "15. FLUX.1 SCHNELL CPU SAMPLING LAWS",
    "desc": "Strict sampling matrices required to compute heavy generation steps inside system RAM arrays."
  },
  "animatediff-video": {
    "title": "16. ANIMATEDIFF & FRAME INTERPOLATION OPS",
    "desc": "Injecting temporal consistency in ComfyUI over legacy hardware to build fluid loops co-processed on the Intel Xeon."
  },
  "stack": {
    "title": "17. SERVICE ROUTING & PORTS TAXONOMY",
    "desc": "Central network mappings, processes, port designations, and hardware cores engaged."
  },
  "scripts": {
    "title": "18. UTILITIES & FLUSHING SCRIPTS",
    "desc": "VRAM flushing operations and automated recovery loops to restore dead background tasks."
  },
  "guia": {
    "title": "19. LOAD BALANCING DECIDABILITY MATRIX",
    "desc": "Engineering rulebooks on when to direct renders to Vulkan and when to drop to CPU pipelines."
  },
  "benchmarks": {
    "title": "20. LABORATORY PERFORMANCE METRICS",
    "desc": "Consolidated generation timelines and metrics across both frontends."
  },
  "cpu": {
    "title": "21. XEON VECTOR RUNTIME OPTIMIZATION",
    "desc": "Tuning bios and compilation switches to extract optimal performance under AVX2 architectures."
  },
  "flux-vulkan": {
    "title": "22. MODEL LOADING LAWS TARGETING LOW-VRAM",
    "desc": "Extreme tests: pulling 12B parameters within 3-bit weights into 8GB Polaris frame buffers."
  },
  "troubleshooting": {
    "title": "23. DISASTER RECOVERY PROTOCOLS",
    "desc": "Rapid triage charts for driver timeouts, blank renders, and server crashes."
  },
  "troubleshoot-comfyui": {
    "title": "24. COMFYUI OUT-OF-MEMORY SAFEGUARD",
    "desc": "Command line modifications to activate low memory mode and restore memory chunks."
  },
  "comfyui-portable-amd": {
    "title": "25. PORTABLE COMPILED SYSTEM DEPLOYMENT",
    "desc": "Injecting global environment flags to simulate newer hardware platforms on standard legacy GPUs."
  },
  "comunidade": {
    "title": "26. KNOWLEDGE BASE & GEEK REPOSITORIES",
    "desc": "Accessing international hardware preservation boards and local driver optimization streams."
  },
  "amihart": {
    "title": "26.A. AMIHART CONTAINER STACKS",
    "desc": "Technical overview of containerized Debian deployments yielding highly efficient local inference."
  },
  "dadhacks": {
    "title": "26.B. DADHACKS DIRECT PORTABILITY",
    "desc": "Working around discontinued manufacturer drivers by communicating directly with Vulkan API headers."
  },
  "codacus": {
    "title": "26.C. CODACUS METHOD vs AIVisionsLab",
    "desc": "Testing 5 optimization flags that saved a 6GB GTX 1060 — Do they work on Polaris AMD Vulkan?"
  },
  "proximos": {
    "title": "27. THE 2027 MILESTONES & DISPATCH PLANS",
    "desc": "Future roadmap: multi-GPU pooling, local dispatch clusters, and distributed context."
  },
  "arquivos": {
    "title": "28. NVME PATH TAXONOMY",
    "desc": "Establishing clean storage directories for weights and cache resources."
  },
  "meta": {
    "title": "29. GENERAL METADATA & CONTROL SHA",
    "desc": "Closing verification checks and runtime timestamp validation."
  },
  "linhatempo": {
    "title": "29.A. HISTORY OF COLLABORATION",
    "desc": "Visual interactive history of how global developers restored usability to legacy GPUs."
  },
  "audio_rvc": {
    "title": "30. LOCAL VOICE CONVERSION — APPLIO RVC ON AMD RX 580",
    "desc": "Quickstart guides and VRAM panic mitigations for training and inference."
  },
  "audio_whisper": {
    "title": "31. LOCAL AUDIO TRANSCRIBING — WHISPER.CPP ON AMD RX 580",
    "desc": "Transcribing audio/video with Vulkan GPU acceleration on Windows AMD."
  },
  "audio_srt_ptbr": {
    "title": "32. EN TO PT-BR TRANSLATION PIPELINE ON RX 580",
    "desc": "Step-by-step pipeline from video (.mp4) to Portuguese subtitles (.srt) utilizing open backends without cloud dependencies."
  },
  "linux_nativo": {
    "title": "40. BARE-METAL LINUX — Ubuntu 26.04 LTS + RX 580 + Vulkan",
    "desc": "AIVisionsLab — Production-grade full native Linux stack documentation"
  },
  "limit_qwen_35b": {
    "title": "33. LIMIT-TESTING — QWEN3.5 35B ON AMD RX 580 GDDR5",
    "desc": "Full production logs and benchmarks of a 34.66B parameter model successfully run in hybrid Vulkan split."
  },
  "proving_hypothesis_35b": {
    "title": "34. PROVING THE HYPOTHESIS — CURL, CTX-SIZE 8192 AND FIRST FULL RESPONSE",
    "desc": "Conclusive physical trials validating ctx padding, client-side timeouts, and Q4_K_M vs Q6_K on legacy cores."
  }
};

const ES_SECTION_HEADERS: Record<string, { title: string; desc: string }> = {
  "contexto": {
    "title": "01. CONTEXTO Y PROBLEMÁTICA",
    "desc": "La narrativa estándar en 2026: la RX 580 no sirve para IA. Análisis del ecosistema cerrado."
  },
  "hardware": {
    "title": "02. COMPONENTES DEL LABORATORIO",
    "desc": "Servidor local: Xeon E5-2690 v3, RX 580 8GB, 32GB REG ECC y SSD NVMe."
  },
  "falhas": {
    "title": "03. EL CEMENTERIO DE ENSAYOS FALLIDOS",
    "desc": "Por qué fallaron DirectML y las extensiones rotas de Forge."
  },
  "solucao": {
    "title": "04. LA SOLUCIÓN GLOBAL DE DOS LABORES",
    "desc": "Vulkan API para GPU e hilos de CPU para modelos masivos."
  },
  "prereqs": {
    "title": "05. PRERREQUISITOS DEL ENTORNO",
    "desc": "Librerías, drivers Vulkan y herramientas de compilación requeridas."
  },
  "jornada": {
    "title": "06. CRONOLOGÍA DE LA REGENERACIÓN",
    "desc": "El trayecto desde minutos interminables en discos mecánicos a generación en subminuto."
  },
  "llama": {
    "title": "07. COMPILACIÓN DE LLAMA.CPP VULKAN",
    "desc": "Compilar el servidor LLM con aceleración de GPU bajo Vulkan."
  },
  "sdcpp": {
    "title": "08. MOTOR STABLE-DIFFUSION.CPP NATIVO",
    "desc": "Ensamblar el generador ligero de imágenes usando APIs nativas de C++."
  },
  "modelos": {
    "title": "09. CONVERSIÓN Y QUANTIZACIÓN DE MODELOS",
    "desc": "Transformar pesos .safetensors pesados a formato de inferencia local .gguf."
  },
  "sdserver": {
    "title": "10. CONFIGURACIÓN DEL SERVIDOR SD (GPU)",
    "desc": "Estabilidad del hilo de GPU Vulkan escuchando llamadas API externas."
  },
  "flux_server": {
    "title": "10.A RUN FLUX EN SD-SERVER (HÍBRIDO)",
    "desc": "Desdoble del el modelo Flux de 12B parámetros entre RAM del sistema y VRAM."
  },
  "sd_bat_automation": {
    "title": "11.A — SD-SERVER LOCAL / BOOT SEQUENCE",
    "desc": "Script batch para inicialización consistente del servidor de imágenes."
  },
  "sd_openwebui_integration": {
    "title": "11.B — INTREGRACIÓN OPENWEBUI + LOCAL ENGINE",
    "desc": "Conectar contenedores Docker del frontend con la inferencia de C++ en Windows."
  },
  "comfyui-modelos": {
    "title": "11.C — ENLACES SIMBÓLICOS DE PESOS ZERO-COPY",
    "desc": "Evitar copias innecesarias en discos duros entre diferentes sistemas operativos."
  },
  "comfyui-wsl": {
    "title": "12 — COMFYUI WSL2",
    "desc": "Aislamiento de dependencias de Python en contenedores de Linux para maximizar estabilidad."
  },
  "comfyui-directml": {
    "title": "13 — DIRECTML",
    "desc": "Análisis técnico de errores de asignación de memoria e interrupciones del hilo."
  },
  "comfyui-directml-func": {
    "title": "14 — FIXES DIRECTML",
    "desc": "Comandos específicos para forzar la instalación de dependencias compatibles."
  },
  "comfyui-flux": {
    "title": "15. SAMPLING DE FLUX.1 SCHNELL EN CPU",
    "desc": "Fórmulas matemáticas para realizar la inferencia sobre RAM del sistema Xeon."
  },
  "animatediff-video": {
    "title": "16. TEMPORALIDAD EN ANIMATEDIFF Y VÍDEO",
    "desc": "Generación de secuencias fluidas de fotogramas usando ComfyUI en hardware legacy."
  },
  "stack": {
    "title": "17. HOJA DE ENRUTAMIENTO Y PUERTOS",
    "desc": "Tabla técnica de puertos de escucha para todos los servicios del servidor local."
  },
  "scripts": {
    "title": "18. SCRIPTS DE LIMPIEZA Y SOPORTE",
    "desc": "Utilidades para purgar VRAM estancada y reiniciar los hilos caídos."
  },
  "guia": {
    "title": "19. MATRIZ DE ASIGNACIÓN DE CARGA",
    "desc": "Determinación condicional sobre cuándo delegar a GPU Vulkan y cuándo al procesador Xeon."
  },
  "benchmarks": {
    "title": "20. MÉTRICAS DE RENDIMIENTO REAL",
    "desc": "Datos reales de generación tomados directamente en laboratorios."
  },
  "cpu": {
    "title": "21. MATRIZ DE INSTRUCCIONES VECTORIALES XEON",
    "desc": "Ajuste de bios y vectores de optimización para plataformas socket 2011-3."
  },
  "flux-vulkan": {
    "title": "22. MODELOS COMPACTOS EN VRAM GPU",
    "desc": "Caminos alternativos: cuantizaciones compactas Q3_K_S de Flux en límites de 8GB VRAM."
  },
  "troubleshooting": {
    "title": "23. PLAN DE DISASTER RECOVERY: ERRORES",
    "desc": "Soluciones para timeouts de API local, pantallas negras y cuelgues del motor."
  },
  "troubleshoot-comfyui": {
    "title": "24. FALLOS DE ASIGNACIÓN DE MEMORIA COMFYUI",
    "desc": "Gestión de errores OOM y uso del toggle `--lowvram` en arranque."
  },
  "comfyui-portable-amd": {
    "title": "25. PAQUETES PORTÁTILES PARAMETRIZADOS",
    "desc": "Variables globales de compatibilidad para asegurar estabilidad en Polaris legadas."
  },
  "comunidade": {
    "title": "26. REPOSITORIOS Y COMUNIDAD",
    "desc": "Plataformas de development de hardware reusado e hilos de optimización."
  },
  "amihart": {
    "title": "26.A. MÉTODO AMIHART — CONTENEDORES COBALT",
    "desc": "Análisis de la arquitectura sandbox en Debian para compilar llama.cpp a 24.56 t/s."
  },
  "dadhacks": {
    "title": "26.B. MÉTODO DADHACKS — COMPILACIÓN VULKAN",
    "desc": "Cómo saltarse las dependencias inservibles de ROCm a través de librerías nativas Vulkan."
  },
  "codacus": {
    "title": "26.C. MÉTODO CODACUS vs AIVisionsLab",
    "desc": "Probando las 5 flags de optimización que salvaron una GTX 1060 de 6GB —¿Funcionan en Polaris AMD Vulkan?"
  },
  "proximos": {
    "title": "27. HOJA DE RUTA E HITOS 2027",
    "desc": "Nuevos objetivos centrados en redes multi-GPU Vulkan y sistemas multiagente locales."
  },
  "arquivos": {
    "title": "28. TAXONOMÍA E INVENTARIO DE DIRECTORIOS",
    "desc": "Asignación unificada de rutas físicas dentro del disco de alto rendimiento NVMe."
  },
  "meta": {
    "title": "29. SISTEMA DE METADATOS Y CONTROL",
    "desc": "Constantes generales del sistema y versión de despliegue para validar este lab."
  },
  "linhatempo": {
    "title": "29.A. HISTORIA COLECTIVA DE COLABORACIÓN",
    "desc": "Recorrido histórico detallando cómo Vulkan reemplazó las APIs comerciales y revivió Polaris."
  },
  "audio_rvc": {
    "title": "30. CONVERSIÓN DE VOZ LOCAL — APPLIO RVC EN AMD RX 580",
    "desc": "Inicio rápido y mitigación de pânico de VRAM para entrenamientos e inferencias."
  },
  "audio_whisper": {
    "title": "31. TRANSCRIBIR AUDIO LOCAL — WHISPER.CPP EN AMD RX 580",
    "desc": "Transcripción de audio/video con aceleración Vulkan GPU AMD en Windows."
  },
  "audio_srt_ptbr": {
    "title": "32. PIPELINE COMPLETO DE TRADUCCIÓN EN A PT-BR CON RX 580",
    "desc": "Flujo de trabajo completo de traducción de video .mp4 a subtítulos .srt en portugués brasileño usando Vulkan."
  },
  "linux_nativo": {
    "title": "40. LINUX NATIVO — Ubuntu 26.04 LTS + RX 580 + Vulkan",
    "desc": "AIVisionsLab — Documentación de la pila de producción robusta en Linux puro"
  },
  "limit_qwen_35b": {
    "title": "33. LLEVANDO AL LÍMITE — QWEN3.5 35B EN AMD RX 580",
    "desc": "Registros completos de producción y benchmarks de un modelo de 34.66B de parámetros en Vulkan híbrido."
  },
  "proving_hypothesis_35b": {
    "title": "34. PROBANDO LA HIPÓTESIS — CURL, CTX-SIZE 8192 Y PRIMERA RESPUESTA COMPLETA",
    "desc": "Pruebas físicas concluyentes que validan el relleno de contexto, timeouts de cliente y Q4_K_M vs Q6_K."
  }
};

const RU_SECTION_HEADERS: Record<string, { title: string; desc: string }> = {
  "contexto": {
    "title": "01. КОНТЕКСТ И ПРОБЛЕМА",
    "desc": "В 2026 году стандартный вердикт гласил: RX 580 не предназначена для ИИ. Анализ закрытых экосистем и прорыв через Vulkan API."
  },
  "hardware": {
    "title": "02. ПОЛНАЯ СПЕЦИФИКАЦИЯ ОБОРУДОВАНИЯ",
    "desc": "Параметры стенда: Xeon E5-2690 v3, RX 580 8GB, 32GB REG ECC и влияние высокоскоростного NVMe SSD."
  },
  "falhas": {
    "title": "03. КЛАДБИЩЕ ТЕХНОЛОГИЙ (ЧТО ПОШЛО НЕ ТАК)",
    "desc": "Глубокий анализ причин сбоев DirectML OpaqueTensorImpl и несовместимости расширений Forge."
  },
  "solucao": {
    "title": "04. РЕШЕНИЕ — ДВОЙНАЯ АРХИТЕКТУРА",
    "desc": "Умное распределение задач: Vulkan API для ускорения вычислений на GPU и хост-память WSL2 для тяжелых SOTA моделей."
  },
  "prereqs": {
    "title": "05. СИСТЕМНЫЕ ТРЕБОВАНИЯ",
    "desc": "Необходимый стек, флаги компилятора и зависимости SDK для успешной сборки на локальной машине."
  },
  "jornada": {
    "title": "06. ХРОНОЛОГИЯ РАБОТ — 5 ФАЗ",
    "desc": "Путь от медленного рендеринга на старых HDD до стабильных генераций на GPU в пределах минуты."
  },
  "llama": {
    "title": "07. СБОРКА LLAMA.CPP С ПОДДЕРЖКОЙ VULKAN",
    "desc": "Консольные команды для компиляции производительного ядра LLM-сервера под карты AMD."
  },
  "sdcpp": {
    "title": "08. ИСХОДНЫЙ КОД STABLE-DIFFUSION.CPP",
    "desc": "Компиляция облегченного генератора изображений на базе библиотек вычислений Vulkan."
  },
  "modelos": {
    "title": "09. КОНВЕРТАЦИЯ ВЕСОВ В СЖАТЫЙ GGUF-ФОРМАТ",
    "desc": "Перенос весов из громоздких safetensors в структурированные легковесные файлы формата .gguf."
  },
  "sdserver": {
    "title": "10. ЗАПУСК SD-SERVER (GPU)",
    "desc": "Запуск фонового сетевого сервиса для интеграции с внешними графическими интерфейсами по API."
  },
  "flux_server": {
    "title": "10.A — КОРРЕКТНЫЙ ЗАПУСК FLUX (ГИБРИД GPU + CPU)",
    "desc": "Конфигурация и запуск 12B Flux-семейства с разделением участков весов между VRAM и оперативной памятью."
  },
  "sd_bat_automation": {
    "title": "11.A — SD-SERVER LOCAL / BOOT SEQUENCE",
    "desc": "Специальный пакетный файл для быстрой, защищенной и воспроизводимой инициализации серверов локального ИИ."
  },
  "sd_openwebui_integration": {
    "title": "11.B — МОСТ: OPENWEBUI (DOCKER) + STABLE-DIFFUSION.CPP (LOCAL)",
    "desc": "Сетевой интерфейс для привязки контейнера OpenWebUI к хостовому инференс-сервису на базе Vulkan-драйвера."
  },
  "comfyui-modelos": {
    "title": "11.C — СИСТЕМА ЛИНКОВ БЕЗ ДУБЛИРОВАНИЯ ФАЙЛОВ",
    "desc": "Отказ от лишних копий моделей с помощью символических ссылок между разделами ОС."
  },
  "comfyui-wsl": {
    "title": "12 — COMFYUI WSL2",
    "desc": "Изоляция рабочих сред Python в производительном Linux-окружении для обеспечения аптайма."
  },
  "comfyui-directml": {
    "title": "13 — DIRECTML",
    "desc": "Анализ конфликтов выделения памяти opaque-типа, нарушающих исполнение графов ComfyUI."
  },
  "comfyui-directml-func": {
    "title": "14 — FIXES DIRECTML",
    "desc": "Специальные команды установки wheels-пакетов под Windows для исправления падений."
  },
  "comfyui-flux": {
    "title": "15. ПРАВИЛА ВЫЧИСЛЕНИЙ FLUX.1 SCHNELL НА CPU",
    "desc": "Параметры сэмплинга для качественного просчета сложной диффузии на базе процессоров Xeon."
  },
  "animatediff-video": {
    "title": "16. ANIMATEDIFF И ИНТЕРПОЛЯЦИЯ В WSL2",
    "desc": "Внедрение временной последовательности кадров в ComfyUI на старом железе силами процессора Intel Xeon."
  },
  "stack": {
    "title": "17. ТАБЛИЦА СЛУЖБ И РАСПРЕДЕЛЕНИЯ ПОРТОВ",
    "desc": "Интеграционная карта сетевых портов, используемых компонентов и вовлеченных ядер."
  },
  "scripts": {
    "title": "18. ВСПОМОГАТЕЛЬНЫЕ СКРИПТЫ СИСТЕМЫ",
    "desc": "Утилиты очистки видеопамяти и безопасного перезапуска процессов без оставшихся зомби-сессий."
  },
  "guia": {
    "title": "19. ТАБЛИЦА РЕШЕНИЙ ПО РАСПРЕДЕЛЕНИЮ НАГРУЗКИ",
    "desc": "Руководство: когда нагружать Vulkan GPU, а когда задействовать массив ECC RAM процессора Xeon."
  },
  "benchmarks": {
    "title": "20. РЕЗУЛЬТАТЫ ЛАБОРАТОРНЫХ ТЕСТОВ",
    "desc": "Сводная телеметрия времени генерации на различных конфигурациях инференса."
  },
  "cpu": {
    "title": "21. УПРАВЛЕНИЕ ВЕКТОРНЫМИ ИНСТРУКЦИЯМИ XEON",
    "desc": "Тюнинг Bios и флагов компиляции для многоядерных Haswell-архитектур (LGA 2011-3)."
  },
  "flux-vulkan": {
    "title": "22. ЗАПУСК ОПТИМИЗИРОВАННОГО FLUX В VRAM GPU",
    "desc": "Альтернативные методы: сжатые 3-битные квантования Schnell-моделей в пределах лимита 8 ГБ."
  },
  "troubleshooting": {
    "title": "23. УСТРАНЕНИЕ СБОЕВ: БАЗА ЗНАНИЙ RECOVERY",
    "desc": "Быстрые фиксы ошибок таймаутов API, пустых результатов и черных изображений."
  },
  "troubleshoot-comfyui": {
    "title": "24. ОШИБКИ ИСЧЕРПАНИЯ ХОСТ-ПАМЯТИ COMFYUI",
    "desc": "Устранение падений OOM и принудительный запуск в ультра-экономном режиме параметров lowvram."
  },
  "comfyui-portable-amd": {
    "title": "25. ПОРТАТИВНЫЕ РЕШЕНИЯ И ПЕРЕМЕННЫЕ ХОСТА",
    "desc": "Параметры переопределения драйверов для стабильной работы старых чипов Polaris."
  },
  "comunidade": {
    "title": "26. СООБЩЕСТВА И ХАКЕРСКИЕ РЕПОЗИТОРИИ",
    "desc": "Форумы энтузиастов по реанимации серверного железа и доске объявлений по оптимизации."
  },
  "amihart": {
    "title": "26.A. МЕТОД AMIHART — КОНТЕЙНЕРЫ COBALT",
    "desc": "Обзор архитектуры рендеринга llama.cpp на чистом Vulkan API со скоростью 24.56 токенов/сек."
  },
  "dadhacks": {
    "title": "26.B. МЕТОД DADHACKS — ЧИСТЫЙ VULKAN И SD",
    "desc": "Обход ограничений официального SDK производителя путем прямой линковки Vulkan-заголовков."
  },
  "codacus": {
    "title": "26.C. МЕТОД CODACUS VS AIVISIONSLAB",
    "desc": "Тестирование 5 флагов оптимизации, которые спасли GTX 1060 6GB — работают ли они на Polaris AMD Vulkan?"
  },
  "proximos": {
    "title": "27. ТЕХНИЧЕСКИЕ ПЛАНЫ НА СЕЗОН 2027",
    "desc": "Амбициозные вехи: распределенные мульти-GPU массивы Vulkan и локальные сети агентов."
  },
  "arquivos": {
    "title": "28. ТАКСОНОМИЯ И ОРГАНИЗАЦИЯ НА SSD NVMe",
    "desc": "Схема расположения исполняемых файлов и папок моделей на быстром накопителе."
  },
  "meta": {
    "title": "29. МЕТАДАННЫЕ И СИСТЕМНЫЙ КОНТРОЛЬ",
    "desc": "Хранители констант ядра и текущая версия билда для валидации системы."
  },
  "linhatempo": {
    "title": "29.A. ИСТОРИЯ КОЛЛЕКТИВНОЙ ЭВОЛЮЦИИ",
    "desc": "Историческая веха: как открытый стек Vulkan обошел ограничения производителей и спас кремний."
  },
  "audio_rvc": {
    "title": "30. LOCAL VOICE CONVERSION — APPLIO RVC ON AMD RX 580",
    "desc": "Quickstart guides and VRAM panic mitigations for training and inference."
  },
  "audio_whisper": {
    "title": "31. ЛОКАЛЬНОЕ РАСПОЗНАВАНИЕ РЕЧИ — WHISPER.CPP НА AMD RX 580",
    "desc": "Распознавание речи/видео с аппаратным ускорением Vulkan на GPU AMD в Windows."
  },
  "audio_srt_ptbr": {
    "title": "32. ПОЛНЫЙ КОНВЕЙЕР ПЕРЕВОДА НА POR-BR НА RX 580",
    "desc": "Полный конвейer перевода видео (.mp4) в субтитры (.srt) на бразильском португальском с использованием Vulkan."
  },
  "linux_nativo": {
    "title": "40. ЧИСТЫЙ LINUX — Ubuntu 26.04 LTS + RX 580 + Vulkan",
    "desc": "AIVisionsLab — Документирование полноценного производственного Linux-стека"
  },
  "limit_qwen_35b": {
    "title": "33. НА ПРЕДЕЛЕ ВОЗМОЖНОСТЕЙ — QWEN3.5 35B НА AMD RX 580",
    "desc": "Полные производственные журналы и результаты тестов модели на 34.66 млрд параметров в гибридном режиме Vulkan."
  },
  "proving_hypothesis_35b": {
    "title": "34. ПРОВЕРКА ГИПОТЕЗЫ — CURL, CTX-SIZE 8192 И ПЕРВЫЙ ПОЛНЫЙ ОТВЕТ",
    "desc": "Успешные физические испытания, подтверждающие влияние контекста, тайм-аутов и сравнение Q4_K_M и Q6_K."
  }
};

const ZH_SECTION_HEADERS: Record<string, { title: string; desc: string }> = {
  "contexto": {
    "title": "01. 背景和面临问题",
    "desc": "2026 年，主流论调绝对偏激：老卡 RX 580 不可能运行本地 AI。分析生态壁垒及 Vulkan 指令集如何打破僵局。"
  },
  "hardware": {
    "title": "02. 实验室服务器完整硬件清单",
    "desc": "硬件架构设计：Xeon E5-2690 v3 核心，RX 580 8GB 显卡，32GB REG ECC 高稳定性内存及高速 NVMe 硬盘支持。"
  },
  "falhas": {
    "title": "03. 技术乱葬岗 (已确认的失败实践)",
    "desc": "深度解析 DirectML 中 OpaqueTensorImpl 句柄异常与 Forge 面板兼容性拓展的底层灾难性崩溃原因。"
  },
  "solucao": {
    "title": "04. 终极救赎 — CPU/GPU 双轨融合路线",
    "desc": "软硬件协同分配：针对轻量网络使用 Vulkan API 极速部署，而对于重量 SOTA 模型转到 WSL2 并依靠 CPU 进行多线程渲染。"
  },
  "prereqs": {
    "title": "05. 开发与部署前置条件",
    "desc": "配置编译环路：全局 CMake、Microsoft Visual Studio 编译器组件以及 Vulkan SDK 的安装与注册。"
  },
  "jornada": {
    "title": "06. 开源拓荒史 — 5 大部署历史阶段",
    "desc": "从旧机械硬盘上绝望的十几分钟长渲染，过渡到物理 GPU Vulkan 设备的秒级生成环路。"
  },
  "llama": {
    "title": "07. LLAMA.CPP VULKAN 编译构建",
    "desc": "使用 Vulkan 后端编译优化 llama.cpp，使 AMD 显卡支持高效本地大语言模型推理。"
  },
  "sdcpp": {
    "title": "08. STABLE-DIFFUSION.CPP 渲染引擎编译",
    "desc": "使用多线程和 Vulkan API 编译轻量级图像生成引擎底座。"
  },
  "modelos": {
    "title": "09. 量化模型权重格式转换",
    "desc": "将原始 Safetensors 权重转换为适用于本地低显存部署的结构化 .gguf 格式。"
  },
  "sdserver": {
    "title": "10. 启动图像服务后台进程 (GPU 独占)",
    "desc": "在指定网络端口运行图像生成服务，提供接口供前端应用和 GUI 调用系统。"
  },
  "flux_server": {
    "title": "10.A 混合算力运行 FLUX.1 (GPU + CPU 内存分割)",
    "desc": "配置和启动 12B 参数的 Flux 模型，将权重和临时计算部分存放在系统内存与 VRAM 间合理分割。"
  },
  "sd_bat_automation": {
    "title": "11.A — SD-SERVER LOCAL / BOOT SEQUENCE",
    "desc": "编写专用的批处理脚本，保证图像生成引擎后台进程的快速自启与稳定运行。"
  },
  "sd_openwebui_integration": {
    "title": "11.B — OPENWEBUI INTEGRATION",
    "desc": "配置容器桥接网络，使基于 Docker 的前端 OpenWebUI 与本地主机 GPU 上的后端服务进行数据流连通。"
  },
  "comfyui-modelos": {
    "title": "11.C — ZERO-COPY SYMLINKS",
    "desc": "通过创建跨系统符号链接（Symbolic Links），避免在双系统或不同分区中重复存储大尺寸模型权重文件。"
  },
  "comfyui-wsl": {
    "title": "12 — COMFYUI WSL2",
    "desc": "在 Linux 子系统中隔离 Python 开发依赖，提升推理服务整体运行稳定性与生命周期管理。"
  },
  "comfyui-directml": {
    "title": "13 — DIRECTML",
    "desc": "剖析不透明内存指针分配漏洞，这些漏洞往往导致 ComfyUI 的计算图无法完美构建。"
  },
  "comfyui-directml-func": {
    "title": "14 — FIXES DIRECTML",
    "desc": "提供替换默认依赖包的命令行参数，强行解决新内核与老驱动不兼容的白屏或闪退危机。"
  },
  "comfyui-flux": {
    "title": "15. PARAMETRIZAÇÃO CRÍTICA DO FLUX.1 SCHNELL",
    "desc": "精确调试和设置在系统物理内存中的多线程采样矩阵，使得极其庞大的模型能够在 CPU 上平稳完成渲染。"
  },
  "animatediff-video": {
    "title": "16. ANIMATEDIFF E INTERPOLAÇÃO DE QUADROS",
    "desc": "在老旧硬件环境下，利用多核 Xeon 处理器提供冗余算力，配合 ComfyUI 构建顺滑的时序逻辑和过渡帧渲染。"
  },
  "stack": {
    "title": "17. MAPA DE SERVIÇOS DO STACK INTEGRADO",
    "desc": "集中规划整个本地 AI 系统的网络监听端口、核心关联组件及硬件调用负载规划。"
  },
  "scripts": {
    "title": "18. SCRIPTS E AUTOMAÇÃO",
    "desc": "包含一键清理僵尸进程、释放被锁定显存以及在服务无响应时执行重置的控制脚本。"
  },
  "guia": {
    "title": "19. GUIA ESTRATÉGICO POR CASO DE USO",
    "desc": "负载决策指南：针对各种模型尺寸和精度需求，判定分配至 Vulkan GPU 渲染还是 Xeon ECC 内存池运行。"
  },
  "benchmarks": {
    "title": "20. BENCHMARKS REAIS DO LABORATÓRIO",
    "desc": "记录真实算力 data：在不同后端、不同精度参数以及多种硬件搭配下的生成耗时汇总。"
  },
  "cpu": {
    "title": "21. PARAMETRIZAÇÃO E AJUSTES DO XEON",
    "desc": "通过 Bios 配置和优化编译选项，释放多核心 Haswell 平台的高缓存与 AVX2 计算硬实力。"
  },
  "flux-vulkan": {
    "title": "22. EXPLORAÇÃO COMPLEMENTAR: FLUX VIA VULKAN",
    "desc": "使用极低 3-bit 量化 (Q3_K_S) 控制模型规模，在 8GB VRAM 设备上强制运行大图像模型的可行性方案。"
  },
  "troubleshooting": {
    "title": "23. GUIA DE RESOLUÇÃO DE PROBLEMAS (TROUBLESHOOTING)",
    "desc": "提供各种报错（如推理超时未响应、显卡假死、白图等）的快速排查和恢复程序。"
  },
  "troubleshoot-comfyui": {
    "title": "24. CATASTROFE DE MEMÓRIA NO COMFYUI WINDOWS",
    "desc": "排除 Out-Of-Memory (OOM) 报错，运用 `--lowvram` 及 `--novram` 物理降级技术实现大权重图的正常加载。"
  },
  "comfyui-portable-amd": {
    "title": "25. COMFYUI PORTÁTIL v0.3.48 — IMPLEMENTAÇÃO AMD",
    "desc": "配置全局环境变量 'HSA_OVERRIDE_GFX_VERSION' 重定向内核，使用户能在古老非原生 Polaris 硬件上完美兼容软件栈。"
  },
  "comunidade": {
    "title": "26. CONTEXTO E FONTES DA COMUNIDADE",
    "desc": "探索活跃的相关二手硬件利用论坛及项目仓库（如 r/X99_Lab），获取第一手野生编译补丁和前沿修改建议。"
  },
  "amihart": {
    "title": "26.A. MÉTODO AMIHART — INFERÊNCIA RX580 EM POLARIS/DEBIAN",
    "desc": "解析知名工程师 Amihart 分享的设计：基于纯 Vulkan 在 Debian 环境下达成单张 Polaris 卡生成性能极限的记录。"
  },
  "dadhacks": {
    "title": "26.B. MÉTODO DADHACKS — AI IMAGE GENERATION ON RX 580 USING VULKAN: A COST-EFFECTIVE SOLUTION",
    "desc": "解析 DadHacks 发行的物理加速路径，指导如何完美规避厂商已经废弃的 ROCm 支持，借助 Vulkan 的 API 架构发挥余热。"
  },
  "codacus": {
    "title": "26.C. CODACUS 方法 VS AIVISIONSLAB 对接分析",
    "desc": "测试拯救 6GB GTX 1060 的 5 个优化参数 — 它们在 AMD Polaris Vulkan 架构卡上有效吗？"
  },
  "proximos": {
    "title": "27. PRÓXIMOS PASSOS (ROADMAP 2027)",
    "desc": "下一阶段技术蓝图：着眼于多卡 Vulkan 底层直接调度、内网节点计算池分发以及多智能体并发协同研究。"
  },
  "arquivos": {
    "title": "28. TAXONOMIA E ESTRUTURA DE ARQUIVOS NVMe",
    "desc": "统一制定模型资源、临时计算包等静态文件的物理存放规范，简化全局环境中的绝对与相对路径定位。"
  },
  "meta": {
    "title": "29. REFERÊNCIAS E METADADOS DO DOCUMENTO",
    "desc": "综合核对并输出当前构建时刻的时间戳、校验位和基本硬件信息，向访问者证明当前静态构建逻辑完全闭合且通过验证。"
  },
  "linhatempo": {
    "title": "29.A. LINHA DO TEMPO COLETIVA — A EVOLUÇÃO DO RX 580 COMO PLATAFORMA DE IA",
    "desc": "以详实的物理时间线记录全球开源研究人员突破厂商技术壁垒、使老旧 Polaris 级显卡焕发全新运算光芒的联合演进道路。"
  },
  "audio_rvc": {
    "title": "30. LOCAL VOICE CONVERSION — APPLIO RVC ON AMD RX 580",
    "desc": "Quickstart guides and VRAM panic mitigations for training and inference."
  },
  "audio_whisper": {
    "title": "31. 本地语音识别转文字 — AMD RX 580 运行 WHISPER.CPP",
    "desc": "在 Windows AMD 平台上通过 Vulkan GPU 硬件加速实现高性能温斯普 (Whisper) 语音/视频转文字服务。"
  },
  "audio_srt_ptbr": {
    "title": "32. 基于 RX 580 的完整音视频转码及翻译（英转葡）工作流",
    "desc": "基于 Vulkan 的离线端到端工作流：零成本将英文 .mp4 视频转译并生成巴西葡萄牙语 .srt 字幕文件。"
  },
  "linux_nativo": {
    "title": "40. 纯净物理 Linux 运行环境 — UBUNTU 26.04 LTS + RX 580 + VULKAN",
    "desc": "AIVisionsLab 本地 Linux 工业化部署完整技术栈文档"
  },
  "limit_qwen_35b": {
    "title": "33. 极限性能测试 — AMD RX 580 运行 QWEN3.5 35B 大模型",
    "desc": "通过 Vulkan 混合推理技术在 8GB 显卡及旧服务器上运行 34.66B 参数大模型的完整基准测试与系统日志。"
  },
  "proving_hypothesis_35b": {
    "title": "34. 验证假说 — CURL, CTX-SIZE 8192 与首次完整输出测试",
    "desc": "通过物理实验成功验证上下文容量、客户端超时以及 Q4_K_M vs Q6_K 在老款核心上的表现差异。"
  }
};

export const LOCALES: Record<string, LanguagePack> = {
  "pt-BR": {
    dir: "ltr",
    meta: { title: "RX 580 + IA LOCAL — DOCUMENTAÇÃO MASTER UNIFICADA 2026" },
    nav: {
      brand: "REGENERAÇÃO DE HARDWARE // 2026",
      subtitle: "RX 580 IA — DOCUMENTAÇÃO MASTER UNIFICADA",
      status: "SUPORTE_VULKAN: ATIVO"
    },
    sidebar: {
      directory: "Diretório",
      syslog: "● LOG DO SISTEMA",
      syslog_lines: [
        "[0.00] Iniciando documentação unificada...",
        "[0.01] Vulkan GPU: OK",
        "[0.02] ComfyUI CPU: OK",
        "[0.03] FLUX Schnell: OK",
        "Status: UNIFICADO"
      ],
      groups: {
        foundation: "FUNDAÇÃO",
        gpu: "GPU VULKAN",
        comfy: "COMFYUI CPU",
        stack: "PILHA E OPERAÇÕES",
        experimental: "COMFYUI EXPERIMENTAL",
        operations: "OPERAÇÕES",
        maintenance: "MANUTENÇÃO E COMUNIDADE"
      }
    },
    hero: {
      title: "RX 580 + IA LOCAL",
      subtitle: "DOCUMENTAÇÃO MASTER UNIFICADA.",
      desc: "Da \"GPU Morta\" ao Servidor de IA via Vulkan no Windows. Sistema completo: LLM + geração de imagens via GPU Vulkan, ComfyUI CPU, FLUX.1 Schnell, AnimateDiff e renderização sem GPU. Guia definitivo — sem CUDA, sem ROCm, sem DirectML.",
      q1: '"O problema de compatibilidade decorre da ausência de suporte do software de vendor, não de limitações físicas da placa."',
      q2: '"Módulos de hardware de herança mantêm viabilidade operacional através de padrões abertos como Vulkan."',
      q3: '"Manual técnico compilado a partir de testes empíricos de integridade de sistemas e estabilidade de VRAM."',
      stat_gpu_lbl: "Motor GPU",
      stat_vram_lbl: "VRAM",
      stat_cpu_lbl: "CPU Render",
      stat_status_lbl: "Status",
      stat_status_val: "Produção"
    },
    share: {
      guerrilla_title: "Preservação de Hardware & Distribuição de Documentação // 2026",
      guerrilla_desc: "Este guia consolida configurações, scripts e métodos de otimização de baixo nível para mitigar a obsolescência programada e viabilizar inteligência artificial offline.",
      btn_copy_link: "Copiar Link da Documentação 🔗",
      btn_offline_html: "Baixar Guia Offline (.HTML) 💾",
      btn_pdf_print: "Gerar PDF / Imprimir 🖨️",
      btn_qr_code: "QR Code p/ Workshops 📱",
      qr_code_text: "Escaneie este código para carregar o guia instantaneamente em dispositivos móveis durante workshops de hardware livre.",
      toast_copied: "LINK DA DOCUMENTAÇÃO COPIADO COM SUCESSO!"
    },
    footer: {
      brand: "HARDWARE REVIVAL PROJECT",
      q1: '"GPU AMD de 2017 executando IA local em 2026 — sem CUDA, sem ROCm, sem DirectML."',
      q2: '"Xeon de 2014 gerando arte SOTA de 2026 com 32GB ECC RDIMM."',
      note: '"Muitas limitações atribuídas ao hardware de herança decorrem da falta de software otimizado."\n"Os módulos de hardware legado mantêm capacidade operacional através de backends abertos (Vulkan)."',
      tech_label: "TECNOLOGIA",
      authors_label: "AUTORES / ASSISTENTES",
      copyright: "© 2026 AIVisionsLab. Todos os direitos reservados. / PROJETO DE REUSO GLOBAL (RX 580 + XEON v3)",
      version_tag: "VULKAN_DEPLOY_V3.0_COMPLETO"
    },
    sections: SECTION_CONTENT["pt-BR"] as { [key: string]: SectionContent }
  },
  "en": {
    dir: "ltr",
    meta: { title: "RX 580 + LOCAL AI — UNIFIED MASTER DOCUMENTATION 2026" },
    nav: {
      brand: "HARDWARE REVIVAL // 2026",
      subtitle: "RX 580 AI — UNIFIED MASTER DOCUMENTATION",
      status: "VULKAN_BACKEND: ACTIVE"
    },
    sidebar: {
      directory: "Directory",
      syslog: "● SYSTEM LOG",
      syslog_lines: [
        "[0.00] Initializing unified documentation...",
        "[0.01] Vulkan GPU: OK",
        "[0.02] ComfyUI CPU: OK",
        "[0.03] FLUX Schnell: OK",
        "Status: UNIFIED"
      ],
      groups: {
        foundation: "FOUNDATION",
        gpu: "GPU VULKAN",
        comfy: "COMFYUI CPU",
        stack: "STACK & OPS",
        experimental: "EXPERIMENTAL COMFYUI",
        operations: "OPERATIONS",
        maintenance: "MAINTENANCE & COMMUNITY"
      }
    },
    hero: {
      title: "RX 580 + LOCAL AI",
      subtitle: "UNIFIED MASTER DOCUMENTATION.",
      desc: "From \"Dead GPU\" to AI Server via Vulkan on Windows. Complete system: LLM + image generation via GPU Vulkan, ComfyUI CPU, FLUX.1 Schnell, AnimateDiff, and CPU-only renders. Definitive guide — no CUDA, no ROCm, no DirectML.",
      q1: '"Compatibility challenges stem from a lack of vendor software support, not physical hardware limits."',
      q2: '"Legacy hardware modules maintain operational viability through open standards such as Vulkan."',
      q3: '"Technical manual compiled from empirical systems integrity and VRAM stability tests."',
      stat_gpu_lbl: "GPU Engine",
      stat_vram_lbl: "VRAM",
      stat_cpu_lbl: "CPU Render",
      stat_status_lbl: "Status",
      stat_status_val: "Production"
    },
    share: {
      guerrilla_title: "Hardware Preservation & Free Documentation Distribution // 2026",
      guerrilla_desc: "This guide consolidates low-level optimization templates, configurations, and scripts to counter planned obsolescence and sustain offline localized AI.",
      btn_copy_link: "Copy Documentation Link 🔗",
      btn_offline_html: "Download Offline Guide (.HTML) 💾",
      btn_pdf_print: "Generate PDF / Print 🖨️",
      btn_qr_code: "Workshops QR Code 📱",
      qr_code_text: "Scan this code to load the guide instantly on mobile devices during free hardware workshops.",
      toast_copied: "DOCUMENTATION LINK COPIED!"
    },
    footer: {
      brand: "HARDWARE REVIVAL PROJECT",
      q1: '"2017 AMD GPU running local AI in 2026 — no CUDA, no ROCm, no DirectML."',
      q2: '"2014 Xeon generating art of 2026 with 32GB ECC RDIMM."',
      note: '"Many limitations attributed to legacy hardware stem from the absence of optimized software."\n"Legacy hardware modules maintain operational limits through open backends (Vulkan)."',
      tech_label: "TECHNOLOGY",
      authors_label: "AUTHORS / ASSISTANTS",
      copyright: "© 2026 AIVisionsLab. All rights reserved. / GLOBAL REUSE PROJECT (RX 580 + XEON v3)",
      version_tag: "VULKAN_DEPLOY_V3.0_COMPLETO"
    },
    sections: Object.keys(SECTION_CONTENT["pt-BR"]).reduce((acc, key) => {
      acc[key] = {
        title: EN_SECTION_HEADERS[key]?.title || SECTION_CONTENT["pt-BR"][key].title,
        desc: EN_SECTION_HEADERS[key]?.desc || SECTION_CONTENT["pt-BR"][key].desc,
        html: SECTION_CONTENT["pt-BR"][key].html
      };
      return acc;
    }, {} as Record<string, SectionContent>)
  },
  "es": {
    dir: "ltr",
    meta: { title: "RX 580 + IA LOCAL — DOCUMENTACIÓN MAESTRA UNIFICADA 2026" },
    nav: {
      brand: "REGENERACIÓN DE HARDWARE // 2026",
      subtitle: "RX 580 IA — DOCUMENTACIÓN MAESTRA UNIFICADA",
      status: "SOPORTE_VULKAN: ACTIVO"
    },
    sidebar: {
      directory: "Directorio",
      syslog: "● LOG DEL SISTEMA",
      syslog_lines: [
        "[0.00] Iniciando documentación unificada...",
        "[0.01] Vulkan GPU: OK",
        "[0.02] ComfyUI CPU: OK",
        "[0.03] FLUX Schnell: OK",
        "Estado: UNIFICADO"
      ],
      groups: {
        foundation: "FUNDACIÓN",
        gpu: "GPU VULKAN",
        comfy: "COMFYUI CPU",
        stack: "APILACIÓN Y OPERACIONES",
        experimental: "COMFYUI EXPERIMENTAL",
        operations: "OPERACIONES",
        maintenance: "MANTENIMIENTO Y COMUNIDAD"
      }
    },
    hero: {
      title: "RX 580 + IA LOCAL",
      subtitle: "DOCUMENTACIÓN MAESTRA UNIFICADA.",
      desc: "De \"GPU Muerta\" a Servidor de IA vía Vulkan en Windows. Sistema completo: LLM + generación de imágenes vía GPU Vulkan, ComfyUI CPU, FLUX.1 Schnell, AnimateDiff y renderizado sin GPU. Guía definitiva — sin CUDA, sin ROCm, sin DirectML.",
      q1: '"El problema nunca fue la tarjeta. El problema era que el software no le llegaba."',
      q2: '"El hardware no muere, se transforma."',
      q3: '"Hecho por no-desarrolladores, para no-desarrolladores."',
      stat_gpu_lbl: "Motor GPU",
      stat_vram_lbl: "VRAM",
      stat_cpu_lbl: "Render CPU",
      stat_status_lbl: "Estado",
      stat_status_val: "Producción"
    },
    share: {
      guerrilla_title: "Guerrilla y Distribución Libre SOTA // 2026",
      guerrilla_desc: "Este conocimiento pertenece a la humanidad. Evite la obsolescencia programada y ayude a democratizar la Inteligencia Artificial offline de alto rendimiento.",
      btn_copy_link: "Copiar Enlace Autónomo 🔗",
      btn_offline_html: "Descargar Guía en Línea (.HTML) 💾",
      btn_pdf_print: "Generar PDF / Imprimir 🖨️",
      btn_qr_code: "Código QR para Talleres 📱",
      qr_code_text: "Escanee este código para cargar la guía instantáneamente en dispositivos móviles durante talleres de hardware libre.",
      toast_copied: "¡ENLACE DE GUERRILLA COPIADO!"
    },
    footer: {
      brand: "PROYECTO REGENERACIÓN DE HARDWARE",
      q1: '"GPU AMD de 2017 ejecutando IA local en 2026 — sin CUDA, sin ROCm, sin DirectML."',
      q2: '"Xeon de 2014 generando arte SOTA de 2026 con 32GB ECC RDIMM."',
      note: '"El problema nunca fue la tarjeta. Clama por optimizaciones."\n"El hardware se transforma."',
      tech_label: "TECNOLOGÍA",
      authors_label: "AUTORES / ASISTENTES",
      copyright: "© 2026 AIVisionsLab. Reservados todos los derechos. / PROYECTO DE REUTILIZACIÓN GLOBAL",
      version_tag: "VULKAN_DEPLOY_V3.0_COMPLETO"
    },
    sections: Object.keys(SECTION_CONTENT["pt-BR"]).reduce((acc, key) => {
      acc[key] = {
        title: ES_SECTION_HEADERS[key]?.title || SECTION_CONTENT["pt-BR"][key].title,
        desc: ES_SECTION_HEADERS[key]?.desc || SECTION_CONTENT["pt-BR"][key].desc,
        html: SECTION_CONTENT["pt-BR"][key].html
      };
      return acc;
    }, {} as Record<string, SectionContent>)
  },
  "ru": {
    dir: "ltr",
    meta: { title: "RX 580 + ЛОКАЛЬНЫЙ ИИ — ЕДИНАЯ МАСТЕР-ДОКУМЕНТАЦИЯ 2026" },
    nav: {
      brand: "ВОЗРОЖДЕНИЕ ЖЕЛЕЗА // 2026",
      subtitle: "RX 580 IA — ЕДИНАЯ МАСТЕР-ДОКУМЕНТАЦИЯ",
      status: "VULKAN_BACKEND: АКТИВЕН"
    },
    sidebar: {
      directory: "Оглавление",
      syslog: "● СИСТЕМНЫЙ ЛОГ",
      syslog_lines: [
        "[0.00] Инициализация единой документации...",
        "[0.01] Vulkan GPU: OK",
        "[0.02] ComfyUI CPU: OK",
        "[0.03] FLUX Schnell: OK",
        "Статус: ОБЪЕДИНЕНО"
      ],
      groups: {
        foundation: "ОСНОВЫ",
        gpu: "GPU VULKAN",
        comfy: "COMFYUI CPU",
        stack: "СТЕК И ОПЕРАЦИИ",
        experimental: "ЭКСПЕРИМЕНТАЛЬНЫЙ COMFYUI",
        operations: "ЭКСПЛУАТАЦИЯ",
        maintenance: "ПОДДЕРЖКА И СООБЩЕСТВО"
      }
    },
    hero: {
      title: "RX 580 + ЛОКАЛЬНЫЙ ИИ",
      subtitle: "ЕДИНАЯ МАСТЕР-ДОКУМЕНТАЦИЯ.",
      desc: "От \"мертвой видеокарты\" до сервера ИИ через Vulkan на Windows. Полная система: LLM + генерация изображений на GPU Vulkan, ComfyUI CPU, FLUX.1 Schnell, AnimateDiff и рендеринг без GPU. Детальное руководство — без CUDA, без ROCm, без DirectML.",
      q1: '"Проблема была не в карте. Проблема была в софте, который до неё не доходил."',
      q2: '"Железо не умирает, оно трансформируется."',
      q3: '"Сделано не-разработчиками для не-разработчиков."',
      stat_gpu_lbl: "Ядро GPU",
      stat_vram_lbl: "VRAM",
      stat_cpu_lbl: "Рендер CPU",
      stat_status_lbl: "Статус",
      stat_status_val: "Релиз"
    },
    share: {
      guerrilla_title: "Партизанское распространение SOTA // 2026",
      guerrilla_desc: "Эти знания принадлежат человечеству. Обойдите запланированное устаревание и помогите демократизировать локальный независимый искусственный интеллект.",
      btn_copy_link: "Скопировать автономную ссылку 🔗",
      btn_offline_html: "Скачать оффлайн-версию (.HTML) 💾",
      btn_pdf_print: "Создать PDF / Печать 🖨️",
      btn_qr_code: "QR-код для мастер-классов 📱",
      qr_code_text: "Отсканируйте этот код для мгновенного скачивания руководства на смартфонах во время бесплатных воркшопов.",
      toast_copied: "ПАРТИЗАНСКАЯ ССЫЛКА СКОПИРОВАНА!"
    },
    footer: {
      brand: "ПРОЕКТ ВОЗРОЖДЕНИЯ ЖЕЛЕЗА",
      q1: '"GPU AMD 2017 года запускает локальный ИИ в 2026 — без CUDA, без ROCm, без DirectML."',
      q2: '"Xeon 2014 года генерирует искусство SOTA 2026 года с 32 ГБ ECC RDIMM."',
      note: '"Проблема была не в карте. Она требует оптимизации."\n"Железо трансформируется."',
      tech_label: "ТЕХНОЛОГИЯ",
      authors_label: "АВТОРЫ / ПОМОЩНИКИ",
      copyright: "© 2026 AIVisionsLab. Все права защищены. / ГЛОБАЛЬНЫЙ ПРОЕКТ РЕУТИЛИЗАЦИИ",
      version_tag: "VULKAN_DEPLOY_V3.0_COMPLETO"
    },
    sections: Object.keys(SECTION_CONTENT["pt-BR"]).reduce((acc, key) => {
      acc[key] = {
        title: RU_SECTION_HEADERS[key]?.title || SECTION_CONTENT["pt-BR"][key].title,
        desc: RU_SECTION_HEADERS[key]?.desc || SECTION_CONTENT["pt-BR"][key].desc,
        html: SECTION_CONTENT["pt-BR"][key].html
      };
      return acc;
    }, {} as Record<string, SectionContent>)
  },
  "zh-CN": {
    dir: "ltr",
    meta: { title: "RX 580 + 本地人工智能 — 统一主文档 2026" },
    nav: {
      brand: "硬件复兴 // 2026",
      subtitle: "RX 580 智能 — 统一主干文档",
      status: "VULKAN后端: 已激活"
    },
    sidebar: {
      directory: "目录列表",
      syslog: "● 系统日志记录",
      syslog_lines: [
        "[0.00] 正在初始化统一文档...",
        "[0.01] Vulkan GPU: 正常",
        "[0.02] ComfyUI CPU: 正常",
        "[0.03] FLUX Schnell: 正常",
        "状态: 已统一"
      ],
      groups: {
        foundation: "基础结构",
        gpu: "VULKAN显卡",
        comfy: "COMFYUI 中央处理器",
        stack: "技术栈和运维",
        experimental: "COMFYUI 实验版",
        operations: "系统运行",
        maintenance: "维护和社区安全"
      }
    },
    hero: {
      title: "RX 580 + 本地 AI",
      subtitle: "统一主干部署指南。",
      desc: "从“报废显卡”到 Windows 系统下通过 Vulkan 驱动的本地人工智能服务器。集成 Llama.cpp 文本处理和 Vulkan 显卡加速的 Stable Diffusion 画图、ComfyUI CPU 渲染、FLUX.1 极速及 AnimateDiff 动画。无 CUDA、无 ROCm、无 DirectML 的无痛重置教程。",
      q1: '“显卡从来不是问题，问题在于软件无法正常驱动它。”',
      q2: '“硬件不会消逝，它只是迎来了新生。”',
      q3: '“非开发人员编写，专为普通爱好者设计。”',
      stat_gpu_lbl: "GPU 引擎",
      stat_vram_lbl: "显存容量",
      stat_cpu_lbl: "CPU 渲染",
      stat_status_lbl: "运行状态",
      stat_status_val: "生产级"
    },
    share: {
      guerrilla_title: "开源极客分发部署 // 2026",
      guerrilla_desc: "技术应该属于全人类。突破厂商的计划性淘汰，帮助普及高价值的本地离线人工智能。",
      btn_copy_link: "复制主链接 🔗",
      btn_offline_html: "下载离线版 (.HTML) 💾",
      btn_pdf_print: "页面生成 PDF 并打印 🖨️",
      btn_qr_code: "共享用 QR 码 📱",
      qr_code_text: "在独立硬件沙龙现场，用手机扫此码可秒打开部署手册指南。",
      toast_copied: "共享分发链接复制成功！"
    },
    footer: {
      brand: "全球硬件再回收计划",
      q1: '“2017年发布的 AMD 显卡在2026年无需 CUDA、ROCm 及 DirectML 也能跑本地 AI。”',
      q2: '“2014年出产的 Xeon 至强核心依靠 32GB ECC 双路内存依然可以生产 2026 顶级艺术品。”',
      note: '“显卡从未有错，它渴望被发掘极限。”\n“硬件复兴，新生而战。”',
      tech_label: "构建技术",
      authors_label: "开源作者与伙伴列表",
      copyright: "© 2026 AIVisionsLab. 版权所有，保留所有权利。/ 全球资源保护及重用框架",
      version_tag: "VULKAN_DEPLOY_V3.0_COMPLETO"
    },
    sections: Object.keys(SECTION_CONTENT["pt-BR"]).reduce((acc, key) => {
      acc[key] = {
        title: ZH_SECTION_HEADERS[key]?.title || SECTION_CONTENT["pt-BR"][key].title,
        desc: ZH_SECTION_HEADERS[key]?.desc || SECTION_CONTENT["pt-BR"][key].desc,
        html: SECTION_CONTENT["pt-BR"][key].html
      };
      return acc;
    }, {} as Record<string, SectionContent>)
  }
};
