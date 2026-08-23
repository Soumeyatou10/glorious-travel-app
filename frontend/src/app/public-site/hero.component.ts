import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'gt-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <section class="hero">
    <div class="hero-bg"><img src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=75" alt="Paysage de voyage"></div>
    <div class="wrap hero-inner">
      <div class="hero-badge hero-anim" style="animation-delay:.05s;"><span class="dot-icon">✓</span> Agence agréée · 9 années d'expérience</div>
      <h1 class="hero-anim" style="animation-delay:.15s;">L'agence qui transforme vos projets de voyage en <span>départs réussis.</span></h1>
      <p class="lead hero-anim" style="animation-delay:.28s;">Études, travail, visite ou immigration : Glorious Travel accompagne votre dossier de A à Z, avec un suivi clair depuis Douala jusqu'à votre destination.</p>
      <div class="hero-ctas hero-anim" style="animation-delay:.4s;">
        <a class="btn btn-primary" href="#contact">Démarrer mon projet ↗</a>
        <a class="btn btn-outline on-dark" href="#destinations">Voir les destinations</a>
      </div>

      <div class="hero-search hero-anim" style="animation-delay:.52s;">
        <div class="hs-field">
          <label>Destination</label>
          <select [(ngModel)]="destination" name="destination">
            <option>Canada</option><option>Espace Schengen</option><option>Australie & N.-Zélande</option>
            <option>Suisse</option><option>Norvège</option><option>Île Maurice</option>
          </select>
        </div>
        <div class="hs-field">
          <label>Type de projet</label>
          <select [(ngModel)]="projectType" name="projectType">
            <option>Études</option><option>Travail</option><option>Visite / Tourisme</option><option>Immigration</option>
          </select>
        </div>
        <button class="btn btn-primary" (click)="goToContact()">Évaluer mon projet</button>
      </div>
    </div>
  </section>
  `
})
export class HeroComponent {
  destination = 'Canada';
  projectType = 'Études';

  goToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
