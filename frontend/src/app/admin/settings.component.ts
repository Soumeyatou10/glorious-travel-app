import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SiteSettings } from '../core/models/models';

@Component({
  selector: 'gt-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="mb-6">
    <h1 class="text-xl font-display text-gt-navy">Paramètres du site</h1>
    <p class="text-sm text-gray-500">Informations générales, apparence et coordonnées</p>
  </div>

  @if (model) {
    <form (ngSubmit)="save()" class="bg-white border border-gt-blue-deep/10 rounded-2xl shadow-gt-card p-6 grid md:grid-cols-2 gap-5">
      <div><label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">Nom de l'agence</label>
        <input [(ngModel)]="model.agencyName" name="agencyName" class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50"></div>
      <div><label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">Slogan</label>
        <input [(ngModel)]="model.slogan" name="slogan" class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50"></div>
      <div><label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">Numéro WhatsApp</label>
        <input [(ngModel)]="model.whatsappNumber" name="whatsappNumber" class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50"></div>
      <div><label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">Email de contact</label>
        <input [(ngModel)]="model.email" name="email" class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50"></div>
      <div><label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">Adresse</label>
        <input [(ngModel)]="model.address" name="address" class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50"></div>
      <div><label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">Horaires (semaine)</label>
        <input [(ngModel)]="model.hoursWeekdays" name="hoursWeekdays" class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50"></div>
      <div><label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">Horaires (samedi)</label>
        <input [(ngModel)]="model.hoursSaturday" name="hoursSaturday" class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50"></div>
      <div><label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">Lien Facebook</label>
        <input [(ngModel)]="model.facebookUrl" name="facebookUrl" class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50"></div>
      <div><label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">Lien TikTok</label>
        <input [(ngModel)]="model.tiktokUrl" name="tiktokUrl" class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50"></div>

      <div class="md:col-span-2 flex items-center justify-between pt-2">
        @if (saved()) { <span class="text-sm text-gt-green">✓ Paramètres enregistrés</span> } @else { <span></span> }
        <button type="submit" class="gt-btn-primary">Enregistrer</button>
      </div>
    </form>
  }
  `
})
export class AdminSettingsComponent implements OnInit {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/admin/settings';

  model: SiteSettings | null = null;
  saved = signal(false);

  ngOnInit(): void {
    this.http.get<SiteSettings>(this.baseUrl).subscribe(s => this.model = s);
  }

  save(): void {
    if (!this.model) return;
    this.http.put<SiteSettings>(this.baseUrl, this.model).subscribe(s => {
      this.model = s;
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
    });
  }
}
