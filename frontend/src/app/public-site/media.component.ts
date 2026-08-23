import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicSiteService } from '../core/services/public-site.service';
import { RevealDirective } from '../core/directives/reveal.directive';
import { MediaUrlPipe } from '../core/pipes/media-url.pipe';
import { Photo, Video } from '../core/models/models';

@Component({
  selector: 'gt-media',
  standalone: true,
  imports: [CommonModule, RevealDirective, MediaUrlPipe],
  template: `
  <section class="section media-sec" id="medias">
    <div class="wrap">
      <div class="section-head center" gtReveal>
        <div class="eyebrow">Galerie & vidéos</div>
        <h2>Le monde vous attend.</h2>
        <p>Contenus gérés et organisés depuis l'espace administrateur.</p>
      </div>

      <div class="media-tabs" gtReveal>
        <button class="mtab" [class.active]="tab() === 'photos'" (click)="tab.set('photos')">Photos</button>
        <button class="mtab" [class.active]="tab() === 'videos'" (click)="tab.set('videos')">Vidéos</button>
      </div>

      @if (tab() === 'photos') {
        <div class="media-grid-pro">
          @for (p of photos(); track p.id; let i = $index) {
            <div class="mitem photo-only" gtReveal [style.transitionDelay.s]="i * 0.05">
              <img [src]="p.url | mediaUrl" [alt]="p.title">
              <span class="cap">{{ p.title }}</span>
            </div>
          } @empty {
            <p style="color:var(--ink-soft);">Aucune photo publiée pour le moment.</p>
          }
        </div>
      } @else {
        <div class="media-grid-pro">
          @for (v of videos(); track v.id; let i = $index) {
            <div class="mitem" gtReveal [style.transitionDelay.s]="i * 0.08">
              <img [src]="v.thumbnailUrl | mediaUrl" [alt]="v.title">
              <div class="play-mini"><span>▶</span></div>
              <span class="cap">{{ v.title }}</span>
            </div>
          } @empty {
            <p style="color:var(--ink-soft);">Aucune vidéo publiée pour le moment.</p>
          }
        </div>
      }
    </div>
  </section>
  `
})
export class MediaComponent implements OnInit {
  private publicSite = inject(PublicSiteService);
  photos = signal<Photo[]>([]);
  videos = signal<Video[]>([]);
  tab = signal<'photos' | 'videos'>('photos');

  ngOnInit(): void {
    this.publicSite.getPhotos().subscribe(list => this.photos.set(list));
    this.publicSite.getVideos().subscribe(list => this.videos.set(list));
  }
}
