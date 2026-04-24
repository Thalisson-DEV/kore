import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Gratuito",
      label: "BYOK (Soberania)",
      status: "EM DEV.",
      price: 0,
      period: "/sempre",
      features: ["Motor ATS Ilimitado", "Infraestrutura BYOK", "Local Encryption", "1 Persona Ativa"],
      cta: "Indisponível",
      disabled: true,
      highlight: false
    },
    {
      name: "Kore Pro",
      label: "Alta Performance",
      status: "RECOMENDADO",
      price: isAnnual ? 22 : 27,
      period: "/mês",
      features: ["Motor IA Incluso (Haiku 4.5)", "20 Otimizações/mês", "5 Personas Ativas", "PDF Export Premium"],
      cta: "Garantir Acesso",
      disabled: false,
      highlight: true
    },
    {
      name: "Kore Agent",
      label: "Agente Autônomo",
      status: "EM DEV.",
      price: isAnnual ? 65 : 79,
      period: "/mês",
      features: ["Busca & Auto Candidatura", "Limite de 100 candidaturas/mês", "Análise Sonnet 4.6", "Suporte Prioritário 1:1"],
      cta: "Indisponível",
      disabled: true,
      highlight: false
    }
  ];

  return (
    <section id="precos" className="section-gap bg-bg reveal">
      <div className="container-kore">
        <div className="divider-label mb-24">
          <span className="w-12 h-[1px] bg-border"></span>
          PREÇOS_FINANCE
          <span className="flex-grow h-[1px] bg-border"></span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div>
            <h2 className="text-section max-w-xl leading-tight mb-4">Planos Disponíveis<span className="text-accent">.</span></h2>
            <p className="text-caption text-muted font-mono uppercase tracking-widest">Câmbio ref: USD 1 = BRL 5,80</p>
          </div>
          
          <div className="flex items-center gap-4 bg-surface/50 p-1 border border-border rounded-sm">
            <button 
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${!isAnnual ? 'bg-accent text-bg' : 'text-muted hover:text-text'}`}
            >
              Mensal
            </button>
            <button 
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${isAnnual ? 'bg-accent text-bg' : 'text-muted hover:text-text'}`}
            >
              Anual
              <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${isAnnual ? 'bg-bg/20 text-bg' : 'bg-accent/10 text-accent'}`}>2 MESES OFF</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`flex flex-col p-10 border transition-all duration-500 rounded-sm group card-hover ${plan.highlight ? 'border-accent bg-surface/40 shadow-[0_0_40px_rgba(59,130,246,0.05)] scale-[1.02]' : 'border-border bg-surface/20 opacity-90'}`}
            >
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className={`text-card uppercase font-bold tracking-tighter ${plan.highlight ? 'text-accent' : ''}`}>{plan.name}</h3>
                  <p className={`text-[10px] font-mono mt-1 tracking-widest uppercase ${plan.highlight ? 'text-accent/70' : 'text-muted'}`}>{plan.label}</p>
                </div>
                <span className={`px-2 py-1 border text-[9px] font-mono uppercase tracking-tighter ${plan.highlight ? 'border-accent bg-accent text-bg font-bold' : 'border-border text-muted'}`}>
                  {plan.status}
                </span>
              </div>
              
              <div className="mb-12 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tighter">R$ </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={plan.price}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-5xl font-bold tracking-tighter"
                  >
                    {plan.price}
                  </motion.span>
                </AnimatePresence>
                <span className="text-caption text-faint ml-2">{plan.period}</span>
              </div>

              <ul className="space-y-5 mb-auto text-caption">
                {plan.features.map((feat, fi) => (
                  <li key={fi} className={`flex items-center gap-3 ${plan.highlight ? 'text-text' : 'text-muted'}`}>
                    <span className={plan.highlight ? 'text-accent font-bold' : 'text-faint'}>
                      {plan.highlight ? '●' : '/'}
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              {plan.disabled ? (
                <button disabled className="mt-12 w-full py-4 border border-border text-faint text-[11px] font-bold rounded-sm cursor-not-allowed uppercase tracking-widest">
                  {plan.cta}
                </button>
              ) : (
                <a 
                  href="#acesso" 
                  className="btn-primary mt-12 w-full py-4 text-bg text-[11px] font-bold rounded-sm text-center transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.2)]"
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
