import { AfterViewInit, Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ScrollActiveDirective } from '../../directives/scroll-active.directive';

@Component({
  selector: 'app-flash-tattoo',
  standalone: true,
  imports: [ScrollRevealDirective, ScrollActiveDirective],
  templateUrl: './flash-tattoo.component.html',
  styleUrls: ['./flash-tattoo.component.scss']
})
export class FlashTattooComponent implements AfterViewInit {
  description = 'Teremos um estúdio de tatuagem flash durante a festa! Escolha um dos desenhos especiais que preparamos para celebrar este momento único.';

  flashExplainer = 'Flash tattoo é uma tatuagem rápida, feita no mesmo dia, com desenhos pré-selecionados. Para participar, o tamanho precisa ser de 5cm.';

  pinterestBoardUrl = 'https://br.pinterest.com/ramonrocasilva/flash-5-cm/';

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    const existing = this.document.querySelector('script[src*="assets.pinterest.com/js/pinit.js"]');
    if (existing) {
      return;
    }

    const script = this.renderer.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://assets.pinterest.com/js/pinit.js';
    this.renderer.appendChild(this.document.body, script);
  }
}
