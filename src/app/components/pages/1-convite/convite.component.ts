import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';
import { SectionComponent } from '../../shared/section/section.component';
import { CardComponent } from '../../shared/card/card.component';

@Component({
	selector: 'app-convite',
	standalone: true,
	imports: [CommonModule, ScrollRevealDirective, SectionComponent, CardComponent],
	templateUrl: './convite.component.html',
	styleUrls: ['./convite.component.scss']
})
export class ConviteComponent {
	groomName = 'Eduardo';
	brideName = 'Maiara';
	weddingDate = '5 de dezembro de 2026';
	weddingTime = '18:30';
	venue = 'Morada dos Ventos';
	address = 'R. dos Pinhais, 224 - Cruzeiro';
	city = 'Santa Rosa - RS';

	title = this.groomName + ' <span class="ampersand">&</span> ' + this.brideName;
	message = ['Com imensa alegria, convidamos você para celebrar conosco este momento especial. Sua presença é fundamental para tornar este dia ainda mais memorável.'];
	deadline = '25 de novembro de 2026';
	numero = '5555999656461';
	confirmMessage = 'Oi! Sou convidado do casamento do Eduardo e Maiara e gostaria de confirmar minha presença.';
	declineMessage = 'Oi! Sou convidado do casamento do Eduardo e Maiara e infelizmente não vou conseguir comparecer.';

	whatsappConfirmmation(message: string): string {
		return `https://wa.me/${this.numero}?text=${encodeURIComponent(message)}`;
	}
}
