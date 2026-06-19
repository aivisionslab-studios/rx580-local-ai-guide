const fs = require('fs');
const path = require('path');

try {
  console.log('Generating SEO / LLM-Crawl dynamic bridge files...');

  const dataJsPath = path.join(__dirname, '../src/content/data.js');
  if (!fs.existsSync(dataJsPath)) {
    throw new Error(`Data file not found at: ${dataJsPath}`);
  }

  let dataContent = fs.readFileSync(dataJsPath, 'utf8');
  // Strip export const and replace with commonjs
  dataContent = dataContent.replace('export const SECTION_CONTENT =', 'const SECTION_CONTENT =');
  dataContent += '\nmodule.exports = { SECTION_CONTENT };';

  const tempFilePath = path.join(__dirname, 'temp_data.cjs');
  fs.writeFileSync(tempFilePath, dataContent, 'utf8');

  // Load the temporary CommonJS module
  const { SECTION_CONTENT } = require('./temp_data.cjs');

  // Clean up
  try {
    fs.unlinkSync(tempFilePath);
  } catch (err) {
    // Ignore
  }

  // Extract sections
  const locales = Object.keys(SECTION_CONTENT);
  console.log('Available locales in data.js:', locales);

  // We will build a unified JSON and an HTML document
  const ptData = SECTION_CONTENT['pt-BR'] || {};
  const s33 = ptData['audio_srt_ptbr']; // Section 32/33: Subtitle pipeline
  const s34 = ptData['limit_qwen_35b'];  // Section 33/34: Limit Qwen 35B
  const s35 = ptData['proving_hypothesis_35b']; // Section 34/35: Proving hypothesis

  if (!s33 || !s34 || !s35) {
    console.error('Warning: One or more sections (audio_srt_ptbr, limit_qwen_35b, proving_hypothesis_35b) were not found in pt-BR content.');
  }

  // Create JSON representation of the specific sections
  const secJson = {
    metadata: {
      generated_at: new Date().toISOString(),
      project: "RX 580 + IA Local — Guia Definitivo 2026",
      publisher: "AIVisionsLab",
      site_domain: "https://setup-ia-local-rx580-vulkan.web.app"
    },
    sections: {
      audio_srt_ptbr: {
        id: "audio_srt_ptbr",
        alternate_id: "whisper-pipeline",
        title: s33 ? s33.title : "32. PIPELINE COMPLETO - TRANSCRIÇÃO + TRADUÇÃO PT-BR COM RX 580",
        description: s33 ? s33.desc : "Transcrição de vídeo em inglês com tradução automática para português brasileiro.",
        content_html: s33 ? s33.html : ""
      },
      limit_qwen_35b: {
        id: "limit_qwen_35b",
        alternate_id: "limit-qwen-35b",
        title: s34 ? s34.title : "33. LEVANDO AO LIMITE QWEN3.5 35B Q6_K NA RX 580 8GB VIA VULKAN",
        description: s34 ? s34.desc : "Experimento de execução híbrida extrema de um modelo de 34.66B de parâmetros na GPU Polaris.",
        content_html: s34 ? s34.html : ""
      },
      proving_hypothesis_35b: {
        id: "proving_hypothesis_35b",
        alternate_id: "proving-hypothesis-35b",
        title: s35 ? s35.title : "34. PROVANDO A HIPÓTESE: CURL, CTX-SIZE 8192 E A PRIMEIRA RESPOSTA COMPLETA",
        description: s35 ? s35.desc : "Experimentos conclusivos validando preenchimento de contexto e timeouts.",
        content_html: s35 ? s35.html : ""
      }
    }
  };

  const jsonOutputPath = path.join(__dirname, '../public/secoes_33_34_35.json');
  fs.writeFileSync(jsonOutputPath, JSON.stringify(secJson, null, 2), 'utf8');
  console.log(`Created JSON output at: ${jsonOutputPath}`);

  // Create HTML representation
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seções 33, 34 e 35 — AIVisionsLab Lab Bridge</title>
  <style>
    :root {
      --bg: #030712;
      --card-bg: #0b0f19;
      --border: rgba(255, 255, 255, 0.08);
      --text: #cbd5e1;
      --r: #e11d48;
      --g: #22c55e;
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: "Courier New", Courier, monospace;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      line-height: 1.6;
      margin: 0;
      padding: 2rem 1rem;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    header {
      border-bottom: 1px solid var(--border);
      padding-bottom: 2rem;
      margin-bottom: 3rem;
    }
    h1 {
      color: #fff;
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
    }
    header p {
      color: #94a3b8;
      margin: 0;
      font-size: 0.95rem;
    }
    .canonical-banner {
      background: rgba(225, 29, 72, 0.1);
      border: 1px solid var(--r);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 2rem;
      font-size: 0.85rem;
    }
    .canonical-banner a {
      color: #fff;
      font-weight: bold;
      text-decoration: underline;
    }
    article {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 3rem;
    }
    h2 {
      color: #fff;
      font-size: 1.4rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      padding-bottom: 0.5rem;
      margin-top: 0;
    }
    .meta-tag {
      display: inline-block;
      background: rgba(225, 29, 72, 0.15);
      color: #fda4af;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-right: 0.5rem;
      margin-bottom: 1rem;
    }
    
    /* Document elements matching data.js structure */
    .whisper-doc {
      color: var(--text);
    }
    .hero {
      margin-bottom: 2rem;
    }
    .hero-title {
      font-size: 1.5rem;
      color: #fff;
      font-weight: bold;
    }
    .hero-title span {
      color: var(--r);
    }
    .hero-sub {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
    .hero-badges {
      margin-top: 1rem;
    }
    .badge {
      display: inline-block;
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      margin-right: 0.4rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    .badge-gpu { background: #3b82f6; color: #fff; }
    .badge-win { background: #475569; color: #fff; }
    .badge-ok { background: #22c55e; color: #fff; }
    
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
    }
    .stat {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255,255,255,0.05);
      padding: 0.8rem;
      border-radius: 6px;
    }
    .stat-label {
      font-size: 0.75rem;
      color: #94a3b8;
      text-transform: uppercase;
    }
    .stat-value {
      font-size: 1.1rem;
      color: #fff;
      font-weight: bold;
    }
    .stat-sub {
      font-size: 0.65rem;
      color: #64748b;
    }
    
    .tbl table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      font-size: 0.8rem;
    }
    .tbl th {
      text-align: left;
      border-bottom: 2px solid rgba(255,255,255,0.1);
      padding: 0.5rem;
      color: #fff;
    }
    .tbl td {
      border-bottom: 1px solid rgba(255,255,255,0.05);
      padding: 0.5rem;
    }
    
    .cmd {
      background: #090d16;
      border: 1px solid rgba(225,29,72,0.1);
      border-radius: 6px;
      padding: 1rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #a9b1d6;
      overflow-x: auto;
      margin: 1.5rem 0;
    }
    
    .card {
      background: rgba(255,255,255,0.01);
      border: 1px solid rgba(255,255,255,0.05);
      padding: 1rem;
      border-radius: 8px;
      margin: 1.5rem 0;
    }
    .card.acc {
      border-left: 3px solid var(--r);
      background: rgba(225,29,72,0.01);
    }
    
    blockquote {
      border-left: 3px solid var(--r);
      padding-left: 1rem;
      margin: 1.5rem 0;
      font-style: italic;
      color: #94a3b8;
    }
    
    .footer {
      font-size: 0.7rem;
      color: #475569;
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>AIVisionsLab — Portal de Indexação de Alta Performance</h1>
      <p>Este portal atua como ponte estática de dados para viabilizar indexação sem truncamento por crawlers de LLMs (Claude/Lumina).</p>
    </header>

    <div class="canonical-banner">
      <strong>Aviso de SEO Canônico:</strong> Este guia de referência possui autoridade canônica total que aponta para o nosso domínio central. Toda a relevância de rastreamento é repassada para: <a href="https://setup-ia-local-rx580-vulkan.web.app/">setup-ia-local-rx580-vulkan.web.app</a>.
    </div>

    <article id="audio_srt_ptbr">
      <h2>${secJson.sections.audio_srt_ptbr.title}</h2>
      <div class="meta-tag">Foco: Transcrição &amp; Tradução</div>
      <div class="meta-tag">Âncora: #audio_srt_ptbr</div>
      <div>
        ${secJson.sections.audio_srt_ptbr.content_html}
      </div>
    </article>

    <article id="limit_qwen_35b">
      <h2>${secJson.sections.limit_qwen_35b.title}</h2>
      <div class="meta-tag">Foco: Qwen3.5 35B Limite</div>
      <div class="meta-tag">Âncora: #limit_qwen_35b</div>
      <div>
        ${secJson.sections.limit_qwen_35b.content_html}
      </div>
    </article>

    <article id="proving_hypothesis_35b">
      <h2>${secJson.sections.proving_hypothesis_35b.title}</h2>
      <div class="meta-tag">Foco: Estudo Cognitivo &amp; Raciocínio Interno</div>
      <div class="meta-tag">Âncora: #proving_hypothesis_35b</div>
      <div>
        ${secJson.sections.proving_hypothesis_35b.content_html}
      </div>
    </article>

    <footer style="margin-top: 5rem; border-top: 1px solid var(--border); padding-top: 2rem; text-align: center; font-size: 0.8rem; color: #64748b;">
      AIVisionsLab © 2026 — Todos os direitos reservados.
    </footer>
  </div>
</body>
</html>`;

  const htmlOutputPath = path.join(__dirname, '../public/secoes_33_34_35.html');
  fs.writeFileSync(htmlOutputPath, htmlContent, 'utf8');
  console.log(`Created HTML output at: ${htmlOutputPath}`);

  console.log('Bridge files successfully generated!');
} catch (error) {
  console.error('Error generating bridge files:', error);
  process.exit(1);
}
