import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../section/section.component';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface HotelSuggestion {
    name: string;
    tag: HotelHighlight;
    travelTime: string;
    priceRange: string;
    amenities: Amenity[];
    mapUrl: string;
    bookingUrl: string;
}

interface HotelHighlight {
    label: string;
    tone: 'primary' | 'accent' | 'muted';
}

interface Amenity {
    icon: string;
    label: string;
    tone?: 'success' | 'danger' | 'muted';
}

type HotelSuggestionWithDelay = HotelSuggestion & {
    revealDelayMin: number;
    revealDelayMax: number;
};

@Component({
    selector: 'app-hospedagem',
    imports: [CommonModule, ScrollRevealDirective, SectionComponent],
    templateUrl: './hospedagem.component.html',
    styleUrls: ['./hospedagem.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HospedagemComponent {
    title = 'Sugestões de hospedagem';
    subtitle = 'Selecionamos três opções próximas ao local pelo custo-benefício e proximidade. Valores podem variar conforme data e disponibilidade.';

    hotels: HotelSuggestionWithDelay[] = this.buildHotelsWithDelay();

    private buildHotelsWithDelay(): HotelSuggestionWithDelay[] {
        const base: HotelSuggestion[] = [
            {
                name: 'Rigo Hotel',
                tag: { label: 'Mais barato', tone: 'accent' },
                travelTime: '10 min do local',
                priceRange: 'R$ 220 a R$ 380 / noite',
                amenities: [
                    { icon: 'close', label: 'Sem estacionamento', tone: 'danger' },
                    { icon: 'breakfast_dining', label: 'Café da manhã incluso' }
                ],
                mapUrl: 'https://maps.google.com/?q=Rigo+Hotel+Santa+Rosa',
                bookingUrl: 'https://www.booking.com/Share-RdnjxX'
            },
            {
                name: "Beno's Hotel",
                tag: { label: 'Mais completo', tone: 'primary' },
                travelTime: '8 min do local',
                priceRange: 'R$ 400 a R$ 850 / noite',
                amenities: [
                    { icon: 'local_parking', label: 'Estacionamento pago', tone: 'muted' },
                    { icon: 'breakfast_dining', label: 'Café da manhã incluso' }
                ],
                mapUrl: 'https://maps.google.com/?q=Beno\'s+Hotel+Santa+Rosa',
                bookingUrl: 'https://www.booking.com/Share-k7M32f'
            },
            {
                name: 'Imigrantes Hotel',
                tag: { label: 'Melhor custo-benefício', tone: 'muted' },
                travelTime: '13 min do local',
                priceRange: 'R$ 350 a R$ 460 / noite',
                amenities: [
                    { icon: 'check_circle', label: 'Estacionamento gratuito', tone: 'success' },
                    { icon: 'breakfast_dining', label: 'Café da manhã incluso' }
                ],
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

    openLink(url: string): void {
		window.open(url, '_blank', 'noopener,noreferrer');
	}
}
