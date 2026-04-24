# KORE_ — Análise Financeira Completa

> Documento de análise de custos, receitas, margens e projeções.  
> Todos os valores em **Reais (BRL)** salvo indicação contrária.  
> Câmbio de referência: **USD 1 = BRL 5,80** (Abril 2026)  
> Dados de pricing verificados em fontes oficiais em Abril 2026.

---

## 1. ESTRUTURA DE CUSTOS FIXOS (MENSAL)

### 1.1 — Infraestrutura

| Serviço | Plano | Custo USD | Custo BRL | Observação |
|---------|-------|-----------|-----------|------------|
| **Vercel** | Hobby (landing) | $0 | R$ 0 | Landing page estática — free forever |
| **Vercel** | Pro (app) | $20 | R$ 116 | Quando a plataforma entrar em produção |
| **Supabase** | Free (MVP) | $0 | R$ 0 | Até 50k MAUs, 500MB DB |
| **Supabase** | Pro (produção) | $25 | R$ 145 | A partir de ~20-30 clientes pagos |
| **Domínio** | .com.br (Registro.br) | — | R$ 3,33/mês | R$ 40/ano fixo |
| **Total infra MVP** | | $0 | **R$ 3,33** | Fase pré-launch |
| **Total infra produção** | | $45 | **R$ 264** | Após launch |

> **Nota Vercel:** A landing page (Astro SSG) cabe no plano Hobby para sempre.  
> O app em si (Spring Boot no backend) precisa de outro servidor — ver seção 1.2.

---

### 1.2 — Backend da Plataforma (Spring Boot)

O Vercel **não** é adequado para o backend Java/Spring Boot. Opções reais:

| Opção | Custo USD | Custo BRL | Recomendação |
|-------|-----------|-----------|-------------|
| **Railway** (Starter) | $5 | R$ 29 | ✅ Melhor custo-benefício para MVP |
| **Fly.io** (Pay-as-go) | ~$5-10 | R$ 29-58 | Boa opção, mais flexível |
| **Render** (Starter) | $7 | R$ 41 | Simples, boa DX |
| **AWS EC2 t3.micro** | ~$8 | R$ 46 | Mais controle, mais complexidade |
| **DigitalOcean Droplet** | $6 | R$ 35 | Estável, previsível |

**Recomendação para MVP:** Railway a $5/mês — sobe em minutos, escala quando precisar.

---

### 1.3 — Serviço de Pagamentos

**Stripe** (recomendado para SaaS com recorrência):

| Método | Taxa | Aplicação |
|--------|------|-----------|
| Cartão de crédito (BR) | **3,99% + R$ 0,39** por transação | Assinaturas mensais |
| Pix | **~1%** por transação | Pagamento único / add-ons |
| Chargeback | R$ $15/disputa | Risco baixo em SaaS |

> A Stripe opera no Brasil. Para PIX, o acesso ainda é invite-only para empresas BR.  
> Alternativa nacional: **Asaas** — taxa de **1,99% + R$ 0,49** para assinaturas, mais barato.

**Impacto real por assinatura:**

```
Pro (R$ 27/mês) via cartão:
  Taxa Stripe: 3,99% × R$ 27 + R$ 0,39 = R$ 1,47
  Você recebe líquido: R$ 25,53 por assinante Pro

Agent (R$ 79/mês) via cartão:
  Taxa Stripe: 3,99% × R$ 79 + R$ 0,39 = R$ 3,54
  Você recebe líquido: R$ 75,46 por assinante Agent
```

---

### 1.4 — Custo de IA (Motor ATS + Auto Candidatura)

**Este é o custo mais variável e crítico do negócio.**

A Kore usa LLM para:
- Otimização de currículo por vaga (Pro + Agent)
- Auto candidatura inteligente (Agent apenas)
- Análise de URL de vaga (Agent apenas)

**Modelo recomendado:** Claude Haiku 4.5 para operações em volume, Sonnet 4.6 para análises críticas.

