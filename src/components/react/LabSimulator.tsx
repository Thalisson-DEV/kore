import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface JobExample {
  id: string;
  role: string;
  company: string;
  url: string;
  beforeScore: number;
  afterScore: number;
  matchPct: number;
  keywordsAdded: string[];
}

const JOB_EXAMPLES: JobExample[] = [
  {
    id: 'react-stripe',
    role: 'Senior React',
    company: 'Stripe',
    url: 'linkedin.com/jobs/stripe-react-senior-2026',
    beforeScore: 41,
    afterScore: 89,
    matchPct: 94,
    keywordsAdded: ['React 19', 'Server Components', 'Suspense', 'TypeScript', 'A/B testing', 'Stripe API', 'Webhooks'],
  },
  {
    id: 'go-mercado',
    role: 'Backend Go',
    company: 'Mercado Livre',
    url: 'mercadolivre.com.br/jobs/backend-go-sr',
    beforeScore: 38,
    afterScore: 86,
    matchPct: 91,
    keywordsAdded: ['gRPC', 'Goroutines', 'Kafka', 'Postgres', 'Observability', 'Datadog', 'Distributed systems'],
  },
  {
    id: 'devops-ifood',
    role: 'DevOps',
    company: 'iFood',
    url: 'ifood.com.br/careers/devops-staff',
    beforeScore: 44,
    afterScore: 91,
    matchPct: 96,
    keywordsAdded: ['Kubernetes', 'Helm', 'ArgoCD', 'Terraform', 'AWS EKS', 'Prometheus', 'GitOps'],
  },
  {
    id: 'data-nubank',
    role: 'Data Engineer',
    company: 'Nubank',
    url: 'nubank.com.br/careers/data-eng-sr',
    beforeScore: 35,
    afterScore: 84,
    matchPct: 88,
    keywordsAdded: ['Spark', 'Airflow', 'dbt', 'Clojure', 'Kafka Streams', 'Delta Lake', 'Snowflake'],
  },
];

const PHASES = [
  { id: 1, label: 'Lendo a vaga', duration: 700 },
  { id: 2, label: 'Comparando com seu CV', duration: 800 },
  { id: 3, label: 'Aplicando otimização', duration: 900 },
  { id: 4, label: 'Calculando score', duration: 600 },
];

type State = 'idle' | 'processing' | 'result';

function urlToJob(url: string): JobExample {
  const hash = url.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return JOB_EXAMPLES[hash % JOB_EXAMPLES.length];
}

