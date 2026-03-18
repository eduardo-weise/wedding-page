# Design System — Eduardo & Maiara

Guia de referência visual e de componentes para o site do casamento.

---

## 1. Tokens de Cor

Todas as cores são definidas como CSS custom properties em `:root` e alternam entre temas via `data-theme` no `<html>`.

### Paleta base

| Token | Dark | Light | Uso |
|---|---|---|---|
| `--color-bg` | `#1F1F1D` | `#f4f2ef` | Fundo da página |
| `--color-primary` | `#BFBFBF` | `#2C2C2A` | Texto principal, títulos |
| `--color-secondary` | `#7A4C29` | `#94501c` | Destaques, labels, bordas, ícones |
| `--color-text-muted` | `#F4F2EE` | `#F4F2EE` | Texto claro sobre fundos escuros |
| `--color-text-mute-ghost` | `82% de text-muted` | `#1F1F1D` | Texto em botões ghost |

### Cards

| Token | Uso |
|---|---|
| `--color-card-bg` | Fundo do card |
| `--color-card-shadow` | Sombra externa |
| `--color-card-inset` | Borda interna inset |

### Ações (Botões)

| Token | Uso |
|---|---|
| `--color-action-primary` | Gradiente do botão primário |
| `--color-action-ghost` | Fundo do botão ghost |
| `--color-action-ghost-shadow` | Sombra do botão ghost |
| `--color-action-primary-shadow` | Sombra do botão primário |

### Semânticas

| Token | Valor (dark) | Uso |
|---|---|---|
| `--color-success` | `#b2e6a1` | Amenidades positivas |
| `--color-danger` | `#ffb7aa` | Amenidades negativas |
| `--color-overlay` | `rgba(0,0,0,0.45)` | Backdrop overlay |

---

## 2. Tipografia

### Fontes

| Família | Uso |
|---|---|
| **Inter** (300, 400, 500, 600) | Corpo, labels, botões |
| **Cormorant Garamond** (400, 500, 600) | Títulos de card (`.card-title`) |
| **Georgia** | Títulos de seção, detalhes (`.text-detail`) |
| **Material Symbols Rounded** | Ícones |

### Classes tipográficas

| Classe | Tamanho | Peso | Line-height | Mobile | Uso |
|---|---|---|---|---|---|
| `.body-text` | 16px | 300 | 1.8 | 15px | Parágrafos descritivos |
| `.body-text-sm` | 14px | 300 | 1.7 | — | Texto secundário em cards |
| `.text-label` | 12px | 400 | — | — | Labels uppercase (letter-spacing: 2px) |
| `.text-detail` | 24px | 300 | — | 20px | Valores de destaque (datas, endereços) |
| `.card-title` | 28px | 500 | — | 24px | Título dentro de cards (Cormorant Garamond) |

---

## 3. Componentes

### 3.1 Section (`<app-section>`)

Wrapper padrão para todas as páginas. Centraliza conteúdo, renderiza header (número + label), título, subtítulo e slot.

**Inputs:**

| Input | Tipo | Default | Descrição |
|---|---|---|---|
| `sectionId` | `string` | — | ID do elemento para scroll |
| `sectionNumber` | `string` | — | Número exibido no header (ex: "01") |
| `sectionLabel` | `string` | — | Label uppercase ao lado do número |
| `sectionClass` | `string` | — | Classe CSS no host |
| `title` | `string` | — | Título principal da seção (Georgia, 42px → 32px mobile) |
| `subtitle` | `string \| string[]` | `''` | Subtítulo(s). String única ou array de parágrafos |
| `subtitleHtml` | `string` | `''` | Subtítulo com HTML (usa `[innerHTML]`) |
| `maxWidth` | `string` | `'900px'` | Largura máxima da área de conteúdo |

**Estrutura:**
```
.section-base
  .content [style.max-width]
    .header
      .section-number
      .section-label
    .body
      .title
      .subtitle.body-text  (×N se array)
      .content-slot
        <ng-content>
```

### 3.2 Card

Sistema de cards com camadas separadas para layout flexível.

| Classe | Função |
|---|---|
| `.card` | Container externo — border-radius 14px, sombra, overflow hidden |
| `.card--lg` | Variante — border-radius 18px |
| `.card-shell` | Padding interno (24px 20px), flex column, gap 10px |
| `.card-title` | Título do card — Cormorant Garamond, 28px/24px mobile |

