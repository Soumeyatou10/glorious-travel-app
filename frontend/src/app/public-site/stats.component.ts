import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../core/directives/reveal.directive';

@Component({
  selector: 'gt-stats',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
  <div class="stats-strip">
    <div class="wrap">
      <div class="stats-row" gtReveal>
        <div class="stat-item"><div class="n" #n1>0</div><div class="l">Années d'expérience</div></div>
        <div class="stat-item"><div class="n" #n2>0</div><div class="l">Clients accompagnés</div></div>
        <div class="stat-item"><div class="n" #n3>0</div><div class="l">Destinations couvertes</div></div>
        <div class="stat-item"><div class="n" #n4>0</div><div class="l">Clients satisfaits</div></div>
      </div>
    </div>
  </div>
  `
})
export class StatsComponent implements AfterViewInit {
  private el: ElementRef = inject(ElementRef);
  private animated = false;

  ngAfterViewInit(): void {
    const hostElement = this.el.nativeElement as HTMLElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets: [string, number, string][] = [
      ['n1', 9, '+'], ['n2', 1200, '+'], ['n3', 6, ''], ['n4', 98, '%']
    ];

    const run = () => {
      if (this.animated) return;
      this.animated = true;
      const nEls = hostElement.querySelectorAll('.stat-item .n');
      for (let i = 0; i < nEls.length; i++) {
        const node = nEls[i] as HTMLElement;
        const [, target, suffix] = targets[i];
        if (reduceMotion) { node.textContent = target + suffix; continue; }
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          node.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    };

    if (reduceMotion || !('IntersectionObserver' in window)) { run(); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { run(); observer.disconnect(); } });
    }, { threshold: 0.4 });
    observer.observe(hostElement);
  }
}
