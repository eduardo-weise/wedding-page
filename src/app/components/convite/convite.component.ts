import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-convite',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, SectionComponent],
  templateUrl: './convite.component.html',
  styleUrls: ['./convite.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConviteComponent {
  groomName = 'Eduardo';
  brideName = 'Maiara';
  weddingDate = '5 de dezembro de 2026';
  weddingTime = '18:00';
  venue = 'Morada dos Ventos';
  address = 'R. dos Pinhais, 224 - Cruzeiro';
  city = 'Santa Rosa - RS';
  
  message = 'Com imensa alegria, convidamos você para celebrar conosco este momento especial. Sua presença é fundamental para tornar este dia ainda mais memorável.';
}
