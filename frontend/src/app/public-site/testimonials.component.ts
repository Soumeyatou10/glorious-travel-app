import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicSiteService } from '../core/services/public-site.service';
import { RevealDirective } from '../core/directives/reveal.directive';
import { MediaUrlPipe } from '../core/pipes/media-url.pipe';
import { Testimonial } from '../core/models/models';

@Component({
  selector: 'gt-testimonials',
  standalone: true,
  imports: [CommonModule, RevealDirective, MediaUrlPipe],
  template: `
  <section class="section testi" id="temoignages">
    <div class="wrap">
      <div class="section-head center" gtReveal>
        <div class="eyebrow">Témoignages</div>
        <h2>Des visas obtenus. Des départs accompagnés.</h2>
        <p>Les visages sont volontairement masqués afin de protéger l'identité de nos clients.</p>
      </div>
      <div class="proof-grid">
        @for (t of testimonials(); track t.id; let i = $index) {
          <div class="proof-card" gtReveal [style.transitionDelay.s]="i * 0.08">
            <img [src]="t.imageUrl | mediaUrl" [alt]="t.clientLabel">
            <div class="stamp">Visa<br>obtenu</div>
            <div class="proof-cap"><b>{{ t.clientLabel }}</b><span>{{ t.caption }}</span></div>
          </div>
        } @empty {
          <p style="color:rgba(255,255,255,0.6);">Aucun témoignage publié pour le moment.</p>
        }
      </div>
    </div>
  </section>
  `
})
export class TestimonialsComponent implements OnInit {
  private publicSite = inject(PublicSiteService);
  testimonials = signal<Testimonial[]>([]);

  ngOnInit(): void {
    this.publicSite.getTestimonials().subscribe(list => this.testimonials.set(list));
  }
}
