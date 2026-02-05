import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flash-tattoo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flash-tattoo.component.html',
  styleUrls: ['./flash-tattoo.component.scss']
})
export class FlashTattooComponent {
  description = 'Teremos um estúdio de tatuagem flash durante a festa! Escolha um dos desenhos especiais que preparamos para celebrar este momento único.';
  
  flashDesigns = [
    { id: 1, name: 'Aliança com Iniciais', available: true },
    { id: 2, name: 'Coração Minimalista', available: true },
    { id: 3, name: 'Data do Casamento', available: true },
    { id: 4, name: 'Flor Delicada', available: true }
  ];
}
