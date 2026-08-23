import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../core/services/dashboard.service';
import { DashboardStats } from '../core/models/models';

@Component({
  selector: 'gt-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="mb-6">
    <h1 class="text-xl font-display text-gt-navy">Bonjour 👋</h1>
    <p class="text-sm text-gray-500">Résumé de l'activité de votre agence</p>
  </div>

  @if (stats(); as s) {
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white border border-gt-blue-deep/10 rounded-2xl p-5 shadow-gt-card">
        <div class="w-10 h-10 rounded-lg bg-blue-50 text-gt-blue-deep flex items-center justify-center mb-4">✉</div>
        <div class="text-2xl font-display font-extrabold text-gt-navy">{{ s.requestsThisMonth }}</div>
        <div class="text-xs text-gray-500">Demandes ce mois</div>
      </div>
      <div class="bg-white border border-gt-blue-deep/10 rounded-2xl p-5 shadow-gt-card">
        <div class="w-10 h-10 rounded-lg bg-green-50 text-gt-green flex items-center justify-center mb-4">◍</div>
        <div class="text-2xl font-display font-extrabold text-gt-navy">{{ s.newClientsThisMonth }}</div>
        <div class="text-xs text-gray-500">Nouveaux clients</div>
      </div>
      <div class="bg-white border border-gt-blue-deep/10 rounded-2xl p-5 shadow-gt-card">
        <div class="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">◷</div>
        <div class="text-2xl font-display font-extrabold text-gt-navy">{{ s.upcomingAppointments }}</div>
        <div class="text-xs text-gray-500">Rendez-vous à venir</div>
      </div>
      <div class="bg-white border border-gt-blue-deep/10 rounded-2xl p-5 shadow-gt-card">
        <div class="w-10 h-10 rounded-lg bg-red-50 text-gt-red flex items-center justify-center mb-4">✎</div>
        <div class="text-2xl font-display font-extrabold text-gt-navy">{{ s.unreadMessages }}</div>
        <div class="text-xs text-gray-500">Messages non lus</div>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-5">
      <div class="bg-white border border-gt-blue-deep/10 rounded-2xl p-6 shadow-gt-card">
        <h2 class="font-display text-base text-gt-navy mb-4">Demandes par mois</h2>
        @if (s.requestsByMonth.length) {
          <div class="flex items-end gap-3 h-40">
            @for (m of s.requestsByMonth; track m.month) {
              <div class="flex-1 flex flex-col items-center gap-2">
                <div class="w-full max-w-[36px] bg-gradient-to-b from-gt-blue-bright to-gt-blue-deep rounded-t"
                     [style.height.px]="barHeight(m.count)"></div>
                <div class="text-[10px] text-gray-400">{{ m.month }}</div>
              </div>
            }
          </div>
        } @else {
          <p class="text-sm text-gray-400">Pas encore de données — dès les premières demandes clients, le graphique se remplira automatiquement.</p>
        }
      </div>

      <div class="bg-white border border-gt-blue-deep/10 rounded-2xl p-6 shadow-gt-card">
        <h2 class="font-display text-base text-gt-navy mb-4">Demandes par destination</h2>
        @if (destinationEntries().length) {
          @for (entry of destinationEntries(); track entry[0]) {
            <div class="mb-3">
              <div class="flex justify-between text-xs mb-1"><span>{{ entry[0] }}</span><span class="text-gray-400">{{ entry[1] }}</span></div>
              <div class="h-1.5 rounded bg-slate-100 overflow-hidden">
                <div class="h-full bg-gt-blue-deep rounded" [style.width.%]="destPercent(entry[1])"></div>
              </div>
            </div>
          }
        } @else {
          <p class="text-sm text-gray-400">Aucune donnée pour le moment.</p>
        }
      </div>
    </div>
  }
  `
})
export class AdminDashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  stats = signal<DashboardStats | null>(null);

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe(s => this.stats.set(s));
  }

  destinationEntries(): [string, number][] {
    const dict = this.stats()?.requestsByDestination || {};
    return Object.entries(dict).sort((a, b) => b[1] - a[1]);
  }

  private maxDest(): number {
    return Math.max(1, ...this.destinationEntries().map(e => e[1]));
  }

  destPercent(count: number): number {
    return (count / this.maxDest()) * 100;
  }

  barHeight(count: number): number {
    const max = Math.max(1, ...(this.stats()?.requestsByMonth.map(m => m.count) || [1]));
    return Math.max(6, (count / max) * 130);
  }
}
