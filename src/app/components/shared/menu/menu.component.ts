import { CommonModule, DOCUMENT } from '@angular/common';
import {
	OnInit,
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Inject,
	OnDestroy,
	Renderer2,
	ViewChild
} from '@angular/core';
import { animate, stagger, spring } from 'animejs';
import lottie, { type AnimationItem } from 'lottie-web';

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('bulbContainer', { static: true }) bulbContainer!: ElementRef<HTMLDivElement>;

	private lottieInstance: AnimationItem | null = null;
	private isAnimating = false;

	constructor(
		@Inject(DOCUMENT) private readonly document: Document,
		private readonly renderer: Renderer2
	) { }

	isOpen = false;
	isDark = true;

	ngOnInit(): void {
		const theme = localStorage.getItem('theme') ?? 'dark';
		this.isDark = theme === 'dark';
		this.document.documentElement.dataset['theme'] = theme;
	}

	ngAfterViewInit(): void {
		const lottiePath = this.isDark ? 'assets/theme/lightbulb-off.json' : 'assets/theme/lightbulb-on.json';
		this.loadLottie(lottiePath);
	}

	private loadLottie(path: string, autoplay = false): void {
		this.lottieInstance?.destroy();
		this.lottieInstance = lottie.loadAnimation({
			container: this.bulbContainer.nativeElement,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			path
		});

		if (autoplay) {
			this.lottieInstance.addEventListener('DOMLoaded', () => {
				this.lottieInstance?.play();
			});
		} else {
			this.lottieInstance.goToAndStop(0, true);
		}
	}

	toggleTheme(): void {
		if (this.isAnimating) return;
		this.isAnimating = true;

		const container = this.bulbContainer.nativeElement;

		// Animação de puxar a cordinha — desce e volta
		animate(container, {
			y: [0, 12, -4, 0],
			scale: [1, 0.92, 1.05, 1],
			duration: 500,
			ease: 'out(3)',
			onBegin: () => {
				// No ponto mais baixo, troca o lottie
				setTimeout(() => {
					this.isDark = !this.isDark;
					const theme = this.isDark ? 'dark' : 'light';
					this.document.documentElement.dataset['theme'] = theme;
					localStorage.setItem('theme', theme);

					const newPath = this.isDark ? 'assets/theme/lightbulb-off.json' : 'assets/theme/lightbulb-on.json';
					this.loadLottie(newPath, true);
				}, 150);
			},
			onComplete: () => {
				this.isAnimating = false;
			}
		});
	}

	menuItems = [
		{ id: 'save-the-date', label: 'save the date', icon: '🏠' },
		{ id: 'convite', label: 'convite', icon: '💌' },
		{ id: 'flash-tattoo', label: 'flash tattoo', icon: '✨' },
		{ id: 'local', label: 'local', icon: '📍' },
		{ id: 'presente', label: 'o presente', icon: '🎁' },
		{ id: 'hospedagem', label: 'hospedagem', icon: '🏨' }
	];

	toggleMenu(): void {
		this.isOpen = !this.isOpen;
		this.isOpen ? this.lockScroll() : this.unlockScroll();
		this.animateMenuItems(this.isOpen);

		if (this.isOpen) {
			this.lottieInstance?.goToAndPlay(0, true);
		}
	}

	closeMenu(): void {
		this.isOpen = false;
		this.unlockScroll();
		this.animateMenuItems(this.isOpen);
	}

	private animateMenuItems(opening: boolean): void {
		if (opening) {
			animate('.mobile-item', {
				x: ['-100cqw', '0cqw'],
				delay: stagger(60),
				ease: spring({ bounce: 0.4, duration: 500 }),
			});
		} else {
			animate('.mobile-item', {
				x: '-100cqw',
				delay: stagger(60),
				ease: spring({ bounce: 0.4, duration: 500 }),
			});
		}
	}

	scrollToSection(sectionId: string): void {
		const element = this.document.getElementById(sectionId);
		this.closeMenu();

		if (element) {
			// Desabilita scroll-snap temporariamente para navegação suave (mobile)
			const htmlEl = this.document.documentElement;
			const bodyEl = this.document.body;
			const originalHtmlSnap = htmlEl.style.scrollSnapType;
			const originalBodySnap = bodyEl.style.scrollSnapType;

			htmlEl.style.scrollSnapType = 'none';
			bodyEl.style.scrollSnapType = 'none';

			element.scrollIntoView({ behavior: 'smooth', block: 'start' });

			// Reabilita scroll-snap após navegação completar
			setTimeout(() => {
				htmlEl.style.scrollSnapType = originalHtmlSnap;
				bodyEl.style.scrollSnapType = originalBodySnap;
			}, 1000);
		}
	}

	ngOnDestroy(): void {
		this.unlockScroll();
	}

	private lockScroll(): void {
		this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
	}

	private unlockScroll(): void {
		this.renderer.removeStyle(this.document.body, 'overflow');
	}
}
