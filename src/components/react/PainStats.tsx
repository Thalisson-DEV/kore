import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CountUp } from './FooterCtaVisual';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  hint: string;
}

const STATS: Stat[] = [
  {
    value: 88,
    suffix: '%',
    label: 'dos CVs descartados',
    hint: 'antes do RH abrir',
  },
  {
    value: 6,
    suffix: 's',
    label: 'tempo médio de leitura',
    hint: 'por currículo aprovado',
  },
  {
    value: 3,
    prefix: '~',
    label: 'respostas em 50',
    hint: 'candidaturas qualificadas',
  },
];

export default function PainStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-subtle border border-border-subtle">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] }}
          className="bg-bg p-8 md:p-10 flex flex-col items-start"
        >
          <span className="text-[10px] font-mono text-faint uppercase tracking-widest mb-4">
            stat_{String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-5xl md:text-6xl font-bold font-mono text-text tracking-tighter leading-none">
            <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
          </span>
          <span className="text-sm text-text font-medium mt-4">{s.label}</span>
          <span className="text-xs text-faint mt-1">{s.hint}</span>
        </motion.div>
      ))}
    </div>
  );
}
