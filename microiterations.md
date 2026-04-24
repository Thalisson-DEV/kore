# KORE_ — Micro Iterações Interativas

> Catálogo de micro interações e efeitos visuais organizados por **grau de necessidade**  
> para uma landing page. Cada item tem: descrição, impacto, complexidade e implementação.
>
> Stack: **Astro 5 + React 19 + Framer Motion + Tailwind CSS v4**

---

## Como usar este documento

Cada micro iteração tem:
- 🎯 **Impacto** — o quanto muda a percepção visual/UX
- ⚙️ **Complexidade** — esforço de implementação (Baixa / Média / Alta)
- 📦 **Custo de bundle** — JS adicionado ao cliente
- 🏷️ **Onde aplicar** — seção(ões) da landing

---

## TIER 1 — Essencial
> *Sem isso a página parece inacabada. Implementar antes de qualquer outra coisa.*

---

### 1.1 — Fade-in on Scroll (Reveal de Seções)

**O que é:** Cada seção entra com um fade + translate sutil quando entra no viewport.

**Por que é essencial:** Sem isso, a página parece "dumped" — tudo já está lá, sem nenhuma sensação de descoberta. É o mínimo de vida que uma landing precisa.

🎯 Impacto: **Alto**  
⚙️ Complexidade: **Baixa**  
📦 Bundle: **0kb** (CSS puro)  
🏷️ Onde: Todas as seções

```css
/* global.css */
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-reveal].visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
/* IntersectionObserver inline no BaseLayout.astro — <script> tag */
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

```astro
<!-- Uso em qualquer componente .astro -->
<section data-reveal>
  <h2>Além de um currículo.</h2>
</section>
```

---

### 1.2 — Nav com Blur ao Scrollar

**O que é:** A navbar começa transparente e ao scrollar 50px ganha `backdrop-blur` + borda inferior sutil.

**Por que é essencial:** Dá profundidade à página e faz o nav parecer "nativo" — sem isso parece um template.

🎯 Impacto: **Alto**  
⚙️ Complexidade: **Baixa**  
📦 Bundle: **~0.2kb** (script inline)  
🏷️ Onde: `Nav.astro`

```astro
<nav id="nav" class="fixed top-0 w-full z-50 transition-all duration-300">
  <!-- conteúdo -->
</nav>

<script>
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 50);
  });
