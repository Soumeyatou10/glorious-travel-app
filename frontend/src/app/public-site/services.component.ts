import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicSiteService } from '../core/services/public-site.service';
import { RevealDirective } from '../core/directives/reveal.directive';
import { ServiceItem } from '../core/models/models';

@Component({
  selector: 'gt-services',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
  <section class="section services" id="services">
    <div class="wrap">
      <div class="section-head center" gtReveal>
        <div class="eyebrow">Nos services</div>
        <h2>Un accompagnement complet, à chaque étape.</h2>
        <p>De la première évaluation jusqu'à votre installation, nous structurons votre projet pour éviter les mauvaises surprises.</p>
      </div>
      <div class="svc-grid">
        @for (svc of services(); track svc.id; let i = $index) {
          <div class="svc-card" gtReveal [style.transitionDelay.s]="i * 0.08">
            <div class="svc-ic">{{ svc.icon || '◈' }}</div>
            <h3>{{ svc.title }}</h3>
            <p>{{ svc.description }}</p>
            <a href="#contact">En savoir plus →</a>
          </div>
        } @empty {
          <p style="color:var(--ink-soft);">Aucun service publié pour le moment — ajoutez-en depuis l'espace admin.</p>
        }
      </div>
    </div>
  </section>
  `
})
export class ServicesComponent implements OnInit {
  private publicSite = inject(PublicSiteService);
  services = signal<ServiceItem[]>([]);

  ngOnInit(): void {
    this.publicSite.getServices().subscribe(list => this.services.set(list));
  }
}
