import React from 'react';
import { LOCALES } from '../translations';

interface HeroProps {
  currentLang: string;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const dict = LOCALES[currentLang] || LOCALES['pt-BR'];

  return (
    <div className="hero" id="doc-hero-masthead">
      <h1 id="hero-title">
        {dict['hero-title'] || 'RX 580 + IA LOCAL'}
      </h1>
      <div id="hero-subtitle">
        {dict['hero-subtitle'] || 'DOCUMENTAÇÃO MASTER UNIFICADA.'}
      </div>
      <p id="hero-desc">
        {dict['hero-desc'] || 'Da "GPU Morta" ao Servidor de IA via Vulkan no Windows.'}
      </p>
      
      <div className="hero-quotes" id="hero-quotes-block">
        <div className="hero-q" id="hero-q1">
          {dict['hero-q1'] || '"O problema nunca foi a placa."'}
        </div>
        <div className="hero-q" id="hero-q2">
          {dict['hero-q2'] || '"Hardware não morre."'}
        </div>
      </div>
    </div>
  );
};
