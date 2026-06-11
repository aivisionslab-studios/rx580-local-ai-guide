# 🔬 AIVisionsLab — Local AI on Legacy Hardware (AMD RX 580 & Xeon)
> **Breaking programmed obsolescence through low-level APIs and open-source models.**

[![Website Status](https://img.shields.io/website?down_message=offline&label=AIVisionsLab&up_message=online&url=https%3A%2F%2Fsetup-ia-local-rx580-vulkan.web.app%2F)](https://setup-ia-local-rx580-vulkan.web.app/)
[![Vulkan Support](https://img.shields.io/badge/Vulkan_Acceleration-Active_%5BOK%5D-brightgreen?logo=vulkan&logoColor=white)](https://setup-ia-local-rx580-vulkan.web.app/)
[![Stable Diffusion](https://img.shields.io/badge/Stable_Diffusion-SD1.5_%5B72s%5D-blue?logo=stability&logoColor=white)](https://setup-ia-local-rx580-vulkan.web.app/)
[![Local LLM](https://img.shields.io/badge/Llama_3_8B-16_Tk%2Fs-orange?logo=ollama&logoColor=white)](https://setup-ia-local-rx580-vulkan.web.app/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Este é o repositório principal do **AIVisionsLab**, abrigando o kit de sobrevivência técnica, benchmarks ultra-otimizados e documentações de engenharia para rodar Modelos de Linguagem (LLMs) e Redes de Difusão Estáveis nativamente na lendária **AMD Radeon RX 580 8GB (arquitetura Polaris)** e processadores **Intel Xeon Haswell (v3/v4)**.

---

## 🗺️ Guia de Canonicalization & Distribuição de Autoridade (SEO)
Para evitar "conteúdo duplicado" e garantir que todos os cliques e autoridade (PageRank) fluam 100% para o seu hub central (**https://setup-ia-local-rx580-vulkan.web.app/**) ao compartilhar artigos nas redes de divulgação, use as regras abaixo ao criar novos posts:

### 1. 🪶 Dev.to
O Dev.to lê a tag canonical diretamente do cabeçalho YAML do artigo (Frontmatter).
Ao criar um novo post lá, basta incluir a chave `canonical_url` logo no início do editor de Markdown:

```yaml
---
title: "Como rodei Llama 3 e Stable Diffusion na RX 580 8GB de graça"
published: true
tags: amd, vulkan, localai, devops
canonical_url: "https://setup-ia-local-rx580-vulkan.web.app/"
cover_image: "https://setup-ia-local-rx580-vulkan.web.app/og-image.png"
---

Seu artigo começa aqui...
```

### 2. 🟢 Medium
No Medium, você tem duas formas de configurar o canonical:

*   **Método Automatizado (Recomendado):**
    Use a ferramenta de importação do Medium (Import Story) e insira a URL do seu site: `https://setup-ia-local-rx580-vulkan.web.app/`. O Medium importará o artigo com o canonical link configurado automaticamente para o seu site.
*   **Método Manual (Se você já criou o rascunho de forma nativa):**
    1. Abra o rascunho ou artigo publicado no Medium.
    2. Clique nos três pontinhos (`...`) no canto superior direito e vá em **Settings** (Configurações).
    3. Role até a aba **Advanced Settings** (Configurações Avançadas) e clique para expandir.
    4. Marque a caixa: **"This story was originally published elsewhere"** (Esta história foi publicada originalmente em outro lugar).
    5. Insira a URL exata do seu site correspondente a esse conteúdo e salve.

### 3. 📦 Hugging Face (Spaces / Models / Datasets README)
Nos READMEs do Hugging Face, você não pode definir uma tag HTML `<link rel="canonical" ...>` diretamente, mas pode otimizar a indexação inserindo metadados YAML no cabeçalho e apontando o repositório explicitamente para o seu site do Firebase:

```yaml
---
title: "RX 580 Vulkan Local AI Toolkit"
emoji: "🔬"
colorFrom: "purple"
colorTo: "blue"
sdk: "static"
pinned: false
app_port: 3000
tags: [amd-polaris, vulkan, stable-diffusion, llm, local-ai]
short_description: "Run local AI on 2017 AMD Radeon GPUs with zero cloud budget"
---

# 🚀 RX 580 & Legacy HW Local AI Guide
> Este repositório é um espelho técnico. O guia interativo em tempo real, fóruns de debate e simuladores estão hospedados no link canônico oficial:
> 🔗 **Visite o Guia Oficial do Laboratório:** [setup-ia-local-rx580-vulkan.web.app](https://setup-ia-local-rx580-vulkan.web.app/)
```

### 4. 💻 GitHub (README do Repositório)
O GitHub é altamente indexado pelo Google. Defina um link limpo e direto nas seguintes áreas de destaque:
1.  **About da Homepage (Canto Superior Direito):** Insira a URL `https://setup-ia-local-rx580-vulkan.web.app/` no campo "Website".
2.  **No início do README.md:** Use uma barra de navegação/redirecionamento com o respectivo Badge Canonical.
    Exemplo:
    ```markdown
    <div align="center">
      <h3>🔬 Este repositório é parte do ecossistema AIVisionsLab</h3>
      <p>A versão canônica principal desta documentação, fóruns de debate e simuladores de renderização encontram-se em:</p>
      <a href="https://setup-ia-local-rx580-vulkan.web.app/">
        <img src="https://img.shields.io/badge/Canonical_Source-setup--ia--local--rx580--vulkan.web.app-blueviolet?style=for-the-badge&logo=google-cloud" alt="Canonical Source" />
      </a>
    </div>
    ```

### 5. ⚡ Forums (TechPowerUp, Reddit, etc.)
Em fóruns baseados em BBCode ou editores visuais rústicos, o SEO é beneficiado pela linkagem direta de alta relevância (Ancoragem de Texto). Sempre insira o link de âncora usando as palavras-chave principais do seu projeto:

*   **No Reddit (Markdown):**
    ```markdown
    Para os passos de compilação detalhados do llama.cpp e as correções do DirectML, consulte o site do [AIVisionsLab - Guia IA Local na RX 580](https://setup-ia-local-rx580-vulkan.web.app/).
    ```
*   **No TechPowerUp (BBCode):**
    ```bbcode
    Para ver a tabela completa de benchmarks do Xeon + RX 580 rodando SD 1.5 via Vulkan, acesse o guia oficial: [url=https://setup-ia-local-rx580-vulkan.web.app/]AIVisionsLab — Guia de IA Local de Baixo Custo[/url].
    ```

---

## 🏃 Como Rodar Este Projeto Localmente (Desenvolvimento)

Este projeto foi construído usando **React + TypeScript + Vite** integrado com o **Tailwind CSS v4** e **Firebase/Firestore** para o painel de debates e feedbacks da comunidade de hardware.

### Passos de Execução:

1.  **Instale os pacotes necessários:**
    ```bash
    npm install
    ```
2.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
3.  **Compile para produção:**
    ```bash
    npm run build
    ```

---

## 🛡️ Scripts de Diagnóstico Rápido de Ambiente (Vulkan)
Disponibilizamos scripts automatizados na pasta raiz do projeto para que os usuários possam testar instantaneamente se suas placas RX 580 / Polaris estão com suporte Vulkan ativado pelo driver nativo.

*   **Para Linux/WSL2:** `./vulkan-diagnostic.sh`
*   **Para Windows (CMD):** `vulkan-diagnostic.bat`

---

*AIVisionsLab 2026 — Democratizando a inteligência artificial local com engenharia de guerrilha.*
