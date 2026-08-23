import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicSiteService } from '../core/services/public-site.service';
import { ThemeService } from '../core/services/theme.service';
import { SiteSettings } from '../core/models/models';

@Component({
  selector: 'gt-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
  <header class="site-nav" [class.scrolled]="scrolled()">
    <div class="wrap nav-row">
      <div class="brand"><img src="assets/glorious-travel-logo.png" alt="Glorious Travel & Services"></div>
      <nav class="links">
        <a href="#apropos">À propos</a>
        <a href="#services">Services</a>
        <a href="#destinations">Destinations</a>
        <a href="#temoignages">Témoignages</a>
        <a href="#medias">Galerie</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div class="nav-right">
        <button class="icon-toggle" (click)="theme.toggle()" aria-label="Changer le mode d'affichage" title="Mode sombre / clair">
          <span class="ic-sun">☀</span><span class="ic-moon">☾</span>
        </button>
        <a class="btn btn-primary" href="#contact">Parler à un conseiller ↗</a>
        <button class="nav-burger" [class.open]="mobileOpen()" (click)="mobileOpen.set(!mobileOpen())" aria-label="Ouvrir le menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <nav class="mobile-nav" [class.open]="mobileOpen()">
      <div class="mn-toggles">
        <button class="icon-toggle" (click)="theme.toggle()"><span class="ic-sun">☀</span> / <span class="ic-moon">☾</span> Mode sombre</button>
      </div>
      <a href="#apropos" (click)="mobileOpen.set(false)">À propos</a>
      <a href="#services" (click)="mobileOpen.set(false)">Services</a>
      <a href="#destinations" (click)="mobileOpen.set(false)">Destinations</a>
      <a href="#temoignages" (click)="mobileOpen.set(false)">Témoignages</a>
      <a href="#medias" (click)="mobileOpen.set(false)">Galerie</a>
      <a href="#faq" (click)="mobileOpen.set(false)">FAQ</a>
      <a href="#contact" class="mn-cta" (click)="mobileOpen.set(false)">Parler à un conseiller ↗</a>
    </nav>
  </header>
  `
})
export class NavbarComponent implements OnInit {
  private publicSite = inject(PublicSiteService);
  theme = inject(ThemeService);

  settings = signal<SiteSettings | null>(null);
  mobileOpen = signal(false);
  scrolled = signal(false);

  ngOnInit(): void {
    this.publicSite.getSettings().subscribe(s => this.settings.set(s));
    window.addEventListener('scroll', () => this.scrolled.set(window.scrollY > 12));
  }
}
