import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';
import { ScrollActiveDirective } from '../../../directives/scroll-active.directive';

@Component({
	selector: 'app-section',
	standalone: true,
	imports: [CommonModule, ScrollRevealDirective, ScrollActiveDirective],
	templateUrl: './section.component.html',
	styleUrls: ['./section.component.scss']
})
export class SectionComponent {
	@Input() sectionId = '';
	@Input() sectionNumber = '';
	@Input() sectionLabel = '';
	@Input() sectionClass = '';
	@Input() title = '';
	@Input() subtitle = '';
}
