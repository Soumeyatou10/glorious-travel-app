import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'gt-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-gt-card border border-gt-blue-deep/10 p-8">
      <div class="text-center mb-6">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-gt-blue-bright to-gt-blue-deep text-white flex items-center justify-center font-display font-extrabold text-lg mx-auto mb-3">G</div>
        <h1 class="font-display text-lg text-gt-navy">Espace administrateur</h1>
        <p class="text-xs text-gray-500">Glorious Travel & Services</p>
      </div>

      <form (ngSubmit)="submit()" class="space-y-4">
        <div>
          <label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">Email</label>
          <input type="email" [(ngModel)]="email" name="email" required
                 class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2.5 text-sm bg-slate-50">
        </div>
        <div>
          <label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">Mot de passe</label>
          <input type="password" [(ngModel)]="password" name="password" required
                 class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2.5 text-sm bg-slate-50">
        </div>

        @if (error()) {
          <p class="text-sm text-gt-red">{{ error() }}</p>
        }

        <button type="submit" class="gt-btn-primary w-full justify-center py-3">Se connecter</button>
      </form>
    </div>
  </div>
  `
})
export class AdminLoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = signal('');

  submit(): void {
    this.error.set('');
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: () => this.error.set('Email ou mot de passe incorrect.')
    });
  }
}