**Exemplo:**
```html
<article class="card card--lg">
  <div class="card-shell">
    <h2 class="card-title">Nome</h2>
    <p class="body-text-sm">Descrição</p>
  </div>
</article>
```

### 3.3 Info Box

Caixa de destaque com borda lateral.

```html
<div class="info-box">
  <p>Conteúdo informativo</p>
</div>
```

- Background: 10% de `--color-secondary`
- Borda esquerda: 3px solid `--color-secondary`
- Texto: 14px, line-height 1.6

### 3.4 Botões (Actions)

Todos os botões de ação usam o sistema `.action`.

| Classe | Estilo |
|---|---|
| `.action` | Base — 50px radius, 12px, uppercase, flex 1 |
| `.action--primary` | Gradiente, texto claro, sombra forte |
| `.action--ghost` | Fundo card-bg, texto muted, sombra suave |

**Exemplo:**
```html
<button class="action action--primary" (click)="doSomething()">
  <span class="material-symbols-rounded">icon_name</span>
  Label
</button>
```

### 3.5 Links Container

```html
<div class="links">
  <button class="action action--ghost">...</button>
  <button class="action action--primary">...</button>
</div>
```

- `display: flex`, `gap: 12px`, `width: 100%`

### 3.6 Material Symbols

Ícones do Google Material Symbols Rounded, importados globalmente.

```html
<span class="material-symbols-rounded">check_circle</span>
```

- `font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24`
- Tamanho padrão: 10px (componentes ajustam via override local)

---

## 4. Responsividade

### Breakpoints

| Breakpoint | Uso |
|---|---|
| `max-width: 768px` | Mobile — scroll-snap, tipografia menor |
| `min-width: 769px` | Desktop — overflow hidden, layout side-by-side |
| `max-width: 640px` | Complementar — ajustes de layout compacto |

### Regras globais (mobile ≤ 768px)

- `.body-text`: 15px
- `.text-detail`: 20px
- `.card-title`: 24px
- Scroll-snap obrigatório (`block mandatory`)
- Seções: padding 30px 20px

---

## 5. Temas

O tema é controlado pelo atributo `data-theme` no `<html>` e persistido em `localStorage`.

| Tema | Atributo |
|---|---|
| Dark (padrão) | `data-theme="dark"` ou sem atributo |
| Light | `data-theme="light"` |

Logo switching automático via classes `.logo-dark` / `.logo-light`.

---

## 6. Animações

### Scroll Reveal

Diretiva `appScrollReveal` aplicada a elementos que devem animar ao entrar na viewport.

- Estado oculto: `opacity: 0, translateY(20px)`
- Estado visível: `opacity: 1, translateY(0)`
- Transição: `0.6s ease`
- Inputs: `revealDelayMin`, `revealDelayMax`, `revealOnce`

### Scroll Active

Diretiva `appScrollActive` controla visibilidade das seções via classes `.section` / `.section--active`.

---

## 7. Exceções

| Componente | Exceção | Motivo |
|---|---|---|
| **Save-the-date** | Layout próprio, sem `<app-section>` | Seção hero com QR code desktop, layout totalmente diferente |
| **Convite** | Título customizado (`.couple-names`) | Nomes do casal com tipografia especial, não usa `title` da section |
| **Flash-tattoo** | `ViewEncapsulation.None` mantido | Pinterest embed injeta DOM sem atributos Angular `_ngcontent`, estilos precisam ser globais |
| **Footer** | Não participa do design system | Componente estrutural independente |

---

## 8. Estrutura de Arquivos SCSS

| Arquivo | Conteúdo |
|---|---|
| `src/styles.scss` | Tokens, reset, temas, tipografia, card, info-box, actions, links, ícones, responsividade global |
| `component.scss` (cada) | Apenas estilos específicos do componente (layout, posicionamento, variações únicas) |

**Regra:** nenhum componente deve redefinir `.card`, `.body-text`, `.action`, `.links`, `.material-symbols-rounded` ou `.card-title`. Se precisar de override, usar seletor local (ex: `.hotel-card .card-shell { padding: 22px 18px 18px; }`).
