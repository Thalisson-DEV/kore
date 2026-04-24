import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tags = ['+Angular Signals', '+JIT Decryption', '+Tech-Mineral UI', '+Semantic Search', '+Vector Injection'];

export default function LabSimulator() {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsProcessing(true);
    setProgress(0);
    setShowResults(false);
    setScore(0);
  };

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            setShowResults(true);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  // 3.2 Elastic Counter Effect
  useEffect(() => {
    if (showResults) {
      const targetScore = Math.floor(Math.random() * (85 - 85 + 1) + 85);
      const duration = 2000;
      const startTime = performance.now();

      const animate = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1);
        // Easing with overshoot: elastic-out
        const ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t) * Math.cos((t * 5 - 0.75) * (2 * Math.PI) / 3);
        setScore(Math.round(ease * targetScore));
        
        if (t < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [showResults]);

  return (
    <section id="lab" className="section-gap bg-bg reveal">
      <div className="container-kore">
        <div className="divider-label mb-24">
          <span className="w-12 h-[1px] bg-border"></span>
          LAB SIMULATOR
          <span className="flex-grow h-[1px] bg-border"></span>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-section mb-10 leading-tight">O motor que vence o silêncio do RH<span className="text-accent">.</span></h2>
            <p className="text-body text-muted mb-12 max-w-lg leading-relaxed">
              Cole a URL de uma vaga técnica e veja nossa infraestrutura decompor os requisitos algorítmicos e injetar os vetores semânticos necessários para sua aprovação.
            </p>

            <form onSubmit={handleSimulate} className="relative max-w-lg">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://linkedin.com/jobs/..."
                className="w-full px-6 py-5 bg-surface border border-border rounded-sm text-caption outline-none focus:border-accent transition-all font-mono tracking-tight"
              />
              <button
                type="submit"
                disabled={isProcessing || !url}
                className="btn-primary absolute right-3 top-3 px-6 py-2.5 text-bg text-[10px] font-bold rounded-sm transition-all disabled:opacity-50 uppercase tracking-widest"
              >
                {isProcessing ? 'SCANNING...' : 'SIMULAR'}
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-3">
              <AnimatePresence>
                {isProcessing && (
                  <>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="px-3 py-1 bg-surface border border-success/30 text-success text-[10px] font-mono rounded-full flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-success rounded-full animate-pulse"></span>
                      Scanner Ativo
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      exit={{ opacity: 0 }}
                      className="px-3 py-1 bg-surface border border-accent/30 text-accent text-[10px] font-mono rounded-full flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
                      Aplicando Vetores Semânticos
                    </motion.span>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative bg-surface/50 border border-border rounded-lg pt-10 pb-10 pl-8 pr-8 flex flex-col justify-center hatch-bg overflow-hidden">
            {isProcessing && (
              <div className="space-y-6 w-full">
                <div className="flex justify-between text-mono text-[10px] text-accent mb-2">
                  <span>ANALYZING_DATA_STRUCTURE</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, Math.floor(progress / 20)).map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-[10px] font-mono text-muted"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {showResults && !isProcessing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="inline-block relative mb-4">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-border"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray="377"
                      initial={{ strokeDashoffset: 377 }}
                      animate={{ strokeDashoffset: 377 - (377 * score) / 100 }}
                      className="text-accent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold tracking-tighter">{score}</span>
                    <span className="text-[8px] font-mono text-muted uppercase">ATS Score</span>
                  </div>
                </div>
                <p className="text-caption text-success font-mono">● OPTIMIZATION_COMPLETE</p>
                <p className="text-[10px] text-muted mt-2 max-w-[200px] mx-auto uppercase">Aderência técnica validada.</p>
              </motion.div>
            )}

            {!isProcessing && !showResults && (
              <div className="text-center opacity-30">
                <p className="text-mono text-[10px] uppercase tracking-widest italic">Aguardando Input...</p>
              </div>
            )}

            {/* Decorative Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-5 border-[0.5px] border-text/10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
