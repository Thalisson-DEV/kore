import { Component, inject, signal, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div class="bg-white/80 dark:bg-kore-slate/80 backdrop-blur-xl border border-kore-steel/20 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-kore-blue/5 transition-colors duration-500">
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold tracking-tighter text-kore-slate dark:text-kore-ice cursor-pointer flex items-center select-none" routerLink="/">
            KORE<span class="text-kore-blue animate-blink">_</span>
          </span>
        </div>

        <div class="hidden xl:flex items-center gap-6">
          <a (click)="navigateAndScroll('#lab')" [class.active-nav]="activeSection() === 'lab'" class="nav-link">Simulador</a>
          <a (click)="navigateAndScroll('#command-center')" [class.active-nav]="activeSection() === 'command-center'" class="nav-link">Vagas</a>
          <a (click)="navigateAndScroll('#features')" [class.active-nav]="activeSection() === 'features'" class="nav-link">Arsenal</a>
          <a (click)="navigateAndScroll('#byok')" [class.active-nav]="activeSection() === 'byok'" class="nav-link">Segurança</a>
          <a (click)="navigateAndScroll('#pricing')" [class.active-nav]="activeSection() === 'pricing'" class="nav-link">Preços</a>
          <a (click)="navigateAndScroll('#roadmap')" [class.active-nav]="activeSection() === 'roadmap'" class="nav-link">Roadmap</a>

          <div class="w-px h-4 bg-kore-steel/30 mx-1"></div>
          <a routerLink="/feature-lab" routerLinkActive="active-nav" class="nav-link font-bold text-kore-blue/80">Feature Lab</a>
        </div>

        <div class="flex items-center gap-3">
          <button (click)="navigateAndScroll('#cta')" class="bg-kore-slate dark:bg-white text-white dark:text-kore-slate text-[10px] font-bold px-5 py-2.5 rounded-xl hover:scale-105 transition-all uppercase tracking-tighter shadow-lg shadow-kore-blue/10">
            Acesso VIP
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .animate-blink {
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      50% { opacity: 0; }
    }
  `]
})
export class HeaderComponent implements AfterViewInit {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  activeSection = signal<string>('');
  private observer: IntersectionObserver | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        if (this.router.url === '/' || this.router.url === '/#') {
          setTimeout(() => this.initScrollSpy(), 500);
        } else {
          this.activeSection.set('');
        }
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollSpy();
    }
  }

  private initScrollSpy() {
    if (this.observer) this.observer.disconnect();

    const options = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0.01
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, options);

    const sections = ['lab', 'command-center', 'features', 'byok', 'roadmap', 'pricing'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.observer?.observe(el);
    });
  }

  async navigateAndScroll(selector: string) {
    const id = selector.replace('#', '');
    if (this.router.url.split('#')[0] !== '/') {
      await this.router.navigate(['/']);
      setTimeout(() => {
        this.scrollTo(selector);
        this.activeSection.set(id);
      }, 300);
    } else {
      this.scrollTo(selector);
      this.activeSection.set(id);
    }
  }

  scrollTo(selector: string) {
    const element = document.querySelector(selector);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }
}
