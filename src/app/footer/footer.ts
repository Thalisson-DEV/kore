import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="w-full py-20 border-t border-kore-steel/10 bg-white dark:bg-kore-slate transition-colors overflow-hidden relative">
      <!-- Decorative Background Detail -->
      <div class="absolute bottom-0 right-0 p-4 opacity-5 hidden md:block">
        <span class="text-[120px] font-bold tracking-tighter text-kore-steel uppercase select-none">KORE_</span>
      </div>

      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <!-- Column 1: Brand & Social -->
          <div class="flex flex-col gap-6">
            <span class="text-2xl font-bold tracking-tighter text-kore-slate dark:text-kore-ice">
              KORE<span class="text-kore-blue">_</span>
            </span>
            <p class="text-kore-steel text-sm leading-relaxed max-w-[200px]">
              Soberania técnica e inteligência para profissionais de elite.
            </p>
            <div class="flex gap-4">
              <!-- Instagram Mock -->
              <a href="#" class="w-10 h-10 rounded-xl bg-kore-steel/5 flex items-center justify-center text-kore-steel hover:text-kore-blue hover:bg-kore-blue/5 transition-all group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <!-- X Mock -->
              <a href="#" class="w-10 h-10 rounded-xl bg-kore-steel/5 flex items-center justify-center text-kore-steel hover:text-kore-blue hover:bg-kore-blue/5 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </a>
              <!-- LinkedIn Mock -->
              <a href="#" class="w-10 h-10 rounded-xl bg-kore-steel/5 flex items-center justify-center text-kore-steel hover:text-kore-blue hover:bg-kore-blue/5 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          <!-- Column 2: Navigation -->
          <div>
            <h4 class="text-kore-slate dark:text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Navegação</h4>
            <ul class="flex flex-col gap-4 text-sm font-medium text-kore-steel">
              <li><a href="#lab" class="hover:text-kore-blue transition-colors">Simulador IA</a></li>
              <li><a href="#command-center" class="hover:text-kore-blue transition-colors">Gestão de Vagas</a></li>
              <li><a href="#features" class="hover:text-kore-blue transition-colors">Arsenal Tecnológico</a></li>
              <li><a href="#roadmap" class="hover:text-kore-blue transition-colors">Trilha de Evolução</a></li>
            </ul>
          </div>

          <!-- Column 3: Labs -->
          <div>
            <h4 class="text-kore-slate dark:text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Labs</h4>
            <ul class="flex flex-col gap-4 text-sm font-medium text-kore-steel">
              <li><a routerLink="/feature-lab" class="hover:text-kore-blue transition-colors flex items-center gap-2">
                Feature Lab <span class="text-[8px] bg-kore-blue/10 px-1.5 py-0.5 rounded border border-kore-blue/20">BETA</span>
              </a></li>
              <li><a href="#" class="hover:text-kore-blue transition-colors opacity-50 cursor-not-allowed">API Docs</a></li>
              <li><a href="#" class="hover:text-kore-blue transition-colors opacity-50 cursor-not-allowed">Red Team Blog</a></li>
            </ul>
          </div>

          <!-- Column 4: Legal -->
          <div>
            <h4 class="text-kore-slate dark:text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Soberania</h4>
            <ul class="flex flex-col gap-4 text-sm font-medium text-kore-steel">
              <li><a href="#" class="hover:text-kore-blue transition-colors">Privacidade de Dados</a></li>
              <li><a href="#" class="hover:text-kore-blue transition-colors">Termos de Serviço</a></li>
              <li><a href="#" class="hover:text-kore-blue transition-colors">Política BYOK</a></li>
            </ul>
          </div>

        </div>

        <div class="pt-8 border-t border-kore-steel/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-kore-steel text-[10px] font-bold tracking-tighter uppercase">
            © 2026 KORE_ LABS. SISTEMA DE DEFESA DO CANDIDATO ALPHA.
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span class="text-kore-steel text-[10px] font-mono font-bold uppercase tracking-widest">Global_Status: Stable</span>
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
