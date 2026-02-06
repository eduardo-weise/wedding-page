import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelayMin = 0;
  @Input() revealDelayMax = 250;
  @Input() revealOnce = true;

  private observer?: IntersectionObserver;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    this.renderer.addClass(element, 'scroll-reveal');

    const delay = this.getRandomDelay();
    this.renderer.setStyle(element, 'transition-delay', `${delay}ms`);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(element, 'scroll-reveal--visible');
            if (this.revealOnce) {
              this.observer?.unobserve(element);
            }
          } else if (!this.revealOnce) {
            this.renderer.removeClass(element, 'scroll-reveal--visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
  }

  private getRandomDelay(): number {
    const min = Math.max(0, Math.floor(this.revealDelayMin));
    const max = Math.max(min, Math.floor(this.revealDelayMax));
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
