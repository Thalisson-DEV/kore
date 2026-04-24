# KORE_ — Plano de Ação: Refatoração da Landing Page

> **Objetivo:** Migrar a landing page do Angular 21 para Astro 5 + React 19,  
> aplicando redesign visual inspirado no AbacatePay — minimalista, espaçado,  
> com hachuras e separadores claros — mantendo a identidade técnica da Kore  
> e a cor azul `#3b82f6` como acento primário.
>
> **Referência de contexto:** `gemini.md`  
> **Repositório:** `https://github.com/Thalisson-DEV/kore`

---

## Visão Geral das Fases

```
FASE 0 → Setup e Design Tokens         (~1h)
FASE 1 → Componentes Estáticos         (~3h)
FASE 2 → React Islands Interativos     (~2h)
FASE 3 → Polimento Visual              (~2h)
FASE 4 → Performance e SEO             (~1h)
FASE 5 → Deploy e Validação Final      (~30min)
```

---

## FASE 0 — Setup do Projeto

**Objetivo:** Projeto Astro configurado, dependências instaladas, design tokens no lugar.

### Tarefas

- [ ] **0.1** Inicializar projeto Astro 5 com template minimal
  ```bash
  npm create astro@latest kore-landing -- --template minimal --typescript strict
  ```

- [ ] **0.2** Instalar dependências
  ```bash
  npm install @astrojs/react @astrojs/tailwind tailwindcss framer-motion
  npm install react react-dom
  npm install -D @types/react @types/react-dom
  ```

- [ ] **0.3** Configurar `astro.config.mjs`
  ```js
  integrations: [react(), tailwind()]
  output: 'static'
  ```

- [ ] **0.4** Criar `src/styles/global.css` com todos os design tokens do `gemini.md`
  - Paleta completa de cores como CSS variables
  - Escala tipográfica
  - Utilitários de hachura (`.hatch-bg`)
  - Utilitários de separador (`.divider`, `.divider-label`)

- [ ] **0.5** Configurar `tailwind.config` com os tokens customizados
  - Mapear `colors.accent`, `colors.surface`, `colors.border` etc.
  - Adicionar `fontFamily.mono` com Geist Mono

- [ ] **0.6** Criar estrutura de pastas conforme `gemini.md`
  ```
  src/components/astro/
  src/components/react/
  src/layouts/
  src/pages/
  src/styles/
  ```

- [ ] **0.7** Configurar `BaseLayout.astro` com:
  - Meta tags SEO (title, description, og:image)
  - Preload das fontes Geist e Geist Mono
  - Import do `global.css`
  - Viewport e charset

### ✅ Critério de validação da Fase 0

```
□ `npm run dev` sobe sem erros
□ Página em branco renderiza em http://localhost:4321
□ CSS variables visíveis no DevTools (--color-bg, --color-accent etc.)
□ Geist e Geist Mono carregando no Network tab
□ TypeScript sem erros em `npx astro check`
```

---

## FASE 1 — Componentes Estáticos (Astro)

**Objetivo:** Todas as seções sem interatividade implementadas como componentes `.astro` puros — zero JS enviado ao cliente.

> Trabalhe de cima para baixo. Cada componente é independente.

---

### 1.1 — `Nav.astro`

**Referência visual:** Nav do AbacatePay — limpo, sem frescura.

- [ ] Logo `KORE_` em Geist Mono, peso 700
- [ ] Links: Propósito · Lab · Preços · Roadmap
- [ ] CTA "Acesso Antecipado" — botão outline azul
- [ ] Background `bg-[--color-bg]/90` com backdrop-blur em scroll
- [ ] Sticky no topo

**✅ Validação 1.1**
```
□ Nav aparece corretamente em mobile (hamburger ou links compactos)
□ Sticky funciona ao scrollar
□ CTA visível e clicável
□ Nenhum JS emitido por este componente (verificar Network tab)
```

---

### 1.2 — `Hero.astro`

**Referência visual:** Hero do AbacatePay — headline grande, subline curta, 2 CTAs, badges abaixo.

- [ ] Label topo: `KORE_ · ACESSO ANTECIPADO` em mono uppercase com badge `●`
- [ ] Headline: `Domine a base. Alcance o topo.` — tamanho `text-hero` (72px+)
- [ ] Subline: máximo 2 linhas, tom direto
- [ ] CTA primário: "Começar Agora" — azul sólido
- [ ] CTA secundário: "Ver o Lab" — outline/ghost
- [ ] 2 badges abaixo dos CTAs: `Criptografia E2E` · `Motor ATS Nativo`
- [ ] Hachura sutil no fundo do hero
- [ ] Separador com label mono na base: `── PROPÓSITO ──`