export default function LabSimulator() {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<State>('idle');
  const [activeJob, setActiveJob] = useState<JobExample>(JOB_EXAMPLES[0]);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [animatedScore, setAnimatedScore] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const runSimulation = useCallback((job: JobExample) => {
    setActiveJob(job);
    setState('processing');
    setPhaseIndex(0);
    setCompletedPhases([]);
    setAnimatedScore(0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    runSimulation(urlToJob(url));
  };

  const handleExampleClick = (job: JobExample) => {
    setUrl(job.url);
    runSimulation(job);
  };

  useEffect(() => {
    if (state !== 'processing') return;
    if (phaseIndex >= PHASES.length) {
      setState('result');
      return;
    }
    const phase = PHASES[phaseIndex];
    const t = setTimeout(() => {
      setCompletedPhases((p) => [...p, phase.id]);
      setPhaseIndex((p) => p + 1);
    }, phase.duration);
    return () => clearTimeout(t);
  }, [state, phaseIndex]);

  useEffect(() => {
    if (state !== 'result') return;
    const target = activeJob.afterScore;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t) * Math.cos((t * 5 - 0.75) * (2 * Math.PI) / 3);
      setAnimatedScore(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [state, activeJob]);

  // Auto-demo
  useEffect(() => {
    if (state !== 'idle') return;
    let triggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered && state === 'idle') {
            triggered = true;
            setTimeout(() => {
              if (state === 'idle') runSimulation(JOB_EXAMPLES[0]);
            }, 4500);
          }
        });
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [state, runSimulation]);

  const showPanel = state !== 'idle';

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="relative py-28 lg:py-40 border-t border-border-subtle overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(228,228,240,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(228,228,240,0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 80%)',
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent opacity-[0.04] blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="container-kore">
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="divider-label mb-6">
            <span className="w-8 h-px bg-faint" />
            <span>lab_simulator</span>
          </p>
          <h2 className="text-section mb-6 text-balance">
            Cole uma vaga<span className="text-accent">.</span>
            <br />
            Veja seu score em <span className="pain-underline">6 segundos</span>.
          </h2>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">
            Sem cadastro, sem upload. Cole uma URL ou clique num exemplo.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-2xl mb-5">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="linkedin.com/jobs/..."
            disabled={state === 'processing'}
            className="lab-input flex-1 min-w-0 px-5 py-4 bg-surface border border-border focus:border-accent/60 rounded-md text-[14px] text-text placeholder:text-faint outline-none transition-all font-mono tracking-tight disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={state === 'processing' || !url.trim()}
            className="lab-cta px-8 py-4 text-bg text-[12px] font-bold rounded-md transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-widest flex items-center justify-center gap-2 whitespace-nowrap sm:min-w-[160px]"
          >
            {state === 'processing' ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-bg animate-pulse" />
                Scanning
              </>
            ) : (
              <>
                Simular
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Vagas exemplo */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="text-[10px] font-mono text-faint uppercase tracking-widest mr-1">exemplos:</span>
          {JOB_EXAMPLES.map((job) => (
            <button
              key={job.id}
              onClick={() => handleExampleClick(job)}
              disabled={state === 'processing'}
              className="group inline-flex items-center gap-2 px-3 py-1.5 bg-surface/40 border border-border-subtle hover:border-accent/40 hover:bg-surface/80 rounded-full text-[11px] font-mono text-muted hover:text-text transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="w-1 h-1 rounded-full bg-faint group-hover:bg-accent transition-colors" />
              {job.role} <span className="text-faint">@ {job.company}</span>
            </button>
          ))}
        </div>

        {/* Result panel — só aparece quando rodando ou pronto */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-surface/40 border border-border rounded-lg overflow-hidden backdrop-blur-sm"
            >
              {/* Status pill compacto */}
              <div className="flex items-center justify-between px-5 lg:px-6 py-3 border-b border-border-subtle bg-bg/40">
                <span className="text-[10px] font-mono text-faint uppercase tracking-widest">
                  {activeJob.role} <span className="text-faint/60">@</span> {activeJob.company}
                </span>
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={state === 'processing' ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                    transition={state === 'processing' ? { duration: 1, repeat: Infinity } : { duration: 0.3 }}
                    className={`w-1.5 h-1.5 rounded-full ${state === 'processing' ? 'bg-warning' : 'bg-success'}`}
                  />
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest ${state === 'processing' ? 'text-warning' : 'text-success'}`}
                  >
                    {state === 'processing' ? 'scanning' : 'completo'}
                  </span>
                </div>
              </div>

              <div className="p-6 lg:p-10">
                <AnimatePresence mode="wait">
                  {state === 'processing' && (
                    <ProcessingState
                      key="processing"
                      completedPhases={completedPhases}
                      currentPhase={phaseIndex}
                    />
                  )}
                  {state === 'result' && (
                    <ResultState key="result" job={activeJob} animatedScore={animatedScore} />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── ESTADOS ─────────────────────────────────────────────────────────

function ProcessingState({
  completedPhases,
  currentPhase,
}: {
  completedPhases: number[];
  currentPhase: number;
}) {
  const progress = (completedPhases.length / PHASES.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress bar */}
      <div className="h-1 bg-border/60 rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-dim to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Fases */}
      <div className="space-y-3 font-mono text-[13px]">
        {PHASES.map((phase, i) => {
          const isDone = completedPhases.includes(phase.id);
          const isActive = i === currentPhase;
          const isPending = !isDone && !isActive;
          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <span
                className={`${
                  isDone ? 'text-success' : isActive ? 'text-warning' : 'text-faint'
                } w-4 inline-flex justify-center`}
              >
                {isDone ? '✓' : isActive ? <Spinner /> : '·'}
              </span>
              <span className={isDone || isActive ? 'text-text' : 'text-faint'}>
                {phase.label}
                {isActive && <BlinkingCursor />}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function ResultState({ job, animatedScore }: { job: JobExample; animatedScore: number }) {
  const delta = job.afterScore - job.beforeScore;
  const radius = 88;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-14 items-start"
    >
      {/* Score circular */}
      <div className="flex flex-col items-center lg:items-start">
        <div className="relative w-44 h-44 lg:w-52 lg:h-52">
          <svg className="w-full h-full -rotate-90">
            <circle cx="50%" cy="50%" r={radius} stroke="currentColor" strokeWidth="3" fill="transparent" className="text-border" />
            <motion.circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - (circumference * job.afterScore) / 100 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
              className="text-accent drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl lg:text-7xl font-bold font-mono text-text tabular-nums tracking-tighter leading-none">
              {animatedScore}
            </span>
          </div>
        </div>
        <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 bg-success/10 border border-success/30 rounded-full">
          <span className="text-[11px] font-mono text-success font-bold">+{delta} pts</span>
          <span className="text-[10px] font-mono text-success/60">vs. {job.beforeScore}</span>
        </div>
      </div>

      {/* Info compacta */}
      <div className="flex flex-col">
        {/* Match grande */}
        <div className="mb-8">
          <p className="text-[10px] font-mono text-faint uppercase tracking-widest mb-2">match com a vaga</p>
          <p className="text-5xl font-bold font-mono text-accent tabular-nums tracking-tighter leading-none">
            {job.matchPct}%
          </p>
        </div>

        {/* Keywords injetadas */}
        <div className="mb-8">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-[10px] font-mono text-faint uppercase tracking-widest">keywords injetadas</p>
            <span className="text-[10px] font-mono text-success">+{job.keywordsAdded.length}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {job.keywordsAdded.map((kw, i) => (
              <motion.span
                key={kw}
                initial={{ opacity: 0, scale: 0.85, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                className="px-2.5 py-1 text-[11px] font-mono text-accent bg-accent/[0.08] border border-accent rounded-sm"
              >
                {kw}
              </motion.span>
            ))}
          </div>
        </div>

        {/* CTA simples */}
        <motion.a
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          href="#acesso"
          className="lab-cta inline-flex items-center justify-center gap-2 px-6 py-3.5 text-bg text-[11px] font-bold uppercase tracking-widest rounded-sm self-start"
        >
          Otimizar de verdade
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}

// ─── ATOMOS ──────────────────────────────────────────────────────────

function Spinner() {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="inline-block w-2.5 h-2.5 border-[1.5px] border-warning/30 border-t-warning rounded-full"
    />
  );
}

function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity }}
      className="inline-block w-1.5 h-3 bg-warning ml-1 align-middle"
    />
  );
}
