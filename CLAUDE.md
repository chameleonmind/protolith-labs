# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Protolith Labs is a marketing website for a full-stack product consultancy, built with **Astro 5** and **Vue 3**. The site features high-performance WebGL animations, 3D hologram card effects, and interactive UI components.

## Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build production site to ./dist/
pnpm preview    # Preview built site locally
```

## Architecture

### Framework & Stack
- **Astro 5** - Static site generator with islands architecture
- **Vue 3** - Used for interactive island components (via @astrojs/vue)
- **TypeScript** - Strict mode enabled
- **SCSS** - Sass embedded for styling
- **Partytown** - Off-main-thread script execution for analytics

### Directory Structure

```
/src
├── /assets/styles/       # Global SCSS (variables.scss has design tokens)
├── /components/          # Astro section components
│   └── /elements/        # Atomic UI components (Button, GradientBorder, PlusBox)
├── /layouts/             # Layout.astro - base template with meta tags
├── /pages/               # Route pages (index.astro, privacy.astro)
├── /scripts/             # WebGL shaders (protolith-shader.ts, lines-card-shader.ts)
└── /utils/               # Helper functions
```

### Key Patterns

**Component Architecture:**
- Section components in `/components/` (Hero, ContactSection, FAQSection, etc.)
- Atomic UI elements in `/components/elements/`
- Props-based variants with TypeScript interfaces

**Styling:**
- CSS custom properties defined in `variables.scss` for theming
- Scoped SCSS within each Astro component's `<style>` tags
- 3D effects use CSS transforms with `hologram-cards.scss`

**Animation:**
- WebGL shaders for morphing animations (`protolith-shader.ts`)
- Inline scripts for interactive features (sticky header, parallax)
- `requestAnimationFrame` for scroll/resize handlers
- Respects `prefers-reduced-motion`

**Form Handling:**
- Netlify Forms integration with honeypot spam protection
- Hidden form in Layout.astro for Netlify form detection during build

### Responsive Breakpoints
- Mobile: 768px
- Header shrink threshold: 200px scroll
