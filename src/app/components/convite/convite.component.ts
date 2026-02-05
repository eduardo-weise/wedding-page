import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-convite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './convite.component.html',
  styleUrls: ['./convite.component.scss']
})
export class ConviteComponent {
  groomName = 'Eduardo';
  brideName = 'Mariana';
  weddingDate = '5 de dezembro de 2026';
  weddingTime = '18:00';
  venue = 'Espaço Jardim das Oliveiras';
  address = 'Rua das Flores, 123 - Centro';
  city = 'São Paulo - SP';
  
  message = 'Com imensa alegria, convidamos você para celebrar conosco este momento especial. Sua presença é fundamental para tornar este dia ainda mais memorável.';
}
