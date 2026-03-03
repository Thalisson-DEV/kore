# 🌳 KORE - Contexto Mestre & Documentação Técnica (v2.1)

Este documento é a "Single Source of Truth" para o projeto **Kore**. Ele deve ser seguido à risca por qualquer agente de IA ou desenvolvedor para garantir a consistência da stack, design system e lógica de negócio.

---

## 1. Visão Geral e Narrativa
* **Nome do Projeto:** Kore
* **Slogan:** "Kore. Inteligência na raiz. Tecnologia no topo."
* **Conceito:** Uma "IA Estratégica". O usuário assume o controle de sua carreira; ele usa a Kore como uma central de inteligência estratégica para vencer filtros ATS e gerenciar sua trajetória de forma sólida.
* **Tom de Voz:** Profissional, Assertivo, Técnico (Dev-First) e Seguro. Mensagens de alto impacto como: "Domine a base. Conquiste o topo."

---

## 2. Stack Tecnológica (Março 2026)

### Frontend (Foco Principal)
* **Framework:** Angular 20.0.0+ (Standalone Components, Signals-based).
* **Gerenciamento de Estado:** **Angular Signals** (obrigatório para reatividade e performance).
* **Estilização:** Tailwind CSS v4.
* **Temas:** Suporte nativo a **Light, Dark e System** via variáveis CSS dinâmicas (`:root` vs `.light`).
* **Ícones:** Lucide Icons (Line-art, espessura fina/2px).
* **Animações:** CSS Keyframes customizados (`animate-text-shimmer`, `animate-pulse-slow`) + Intersection Observer API.

### Backend (Infraestrutura)
* **Linguagem:** Java 21 (Records, Virtual Threads).
* **Framework:** Spring Boot 3.4+ (Monolito Modular / DDD).
* **IA Engine:** LangChain4j (Strategy Pattern para BYOK vs Global Key).
* **Segurança:** Spring Security Stateless + JWT + AES-256-GCM (Cofre de Chaves).

---

## 3. Identidade Visual (Design System Multi-Theme)

### 3.1 Paleta de Cores Dinâmica
As cores são mapeadas via variáveis CSS para adaptação automática:
* `kore-slate`: Fundo primário (Escuro: `#0A0F1A` | Claro: `#F8FAFC`).
* `kore-zinc`: Cards e componentes (Escuro: `#111827` | Claro: `#FFFFFF`).
* `kore-white`: Texto principal (Escuro: `#FFFFFF` | Claro: `#0A0F1A`).
* `kore-blue`: `#0070FF` (Electric Blue / Destaques e Ações).
* `kore-cyan`: `#00D1FF` (Neon Cyan / Alertas e Glows).
* `text-muted`: Descrições (Escuro: `#94a3b8` | Claro: `#475569`).

### 3.2 UI Patterns (Strategic Tech)
* **Glassmorphism 3.0:** `backdrop-blur-3xl` com bordas adaptativas (`border-kore-steel/10`).
* **Deep Depth:** Gradientes radiais fixos (`bg-gradient`) em todas as telas para profundidade.
* **Industrial Blueprint:** Bordas laterais fixas (`page-side-borders`) e separadores com hachura (`STRATEGIC_DIVIDER_V2`).
* **Impact Shimmer:** Efeito de luz infinito (`animate-text-shimmer`) em títulos principais.

---

## 4. Especificações de Componentes (Frontend)

### 4.1 Header Compacto (`HeaderComponent`)
* **Visual:** Mais fino (`py-2.5`), largura reduzida (`max-w-5xl`).
* **Theme Switcher:** Dropdown sofisticado para seleção de Claro, Escuro ou Sistema.

### 4.2 Hero Section Impact (`HeroComponent`)
* **Layout:** 2 colunas. Texto massivo à esquerda, Asset 3D à direita.
* **Botões:** Normalizados (`min-w-[200px]`). O botão "Começar Agora" inverte cores dinamicamente.
* **Badges:** Ícones Lucide preenchidos para "Seguro" e "Inteligente".

### 4.3 Command Center (`KanbanBoardComponent`)
* **Interação:** Drag & Drop simulado com Signals para gestão de vagas.
* **Estilo:** Cards com feedback visual de "drop zone" e indicadores de Match Score.

### 4.4 Dev Resources (`SupportSectionComponent`)
* **Conteúdo:** Documentação Técnica e Suporte de Elite.
* **Narrativa:** Tom "De Dev para Dev", técnico e informativo.

---

## 5. Regras de Negócio & UX
1.  **Conversational UI:** Interface que "fala" com o usuário (ex: FAQ conversacional).
2.  **Theme Awareness:** Proibido usar `text-white` literal para conteúdo; usar `text-kore-white`.
3.  **BYOK First:** Prioridade máxima na soberania de chaves do usuário (Local-first encryption).
4.  **Performance:** `ChangeDetectionStrategy.OnPush` em todos os componentes.

---

## 6. Glossário Técnico
* **KORE_ENGINE**: Motor de otimização ATS v2.0.
* **JIT Decryption**: Decriptografia Just-In-Time no backend.
* **Match Score**: Índice técnico de aderência algoritmicamente calculado.

---
**Autor:** Thalisson-DEV | **Versão:** 2.1 (Março 2026)
**Diretriz Final:** "Codifique como se a Kore fosse a infraestrutura estratégica definitiva do profissional global."
