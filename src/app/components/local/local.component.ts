import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent {
  venueName = 'Espaço Jardim das Oliveiras';
  address = 'Rua das Flores, 123 - Centro';
  city = 'São Paulo - SP';
  cep = '01234-567';
  
  // Coordenadas de exemplo (São Paulo)
  latitude = -23.5505;
  longitude = -46.6333;
  
  mapUrl: SafeResourceUrl;
  
  constructor(private sanitizer: DomSanitizer) {
    const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0!2d${this.longitude}!3d${this.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsEmbedUrl);
  }
  
  openInMaps(): void {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${this.latitude},${this.longitude}`;
    window.open(mapsUrl, '_blank');
  }
}
