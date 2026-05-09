import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      label: "Sempre Grátis",
      status: "GRÁTIS",
      price: 0,
      priceLabel: "0",
      period: "/sempre",
      urgencyNote: null,
      features: [
        "3 otimizações por mês",
        "Score de ATS completo",
        "Kanban de candidaturas",
        "Exportador de PDF"
      ],
      cta: "Começar grátis",
      disabled: false,
      highlight: false
    },
    {
      name: "Kore Pro",
      label: "Beta — Preço Vitalício",
      status: "RECOMENDADO",
      price: isAnnual ? 11 : 14,
      priceLabel: null,
      period: "/mês",
      urgencyNote: "Sobe pra R$ 27/mês quando o beta fechar",
      features: [
        "Otimizações ilimitadas",
        "Personas múltiplas por currículo",
        "Match analyzer com URL da vaga",
        "Heatmap de relevância em tempo real",
        "Exportador JSON Resume",
        "Suporte prioritário"
      ],
      cta: "Quero entrar no beta",
      disabled: false,
      highlight: true
    },
    {
      name: "Kore Agent",
      label: "Agente Autônomo",
      status: "EM DEV.",
      price: isAnnual ? 65 : 79,
      priceLabel: null,
      period: "/mês",
      urgencyNote: null,
      features: [
        "Busca & Auto Candidatura",
        "100 candidaturas/mês",
        "Análise Sonnet 4.6",
        "Suporte Prioritário 1:1"
      ],
      cta: "Indisponível",
      disabled: true,
      highlight: false
    }
  ];

  return (
    <section id="precos" className="py-32 lg:py-48 bg-bg reveal">
      <div className="container-kore">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-24 lg:mb-32">
          <div>
            <p className="text-[11px] font-mono text-accent uppercase tracking-widest mb-6">PREÇOS_FINANCE</p>
            <h2 className="text-section max-w-lg">
              Escolha seu plano<span className="text-accent">.</span>
            </h2>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-1 bg-surface/50 p-1 border border-border w-fit">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-all whitespace-nowrap ${!isAnnual ? 'bg-accent text-bg' : 'text-muted hover:text-text'}`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${isAnnual ? 'bg-accent text-bg' : 'text-muted hover:text-text'}`}
            >
              Anual
              <span className={`text-[8px] px-1.5 py-0.5 ${isAnnual ? 'bg-bg/30 text-bg' : 'bg-accent/10 text-accent'}`}>-20%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`flex flex-col p-10 lg:p-12 border transition-all duration-300 ${
                plan.highlight
                  ? 'border-accent bg-surface/40 shadow-[0_0_60px_rgba(59,130,246,0.08)]'
                  : 'border-border bg-surface/10 opacity-80'
              }`}
            >
              {/* Plan header */}
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className={`text-lg font-bold tracking-tighter uppercase mb-1 ${plan.highlight ? 'text-accent' : 'text-text'}`}>
                    {plan.name}
                  </h3>
                  <p className="text-[10px] font-mono text-faint uppercase tracking-widest">{plan.label}</p>
                </div>
                <span className={`px-2 py-1 text-[9px] font-mono font-bold uppercase tracking-widest ${
                  plan.highlight ? 'bg-accent text-bg' : 'border border-border text-faint'
                }`}>
                  {plan.status}
                </span>
              </div>

              {/* Price */}
              <div className="mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-mono text-faint">R$</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={plan.price}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`text-6xl font-bold tracking-tighter ${plan.highlight ? 'text-text' : 'text-muted'}`}
                    >
                      {plan.priceLabel ?? plan.price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[13px] text-faint font-mono ml-1">{plan.period}</span>
                </div>
              </div>

              {plan.urgencyNote && (
                <p className="text-[10px] font-mono text-accent mb-8 tracking-wide">{plan.urgencyNote}</p>
              )}

              {/* Features */}
              <ul className={`space-y-4 mb-auto text-[13px] ${!plan.urgencyNote ? 'mt-6' : ''}`}>
                {plan.features.map((feat, fi) => (
                  <li key={fi} className={`flex items-start gap-3 ${plan.highlight ? 'text-text' : 'text-faint'}`}>
                    <span className={`mt-0.5 text-xs ${plan.highlight ? 'text-accent' : 'text-faint'}`}>
                      {plan.highlight ? '✓' : '—'}
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.disabled ? (
                <button
                  disabled
                  className="mt-12 w-full py-4 border border-border text-faint text-[11px] font-bold uppercase tracking-widest cursor-not-allowed opacity-40"
                >
                  {plan.cta}
                </button>
              ) : (
                <a
                  href="#acesso"
                  className={`mt-12 w-full py-4 text-[11px] font-bold uppercase tracking-widest text-center transition-all ${
                    plan.highlight
                      ? 'btn-primary text-bg shadow-[0_0_30px_rgba(59,130,246,0.25)]'
                      : 'border border-border text-muted hover:border-accent hover:text-accent'
                  }`}
                >
                  {plan.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
