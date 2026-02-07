# Wedding Page - Eduardo & Maiara

Landing page de casamento desenvolvida com Angular, focada em experiência mobile-first.

## 📋 Sobre o Projeto

Este projeto é uma landing page moderna e elegante para o casamento de Eduardo e Maiara, desenvolvida seguindo as melhores práticas de desenvolvimento front-end com Angular.

### 🎨 Design

- **Paleta de Cores:**
  - Fundo escuro: `#17181D` e `#292C35`
  - Cor primária (dourado): `#E09145`
  - Texto claro: `#FCD9B8`
  
- **Tipografia:**
  - Fonte principal: Inter (Google Fonts)
  - Fonte serifada: Georgia (para títulos e elementos especiais)

- **Estilo:**
  - Design minimalista e elegante
  - Inspiração em portfólios modernos
  - Animações suaves (ease-in-out)
  - Mobile-first (99% dos usuários em smartphones)

## 🏗️ Arquitetura

### Estrutura de Componentes

```
src/app/
├── components/
│   ├── save-the-date/      # Seção inicial com data do casamento
│   ├── convite/            # Detalhes do convite
│   ├── flash-tattoo/       # Informações sobre tatuagem flash
│   ├── local/              # Localização com integração Google Maps
│   └── side-menu/          # Menu lateral responsivo
├── shared/
│   └── services/           # Serviços compartilhados
├── app.ts                  # Componente principal
├── app.html                # Template principal
└── app.scss                # Estilos globais
```

### Seções da Landing Page

1. **Save the Date**
   - Apresentação inicial com iniciais do casal
   - Data do casamento em destaque
   - Design minimalista com elementos decorativos

2. **Convite**
   - Informações detalhadas do evento
   - Data, horário e local
   - Mensagem personalizada aos convidados

3. **Flash Tattoo**
   - Apresentação do estúdio de tatuagem flash
   - Grid de designs disponíveis
   - Informações de segurança

4. **Local**
   - Endereço completo do evento
   - Mapa interativo do Google Maps
   - Botão para abrir no aplicativo de mapas

### Menu Lateral

- Design thumb-friendly (otimizado para uso com uma mão)
- Animação suave de abertura/fechura
- Navegação por scroll suave entre seções
- Overlay escurecido ao abrir
- Ícones intuitivos para cada seção

## 🚀 Tecnologias

- **Angular 21+** - Framework principal
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS
- **Google Maps API** - Integração de mapas
- **Google Fonts** - Tipografia (Inter)

## 📱 Mobile-First

O projeto foi desenvolvido com foco absoluto em dispositivos móveis:

- Layout responsivo com breakpoints otimizados
- Toques e gestos nativos
- Performance otimizada para smartphones
- Scroll suave e natural
- Menu lateral acessível com uma mão

## 🎯 Funcionalidades

- ✅ Navegação suave entre seções
- ✅ Menu lateral responsivo
- ✅ Integração com Google Maps
- ✅ Animações suaves (ease-in-out)
- ✅ Design mobile-first
- ✅ Componentes standalone (Angular moderno)
- ✅ Arquitetura escalável e organizada

## 🛠️ Desenvolvimento

### Pré-requisitos

- Node.js 22+
- pnpm (gerenciador de pacotes)

### Instalação

```bash
# Instalar dependências
pnpm install

# Executar em modo de desenvolvimento
pnpm start

# Build para produção
pnpm build
```

### Estrutura de Desenvolvimento

O projeto utiliza a arquitetura moderna do Angular com:

- Componentes standalone (sem módulos)
- Lazy loading preparado via rotas
- Separação clara de responsabilidades
- Estilos componentizados (SCSS)

## 📝 Customização

Para customizar o conteúdo:

1. **Dados do casal**: Editar os componentes individuais
2. **Cores**: Modificar as variáveis CSS em `src/styles.scss`
3. **Localização**: Atualizar coordenadas no `local.component.ts`
4. **Imagens**: Adicionar em `src/assets/`

## 🎨 Inspirações de Design

O projeto foi inspirado em:
- Portfólios minimalistas de UI/UX designers
- Landing pages modernas com tipografia elegante
- Design system com paleta de cores quentes e acolhedoras

## 📄 Licença

Este projeto foi desenvolvido especificamente para o casamento de Eduardo & Maiara.

---

**Data do Casamento:** 05 de dezembro de 2026  
**Desenvolvido com ❤️ usando Angular**