**✅ Validação 1.2**
```
□ Headline legível em mobile (min 36px)
□ CTAs com espaçamento correto entre si
□ Badges alinhados e com cor correta
□ Hachura visível mas não intrusiva
□ Separador posicionado antes da próxima seção
```

---

### 1.3 — `Proposal.astro`

3 pilares da proposta em cards limpos.

- [ ] Separador com label: `── PROPÓSITO ──`
- [ ] Título de seção: "Além de um currículo. Uma infraestrutura."
- [ ] Grid 3 colunas (desktop) / 1 coluna (mobile)
- [ ] Cada card: ícone + número + título + 1 parágrafo
  - `01` Soberania & Privacidade
  - `02` Precisão Algorítmica
  - `03` Evolução Técnica
- [ ] Cards com borda `1px solid --color-border`, sem glow
- [ ] Background alternado: seção com `hatch-bg`

**✅ Validação 1.3**
```
□ Grid responsivo funciona em 320px, 768px, 1280px
□ Cards sem overflow de texto
□ Hachura aplicada corretamente no fundo da seção
□ Números em mono, alinhados ao topo do card
```

---

### 1.4 — `Security.astro`

Seção de segurança — 1 bloco, copy direta, sem exagero.

- [ ] Separador com label: `── SEGURANÇA ──`
- [ ] Título: "Seu cofre. Seu controle."
- [ ] 2 colunas: copy à esquerda + lista de features à direita
- [ ] Features: `Criptografia Local-first (AES-256-GCM)` · `Zero retenção de chaves em nuvem` · `Modelo BYOK`
- [ ] Badge de status: `Secure_Core_V2` em mono
- [ ] Sem animações, sem glow — apenas tipografia e espaço

**✅ Validação 1.4**
```
□ Layout 2 colunas colapsa para 1 no mobile
□ Badge mono visível e alinhado
□ Copy cabe sem quebras estranhas em 320px
```

---

### 1.5 — `Pricing.astro`

3 cards de preço — limpos, hierarquia clara.

- [ ] Separador com label: `── PREÇOS ──`
- [ ] Título: "Planos Disponíveis"
- [ ] 3 cards em grid:
  - **Gratuito (BYOK):** R$ 0/sempre · badge `EM DESENVOLVIMENTO`
  - **Kore Pro:** R$ 29/mês · badge `RECOMENDADO` em azul · CTA "Garantir Acesso"
  - **Premium Agent:** R$ 119/mês · badge `EM DESENVOLVIMENTO`
- [ ] Card Pro com borda azul `--color-accent` (único elemento destacado)
- [ ] Lista de features com ícone de check simples
- [ ] 1 CTA por card — sem duplicação

**✅ Validação 1.5**
```
□ Card Pro visualmente destacado (borda azul) sem ser excessivo
□ Badges de status corretos em cada card
□ CTAs desabilitados visualmente nos cards "EM DESENVOLVIMENTO"
□ Grid responsivo: 3 col → 1 col no mobile
```

---

### 1.6 — `Roadmap.astro`

Timeline simples, horizontal no desktop.

- [ ] Separador com label: `── ROADMAP ──`
- [ ] Título: "Evolução contínua."
- [ ] 4 etapas em linha horizontal com conector entre elas
  - Fase 1: Q2 2026 — Fundação Estratégica
  - Fase 2: Q3 2026 — Expansão de Recursos
  - Fase 3: 2027 — Sincronização de Rede
  - Marco: Referência no Setor
- [ ] Cada etapa: número + título + descrição curta
- [ ] Conector: linha `1px --color-border` entre etapas
- [ ] Colapsa para vertical no mobile

**✅ Validação 1.6**
```
□ Linha conectora visível no desktop
□ Layout vertical no mobile sem sobreposição
□ Datas em fonte mono, menores
```

---

### 1.7 — `Faq.astro`

Accordion puro CSS, sem JS.

- [ ] Separador com label: `── FAQ ──`
- [ ] Título: "Dúvidas? Respostas."
- [ ] Implementar com `<details>` + `<summary>` (sem JS)
- [ ] 5 perguntas do conteúdo original
- [ ] Animação de abertura via CSS `transition` em `max-height`
- [ ] Borda separando cada item

**✅ Validação 1.7**
```
□ Accordion funciona sem JavaScript (verificar com JS desabilitado no DevTools)
□ Apenas 1 item pode estar "aberto" visualmente? (Se sim, testar UX)
□ Texto não transborda em mobile
```

---

### 1.8 — `FooterCta.astro` + `Footer.astro`

- [ ] **FooterCta:** seção com fundo levemente diferente, hachura, copy conversacional + 1 CTA
  - Copy: "Chegou até aqui. Então garanta seu acesso."
  - CTA: "Garantir Acesso Antecipado" — azul sólido, tamanho grande
