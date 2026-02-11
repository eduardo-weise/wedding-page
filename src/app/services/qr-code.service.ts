import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';

type GenerateOptions = { includeLogo?: boolean };

@Injectable({ providedIn: 'root' })
export class QrCodeService {
    private readonly logoPath = 'assets/logo-mark.svg';
    private readonly qrOptions: QRCode.QRCodeToStringOptions = {
        type: 'svg',
        margin: 1,
        errorCorrectionLevel: 'H',
        scale: 8,
        color: {
            dark: '#1f1f1d',
            light: '#f4f2ef'
        }
    };

    getCurrentUrl(): string {
        if (globalThis.window === undefined || !globalThis.location) {
            throw new Error('Current URL is not available in this context.');
        }

        return globalThis.location.href;
    }

    async generateForCurrentUrl(options: GenerateOptions = {}): Promise<string> {
        return this.generateSvg(this.getCurrentUrl(), options);
    }

    async generateSvg(text: string, options: GenerateOptions = {}): Promise<string> {
        const svg = await QRCode.toString(text, this.qrOptions);
        return options.includeLogo === false ? svg : this.insertLogo(svg);
    }

    private insertLogo(svgMarkup: string): string {
        if (typeof DOMParser === 'undefined') {
            return svgMarkup;
        }

        try {
            const doc = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml');
            const svgEl = doc.documentElement;

            const viewBoxValues = svgEl
                .getAttribute('viewBox')
                ?.split(/\s+/)
                .map(Number) ?? [];

            const size =
                viewBoxValues.length === 4
                    ? Math.min(viewBoxValues[2], viewBoxValues[3])
                    : Number(svgEl.getAttribute('width')) || Number(svgEl.getAttribute('height'));

            if (!size || Number.isNaN(size)) {
                return svgMarkup;
            }

            const logoSize = size * 0.2;
            const offset = (size - logoSize) / 2;

            const image = doc.createElementNS('http://www.w3.org/2000/svg', 'image');
            image.setAttribute('href', this.logoPath);
            image.setAttribute('x', offset.toString());
            image.setAttribute('y', offset.toString());
            image.setAttribute('width', logoSize.toString());
            image.setAttribute('height', logoSize.toString());
            image.setAttribute('preserveAspectRatio', 'xMidYMid meet');

            svgEl.appendChild(image);
            return new XMLSerializer().serializeToString(doc);
        } catch {
            return svgMarkup;
        }
    }
}
