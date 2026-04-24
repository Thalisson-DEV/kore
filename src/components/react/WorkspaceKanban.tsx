import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

interface JobCard {
  id: string;
  company: string;
  role: string;
  stack: string[];
  salary: string;
}

const INITIAL_DATA: Record<string, JobCard[]> = {
  inbox: [
    { id: '1', company: 'Google', role: 'Staff Engineer', stack: ['Go', 'K8s'], salary: 'USD 240k' },
    { id: '2', company: 'Vercel', role: 'Frontend Architect', stack: ['Next.js', 'React'], salary: 'USD 180k' },
  ],
  optimized: [
    { id: '3', company: 'Stripe', role: 'Solutions Engineer', stack: ['Ruby', 'APIs'], salary: 'USD 190k' },
  ],
  interview: [
    { id: '4', company: 'OpenAI', role: 'Research Engineer', stack: ['Python', 'PyTorch'], salary: 'USD 300k' },
  ],
};

const COLUMN_NAMES: Record<string, string> = {
  inbox: 'Inbox',
  optimized: 'Otimizados',
  interview: 'Entrevistas',
};

export default function WorkspaceKanban() {
  const [columns, setColumns] = useState(INITIAL_DATA);

  const handleReorder = (columnId: string, newItems: JobCard[]) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: newItems
    }));
  };

  return (
    <section id="workspace" className="section-gap hatch-bg border-y border-border-subtle reveal">
      <div className="container-kore">
        <div className="divider-label mb-24">
          <span className="w-12 h-[1px] bg-border"></span>
          WORKSPACE CRM
          <span className="flex-grow h-[1px] bg-border"></span>
        </div>

        <div className="max-w-3xl mb-20">
          <h2 className="text-section mb-8 leading-tight">Sua central de comando estratégico<span className="text-accent">.</span></h2>
          <p className="text-body text-muted leading-relaxed max-w-xl">Gerencie suas candidaturas com a precisão e a física de um cockpit de elite. Reordene suas prioridades em tempo real.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(columns).map(([id, items]) => (
            <div key={id} className="bg-surface/30 border border-border p-6 rounded-sm flex flex-col min-h-[500px]">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-mono text-[10px] text-accent uppercase tracking-[0.2em] font-bold">{COLUMN_NAMES[id]}</h4>
                <span className="text-[10px] font-mono text-faint bg-bg px-2 py-0.5 rounded-full border border-border-subtle">{items.length}</span>
              </div>
              
              <Reorder.Group 
                axis="y" 
                values={items} 
                onReorder={(newOrder) => handleReorder(id, newOrder)}
                className="flex-grow space-y-4"
              >
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <Reorder.Item
                      key={item.id}
                      value={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <div className="p-5 bg-bg border border-border rounded-sm hover:border-accent/40 transition-colors shadow-sm group">
                        <div className="flex justify-between items-start mb-3">
                          <p className="text-[10px] font-mono text-muted uppercase group-hover:text-accent transition-colors">{item.company}</p>
                          <span className="text-[10px] font-mono text-accent/70">{item.salary}</span>
                        </div>
                        <h5 className="text-caption font-bold mb-5 tracking-tight">{item.role}</h5>
                        <div className="flex flex-wrap gap-2">
                          {item.stack.map(s => (
                            <span key={s} className="px-2 py-0.5 bg-surface border border-border text-[9px] font-mono text-muted rounded-sm">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
                {items.length === 0 && (
                  <div className="h-32 border border-dashed border-border rounded-sm flex items-center justify-center opacity-10">
                    <span className="text-[10px] font-mono uppercase tracking-widest">Lista Vazia</span>
                  </div>
                )}
              </Reorder.Group>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
