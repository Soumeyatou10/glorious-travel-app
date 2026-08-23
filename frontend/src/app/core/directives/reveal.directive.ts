import { Directive, ElementRef, OnInit, inject } from '@angular/core';

/**
 * Reproduit l'animation "reveal" de la maquette HTML : l'element est invisible
 * puis apparait en fondu-glissement des qu'il entre dans le viewport.
 * Usage : <div gtReveal>...</div>
 */
@Directive({
  selector: '[gtReveal]',
  standalone: true
})
export class RevealDirective implements OnInit {
  private el: ElementRef = inject(ElementRef);

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    node.classList.add('reveal');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      node.classList.add('in');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add('in');
          observer.unobserve(node);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    observer.observe(node);
  }
}