</script>
```

```css
.nav-scrolled {
  background: rgba(9, 9, 11, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}
```

---

### 1.3 — Hover State nos Cards com Borda Azul

**O que é:** Cards de proposta/preços que em hover elevam levemente e a borda fica azul (`--color-accent`).

**Por que é essencial:** É o mínimo de feedback visual para elementos clicáveis/importantes. Sem isso os cards parecem estáticos e sem vida.

🎯 Impacto: **Alto**  
⚙️ Complexidade: **Baixíssima**  
📦 Bundle: **0kb** (CSS puro)  
🏷️ Onde: Cards de proposta, preços, features

```css
.card {
  border: 1px solid var(--color-border);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}
```

---

### 1.4 — Staggered Reveal no Hero

**O que é:** Os elementos do hero (label → headline → subline → CTAs → badges) entram em sequência com delay crescente, como uma animação de typewriter visual.

**Por que é essencial:** O hero é a primeira coisa que o usuário vê. Uma entrada orquestrada cria impacto imediato e passa a sensação de produto polido.

🎯 Impacto: **Altíssimo**  
⚙️ Complexidade: **Baixa**  
📦 Bundle: **0kb** (CSS puro)  
🏷️ Onde: `Hero.astro`

```css
.hero-label   { animation: fadeUp 0.5s ease 0.1s both; }
.hero-title   { animation: fadeUp 0.6s ease 0.25s both; }
.hero-sub     { animation: fadeUp 0.5s ease 0.4s both; }
.hero-ctas    { animation: fadeUp 0.5s ease 0.55s both; }
.hero-badges  { animation: fadeUp 0.4s ease 0.7s both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

### 1.5 — CTA Button com Efeito Shimmer

**O que é:** O botão primário ("Começar Agora") tem um brilho que passa da esquerda pra direita em loop lento, como um reflexo de luz.

**Por que é essencial:** O CTA é o objetivo da landing. Ele precisa chamar atenção sem ser agressivo. O shimmer faz isso de forma elegante.

🎯 Impacto: **Alto**  
⚙️ Complexidade: **Baixa**  
📦 Bundle: **0kb** (CSS puro)  
🏷️ Onde: CTA primário em todas as seções

```css
.btn-primary {
  position: relative;
  overflow: hidden;
  background: var(--color-accent);
}

.btn-primary::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.12),
    transparent
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0%   { left: -100%; }
  100% { left: 200%; }
}
```

---

## TIER 2 — Muito Recomendado
> *Eleva a landing de "boa" para "memorável". Implementar após o Tier 1.*

---

### 2.1 — Cursor Personalizado (apenas desktop)

**O que é:** Um cursor circular pequeno (`12px`) na cor azul que segue o mouse com um leve delay (efeito lag suave). Em elementos clicáveis, expande para `28px`.

**Por que recomendado:** É um dos detalhes que devs notam imediatamente e associam a produto de qualidade. Alinha com a identidade técnica da Kore.

🎯 Impacto: **Alto** (para o público-alvo dev)  
⚙️ Complexidade: **Média**  
📦 Bundle: **~0.8kb** (script inline)  
🏷️ Onde: Global (desktop only — `@media (pointer: fine)`)

```astro
<!-- BaseLayout.astro -->
<div id="cursor"></div>

<style>
  #cursor {
    width: 10px; height: 10px;
    background: var(--color-accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease;
    mix-blend-mode: difference;
  }
  #cursor.hovering {
    width: 28px;
    height: 28px;
    background: rgba(59, 130, 246, 0.3);
    border: 1px solid var(--color-accent);
  }
  @media (pointer: coarse) { #cursor { display: none; } }
</style>

<script>
  const cursor = document.getElementById('cursor');
  let x = 0, y = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });

  const animate = () => {
    cx += (x - cx) * 0.15;
    cy += (y - cy) * 0.15;
    cursor.style.left = cx - 5 + 'px';
    cursor.style.top  = cy - 5 + 'px';
    requestAnimationFrame(animate);
  };
  animate();

  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
</script>
```

---

### 2.2 — Contador Animado nas Métricas

**O que é:** Números como "ATS Score: 94" ou "30k otimizações/mês" contam de 0 até o valor final quando entram no viewport.

**Por que recomendado:** Dá vida a dados estáticos. A animação de contagem chama atenção e reforça credibilidade dos números.

🎯 Impacto: **Médio-Alto**  
⚙️ Complexidade: **Baixa**  
📦 Bundle: **~0.5kb** (script inline)  
🏷️ Onde: Hero badges, seção de proposta, Lab

```astro
<span data-counter="94" data-suffix="%">0%</span>
```

```js
document.querySelectorAll('[data-counter]').forEach(el => {
  const target = +el.dataset.counter;
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.5 });

  observer.observe(el);
});
```

---

### 2.3 — Typing Effect no Label do Hero

**O que é:** O label `KORE_ · ACESSO ANTECIPADO` é digitado letra por letra quando a página carrega, como um terminal.

**Por que recomendado:** Reforça a identidade técnica/hacker da Kore de forma imediata — é a primeira coisa que o usuário lê e já comunica o tom do produto.

🎯 Impacto: **Alto** (para identidade de marca)  
⚙️ Complexidade: **Baixa**  
📦 Bundle: **~0.4kb** (script inline)  
🏷️ Onde: `Hero.astro` — label topo

```astro
<span id="hero-label" data-type="KORE_ · ACESSO ANTECIPADO"></span>
<span class="cursor-blink">|</span>
```

```css
.cursor-blink {
  color: var(--color-accent);
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

```js
const el = document.getElementById('hero-label');
const text = el.dataset.type;
let i = 0;
const type = () => {
  if (i < text.length) {
    el.textContent += text[i++];
    setTimeout(type, 55);
  }
};
setTimeout(type, 400); // delay inicial
```

---

### 2.4 — Gradient Mesh Animado no Hero Background

**O que é:** Dois ou três blobs de cor azul extremamente suaves e desfocados (`blur: 120px`) que se movem lentamente no fundo do hero, criando a sensação de ambiente vivo.

**Por que recomendado:** Elimina o fundo totalmente plano sem adicionar poluição visual. É o tipo de detalhe que as pessoas sentem mas não conseguem descrever.

🎯 Impacto: **Alto** (percepção de qualidade)  
⚙️ Complexidade: **Baixa**  
📦 Bundle: **0kb** (CSS puro)  
🏷️ Onde: `Hero.astro`

```css
.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.07;
  animation: float 12s ease-in-out infinite alternate;
}

.blob-1 {
  width: 500px; height: 500px;
  background: #3b82f6;
  top: -100px; left: -100px;
  animation-delay: 0s;
}

.blob-2 {
  width: 350px; height: 350px;
  background: #1d4ed8;
  top: 50px; right: -50px;
  animation-delay: -4s;
}

@keyframes float {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 40px) scale(1.1); }
}
```

---

### 2.5 — Tooltip nos Badges Técnicos

**O que é:** Ao passar o mouse em badges como `AES-256-GCM` ou `BYOK`, um tooltip aparece com 1 linha explicando o termo.

**Por que recomendado:** A Kore tem terminologia técnica densa. O tooltip educa sem poluir o layout — respeita devs avançados (que já sabem) e não deixa iniciantes perdidos.

🎯 Impacto: **Médio** (UX e confiança)  
⚙️ Complexidade: **Baixa**  
📦 Bundle: **0kb** (CSS puro com `[title]` ou `[data-tooltip]`)  
🏷️ Onde: Seção de segurança, badges do Lab

```css
[data-tooltip] {
  position: relative;
  cursor: help;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 12px;
  font-family: var(--font-mono);
  padding: 6px 10px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 10;
}

