// migrate_to_md.js
import fs from 'fs';
import path from 'path';
import { SECTION_CONTENT } from './src/content/data.js';
import { SECTION_GROUPS } from './src/content/registry.js';

const CATEGORIES = {
  // Routing categories requested: guides, benchmarks, troubleshooting, builds
  'contexto': 'builds',
  'hardware': 'builds',
  'falhas': 'troubleshooting',
  'solucao': 'builds',
  'prereqs': 'builds',
  'jornada': 'builds',
  'llama': 'guides',
  'sdcpp': 'guides',
  'modelos': 'guides',
  'sdserver': 'guides',
  'flux_server': 'guides',
  'sd_bat_automation': 'guides',
  'sd_openwebui_integration': 'guides',
  'comfyui-modelos': 'guides',
  'comfyui-wsl': 'guides',
  'comfyui-directml': 'troubleshooting',
  'comfyui-directml-func': 'guides',
  'comfyui-flux': 'guides',
  'animatediff-video': 'guides',
  'stack': 'builds',
  'scripts': 'builds',
  'guia': 'guides',
  'benchmarks': 'benchmarks',
  'cpu': 'builds',
  'flux-vulkan': 'guides',
  'troubleshooting': 'troubleshooting',
  'troubleshoot-comfyui': 'troubleshooting',
  'comfyui-portable-amd': 'guides',
  'comunidade': 'builds',
  'amihart': 'guides',
  'dadhacks': 'guides',
  'proximos': 'builds',
  'arquivos': 'builds',
  'meta': 'builds',
  'linhatempo': 'builds'
};

const baseContentDir = path.resolve('content');

function convertHtmlToMarkdown(html) {
  if (!html) return '';
  // Basic translation of common HTML formatting to clean Markdown for readability & crawlers
  let md = html;
  
  // Strip inline styles from tables, divs, blockquotes
  md = md.replace(/<div class="tbl" style="[^"]*">/g, '<div class="tbl">');
  md = md.replace(/<div class="card acc" style="[^"]*">/g, '<div class="card acc">');
  md = md.replace(/<div class="card" style="[^"]*">/g, '<div class="card">');
  md = md.replace(/<blockquote style="[^"]*">/g, '<blockquote>');
  md = md.replace(/<p style="[^"]*">/g, '<p>');
  md = md.replace(/<strong style="[^"]*">/g, '<strong>');
  md = md.replace(/<code style="[^"]*">/g, '<code>');
  
  // Remove simple tags or keep semantic ones
  return md.trim();
}

function run() {
  console.log('📦 Starting Content Migration to Markdown Files...');
  
  ['pt-BR', 'en'].forEach(lang => {
    const data = SECTION_CONTENT[lang] || {};
    
    Object.keys(data).forEach(id => {
      const section = data[id];
      const category = CATEGORIES[id] || 'builds';
      
      const categoryDir = path.join(baseContentDir, lang, category);
      fs.mkdirSync(categoryDir, { recursive: true });
      
      const convertedBody = convertHtmlToMarkdown(section.html);
      
      const fileContent = `---
id: "${id}"
title: "${section.title}"
description: "${section.desc || ''}"
category: "${category}"
lang: "${lang}"
---

${convertedBody}
`;
      
      const filePath = path.join(categoryDir, `${id}.md`);
      fs.writeFileSync(filePath, fileContent, 'utf-8');
      console.log(`✅ Migrated: ${lang}/${category}/${id}.md`);
    });
  });
  
  console.log('🎉 Migration completed successfully!');
}

run();
