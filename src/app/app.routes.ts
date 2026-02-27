import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';

export const routes: Routes = [
  { path: '', component: LandingPage },
  {
    path: 'feature-lab',
    loadComponent: () => import('./feature-lab/feature-lab').then(m => m.FeatureLabComponent)
  }
];
