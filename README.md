# Wedding Page - Eduardo & Maiara

Landing page de casamento desenvolvida com Angular 21, focada em experiência mobile-first com scroll-snap e animações de scroll reveal.

## 📋 Sobre o Projeto

Landing page moderna e elegante para o casamento de Eduardo e Maiara, com seções navegáveis, confirmação de presença via WhatsApp, integração com Google Maps e geração de QR Code para presentes.

### 🎨 Design

- **Paleta de Cores:**
  - Fundo: `#1F1F1D`
  - Primária (cinza claro): `#BFBFBF`
  - Secundária (marrom acobreado): `#7A4C29`
  - Texto muted: `#F4F2EE`

- **Tipografia:**
  - Fonte principal: Inter (Google Fonts)
  - Fonte serifada: Cormorant Garamond / Georgia (títulos)

- **Estilo:**
  - Design minimalista e elegante
  - Scroll-snap em mobile com seções full-screen
  - Animações de scroll reveal com delays escalonados
  - Mobile-first

## 🏗️ Arquitetura

### Estrutura de Componentes

```
src/app/
├── components/
│   ├── pages/
│   │   ├── 0-save-the-date/   # Tela inicial com data do casamento
│   │   ├── 1-convite/         # Convite + confirmação de presença (RSVP)
│   │   ├── 2-flash-tattoo/    # Flash tattoo com integração WhatsApp e Pinterest
│   │   ├── 3-local/           # Localização com Google Maps
│   │   ├── 4-presente/        # Presente com QR Code Pix
│   │   └── 5-hospedagem/      # Cards de hotéis com links de reserva
│   └── shared/
│       ├── footer/            # Rodapé
│       ├── menu/              # Menu lateral responsivo
│       └── section/           # Componente base reutilizável de seção
├── directives/
│   ├── scroll-active.directive.ts   # Controle de seção ativa por scroll
│   └── scroll-reveal.directive.ts   # Animação de reveal ao entrar na viewport
├── services/
│   └── qr-code.service.ts    # Geração de QR Code
├── app.ts                     # Componente raiz
├── app.html                   # Template raiz
├── app.scss                   # Estilos do app
├── app.config.ts              # Configuração standalone
└── app.routes.ts              # Rotas
```

### Seções da Landing Page

1. **Save the Date** — Apresentação com iniciais do casal e data em destaque
2. **Convite** — Detalhes do evento (data, horário, local) + card RSVP com confirmação via WhatsApp
3. **Flash Tattoo** — Tatuagem flash no evento, integração com WhatsApp e board do Pinterest
4. **Local** — Endereço completo com mapa interativo do Google Maps
5. **Presente** — Pix para presente
6. **Hospedagem** — Cards de hotéis próximos com distância, amenidades e link de reserva

## 🚀 Tecnologias

- **Angular 21** — Framework principal (standalone components)
- **TypeScript 5.9** — Linguagem
- **SCSS** — Estilos componentizados
- **anime.js** — Animações
- **qrcode** — Geração de QR Code
- **Google Maps Embed** — Mapa interativo
- **Pinterest Embed** — Board de inspirações
- **GitHub Pages** — Deploy (via angular-cli-ghpages)

## 📱 Mobile-First

- Scroll-snap entre seções full-screen
- Menu lateral thumb-friendly
- Scroll reveal com delays configuráveis
- Performance otimizada para smartphones

## 🎯 Funcionalidades

- ✅ Navegação suave entre seções com scroll-snap
- ✅ Menu lateral responsivo
- ✅ Confirmação de presença (RSVP) via WhatsApp
- ✅ Flash tattoo com contato direto via WhatsApp
- ✅ Board do Pinterest integrado
- ✅ Integração com Google Maps
- ✅ QR Code Pix para presentes
- ✅ Cards de hospedagem com reserva
- ✅ Scroll reveal com animações escalonadas
- ✅ Componentes standalone (Angular moderno)

## 🛠️ Desenvolvimento

### Pré-requisitos

- Node.js 22+
- pnpm 10+

### Instalação

```bash
pnpm install
pnpm start
```

### Build e Deploy

```bash
# Build para produção (GitHub Pages)
pnpm run build:gh

# Deploy para GitHub Pages
pnpm run deploy
```

## 📝 Customização

1. **Dados do casal**: Editar propriedades nos componentes de cada seção
2. **Cores**: Variáveis CSS em `src/styles.scss` (`:root`)
3. **Localização**: Coordenadas em `local.component.ts`
4. **Hotéis**: Array de dados em `hospedagem.component.ts`
5. **WhatsApp**: Números e mensagens nos componentes `convite` e `flash-tattoo`
6. **Imagens**: Adicionar em `src/assets/`

## 📄 Licença

Projeto desenvolvido para o casamento de Eduardo & Maiara.

---

**Data do Casamento:** 05 de dezembro de 2026
