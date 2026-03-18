import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, onScroll, stagger } from 'animejs';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';
import { SectionComponent } from '../../shared/section/section.component';

@Component({
    selector: 'app-presente',
    standalone: true,
    imports: [CommonModule, ScrollRevealDirective, SectionComponent],
    templateUrl: './presente.component.html',
    styleUrls: ['./presente.component.scss'],
})
export class PresenteComponent implements AfterViewInit {
    introTexts = [
        'A gente não fez lista de presentes. Se você quiser nos dar algo, a gente prefere que seja em dinheiro mesmo — sem frescura! No dia do casamento, vai ter uma caixinha na entrada com envelopes pra quem quiser contribuir.',
        'Se preferir Pix, também temos! Vai ter um QR code na caixinha, ou se preferir já garantir antes, é só copiar a chave aqui embaixo:'
    ];
    pixKey = 'weise.eduardo@gmail.com';
    pixChars = this.pixKey.split('');

    private typewriterAnim: ReturnType<typeof animate> | null = null;

    ngAfterViewInit(): void {
        onScroll({
            target: '.pix-box',
            onEnter: () => setTimeout(() => this.playTypewriter(), 500),
            onLeave: () => this.resetTypewriter(),
        });
    }

    private playTypewriter(): void {
        this.resetTypewriter();
        this.typewriterAnim = animate('.pix-char', {
            opacity: [0, 1],
            delay: stagger(50),
            duration: 20,
            ease: 'linear',
        });
    }

    private resetTypewriter(): void {
        if (this.typewriterAnim) {
            this.typewriterAnim.revert();
            this.typewriterAnim = null;
        }
    }

    copyPix(): void {
        navigator.clipboard.writeText(this.pixKey);
    }
}
