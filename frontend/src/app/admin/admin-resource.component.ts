import { Component, OnInit, inject, signal, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RESOURCE_CONFIGS, ResourceConfig } from './resource-config';
import { UploadService } from '../core/services/upload.service';
import { MediaUrlPipe } from '../core/pipes/media-url.pipe';

/**
 * Composant generique reutilise pour TOUTES les ressources admin (destinations,
 * services, offres, temoignages, photos, videos, articles, faqs, rendez-vous,
 * demandes, clients, messages, utilisateurs). Le comportement (colonnes,
 * champs du formulaire, service HTTP) vient entierement de resource-config.ts,
 * lu depuis la donnee de route (voir admin.routes.ts : data: { resourceKey }).
 */
@Component({
  selector: 'gt-admin-resource',
  standalone: true,
  imports: [CommonModule, FormsModule, MediaUrlPipe],
  template: `
  @if (config) {
    <div class="mb-6">
      <div class="text-xs text-gray-400 mb-1">Admin / {{ config.title }}</div>
      <div class="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 class="text-xl font-display text-gt-navy">{{ config.title }}</h1>
          <p class="text-sm text-gray-500">{{ config.subtitle }}</p>
        </div>
        <button (click)="openCreate()" class="gt-btn-primary">+ Ajouter</button>
      </div>
    </div>

    <div class="bg-white border border-gt-blue-deep/10 rounded-2xl overflow-hidden shadow-gt-card">
      <div class="overflow-x-auto">
        <table class="w-full text-sm min-w-[600px]">
          <thead>
            <tr class="border-b border-gt-blue-deep/10 text-left text-[11px] uppercase tracking-wide text-gray-400 font-display font-semibold">
              @for (col of config.columns; track col.key) { <th class="px-6 py-3">{{ col.label }}</th> }
              <th class="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (item of items(); track item.id) {
              <tr class="border-b border-gt-blue-deep/10 hover:bg-slate-50">
                @for (col of config.columns; track col.key) {
                  <td class="px-6 py-3">
                    @if (item[col.key] === true) { <span class="text-gt-green">✓</span> }
                    @else if (item[col.key] === false) { <span class="text-gray-300">—</span> }
                    @else { {{ item[col.key] }} }
                  </td>
                }
                <td class="px-6 py-3">
                  <div class="flex justify-end gap-2">
                    <button (click)="openEdit(item)" class="w-8 h-8 rounded-lg border border-gt-blue-deep/15 hover:bg-slate-50">✎</button>
                    <button (click)="remove(item)" class="w-8 h-8 rounded-lg border border-gt-blue-deep/15 hover:bg-red-50">🗑</button>
                  </div>
                </td>
              </tr>
            } @empty {
              <tr><td [attr.colspan]="config.columns.length + 1" class="px-6 py-10 text-center text-gray-400">Aucun élément pour le moment.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>

    @if (modalOpen()) {
      <div class="fixed inset-0 bg-gt-navy/50 z-40 flex items-center justify-center p-4" (click)="closeModal()">
        <div class="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6" (click)="$event.stopPropagation()">
          <h3 class="font-display text-lg text-gt-navy mb-4">{{ editingId() ? 'Modifier' : 'Ajouter' }} — {{ config.title }}</h3>

          <form (ngSubmit)="save()" class="space-y-4">
            @for (field of config.fields; track field.key) {
              <div>
                <label class="block text-xs font-display font-semibold uppercase text-gray-500 mb-1.5">{{ field.label }}</label>

                @switch (field.type) {
                  @case ('textarea') {
                    <textarea [(ngModel)]="formModel[field.key]" [name]="field.key" rows="3"
                              class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50"></textarea>
                  }
                  @case ('checkbox') {
                    <input type="checkbox" [(ngModel)]="formModel[field.key]" [name]="field.key" class="w-5 h-5">
                  }
                  @case ('select') {
                    <select [(ngModel)]="formModel[field.key]" [name]="field.key" class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50">
                      @for (opt of field.options; track opt) { <option [value]="opt">{{ opt }}</option> }
                    </select>
                  }
                  @case ('number') {
                    <input type="number" [(ngModel)]="formModel[field.key]" [name]="field.key"
                           class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50">
                  }
                  @case ('password') {
                    <input type="password" [(ngModel)]="formModel[field.key]" [name]="field.key"
                           class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50">
                  }
                  @case ('photo') {
                    <input type="file" accept="image/*" (change)="onFileSelected($event, field.key, 'photo')"
                           class="w-full text-sm">
                    @if (formModel[field.key]) {
                      <img [src]="formModel[field.key] | mediaUrl" class="mt-2 h-20 rounded-lg object-cover">
                    }
                  }
                  @case ('video') {
                    <input type="file" accept="video/*" (change)="onFileSelected($event, field.key, 'video')"
                           class="w-full text-sm">
                    @if (formModel[field.key]) {
                      <p class="text-xs text-gray-500 mt-1">Fichier : {{ formModel[field.key] }}</p>
                    }
                  }
                  @default {
                    <input type="text" [(ngModel)]="formModel[field.key]" [name]="field.key"
                           class="w-full border border-gt-blue-deep/15 rounded-lg px-3 py-2 text-sm bg-slate-50">
                  }
                }
              </div>
            }

            <div class="flex gap-3 pt-2">
              <button type="button" (click)="closeModal()" class="flex-1 border border-gt-blue-deep/15 rounded-lg py-2.5 text-sm font-display font-semibold">Annuler</button>
              <button type="submit" class="flex-1 gt-btn-primary justify-center">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    }
  }
  `
})
export class AdminResourceComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private uploadService = inject(UploadService);
  private injector = inject(Injector);

  config!: ResourceConfig;
  private service: any;

  items = signal<any[]>([]);
  modalOpen = signal(false);
  editingId = signal<number | null>(null);
  formModel: any = {};

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const key = data['resourceKey'] as string;
      this.config = RESOURCE_CONFIGS[key];
      // Resolution du service specifique a la ressource (chaque service est providedIn:'root')
      this.service = this.injector.get(this.config.service);
      this.loadItems();
    });
  }

  loadItems(): void {
    this.service.getAll().subscribe((list: any[]) => this.items.set(list));
  }

  openCreate(): void {
    this.editingId.set(null);
    this.formModel = {};
    this.config.fields.forEach(f => { if (f.type === 'checkbox') this.formModel[f.key] = true; });
    this.modalOpen.set(true);
  }

  openEdit(item: any): void {
    this.editingId.set(item.id);
    this.formModel = { ...item };
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }

  onFileSelected(event: Event, fieldKey: string, kind: 'photo' | 'video'): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const upload$ = kind === 'photo' ? this.uploadService.uploadPhoto(file) : this.uploadService.uploadVideo(file);
    upload$.subscribe(res => { this.formModel[fieldKey] = res.url; });
  }

  save(): void {
    const id = this.editingId();
    const payload = { ...this.formModel };
    // Ne jamais renvoyer un mot de passe vide (l'API ignore ce champ s'il est vide)
    if ('password' in payload && !payload.password) delete payload.password;

    const request$ = id ? this.service.update(id, payload) : this.service.create(payload);
    request$.subscribe(() => {
      this.closeModal();
      this.loadItems();
    });
  }

  remove(item: any): void {
    if (!confirm('Supprimer cet élément ?')) return;
    this.service.remove(item.id).subscribe(() => this.loadItems());
  }
}
