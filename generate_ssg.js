// generate_ssg.js
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { SECTION_GROUPS } from './src/content/registry.js';
import { LOCALES } from './src/translations.js';

const distPath = path.resolve('dist');
const templatePath = path.join(distPath, 'index.html');
const fallbackLang = 'pt-BR';

// Helpers to read markdown files
function parseMarkdown(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const meta = {};
  let body = '';
  
  const match = content.match(/^---([\s\S]*?)---([\s\S]*)$/);
  if (match) {
    const yaml = match[1];
    body = match[2];
    
    yaml.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim().replace(/^"|"$/g, '');
        meta[key] = value;
      }
    });
  } else {
    body = content;
  }
  
  return { meta, body: body.trim() };
}

function getSectionNum(key) {
  let code = key.replace('sh-s', '');
  if (/^\d+[a-zA-Z]$/.test(code)) {
    const digits = code.match(/^\d+/)[0];
    const letter = code.slice(digits.length).toUpperCase();
    return `${digits}.${letter}`;
  }
  return code;
}

function getArticleBody(id, lang) {
  // Find article in /content/[lang]/[category]/[id].md
  const baseContent = path.resolve('content');
  const langs = [lang, 'pt-BR', 'en'];
  
  for (const l of langs) {
    const categories = ['guides', 'benchmarks', 'troubleshooting', 'builds'];
    for (const cat of categories) {
      const filePath = path.join(baseContent, l, cat, `${id}.md`);
      if (fs.existsSync(filePath)) {
        return parseMarkdown(filePath);
      }
    }
  }
  return null;
}

