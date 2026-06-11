---
id: "linhatempo"
title: "30.A. LINHA DO TEMPO COLETIVA — A EVOLUÇÃO DO RX 580 COMO PLATAFORMA DE IA"
description: "Análise histórica e comparativa unificada documentando a quebra de barreiras e obsolescência da RX 580 em três etapas revolucionárias (2025-2026)."
category: "builds"
lang: "pt-BR"
---

<p>O resgate técnico e a ascensão da AMD Radeon RX 580 como uma plataforma de inteligência artificial prática não é fruto de uma única mente, mas sim de uma <strong>evolução coletiva ascendente</strong>. Três projetos independentes, construídos sobre a base matemática comum do ecossistema <code>ggml</code>, pavimentaram esta jornada:</p>

  <!-- Linha do Tempo Visual -->
  <div style="position:relative;margin:2rem 0;padding-left:1.5rem;border-left:2px solid var(--b)">
    <div style="margin-bottom:1.5rem;position:relative">
      <div style="position:absolute;left:-29px;top:2px;width:12px;height:12px;border-radius:50%;background:var(--r);border:2px solid #07080a"></div>
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--r);font-weight:bold">JANEIRO DE 2025</span>
      <h5 style="color:#fff;margin:.25rem 0;font-size:.88rem">Método Amihart (Debian Linux)</h5>
      <p>Primeiro marco documentado. Validou LLMs acelerados por Vulkan no <code>llama.cpp</code> obtendo 24.56 t/s. No entanto, declarou: <em>"Vulkan não funciona para Stable Diffusion"</em>, devido às limitações do software na época, recorrendo ao ROCm via Docker.</p>
    </div>
    <div style="margin-bottom:1.5rem;position:relative">
      <div style="position:absolute;left:-29px;top:2px;width:12px;height:12px;border-radius:50%;background:#eab308;border:2px solid #07080a"></div>
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#eab308;font-weight:bold">DEZEMBRO DE 2025</span>
      <h5 style="color:#fff;margin:.25rem 0;font-size:.88rem">Método DadHacks (Linux/Debian)</h5>
      <p>Refutou empiricamente a impossibilidade de Stable Diffusion via Vulkan. Utilizou o recém-lançado motor <code>stable-diffusion.cpp</code> com a flag compiladora <code>-DSD_VULKAN=ON</code> para rodar geração GGUF do Flux Schnell com segmentação CPU/GPU.</p>
    </div>
    <div style="position:relative">
      <div style="position:absolute;left:-29px;top:2px;width:12px;height:12px;border-radius:50%;background:#22c55e;border:2px solid #07080a"></div>
      <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#22c55e;font-weight:bold">TEMPORADA 2026</span>
      <h5 style="color:#fff;margin:.25rem 0;font-size:.88rem">AIVisionsLab (Windows Nativo + WSL2)</h5>
      <p>Unificação do ecossistema de produção. Desenvolveu automação nativa via <code>.bat</code>, integrou renderização Vulkan local a painéis amigáveis (OpenWebUI via Docker), documentou os fallbacks para CPU Xeon em modelos SOTA e mapeou de forma exaustiva os motivos de falhas do DirectML/ROCm no Windows.</p>
    </div>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin:2rem 0 .75rem 0;text-transform:uppercase">A. A Pergunta que Cada Projeto Respondeu</h4>
  <p>A evolução da maturidade técnica da RX 580 pode ser traduzida pelas premissas respondidas pelos autores:</p>
  <ul style="padding-left:1.2rem;font-size:.82rem;color:#94a3b8;line-height:1.8;margin-bottom:1.25rem">
    <li><strong>Amihart (Jan 2025):</strong> <em>"É possível rodar LLMs de forma rápida na RX 580 sem ROCm oficial?"</em> <strong>Sim</strong>, compilando o llama.cpp com Vulkan API puro.</li>
    <li><strong>DadHacks (Dez 2025):</strong> <em>"É possível gerar imagens via IA aceleradas por Vulkan na RX 580?"</em> <strong>Sim</strong>, compilando stable-diffusion.cpp e utilizando o formato alternativo estável GGUF.</li>
    <li><strong>AIVisionsLab (2026):</strong> <em>"É possível colocar toda essa infraestrutura em produção integrada e amigável no Windows?"</em> <strong>Sim</strong>, construindo pontes de rede de contêineres Docker, automações unificadas e fallbacks inteligentes de CPU para excedentes de VRAM.</li>
  </ul>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">B. Tabela Mestre Comparativa Unificada</h4>
  <p>Mapeamento estruturado cruzado das capacidades e conquistas cumulativas:</p>
  <div class="tbl">
    <table>
      <thead>
        <tr>
          <th>Capacidade</th>
          <th>Amihart (2025)</th>
          <th>DadHacks (2025)</th>
          <th>AIVisionsLab (2026)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Sistema Base</strong></td><td>Debian Linux</td><td>Linux Debian</td><td>Windows 10 Pro + WSL2 Linux</td></tr>
        <tr><td><strong>Motor de LLM</strong></td><td>✅ Vulkan (24.56 t/s)</td><td>✅ Vulkan (llama.cpp)</td><td>✅ Vulkan (15-16 t/s)</td></tr>
        <tr><td><strong>Motor SD</strong></td><td>❌ Não viável em Vulkan</td><td>✅ Vulkan puro</td><td>✅ Vulkan puro (~72s SD1.5)</td></tr>
        <tr><td><strong>Flux GGUF</strong></td><td>❌ Inexistente</td><td>✅ Linha de comando</td><td>✅ Híbrido GPU/CPU Estável</td></tr>
        <tr><td><strong>Interface Gráfica</strong></td><td>❌ Apenas Console / WebUI Docker</td><td>❌ Apenas CLI</td><td>✅ OpenWebUI + API integrada</td></tr>
        <tr><td><strong>Automação</strong></td><td>❌ Não desenvolvido</td><td>❌ Não desenvolvido</td><td>✅ Scripts .bat double-click</td></tr>
        <tr><td><strong>Estabilidade VRAM</strong></td><td>❌ Limitação física ROCm</td><td>⚠️ Manual CLI</td><td>✅ VAE Tiling integrado</td></tr>
        <tr><td><strong>Modelos &gt; 8GB</strong></td><td>❌ OOM crônicos</td><td>⚠️ CPU offload básico</td><td>✅ Quad-Channel REG ECC fallbacks</td></tr>
        <tr><td><strong>Animação Video</strong></td><td>❌ Não abordado</td><td>❌ Não abordado</td><td>✅ AnimateDiff WSL2 CPU Xeon</td></tr>
        <tr><td><strong>Detecção GGUF</strong></td><td>❌ Não abordado</td><td>❌ Não abordado</td><td>✅ Mapeamento leejet vs city96</td></tr>
      </tbody>
    </table>
  </div>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">C. O Denominador Técnico Comum — Engine GGML</h4>
  <p>A tecnologia central que permitiu o resgate físico do silício legacy foi a criação de Georgi Gerganov (<strong>ggml / llama.cpp / stable-diffusion.cpp</strong>). Ao portar os tensores de deep learning diretamente para a linguagem C e expor hooks puros de renderização à biblioteca aberta do <strong>Vulkan API</strong>, esse ecossistema libertou as placas obsoletas das amarras das frentes comerciais (CUDA exclusivo e descaso do ROCm).</p>

  <h4 style="color:#fff;font-family:'Syne',sans-serif;font-size:11px;letter-spacing:1px;margin-bottom:.75rem;text-transform:uppercase">D. Filosofia Convergente</h4>
  <p>Manifestações diretas que eternizam o propósito livre destes pesquisadores:</p>
  <blockquote>
    <strong>Amihart:</strong> "Apesar de quão antiga é esta placa, é tecnicamente possível utilizá-la para IA... o silício de herança clama por otimização."
  </blockquote>
  <blockquote>
    <strong>DadHacks:</strong> "Esse setup fornece uma ponte viável de aproveitamento técnico dos investimentos existentes em hardware sem exigir upgrades caros ou dependência de pacotes de software inchados."
  </blockquote>
  <blockquote>
    <strong>AIVisionsLab:</strong> "A obsolescência comercial programada é uma escolha de mercado, de margem de lucro, não uma limitação da física do silício. O hardware de herança não morre; ele é libertado pelo software correto."
  </blockquote>

  <div class="card">
    <strong>Crédito de Co-autoria e Agradecimento:</strong> Linha do tempo de conhecimento hacker dedicada ao esforço cumulativo de <strong>艾米心 (Amihart)</strong>, <strong>DH (DadHacks)</strong>, <strong>leejet</strong>, <strong>ggerganov</strong>, <strong>woodrex</strong> e a todos da cultura de resgate digital do silício.
  </div>