[data-tooltip]:hover::after {
  opacity: 1;
}
```

```html
<span data-tooltip="Criptografia simétrica com chave de 256 bits">AES-256-GCM</span>
<span data-tooltip="Você traz sua própria chave de API — nada fica nos nossos servidores">BYOK</span>
```

---

### 2.6 — Progress Bar de Scroll no Topo da Página

**O que é:** Uma linha azul de `2px` no topo da janela que cresce de 0% a 100% conforme o usuário scrolla a página.

**Por que recomendado:** Dá ao usuário senso de progresso em uma landing longa. É um detalhe sutil que comunica "essa página tem conteúdo, vale ler".

🎯 Impacto: **Médio**  
⚙️ Complexidade: **Baixíssima**  
📦 Bundle: **~0.2kb**  
🏷️ Onde: Global (`BaseLayout.astro`)

```astro
<div id="scroll-progress"></div>

<style>
  #scroll-progress {
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: var(--color-accent);
    z-index: 9999;
    width: 0%;
    transition: width 0.1s linear;
  }
</style>

<script>
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    bar.style.width = (scrollTop / (scrollHeight - clientHeight) * 100) + '%';
  });
</script>
```

---

## TIER 3 — Diferencial Criativo
> *Eleva a landing para o nível de "obra de arte". Implementar quando o Tier 1 e 2 estiverem perfeitos.*

---

### 3.1 — Kanban com Física de Drag (Spring Animation)

**O que é:** O drag-and-drop do Workspace usa animações com física de mola (spring) via Framer Motion — os cards "pousam" suavemente, outros cards se afastam com inércia ao passar o drag por cima deles.

**Por que diferencial:** A maioria dos kanbans web tem drag-and-drop robótico. Com spring physics, parece um app nativo de alta qualidade. É o tipo de detalhe que o usuário mostra pra outra pessoa.

🎯 Impacto: **Altíssimo** (memória e WOM)  
⚙️ Complexidade: **Alta**  
📦 Bundle: **+28kb** (Framer Motion — já incluso se usado em outro island)  
🏷️ Onde: `WorkspaceKanban.tsx`

```tsx
import { motion, AnimatePresence, Reorder } from 'framer-motion'

// Usar Reorder.Group e Reorder.Item do Framer Motion
// Configurar spring: { type: "spring", stiffness: 300, damping: 28 }
<Reorder.Group axis="y" values={items} onReorder={setItems}>
  <AnimatePresence>
    {items.map(item => (
      <Reorder.Item
        key={item.id}
        value={item}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <CardVaga {...item} />
      </Reorder.Item>
    ))}
  </AnimatePresence>
