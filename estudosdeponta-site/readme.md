# Landing Page INSS — pronta para Netlify

Site estático (HTML + CSS + JS), sem build e sem dependências.

## Antes de publicar

1. **Checkout:** abra `script.js` e preencha:
   - `checkoutBasic`
   - `checkoutPro`
   - `checkoutFlash`
2. **Áudio:** coloque seu arquivo MP3 em `assets/storytelling.mp3`.
3. **Valores riscados:** no `index.html`, confirme/ajuste os preços de referência antes da publicação.
4. **Textos legais:** revise a garantia conforme a política real da sua plataforma de pagamento.

## Como subir no Netlify

### Opção simples
Arraste a pasta inteira para **Netlify Drop**.

### ZIP
Extraia o ZIP e envie a pasta. O `index.html` já está na raiz.

## Funcionalidades incluídas
- Quiz de 5 perguntas antes da landing page
- Resultado personalizado conforme a dificuldade marcada no quiz
- 6 seções de landing page responsiva
- Kit Basic e Kit Pro
- Upsell de R$24,90 ao clicar no Basic
- Contagem de 9 minutos por sessão
- Barra de oferta durante a contagem
- Exit intent no desktop
- Fallback de exit offer no mobile
- Garantia de 7 dias destacada
- Player de áudio customizado
- Layout mobile-first e imagens WebP otimizadas

## Observação sobre a contagem
A contagem é iniciada quando a oferta especial é exibida e expira de fato naquela sessão. Recarregar a página durante a mesma sessão não reinicia o prazo.

## Atualização do funil de diagnóstico
- Tipografia unificada: Sora nos títulos e Open Sans nos textos.
- Quiz reposicionado como diagnóstico de estudos.
- Pergunta de intenção de investimento adicionada.
- Resultado do diagnóstico agora exibe Kit Basic e Kit Pro com compra direta.
- Kit Pro marcado como RECOMENDADO também na landing page.
