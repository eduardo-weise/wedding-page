import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ScrollActiveDirective } from '../../directives/scroll-active.directive';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, ScrollActiveDirective, SectionComponent],
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
    const mapsUrl = `https://www.google.com/maps/place/Morada+dos+Ventos/@${this.latitude},${this.longitude}z/data=!4m14!1m7!3m6!1s0x94f94b0069b10bd5:0xa5924cc1056f6d14!2sMorada+dos+Ventos!8m2!3d-27.8688656!4d-54.4259219!16s%2Fg%2F11lmdw0tnm!3m5!1s0x94f94b0069b10bd5:0xa5924cc1056f6d14!8m2!3d-27.8688656!4d-54.4259219!16s%2Fg%2F11lmdw0tnm?entry=ttu&g_ep=EgoyMDI2MDIwMy4wIKXMDSoASAFQAw%3D%3D`;
    window.open(mapsUrl, '_blank');
  }
}