| Modelo | Input | Output | Caso de uso |
|--------|-------|--------|-------------|
| **Haiku 4.5** | $1/MTok | $5/MTok | Otimizações em volume, auto-candidatura |
| **Sonnet 4.6** | $3/MTok | $15/MTok | Análise profunda de persona, score ATS |

**Com Batch API (50% de desconto) — ideal para processar candidaturas em lote:**

| Modelo | Input (batch) | Output (batch) |
|--------|--------------|----------------|
| **Haiku 4.5** | $0,50/MTok | $2,50/MTok |
| **Sonnet 4.6** | $1,50/MTok | $7,50/MTok |

**Estimativa de custo por operação:**

```
1 otimização de currículo (Haiku 4.5):
  Input:  ~2.000 tokens (currículo + descrição da vaga)
  Output: ~1.500 tokens (currículo otimizado)
  Custo:  (2k × $1 + 1.5k × $5) / 1.000.000 = $0,0095
  Em BRL: ~R$ 0,055 por otimização

1 auto-candidatura completa (Sonnet 4.6):
  Input:  ~3.000 tokens (perfil + vaga + histórico)
  Output: ~2.000 tokens (currículo adaptado + carta)
  Custo:  (3k × $3 + 2k × $15) / 1.000.000 = $0,039
  Em BRL: ~R$ 0,23 por candidatura
```

**Consumo mensal estimado por plano (com Batch API):**

| Plano | Operações/mês | Custo IA/usuário |
|-------|--------------|-----------------|
| Free (BYOK) | Chave própria | **R$ 0** (usuário paga) |
| Pro | ~20 otimizações/mês | ~R$ 0,70/usuário |
| Agent | ~60 candidaturas/mês | ~R$ 8,30/usuário |

> O BYOK no Free **zera o maior custo variável** — é um diferencial financeiro enorme.

---

### 1.5 — Resumo Custos Fixos Mensais

**Fase MVP (pré-revenue, solo):**

| Item | Custo BRL |
|------|-----------|
| Domínio .com.br | R$ 3,33 |
| Vercel Hobby (landing) | R$ 0 |
| Supabase Free | R$ 0 |
| Railway Starter (backend) | R$ 29 |
| **Total MVP** | **R$ 32,33/mês** |

**Fase Produção (com clientes pagos):**

| Item | Custo BRL |
|------|-----------|
| Domínio .com.br | R$ 3,33 |
| Vercel Hobby (landing) | R$ 0 |
| Vercel Pro (app frontend) | R$ 116 |
| Supabase Pro | R$ 145 |
| Railway (backend escalonado) | R$ 58-116 |
| **Total fixo produção** | **R$ 322 – R$ 380/mês** |

---

## 2. CUSTOS VARIÁVEIS (POR USUÁRIO/MÊS)

| Tipo de usuário | Custo IA | Taxa pagamento | Custo total/usuário |
|----------------|----------|---------------|---------------------|
| Free (BYOK) | R$ 0 | R$ 0 | **R$ 0** |
| Pro | R$ 0,70 | R$ 1,47 | **R$ 2,17** |
| Agent | R$ 8,30 | R$ 3,54 | **R$ 11,84** |

> Os usuários Free **não custam nada** além da infra compartilhada (Supabase).  
> Isso valida manter o free tier generoso — custo marginal é praticamente zero.

---

## 3. MARGENS POR PLANO

```
PLANO PRO — R$ 27/mês
  Receita bruta:          R$ 27,00
  Taxa pagamento:       - R$  1,47
  Custo IA:             - R$  0,70
  ─────────────────────────────────
  Margem bruta:           R$ 24,83  (92% de margem)

PLANO AGENT — R$ 79/mês
  Receita bruta:          R$ 79,00
  Taxa pagamento:       - R$  3,54
  Custo IA (60 cand.):  - R$  8,30
  ─────────────────────────────────
  Margem bruta:           R$ 67,16  (85% de margem)

PLANO AGENT (heavy user — 150 cand./mês)
  Receita bruta:          R$ 79,00
  Taxa pagamento:       - R$  3,54
  Custo IA:             - R$ 20,75
  ─────────────────────────────────
  Margem bruta:           R$ 54,71  (69% de margem)
```

