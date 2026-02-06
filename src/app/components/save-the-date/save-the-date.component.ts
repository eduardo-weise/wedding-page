import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { ScrollActiveDirective } from '../../directives/scroll-active.directive';

@Component({
  selector: 'app-save-the-date',
  standalone: true,
  imports: [ScrollRevealDirective, ScrollActiveDirective],
  templateUrl: './save-the-date.component.html',
  styleUrls: ['./save-the-date.component.scss']
})
export class SaveTheDateComponent {
}
