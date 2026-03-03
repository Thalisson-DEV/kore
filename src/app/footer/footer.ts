import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="w-full py-20 border-t border-kore-steel/10 bg-kore-black/5 dark:bg-kore-slate transition-colors overflow-hidden relative">
      <!-- Decorative Background Detail -->
      <div class="absolute bottom-0 right-0 p-4 opacity-5 hidden md:block">
        <span class="text-[120px] font-bold tracking-tighter text-kore-steel uppercase select-none">KORE_</span>
      </div>

      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <!-- Column 1: Brand & Social -->
          <div class="flex flex-col gap-6">
            <span class="text-2xl font-bold tracking-tighter text-kore-white">
              KORE<span class="text-kore-blue">_</span>
            </span>
            <p class="text-slate-400 text-sm leading-relaxed max-w-[200px] font-medium">
              Autonomia técnica e inteligência para profissionais de alta performance.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 rounded-xl bg-kore-blue/5 border border-kore-blue/10 flex items-center justify-center text-kore-steel hover:text-kore-blue transition-all group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-xl bg-kore-blue/5 border border-kore-blue/10 flex items-center justify-center text-kore-steel hover:text-kore-blue transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </a>
            </div>
          </div>

          <!-- Column 2: Navigation -->
          <div>
            <h4 class="text-kore-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Navegação</h4>
            <ul class="flex flex-col gap-4 text-sm font-medium text-slate-400">
              <li><a href="#lab" class="hover:text-kore-blue transition-colors">Simulador IA</a></li>
              <li><a href="#command-center" class="hover:text-kore-blue transition-colors">Gestão de Vagas</a></li>
              <li><a href="#features" class="hover:text-kore-blue transition-colors">Recursos</a></li>
              <li><a href="#roadmap" class="hover:text-kore-blue transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <!-- Column 3: Labs -->
          <div>
            <h4 class="text-kore-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Labs</h4>
            <ul class="flex flex-col gap-4 text-sm font-medium text-slate-400">
              <li><a routerLink="/feature-lab" class="hover:text-kore-blue transition-colors flex items-center gap-2">
                Feature Lab <span class="text-[8px] bg-kore-blue/10 px-1.5 py-0.5 rounded border border-kore-blue/20">BETA</span>
              </a></li>
              <li><a href="#" class="hover:text-kore-blue transition-colors opacity-50 cursor-not-allowed">API Docs</a></li>
            </ul>
          </div>

          <!-- Column 4: Legal -->
          <div>
            <h4 class="text-kore-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Privacidade</h4>
            <ul class="flex flex-col gap-4 text-sm font-medium text-slate-400">
              <li><a href="#" class="hover:text-kore-blue transition-colors">Privacidade</a></li>
              <li><a href="#" class="hover:text-kore-blue transition-colors">Termos</a></li>
              <li><a href="#" class="hover:text-kore-blue transition-colors">Política BYOK</a></li>
            </ul>
          </div>

        </div>

        <div class="pt-8 border-t border-kore-steel/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-slate-400 text-[10px] font-bold tracking-tighter uppercase">
            © 2026 KORE_ LABS. PLATAFORMA ESTRATÉGICA PARA O PROFISSIONAL GLOBAL.
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span class="text-slate-400 text-[10px] font-mono font-bold uppercase tracking-widest">Global_Status: Stable</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class FooterComponent {}
