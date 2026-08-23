import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicSiteService } from '../core/services/public-site.service';
import { RevealDirective } from '../core/directives/reveal.directive';
import { Faq } from '../core/models/models';

@Component({
  selector: 'gt-faq',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
  <section class="section faq" id="faq">
    <div class="wrap">
      <div class="section-head" gtReveal>
        <div class="eyebrow">Questions fréquentes</div>
        <h2>Vous vous posez sûrement ces questions.</h2>
      </div>
      <div class="faq-shell">
        <div class="faq-list" gtReveal>
          @for (f of faqs(); track f.id; let i = $index) {
            <details class="faq-item" [open]="i === 0">
              <summary><span>{{ f.question }}</span><span class="plus">+</span></summary>
              <div class="a">{{ f.answer }}</div>
            </details>
          } @empty {
            <p style="color:var(--ink-soft);">Aucune question publiée pour le moment.</p>
          }
        </div>
        <div class="faq-cta" gtReveal>
          <h3>Une autre question ?</h3>
          <p>Notre équipe est disponible pour répondre directement à vos préoccupations, sans engagement.</p>
          <a class="btn btn-primary" href="#contact" style="width:100%; justify-content:center;">Nous contacter ↗</a>
        </div>
      </div>
    </div>
  </section>
  `
})
export class FaqComponent implements OnInit {
  private publicSite = inject(PublicSiteService);
  faqs = signal<Faq[]>([]);

  ngOnInit(): void {
    this.publicSite.getFaqs().subscribe(list => this.faqs.set(list));
  }
}