</Reorder.Group>
```

---

### 3.2 — ATS Score Counter em Tempo Real no Lab

**O que é:** No simulador Lab, enquanto o "processamento" ocorre, o score sobe de 0 para o resultado final com easing e um efeito de "oscilação" antes de fixar no número — como um medidor analógico se estabilizando.

**Por que diferencial:** Transforma um elemento estático em algo que parece um instrumento de medição real. Cria tensão e antecipação — o usuário fica esperando o número final.

🎯 Impacto: **Altíssimo** (engajamento)  
⚙️ Complexidade: **Média**  
📦 Bundle: **já incluso no island do Lab**  
🏷️ Onde: `LabSimulator.tsx`

```tsx
// Hook de animação com overshoot (oscila antes de fixar)
const useSpringCounter = (target: number, duration = 2000) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const startTime = performance.now()
    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      // Easing com overshoot: elastic-out
      const ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t) * Math.cos((t * 10 - 0.75) * (2 * Math.PI) / 3)
      setValue(Math.round(ease * target))
      if (t < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target])

  return value
}
```

---

### 3.3 — Grain Overlay na Página Inteira

**O que é:** Uma textura de ruído estático (`noise`) em `opacity: 0.03` sobreposta em toda a página via pseudo-elemento no `body`. Completamente invisível individualmente, mas muda a percepção total da tela de "digital flat" para "analógico premium".

**Por que diferencial:** É o segredo de muitos designs "de revista" que as pessoas acham sofisticados sem saber por quê. É um detalhe de 2 linhas de CSS com impacto desproporcional.

🎯 Impacto: **Alto** (percepção de qualidade — subliminar)  
⚙️ Complexidade: **Baixíssima**  
📦 Bundle: **0kb** (CSS puro + SVG inline)  
🏷️ Onde: Global (`BaseLayout.astro`)

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px;
}
```

---

### 3.4 — Seção de Preços com Toggle Mensal/Anual Animado

**O que é:** Um toggle switch entre "Mensal" e "Anual" na seção de preços. Ao alternar, os valores mudam com uma animação de slide (o número antigo sai para cima, o novo entra por baixo). O badge "Economize X%" aparece com spring animation.

**Por que diferencial:** Cria interatividade onde o usuário menos espera. Em uma landing page estática, qualquer elemento que responde ao clique surpreende positivamente.

🎯 Impacto: **Alto** (conversão + engajamento)  
⚙️ Complexidade: **Média**  
📦 Bundle: **já incluso (Framer Motion)**  
🏷️ Onde: `Pricing.astro` → transformar em `Pricing.tsx` com `client:visible`

```tsx
const [isAnnual, setIsAnnual] = useState(false)
const monthlyPrice = 29
const annualPrice = Math.round(monthlyPrice * 12 * 0.8 / 12) // 20% desconto

// AnimatePresence com mode="wait" para o número sair antes do novo entrar
<AnimatePresence mode="wait">
  <motion.span
    key={isAnnual ? 'annual' : 'monthly'}
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -10, opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    R$ {isAnnual ? annualPrice : monthlyPrice}
  </motion.span>
</AnimatePresence>
```

---

### 3.5 — Parallax Sutil nos Blobs do Hero

**O que é:** Os blobs de gradiente do fundo do hero se movem na velocidade de 30% do scroll — criando profundidade de camadas (como vidros em diferentes planos).

**Por que diferencial:** Adiciona dimensão sem usar 3D. O efeito é quase subliminar — o usuário não sabe por que a página parece mais "viva" que as outras.

🎯 Impacto: **Médio** (percepção de qualidade)  
⚙️ Complexidade: **Baixa**  
📦 Bundle: **~0.3kb** (script inline)  
🏷️ Onde: `Hero.astro` — somente desktop

```js
const blobs = document.querySelectorAll('.blob');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  blobs.forEach((blob, i) => {
    const speed = i % 2 === 0 ? 0.3 : 0.18;
    blob.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });
```

---

### 3.6 — "Easter Egg" de Terminal no Footer

**O que é:** No footer, em `Global_Status: Stable`, ao clicar abre um mini terminal inline que aceita 3 comandos fake (`kore --version`, `kore status`, `kore help`) com respostas em mono, simulando uma CLI real.

**Por que diferencial:** É o tipo de detalhe que um dev encontra, manda no Discord/X e vira marketing orgânico. Comunica "esse produto foi feito por devs de verdade".

