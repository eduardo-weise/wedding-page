import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollActive]',
  standalone: true
})
export class ScrollActiveDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;

    if (typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(element, 'section--active');
      return;
    }

    // Ativa imediatamente a primeira seção visível no carregamento
    const rect = element.getBoundingClientRect();
    const isInitiallyVisible = rect.top >= 0 && rect.top < window.innerHeight * 0.5;
    if (isInitiallyVisible) {
      this.renderer.addClass(element, 'section--active');
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(element, 'section--active');
          } else {
            this.renderer.removeClass(element, 'section--active');
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -25% 0px'
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
}
