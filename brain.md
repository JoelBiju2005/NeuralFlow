# NeuralFlow — Project Brain
> Last Updated: 2026-06-26T17:34:00+05:30
> This file is the single source of truth for the entire project. 
> Any IDE, agent, or developer picking up this project must read this file first.

---

## Project Overview
- **Name:** NeuralFlow
- **Type:** Premium SaaS Landing Page — AI Data Automation Platform
- **Framework:** React + Vite
- **Styling:** Tailwind CSS + custom CSS (src/styles/)
- **Deployment:** Vercel
- **Live URL:** [update when deployed]
- **Repo:** [update with GitHub URL]

---

## Color Palette (strict — no deviation)
| Name           | Hex       | Role                          |
|----------------|-----------|-------------------------------|
| Oceanic Noir   | #172B36   | Page background, footer       |
| Nocturnal      | #114C5A   | Alternate sections, nav blur  |
| Forsythia      | #FFC801   | Primary accent, CTAs, numbers |
| Deep Saffron   | #FF9932   | Hover states, gradients       |
| Arctic Powder  | #F1F6F4   | Primary text                  |
| Mystic Mint    | #D9E8E2   | Secondary text, borders       |

---

## Typography
| Font           | Role                                              |
|----------------|---------------------------------------------------|
| JetBrains Mono | H1, H2, prices, logo, trust bar names, code       |
| Inter          | Body, subtext, buttons, labels, nav links, forms  |

---

## Section Background
| Section      | Background          |
|--------------|---------------------|
| All Sections | #172B36 (unified)   |

---

## File Structure
```
├── index.html
├── tailwind.config.js
├── vite.config.js
├── brain.md                        ← YOU ARE HERE
├── Project assets/
│   ├── demo.mp4
│   ├── search.svg
│   ├── x-mark.svg
│   ├── link.svg
│   ├── link-solid.svg
│   ├── cube-16-solid.svg
│   ├── cog-8-tooth.svg
│   ├── chart-pie.svg
│   ├── arrow-trending-up.svg
│   ├── arrow-path.svg
│   ├── chevron-up.svg
│   ├── chevron-down.svg
│   ├── chevron-up-solid.svg
│   ├── chevron-left.svg
│   └── chevron-right.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   ├── globals.css
    │   └── animations.css
    ├── assets/svgs/index.jsx
    ├── data/
    │   ├── pricingMatrix.js
    │   └── featuresData.js
    ├── hooks/
    │   └── useIntersection.js
    └── components/
        ├── Nav.jsx
        ├── Hero.jsx
        ├── TrustBar.jsx
        ├── Features.jsx
        ├── Pricing.jsx
        ├── SocialProof.jsx
        ├── BackgroundParticles.jsx
        └── Footer.jsx
```

---

## Component Registry

### Nav.jsx
- Sticky, backdrop-blur on scroll
- Mobile: hamburger → fullscreen overlay, close with XMarkIcon
- Logo: CubeIcon + "NeuralFlow" in JetBrains Mono
- CTA: "Get Started" in forsythia, hover → deep saffron + translateY(-3px)

### Hero.jsx
- Full viewport centered flex column
- H1: "The Intelligence Layer / Your Stack Was Missing."
- Subtext: max-width 560px, Inter 400, 1.125rem
- CTAs: "Start Building" (primary) + "Watch Demo" (ghost)
- Stats: 10M+ Events/sec | 99.99% Uptime | < 50ms Latency
- Scroll indicator: chevron-down.svg, pulses, fades on scroll

### TrustBar.jsx
- Standalone component, imported after Hero in App.jsx
- "Trusted by teams at —" + 5-6 company names, JetBrains Mono, mystic mint
- Thin top/bottom border, background #172B36

### Features.jsx
- Desktop: Bento Grid (mixed card sizes col-span-7/5/4, glassmorphism surface styling, decorative watermarks, SVG sparklines, custom metrics, and rotate/pulse animations) | Mobile: Accordion (smooth height transitions)
- Staggered scroll reveal using IntersectionObserver (0-480ms delay)
- Context lock: activeIndex transfers on breakpoint cross via matchMedia
- Section H2: "Built for the Scale You Haven't Hit Yet."
- Section H2 layout centered, no capabilities eyebrow tag
- Bento card bg: Glassmorphism rgba(23, 43, 54, 0.6) with backdrop-blur

### Pricing.jsx
- PRICING_MATRIX in pricingMatrix.js — zero hardcoded values
- React.memo isolation — only PriceDisplay re-renders on toggle
- Billing: Monthly / Annual (20% discount)
- Currencies: USD / INR / EUR with tariff rates

### SocialProof.jsx
- 3 testimonials, ChevronLeft/Right carousel
- Section H2: "Trusted by Builders."
- Background: #114C5A

### BackgroundParticles.jsx
- position: fixed, inset: 0, z-index: 0, pointer-events: none
- 180–220 particles across 3 size types
- Cursor repulsion: 120px radius, max 30px displacement, rAF
- Color mix: 60% forsythia 0.2 / 30% mystic mint 0.15 / 10% saffron 0.2
- Connection lines: rgba(255,200,1,0.08)

### Footer.jsx
- Logo, nav links with LinkIcon, legal text
- Background: #172B36

---

## Constraints & Rules (never violate these)
- No Framer Motion, Radix, Shadcn, HeadlessUI in dependencies
- No hardcoded price values — all computed from PRICING_MATRIX
- No global re-renders on pricing toggle — Chrome DevTools enforced
- All animations: native CSS or WAAPI only
- Entry animations: complete within 500ms total
- Micro-interactions: 150ms–200ms ease-out
- Layout reflows: 300ms–400ms ease-in-out
- Only palette hex codes used — no arbitrary colors
- All SVGs from Project assets/ used meaningfully in UI

---

## Change Log

| # | Timestamp | File(s) Changed | What Changed |
|---|-----------|-----------------|--------------|
| 1 | 2026-06-26 | Project init    | Vite + React + Tailwind scaffolded |
| 2 | 2026-06-26 | brain.md        | Created brain.md to track project memory |
| 3 | 2026-06-26 | Features.jsx, globals.css, brain.md | Redesigned features section with premium glassmorphism bento grid, mixed sizes, custom watermarks and animations, staggered entrances, and updated project brain |
| 4 | 2026-06-26 | Features.jsx, brain.md | Increased visual density of bento cards (added active execution states, realtime badges, metadata sublabels, and optimized padding) to make sections feel elegant and packed |
| 5 | 2026-06-26 | Features.jsx, brain.md | Filled bento cards with richer copy, feature lists, and detailed subsystem metadata descriptions to eliminate empty space |
| 6 | 2026-06-26 | Features.jsx, SocialProof.jsx, brain.md | Unified page background — removed #114C5A alternation, all sections now transparent over #172B36 |
| 7 | 2026-06-26 | Hero.jsx, SocialProof.jsx, App.jsx, globals.css, brain.md | Redesigned hero stats into premium glassmorphic boxes with smooth hover shadows/lift and moved TrustBar to the bottom of the SocialProof testimonials section |
| 8 | 2026-06-26 | Hero.jsx, globals.css, brain.md | Swapped Hero copy, subtext, CTAs, and redesigned stats labels to use Inter 500, 12px, normal-case mystic mint |
