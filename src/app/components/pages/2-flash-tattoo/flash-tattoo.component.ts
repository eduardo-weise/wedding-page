import { AfterViewInit, Component, Inject, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';
import { SectionComponent } from '../../shared/section/section.component';

@Component({
	selector: 'app-flash-tattoo',
	standalone: true,
	imports: [ScrollRevealDirective, SectionComponent],
	templateUrl: './flash-tattoo.component.html',
	styleUrls: ['./flash-tattoo.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class FlashTattooComponent implements AfterViewInit {
	description = 'Além das lembranças no coração, você também poderá levar esse momento marcado na pele. Durante a celebração, teremos um espaço exclusivo de flash tattoo disponível para os convidados.';
	flashExplainer = 'A flash tattoo é uma tatuagem rápida e <strong>permanente</strong>, feita no mesmo dia, a partir de desenhos previamente selecionados, com até <strong>5 cm</strong> de tamanho. As tatuagens serão realizadas <strong>no local do evento</strong>, ao longo da festa. Para agilizar o atendimento no dia, escolha sua arte e informe <strong>o desenho e o local do corpo</strong> diretamente para a tatuadora utilizando o botão abaixo.';
	flashInspirations = 'Aqui a Bruna deixou algumas inspirações para ajudar na escolha.';

	pinterestBoardUrl = 'https://br.pinterest.com/ramonrocasilva/flash-5-cm/';

	constructor(
		private readonly renderer: Renderer2,
		@Inject(DOCUMENT) private readonly document: Document
	) { }

	ngAfterViewInit(): void {
		const existing = this.document.querySelector('script[src*="assets.pinterest.com/js/pinit.js"]');
		if (existing) {
			this.buildPinterestEmbed();
			return;
		}

		const script = this.renderer.createElement('script');
		script.async = true;
		script.defer = true;
		script.src = 'https://assets.pinterest.com/js/pinit.js';
		script.onload = () => this.buildPinterestEmbed();
		this.renderer.appendChild(this.document.body, script);
	}

	private buildPinterestEmbed(): void {
		const pinUtils = (globalThis as typeof globalThis & { PinUtils?: { build: () => void } }).PinUtils;
		if (pinUtils?.build) {
			pinUtils.build();
		}
	}
}
