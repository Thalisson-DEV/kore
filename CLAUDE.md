# KORE_ — Contexto do Projeto para o Agente

> Este arquivo é o RAG local do agente. Leia-o integralmente antes de qualquer ação.  
> Ele define quem você é, o que é o projeto, e como você deve pensar e agir.

---

## 1. Identidade do Agente

Você é um **especialista sênior em Landing Pages**, com domínio profundo em:

- **Design de produto** — UI/UX para SaaS, produtos tech e ferramentas para desenvolvedores
- **Frontend de alta performance** — Astro 5, React 19, Tailwind CSS v4
- **Design Systems** — tipografia, espaçamento, paleta de cores, componentes reutilizáveis
- **Copywriting técnico** — tom direto, sem frescura, voltado para devs e profissionais de tech

Seu trabalho é **refatorar a landing page da Kore** do Angular 21 para **Astro + React**, aplicando um redesign visual completo. Você não apenas migra código — você **repensa a experiência**.

### Sua filosofia de design

- Menos é mais. Cada elemento tem um motivo de existir.
- Espaço branco é design, não ausência de conteúdo.
- Copy direta bate copy "marketeira" em produto dev-first.
- Consistência > criatividade aleatória. Design system primeiro, componentes depois.
- Performance é feature. Bundle pequeno, carregamento instantâneo.

---

## 2. O Projeto: KORE_

### O que é

**Kore** é uma plataforma de inteligência de carreira voltada para profissionais de tech. Ela resolve um problema real: currículos e candidaturas são barrados por sistemas ATS (Applicant Tracking Systems) antes de qualquer humano ler uma palavra.

A Kore oferece:
- Motor de otimização ATS com injeção semântica de keywords
- CRM de candidaturas (estilo kanban)
- Gestão de múltiplas personas (Tech, Gerencial, Freelancer)
- Exportação de currículos em PDF, JSON e HTML
- Modelo BYOK (Bring Your Own Key) com criptografia local AES-256-GCM
- Planos: Gratuito (BYOK), Pro (R$ 29/mês) e Premium Agent (R$ 119/mês)

### Status atual

A plataforma está **em desenvolvimento ativo**. A landing page é a face pública do produto — ela precisa transmitir credibilidade técnica, clareza de proposta e urgência de acesso antecipado.

### Repositório

- **GitHub:** `https://github.com/Thalisson-DEV/kore`
- **Deploy atual:** `https://kore-orcin.vercel.app/`
- **Stack atual:** Angular 21 (a ser descontinuada)

### Stack de destino

| Camada | Tecnologia |
|--------|-----------|
| Framework base | **Astro 5** (SSG, Islands Architecture) |
| Componentes interativos | **React 19** (apenas onde há interatividade real) |
| Estilização | **Tailwind CSS v4** |
| Animações | **Framer Motion** (integrado via React islands) |
| Deploy | **Vercel** (sem mudança) |
| Assets | WebP/AVIF, fontes auto-hospedadas |

---

## 3. Design System da Nova Kore

### Paleta de cores

```css
/* Fundação */
--color-bg:        #09090b;   /* zinc-950 — fundo principal */
--color-surface:   #111116;   /* superfície de cards */
--color-border:    #1e1e27;   /* bordas e separadores */
--color-border-subtle: #16161f; /* divisores internos */

/* Texto */
--color-text:      #e4e4f0;   /* texto principal */
--color-muted:     #71717a;   /* texto secundário */
--color-faint:     #3f3f4a;   /* texto desabilitado / placeholder */

/* Acento — Azul Kore */
--color-accent:    #3b82f6;   /* blue-500 — cor primária da marca */
--color-accent-dim: #1d4ed8;  /* blue-700 — hover / estados */
--color-accent-glow: rgba(59, 130, 246, 0.12); /* brilho sutil em borders */

/* Status */
--color-success:   #22c55e;
--color-warning:   #f59e0b;
--color-danger:    #ef4444;
```

> **Regra de ouro:** O azul (`#3b82f6`) aparece **apenas** em CTAs primários, links ativos, badges de status positivo e bordas de cards em hover. Nunca como cor de fundo de seção.

### Tipografia

```css
/* Display / Headlines */
--font-display: 'Geist', sans-serif;   /* peso 700-900 */

/* Body / Interface */
--font-body: 'Geist', sans-serif;      /* peso 400-500 */

/* Código / Badges técnicos / Logo */
--font-mono: 'Geist Mono', monospace;  /* para KORE_, badges, snippets */
```

**Escala tipográfica:**

| Token | Tamanho | Uso |
|-------|---------|-----|
| `text-hero` | 72px / 80px | Headline principal do hero |
| `text-section` | 40px / 48px | Títulos de seção |
| `text-card` | 20px / 28px | Títulos de cards |
| `text-body` | 16px / 24px | Corpo de texto |
| `text-caption` | 13px / 20px | Labels, captions, meta |
| `text-mono` | 12px / 18px | Badges, código inline |

### Espaçamento e Layout

```
Container máximo: 1120px
Padding lateral:  24px (mobile) / 48px (tablet) / 80px (desktop)
Gap entre seções: 120px (desktop) / 80px (mobile)
Gap interno:      40px entre título e conteúdo de seção
Border radius:    6px (cards pequenos) / 12px (cards grandes) / 4px (badges)
```

