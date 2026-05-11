import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

const STATS: Stat[] = [
  { label: 'Score médio antes', value: 42, suffix: '/100' },
  { label: 'Score médio depois', value: 86, suffix: '/100' },
  { label: 'Tempo médio', value: 6, suffix: ' min' },
];

const TOTAL_SEATS = 100;

export function CountUp({ to, suffix = '', duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}{suffix}
    </span>
  );
}

export default function FooterCtaVisual() {
  const [seats, setSeats] = useState(47);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const filled = TOTAL_SEATS - seats;
  const pct = Math.round((filled / TOTAL_SEATS) * 100);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setSeats((prev) => {
        if (prev <= 12) return prev;
        if (Math.random() > 0.65) return prev - 1;
        return prev;
      });
    }, 9000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="w-full flex flex-col items-center mb-14">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-3 px-4 py-2 mb-5 bg-danger/10 border border-danger rounded-full"
      >
        <span className="relative flex w-1.5 h-1.5">
          <span className="absolute inline-flex w-full h-full rounded-full bg-danger opacity-75 animate-ping" />
          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-danger" />
        </span>
        <span className="text-[11px] font-mono text-danger uppercase tracking-widest">
          <motion.span
            key={seats}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="inline-block font-bold tabular-nums"
          >
            {seats}
          </motion.span>{' '}
          vagas beta restantes
        </span>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="w-full max-w-xs"
      >
        <div className="w-full h-[3px] bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-danger rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: `${pct}%` } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[9px] font-mono text-faint uppercase tracking-wider">0</span>
          <span className="text-[9px] font-mono text-danger uppercase tracking-wider">{pct}% preenchido</span>
          <span className="text-[9px] font-mono text-faint uppercase tracking-wider">100</span>
        </div>
      </motion.div>
    </div>
  );
}

export function FooterStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-3 divide-x divide-border-subtle border border-border-subtle rounded-lg overflow-hidden">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="px-4 py-6 flex flex-col items-center text-center"
          >
            <span className="text-3xl md:text-4xl font-bold font-mono text-text tracking-tighter leading-none">
              <CountUp to={s.value} suffix={s.suffix} />
            </span>
            <span className="text-[10px] font-mono text-faint uppercase tracking-widest mt-3">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
