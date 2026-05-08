---
name: Protolith Labs
description: Marketing site for a full-stack product consultancy — considered, craft-forward, calm.
colors:
  primary: "#07316a"
  primary-light: "#0348a5"
  primary-deep: "#041d40"
  vermillion: "#ff5641"
  magenta: "#cf0177"
  violet-holo: "#7f38dc"
  surface-base: "#f5f7fa"
  surface-muted: "#ececef"
  surface-dim: "#e1e1e8"
  ink: "#2c2c30"
  ink-faint: "#494959"
  success: "#72c61a"
typography:
  display:
    fontFamily: "Funnel Display, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Funnel Display, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Funnel Display, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, Helvetica, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, Helvetica, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  xs: "4px"
  sm: "14px"
  md: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, #ff5641, #cf0177)"
    textColor: "#ffffff"
    rounded: "{rounded.xs}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "linear-gradient(135deg, #ff5641, #cf0177)"
    textColor: "#ffffff"
    rounded: "{rounded.xs}"
    padding: "12px 24px"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: "8px 16px"
  input-default:
    backgroundColor: "{colors.surface-base}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: "14px 16px"
  input-focus:
    backgroundColor: "{colors.surface-base}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: "14px 16px"
---

# Design System: Protolith Labs

## 1. Overview

**Creative North Star: "The Deliberate Workshop"**

Protolith Labs is built like the software it makes: nothing accidental, nothing gratuitous. The visual system operates from a light, cool-white ground — drawing paper under overhead light — with deep navy providing structure and a warm vermillion-to-magenta accent pair that appears only where it earns its place. The WebGL morphing shader and hologram 3D tilt cards are not decoration; they are the work itself, demonstrating the technical capability that the copy describes. Restraint is what makes these moments land.

The aesthetic rejects both ends of the current market: the SaaS template (hero metrics, identical card grids, "Scale your business" headlines, pastel illustration libraries) and the dark agency aesthetic (neon purple glows, crypto-adjacent opacity, glassmorphism everywhere). Protolith Labs occupies the space between — considered like Stripe, technically expressive like Active Theory, high craft like Lusion — but quieter than all of them.

Everything ornamental carries a second function. The dashed PlusBox borders delimit content zones and provide grid rhythm simultaneously. The gradient-mask border component signals boundary without heaviness. The corner plus markers become a signature motif — a small, recurring proof of care.

**Key Characteristics:**
- Light ground (cool off-white surfaces), deep navy structure, warm accent reserved for CTAs and active states
- Display type in Funnel Display; body in Manrope — authority paired with clarity
- Motion is earned: WebGL animations for hero impact, gradient underlines on hover, scale micro-interaction on CTA
- Flat-by-default surfaces; elevation appears only as state (hover shadow, scroll header shadow)
- Signature PlusBox motif with corner markers, gradient-mask border containers, 3D hologram service cards
- Strict light mode; no dark-mode variant currently exists

## 2. Colors: The Blueprint Palette

A light, technically cool ground with one deep structural hue and a two-stop warm accent that behaves like a single voice.

### Primary
- **Blueprint Deep** (`#07316a`): The structural color. Used for headings, brand name, card heading text, hologram icon overlay base, and any UI element that needs to read as an authoritative anchor. Think architectural plan ink on drafting paper.
- **Blueprint Ink** (`#0348a5`): Lighter navy, used for interactive states and links where the full depth of Blueprint Deep would be too heavy.
- **Inkwell** (`#041d40`): Darkest navy. Used for depth in gradients and shadow contexts only — never as a standalone background.

### Secondary
- **Signal Vermillion** (`#ff5641`): The hot end of the accent pair. Primary CTA buttons, gradient-underline hover reveals, hologram card gradient start. Appears in ≤10% of any given screen surface. The first stop of every accent gradient.
- **Catalyst Magenta** (`#cf0177`): The deep end of the accent pair. Appears only paired with Signal Vermillion in linear-gradient form. Never used alone as a flat fill.

### Tertiary
- **Spectral Violet** (`#7f38dc`): Appears exclusively inside hologram card gradient animations (`#7f38dc → #cf0177 → #ff5641`). Never outside that context.

### Neutral
- **Drawing Paper** (`#f5f7fa`): Primary background — the light, slightly cool surface the entire site lives on. All form inputs, content containers, and the page background use this value.
- **Drafting Grey** (`#ececef`): Secondary background for subtle differentiation between adjacent sections. One step darker than Drawing Paper.
- **Blueprint Grid** (`#e1e1e8`): Tertiary surface — used for borders, dividers, and container differentiation where `border-color` at 10% opacity is not sufficient.
- **Carbon Ink** (`#2c2c30`): Primary text. Not pure black — a near-black with a faint warm-purple undertone that prevents harshness on the cool ground.
- **Warm Graphite** (`#494959`): Secondary text — descriptions, labels, captions, form helper text.
- **Signal Green** (`#72c61a`): Success states only. Form submission confirmed. Never decorative.

### Named Rules
**The Two-Stop Rule.** Signal Vermillion and Catalyst Magenta are not independent colors. They exist as a gradient pair: vermillion → magenta, always `linear-gradient(135deg, #ff5641, #cf0177)` or the reverse for underline reveals. Never apply either as a flat fill. Never apply them in a gradient direction other than 90deg or 135deg.

**The Rarity Rule.** The accent gradient occupies ≤10% of any given screen. Its scarcity is its signal. A screen that feels orange or magenta anywhere other than the primary CTA has broken this rule.

**The Spectral Boundary Rule.** `#7f38dc` (Spectral Violet) is hologram-exclusive. It does not appear in buttons, text, borders, backgrounds, or any non-hologram context.

## 3. Typography: The Two-Voice System

**Display Font:** Funnel Display (sans-serif fallback)
**Body Font:** Manrope (Helvetica, Arial fallback)

**Character:** Funnel Display carries authority and geometric precision — it reads like a technical instrument at large sizes, confident and structured. Manrope brings humanist warmth to the body: slightly rounded terminals, open apertures, highly legible at small sizes. Together they communicate expertise without coldness.

### Hierarchy
- **Display** (700, 3rem, ~1.1 line-height): Hero section heading only. The single largest type on any page — used once per page maximum. `text-wrap-style: balance` applied.
- **Headline** (700, 2.5rem, 1.2 line-height): Section headings (h2). The primary organizing unit across every content section. `text-wrap-style: balance` applied.
- **Title** (700, 2rem, 1.3 line-height): Subsection headings (h3). Card titles, FAQ questions, sub-group labels.
- **Body** (400, 1.125rem, ~1.6 line-height): Primary prose. Description text, paragraph content. `text-wrap-style: pretty` applied for paragraph-level wrapping. Max line length: 65–75ch.
- **Label** (600, 0.9375rem, 1.4 line-height): Form labels, metadata, caption-level identifiers. Same family as body (Manrope), differentiated by weight and size reduction.

### Named Rules
**The Two-Font Rule.** Only Funnel Display and Manrope are used. No third font for code, no monospace variant, no decorative additions. Type contrast comes from scale and weight, not family proliferation.

**The No-Gradient-Text Rule.** Do not use `background-clip: text` with a gradient fill for decorative text emphasis. The `.gradient-text` utility class exists in the current codebase and should be treated as a pattern to retire, not extend. Emphasis is achieved through size, weight, and solid accent color — never through a gradient clip.

## 4. Elevation

This system is flat by default. Surfaces exist on the same plane at rest; elevation is a state that appears in response to interaction or position change, not as a permanent decorative layer.

No card, content block, or static container carries a shadow at rest. The hierarchy between surfaces is established through background color steps (Drawing Paper → Drafting Grey → Blueprint Grid) and border treatments (1px dashed border at `rgba(44, 44, 48, 0.1)`).

### Shadow Vocabulary
- **Structural Float** (`0 12px 30px rgba(0, 0, 0, 0.12)`): The header on scroll. Appears when the navigation bar detaches from the top of the page and floats above content. Structural function, not decorative.
- **CTA Lift** (`0 8px 15px rgba(0, 0, 0, 0.2)`): Button hover state — appears simultaneously with the scale(1.015) transform. Communicates that the button is a pressable object, not a flat label.
- **Focus Ring** (`0 0 0 3px rgba(255, 86, 65, 0.05)`): Input focus state. A 3px accent-tinted glow at 5% opacity, paired with a solid vermillion border. Accessible and visually connected to the accent palette.

### Named Rules
**The Flat-by-Default Rule.** If a surface doesn't move, it doesn't have a shadow. Decoration through shadow is forbidden. Every shadow in this system exists because something changed state.

## 5. Components

### Buttons

Two variants only. No tertiary, no icon-only, no outline variants.

- **Shape:** 4px radius (sharp, precise — not rounded enough to feel friendly, not square enough to feel austere)
- **Primary:** `linear-gradient(135deg, #ff5641, #cf0177)`, white text, 12px/24px padding, bold weight. On hover: scale(1.015) + CTA Lift shadow + text bounce animation (translateY loop at 0.2s ease-in-out). The primary button is the single most energetic element on any given screen — use it once per section maximum.
- **Text:** Transparent background, Carbon Ink text, 8px/16px padding. On hover: a gradient underline (`linear-gradient(90deg, #ff5641, #cf0177)`) animates from 0 width to full span at `cubic-bezier(1, 0, 0, 1)` 0.5s. Used for secondary navigation-level actions.

### Cards / Containers

Service cards use the hologram card structure (see Signature Components below). The broader cards-grid system presents them in a horizontal scroll snap layout on mobile, wrapping to 3-column on desktop at 768px.

- **Corner Style:** `calc(4px * 4)` = 16px for containers; hologram card tops use `calc(4px * 4 - 1px)` with bottom corners squared.
- **Background:** Drawing Paper (`#f5f7fa`) or transparent. No card uses a dark background outside of the hologram effect zone.
- **Shadow Strategy:** None at rest. See Elevation section.
- **Internal Padding:** 1.5rem for card text areas.

### Inputs / Fields

Used in the contact form. Clean, minimal — the form should feel like a professional tool, not a marketing page form.

- **Style:** Drawing Paper background, 1px solid border at `rgba(44, 44, 48, 0.1)`, 4px radius, 14px top/bottom padding, 16px left/right padding.
- **Focus:** Vermillion border (`#ff5641`) + Focus Ring glow. Outline removed and replaced with the border-color + box-shadow pair.
- **Hover:** Border darkens from 10% to 20% opacity Carbon Ink.
- **Textarea:** Vertically resizable, 120px minimum height.
- **Select:** Custom chevron SVG arrow, `appearance: none`. Same styling as inputs.

### Navigation

Sticky header that responds to scroll position.

- **Default state (top of page):** Full-width, no border-radius, 64px tall. Semi-transparent glass background (`rgba(255, 255, 255, 0.35)`) with `backdrop-filter: blur(10px)`. Bottom border at border-color. Text: Carbon Ink.
- **Scrolled state (>200px):** Floats as a pill — max-width 1180px, 16px border-radius, Structural Float shadow. Transitions at 220ms ease.
- **Brand mark:** Funnel Display 700, -0.02em letter-spacing, not decorated.
- **Nav links:** Text Button variant. Manrope 600, 82% opacity at rest, 100% on hover with gradient underline reveal.
- **Mobile (≤768px):** Nav links hidden, replaced by a pill-shaped "Menu" button (999px radius, white 60% opacity fill). Dropdown at `rgba(255, 255, 255, 0.92)` with 14px radius and Structural Float shadow.

### Signature Components

**PlusBox.** A content zone delimiter. Applies dashed top and bottom borders (`border: 1px dashed rgba(44, 44, 48, 0.1)`) with SVG plus-sign corner markers positioned at each activated corner. Two variants: `normal` (markers at top-right and bottom-left, Blueprint Deep color) and `inverted` (markers at top-left and bottom-right, Signal Vermillion color). The `all` variant activates all four. The corner markers animate through Blueprint Deep → Signal Vermillion → Carbon Ink in a cycle when active. This motif is the site's primary structural accent — it appears in the hero, around the animation container, and throughout sections.

**Hologram Card.** A 3D service card that responds to cursor position with a CSS perspective tilt and WebGL canvas overlay producing a shifting iridescent gradient (`#7f38dc → #cf0177 → #ff5641`). The card top uses a 15px radius (top corners only), minimum 240px height. A radial glare overlay follows the cursor position using CSS custom properties (`--mx`, `--my`, `--rx`, `--ry`). At rest, the card is a neutral light surface; on hover/focus, the holographic effect activates. This is the primary showcase element for service categories.

**GradientBorder.** A container with a masked gradient border. Uses CSS `mask-composite: exclude` to paint a border using a radial + linear gradient blend (`text-color → transparent`), creating an edge that fades toward the interior. Configurable width (default 1px), radius (default 12px), and glow intensity. Used to frame content blocks that need separation without the weight of a solid border.

## 6. Do's and Don'ts

### Do:
- **Do** use Signal Vermillion and Catalyst Magenta exclusively as a paired gradient (`linear-gradient(135deg, #ff5641, #cf0177)`). Never as flat fills, never separately.
- **Do** keep the accent gradient at ≤10% of any screen surface. Primary buttons and link underlines are the two valid contexts.
- **Do** use flat surfaces at rest. Shadow appears only when something changes state (hover, scroll, focus).
- **Do** use Blueprint Deep (`#07316a`) for all heading text and structural anchors. Carbon Ink (`#2c2c30`) for body text.
- **Do** use Drawing Paper (`#f5f7fa`) as the universal background for inputs and content containers.
- **Do** let the PlusBox corner-marker motif carry grid rhythm. Place it at section boundaries and container edges, not arbitrarily.
- **Do** include `prefers-reduced-motion` overrides for any `requestAnimationFrame` or CSS transition/animation. WebGL renderers should fall back to a static placeholder.
- **Do** size body text at 1.125rem minimum and cap line length at 65–75ch for prose-heavy sections.
- **Do** use `text-wrap-style: balance` on headings and `pretty` on paragraphs.

### Don't:
- **Don't** use generic SaaS landing page patterns: hero metrics (big stat + small label), identical icon-card grids, stock photo illustrations, benefit-list bullet walls, or any headline built on the template "Scale/Accelerate/Unlock your X."
- **Don't** use dark-mode surfaces with neon purple, green, or cyan accents. Don't apply glassmorphism as a default surface treatment (the header's glass effect is state-conditional and purposeful — not a pattern to generalize).
- **Don't** add border-left or border-right greater than 1px as a colored stripe accent on cards, callouts, or list items. The system uses dashed horizontal borders and corner marks for structure — side stripes are foreign to this vocabulary.
- **Don't** use gradient text (`background-clip: text` with a gradient). The `.gradient-text` class exists in the codebase as a legacy pattern. Retire it rather than extend it. Use solid Blueprint Deep or Carbon Ink for emphasis; use size and weight for hierarchy.
- **Don't** add a third typeface. Funnel Display and Manrope are the system's only voices. No monospace, no script, no geometric display alternatives.
- **Don't** apply Spectral Violet (`#7f38dc`) outside of the hologram card WebGL gradient. It is a rendering artifact made meaningful — not a palette color for general use.
- **Don't** use modal dialogs as a first-thought solution. The site is a single-page marketing experience; inline progressive disclosure or scroll navigation handles every interaction that a modal might otherwise serve.
- **Don't** stack social proof: no testimonial carousels, no logo walls, no "trusted by X companies" counters. Expert confidence in this system is demonstrated, not asserted.