> **Alerta:** Um Agent heavy user (150+ candidaturas/mês) pode custar R$ 20/mês em IA.  
> Solução: limite de 100 candidaturas/mês no Agent, com add-on para mais.

---

## 4. PROJEÇÕES DE RECEITA

### 4.1 — Cenário Conservador

Crescimento orgânico, sem investimento em ads. Distribuição via LinkedIn, comunidades dev BR (Rocketseat, TabNews, Dev.to).

| Mês | Free | Pro | Agent | MRR Bruto | Custos Variáveis | MRR Líquido |
|-----|------|-----|-------|-----------|-----------------|-------------|
| 1 | 50 | 5 | 1 | R$ 214 | R$ 22 | R$ 192 |
| 2 | 120 | 12 | 3 | R$ 561 | R$ 52 | R$ 509 |
| 3 | 250 | 25 | 6 | R$ 1.149 | R$ 105 | R$ 1.044 |
| 6 | 600 | 60 | 15 | R$ 2.805 | R$ 255 | R$ 2.550 |
| 9 | 1.200 | 110 | 28 | R$ 5.182 | R$ 470 | R$ 4.712 |
| 12 | 2.000 | 170 | 45 | R$ 8.145 | R$ 725 | R$ 7.420 |

### 4.2 — Cenário Realista

Com 1 post viral no LinkedIn ou feature no TabNews/HackerNews BR.

| Mês | Pro | Agent | MRR Bruto | MRR Líquido |
|-----|-----|-------|-----------|-------------|
| 3 | 50 | 15 | R$ 2.535 | R$ 2.300 |
| 6 | 130 | 40 | R$ 6.670 | R$ 6.100 |
| 12 | 300 | 90 | R$ 15.210 | R$ 13.900 |

### 4.3 — Ponto de Equilíbrio (Break-even)

```
Custos fixos mensais (produção): R$ 380
Margem bruta por Pro:            R$ 24,83
Margem bruta por Agent:          R$ 67,16

Break-even mínimo:
  15 usuários Pro = R$ 372 (quase suficiente)
  13 usuários Pro = break-even exato

Break-even confortável (cobre infra + margem):
  20 Pro + 5 Agent = R$ 833 MRR líquido
```

**Você atinge break-even com apenas 15 usuários pagantes.**

---

## 5. EARLY ADOPTERS — ANÁLISE FINANCEIRA

Os planos fundadores são instrumentos de **capital de giro pré-revenue**:

```
Meta: 100 Pro Fundador (R$ 14/mês) + 50 Agent Fundador (R$ 39/mês)

MRR Fundadores:
  100 × R$ 14 = R$ 1.400
  50  × R$ 39 = R$ 1.950
  ─────────────────────
  Total:         R$ 3.350/mês

Custo variável dos 150 early adopters:
  Pro:   100 × R$ 2,17  = R$ 217
  Agent:  50 × R$ 11,84 = R$ 592
  ──────────────────────────────
  Total:                  R$ 809

MRR líquido fundadores: R$ 2.541/mês
```

**Isso cobre toda a infra de produção antes de ter um cliente ao preço cheio.**

---

## 6. IMPOSTOS E OBRIGAÇÕES (BRASIL)

Este é um ponto crítico que a maioria dos devs ignora.

### 6.1 — Pessoa Física (sem empresa)

Receber como PF via Stripe/Asaas é tecnicamente **receita de serviço digital**.
- Deve ser declarado no IRPF
- Acima de R$ 2.824/mês: incide tabela progressiva de IR (começa em 7,5%)
- **Risco:** Receita Federal pode caracterizar como atividade empresarial e autuar

**Não recomendado para faturamento recorrente acima de R$ 1.000/mês.**

### 6.2 — MEI

- Limite: R$ 81.000/ano (R$ 6.750/mês)
- Desenvolvedor de software NÃO pode ser MEI (atividade não permitida)
- ❌ Não aplicável para Kore

