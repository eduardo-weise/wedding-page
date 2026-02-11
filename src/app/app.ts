import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
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
export class App implements AfterViewInit {
	title = 'Casamento Eduardo & Maiara';
	qrDataUrl?: SafeResourceUrl;

	constructor(
		private readonly qr: QrCodeService,
		private readonly sanitizer: DomSanitizer,
		private readonly cdr: ChangeDetectorRef
	) { }

	ngAfterViewInit(): void {
		this.qr.generateForCurrentUrl()
			.then(svg => {
				this.qrDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
					`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
				);
				this.cdr.detectChanges();
			});
	}
}
