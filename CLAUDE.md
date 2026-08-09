# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Angular 21 single-page wedding site for Eduardo & Maiara, deployed to
`erasoumdate.com.br`. Mobile-first: the phone is the intended target. Code,
content, comments, and commit messages are written in **Brazilian Portuguese**.

## Commands

Use **pnpm** (v10) — not npm. The GitHub Action uses `npm ci`, but local work is pnpm.

- `pnpm install` — install dependencies
- `pnpm start` — dev server (`ng serve`, development config)
- `pnpm build` — build; `pnpm run build:gh` — production build for GitHub Pages (`--base-href ./`)
- `pnpm run deploy` — publish `dist/wedding-temp/browser` to Pages (angular-cli-ghpages, CNAME `erasoumdate.com.br`)
- `pnpm test` — runs `@angular/build:unit-test` (Vitest + jsdom are configured, but **no `.spec.ts` files exist yet**)

## Architecture (big picture)

The root `App` component (`src/app/app.ts` + `src/app/app.html`) renders **two
completely different UIs** based on `isMobile` (`window.innerWidth <= 768`):

- **Desktop** renders *only* `<app-save-the-date>` showing a **QR code of the
  current URL**. The site is meant to be scanned and opened on a phone — desktop
  is just the handoff screen.
- **Mobile** renders the full scroll-snap experience: `<app-menu>`, all six page
  sections, and `<app-footer>`.

Other structural facts:

- **Router is empty** (`app.routes.ts` is `[]`). There is no navigation — the page
  is a single vertical scroll composed directly in `app.html`.
- **Pages are numbered folders** under `src/app/components/pages/`
  (`0-save-the-date` … `5-hospedagem`); the leading number encodes scroll order.
  Reusable building blocks live in `components/shared/` (`section`, `card`, `menu`,
  `footer`). `<app-section>` is the standard wrapper for a page's header/title/body.
- **All content is hardcoded** as component properties (couple names, dates,
  WhatsApp numbers `numero`, hotel arrays, map coordinates). `README.md` §Customização
  maps where each value lives.
- **Theming**: `data-theme` on `<html>`, persisted in `localStorage['theme']`,
  defaulting to the OS preference. See `App.resolveInitialTheme()`.
- **Scroll directives** (`src/app/directives/`, both standalone, IntersectionObserver-based):
  `appScrollReveal` fades elements in with a random stagger delay; `appScrollActive`
  toggles the `section--active` class.
- **`QrCodeService`** (`src/app/services/`) builds a dotted-circle SVG QR with the
  logo centered; `generateForCurrentUrl()` feeds the desktop view.

## Conventions & gotchas

- **pnpm, not npm** for all local commands.
- **Prettier**: tabs (`tabWidth: 4`), single quotes, `printWidth: 100`,
  `singleAttributePerLine` (config is in `package.json`).
- **Styling**: global tokens + shared component classes (`.card`, `.action`,
  `.body-text`, `.links`, etc.) live in `src/styles.scss`. Component `.scss` files
  add only their own specifics — do **not** redefine shared classes; use a local
  override selector instead (see `DESIGN-SYSTEM.md` §8).
- **flash-tattoo uses `ViewEncapsulation.None` on purpose** — the Pinterest embed
  injects DOM without Angular's scoping attributes, so its styles must be global.
  Don't "fix" this.
- **Commits** follow Conventional Commits in Portuguese (`chore:`, `refactor:`, …).

## Reference docs

Read these for detail rather than re-deriving it:

- `README.md` — project overview and a customization map (which file holds each editable value).
- `DESIGN-SYSTEM.md` — color tokens, typography classes, component APIs (`<app-section>` inputs, card/button classes), breakpoints, and the styling rules above.
