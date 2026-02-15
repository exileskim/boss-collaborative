# Boss Collaborative Website Redesign — Design Document

**Date:** 2026-02-15
**Client:** Annemarie Boss — Boss Collaborative
**Current Site:** https://www.bosscollaborative.com
**Project Goal:** Complete redesign and rebuild of the Boss Collaborative consulting website

---

## 1. Current Site Analysis

**What exists:** A Next.js + Payload CMS site with dark theme, Inter font, Calendly integration. 6 services listed, impressive client logos (NASA, NIH, NSF, USF, Dali Museum, City of St. Pete, Bloomin' Brands), founder bio, and contact form.

**What's broken/missing:**
- /services returns 404
- /blog returns 404
- No testimonials or case studies
- No blog content despite feature being enabled
- No team humanization beyond brief founder bio
- Overly complex tech stack (full-stack framework for a brochure site)
- Slow load times due to framework overhead

**Business context:** Collaborative consulting firm specializing in facilitation, workshop design, and strategy. Works across science, government, education, and industry. Run by Annemarie Boss (10+ years experience).

---

## 2. Decisions Made

### Tech Stack: Plain HTML/CSS/JS

**Chosen over:**
- **Next.js (current stack):** Rejected. GitHub Pages only serves static files — `next export` loses SSR, API routes, middleware, ISR. Paying complexity tax for zero framework benefits. The current site's slowness proves the point.
- **Astro:** Solid static site generator, but overkill for 6 pages. Adds build step, Node.js dependency, and learning curve for maintenance with no real upside at this scale.
- **React + Vite (static export):** SPA approach means heavier client-side JS, hydration overhead, and worse baseline SEO. Solving problems that don't exist here.

**Why plain HTML/CSS/JS wins:**
- Zero build step, zero dependencies
- Fastest possible load times (no framework JS to parse/hydrate)
- Best SEO by default (real HTML served immediately)
- Modern CSS (grid, custom properties, scroll-driven animations) is powerful enough
- Anyone can maintain it — edit HTML, push, done
- Deploys identically to GitHub Pages (dev/preview) and Vercel (production)

### Design Direction: Bold + Creative, Grounded by Warmth

**Chosen over:**
- **Warm & approachable only:** Too soft for someone who works with NASA and NIH. Undersells the gravitas.
- **Bold & confident only:** Too corporate. Misses the creative facilitation angle and the Dali Museum side of her work.
- **Clean & modern only:** Generic. Every consulting site looks like this. Wouldn't stand out.
- **Creative & energetic only:** Could feel unserious for government/science clients.

**Why bold + creative + warm wins:** Annemarie's client list tells two simultaneous stories — serious high-stakes work (NASA, NIH, NSF) AND creative/artistic collaboration (Dali Museum). Her brand is literally "creative collaboration for complex challenges." The design must feel confident AND creative AND human.

### Site Architecture: Multi-page static with shared styling (Approach A)

**Chosen over:**
- **Approach B (Single-page hash routing):** Bad for SEO (single URL), blog/case studies don't work well as overlays, harder to maintain.
- **Approach C (Web Components):** More complexity than needed, JS dependency for core rendering, over-engineered for 6 pages.

**Why Approach A wins:** For 6 pages, duplicating a nav and footer is trivial. Zero JS dependencies for core rendering = fastest load, best SEO, simplest maintenance. Vanilla JS only for scroll animations and mobile menu.

### Pages: Full Package (6 pages)

Home, About, Services, Contact, Case Studies (with 3 individual study pages), Blog (with 2 placeholder posts).

**Chosen over:**
- Core 4 only: Misses social proof opportunity (case studies) and SEO long game (blog)
- Core 4 + Case Studies: Blog is important for SEO growth
- Core 4 + Blog: Case studies are the strongest trust signal for consulting

---

## 3. Visual Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#FAFAF8` | Warm off-white background |
| `--text-primary` | `#1A1A2E` | Deep navy-black body text |
| `--accent-primary` | `#E8572A` | Burnt orange — CTAs, highlights |
| `--accent-secondary` | `#2D5A7B` | Deep teal-blue — secondary elements |
| `--accent-tertiary` | `#D4A853` | Warm gold — sparingly for emphasis |
| `--neutral-500` | `#6B7280` | Subtle text, icons |
| `--neutral-300` | `#D1D5DB` | Borders, dividers |

### Typography
| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Headings | Space Grotesk or Outfit | 600-700 | Bold, geometric, has personality |
| Body | Inter or DM Sans | 400-500 | Clean readability |
| Accent/quotes | Playfair Display | 400-600i | Refined serif for pull quotes, case study titles |

### Layout Principles
- Asymmetric grid layouts — not everything centered
- Generous whitespace — lets bold typography breathe
- Full-bleed color sections to break up scroll and create visual rhythm
- Cards with subtle depth (soft shadows)
- Mobile-first CSS, breakpoints at 768px (tablet) and 1200px (desktop)

### Animation & Interaction
- Scroll-triggered fade-ins (CSS `@keyframes` + Intersection Observer)
- Subtle parallax on hero imagery
- Hover states with smooth color transitions
- Mobile menu with smooth slide-in
- All vanilla CSS/JS — no animation library

---

## 4. File Structure

```
boss-collaborative/
├── index.html                  (Home)
├── about.html                  (About)
├── services.html               (Services)
├── contact.html                (Contact)
├── case-studies.html           (Case Studies index)
├── case-studies/
│   ├── nasa-workshop.html
│   ├── dali-innovation.html
│   └── city-stpete.html
├── blog.html                   (Blog index)
├── blog/
│   ├── power-of-facilitation.html
│   └── navigating-complexity.html
├── css/
│   ├── variables.css           (design tokens — colors, fonts, spacing)
│   ├── base.css                (reset, typography, global styles)
│   ├── layout.css              (grid system, containers, responsive)
│   ├── components.css          (cards, buttons, nav, footer)
│   └── pages.css               (page-specific overrides)
├── js/
│   ├── nav.js                  (mobile menu toggle)
│   └── animations.js           (scroll-triggered animations via IntersectionObserver)
├── assets/
│   ├── images/                 (hero images, founder photo, case study images)
│   ├── icons/                  (service icons, social icons as SVG)
│   └── fonts/                  (self-hosted web fonts)
├── sitemap.xml
├── robots.txt
├── CNAME
└── 404.html
```

---

## 5. Page-by-Page Content Structure

### Home (index.html)
1. **Hero** — Full-viewport. Bold headline "Creative Collaboration for Complex Challenges." Subtitle with value prop. CTAs: "Book a Discovery Call" (primary, burnt orange) + "See Our Work" (secondary, outlined). Abstract geometric background element.
2. **Client Logo Bar** — NASA, NIH, NSF, USF, Dali Museum, City of St. Pete, Bloomin' Brands, etc. Subtle infinite scroll animation. No heading — logos speak for themselves.
3. **Services Preview** — 6 service cards in 3-column grid with icons, short descriptions, "Learn More" links. Asymmetric layout.
4. **Featured Case Study** — Highlighted case study with bold pull quote and outcome stat. Link to case studies page.
5. **About Teaser** — Short paragraph about Annemarie with photo. "Meet the Founder" link.
6. **CTA Section** — Full-bleed accent color block. "Ready to tackle your next challenge?" + Calendly booking button.
7. **Footer** — Nav links, email (annemarie@bosscollaborative.com), LinkedIn, copyright.

### About (about.html)
1. **Hero** — "Meet Annemarie Boss" with professional photo
2. **Story** — Background, philosophy, 10+ years experience narrative
3. **Approach** — How she works: Discovery, Design, Facilitation, Follow-Through
4. **Values** — Mission and vision as visual blocks
5. **CTA** — "Let's Collaborate" with discovery call link

### Services (services.html)
1. **Hero** — "How We Work"
2. **Service Deep Dives** — 6 sections, each with description, who it's for, what to expect, example outcomes. Alternating left/right layout.
   - Workshop Facilitation (10-500+ people)
   - Strategy & Planning
   - Program Design & Launch
   - Innovation & Change Facilitation
   - Team Offsites
   - Custom Consulting
3. **Process Overview** — 4-step visual: Discovery → Design → Facilitation → Impact
4. **CTA** — "Not sure what you need? Let's talk."

### Case Studies (case-studies.html)
1. **Hero** — "Our Work in Action"
2. **Case Study Cards** — 3 cards with challenge/approach/outcome structure:
   - NASA Workshop (scientific collaboration at scale)
   - Dali Museum Innovation (creative program design)
   - City of St. Pete (government strategic planning)
3. Each links to individual detail page with full narrative

### Blog (blog.html)
1. **Hero** — "Insights & Ideas"
2. **Post Grid** — Cards with title, date, category tag, excerpt
3. Placeholder posts:
   - "The Power of Facilitation in Complex Organizations"
   - "Navigating Complexity: When Teams Need More Than a Meeting"

### Contact (contact.html)
1. **Hero** — "Let's Start a Conversation"
2. **Two-column layout:**
   - Left: Contact form (name, email, message) — form submits via Formspree or similar static-compatible service
   - Right: Direct contact info (email, LinkedIn, Calendly link)
3. **Calendly Embed** — Inline booking widget for 20-minute discovery calls

---

## 6. SEO Foundation

- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- Unique `<title>` and `<meta name="description">` per page
- Open Graph tags for social sharing
- JSON-LD structured data (LocalBusiness schema)
- `sitemap.xml` with all pages
- `robots.txt` allowing full crawl
- Proper heading hierarchy (single `<h1>` per page)
- Alt text on all images
- Fast load times (no framework overhead = good Core Web Vitals)

---

## 7. Hosting & Deployment

- **Development/Preview:** GitHub Pages from main branch
- **Production (eventual):** Vercel — edge CDN, automatic HTTPS, preview deployments
- **Domain:** bosscollaborative.com (CNAME configuration)
- **Contact Form:** Formspree or similar static-form service (no backend needed)
- **Calendly:** Embedded via their standard JavaScript widget

---

## 8. Team Structure (for implementation)

The team should review this entire design document before beginning work. All proposals, trade-offs, and decisions are documented above for full context.

Recommended 4 teammates (all Opus):
1. **Foundation Lead** — CSS design system, shared components (nav, footer), responsive grid, base styles
2. **Homepage + About Lead** — index.html, about.html — the two most design-intensive pages
3. **Services + Contact Lead** — services.html, contact.html, form integration, Calendly embed
4. **Content Lead** — case-studies.html, blog.html, all individual case study and blog post pages, SEO markup, sitemap

File ownership prevents conflicts. Dependencies flow from Foundation → other teammates.
