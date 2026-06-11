---
id: "benchmarks"
title: "21. BENCHMARKS REAIS DO LABORATÓRIO"
description: "Dados consolidados de telemetria medidos diretamente nos logs de inferência das duas arquiteturas."
category: "benchmarks"
lang: "pt-BR"
---

<div class="tbl"><table>
    <thead><tr><th>Modo de Execução do Modelo</th><th>Arquitetura Alocada</th><th>Métrica Comercial Obtida</th><th>Status de Viabilidade</th></tr></thead>
    <tbody>
      <tr><td>Inferência de Texto Comum</td><td>CPU Xeon Pura (Sem Aceleração)</td><td>3 a 5 tokens por segundo</td><td>❌ Ineficiente / Respostas Lentas</td></tr>
      <tr class="hig"><td>Inferência de Texto Compilada</td><td>RX 580 8GB via Vulkan Backend</td><td>15 a 16 tokens por segundo</td><td>✅ Altamente Produtivo / Instantâneo</td></tr>
      <tr><td>Amostragem SD 1.5 (20 Steps)</td><td>ComfyUI Windows via DirectML</td><td>~450 segundos por imagem</td><td>❌ Instável / Descarte por Erro Crítico</td></tr>
      <tr class="hig"><td>Amostragem SD 1.5 (20 Steps)</td><td>stable-diffusion.cpp via Vulkan</td><td>72 segundos por imagem</td><td>✅ Otimizado / Resposta Rápida</td></tr>
    </tbody>
  </table></div>
