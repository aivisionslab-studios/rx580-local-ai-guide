---
id: "comfyui-flux"
title: "16. PARAMETRIZAÇÃO CRÍTICA DO FLUX.1 SCHNELL"
description: "Configuração matemática obrigatória para processar o modelo SOTA na CPU sem estourar os limites da RAM."
category: "guides"
lang: "pt-BR"
---

<p>O processamento do FLUX.1 Schnell de 16GB em modo de CPU exige limites de amostragem fixos. Desvios nestas regras provocam o travamento da máquina por saturação extrema de memória:</p>
  <div class="tbl"><table>
    <thead><tr><th>Parâmetro de Amostragem</th><th>Valor de Ajuste Obrigatório</th><th>Explicação Técnica no Xeon</th></tr></thead>
    <tbody>
      <tr class="hig"><td>Sampling Steps</td><td>4 Steps</td><td>O modelo Schnell foi desenhado para fechar a convergência de ruído em apenas 4 interações.</td></tr>
      <tr class="hig"><td>CFG Scale</td><td>1.0</td><td>Valores acima de 1.0 destroem a fidelidade das texturas e distorcem a distribuição de tensores.</td></tr>
      <tr><td>Scheduler Type</td><td>sgm_uniform</td><td>Garante a interpolação linear dos tensores de difusão de forma otimizada para instruções AVX2.</td></tr>
    </tbody>
  </table></div>
