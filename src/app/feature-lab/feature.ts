import { Injectable, signal, computed } from '@angular/core';

export type FeatureStatus = 'backlog' | 'analysis' | 'development' | 'done';

export interface Feature {
  id: string;
  title: string;
  description: string;
  likes: number;
  status: FeatureStatus;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private features = signal<Feature[]>([
    {
      id: '1',
      title: 'Integração Nativa com LinkedIn',
      description: 'Sincronizar currículos e candidaturas diretamente do perfil LinkedIn.',
      likes: 142,
      status: 'development',
      createdAt: new Date('2026-02-10')
    },
    {
      id: '2',
      title: 'Dark Mode Nativo no Gerador de PDF',
      description: 'Opção de exportar o currículo com temas escuros e modernos.',
      likes: 15,
      status: 'backlog',
      createdAt: new Date('2026-02-15')
    },
    {
      id: '3',
      title: 'Agente Autônomo de Candidatura',
      description: 'IA que aplica para vagas automaticamente baseada em critérios de match.',
      likes: 89,
      status: 'analysis',
      createdAt: new Date('2026-02-01')
    },
    {
      id: '4',
      title: 'Modelo BYOK para Anthropic/Claude',
      description: 'Suporte para chaves da Anthropic além da OpenAI.',
      likes: 27,
      status: 'done',
      createdAt: new Date('2026-01-20')
    },
    {
      id: '5',
      title: 'Extensão Chrome para Auto-Tagging',
      description: 'Detectar tecnologias da vaga diretamente no navegador.',
      likes: 56,
      status: 'backlog',
      createdAt: new Date('2026-02-20')
    }
  ]);

  allFeatures = computed(() => this.features());

  addSuggestion(title: string, description: string) {
    const newFeature: Feature = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      title,
      description,
      likes: 0,
      status: 'backlog',
      createdAt: new Date()
    };
    this.features.update(prev => [...prev, newFeature]);
  }

  vote(id: string) {
    this.features.update(prev => 
      prev.map(f => f.id === id ? { ...f, likes: f.likes + 1 } : f)
    );
  }

  updateStatus(id: string, status: FeatureStatus) {
    this.features.update(prev => 
      prev.map(f => f.id === id ? { ...f, status } : f)
    );
  }
}
