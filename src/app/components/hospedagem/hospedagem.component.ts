import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../section/section.component';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface HotelSuggestion {
    name: string;
    distance: string;
    priceRange: string;
    perks: string;
    mapUrl: string;
    bookingUrl?: string;
}

type HotelSuggestionWithDelay = HotelSuggestion & {
    revealDelayMin: number;
    revealDelayMax: number;
};

@Component({
    selector: 'app-hospedagem',
    standalone: true,
    imports: [CommonModule, ScrollRevealDirective, SectionComponent],
    templateUrl: './hospedagem.component.html',
    styleUrls: ['./hospedagem.component.scss']
})
export class HospedagemComponent {
    title = 'Sugestões de hospedagem';
    subtitle = 'Três opções próximas ao local para facilitar o acesso ao evento.';

    hotels: HotelSuggestionWithDelay[] = this.buildHotelsWithDelay();

    private buildHotelsWithDelay(): HotelSuggestionWithDelay[] {
        const base: HotelSuggestion[] = [
            {
                name: 'Rigo Hotel',
                distance: '10 min de carro do local',
                priceRange: 'R$ 220 - 380/noite',
                perks: 'Não possui estacionamento, café da manhã incluso.',
                mapUrl: 'https://maps.google.com/?q=Rigo+Hotel+Santa+Rosa',
                bookingUrl: 'https://www.booking.com/Share-RdnjxX'
            },
            {
                name: 'Beno\'s Hotel',
                distance: '8 min de carro do local',
                priceRange: 'R$ 400 - 850/noite',
                perks: 'R$ 40 por dia de estacionamento, café da manhã incluso.',
                mapUrl: 'https://maps.google.com/?q=Beno\'s+Hotel+Santa+Rosa',
                bookingUrl: 'https://www.booking.com/Share-k7M32f'
            },
            {
                name: 'Imigrantes Hotel',
                distance: '13 min de carro do local',
                priceRange: 'R$ 350 - 460/noite',
                perks: 'Estacionamento gratuito, café da manhã incluso.',
                mapUrl: 'https://maps.google.com/?q=Imigrantes+Hotel+Santa+Rosa',
                bookingUrl: 'https://www.booking.com/Share-cCNcwz'
            }
        ];

        return base.map((hotel, index) => {
            const offset = index * 120; // stagger by position
            const jitter = Math.floor(Math.random() * 80); // add randomness
            const revealDelayMin = 120 + offset + jitter;
            return {
                ...hotel,
                revealDelayMin,
                revealDelayMax: revealDelayMin + 240 // keep max above min for variance
            };
        });
    }
}
