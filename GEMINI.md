# 🌳 KORE - Contexto Mestre & Documentação Técnica (v2.0)

Este documento é a "Single Source of Truth" para o projeto **Kore**. Ele deve ser seguido à risca por qualquer agente de IA ou desenvolvedor para garantir a consistência da stack, design system e lógica de negócio.

---

## 1. Visão Geral e Narrativa
* **Nome do Projeto:** Kore (antigo Kaptar)
* **Slogan:** "Kore. Inteligência na raiz. Tecnologia no topo."
* **Conceito:** Uma "IA Estratégica". O usuário assume o controle de sua carreira; ele usa a Kore como uma central de inteligência estratégica para vencer filtros ATS e gerenciar sua trajetória de forma sólida.
* **Tom de Voz:** Profissional, Autoritário, Técnico (Dev-First) e Seguro.

---

## 2. Stack Tecnológica (Fevereiro 2026)

### Frontend (Foco Principal)
* **Framework:** Angular 20.0.0+ (Standalone Components, Signals-based).
* **Gerenciamento de Estado:** **Angular Signals** (obrigatório para reatividade e performance).
* **Estilização:** Tailwind CSS (Configuração nativa do Angular 20).
* **Ícones:** Lucide Icons (Line-art, espessura fina/2px).
* **Animações:** CSS Keyframes customizados + Intersection Observer API para Scroll-reveal.

### Backend (Infraestrutura)
* **Linguagem:** Java 21 (Records, Virtual Threads).
* **Framework:** Spring Boot 3.4+ (Monolito Modular / DDD).
* **IA Engine:** LangChain4j (Strategy Pattern para BYOK vs Global Key).
* **Segurança:** Spring Security Stateless + JWT + AES-256-GCM (Cofre de Chaves).
* **Banco de Dados:** PostgreSQL (JSONB para modelos flexíveis).

---

## 3. Identidade Visual (Design System Cyber-Strategic)

### 3.1 Paleta de Cores (Configuração Tailwind v4)
* `kore-slate`: `#0A0F1A` (Deep Black / Fundo Primário)
* `kore-blue`: `#0070FF` (Electric Blue / Destaques e Botões)
* `kore-cyan`: `#00D1FF` (Neon Cyan / Alertas e Glows)
* `white`: `#FFFFFF` (Headings e CTAs Primários)
* `kore-zinc`: `#111827` (Cards e Componentes Internos)

### 3.2 Tipografia
* **Headings (H1-H4):** `Bricolage Grotesque` (Peso 800+, tracking-tighter).
* **Body & UI:** `Inter` ou `Geist Sans` (Legibilidade técnica).
* **Data & Code:** `JetBrains Mono` (Essencial para labels técnicos, status e disclaimers).

### 3.3 UI Patterns (High-Performance Tech)
* **Glassmorphism 3.0:** `backdrop-blur-3xl` com bordas semitransparentes (`white/10`) e `inner-glow`.
* **Deep Depth:** Uso de `mesh-blobs` animados em opacidade baixíssima (5-8%) para profundidade infinita.
* **Magnetic Interactions:** Botões com escala reativa e transições ultra-rápidas (150ms).
* **Halo Effect:** Brilhos concentrados atrás de assets 3D para criar foco central.

---

## 4. Especificações de Componentes (Frontend)

### 4.1 Navbar Ultra-Black (`HeaderComponent`)
* **Comportamento:** Sticky com transparência dinâmica (`bg-black/40`).
* **Elementos:** Logo `KORE_` (com cursor azul pulsante), Botão "Acesso VIP" em branco sólido.

### 4.2 Hero Section Split-View (`HeroComponent`)
* **Layout:** 2 colunas. Texto à esquerda (`text-left`), Asset 3D à direita.
* **H1:** Texto massivo com gradiente `blue -> cyan -> white`.
* **3D Asset:** Vídeo WebM transparente (`assets/3d/hero-resumes.webm`) com sombra de contato neon.

### 4.3 The Lab (`AILabSimulatorComponent`)
* **Lógica de Estado (Signals):**
    * `IDLE`: Aguardando URL da vaga.
    * `SCANNING`: Animação de linha de scanner sobre o currículo.
    * `OPTIMIZING`: Texto simulando injeção de palavras-chave.
    * `SUCCESS`: Exibição do Match Score (98%) e tags de sucesso.
* **Visual:** Card escuro estilo terminal/IDE.

### 4.4 Command Center (`KanbanBoardComponent`)
* **Colunas:** "Inbox", "Otimizado", "Entrevista", "Oferta".
* **Cards:** Exibir Nome da Empresa, Cargo e Match Score.
* **Interação:** Drag & Drop funcional (simulado ou real) com feedback visual de "drop zone".

### 4.5 The Vault (`SecuritySectionComponent`)
* **Narrativa:** Explicação técnica do modelo BYOK.
* **Visual:** Fundo escuro (`kore-slate`), ícone de cadeado em 3D ou SVG animado.
* **Disclaimer:** "Sua chave nunca toca nosso banco de dados em texto puro."

---

## 5. Regras de Negócio & Lógica de Frontend

### 5.1 O Modelo BYOK (Bring Your Own Key)
* A chave de API do usuário é coletada no frontend.
* Deve existir uma validação de formato de chave antes do envio.
* No frontend, a chave pode ser persistida em `sessionStorage` (criptografada com uma chave efêmera) para não exigir reentrada durante a sessão.

### 5.2 Gerenciamento de Currículo (JSONB)
* O frontend deve tratar o currículo como um objeto JSON dinâmico.
* Implementar "Hot-Reload" na prévia do currículo conforme a IA sugere mudanças.

---

## 6. Padrões de Código e Requisitos de Qualidade
1.  **Imutabilidade:** Usar `Signals` e `computed` para derivar estados (ex: filtragem de cards no Kanban).
2.  **Performance:** `ChangeDetectionStrategy.OnPush` em todos os componentes.
3.  **Acessibilidade:** ARIA labels em todos os botões e inputs de IA.
4.  **Resiliência:** O componente de formulário deve tratar erros de API de forma elegante (Toast notifications em Azul Mineral).

---

## 7. Glossário de Rebranding
* **Kaptar -> KORE**: Substituir toda e qualquer menção textual e em variáveis.
* **Candidate-First**: Filosofia de design onde o usuário tem o controle.
* **JIT Decryption**: Termo técnico para decriptografia Just-In-Time no backend.

---
**Autor:** Thalisson-DEV | **Versão:** 2.0 (Fevereiro 2026)
**Diretriz Final:** "Codifique como se a Kore fosse o suporte estratégico definitivo do profissional global."
