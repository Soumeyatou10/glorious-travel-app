import { Injectable, signal, effect } from '@angular/core';

/**
 * Gere le mode sombre/clair du site public. Le site s'ouvre TOUJOURS en mode
 * clair par defaut (comme demande) ; c'est a la personne de basculer elle-meme
 * en mode sombre via le bouton. Le choix n'est pas mémorisé entre visites,
 * conformement au meme comportement que la maquette.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.theme());
    });
  }

  toggle(): void {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }
}
