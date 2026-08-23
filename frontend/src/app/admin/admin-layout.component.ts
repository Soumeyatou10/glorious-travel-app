import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

interface NavItem { path: string; label: string; icon: string; }
interface NavGroup { group: string; items: NavItem[]; }

const NAV: NavGroup[] = [
  { group: "Vue d'ensemble", items: [
    { path: '/admin', label: 'Dashboard', icon: '◆' },
  ]},
  { group: 'Relation client', items: [
    { path: '/admin/requests', label: 'Demandes clients', icon: '✉' },
    { path: '/admin/clients', label: 'Clients', icon: '◍' },
    { path: '/admin/appointments', label: 'Rendez-vous', icon: '◷' },
    { path: '/admin/messages', label: 'Messages', icon: '✎' },
  ]},
  { group: 'Contenu du site', items: [
    { path: '/admin/services', label: 'Services', icon: '◈' },
    { path: '/admin/destinations', label: 'Destinations', icon: '✈' },
    { path: '/admin/offers', label: 'Offres', icon: '◎' },
    { path: '/admin/testimonials', label: 'Témoignages', icon: '★' },
    { path: '/admin/photos', label: 'Photos', icon: '▣' },
    { path: '/admin/videos', label: 'Vidéos', icon: '▶' },
    { path: '/admin/articles', label: 'Articles', icon: '▤' },
    { path: '/admin/faqs', label: 'FAQ', icon: '?' },
  ]},
  { group: 'Administration', items: [
    { path: '/admin/users', label: 'Utilisateurs administrateurs', icon: '◉' },
    { path: '/admin/settings', label: 'Paramètres du site', icon: '⚙' },
  ]},
];

@Component({
  selector: 'gt-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
  <div class="min-h-screen grid grid-cols-[260px_1fr] bg-slate-50">
    <!-- overlay mobile -->
    @if (sidebarOpen()) {
      <div class="fixed inset-0 bg-gt-navy/50 z-40 lg:hidden" (click)="sidebarOpen.set(false)"></div>
    }

    <aside class="bg-gt-navy text-white flex flex-col fixed lg:sticky top-0 h-screen w-[260px] z-50 transition-transform"
           [class.-translate-x-full]="!sidebarOpen()" [class.lg:translate-x-0]="true">
      <div class="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-gt-blue-bright to-gt-blue-deep flex items-center justify-center font-display font-extrabold">G</div>
        <div>
          <div class="font-display font-bold text-sm">Glorious Travel</div>
          <div class="text-[10px] text-white/50">Espace administrateur</div>
        </div>
      </div>

      <nav class="flex-1 overflow-y-auto px-3 py-3">
        @for (grp of navGroups; track grp.group) {
          <div class="text-[10px] uppercase tracking-wide text-white/35 font-display font-semibold px-3 pt-4 pb-1.5">{{ grp.group }}</div>
          @for (item of grp.items; track item.path) {
            <a [routerLink]="item.path" routerLinkActive="bg-gt-red text-white" [routerLinkActiveOptions]="{exact: item.path === '/admin'}"
               class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/5 hover:text-white mb-0.5"
               (click)="sidebarOpen.set(false)">
              <span class="w-5 text-center">{{ item.icon }}</span>{{ item.label }}
            </a>
          }
        }
      </nav>

      <div class="px-5 py-4 border-t border-white/10 flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-gt-blue flex items-center justify-center text-xs font-display font-bold">{{ initials() }}</div>
          <div class="text-xs">
            <div class="font-semibold">{{ authService.currentUser()?.fullName }}</div>
            <div class="text-white/50">Administrateur</div>
          </div>
        </div>
        <button (click)="authService.logout()" title="Se déconnecter" class="text-white/60 hover:text-white text-lg">⏻</button>
      </div>
    </aside>

    <div class="min-w-0">
      <div class="lg:hidden sticky top-0 z-30 bg-gt-navy text-white px-4 py-3 flex items-center gap-3">
        <button (click)="sidebarOpen.set(true)" class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">☰</button>
        <span class="font-display font-semibold text-sm">Glorious Travel — Admin</span>
      </div>
      <main class="p-5 md:p-8 max-w-7xl">
        <div class="text-xs bg-amber-50 border border-amber-200 text-amber-700 rounded-lg px-4 py-2.5 mb-6">
          Connecté en tant que {{ authService.currentUser()?.email }}.
        </div>
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>
  `
})
export class AdminLayoutComponent {
  authService = inject(AuthService);
  navGroups = NAV;
  sidebarOpen = signal(false);

  initials(): string {
    const name = this.authService.currentUser()?.fullName || '';
    return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }
}