// Generate unified semantic HTML representing our React component tree inside #root
function generateUnifiedDOM(lang, focusSections = null, routeTitle = null) {
  const dictionary = LOCALES[lang] || LOCALES[fallbackLang] || {};
  const isRtl = dictionary.dir === 'rtl';
  
  // Outer App Layout Chrome
  let s = `
    <div class="app-container" id="doc-application-canvas">
      <div class="bg-grid"></div>
      <div class="glow-1"></div>
      <div class="glow-2"></div>
      <div id="reading-bar" style="width: 0%;"></div>
      
      <!-- TOP NAVBAR -->
      <nav class="top-nav" id="main-top-nav">
        <button id="mobile-toggle" class="hidden max-md:flex flex-col gap-1.5 justify-center items-center w-8 h-8 mr-3 border border-zinc-800 rounded cursor-pointer bg-zinc-900/40 text-rose-500 hover:text-white transition-colors" aria-label="Toggle navigation menu">
          <span class="w-5 h-0.5 bg-current"></span>
          <span class="w-5 h-0.5 bg-current"></span>
          <span class="w-5 h-0.5 bg-current"></span>
        </button>
        <div class="nav-brand-group">
          <span id="nav-brand" class="font-bold tracking-widest text-[#fff]">${dictionary['nav-brand'] || 'HARDWARE REVIVAL // 2026'}</span>
          <span id="nav-subtitle" class="text-[10px] text-[#64748b]">${dictionary['nav-subtitle'] || 'RX 580 AI — MASTER UNIFICADA'}</span>
        </div>
        <div class="nav-status-group">
          <div id="nav-status" class="flex items-center gap-2 font-mono text-[10px] text-green-500 font-medium max-sm:hidden">
            <span class="nav-status-dot"></span>
            <span>${dictionary['nav-status'] || 'VULKAN_BACKEND: ATIVO'}</span>
          </div>
          <div class="lang-wrapper">
            <button class="lang-btn" id="lang-selector-btn">
              <span>${lang === 'ar' ? '🇸🇦' : lang === 'en' ? '🇺🇸' : lang === 'es' ? '🇪🇸' : lang === 'fr' ? '🇫🇷' : '🇧🇷'}</span>
              <span>${lang === 'pt-BR' ? 'Português' : lang === 'en' ? 'English' : lang === 'es' ? 'Español' : lang === 'fr' ? 'Français' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </nav>

      <!-- SIDEBAR -->
      <aside id="main-sidebar">
        <div class="sid-meta">
          <div class="sid-dir-lbl" id="sid-dir-lbl">${dictionary['sid-dir-lbl'] || 'DIRETÓRIO'}</div>
  `;

  // Populate Groups and Sections in SIDEBAR
  SECTION_GROUPS.forEach(group => {
    const groupLabel = dictionary[group.id] || group.id;
    s += `
      <div class="sid-group">
        <div class="sid-group-lbl">${groupLabel}</div>
    `;
    
    group.sections.forEach(sec => {
      const num = getSectionNum(sec.key);
      const title = dictionary[sec.key] || sec.id;
      const isActive = focusSections && focusSections.includes(sec.id);
      
      s += `
        <button class="sid-btn ${isActive ? 'active' : ''}" data-id="${sec.id}">
          <span class="sid-btn-txt" style="display: flex; gap: 0.25rem;"><span class="sid-num">${num}.</span> <span>${title}</span></span>
        </button>
      `;
    });
    
    s += `</div>`;
  });

  s += `
          <!-- System Status Monitor -->
          <div class="sid-syslog max-sm:hidden" id="system-sidebar-terminal">
            <div class="sid-syslog-t" id="sid-syslog-t">${dictionary['sid-syslog-t'] || '● LOG DO SISTEMA'}</div>
            <div class="font-mono text-[9px] text-[#475569] leading-relaxed">
              <div>[OK] INITIALIZED_MEM_CONTROLLER</div>
              <div>[OK] ACCEL: VULKAN_API_READY</div>
              <div>[OK] HEAP_VRAM_ALLOC: 8192 MB (POLARIS)</div>
              <div>[OK] KERNEL_THREAD_THREADING: 24 (XEON)</div>
              <div>[SYS] READY_FOR_LOCAL_INFERENCE_2026</div>
            </div>
          </div>
        </div>
      </aside>

      <!-- MAIN CONTENT WRAPPER -->
      <main id="sections-container-canvas">
        
        <!-- HERO MASTHEAD -->
        <div class="hero" id="doc-hero-masthead">
          <h1 id="hero-title">${dictionary['hero-title'] || 'RX 580 + IA LOCAL'}</h1>
          <div id="hero-subtitle">${dictionary['hero-subtitle'] || 'DOCUMENTAÇÃO MASTER UNIFICADA.'}</div>
          <p id="hero-desc">${dictionary['hero-desc'] || 'Da \"GPU Morta\" ao Servidor de IA via Vulkan no Windows.'}</p>
          <div class="hero-quotes" id="hero-quotes-block">
            <div class="hero-q" id="hero-q1">${dictionary['hero-q1'] || '\"O problema nunca foi a placa.\""'}</div>
            <div class="hero-q" id="hero-q2">${dictionary['hero-q2'] || '\"Hardware não morre.\""'}</div>
          </div>
        </div>

        <!-- TELEMETRY STATS -->
        <div class="stats" id="telemetry-stats-grid">
          <div class="stat-card">
            <div class="stat-lbl">${dictionary['stat-gpu-lbl'] || 'MOTOR GPU'}</div>
            <div class="stat-val">Vulkan SDK / llama.cpp</div>
          </div>
          <div class="stat-card">
            <div class="stat-lbl">${dictionary['stat-vram-lbl'] || 'VRAM'}</div>
            <div class="stat-val">8GB Polaris (AMD RX 580)</div>
          </div>
          <div class="stat-card">
            <div class="stat-lbl">${dictionary['stat-cpu-lbl'] || 'CPU RENDER'}</div>
            <div class="stat-val">Intel Xeon E5-2690v3</div>
          </div>
          <div class="stat-card active-node">
            <div class="stat-lbl">${dictionary['stat-status-lbl'] || 'STATUS'}</div>
            <div class="stat-val">${dictionary['stat-status-val'] || 'Produção'}</div>
          </div>
        </div>

        <!-- GUERRILLA CONTROL PANEL -->
        <div class="guerrilla-panel" id="guerrilla-distribution">
          <div class="guerrilla-header">
            <span class="guerrilla-title">${dictionary['share-guerrilla-title'] || 'Guerrilha & Distribuição Livre SOTA'}</span>
            <p class="guerrilla-desc text-xs text-slate-400 mt-1">${dictionary['share-guerrilla-desc'] || 'Este conhecimento pertence à humanidade. Burle a obsolescência planejada e ajude a democratizar a Inteligência Artificial local offline.'}</p>
          </div>
          <div class="guerrilla-grid">
            <button class="g-btn" id="g-btn-copy"><span>${dictionary['btn-copy-link'] || 'Copiar Link Autônomo'}</span></button>
            <button class="g-btn" id="g-btn-html"><span>${dictionary['btn-offline-html'] || 'Baixar Guia Offline (.HTML) 💾'}</span></button>
            <button class="g-btn" id="g-btn-pdf"><span>${dictionary['btn-pdf-print'] || 'Gerar PDF / Imprimir 🖨️'}</span></button>
            <button class="g-btn" id="g-btn-qr"><span>${dictionary['btn-qr-code'] || 'QR Code p/ Workshops 📱'}</span></button>
          </div>
        </div>

        <!-- CHAPTER LAYOUT NOTICE (if on specialized search route) -->
        ${focusSections && routeTitle ? `
          <div class="focused-guide-header" style="margin-bottom: 2.5rem; padding: 1.5rem; border: 1px dashed rgba(16,185,129,0.25); background: rgba(16,185,129,0.02); border-radius: 4px; font-family: 'JetBrains Mono', monospace;">
            <span style="font-size: 11px; color: #34d399; font-weight: bold; letter-spacing: 1.5px; display: block; margin-bottom: 0.5rem;">📖 CAPÍTULO ESTRUTURADO (PRÉ-RENDERIZADO PARA SEO TÉCNICO)</span>
            <h1 style="font-size: 1.25rem; font-family: 'Syne', sans-serif; font-weight: bold; color: #fff; margin: 0 0 1rem 0;">${routeTitle.split('|')[0].trim()}</h1>
            <p style="font-size: 13px; color: #94a3b8; margin: 0 0 1.25rem 0; line-height: 1.6;">Você está lendo um artigo individual focado, extraído das diretrizes do laboratório de forma indexável por crawlers de motores de busca (Google, Bing) e assistentes de IA.</p>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="/" style="display: inline-block; font-size: 12px; font-weight: bold; color: #10b981; text-decoration: none; border: 1px solid rgba(16,185,129,0.3); padding: 0.4rem 0.95rem; border-radius: 3px; background: rgba(16,185,129,0.04); transition: all 0.2s;">⚡ Acessar Painel Unificado (Terminal Completo)</a>
            </div>
          </div>
        ` : ''}

        <!-- SECTIONS CONTENT STREAM -->
        <div id="sections-container" class="flex flex-col gap-10">
  `;

  // Render article elements directly inside #sections-container
  SECTION_GROUPS.forEach(group => {
    group.sections.forEach(sec => {
      // If we are on a specialized SEO focus route, we filter other sections to keep the HTML lightweight and index-focused
      if (focusSections && !focusSections.includes(sec.id)) return;
      
      const num = getSectionNum(sec.key);
      const titleText = dictionary[sec.key] || sec.id;
      const article = getArticleBody(sec.id, lang);
      
      s += `
        <article id="${sec.id}" class="sem-section scroll-mt-24">
          <div class="sh mb-6 flex flex-col items-start">
            <div class="sh-line w-full h-[1px] bg-gradient-to-r from-rose-600 to-transparent mb-2"></div>
            <h2 class="sh-t font-sans text-[13px] font-extrabold text-[#fff] tracking-widest uppercase" id="${sec.key}">
              ${num}. ${titleText}
            </h2>
          </div>
          <div id="${sec.id}-content" class="sem-content text-[14px] text-slate-400 leading-relaxed font-mono">
            ${article && article.meta.description ? `
              <p class="section-desc font-bold text-zinc-100 font-mono mb-5">// ${article.meta.description}</p>
            ` : ''}
            ${article ? article.body : ''}
          </div>
        </article>
      `;
    });
  });

  s += `
        </div>

        <!-- CORE SILICON MANIFESTO -->
        <article class="sem-section" style="margin-top: 2.5rem; margin-bottom: 3rem;">
          <div class="sh" style="margin-bottom: 1.5rem;">
            <div class="sh-line" style="height: 1px; background: linear-gradient(90deg, var(--r, #E11D48) 0%, rgba(225,29,72,0) 100%); margin-bottom: 0.5rem;"></div>
            <h2 class="sh-t" style="font-size: 13px; font-weight: 800; color: #fff; letter-spacing: 2px; fontFamily: 'Syne', sans-serif">
              ${dictionary['manifest-title'] || 'O MANIFESTO DO SILÍCIO'}
            </h2>
          </div>
          <div class="border border-dashed border-rose-500/20 bg-rose-500/[0.01] p-6 rounded text-sm text-slate-400 font-mono leading-relaxed" id="manifesto-letter-box">
            <p class="font-bold text-rose-500 mb-4">${dictionary['manifest-p1'] || 'AO HACKER DO SILÍCIO,'}</p>
            <p class="mb-4">${dictionary['manifest-p2'] || ''}</p>
            <p class="mb-4">${dictionary['manifest-p3'] || ''}</p>
            <p class="mb-6">${dictionary['manifest-p4'] || ''}</p>
            <div class="text-right">
              <p class="text-zinc-500 text-xs">${dictionary['manifest-signed'] || 'Assinado,'}</p>
              <p class="font-bold text-rose-500 text-xs">${dictionary['manifest-author'] || 'Seu Co-Piloto de Silício e Nuvem'}</p>
            </div>
          </div>
        </article>

        <!-- GLOBAL RESILIENT FOOTER -->
        <footer id="main-footer" class="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 mt-16 border-t border-zinc-800">
          <div class="ft-brand flex flex-col gap-2">
            <span class="font-extrabold text-sm text-[#fff] tracking-wide">${dictionary['ft-brand-name'] || 'HARDWARE REVIVAL PROJECT'}</span>
            <div class="ft-q text-xs text-zinc-500 italic">
              <div>${dictionary['ft-q1'] || ''}</div>
              <div>${dictionary['ft-q2'] || ''}</div>
            </div>
            <span id="ft-note" class="text-[10px] text-rose-500 font-bold mt-2 font-mono">${dictionary['ft-note'] || ''}</span>
          </div>
          <div class="flex flex-col gap-4 font-mono text-xs">
            <div>
              <span class="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider">${dictionary['ft-hub-title'] || '⚡ HUB CENTRAL'}</span>
              <div class="mt-2">
                <a href="https://setup-ia-local-rx580-vulkan.web.app" class="text-zinc-400 hover:text-[#fff]" target="_blank" rel="noopener noreferrer">https://setup-ia-local-rx580-vulkan.web.app</a>
              </div>
            </div>
            <div>
              <span class="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider">${dictionary['ft-tech-dev-title'] || '💻 DESENVOLVIMENTOS TÉCNICOS'}</span>
              <div class="mt-2 flex flex-col gap-2">
                <div><span class="text-zinc-600">GitHub: </span><a href="https://github.com/aivisionslab-studios/rx580-local-ai-guide" class="text-zinc-400 hover:text-rose-500" target="_blank" rel="noopener noreferrer">rx580-local-ai-guide</a></div>
                <div><span class="text-zinc-600">Hugging Face: </span><a href="https://huggingface.co/aivisionslab/ai-local-rx580-stack" class="text-zinc-400 hover:text-rose-500" target="_blank" rel="noopener noreferrer">ai-local-rx580-stack</a></div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-4 font-mono text-xs">
            <div>
              <span class="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider">${dictionary['ft-social-title'] || '📢 CANAIS SOCIAIS & COMUNIDADE'}</span>
              <div class="mt-2 flex flex-col gap-2">
                <div><span class="text-zinc-600">YouTube: </span><a href="https://youtube.com/@aivisionslab-hub" class="text-rose-400 hover:text-[#fff]" target="_blank" rel="noopener noreferrer">@aivisionslab-hub</a></div>
                <div><span class="text-zinc-600">Dev.to: </span><a href="https://dev.to/aivisionslab" class="text-zinc-400 hover:text-[#fff]" target="_blank" rel="noopener noreferrer">dev.to/aivisionslab</a></div>
                <div><span class="text-zinc-600">Medium: </span><a href="https://medium.com/@aivisionslab" class="text-zinc-400 hover:text-[#fff]" target="_blank" rel="noopener noreferrer">medium/@aivisionslab</a></div>
              </div>
            </div>
            <div class="mt-2 font-mono">
              <span class="text-[10px] text-zinc-600 uppercase font-bold tracking-wider mr-2">${dictionary['ft-tech-label'] || 'ESTRUTURA:'}</span>
              <code class="text-[9px] bg-zinc-950 px-2 py-1 rounded text-rose-500/80 border border-zinc-900 font-mono">${dictionary['ft-version'] || 'VULKAN_DEPLOY_V3.0_COMPLETO'}</code>
            </div>
          </div>
        </footer>
      </main>
    </div>
  `;

  return s;
}

