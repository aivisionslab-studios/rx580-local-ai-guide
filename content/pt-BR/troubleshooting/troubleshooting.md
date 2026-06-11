---
id: "troubleshooting"
title: "24. GUIA DE RESOLUÇÃO DE PROBLEMAS (TROUBLESHOOTING)"
description: "Diagnósticos rápidos para contornar falhas de timeout de API e sementes nulas no servidor."
category: "troubleshooting"
lang: "pt-BR"
---

<div class="err">
    <div class="err-t">Sintoma Crítico: generate_image returned no results / Terminal congelado</div>
    <p><strong>Causa Identificada:</strong> O servidor <code>sd-server.exe</code> apresenta um bug de estouro numérico intermitente ao processar gerações enviadas com a semente configurada em modo randômico (Seed: -1).</p>
    <p><strong>Ação Corretiva:</strong> Dentro da interface do OpenWebUI, desative a chave de semente dinâmica nas opções avançadas do prompt e force um valor numérico inteiro fixo e válido (Exemplo: <code>42</code>, <code>1337</code>).</p>
  </div>
