import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-save-the-date',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-the-date.component.html',
  styleUrls: ['./save-the-date.component.scss']
})
export class SaveTheDateComponent {
  weddingDate = '05 . 12 . 26';
  coupleInitials = 'E M';
}
