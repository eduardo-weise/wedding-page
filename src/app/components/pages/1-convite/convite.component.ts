import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';
import { SectionComponent } from '../../shared/section/section.component';

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
	deadline = '20 de novembro de 2026';

	whatsappConfirmMessage =
		'Oi! Sou convidado do casamento do Eduardo e Maiara e gostaria de confirmar minha presença.';
	whatsappConfirmUrl = `https://wa.me/5555981035906?text=${encodeURIComponent(this.whatsappConfirmMessage)}`;

	whatsappDeclineMessage =
		'Oi! Sou convidado do casamento do Eduardo e Maiara e infelizmente não vou conseguir comparecer.';
	whatsappDeclineUrl = `https://wa.me/5555981035906?text=${encodeURIComponent(this.whatsappDeclineMessage)}`;
}
