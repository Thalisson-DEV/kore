import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const KEYWORDS = [
  { label: 'React 19', delay: 0.4 },
  { label: 'TypeScript', delay: 0.7 },
  { label: 'CI/CD', delay: 1.0 },
  { label: 'AWS', delay: 1.3 },
  { label: 'Docker', delay: 1.6 },
  { label: 'Kubernetes', delay: 1.9 },
  { label: 'Node.js', delay: 2.2 },
];

const ATS_PARSING_LINES = [
  'parsing resume.pdf...',
  'extracting keywords...',
  'matching job requirements...',
  'optimizing semantic density...',
  'score: 87/100 ✓',
];

export default function HeroVisual() {
  const score = useMotionValue(41);
  const rounded = useTransform(score, (latest) => Math.round(latest));
  const matchWidth = useTransform(score, [41, 87], ['47%', '92%']);

  const [displayScore, setDisplayScore] = useState(41);
  const [matchPct, setMatchPct] = useState(47);
  const [parseLine, setParseLine] = useState(0);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplayScore(v));
    const unsubMatch = score.on('change', (v) => {
      setMatchPct(Math.round(47 + ((v - 41) / 46) * 45));
    });

    const animation = animate(score, 87, {
      duration: 2.4,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => {
      unsub();
      unsubMatch();
      animation.stop();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParseLine((prev) => (prev + 1) % ATS_PARSING_LINES.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      {/* Glow halo */}
      <div className="absolute -inset-4 bg-accent/[0.08] blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-surface/80 border border-border rounded-md backdrop-blur-md overflow-hidden shadow-[0_24px_80px_-20px_rgba(0,0,0,0.1),0_0_30px_-20px_rgba(59,130,246,0.25)]"
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-bg/40">
          <span className="w-2 h-2 rounded-full bg-danger/50" />
          <span className="w-2 h-2 rounded-full bg-warning/50" />
          <span className="w-2 h-2 rounded-full bg-success/50" />
          <span className="text-[10px] font-mono text-faint ml-3 tracking-wider">kore.app / optimizer</span>
          <div className="ml-auto flex items-center gap-1.5">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-success"
            />
            <span className="text-[9px] font-mono text-success uppercase tracking-widest">ao vivo</span>
          </div>
        </div>

        {/* Scores grid */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="p-5 lg:p-6 flex flex-col gap-1 relative">
            <span className="text-[10px] font-mono text-faint uppercase tracking-widest">Antes</span>
            <span className="text-[56px] lg:text-[64px] font-bold font-mono text-faint/40 tracking-tighter leading-none mt-2">
              41
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-mono text-danger">● bloqueado pelo ATS</span>
            </div>
          </div>
          <div className="p-5 lg:p-6 flex flex-col gap-1 bg-accent/[0.04] relative overflow-hidden">
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Depois</span>
            <motion.span className="text-[56px] lg:text-[64px] font-bold font-mono text-accent tracking-tighter leading-none mt-2 tabular-nums">
              {displayScore}
            </motion.span>
            <div className="flex items-center gap-2 mt-1">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6 }}
                className="text-[10px] font-mono text-accent font-bold"
              >
                +46 pts
              </motion.span>
              <span className="text-[10px] font-mono text-faint">· em 6 min</span>
            </div>
            {/* Scan line */}
            <motion.div
              initial={{ y: -2 }}
              animate={{ y: 80 }}
              transition={{ duration: 2.4, ease: 'linear', repeat: Infinity, repeatDelay: 1.5 }}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />
          </div>
        </div>

        {/* Match bar */}
        <div className="px-5 lg:px-6 py-4 border-t border-border-subtle">
          <div className="flex justify-between text-[10px] font-mono text-faint mb-2">
            <span className="uppercase tracking-widest">Match com a vaga</span>
            <motion.span className="text-accent font-bold tabular-nums">{matchPct}%</motion.span>
          </div>
          <div className="h-1.5 bg-border/60 rounded-full overflow-hidden relative">
            <motion.div
              style={{ width: matchWidth }}
              className="h-full bg-gradient-to-r from-accent-dim to-accent rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </motion.div>
          </div>
        </div>

        {/* Parser terminal */}
        <div className="px-5 lg:px-6 py-3 border-t border-border-subtle bg-bg/30">
          <div className="flex items-center gap-2">
            <span className="text-accent font-mono text-[10px]">{'>'}</span>
            <motion.span
              key={parseLine}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] font-mono text-muted tracking-wide"
            >
              {ATS_PARSING_LINES[parseLine]}
            </motion.span>
          </div>
        </div>

        {/* Keywords injetadas */}
        <div className="px-5 lg:px-6 py-4 border-t border-border-subtle">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-mono text-faint uppercase tracking-widest">Keywords injetadas</p>
            <span className="text-[10px] font-mono text-success">+7</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {KEYWORDS.map((kw) => (
              <motion.span
                key={kw.label}
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: kw.delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="px-2 py-0.5 text-[10px] font-mono text-accent bg-accent/[0.08] border border-accent rounded-sm"
              >
                {kw.label}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating note — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.8, duration: 0.5 }}
        className="absolute -bottom-4 -left-2 lg:-bottom-5 lg:-left-4 bg-surface border border-border rounded-md px-3 py-2 shadow-xl hidden md:block"
      >
        <p className="text-[10px] font-mono text-faint uppercase tracking-widest">Análise concluída</p>
        <p className="text-[11px] text-text font-semibold mt-0.5">7 ajustes aplicados</p>
      </motion.div>
    </div>
  );
}
