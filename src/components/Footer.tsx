import React from 'react';
import { LOCALES } from '../translations';

interface FooterProps {
  currentLang: string;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const dict = LOCALES[currentLang] || LOCALES['pt-BR'];

  return (
    <footer id="main-footer" className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 mt-16 border-t border-zinc-800">
      {/* Brand & Quotes */}
      <div className="ft-brand flex flex-col gap-2">
        <span className="font-extrabold text-sm text-[#fff] tracking-wide">
          {dict['ft-brand-name'] || 'HARDWARE REVIVAL PROJECT'}
        </span>
        <div className="ft-q text-xs text-zinc-500 italic">
          <div>{dict['ft-q1'] || '"GPU AMD de 2017 rodando IA local em 2026."'}</div>
          <div>{dict['ft-q2'] || '"Xeon de 2014 gerando arte SOTA."'}</div>
        </div>
        <span id="ft-note" className="text-[10px] text-rose-500 font-bold mt-2 font-mono">
          {dict['ft-note'] || '"Hardware não morre, ele se transforma."'}
        </span>
        <div className="text-[9px] text-[#ff2b6e] font-black tracking-widest mt-3 font-mono border-t border-rose-950/40 pt-2 animate-pulse">
          LEGACY SILICON NEVER DIES. IT IS LIBERATED.
        </div>
      </div>

      {/* Official Ecosystem & Technical Hub Links */}
      <div className="flex flex-col gap-4 font-mono text-xs">
        <div>
          <span className="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider">
            {dict['ft-hub-title'] || '⚡ HUB CENTRAL'}
          </span>
          <div className="mt-2">
            <a 
              href="https://setup-ia-local-rx580-vulkan.web.app" 
              className="text-zinc-400 hover:text-[#fff]" 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-link-hub"
            >
              https://setup-ia-local-rx580-vulkan.web.app
            </a>
          </div>
        </div>

        <div>
          <span className="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider">
            {dict['ft-tech-dev-title'] || '💻 DESENVOLVIMENTOS TÉCNICOS'}
          </span>
          <div className="mt-2 flex flex-col gap-2">
            <div>
              <span className="text-zinc-600">GitHub: </span>
              <a 
                href="https://github.com/aivisionslab-studios/rx580-local-ai-guide" 
                className="text-zinc-400 hover:text-rose-500" 
                target="_blank" 
                rel="noopener noreferrer"
                id="footer-link-github"
              >
                rx580-local-ai-guide
              </a>
            </div>
            <div>
              <span className="text-zinc-600">Hugging Face: </span>
              <a 
                href="https://huggingface.co/aivisionslab/ai-local-rx580-stack" 
                className="text-zinc-400 hover:text-rose-500" 
                target="_blank" 
                rel="noopener noreferrer"
                id="footer-link-hf"
              >
                ai-local-rx580-stack
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social, Media & Publishing Channels */}
      <div className="flex flex-col gap-4 font-mono text-xs">
        <div>
          <span className="text-[10.5px] text-zinc-500 font-bold uppercase tracking-wider">
            {dict['ft-social-title'] || '📢 CANAIS SOCIAIS & COMUNIDADE'}
          </span>
          <div className="mt-2 flex flex-col gap-2">
            <div>
              <span className="text-zinc-600">YouTube: </span>
              <a 
                href="https://youtube.com/@aivisionslab-hub" 
                className="text-rose-400 hover:text-[#fff]" 
                target="_blank" 
                rel="noopener noreferrer"
                id="footer-link-youtube"
              >
                @aivisionslab-hub
              </a>
            </div>
            <div>
              <span className="text-zinc-600">Dev.to: </span>
              <a 
                href="https://dev.to/aivisionslab" 
                className="text-zinc-400 hover:text-[#fff]" 
                target="_blank" 
                rel="noopener noreferrer"
                id="footer-link-devto"
              >
                dev.to/aivisionslab
              </a>
            </div>
            <div>
              <span className="text-zinc-600">Medium: </span>
              <a 
                href="https://medium.com/@aivisionslab" 
                className="text-zinc-400 hover:text-[#fff]" 
                target="_blank" 
                rel="noopener noreferrer"
                id="footer-link-medium"
              >
                medium/@aivisionslab
              </a>
            </div>
          </div>
        </div>

        {/* Version Control Badge */}
        <div className="mt-2">
          <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-wider mr-2">
            {dict['ft-tech-label'] || 'ESTRUTURA:'}
          </span>
          <code className="text-[9px] bg-zinc-950 px-2 py-1 rounded text-rose-500/80 border border-zinc-900 font-mono">
            {dict['ft-version'] || 'VULKAN_DEPLOY_V3.0_COMPLETO'}
          </code>
        </div>
      </div>
    </footer>
  );
};