### 6.3 — ME/EPP no Simples Nacional ✅ (Recomendado)

- **Abertura:** ~R$ 500-800 (contador + taxas)
- **Custo mensal:** R$ 120-200 (contador)
- **Alíquota Simples (Anexo III - serviços de TI):**

| Faturamento anual | Alíquota efetiva |
|-------------------|-----------------|
| Até R$ 180k | 6% |
| R$ 180k – R$ 360k | ~8,7% |
| R$ 360k – R$ 720k | ~10,3% |

```
Exemplo com MRR de R$ 5.000 (R$ 60k/ano):
  Imposto Simples (6%):     R$ 300/mês
  Contador:                 R$ 150/mês
  ──────────────────────────────────────
  Custo fiscal total:       R$ 450/mês
  Sobre receita bruta:      9% de carga tributária efetiva
```

### 6.4 — Resumo fiscal integrado às projeções

| Cenário | MRR Bruto | Imposto (6%) | Contador | MRR Real Disponível |
|---------|-----------|-------------|---------|---------------------|
| Mês 6 (conservador) | R$ 2.805 | R$ 168 | R$ 150 | **R$ 2.100** |
| Mês 12 (conservador) | R$ 8.145 | R$ 489 | R$ 150 | **R$ 6.500** |
| Mês 12 (realista) | R$ 15.210 | R$ 913 | R$ 150 | **R$ 12.500** |

---

## 7. CUSTO DE AQUISIÇÃO DE CLIENTE (CAC)

Sem ads (modelo orgânico):

| Canal | Esforço | CAC estimado |
|-------|---------|-------------|
| LinkedIn (posts técnicos) | 2-3h/semana | R$ 0 |
| TabNews / Dev.to | 1h/post | R$ 0 |
| YouTube (demos) | 3-4h/vídeo | R$ 0 |
| Comunidades Discord/Slack | Participação ativa | R$ 0 |
| **CAC orgânico total** | | **~R$ 0** |

Com ads (quando tiver MRR estável):

| Canal | Budget | CAC esperado |
|-------|--------|-------------|
| LinkedIn Ads (dev BR) | R$ 500/mês | R$ 35-60 |
| Google Ads (keyword ATS) | R$ 300/mês | R$ 25-45 |

**LTV vs CAC:**
```
Pro: LTV médio (12 meses retenção × R$ 24,83) = R$ 298
  CAC orgânico: R$ 0  →  LTV:CAC = ∞
  CAC pago:     R$ 50 →  LTV:CAC = 5,9x  ✅ viável

Agent: LTV médio (8 meses × R$ 67,16) = R$ 537
  CAC orgânico: R$ 0  →  LTV:CAC = ∞
  CAC pago:     R$ 50 →  LTV:CAC = 10,7x ✅ excelente
```

---

## 8. RISCOS FINANCEIROS

### 8.1 — Custo de IA descontrolado
**Risco:** Agent heavy users consumindo muito mais tokens que o estimado.  
**Mitigação:**
- Limite hard de 100 candidaturas/mês no Agent
- Alertas de custo por usuário no dashboard
- Cache agressivo com Prompt Caching da Anthropic (90% de desconto em contexto repetido)
- Usar Haiku 4.5 para operações de volume, Sonnet só para análises críticas

### 8.2 — Churn alto nos primeiros 3 meses
**Risco:** Produto em desenvolvimento com features incompletas.  
**Mitigação:**
- Early adopters com preço fundador criam comprometimento psicológico
- Comunicação transparente de roadmap
- Canal direto (Discord/WhatsApp) com early adopters

### 8.3 — Receita concentrada em poucos usuários
**Risco:** 10 usuários Agent = R$ 790 MRR — perder 3 deles é impacto de 30%.  
**Mitigação:**
- Diversificar base Pro (menor ticket, menor churn)
- Annual plan com desconto (lock-in de 12 meses)

### 8.4 — Câmbio
**Risco:** Custos em USD (Vercel, Supabase, Claude API) sobem com dólar.  
**Mitigação:**
- Manter reserva de 2 meses de custo em USD
- Considerar reajuste de preço anual indexado ao dólar

