import { ChangeDetectionStrategy, Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { animate, onScroll } from 'animejs';

@Component({
	selector: 'app-footer',
	standalone: true,
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements AfterViewInit {

	readonly hearts = new Array(60);

	ngAfterViewInit(): void {
		const anim = animate('.footer-logo', {
			y: ['100%', '0%'],
			opacity: [0, 1],
			duration: 800,
			ease: 'outCubic',
			autoplay: false,
		});

		onScroll({
			target: '.footer-logo',
			debug: false,
			onEnter: () => {
				anim.reversed = false;
				anim.play();
				this.startHearts();
			},
			onLeave: () => {
				anim.reversed = true;
				anim.refresh();
				this.stopHearts();
			},
		});
	}

	private heartsAnims: ReturnType<typeof animate>[] = [];

	private startHearts(): void {
		this.stopHearts();

		const animConfig = (selector: string, initialDelay: number) =>
			animate(selector, {
				y: [0, () => -(80 + Math.random() * 120)],
				x: () => (Math.random() - 0.5) * 250,
				scale: [0, () => 0.6 + Math.random() * 0.8],
				opacity: [0, 0.9, 0],
				rotate: () => (Math.random() - 0.5) * 90,
				duration: () => 2500 + Math.random() * 1500,
				delay: (_: unknown, i: number) => initialDelay + i * 100 + Math.random() * 80,
				ease: 'outSine',
				loop: true,
			});

		this.heartsAnims = [
			animConfig('.heart:nth-child(odd)', 0),
			animConfig('.heart:nth-child(even)', 3000),
		];
	}

	private stopHearts(): void {
		this.heartsAnims.forEach(a => a.pause());
		this.heartsAnims = [];
		animate('.heart', {
			opacity: 0,
			scale: 0,
			duration: 600,
			ease: 'inQuad',
		});
	}
}