🎯 Impacto: **Altíssimo** (virabilidade e identidade)  
⚙️ Complexidade: **Média**  
📦 Bundle: **já incluso (React island)**  
🏷️ Onde: `Footer.astro` → mini `TerminalEgg.tsx` com `client:visible`

```tsx
const commands: Record<string, string[]> = {
  'kore --version': ['KORE_ENGINE v2.0.1', 'Build: 20260423', 'Status: EM DESENVOLVIMENTO'],
  'kore status': ['● Motor ATS: Ativo', '● Criptografia: AES-256-GCM Online', '● Vagas Indexadas: 0 (aguardando launch)'],
  'kore help': ['Comandos disponíveis:', '  kore --version', '  kore status', '  kore help', '', 'Acesse kore.app para acesso antecipado.'],
}

// Input controlado, histórico de comandos, scroll automático para o fim
// Enter executa o comando, seta ↑ volta no histórico
```

---

## Resumo por Prioridade

| # | Micro iteração | Tier | Impacto | Complexidade | Bundle |
|---|---|---|---|---|---|
| 1.1 | Fade-in on Scroll | Essencial | ⬛⬛⬛⬛ | Baixa | 0kb |
| 1.2 | Nav Blur ao Scrollar | Essencial | ⬛⬛⬛⬛ | Baixa | 0kb |
| 1.3 | Hover com Borda Azul | Essencial | ⬛⬛⬛⬛ | Baixíssima | 0kb |
| 1.4 | Staggered Reveal Hero | Essencial | ⬛⬛⬛⬛⬛ | Baixa | 0kb |
| 1.5 | Shimmer no CTA | Essencial | ⬛⬛⬛⬛ | Baixa | 0kb |
| 2.1 | Cursor Personalizado | Recomendado | ⬛⬛⬛⬛ | Média | 0.8kb |
| 2.2 | Contador Animado | Recomendado | ⬛⬛⬛ | Baixa | 0.5kb |
| 2.3 | Typing Effect Label | Recomendado | ⬛⬛⬛⬛ | Baixa | 0.4kb |
| 2.4 | Gradient Mesh Hero | Recomendado | ⬛⬛⬛⬛ | Baixa | 0kb |
| 2.5 | Tooltips em Badges | Recomendado | ⬛⬛⬛ | Baixíssima | 0kb |
| 2.6 | Progress Bar Scroll | Recomendado | ⬛⬛ | Baixíssima | 0.2kb |
| 3.1 | Drag com Spring Physics | Diferencial | ⬛⬛⬛⬛⬛ | Alta | +28kb |
| 3.2 | Score Counter Elastic | Diferencial | ⬛⬛⬛⬛⬛ | Média | 0kb |
| 3.3 | Grain Overlay | Diferencial | ⬛⬛⬛⬛ | Baixíssima | 0kb |
| 3.4 | Toggle Preços Animado | Diferencial | ⬛⬛⬛⬛ | Média | 0kb |
| 3.5 | Parallax nos Blobs | Diferencial | ⬛⬛⬛ | Baixa | 0.3kb |
| 3.6 | Easter Egg Terminal | Diferencial | ⬛⬛⬛⬛⬛ | Média | ~2kb |

---

## Ordem de Implementação Recomendada

```
Semana 1 (após Fase 1 do plan.md)
  → 1.4 Staggered Hero
  → 1.1 Fade-in Scroll
  → 1.2 Nav Blur
  → 1.3 Hover Cards
  → 1.5 Shimmer CTA

Semana 2 (após Fase 2 do plan.md)
  → 2.4 Gradient Mesh
  → 2.3 Typing Effect
  → 3.3 Grain Overlay   ← 2 linhas de CSS, impacto enorme
  → 2.2 Contador
  → 2.5 Tooltips

Semana 3 (polimento final)
  → 2.1 Cursor
  → 2.6 Progress Bar
  → 3.2 Score Elastic
  → 3.4 Toggle Preços
  → 3.1 Spring Drag
  → 3.6 Easter Egg Terminal   ← deixar por último, é o prêmio
```

> **Regra de ouro:** Implemente na ordem. O Tier 1 com CSS puro custa 0kb e entrega 80% do impacto visual.  
> O Tier 3 é o polimento que transforma uma boa landing em um produto que as pessoas lembram.

---

*Referência de design system: `gemini.md`*  
*Plano de refatoração: `plan.md`*
