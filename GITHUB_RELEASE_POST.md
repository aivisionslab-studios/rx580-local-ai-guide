# 🔬 AIVisionsLab — Local AI on Legacy Hardware (AMD Radeon RX 580 8GB & Intel Xeon)
> **Combatendo a obsolescência programada com apis de baixo nível e backends abertos (Vulkan). Roda LLMs e Difusão de Imagens nativamente sem CUDA, sem ROCm e sem DirectML.**

Seja muito bem-vindo ao repositório central do **AIVisionsLab**! Esse projeto prova que placas de vídeo lendárias como a **AMD Radeon RX 580 8GB de 2017 (arquitetura Polaris)** integradas a processadores clássicos como o **Intel Xeon Haswell (v3/v4)** podem rodar de forma perfeitamente estável e em alto desempenho os modelos estado da arte de Inteligência Artificial local de 2026.

---

## 🔗 Canais de Comunicação & Links Úteis

*   **Hub Central / Guia Interativo:** [setup-ia-local-rx580-vulkan.web.app](https://setup-ia-local-rx580-vulkan.web.app/)
*   **AIVisionsLab no YouTube:** `[Adicione seu Link do YouTube aqui]`
*   **Comunidade no Discord:** `[Adicione seu Link do Discord aqui]`
*   **LinkedIn dos Desenvolvedores:** `[Adicione seu Link do LinkedIn aqui]`
*   **Instagram / X (Twitter):** `[Adicione suas Redes Sociais aqui]`

---

## 📈 Resultados Técnicos e Métricas do Laboratório

Abaixo estão os resultados consolidados obtidos diretamente nos testes de estresse de VRAM e processamento vetorial no laboratório:

### 1. Inferencia de Texto (LLM via Llama.cpp Vulkan Backend)
*   **Modelo de Teste:** Llama 3 8B Instruct (Quantização Q4_K_M)
*   **Backend:** Vulkan Compute Shaders (AMD GCN 4.0 / Polaris)
*   **Velocidade de Geração (Eval):** **~16.2 Tokens/segundo** (Excelente para leitura interativa em tempo real com consumo zero de nuvem).
*   **Consumo de VRAM:** ~4.8 GB estável.

### 2. Geração de Imagens (Stable Diffusion)
*   **Modelo de Teste:** Stable Diffusion v1.5 (Pruned FP16)
*   **Backend de Aceleração:** `stable-diffusion.cpp` compilado nativamente com suporte **Vulkan**
*   **Tempo por Geração (512x512, 25 steps, DPM++ 2M SDE):** **~72 segundos** (Totalmente estável, com zero vazamento de memória e sem engasgos de driver).
*   **Backend CPU (ComfyUI Alternativo):** ~120 s por renderização usando o barramento de memória quad-channel do Xeon Haswell.

### 3. Teste Limite: FLUX.1 Schnell Híbrido (12B Parameters)
*   **Configuração de Memória:** 3-bit Quantization (Q3_K_S) carregado no buffer de VRAM de 8GB, complementado com offloading parcial de pesos em matrizes físicas de memória RAM do sistema (Xeon ECC RDIMM).
*   **Resultado:** Geração bem sucedida em tempo estendido sem gerar tela preta ou estouro catastrófico de memória (OutOfMemory - OOM).

---

## 🛠️ Scripts Úteis de Diagnóstico (Inclusos na Pasta `/public`)

O repositório inclui duas ferramentas automatizadas de diagnóstico rápido de ambiente para os usuários determinarem instantaneamente se o suporte Vulkan está funcional em suas placas Polaris:

1.  **`vulkan-diagnostic.sh` (Para Linux / WSL2):** Valida a presença de ICDs Vulkan da AMD e testa a disponibilidade da GPU para runtimes C++.
2.  **`vulkan-diagnostic.bat` (Para Windows CMD):** Verifica as variáveis de sistema e drivers Radeon ativos do fabricante para garantir compatibilidade reativa com o LLM Server.

*Ambos os scripts podem ser baixados individualmente pelos usuários diretamente a partir do painel web hospedado.*

---

## 🛡️ Segurança: Como Evitar Commits de Arquivos Pessoais e Chaves

Ao manter um portfólio limpo e profissional no GitHub, é crucial **não commitar arquivos pessoais**, backups de deploy, arquivos `.env`, chaves de API secretas ou arquivos com logs locais de VRAM.

Aqui está a configuração de segurança recomendada e automática para o seu arquivo `.gitignore`:

### 📥 Configuração Recomendada do `.gitignore`
Para garantir que apenas os arquivos públicos de código-fonte de desenvolvimento sejam commitados, certifique-se de que o seu arquivo `.gitignore` na raiz do projeto contenha as seguintes linhas:

```gitignore
# Dependências do NodeJS
node_modules/
.pnpm-store/

# Arquivos de Build e Distribuição Estática
dist/
build/
.next/
out/

# Dados Locais e Chaves Privadas (Extremamente Importante)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
*.config.json
firebase-applet-config.json
firebase-blueprint.json

# Arquivos de Configuração do Firebase e CLI local
.firebase/
.firebaserc
firestore.rules

# Backups e arquivos de compactação locais do desenvolvedor
*.zip
*.tar.gz
*.rar
backup/
*.log

# Arquivos temporários do Sistema Operacional e Editores
.DS_Store
Thumbs.db
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.swp
```

### Como aplicar de forma limpa antes do seu próximo Commit:
Se você já adicionou acidentalmente algum arquivo restrito ao rastreamento do Git por engano, você pode removê-lo do histórico sem deletá-lo do seu computador executando:

```bash
# Remove o cache de rastreamento de tudo (não deleta os arquivos físicos)
git rm -r --cached .

# Adiciona novamente aplicando as regras atualizadas do seu .gitignore
git add .

# Crie um commit com o repositório limpo
git commit -m "chore: limpar cache de rastreamento e aplicar regras de segurança no gitignore"

# Faça o push de forma limpa para o seu GitHub
git push origin main
```

---

*AIVisionsLab 2026 — Preservação ambiental promovida por engenharia de software inteligente.*
