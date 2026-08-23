import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicSiteService } from '../core/services/public-site.service';
import { SiteSettings } from '../core/models/models';

@Component({
  selector: 'gt-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
  <footer>
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <img src="assets/glorious-travel-logo.png" alt="Glorious Travel">
          <p>Votre partenaire de confiance pour vos projets de mobilité internationale. Voyagez. Réalisez. Avancez.</p>
          <div class="foot-social">
            <a [href]="'https://wa.me/' + waNumber()" target="_blank" rel="noopener" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.42a9.9 9.9 0 0 0 4.62 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-7C17.17 3.03 14.69 2 12.04 2m0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.55-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.25-4.37c0-4.55 3.7-8.25 8.24-8.25m-3.34 4.36c-.17 0-.44.06-.67.32-.23.25-.87.86-.87 2.09 0 1.23.9 2.42 1.02 2.58.12.17 1.75 2.78 4.32 3.79 2.13.84 2.57.67 3.03.63.47-.04 1.5-.61 1.71-1.2.21-.59.21-1.1.15-1.2-.06-.11-.23-.17-.47-.29-.25-.13-1.5-.74-1.73-.82-.23-.09-.4-.13-.57.12-.17.26-.65.83-.8 1-.15.17-.29.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.15.16-.26.24-.43.08-.17.04-.32-.02-.44-.06-.13-.57-1.4-.8-1.91-.2-.48-.4-.44-.57-.45l-.48-.02Z"/></svg>
            </a>
            <a [href]="settings()?.facebookUrl || '#'" target="_blank" rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M22 12.06C22 6.5 17.52 2 11.96 2S1.92 6.5 1.92 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.46V9.93c0-2.43 1.45-3.77 3.66-3.77 1.06 0 2.17.19 2.17.19v2.39h-1.22c-1.2 0-1.58.75-1.58 1.52v1.82h2.69l-.43 2.91h-2.26V22c4.78-.76 8.44-4.92 8.44-9.94Z"/></svg>
            </a>
            <a [href]="settings()?.tiktokUrl || '#'" target="_blank" rel="noopener" aria-label="TikTok">
              <svg viewBox="0 0 24 24"><path d="M16.6 5.82c-.9-.98-1.4-2.26-1.4-3.6h-3.1v13.3c0 1.57-1.28 2.86-2.86 2.86a2.86 2.86 0 0 1-2.86-2.86 2.86 2.86 0 0 1 2.86-2.86c.29 0 .57.04.83.13V9.66a6.2 6.2 0 0 0-.83-.06A5.96 5.96 0 0 0 3.28 15.5a5.96 5.96 0 0 0 5.96 5.96 5.96 5.96 0 0 0 5.96-5.96V9.13a8.4 8.4 0 0 0 4.85 1.55V7.6a4.85 4.85 0 0 1-3.45-1.78Z"/></svg>
            </a>
          </div>
        </div>
        <div class="foot-col"><h4>Liens rapides</h4>
          <a href="#apropos">À propos</a><a href="#services">Services</a><a href="#destinations">Destinations</a><a href="#temoignages">Témoignages</a><a href="#faq">FAQ</a>
        </div>
        <div class="foot-col"><h4>Destinations</h4>
          <a href="#destinations">Canada</a><a href="#destinations">Espace Schengen</a><a href="#destinations">Australie</a><a href="#destinations">Suisse</a><a href="#destinations">Île Maurice</a>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© 2026 {{ settings()?.agencyName || 'Glorious Travel & Services' }}. Tous droits réservés.</span>
        <span>Contenu, offres & médias gérés depuis l'espace propriétaire.</span>
      </div>
    </div>
  </footer>

  <a class="wa-float" [href]="'https://wa.me/' + waNumber()" target="_blank" rel="noopener" aria-label="Discuter sur WhatsApp">
    <svg viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.42a9.9 9.9 0 0 0 4.62 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-7C17.17 3.03 14.69 2 12.04 2m0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.55-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.25-4.37c0-4.55 3.7-8.25 8.24-8.25m-3.34 4.36c-.17 0-.44.06-.67.32-.23.25-.87.86-.87 2.09 0 1.23.9 2.42 1.02 2.58.12.17 1.75 2.78 4.32 3.79 2.13.84 2.57.67 3.03.63.47-.04 1.5-.61 1.71-1.2.21-.59.21-1.1.15-1.2-.06-.11-.23-.17-.47-.29-.25-.13-1.5-.74-1.73-.82-.23-.09-.4-.13-.57.12-.17.26-.65.83-.8 1-.15.17-.29.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.15.16-.26.24-.43.08-.17.04-.32-.02-.44-.06-.13-.57-1.4-.8-1.91-.2-.48-.4-.44-.57-.45l-.48-.02Z"/></svg>
  </a>
  `
})
export class FooterComponent implements OnInit {
  private publicSite = inject(PublicSiteService);
  settings = signal<SiteSettings | null>(null);

  ngOnInit(): void {
    this.publicSite.getSettings().subscribe(s => this.settings.set(s));
  }

  waNumber(): string {
    return (this.settings()?.whatsappNumber || '').replace(/[^0-9]/g, '');
  }
}
