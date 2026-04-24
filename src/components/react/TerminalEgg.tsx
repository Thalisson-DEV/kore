import React, { useState, useEffect, useRef } from 'react';

const commands: Record<string, string[]> = {
  'kore --version': ['KORE_ENGINE v2.0.4', 'Build: 2026.04.24-stable', 'Kernel: Semantic_Vector_Core'],
  'kore status': ['● Motor ATS: ONLINE', '● Criptografia: AES-256-GCM ACTIVE', '● BYOK Bridge: READY', '● Vagas Sincronizadas: 1.422 (cache)'],
  'kore help': ['Comandos disponíveis:', '  kore --version', '  kore status', '  kore help', '  clear', '  exit'],
  'clear': []
};

export default function TerminalEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(['Digite "kore help" para começar.']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (cmd === 'exit') {
      setIsOpen(false);
      setInput('');
      return;
    }

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const output = commands[cmd] || [`Erro: Comando "${cmd}" não encontrado.`];
    setHistory(prev => [...prev, `> ${input}`, ...output]);
    setInput('');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="text-[10px] font-mono text-success uppercase tracking-wider flex items-center gap-1.5 hover:opacity-80 transition-opacity"
      >
        <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
        Stable_V2
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-80 md:w-96 bg-bg border border-accent/30 rounded-sm shadow-2xl z-[100] overflow-hidden">
      <div className="bg-surface/80 border-b border-border-subtle p-3 flex items-center justify-between">
        <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest">Kore_Terminal</span>
        <button onClick={() => setIsOpen(false)} className="text-muted hover:text-danger font-mono text-xs">×</button>
      </div>
      <div className="h-64 p-4 font-mono text-[11px] overflow-y-auto bg-bg/95">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-accent mt-2' : line.startsWith('Erro') ? 'text-danger' : 'text-muted'}>
            {line}
          </div>
        ))}
        <form onSubmit={handleCommand} className="mt-4 flex gap-2">
          <span className="text-accent">$</span>
          <input 
            autoFocus
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-text flex-grow"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