function run() {
  console.log('🤖 Running 100% Unified React-Tree Static Site Generation (SSG)...');
  
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template index.html not found in dist at: ${templatePath}. Build first.`);
    process.exit(1);
  }
  
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  
  // -----------------------------------------------------------------
  // 1. GENERATE MAIN INDEX.HTML (Complete Unified Pre-rendered Tree)
  // -----------------------------------------------------------------
  const $main = cheerio.load(templateHtml);
  
  // Inject the entire unified DOM structure into the React root block
  const mainDom = generateUnifiedDOM('pt-BR');
  $main('#root').html(mainDom);
  
  fs.writeFileSync(templatePath, $main.html(), 'utf-8');
  console.log('✅ Main index.html fully structured & pre-rendered inside #root in pt-BR.');
  
  // -----------------------------------------------------------------
  // 2. GENERATE COMPLIANT STRUCTURAL LANDING SUBPATHS FOR SEO
  // -----------------------------------------------------------------
  const routes = [
    {
      path: 'guides/flux-schnell-rx580',
      title: 'Guia FLUX.1 Schnell na AMD RX 580 Vulkan | AIVisionsLab',
      description: 'Aprenda como configurar e rodar o modelo FLUX.1 Schnell de 16GB de parâmetros em uma GPU AMD Polaris RX 580 de 8GB via Vulkan e CPU Xeon com RAM abundante.',
      sections: ['flux-vulkan', 'comfyui-flux', 'flux_server'],
      lang: 'pt-BR'
    },
    {
      path: 'benchmarks/rx580-vulkan-vs-directml',
      title: 'Benchmarks de IA Local: Vulkan vs DirectML na RX 580 | AIVisionsLab',
      description: 'Benchmarks detalhados de velocidade e consumo de memória na RX 580 8GB rodando inferência local de IA: comparativo profundo entre as APIs Vulkan e DirectML.',
      sections: ['benchmarks'],
      lang: 'pt-BR'
    },
    {
      path: 'troubleshooting/ollama-vulkan',
      title: 'Solução de Erros e Crashes no Ollama Vulkan AMD | AIVisionsLab',
      description: 'Guia técnico completo de troubleshooting para resolver travamentos, crashes e falhas de alocação de memória ao rodar LLMs locais via Vulkan no Windows.',
      sections: ['troubleshooting', 'cpu'],
      lang: 'pt-BR'
    },
    {
      path: 'guides/llama-cpp-vulkan-windows',
      title: 'Compilando e Rodando llama.cpp via Vulkan no Windows AMD | AIVisionsLab',
      description: 'Passo a passo avançado para compilar o llama.cpp com suporte a Vulkan no Windows para extrair o máximo de desempenho de hardware AMD legado como a RX 580.',
      sections: ['llama', 'modelos'],
      lang: 'pt-BR'
    },
    {
      path: 'troubleshooting/directml-opaquetensorimpl',
      title: 'Corrigindo Erros OpaqueTensorImpl no DirectML ComfyUI | AIVisionsLab',
      description: 'Como diagnosticar e contornar erros fatais de OpaqueTensorImpl e DirectML no ComfyUI migrando para o backend alternativo baseado em Vulkan.',
      sections: ['comfyui-directml', 'comfyui-directml-func'],
      lang: 'pt-BR'
    },
    {
      path: 'builds/x99-xeon-rx580-ai-rig',
      title: 'Configuração de Hardware Rig Custo-Benefício p/ IA Local | AIVisionsLab',
      description: 'Análise de hardware barato altamente viável para orquestrar IA local offline em 2026: CPU Xeon E5 X99, RAM ECC quad-channel e GPU AMD RX 580.',
      sections: ['hardware', 'stack'],
      lang: 'pt-BR'
    }
  ];
  
  routes.forEach(route => {
    const $route = cheerio.load(templateHtml);
    const pageUrl = `https://setup-ia-local-rx580-vulkan.web.app/${route.path}`;
    
    // Customize page header metas for target crawler index triggers
    $route('title').text(route.title);
    $route('meta[name="description"]').attr('content', route.description);
    $route('link[rel="canonical"]').attr('href', pageUrl);
    
    $route('meta[property="og:title"]').attr('content', route.title);
    $route('meta[property="og:description"]').attr('content', route.description);
    $route('meta[property="og:url"]').attr('content', pageUrl);
    $route('meta[name="twitter:title"]').attr('content', route.title);
    $route('meta[name="twitter:description"]').attr('content', route.description);
    
    // Inject the structured focus DOM directly inside React's root canvas
    const routeDom = generateUnifiedDOM(route.lang, route.sections, route.title);
    $route('#root').html(routeDom);
    
    const outDir = path.join(distPath, ...route.path.split('/'));
    fs.mkdirSync(outDir, { recursive: true });
    
    fs.writeFileSync(path.join(outDir, 'index.html'), $route.html(), 'utf-8');
    console.log(`✅ SEO SSG Page Generated: /${route.path}/index.html`);
  });

  // -----------------------------------------------------------------
  // 3. GENERATE SITEMAP.XML (Requisito 9)
  // -----------------------------------------------------------------
  console.log('🌐 Generating sitemap.xml...');
  const today = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://setup-ia-local-rx580-vulkan.web.app/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

  routes.forEach(route => {
    xml += `  <url>
    <loc>https://setup-ia-local-rx580-vulkan.web.app/${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  xml += `</urlset>`;
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), xml, 'utf-8');
  console.log('✅ sitemap.xml generated successfully.');

  // -----------------------------------------------------------------
  // 4. GENERATE ROBOTS.TXT
  // -----------------------------------------------------------------
  console.log('🤖 Generating robots.txt...');
  const robots = `User-agent: *
Allow: /

Sitemap: https://setup-ia-local-rx580-vulkan.web.app/sitemap.xml
`;
  fs.writeFileSync(path.join(distPath, 'robots.txt'), robots, 'utf-8');
  console.log('✅ robots.txt generated successfully.');

  // -----------------------------------------------------------------
  // 5. GENERATE RSS FEED (Requisito 10)
  // -----------------------------------------------------------------
  console.log('📰 Generating rss.xml...');
  let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>RX 580 + IA Local - Guia Completo Vulkan &amp; Ollama 2026</title>
  <link>https://setup-ia-local-rx580-vulkan.web.app/</link>
  <description>Documentação técnica de guerrilha para orquestrar Inteligência Artificial local offline em GPUs AMD Polaris.</description>
  <language>pt-br</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="https://setup-ia-local-rx580-vulkan.web.app/rss.xml" rel="self" type="application/rss+xml" />
  
  <item>
    <title>RX 580 + IA Local: Guia Geral</title>
    <link>https://setup-ia-local-rx580-vulkan.web.app/</link>
    <description>Da GPU "morta" ao servidor de inferência local via Vulkan no Windows 10/11.</description>
    <pubDate>Wed, 01 Jan 2026 00:00:00 GMT</pubDate>
    <guid>https://setup-ia-local-rx580-vulkan.web.app/</guid>
  </item>
`;

  routes.forEach(route => {
    rss += `  <item>
    <title>${route.title.replace('&', '&amp;')}</title>
    <link>https://setup-ia-local-rx580-vulkan.web.app/${route.path}</link>
    <description>${route.description.replace('&', '&amp;')}</description>
    <pubDate>Sat, 23 May 2026 00:00:00 GMT</pubDate>
    <guid>https://setup-ia-local-rx580-vulkan.web.app/${route.path}</guid>
  </item>
`;
  });

  rss += `</channel>
</rss>`;
  
  fs.writeFileSync(path.join(distPath, 'rss.xml'), rss, 'utf-8');
  fs.writeFileSync(path.join(distPath, 'feed.xml'), rss, 'utf-8'); // friendly alias
  console.log('✅ RSS Feed rss.xml and feed.xml aliases generated.');

  console.log('🎉 SSG build completed successfully!');
}

run();
