import { Component, inject, signal, PLATFORM_ID, AfterViewInit, effect, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

type Theme = 'light' | 'dark' | 'system';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div class="bg-kore-black/40 backdrop-blur-3xl border border-kore-white/10 rounded-2xl px-4 md:px-8 py-4 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-500">
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold tracking-tighter text-kore-white cursor-pointer flex items-center select-none group" routerLink="/">
            KORE<span class="text-kore-blue group-hover:text-kore-cyan transition-colors animate-blink">_</span>
          </span>
        </div>

        <!-- Desktop Links -->
        <div class="hidden xl:flex items-center gap-8">
          <a (click)="navigateAndScroll('#lab')" [class.active-nav]="activeSection() === 'lab'" class="nav-link !text-[10px]">Simulador</a>
          <a (click)="navigateAndScroll('#command-center')" [class.active-nav]="activeSection() === 'command-center'" class="nav-link !text-[10px]">Vagas</a>
          <a (click)="navigateAndScroll('#features')" [class.active-nav]="activeSection() === 'features'" class="nav-link !text-[10px]">Recursos</a>
          <a (click)="navigateAndScroll('#byok')" [class.active-nav]="activeSection() === 'byok'" class="nav-link !text-[10px]">Segurança</a>
          <a (click)="navigateAndScroll('#pricing')" [class.active-nav]="activeSection() === 'pricing'" class="nav-link !text-[10px]">Preços</a>
          <a (click)="navigateAndScroll('#roadmap')" [class.active-nav]="activeSection() === 'roadmap'" class="nav-link !text-[10px]">Roadmap</a>
        </div>

        <div class="flex items-center gap-3">
          <!-- Theme Dropdown -->
          <div class="relative dropdown-container">
            <button (click)="toggleDropdown($event)" 
                    class="h-[44px] px-6 bg-kore-black/20 border border-kore-white/10 text-kore-white rounded-xl font-bold flex items-center gap-3 hover:bg-kore-white/5 transition-all active:scale-95 text-[10px] uppercase tracking-widest min-w-[140px] justify-between">
              <span class="flex items-center gap-2">
                @if (currentTheme() === 'light') {
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.72-12.72l-1.41 1.41"/></svg>
                } @else if (currentTheme() === 'dark') {
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                } @else {
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="20" height="14" x="2" r="2"/><path d="M8 21h8m-4-4v4"/></svg>
                }
                {{ currentTheme() === 'system' ? 'Sistema' : currentTheme() === 'light' ? 'Claro' : 'Escuro' }}
              </span>
              <svg class="w-3 h-3 transition-transform" [class.rotate-180]="isDropdownOpen()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>
            </button>

            @if (isDropdownOpen()) {
              <div class="absolute top-full mt-2 right-0 w-full bg-kore-zinc border border-kore-white/10 rounded-xl overflow-hidden shadow-2xl z-[60] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                <button (click)="setTheme('light')" class="w-full px-4 py-3 text-left text-[10px] uppercase tracking-widest font-bold text-kore-white hover:bg-kore-blue hover:text-white transition-colors flex items-center gap-3">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.72-12.72l-1.41 1.41"/></svg>
                  Claro
                </button>
                <button (click)="setTheme('dark')" class="w-full px-4 py-3 text-left text-[10px] uppercase tracking-widest font-bold text-kore-white hover:bg-kore-blue hover:text-white transition-colors flex items-center gap-3">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                  Escuro
                </button>
                <button (click)="setTheme('system')" class="w-full px-4 py-3 text-left text-[10px] uppercase tracking-widest font-bold text-kore-white hover:bg-kore-blue hover:text-white transition-colors flex items-center gap-3 border-t border-kore-white/5">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="20" height="14" x="2" r="2"/><path d="M8 21h8m-4-4v4"/></svg>
                  Sistema
                </button>
              </div>
            }
          </div>

          <button (click)="navigateAndScroll('#cta')" class="h-[44px] px-8 bg-kore-white text-kore-black text-[10px] font-bold rounded-xl hover:scale-105 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 border-none">
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
  currentTheme = signal<Theme>('dark');
  isDropdownOpen = signal(false);
  private observer: IntersectionObserver | null = null;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.isDropdownOpen.set(false);
    }
  }

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
      
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

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.applyTheme(this.currentTheme());
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollSpy();
    }
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('kore-theme') as Theme;
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    } else {
      this.currentTheme.set('dark');
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update(v => !v);
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    localStorage.setItem('kore-theme', theme);
    this.isDropdownOpen.set(false);
  }

  private applyTheme(theme: Theme) {
    const html = document.documentElement;
    let isDark = theme === 'dark';

    if (theme === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (isDark) {
      html.classList.remove('light');
    } else {
      html.classList.add('light');
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
