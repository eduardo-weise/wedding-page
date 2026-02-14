import { Component, AfterViewInit, ChangeDetectorRef, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
	private pageShowListener?: (event: PageTransitionEvent) => void;

	constructor(
		private readonly qr: QrCodeService,
		private readonly sanitizer: DomSanitizer,
		private readonly cdr: ChangeDetectorRef,
		@Inject(PLATFORM_ID) private platformId: Object
	) { }

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			// Adiciona classe loading ao HTML
			document.documentElement.classList.add('loading');
			
			// Garante que a página sempre inicie no topo
			window.scrollTo(0, 0);
			
			this.checkIfMobile();
			this.resizeListener = () => this.checkIfMobile();
			window.addEventListener('resize', this.resizeListener);
			
			// Listener para quando a página é carregada do cache (pull-to-refresh)
			this.pageShowListener = (event: PageTransitionEvent) => {
				if (event.persisted) {
					// Página foi carregada do cache
					window.scrollTo(0, 0);
					document.documentElement.classList.add('loading');
					setTimeout(() => {
						document.documentElement.classList.remove('loading');
					}, 100);
				}
			};
			window.addEventListener('pageshow', this.pageShowListener as EventListener);
			
			// Previne comportamento de scroll preservation
			if ('scrollRestoration' in history) {
				history.scrollRestoration = 'manual';
			}
			
			// Remove classe loading após um pequeno delay
			setTimeout(() => {
				document.documentElement.classList.remove('loading');
			}, 100);
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
			if (this.pageShowListener) {
				window.removeEventListener('pageshow', this.pageShowListener as EventListener);
			}
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
}
