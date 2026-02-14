import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnDestroy {
	constructor(
		@Inject(DOCUMENT) private readonly document: Document,
		private readonly renderer: Renderer2
	) {}

	isOpen = false;

	menuItems = [
		{ id: 'save-the-date', label: 'save the date', icon: '🏠' },
		{ id: 'convite', label: 'convite', icon: '💌' },
		{ id: 'flash-tattoo', label: 'flash tattoo', icon: '✨' },
		{ id: 'local', label: 'local', icon: '📍' },
		{ id: 'hospedagem', label: 'hospedagem', icon: '🏨' }
	];

	toggleMenu(): void {
		this.isOpen = !this.isOpen;
		this.isOpen ? this.lockScroll() : this.unlockScroll();
	}

	closeMenu(): void {
		this.isOpen = false;
		this.unlockScroll();
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
