---
name: Precision Core
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system is engineered for a high-end hardware e-commerce platform that treats GPUs as precision instruments rather than toys. The brand personality is professional, technical, and high-performance.

The design style is **Corporate Modern** with a **Technological** edge. It leans into high-quality finishes, deep depth, and precision-aligned elements. It avoids the chaotic "RGB gamer" aesthetic in favor of a sophisticated studio environment. The goal is to evoke a sense of immense power contained within a clean, controlled interface. The UI should feel like a high-end workstation: reliable, fast, and expensive.

## Colors

The palette is anchored in a deep **Charcoal and Navy** spectrum, providing a stable, low-strain environment that makes hardware imagery pop.

- **Primary (Electric Blue):** Used for critical call-to-actions, selection states, and brand-defining moments.
- **Secondary (Emerald Green):** Reserved for "In Stock" statuses, high-performance ratings, and success states.
- **Tertiary (Amber):** Denotes value-tier products, low-stock warnings, or "Mid-Range" category tagging.
- **Quaternary (Soft Purple):** Specifically for "Creative & Rendering" specific hardware or professional-grade workstation units.

Avoid pure black (#000) to maintain a sense of material depth. Use the neutral slate shades for text and secondary interface elements.

## Typography

The typography system prioritizes legibility and technical precision.

- **Headlines (Hanken Grotesk):** A sharp, contemporary grotesque that feels engineered. High weights (700+) are used for product titles to convey strength.
- **Body (Inter):** The industry standard for UI clarity. Used for all descriptive text and technical specifications.
- **Technical Labels (Geist):** A monospaced-leaning sans used for data points like "TDP: 450W" or "Clock: 2.5GHz," emphasizing the developer/engineer aesthetic.

Keep line heights generous to ensure readability in data-heavy specification tables.

## Layout & Spacing

The design system utilizes an **8px grid system** for primary layout and a **4px minor grid** for component internals.

- **Grid:** Use a 12-column fluid grid for desktop with 24px gutters. For mobile, shift to a 2-column or 1-column layout with 16px margins.
- **Rhythm:** Maintain "Airy" spacing. Product cards should have at least 24px of internal padding to prevent technical specs from feeling cluttered.
- **Alignment:** Strictly align technical data points to a vertical rhythm to evoke a sense of order and precision.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Ambient Shadows**.

1.  **Level 0 (Background):** `#0F172A` — The base canvas.
2.  **Level 1 (Cards/Surfaces):** `#1E293B` — Raised elements with a 1px border (`#334155`) to define edges.
3.  **Level 2 (Popovers/Modals):** `#2D3748` — High-elevation elements with a soft, expansive shadow (0px 20px 40px rgba(0,0,0,0.4)).

Use subtle "Inner Glows" (1px top border at 10% opacity) on buttons and primary cards to simulate the way light hits a chamfered hardware edge.

## Shapes

The shape language combines technical rigidity with modern approachability.

- **Containers:** Standard cards and containers use a **rounded-2xl (1rem / 16px)** radius. This softens the "industrial" feel, making the high-tech components feel like premium consumer goods.
- **Small Elements:** Buttons, input fields, and chips use a **rounded-lg (0.5rem / 8px)** radius to maintain a tighter, more functional look.
- **Icons:** Use minimalist line icons with a 2px stroke weight and slightly rounded caps to match the UI radius.

## Components

- **Product Cards:** High-quality image at the top, followed by a bold Hanken Grotesk title. Technical specs (VRAM, Clock Speed) should be displayed in Geist "label-sm" chips.
- **Buttons:**
    - *Primary:* Electric Blue background, white text, subtle top-inner-glow.
    - *Secondary:* Ghost style with 1px border (#334155), shifting to Primary on hover.
- **Category Chips:** Use the quaternary/tertiary colors for "Creative" or "Value" tags. These should have a subtle background tint (10% opacity) and a high-contrast label.
- **Input Fields:** Darker than the card surface (#0F172A), 1px border, focused state uses a 2px Electric Blue ring.
- **Lists (Specs):** Alternating row backgrounds (zebra striping) using very subtle tonal shifts to assist eye-tracking across long technical rows.
- **Status Indicators:** Small, glowing pips (Secondary Green for "In Stock") to provide immediate visual feedback without cluttering text.