- [ ] **Footer:** 4 colunas de links + copyright + `Global_Status: Stable` em mono

**✅ Validação 1.8**
```
□ FooterCta se destaca visualmente da seção anterior
□ Footer links funcionando
□ Status em mono visível mas discreto
□ Copyright com ano correto
```

---

### ✅ Critério de validação da Fase 1 (completa)

```
□ Todos os componentes renderizam sem erros
□ Página completa visível em localhost sem React islands
□ Nenhum JS enviado ao cliente (verificar Network tab — JS deve ser 0kb)
□ Layout responsivo em 320px, 768px, 1280px, 1920px
□ Sem scroll horizontal em nenhuma resolução
□ Hachuras aplicadas em seções alternadas (não em todas)
□ Separadores com label mono entre TODAS as seções
□ Paleta de cores respeitando o design system (azul APENAS em CTAs e card Pro)
```

---

## FASE 2 — React Islands (Componentes Interativos)

**Objetivo:** Os 2 componentes interativos migrados do Angular para React, com `client:visible` para carregamento lazy.

---

### 2.1 — `LabSimulator.tsx`

Simulador do motor ATS — o diferencial da landing.

- [ ] Implementar como componente React com estado local (`useState`)
- [ ] Campo de input para URL da vaga
- [ ] Animação de "processamento" (progress bar, badges de status)
- [ ] Score de compatibilidade (0–100) com animação de contagem
- [ ] Badges: `● Scanner Ativo` · `● Aplicando Vetores Semânticos`
- [ ] Tags animadas: `+Angular Signals` · `+JIT Decryption` · `+Tech-Mineral UI`
- [ ] Usar Framer Motion para as animações de entrada dos badges
- [ ] Inserir no `index.astro` com `client:visible`

```astro
<!-- Em index.astro -->
<LabSimulator client:visible />
```

**✅ Validação 2.1**
```
□ Componente carrega APENAS quando visível na viewport (verificar Network tab)
□ Animações fluidas (sem jank) em 60fps
□ Estado reseta corretamente ao limpar o input
□ Funciona sem conexão com backend (é apenas visual/demo)
□ Acessível via teclado
```

---

### 2.2 — `WorkspaceKanban.tsx`

CRM de candidaturas — demonstração drag-and-drop.

- [ ] 3 colunas: `inbox` · `optimized` · `interview`
- [ ] Cards de vaga com: empresa · cargo · stack tags · faixa salarial
- [ ] Drag-and-drop entre colunas (usar `@dnd-kit/core` ou implementação simples)
- [ ] Cards com hover state sutil
- [ ] Cores de tag mapeadas por tecnologia
- [ ] Inserir no `index.astro` com `client:visible`

```bash
npm install @dnd-kit/core @dnd-kit/sortable
```

**✅ Validação 2.2**
```
□ Drag-and-drop funciona em desktop (mouse)
□ Drag-and-drop funciona em mobile (touch)
□ Cards não somem durante o drag
□ Colunas não quebram layout ao receber/perder cards
□ Componente carrega apenas quando visível
```

---

### ✅ Critério de validação da Fase 2 (completa)

```
□ Bundle JS total da página < 80kb (gzipped) — islands incluídas
□ Ambos os islands carregam com client:visible (lazy)
□ Página carrega e é interativa estaticamente ANTES dos islands hydratarem
□ Nenhum erro no Console ao interagir com os componentes
□ Framer Motion não adiciona mais de 30kb ao bundle
```

---

## FASE 3 — Polimento Visual

**Objetivo:** Refinar detalhes que separam "funciona" de "impressiona".

- [ ] **3.1** Revisar espaçamento de todas as seções — padding deve ser `≥ 120px` vertical no desktop
- [ ] **3.2** Checar consistência de borda em todos os cards — `1px solid --color-border`
- [ ] **3.3** Verificar que o azul não aparece em lugar errado — apenas CTAs, card Pro, badges ativos
- [ ] **3.4** Adicionar fade-in on scroll em seções estáticas via `IntersectionObserver` (JS inline mínimo) ou CSS `@keyframes` com `animation-timeline: scroll()`
- [ ] **3.5** Revisar tipografia mobile — headlines não devem quebrar em palavras isoladas
- [ ] **3.6** Garantir que hachuras estão em seções alternadas (não em todas)
- [ ] **3.7** Testar o contraste de todas as combinações texto/fundo (WCAG AA mínimo)
- [ ] **3.8** Adicionar `cursor: default` customizado se desejado (opcional)
- [ ] **3.9** Verificar animação do Nav (background aparece ao scrollar)
- [ ] **3.10** Revisar copy de todos os CTAs — tom direto, sem jargão

