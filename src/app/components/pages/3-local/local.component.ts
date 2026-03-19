import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';
import { SectionComponent } from '../../shared/section/section.component';

import * as L from 'leaflet';
import { animate } from 'animejs';

@Component({
	selector: 'app-local',
	standalone: true,
	imports: [CommonModule, ScrollRevealDirective, SectionComponent],
	templateUrl: './local.component.html',
	styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit, OnDestroy {
	@ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

	venueName = 'Morada dos Ventos';
	address = 'R. dos Pinhais, 224 - Cruzeiro';
	city = 'Santa Rosa - RS';

	latitude = -27.8687971;
	longitude = -54.4259527;

	private themeObserver?: MutationObserver;

	ngOnInit(): void {
		const map = L.map(this.mapContainer.nativeElement, {
			scrollWheelZoom: false,
		}).setView([this.latitude, this.longitude], 12);

		let tileLayer = this.createTileLayer(this.getCurrentTheme()).addTo(map);

		const heartPinIcon = L.divIcon({
			className: '',
			html: `<span class="material-symbols-rounded pin-drop" style="font-size:40px;color:#e63946;opacity:0;">map_pin_heart</span>`,
			iconSize: [40, 40],
			iconAnchor: [20, 40],
		});

		const marker = L.marker([this.latitude, this.longitude], { icon: heartPinIcon })
			.addTo(map)
			.bindTooltip(this.venueName, {
				offset: L.point(15, 0),
				direction: 'right',
				permanent: false
			});

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				map.invalidateSize();
				map.flyTo([this.latitude, this.longitude], 16, {
					duration: 2,
					easeLinearity: 0.25
				});

				const pinEl = (marker as any)._icon?.querySelector('.pin-drop');
				if (pinEl) {
					animate(pinEl, {
						opacity: [0, 1],
						translateY: [-120, 0],
						scale: [0.6, 1],
						duration: 600,
						delay: 1300,
						ease: 'outBounce',
					});
				}

				observer.disconnect();
			}
		}, { threshold: 0.3 });

		observer.observe(this.mapContainer.nativeElement);

		this.themeObserver = new MutationObserver(() => {
			const newTheme = this.getCurrentTheme();
			map.removeLayer(tileLayer);
			tileLayer = this.createTileLayer(newTheme).addTo(map);
		});

		this.themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});
	}

	ngOnDestroy(): void {
		this.themeObserver?.disconnect();
	}

	private getCurrentTheme(): string {
		return document.documentElement.dataset['theme'] || 'light';
	}

	private createTileLayer(theme: string): L.TileLayer {
		return L.tileLayer(`https://{s}.basemaps.cartocdn.com/${theme}_all/{z}/{x}/{y}{r}.png`, {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
			maxZoom: 19
		});
	}

	openInMaps(): void {
		window.open(`https://maps.google.com/?q=${encodeURIComponent(this.venueName + ' ' + this.city)}`, '_blank');
	}
}
