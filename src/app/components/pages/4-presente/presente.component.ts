import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
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
    encapsulation: ViewEncapsulation.None,
})
export class PresenteComponent implements AfterViewInit {
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
