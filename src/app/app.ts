import { Component, AfterViewInit, ChangeDetectorRef, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MenuComponent } from './components/shared/menu/menu.component';
import { SaveTheDateComponent } from './components/pages/0-save-the-date/save-the-date.component';
import { ConviteComponent } from './components/pages/1-convite/convite.component';
import { FlashTattooComponent } from './components/pages/2-flash-tattoo/flash-tattoo.component';
import { LocalComponent } from './components/pages/3-local/local.component';
import { HospedagemComponent } from './components/pages/4-hospedagem/hospedagem.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { QrCodeService } from './services/qr-code.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	imports: [
		CommonModule,
		RouterOutlet,
		MenuComponent,
		SaveTheDateComponent,
		ConviteComponent,
		FlashTattooComponent,
		LocalComponent,
		HospedagemComponent,
		FooterComponent,
	],
	templateUrl: './app.html',
	styleUrls: ['./app.scss']
})
export class App implements OnInit, AfterViewInit, OnDestroy {
	title = 'Casamento Eduardo & Maiara';
	qrDataUrl?: SafeResourceUrl;
	isMobile = false;
	private resizeListener?: () => void;
	private lastTouchEnd = 0;

	constructor(
		private readonly qr: QrCodeService,
		private readonly sanitizer: DomSanitizer,
		private readonly cdr: ChangeDetectorRef,
		@Inject(PLATFORM_ID) private platformId: Object,
		@Inject(DOCUMENT) private readonly document: Document
	) { }

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.checkIfMobile();
			this.resizeListener = () => this.checkIfMobile();
			window.addEventListener('resize', this.resizeListener);

			// Garante que a página sempre inicie no topo (inclusive em reload/back)
			if ('scrollRestoration' in history) {
				history.scrollRestoration = 'manual';
			}
			window.scrollTo(0, 0);
			window.addEventListener('pageshow', this.handlePageShow as EventListener);

			// Impede zoom por duplo toque em iOS/Safari
			this.document.addEventListener('touchend', this.handleTouchEnd as EventListener, {
				passive: false
			});
		}
	}

	ngAfterViewInit(): void {
		// Apenas gera QR code se não for mobile
		if (!this.isMobile) {
			this.qr.generateForCurrentUrl()
				.then(svg => {
					this.qrDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
						`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
					);
					this.cdr.detectChanges();
				});
		}
	}

	ngOnDestroy(): void {
		if (isPlatformBrowser(this.platformId)) {
			if (this.resizeListener) {
				window.removeEventListener('resize', this.resizeListener);
			}

			this.document.removeEventListener('touchend', this.handleTouchEnd as EventListener);
			window.removeEventListener('pageshow', this.handlePageShow as EventListener);
		}
	}

	private checkIfMobile(): void {
		const wasMobile = this.isMobile;
		this.isMobile = window.innerWidth <= 768;

		// Se mudou de desktop para mobile ou vice-versa, recarrega a página
		if (wasMobile !== this.isMobile && wasMobile !== undefined) {
			this.cdr.detectChanges();
		}
	}

	private handleTouchEnd = (event: TouchEvent): void => {
		const now = Date.now();
		if (now - this.lastTouchEnd <= 300) {
			event.preventDefault();
		}
		this.lastTouchEnd = now;
	};

	private handlePageShow = (event: Event): void => {
		// Em alguns navegadores (ex: iOS Safari), o bfcache restaura a posição anterior.
		// Reforçamos que o usuário sempre volte a ver o topo (save-the-date).
		const pageEvent = event as any;
		if (pageEvent.persisted === true) {
			window.scrollTo(0, 0);
		}
	};
}
