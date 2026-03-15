import { ChangeDetectionStrategy, Component, AfterViewInit } from '@angular/core';
import { animate, onScroll } from 'animejs';

@Component({
	selector: 'app-footer',
	standalone: true,
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements AfterViewInit {

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
			enter: 'bottom',
			leave: 'bottom',
			onEnter: () => {
				anim.reversed = false;
				anim.play();
			},
			onLeave: () => {
				anim.reversed = true;
				anim.refresh();
			},
		});
	}
}