**✅ Critério de validação da Fase 3**
```
□ Screenshot comparativo da Fase 1 vs Fase 3 mostra melhora visível
□ Nenhuma seção com espaçamento < 80px vertical em mobile
□ Nenhum elemento com contraste WCAG abaixo de 4.5:1
□ Animações de entrada visíveis mas não distrativas
□ Hachuras presentes em 3–4 seções (não em todas)
```

---

## FASE 4 — Performance e SEO

**Objetivo:** Lighthouse ≥ 95 em Performance e 100 em SEO.

- [ ] **4.1** Rodar `npx astro build` e verificar output sem erros
- [ ] **4.2** Auditar bundle com `npx vite-bundle-visualizer` ou similar
- [ ] **4.3** Garantir que todas as imagens estão em WebP/AVIF com `width` e `height` definidos
- [ ] **4.4** Adicionar `loading="lazy"` em imagens abaixo da fold
- [ ] **4.5** Configurar meta tags completas no `BaseLayout.astro`:
  - `title`, `description`, `og:title`, `og:description`, `og:image`
  - `twitter:card`, `twitter:title`, `twitter:description`
  - `canonical` URL
- [ ] **4.6** Adicionar `robots.txt` e `sitemap.xml` (plugin `@astrojs/sitemap`)
- [ ] **4.7** Verificar que fontes têm `font-display: swap`
- [ ] **4.8** Rodar Lighthouse no Chrome DevTools e registrar scores
- [ ] **4.9** Testar com `npx pagespeed-insights` ou similar

**✅ Critério de validação da Fase 4**
```
□ Lighthouse Performance ≥ 95
□ Lighthouse SEO = 100
□ Lighthouse Accessibility ≥ 90
□ LCP < 1.5s (medido no Lighthouse)
□ CLS < 0.05
□ Sem imagens sem width/height
□ Sitemap acessível em /sitemap.xml
□ Robots.txt presente
```

---

## FASE 5 — Deploy e Validação Final

**Objetivo:** Landing page em produção no Vercel, funcionando corretamente.

- [ ] **5.1** Criar novo repositório `kore-landing` (ou branch `refactor/astro`) no GitHub
- [ ] **5.2** Push do código completo
- [ ] **5.3** Conectar ao Vercel (import do repositório)
- [ ] **5.4** Verificar build no Vercel (logs sem erro)
- [ ] **5.5** Testar a URL de preview do Vercel em:
  - Chrome desktop
  - Safari desktop
  - Chrome mobile (Android)
  - Safari mobile (iOS)
- [ ] **5.6** Verificar todos os links da nav e CTAs
- [ ] **5.7** Testar drag-and-drop do kanban em mobile (touch)
- [ ] **5.8** Rodar Lighthouse na URL de produção (não localhost)
- [ ] **5.9** Configurar domínio customizado se aplicável

**✅ Critério de validação da Fase 5 (DONE)**
```
□ Build no Vercel com status "Ready" (verde)
□ URL de produção acessível sem erros
□ Nenhum erro no Console em nenhum browser testado
□ Lighthouse na URL de produção ≥ 95 Performance
□ Todos os CTAs apontam para URLs corretas
□ Drag-and-drop funciona em touch (mobile)
□ Layout sem quebras em 320px (iPhone SE) e 1920px (desktop grande)
□ Fontes carregando corretamente (sem fallback visível)
```

---

## Resumo dos Critérios de Aceitação (DoD)

Para considerar a refatoração **concluída**, todos os itens abaixo devem estar marcados:

```
SETUP
□ Projeto Astro 5 + React 19 + Tailwind v4 configurado

DESIGN
□ Design system do gemini.md implementado (tokens, tipografia, espaçamento)
□ Hachuras em seções alternadas
□ Separadores com label mono entre seções
□ Azul #3b82f6 APENAS em CTAs, card Pro e badges ativos
□ Identidade KORE_ preservada (logo mono, badges técnicos, terminologia)

CONTEÚDO
□ Todas as 12 seções implementadas e com conteúdo correto
□ Copy revisada (tom direto, sem jargão de marketing)
□ 1 CTA primário por seção (sem duplicação)

INTERATIVIDADE
□ LabSimulator funcionando com animações
□ WorkspaceKanban com drag-and-drop (desktop + mobile)
□ Ambos os islands com client:visible (lazy hydration)

PERFORMANCE
□ Bundle JS inicial < 30kb
□ Lighthouse Performance ≥ 95
□ Lighthouse SEO = 100
□ LCP < 1.5s

DEPLOY
□ Build no Vercel sem erros
□ Testado em Chrome, Safari, mobile
□ URL de produção funcionando
```

---

*Última atualização: 2026-04-23*  
*Referência de design: `gemini.md`*  
*Repositório: `https://github.com/Thalisson-DEV/kore`*
