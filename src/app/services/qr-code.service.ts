import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';

type GenerateOptions = { includeLogo?: boolean; useDots?: boolean };

@Injectable({ providedIn: 'root' })
export class QrCodeService {
    private readonly logoPath = 'assets/logo-mark.svg';
    private readonly qrOptions: QRCode.QRCodeToStringOptions = {
        type: 'svg',
        margin: 2,
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

    async generateForCurrentUrl(options: GenerateOptions = { useDots: true }): Promise<string> {
        return this.generateSvg(this.getCurrentUrl(), options);
    }

    async generateSvg(text: string, options: GenerateOptions = { useDots: true }): Promise<string> {
        if (options.useDots) {
            return this.generateDotsQRCode(text, options);
        }
        
        const svg = await QRCode.toString(text, this.qrOptions);
        return options.includeLogo === false ? svg : this.insertLogo(svg);
    }

    private async generateDotsQRCode(text: string, options: GenerateOptions): Promise<string> {
        // Gera os dados do QR code usando as configurações de qrOptions
        const qr = QRCode.create(text, { 
            errorCorrectionLevel: this.qrOptions.errorCorrectionLevel 
        });
        const modules = qr.modules;
        const size = modules.size;
        const margin = this.qrOptions.margin || 1;
        const totalSize = size + margin * 2;
        const scale = this.qrOptions.scale || 8;
        const viewBoxSize = totalSize * scale;
        const dotSize = scale * 0.85; // Tamanho do círculo (85% do módulo)
        
        const darkColor = this.qrOptions.color?.dark || '#1f1f1d';
        const lightColor = this.qrOptions.color?.light || '#f4f2ef';

        let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" width="${viewBoxSize}" height="${viewBoxSize}">`;
        svg += `<rect width="100%" height="100%" fill="${lightColor}"/>`;

        // Desenha cada módulo como um círculo
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (modules.get(x, y)) {
                    const cx = (margin + x + 0.5) * scale;
                    const cy = (margin + y + 0.5) * scale;
                    const r = dotSize / 2;
                    svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${darkColor}"/>`;
                }
            }
        }

        svg += '</svg>';

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
