import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SectionComponent } from '../section/section.component';

@Component({
	selector: 'app-local',
	standalone: true,
	imports: [CommonModule, ScrollRevealDirective, SectionComponent],
	templateUrl: './local.component.html',
	styleUrls: ['./local.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LocalComponent {
	venueName = 'Morada dos Ventos';
	address = 'R. dos Pinhais, 224 - Cruzeiro';
	city = 'Santa Rosa - RS';
	cep = '98900-000';

	latitude = -27.8687971;
	longitude = -54.4259527;

	mapUrl: SafeResourceUrl;

	constructor(private readonly sanitizer: DomSanitizer) {
		const googleMapsEmbedUrl = `https://maps.google.com/maps?q=Morada+dos+Ventos,+Santa+Rosa+-+RS&z=16&output=embed&hl=pt-BR`;
		this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsEmbedUrl);
	}

	openInMaps(): void {
		const mapsUrl = `https://maps.google.com/?q=Morada+dos+Ventos+Santa+Rosa`;
		window.open(mapsUrl, '_blank');
	}
}
