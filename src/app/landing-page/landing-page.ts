import { Component, signal, effect, ElementRef, viewChildren, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink, RouterLinkActive],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  // State for "The Lab" Simulator
  currentStep = signal<'IDLE' | 'SCANNING' | 'OPTIMIZING' | 'SUCCESS'>('IDLE');
  matchScore = signal(0);

  // State for Kanban Simulation
  vacancies = signal([
    { id: 1, title: 'Senior Product Designer', company: 'Linear', location: 'Remoto', status: 'inbox', tags: ['UX/UI', 'Figma'], salary: 'R$ 15k-22k' },
    { id: 2, title: 'Lead Frontend Engineer', company: 'Kore Labs', location: 'EUA (Remoto)', status: 'optimized', tags: ['Angular 20', 'Signals'], salary: '$ 8k-12k' },
    { id: 3, title: 'Senior Staff Engineer', company: 'Stripe', location: 'São Paulo', status: 'interview', tags: ['Java 21', 'Spring'], salary: 'R$ 25k+' },
    { id: 4, title: 'Backend Developer', company: 'Nubank', location: 'Híbrido', status: 'inbox', tags: ['Clojure', 'Kafka'], salary: 'R$ 12k-18k' },
    { id: 5, title: 'Mobile Specialist', company: 'Airbnb', location: 'Remoto', status: 'optimized', tags: ['React Native'], salary: '$ 7k-10k' }
  ]);

  columns = ['inbox', 'optimized', 'interview'];

  // State for FAQ
  openFaqIndex = signal<number | null>(null);

  // State for Demo Notification
  showDemoNotification = signal(false);
  isExitingDemoNotification = signal(false);

  // References for scroll reveal
  revealElements = viewChildren<ElementRef>('revealTrigger');

  constructor() {
    // Simulator loop
    this.startSimulator();

    // Effect to handle scroll reveal when elements are ready
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const elements = this.revealElements();
        if (elements.length > 0) {
          this.initScrollReveal(elements);
        }
      }
    });
  }

  triggerDemoNotification() {
    if (this.showDemoNotification()) return;

    this.showDemoNotification.set(true);
    this.isExitingDemoNotification.set(false);

    // Show for 4.2 seconds (extra margin for CSS bar completion)
    setTimeout(() => {
      this.closeDemoNotification();
    }, 4200);
  }

  closeDemoNotification() {
    if (this.isExitingDemoNotification()) return;

    this.isExitingDemoNotification.set(true);
    // Wait 800ms for the slower exit animation to finish
    setTimeout(() => {
      this.showDemoNotification.set(false);
      this.isExitingDemoNotification.set(false);
    }, 800);
  }

  ngAfterViewInit() {
    // Basic init if needed
  }

  private startSimulator() {
    setInterval(() => {
      const transitions: Record<string, 'IDLE' | 'SCANNING' | 'OPTIMIZING' | 'SUCCESS'> = {
        'IDLE': 'SCANNING',
        'SCANNING': 'OPTIMIZING',
        'OPTIMIZING': 'SUCCESS',
        'SUCCESS': 'IDLE'
      };

      this.currentStep.update(prev => transitions[prev]);

      if (this.currentStep() === 'SUCCESS') {
        this.animateScore();
      } else {
        this.matchScore.set(0);
      }
    }, 4000);
  }

  private animateScore() {
    let score = 0;
    const interval = setInterval(() => {
      if (score < 98) {
        score++;
        this.matchScore.set(score);
      } else {
        clearInterval(interval);
      }
    }, 20);
  }

  private initScrollReveal(elements: readonly ElementRef[]) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el.nativeElement));
  }

  toggleFaq(index: number) {
    this.openFaqIndex.update(current => current === index ? null : index);
  }

  getVacanciesByStatus(status: string) {
    return this.vacancies().filter(v => v.status === status);
  }

  onDragStart(event: DragEvent, vacancyId: number) {
    event.dataTransfer?.setData('text/plain', vacancyId.toString());
    if (event.target instanceof HTMLElement) {
      event.target.classList.add('dragging');
    }
  }

  onDragEnd(event: DragEvent) {
    if (event.target instanceof HTMLElement) {
      event.target.classList.remove('dragging');
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, newStatus: string) {
    event.preventDefault();
    const id = Number(event.dataTransfer?.getData('text/plain'));
    this.vacancies.update(list =>
      list.map(v => v.id === id ? { ...v, status: newStatus } : v)
    );
  }

  scrollTo(selector: string) {
    const element = document.querySelector(selector);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  private router = inject(Router);

  async navigateAndScroll(selector: string) {
    if (this.router.url !== '/') {
      await this.router.navigate(['/']);
      // Give time for the landing page to render
      setTimeout(() => this.scrollTo(selector), 100);
    } else {
      this.scrollTo(selector);
    }
  }
}
