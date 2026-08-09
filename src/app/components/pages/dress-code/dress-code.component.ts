import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate } from 'animejs';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';
import { SectionComponent } from '../../shared/section/section.component';

@Component({
	selector: 'app-dress-code',
	standalone: true,
	imports: [CommonModule, ScrollRevealDirective, SectionComponent],
	templateUrl: './dress-code.component.html',
	styleUrls: ['./dress-code.component.scss'],
})
export class DressCodeComponent implements AfterViewInit, OnDestroy {
	message = [
		'Para deixar esse dia ainda mais especial, temos um pedido carinhoso: <strong>venham de preto</strong>.',
		'É só porque preto combina com tudo — inclusive com a nossa personalidade.',
		'Não precisa comprar roupa nova nem mudar seu estilo. Escolham o look que faz vocês se sentirem incríveis e venham celebrar esse dia com a gente. 🖤',
	];

	// Croquis de inspiração; a lista é duplicada para o marquee circular sem emenda.
	croquis = Array.from(
		{ length: 13 },
		(_, i) => `assets/dress-code/${String(i + 1).padStart(2, '0')}.png`
	);
	loopCroquis = [...this.croquis, ...this.croquis];

	private heartbeat: ReturnType<typeof animate> | null = null;

	ngAfterViewInit(): void {
		this.heartbeat = animate('.dc-content .dc-heart', {
			scale: [1, 1.12, 1],
			duration: 1800,
			loop: true,
			ease: 'inOut(2)',
		});
	}

	ngOnDestroy(): void {
		this.heartbeat?.revert();
		this.heartbeat = null;
	}
}
