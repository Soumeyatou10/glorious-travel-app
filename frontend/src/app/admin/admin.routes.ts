import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminDashboardComponent } from './dashboard.component';
import { AdminResourceComponent } from './admin-resource.component';
import { AdminSettingsComponent } from './settings.component';
import { authGuard } from '../core/guards/auth.guard';

/**
 * Toutes les routes /admin/** (sauf /admin/login) partagent AdminLayoutComponent
 * (sidebar + topbar) et sont protegees par authGuard. Chaque ressource de
 * contenu reutilise le meme AdminResourceComponent, seule la donnee
 * "resourceKey" change (voir resource-config.ts).
 */
export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'destinations', component: AdminResourceComponent, data: { resourceKey: 'destinations' } },
      { path: 'services', component: AdminResourceComponent, data: { resourceKey: 'services' } },
      { path: 'offers', component: AdminResourceComponent, data: { resourceKey: 'offers' } },
      { path: 'testimonials', component: AdminResourceComponent, data: { resourceKey: 'testimonials' } },
      { path: 'photos', component: AdminResourceComponent, data: { resourceKey: 'photos' } },
      { path: 'videos', component: AdminResourceComponent, data: { resourceKey: 'videos' } },
      { path: 'articles', component: AdminResourceComponent, data: { resourceKey: 'articles' } },
      { path: 'faqs', component: AdminResourceComponent, data: { resourceKey: 'faqs' } },
      { path: 'appointments', component: AdminResourceComponent, data: { resourceKey: 'appointments' } },
      { path: 'requests', component: AdminResourceComponent, data: { resourceKey: 'requests' } },
      { path: 'clients', component: AdminResourceComponent, data: { resourceKey: 'clients' } },
      { path: 'messages', component: AdminResourceComponent, data: { resourceKey: 'messages' } },
      { path: 'users', component: AdminResourceComponent, data: { resourceKey: 'users' } },
      { path: 'settings', component: AdminSettingsComponent },
    ]
  }
];
