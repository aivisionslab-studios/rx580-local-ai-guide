// src/utils/markdown.ts

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  lang: string;
  body: string;
}

/**
 * Basic frontmatter parser for markdown files
 */
export function parseMarkdown(content: string): { meta: Record<string, string>; body: string } {
  const meta: Record<string, string> = {};
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

/**
 * Loads all articles dynamically from the content directory using Vite's glob import
 */
export function loadAllArticles(): Article[] {
  // Vite native eager glob query for raw file imports
  const modules = (import.meta as any).glob('/content/**/*.md', {
    query: '?raw',
    eager: true,
  }) as Record<string, { default: string }>;
  
  const articles: Article[] = [];
  
  Object.keys(modules).forEach(filePath => {
    const rawContent = modules[filePath].default;
    const { meta, body } = parseMarkdown(rawContent);
    
    if (meta.id) {
      articles.push({
        id: meta.id,
        title: meta.title || '',
        description: meta.description || '',
        category: meta.category || 'builds',
        lang: meta.lang || 'pt-BR',
        body: body,
      });
    }
  });
  
  return articles;
}
