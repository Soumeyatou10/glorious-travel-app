import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./public-site/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  { path: '**', redirectTo: '' }
];
