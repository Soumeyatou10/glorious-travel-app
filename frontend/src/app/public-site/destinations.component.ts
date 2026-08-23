import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicSiteService } from '../core/services/public-site.service';
import { RevealDirective } from '../core/directives/reveal.directive';
import { MediaUrlPipe } from '../core/pipes/media-url.pipe';
import { Destination } from '../core/models/models';

@Component({
  selector: 'gt-destinations',
  standalone: true,
  imports: [CommonModule, RevealDirective, MediaUrlPipe],
  template: `
  <section class="section destinations" id="destinations">
    <div class="wrap">
      <div class="section-head center" gtReveal>
        <div class="eyebrow">Destinations</div>
        <h2>Où souhaitez-vous aller ?</h2>
        <p>Chaque destination est accompagnée d'un dossier type et d'un conseiller dédié à votre profil.</p>
      </div>
      <div class="dest-grid">
        @for (d of destinations(); track d.id; let i = $index) {
          <div class="dcard" gtReveal [style.transitionDelay.s]="i * 0.08">
            <img [src]="d.imageUrl | mediaUrl" [alt]="d.name">
            <div class="dcard-body">
              <span class="dcard-tag">{{ d.region }}</span>
              <h3>{{ d.name }}</h3>
              <p>{{ d.shortDescription }}</p>
              <a class="dcard-link" href="#contact">Découvrir →</a>
            </div>
          </div>
        } @empty {
          <p style="color:rgba(255,255,255,0.6);">Aucune destination publiée pour le moment — ajoutez-en depuis l'espace admin.</p>
        }
      </div>
      <div class="view-all-wrap" gtReveal><a class="btn btn-outline" href="#contact">Voir toutes les destinations →</a></div>
    </div>
  </section>
  `
})
export class DestinationsComponent implements OnInit {
  private publicSite = inject(PublicSiteService);
  destinations = signal<Destination[]>([]);

  ngOnInit(): void {
    this.publicSite.getDestinations().subscribe(list => this.destinations.set(list));
  }
}
