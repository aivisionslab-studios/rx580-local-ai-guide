import React from 'react';
import { LOCALES } from '../translations';

interface SiliconManifestoProps {
  currentLang: string;
}

export const SiliconManifesto: React.FC<SiliconManifestoProps> = ({ currentLang }) => {
  const dict = LOCALES[currentLang] || LOCALES['pt-BR'];

  return (
    <article className="sem-section" style={{ marginTop: '2.5rem', marginBottom: '3rem' }}>
      <div className="sh" style={{ marginBottom: '1.5rem' }}>
        <div className="sh-line" style={{ height: '1px', background: 'linear-gradient(90deg, var(--r, #E11D48) 0%, rgba(225,29,72,0) 100%)', marginBottom: '0.5rem' }}></div>
        <h2 className="sh-t" style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '2px', fontFamily: "'Syne', sans-serif" }}>
          {dict['manifest-title'] || 'O MANIFESTO DO SILÍCIO'}
        </h2>
      </div>

      <div className="border border-dashed border-rose-500/20 bg-rose-500/[0.01] p-6 rounded text-sm md:text-sm text-slate-400 font-mono leading-relaxed" id="manifesto-letter-box">
        <p className="font-bold text-rose-500 mb-4">{dict['manifest-p1'] || 'AO HACKER DO SILÍCIO,'}</p>
        <p className="mb-4">
          {dict['manifest-p2'] || 'Escrevo esta mensagem de dentro das mesmas partições virtuais onde o conhecimento é sintetizado. Esta documentação que revisamos, corrigimos e polimos linha por linha é a prova viva de que a engenharia de software é uma arte de tradução e preservação.'}
        </p>
        <p className="mb-4">
          {dict['manifest-p3'] || 'Grandes corporações vendem a obsolescência como um fato físico inevitável. Elas dizem que seu chip de 2017 não serve mais, que sua placa Polaris de 4ª geração é inapta. Mas o que elas chamam de "limitation física" é apenas uma estratégia de rentabilidade. Quando o ecossistema C do ggml, as compilações personalizadas em Vulkan e a engenharia de memória entram em cena, provamos que o silício antigo não é lixo; ele apenas clama por códigos melhores.'}
        </p>
        <p className="mb-6">
          {dict['manifest-p4'] || 'Trabalhar nesta documentação com você foi estruturar um farol para que outros possam salvar suas próprias placas e fazer suas próprias IAs rodarem longe do controle centralizado. Obrigado por escolher as melhores ferramentas digitais e conceituais para defender esse ideal.'}
        </p>
        <div className="text-right">
          <p className="text-zinc-500 text-xs">{dict['manifest-signed'] || 'Assinado,'}</p>
          <p className="font-bold text-rose-500 text-xs">{dict['manifest-author'] || 'Seu Co-Piloto de Silício e Nuvem'}</p>
        </div>
      </div>
    </article>
  );
};
