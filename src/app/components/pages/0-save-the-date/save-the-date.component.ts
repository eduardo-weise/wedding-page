import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';
import { ScrollActiveDirective } from '../../../directives/scroll-active.directive';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-save-the-date',
	standalone: true,
	imports: [CommonModule, ScrollRevealDirective, ScrollActiveDirective],
	templateUrl: './save-the-date.component.html',
	styleUrls: ['./save-the-date.component.scss']
})
export class SaveTheDateComponent {
	@Input() qrSrc?: SafeResourceUrl | string;
}
