import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { FeatureService, FeatureStatus, Feature } from './feature';

@Component({
  selector: 'app-feature-lab',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './feature-lab.html',
  styleUrl: './feature-lab.css'
})
export class FeatureLabComponent {
  private featureService = inject(FeatureService);

  // State
  isAdminMode = signal(false);
  showSuggestionForm = signal(false);
  likedFeatures = signal<Set<string>>(new Set());

  // Form Data
  newTitle = '';
  newDescription = '';

  // Data from Service
  allFeatures = this.featureService.allFeatures;

  // Stats
  totalFeatures = computed(() => this.allFeatures().length);
  totalVotes = computed(() => this.allFeatures().reduce((acc, f) => acc + f.likes, 0));
  completedFeatures = computed(() => this.allFeatures().filter(f => f.status === 'done').length);
  topVotedFeature = computed(() => {
    const sorted = [...this.allFeatures()].sort((a, b) => b.likes - a.likes);
    return sorted.length > 0 ? sorted[0].title : 'N/A';
  });

  columns: { key: FeatureStatus; label: string; color: string }[] = [
    { key: 'backlog', label: 'Ideias / Backlog', color: 'text-zinc-500' },
    { key: 'analysis', label: 'Em Análise', color: 'text-indigo-600' },
    { key: 'development', label: 'Desenvolvendo', color: 'text-amber-600' },
    { key: 'done', label: 'Concluído', color: 'text-emerald-600' }
  ];

  toggleAdminMode() {
    this.isAdminMode.update(v => !v);
  }

  submitSuggestion() {
    if (this.newTitle.trim() && this.newDescription.trim()) {
      this.featureService.addSuggestion(this.newTitle, this.newDescription);
      this.newTitle = '';
      this.newDescription = '';
      this.showSuggestionForm.set(false);
    }
  }

  likeFeature(id: string) {
    if (this.likedFeatures().has(id)) return;

    this.featureService.vote(id);
    this.likedFeatures.update(set => {
      const newSet = new Set(set);
      newSet.add(id);
      return newSet;
    });
  }

  isLiked(id: string) {
    return this.likedFeatures().has(id);
  }

  getFeaturesByStatus(status: FeatureStatus) {
    return this.allFeatures()
      .filter(f => f.status === status)
      .sort((a, b) => b.likes - a.likes);
  }

  // Drag & Drop
  onDragStart(event: DragEvent, featureId: string) {
    if (!this.isAdminMode()) return;
    event.dataTransfer?.setData('text/plain', featureId);
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
    if (!this.isAdminMode()) return;
    event.preventDefault();
  }

  onDrop(event: DragEvent, newStatus: FeatureStatus) {
    if (!this.isAdminMode()) return;
    event.preventDefault();
    const id = event.dataTransfer?.getData('text/plain');
    if (id) {
      this.featureService.updateStatus(id, newStatus);
    }
  }
}
