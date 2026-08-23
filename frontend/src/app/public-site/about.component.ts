import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../core/directives/reveal.directive';

@Component({
  selector: 'gt-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
  <section class="section about tight" id="apropos">
    <div class="wrap about-grid">
      <div class="about-photo-stack" gtReveal>
        <div class="p1"><img src="https://images.unsplash.com/photo-1522199873717-bc67b1a5e32b?auto=format&fit=crop&w=900&q=80" alt="Équipe Glorious Travel"></div>
        <div class="about-float">
          <div class="ic">◍</div>
          <div><b>1200+</b><span>Clients accompagnés</span></div>
        </div>
      </div>
      <div class="about-copy" gtReveal>
        <div class="eyebrow">À propos de nous</div>
        <h2 style="font-size:clamp(25px,3.2vw,36px); color:var(--heading); margin-bottom:18px;">Une agence familiale, un accompagnement de niveau professionnel.</h2>
        <p>Glorious Travel & Services est née à Douala d'une conviction simple : partir à l'étranger ne devrait jamais être un parcours flou. Depuis 2016, nous accompagnons étudiants, professionnels et familles dans la construction de dossiers solides.</p>
        <p>Notre équipe combine une bonne connaissance des procédures d'immigration et un vrai suivi de proximité, avec la rigueur d'une agence structurée.</p>
        <div class="about-list">
          <div><span class="chk">✓</span> Diagnostic personnalisé</div>
          <div><span class="chk">✓</span> Suivi transparent du dossier</div>
          <div><span class="chk">✓</span> Équipe basée à Douala</div>
          <div><span class="chk">✓</span> Accompagnement au départ</div>
        </div>
      </div>
    </div>
  </section>
  `
})
export class AboutComponent {}