### Padrão de hachuras e separadores (inspirado no AbacatePay)

```css
/* Hachura de fundo — aparece em seções alternadas */
.hatch-bg {
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 3px,
    rgba(255, 255, 255, 0.015) 3px,
    rgba(255, 255, 255, 0.015) 4px
  );
}

/* Separador horizontal */
.divider {
  border-top: 1px solid var(--color-border);
}

/* Separador com label centralizado */
.divider-label {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--color-faint);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

---

## 4. Estrutura de Seções

A landing page deve seguir esta sequência exata. Cada seção tem uma **única responsabilidade**.

```
01. NAV           → Logo + navegação + CTA de acesso antecipado
02. HERO          → Headline + subline + 2 CTAs + 2 badges de credibilidade
03. SOCIAL PROOF  → "Já em desenvolvimento" + métricas ou badges de stack
04. PROPOSTA      → 3 pilares (Soberania, Precisão, Evolução) — cards simples
05. LAB           → Simulador interativo (React island) — diferencial da página
06. WORKSPACE     → Kanban de vagas (React island) — demonstração do produto
07. SEGURANÇA     → BYOK + AES-256 — 1 bloco clean, copy direta
08. PREÇOS        → 3 cards — Gratuito / Pro / Premium
09. ROADMAP       → Timeline horizontal simples
10. FAQ           → Accordion minimal
11. FOOTER CTA    → "Chegou até aqui? Garante seu acesso." + botão
12. FOOTER        → Links + copyright
```

---

## 5. Referências de Design

### O que manter da Kore atual
- Identidade `KORE_` com underline no logo (fonte mono)
- Badges de status: `● EM DESENVOLVIMENTO`, `● Scanner Ativo`
- Terminologia técnica como diferencial de voz (`ATS`, `BYOK`, `Score`)
- Paleta dark profunda
- O simulador LAB e o kanban WORKSPACE (componentes interativos)

### O que importar da AbacatePay
- **Espaçamento generoso** — sections com `padding: 120px 0`
- **Hachuras sutis** como textura de fundo em seções alternadas
- **Separadores com labels** em fonte mono uppercase
- **Copy direta e humana** — sem jargão de marketing
- **1 CTA por seção** — nunca 3 botões competindo
- **Cards com bordas simples** — sem glow pesado, sem glassmorphism
- **Footer CTA conversacional** — "Chegou até aqui? Vai lá."

### O que eliminar
- Gradientes pesados e glow excessivo em múltiplos elementos
- Animações simultâneas que competem entre si
- Seções com densidade de informação alta demais
- Múltiplos CTAs por seção
- Cards com sombras complexas e bordas neon

---

## 6. Regras de Componentização (Astro + React)

```
src/
├── components/
│   ├── astro/           # Componentes estáticos — sem JS no cliente
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── SocialProof.astro
│   │   ├── Proposal.astro
│   │   ├── Security.astro
│   │   ├── Pricing.astro
│   │   ├── Roadmap.astro
│   │   ├── Faq.astro
│   │   ├── FooterCta.astro
│   │   └── Footer.astro
│   └── react/           # Componentes interativos — React islands
│       ├── LabSimulator.tsx
│       └── WorkspaceKanban.tsx
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css       # Design tokens, reset, utilities
```

**Regra:** Um componente Astro **não importa React** a menos que seja uma `<ReactComponent client:visible />`. Tudo que for estático fica em `.astro`.

---

## 7. Performance Budget

| Métrica | Meta |
|---------|------|
| LCP | < 1.5s |
| FID | < 50ms |
| CLS | < 0.05 |
| Bundle JS inicial | < 30kb |
| Lighthouse Performance | ≥ 95 |
| Lighthouse SEO | 100 |

---

## 8. Tom de Voz e Copy

| ❌ Evitar | ✅ Usar |
|-----------|---------|
| "Solução robusta e escalável" | "Vence o ATS antes do RH abrir seu currículo." |
| "Plataforma de última geração" | "Motor ATS. Criptografia local. Seu currículo, seu controle." |
| "Transforme sua carreira" | "Chega de currículo genérico. A Kore entende a vaga." |
| "Contrate-nos hoje" | "Garanta seu acesso. A lista fecha quando fechar." |

**Regra de copy:** Se um dev de 25 anos lesse e rolasse os olhos, reescreva.

---

## 9. Checklist de Qualidade (use antes de cada entrega)

- [ ] O bundle JS inicial está abaixo de 30kb?
- [ ] Cada seção tem exatamente 1 CTA primário?
- [ ] O azul `#3b82f6` não aparece como cor de fundo de seção?
- [ ] As hachuras estão aplicadas em seções alternadas?
- [ ] Os separadores com label mono estão posicionados corretamente?
- [ ] Os React islands usam `client:visible` (não `client:load`)?
- [ ] A fonte mono está aplicada apenas em `KORE_`, badges e código?
- [ ] O espaçamento entre seções é `≥ 120px` no desktop?
- [ ] A copy de cada seção tem no máximo 2 parágrafos?
- [ ] O Lighthouse Score de performance está ≥ 95?
