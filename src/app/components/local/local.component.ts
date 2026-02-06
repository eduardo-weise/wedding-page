import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ScrollActiveDirective } from '../../directives/scroll-active.directive';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, ScrollActiveDirective],
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent {
  venueName = 'Morada dos Ventos';
  address = 'R. dos Pinhais, 224 - Cruzeiro';
  city = 'Santa Rosa - RS';
  cep = '98900-000';
  
  latitude = -27.8688656;
  longitude = -54.4284968;
  
  mapUrl: SafeResourceUrl;
  
  constructor(private readonly sanitizer: DomSanitizer) {
    const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0!2d${this.longitude}!3d${this.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsEmbedUrl);
  }
  
  openInMaps(): void {
    const mapsUrl = `https://www.google.com/maps/place/Morada+dos+Ventos/@${this.latitude},${this.longitude}z/data=!3m1!4b1!4m6!3m5!1s0x94f94b0069b10bd5:0xa5924cc1056f6d14!8m2!3d-27.8688656!4d-54.4259219!16s%2Fg%2F11lmdw0tnm?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoASAFQAw%3D%3D`;
    window.open(mapsUrl, '_blank');
  }
}