### 8.5 — Concorrência e comoditização
**Risco:** LinkedIn, Indeed ou startups bem financiadas lançarem features similares.  
**Mitigação:**
- BYOK como diferencial de privacidade (dificílimo de replicar por grande empresa)
- Criptografia local AES-256 como moat técnico
- Comunidade de early adopters como defesa de mercado

---

## 9. FLUXO DE CAIXA — ANO 1

```
         Jan   Fev   Mar   Abr   Mai   Jun   Jul   Ago   Set   Out   Nov   Dez
         ─────────────────────────────────────────────────────────────────────
Receita    0     0   214   214   400   561   800  1.149 1.500 2.000 2.500 3.200
Custos   -33   -33  -380  -380  -380  -380  -380   -380  -380  -380  -380  -380
Impostos   0     0     0     0   -24   -34   -48    -69   -90  -120  -150  -192
Contador   0     0  -150  -150  -150  -150  -150   -150  -150  -150  -150  -150
         ─────────────────────────────────────────────────────────────────────
Saldo    -33   -33  -316  -316  -154   -3   +222   +550  +880 +1.350 +1.820 +2.478
Acumul.  -33   -66  -382  -698  -852  -855  -633    -83  +797 +2.147 +3.967 +6.445
```

> **Break-even do fluxo de caixa acumulado: mês 9** (cenário conservador)  
> Investimento total necessário: **~R$ 855** (o déficit máximo acumulado)  
> Ou seja: você lança a Kore com menos de R$ 1.000 de capital inicial.

---

## 10. RESUMO EXECUTIVO

```
┌─────────────────────────────────────────────────────────┐
│  KORE_ — RESUMO FINANCEIRO                              │
├─────────────────────────────────────────────────────────┤
│  Custo para lançar (MVP):          R$ 32/mês            │
│  Custo em produção (fixo):         R$ 380/mês           │
│  Break-even (usuários):            15 usuários Pro      │
│  Break-even (fluxo de caixa):      Mês 9                │
│  Capital inicial necessário:       R$ 855               │
│                                                         │
│  Margem bruta Pro:                 92%                  │
│  Margem bruta Agent:               85%                  │
│                                                         │
│  MRR projetado mês 12:                                  │
│    Conservador:  R$ 8.145 bruto / R$ 6.500 líquido     │
│    Realista:     R$ 15.210 bruto / R$ 12.500 líquido   │
│                                                         │
│  Early Adopters (100 Pro + 50 Agent):                   │
│    MRR fundadores: R$ 3.350                             │
│    MRR líquido:    R$ 2.541                             │
│                                                         │
│  Maior risco:  Custo de IA descontrolado (Agent)        │
│  Maior ativo:  BYOK zera custo de IA no Free            │
│  Maior alavanca: Annual plan (2 meses grátis)           │
└─────────────────────────────────────────────────────────┘
```

---

## 11. PRÓXIMOS PASSOS FINANCEIROS

Em ordem de prioridade:

- [ ] **Abrir CNPJ** (ME Simples Nacional, Anexo III) antes de cobrar os primeiros R$ 1.000
- [ ] **Contratar contador** (~R$ 150/mês) especializado em SaaS/tech
- [ ] **Configurar Stripe ou Asaas** com cobrança recorrente + webhooks de status
- [ ] **Criar controle de custo por usuário** na API da Anthropic (tag por user_id)
- [ ] **Definir limite hard de candidaturas/mês** no Agent antes do launch
- [ ] **Criar reserva de 3 meses de custos** (~R$ 1.200) antes de depender da receita
- [ ] **Ativar Annual plan** desde o dia 1 (melhora LTV em ~40%)
- [ ] **Monitorar CAC e LTV mensalmente** a partir do mês 3

---

*Última atualização: 2026-04-23*  
*Câmbio de referência: USD 1 = BRL 5,80*  
*Fontes: Vercel Docs, Supabase Docs, Anthropic Pricing, Stripe BR, Receita Federal*
