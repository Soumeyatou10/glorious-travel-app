import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../core/directives/reveal.directive';

@Component({
  selector: 'gt-process',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
  <section class="section process">
    <div class="wrap">
      <div class="section-head center" gtReveal>
        <div class="eyebrow on-dark">Notre méthode</div>
        <h2>Un processus clair, en 4 étapes.</h2>
        <p>Pas de zone grise : vous savez toujours où en est votre dossier.</p>
      </div>
      <div class="proc-grid">
        @for (step of steps; track step.n; let i = $index) {
          <div class="proc-item" gtReveal [style.transitionDelay.s]="i * 0.08">
            <div class="proc-num">{{ step.n }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        }
      </div>
    </div>
  </section>
  `
})
export class ProcessComponent {
  steps = [
    { n: '01', title: 'Prise de contact', desc: "Un premier échange pour comprendre votre projet et vos objectifs." },
    { n: '02', title: 'Diagnostic', desc: "Analyse de votre profil et de vos chances selon la destination visée." },
    { n: '03', title: 'Constitution du dossier', desc: "Organisation des pièces avec une checklist claire et suivie." },
    { n: '04', title: 'Départ accompagné', desc: "Suivi jusqu'à la décision finale, puis assistance au départ." },
  ];
}
