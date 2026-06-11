---
id: "sd_bat_automation"
title: "11 — AUTOMAÇÃO DE INICIALIZAÇÃO (.BAT)"
description: "Script de lote dedicado para inicialização segura e reproduzível do servidor de IA."
category: "guides"
lang: "pt-BR"
---

<p>Para evitar erros manuais, caminhos incorretos ou portas presas na VRAM ao reiniciar o Windows, o servidor deve ser iniciado exclusivamente via arquivo <code>.bat</code> na Área de Trabalho.</p>

<p><strong>Script de Produção (iniciar_ia_server.bat):</strong></p>
<pre style="font-family:'JetBrains Mono',monospace;font-size:11px">@echo off
title Servidor Stable Diffusion Local - Producao
cls

:: 1. Limpeza de processos fantasmas na VRAM/RAM
taskkill /f /im sd-server.exe 2>nul
taskkill /f /im sd-cli.exe 2>nul
timeout /t 2 /nobreak >nul

:: 2. Salto de unidade e rota nativa (CMD syntax)
E:
cd "E:\stable-diffusion.cpp\build\bin\Release"

:: 3. Execucao com escuta aberta para Docker
sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 -m "E:\ia_storage\models\Stable-diffusion\checkpoints\dreamshaper_8.safetensors"

pause</pre>

<div class="tbl">
  <table>
    <thead>
      <tr><th>Regra</th><th>Motivo</th></tr>
    </thead>
    <tbody>
      <tr><td>Nunca usar <code>.\</code> antes do executável</td><td>CMD tradicional não reconhece — quebra o terminal</td></tr>
      <tr><td>Bloco <code>taskkill</code> obrigatório</td><td>Libera porta 7860 travada em processos background</td></tr>
      <tr><td>Salto de unidade (<code>E:</code>) antes do <code>cd</code></td><td>CMD não muda de drive sem o salto explícito</td></tr>
    </tbody>
  </table>
</div>

<div class="card">
  <span style="color:#22c55e; font-weight:bold">✅ STATUS: AUTOMAÇÃO VALIDADA EM PRODUÇÃO</span><br>
  <span style="font-size:.8rem; color:#94a3b8">Dois cliques no .bat inicializam o ecossistema completo — limpeza, rota e bind de porta em sequência</span>
</div>
