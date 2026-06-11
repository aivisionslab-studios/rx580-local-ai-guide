---
id: "sd_openwebui_integration"
title: "11.B — INTEGRAÇÃO OPENWEBUI (DOCKER) + STABLE-DIFFUSION.CPP (LOCAL)"
description: "Ponte de rede entre o contêiner Docker do OpenWebUI e o motor C++ nativo rodando na GPU do host."
category: "guides"
lang: "pt-BR"
---

<p>Quando o motor de geração roda fora do contêiner Docker, a comunicação local padrão (<code>127.0.0.1</code>) é bloqueada pelo isolamento de rede e pelo Firewall do Windows. A inicialização e a rota precisam ser explícitas.</p>

<p>⚙️ <strong>Parâmetros Críticos de Inicialização</strong></p>
<div class="tbl">
  <table>
    <thead>
      <tr><th>Flag</th><th>Valor</th><th>Descrição</th></tr>
    </thead>
    <tbody>
      <tr><td><code>--listen-ip</code></td><td><code>0.0.0.0</code></td><td>Abre escuta para requisições externas ao host (Docker)</td></tr>
      <tr><td><code>--listen-port</code></td><td><code>7860</code></td><td>Porta padrão de integração com OpenWebUI</td></tr>
      <tr><td><code>-m</code></td><td>caminho absoluto</td><td>Modelo SD 1.5 / XL em <code>.safetensors</code> ou <code>.gguf</code></td></tr>
    </tbody>
  </table>
</div>

<p><strong>Comando de Produção — SD 1.5 / DreamShaper:</strong></p>
<pre style="font-family:'JetBrains Mono',monospace;font-size:11px">sd-server.exe --listen-ip 0.0.0.0 --listen-port 7860 -m "E:\ia_storage\models\Stable-diffusion\checkpoints\dreamshaper_8.safetensors"</pre>

<p>⚠️ <strong>Nota de Arquitetura:</strong> Modelos Flux.1 não são compatíveis com esta build via flag <code>-m</code> simples — retornam <code>[ERROR] main.cpp:92 - new_sd_ctx_t failed</code>. Para Flux, use o comando dedicado da seção 10.A com flags <code>--diffusion-model</code>, <code>--vae</code>, <code>--clip_l</code> e <code>--t5xxl</code> separadamente.</p>

<p>🔌 <strong>Configuração de Rota no OpenWebUI</strong></p>
<ol style="font-size:.88rem;color:#94a3b8;line-height:2;margin-left:1.25rem">
  <li>Acesse <code>http://localhost:3000</code></li>
  <li>Vá em <strong>Configurações &gt; Imagens</strong> (Painel do Administrador)</li>
  <li>Selecione o motor <strong>Automatic1111</strong></li>
  <li>Insira o IP local da máquina com <code>/</code> obrigatório no final:<br>
    <code>http://192.168.15.68:7860/</code>
  </li>
  <li>Clique em <strong>Salvar</strong> — tarja verde confirmará a ponte de rede</li>
</ol>

<div class="card">
  <strong>🔒 Liberação Obrigatória no Windows Defender Firewall</strong>
  <p>O Windows Defender bloqueia silenciosamente conexões vindas da subrede interna do Docker (<code>172.17.0.0/16</code>) e do WSL2 (<code>172.x.x.x</code>) por padrão. Sem esta regra, o OpenWebUI não consegue alcançar o sd-server mesmo com <code>--listen-ip 0.0.0.0</code> ativo.</p>
  <p><strong>Método 1 — Interface Gráfica (recomendado para primeira instalação):</strong></p>
  <ol style="font-size:.82rem;color:#94a3b8;line-height:1.6;margin-left:1.25rem;margin-bottom:.5rem">
    <li>Abra: <code>Painel de Controle → Windows Defender Firewall → Configurações Avançadas</code></li>
    <li>Clique em: <code>Regras de Entrada → Nova Regra</code></li>
    <li>Tipo: <code>Porta</code></li>
    <li>Protocolo: <code>TCP</code> | Porta: <code>7860</code></li>
    <li>Ação: <code>Permitir a conexão</code></li>
    <li>Perfis: marque <code>Domínio</code>, <code>Privado</code> e <code>Público</code></li>
    <li>Nome: <code>sd-server AIVisionsLab</code></li>
  </ol>
  <p><strong>Método 2 — PowerShell (uma linha, execução como Administrador):</strong></p>
  <pre style="font-family:'JetBrains Mono',monospace;font-size:10px;margin-bottom:.5rem">New-NetFirewallRule -DisplayName "sd-server AIVisionsLab" -Direction Inbound -Protocol TCP -LocalPort 7860 -Action Allow</pre>
  <p><strong>Validação:</strong> Após criar a regra, reinicie o sd-server e tente gerar uma imagem pelo OpenWebUI. A tarja verde na configuração de imagens confirma a ponte ativa.</p>
</div>

<p>📊 <strong>Logs de Sucesso Esperados</strong></p>
<pre style="font-family:'JetBrains Mono',monospace;font-size:11px">[INFO] main.cpp:148 - listening on: http://0.0.0.0:7860
[INFO] stable-diffusion.cpp:3987 - generate_image 512x512
[INFO] stable-diffusion.cpp:4218 - generate_image completed in X.XXs</pre>

<div class="card">
  <strong>⚠️ Nota de Compatibilidade de Flags — sd-server</strong>
  <p>O repositório <code>leejet/stable-diffusion.cpp</code> passou por renomeação de argumentos CLI ao longo de suas versões. Dependendo do commit compilado:</p>
  <div class="tbl">
    <table>
      <thead>
        <tr><th>Versão / Build</th><th>Flags Corretas</th></tr>
      </thead>
      <tbody>
        <tr><td>Builds antigas (pré master-600)</td><td><code>--host 0.0.0.0 --port 7860</code></td></tr>
        <tr><td>Builds recentes (master-600+)</td><td><code>--listen-ip 0.0.0.0 --listen-port 7860</code></td></tr>
      </tbody>
    </table>
  </div>
  <p><strong>Diagnóstico rápido:</strong> Se o terminal retornar <code>error: unknown argument '--listen-ip'</code>, substitua imediatamente por <code>--host</code> e <code>--port</code>. O comportamento de rede é idêntico — apenas a nomenclatura do argumento foi atualizada.</p>
  <p><strong>Validação da sua versão:</strong></p>
  <pre style="font-family:'JetBrains Mono',monospace;font-size:10px;margin:0">E:\stable-diffusion.cpp\build\bin\Release\sd-server.exe --help
# Procure na listagem: se aparecer "--listen-ip", use a sintaxe nova.
# Se aparecer "--host", use a sintaxe antiga.</pre>
</div>
