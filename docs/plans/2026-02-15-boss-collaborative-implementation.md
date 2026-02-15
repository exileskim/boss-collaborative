# Boss Collaborative Website Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete 6-page static website for Boss Collaborative consulting firm, replacing the current broken Next.js site.

**Architecture:** Multi-page static HTML/CSS/JS. No frameworks, no build step. CSS custom properties for design tokens, CSS Grid/Flexbox for layout, vanilla JS only for mobile menu and scroll animations. Hosted on GitHub Pages for preview, eventually Vercel for production.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, keyframes), vanilla JavaScript (IntersectionObserver), Google Fonts (Space Grotesk, Inter, Playfair Display).

**Design Reference:** `docs/plans/2026-02-15-boss-collaborative-redesign-design.md` — ALL teammates must read this document before starting work. It contains the full design system, color palette, typography, page structures, and all decision rationale.

**UI Implementation:** ALL page-building tasks MUST use the `frontend-design` skill for creating HTML/CSS. This ensures high design quality and avoids generic AI aesthetics.

---

## Team Structure & File Ownership

### Teammate 1: `foundation` (Foundation Lead)
**Owns:** `css/`, `js/`, `assets/`, `404.html`
- `css/variables.css`
- `css/base.css`
- `css/layout.css`
- `css/components.css`
- `js/nav.js`
- `js/animations.js`
- `assets/` directory structure + placeholder images
- `404.html`

### Teammate 2: `homepage` (Homepage + About Lead)
**Owns:** `index.html`, `about.html`, `css/pages.css` (home + about sections only)
- `index.html`
- `about.html`
- Home-specific and About-specific styles in `css/pages.css`

### Teammate 3: `services` (Services + Contact Lead)
**Owns:** `services.html`, `contact.html`, `css/pages.css` (services + contact sections only)
- `services.html`
- `contact.html`
- Services-specific and Contact-specific styles in `css/pages.css`

### Teammate 4: `content` (Content & SEO Lead)
**Owns:** `case-studies.html`, `case-studies/`, `blog.html`, `blog/`, `sitemap.xml`, `robots.txt`, `css/pages.css` (case-studies + blog sections only)
- `case-studies.html`
- `case-studies/nasa-workshop.html`
- `case-studies/dali-innovation.html`
- `case-studies/city-stpete.html`
- `blog.html`
- `blog/power-of-facilitation.html`
- `blog/navigating-complexity.html`
- `sitemap.xml`
- `robots.txt`

### File Conflict Prevention for `css/pages.css`
This file is shared but each teammate owns clearly scoped sections:
- `homepage` owns: all selectors prefixed with `.page-home` and `.page-about`
- `services` owns: all selectors prefixed with `.page-services` and `.page-contact`
- `content` owns: all selectors prefixed with `.page-case-studies` and `.page-blog`

Each teammate creates their own sections with a clear comment header (e.g., `/* === HOME PAGE === */`). No teammate edits another's section.

---

## Dependencies

```
Task F1 (variables.css) ──┐
Task F2 (base.css) ───────┤
Task F3 (layout.css) ─────┼──▶ ALL page tasks (H1-H6, S1-S6, C1-C6)
Task F4 (components.css) ──┤
Task F5 (JS utilities) ────┘

H1 (index.html structure) ──▶ H2, H3, H4 (index.html sections)
H5 (about.html structure) ──▶ H6 (about.html completion)

S1 (services.html structure) ──▶ S2, S3 (services.html sections)
S4 (contact.html structure) ──▶ S5 (integrations)

C1 (case-studies.html) ──▶ C2, C3 (individual case studies)
C4 (blog.html) ──▶ C5 (blog posts)
C6 (SEO assets) runs last after all pages exist
```

Foundation (F1-F5) MUST complete before any page teammate begins. F6 (404.html) can run in parallel with page work.

---

## Foundation Lead Tasks

### Task F1: Create CSS Design Tokens

**Files:**
- Create: `css/variables.css`

**Step 1: Create the design tokens file**

Use the `frontend-design` skill. Create `css/variables.css` with all CSS custom properties from the design doc:

```css
:root {
  /* Colors */
  --bg-primary: #FAFAF8;
  --bg-secondary: #F0EDE8;
  --bg-dark: #1A1A2E;
  --text-primary: #1A1A2E;
  --text-secondary: #4A4A5A;
  --text-light: #FAFAF8;
  --accent-primary: #E8572A;
  --accent-primary-hover: #D04A22;
  --accent-secondary: #2D5A7B;
  --accent-secondary-hover: #234B68;
  --accent-tertiary: #D4A853;
  --neutral-500: #6B7280;
  --neutral-300: #D1D5DB;
  --neutral-200: #E5E7EB;

  /* Typography */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-accent: 'Playfair Display', serif;

  --fs-hero: clamp(2.5rem, 5vw, 4.5rem);
  --fs-h1: clamp(2rem, 4vw, 3.5rem);
  --fs-h2: clamp(1.5rem, 3vw, 2.5rem);
  --fs-h3: clamp(1.25rem, 2vw, 1.75rem);
  --fs-body: 1rem;
  --fs-body-lg: 1.125rem;
  --fs-small: 0.875rem;

  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  --space-4xl: 8rem;

  /* Layout */
  --container-max: 1200px;
  --container-narrow: 800px;
  --container-padding: 1.5rem;

  /* Borders & Shadows */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 3px rgba(26, 26, 46, 0.08);
  --shadow-md: 0 4px 12px rgba(26, 26, 46, 0.1);
  --shadow-lg: 0 8px 30px rgba(26, 26, 46, 0.12);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;

  /* Breakpoints (for reference — used in media queries) */
  /* --bp-tablet: 768px */
  /* --bp-desktop: 1200px */
}
```

**Step 2: Verify**

Open in browser dev tools, confirm all variables resolve correctly.

**Step 3: Commit**
```bash
git add css/variables.css
git commit -m "feat: add CSS design tokens (colors, typography, spacing, layout)"
```

---

### Task F2: Create Base Styles & Typography

**Files:**
- Create: `css/base.css`

**Step 1: Create base styles**

Create `css/base.css` with CSS reset, base typography, and global styles. Include:
- Modern CSS reset (box-sizing, margin reset, img max-width)
- Google Fonts import for Space Grotesk, Inter, Playfair Display
- Body defaults using design tokens
- Heading styles (h1-h6) using `--font-heading`
- Paragraph and body text using `--font-body`
- Link styles with accent color
- Selection highlight color
- Smooth scrolling on `html`
- `::selection` styling with accent colors

**Step 2: Create a test HTML file to verify typography**

Create a temporary `_test.html` that imports variables.css and base.css, with all heading levels, paragraphs, links, and text styles. Open in browser and verify fonts load, sizes scale correctly with clamp(), and colors match the design tokens.

**Step 3: Commit**
```bash
git add css/base.css
git commit -m "feat: add base styles with typography and CSS reset"
```

---

### Task F3: Create Layout System

**Files:**
- Create: `css/layout.css`

**Step 1: Create layout utilities**

Create `css/layout.css` with:
- `.container` — centered max-width container with padding
- `.container--narrow` — for text-heavy content
- `.grid` — CSS Grid base with responsive columns
- `.grid--2col`, `.grid--3col` — column variants
- `.grid--asymmetric` — for non-uniform layouts
- `.section` — standard section padding
- `.section--full-bleed` — edge-to-edge colored sections
- `.flex-center`, `.flex-between` — flexbox utilities
- `.visually-hidden` — accessible screen-reader text
- Mobile-first responsive breakpoints at 768px and 1200px
- Stack-to-columns behavior for all grid layouts on mobile

**Step 2: Verify responsive behavior**

Test in browser at 375px, 768px, and 1200px widths using the test HTML file. Verify grids stack on mobile, expand on tablet, and reach full layout on desktop.

**Step 3: Commit**
```bash
git add css/layout.css
git commit -m "feat: add responsive layout system (grid, containers, sections)"
```

---

### Task F4: Create Shared Component Styles

**Files:**
- Create: `css/components.css`
- Create: `css/pages.css` (empty file with section comment headers for each teammate)

**Step 1: Create component styles**

Use the `frontend-design` skill. Create `css/components.css` with polished styles for:

**Navigation:**
- Fixed/sticky header with backdrop blur
- Logo text styling
- Desktop nav links with hover underline animation
- Mobile hamburger icon (CSS-only, 3-line to X transform)
- Mobile slide-in menu overlay

**Footer:**
- Multi-column layout (nav links, contact info, copyright)
- Stacks to single column on mobile

**Buttons:**
- `.btn` — base button styles
- `.btn--primary` — burnt orange fill, white text, hover darken
- `.btn--secondary` — outlined with accent border, hover fill
- `.btn--large` — larger CTA variant
- Smooth hover transitions using design tokens

**Cards:**
- `.card` — soft shadow, radius, padding
- `.card:hover` — elevated shadow transition
- `.card__tag` — category tag pill

**Logo Bar:**
- `.logo-bar` — horizontal scroll with CSS animation for infinite loop
- Grayscale logos that colorize on hover

**Pull Quotes:**
- Playfair Display italic, accent border-left
- Large quote marks as pseudo-elements

**Step 2: Create pages.css scaffold**

Create `css/pages.css` with empty sections for each teammate:
```css
/* === HOME PAGE === */
/* Owned by: homepage teammate */

/* === ABOUT PAGE === */
/* Owned by: homepage teammate */

/* === SERVICES PAGE === */
/* Owned by: services teammate */

/* === CONTACT PAGE === */
/* Owned by: services teammate */

/* === CASE STUDIES === */
/* Owned by: content teammate */

/* === BLOG === */
/* Owned by: content teammate */
```

**Step 3: Verify all components**

Add component examples to test HTML. Verify nav, footer, buttons, cards render correctly and hover states work.

**Step 4: Commit**
```bash
git add css/components.css css/pages.css
git commit -m "feat: add shared component styles (nav, footer, buttons, cards, logo bar)"
```

---

### Task F5: Create JavaScript Utilities

**Files:**
- Create: `js/nav.js`
- Create: `js/animations.js`

**Step 1: Create mobile navigation toggle**

Create `js/nav.js`:
- Toggle `.nav-open` class on body when hamburger is clicked
- Close menu when a nav link is clicked
- Close menu when clicking outside the menu
- Close menu on Escape key
- Prevent body scroll when menu is open
- No dependencies — pure vanilla JS with `DOMContentLoaded`

**Step 2: Create scroll animation system**

Create `js/animations.js`:
- Use IntersectionObserver to detect elements with `[data-animate]` attribute
- Add `.is-visible` class when element enters viewport
- Support different animation types via data attribute values: `fade-up`, `fade-in`, `slide-left`, `slide-right`
- Configurable threshold (default 0.1)
- Only animate once (unobserve after triggering)
- CSS classes for each animation defined in base.css or components.css:
  ```css
  [data-animate] { opacity: 0; transform: translateY(20px); transition: var(--transition-slow); }
  [data-animate="fade-in"] { transform: none; }
  [data-animate="slide-left"] { transform: translateX(-30px); }
  [data-animate="slide-right"] { transform: translateX(30px); }
  [data-animate].is-visible { opacity: 1; transform: none; }
  ```

**Step 3: Verify**

Test hamburger menu on mobile viewport. Test scroll animations by adding `data-animate="fade-up"` to test elements and scrolling.

**Step 4: Commit**
```bash
git add js/nav.js js/animations.js
git commit -m "feat: add mobile nav toggle and scroll animation system"
```

---

### Task F6: Create 404 Page and Asset Directories

**Files:**
- Create: `404.html`
- Create: `assets/images/.gitkeep`
- Create: `assets/icons/.gitkeep`
- Create: `assets/fonts/.gitkeep`

**Step 1: Create 404 page**

Use the `frontend-design` skill. Create a styled 404 page that matches the site design. Include:
- Navigation (same as all pages)
- Centered message: "Page Not Found"
- Subtext: "The page you're looking for doesn't exist or has been moved."
- Button: "Return Home" linking to index.html
- Footer
- Imports all CSS files

**Step 2: Create asset directories**

Create placeholder directories with .gitkeep files. Add any SVG icons needed by components (hamburger, arrow, external link, etc.) as inline SVG in the components or as separate .svg files in assets/icons/.

**Step 3: Commit**
```bash
git add 404.html assets/
git commit -m "feat: add 404 page and asset directory structure"
```

---

## Homepage + About Lead Tasks

> **BLOCKED BY:** Tasks F1-F4 must be complete before starting.

### Task H1: Create Homepage — Hero Section

**Files:**
- Create: `index.html`

**Step 1: Build the homepage hero**

Use the `frontend-design` skill. Create `index.html` with:
- Full HTML5 document structure
- All CSS imports (variables, base, layout, components, pages)
- JS imports (nav.js, animations.js) — deferred
- SEO meta tags: title "Boss Collaborative — Creative Collaboration for Complex Challenges", unique meta description, Open Graph tags
- JSON-LD structured data (LocalBusiness schema for Boss Collaborative)
- Navigation header (same structure on all pages — logo, nav links: Home, About, Services, Case Studies, Blog, Contact, mobile hamburger)
- Full-viewport hero section with:
  - Bold headline: "Creative Collaboration for Complex Challenges"
  - Subtitle: "Strategic facilitation and workshop design for teams navigating complexity"
  - Two CTAs: "Book a Discovery Call" (primary) + "See Our Work" (secondary, links to case-studies.html)
  - Abstract geometric background element (CSS shapes or SVG)
- Footer (same structure on all pages — nav links, email, LinkedIn, copyright 2026)
- Add `class="page-home"` to `<body>` for page-specific CSS scoping

**Step 2: Verify**

Open in browser. Check hero fills viewport, CTAs are visible, nav works. Test at 375px, 768px, 1200px.

**Step 3: Commit**
```bash
git add index.html
git commit -m "feat: add homepage with hero section, nav, and footer"
```

---

### Task H2: Add Client Logo Bar to Homepage

**Files:**
- Modify: `index.html`

**Step 1: Add logo bar section**

Below the hero in `index.html`, add:
- A `<section>` with the logo bar component
- Client logos as text/SVG (since we don't have actual logo files, use styled text with company names or create simple SVG text logos): University of South Florida, NASA, NIH, NSF, The Dali Museum, City of St. Petersburg, St. Petersburg College, Bloomin' Brands, Inova, SUMO
- CSS infinite horizontal scroll animation
- Logos in grayscale, subtle opacity
- `data-animate="fade-in"` on the section

**Step 2: Verify**

Check scroll animation loops smoothly. Logos display correctly on all viewport sizes.

**Step 3: Commit**
```bash
git add index.html
git commit -m "feat: add client logo bar with scroll animation to homepage"
```

---

### Task H3: Add Services Preview & Featured Case Study to Homepage

**Files:**
- Modify: `index.html`
- Modify: `css/pages.css` (home section only)

**Step 1: Add services preview**

Below logo bar, add:
- Section heading (something more creative than just "Services" — try "What We Do")
- 6 service cards in responsive grid (3-col desktop, 2-col tablet, 1-col mobile)
- Each card: icon (use an emoji or simple SVG as placeholder), service name, one-line description, "Learn More" arrow link to services.html
- Services: Workshop Facilitation, Strategy & Planning, Program Design & Launch, Innovation & Change Facilitation, Team Offsites, Custom Consulting
- `data-animate="fade-up"` on cards with staggered animation delay

**Step 2: Add featured case study**

Below services, add:
- Full-bleed section with `--bg-dark` background and light text
- Bold pull quote in Playfair Display from a case study
- Outcome stat (e.g., "500+ participants aligned in 2 days")
- "Read the Full Story" link to case-studies/nasa-workshop.html
- `data-animate="fade-in"` on the section

**Step 3: Add page-specific styles**

In `css/pages.css` under the `/* === HOME PAGE === */` section, add any styles specific to homepage layout that don't belong in components.css (hero background, services grid tweaks, featured case study layout).

**Step 4: Verify**

Check grid layout at all breakpoints. Verify scroll animations trigger on scroll.

**Step 5: Commit**
```bash
git add index.html css/pages.css
git commit -m "feat: add services preview and featured case study to homepage"
```

---

### Task H4: Add About Teaser & CTA to Homepage

**Files:**
- Modify: `index.html`

**Step 1: Add about teaser**

Below featured case study, add:
- Two-column layout: text left, photo placeholder right
- Short paragraph about Annemarie (2-3 sentences from design doc)
- "Meet the Founder" link to about.html
- `data-animate="slide-left"` on text, `data-animate="slide-right"` on image

**Step 2: Add CTA section**

Below about teaser, add:
- Full-bleed section with `--accent-primary` background
- Bold headline: "Ready to Tackle Your Next Challenge?"
- Subtitle: "Schedule a free 20-minute discovery call"
- Primary CTA button linking to Calendly (use # as placeholder URL)
- White text on accent background

**Step 3: Verify**

Full homepage scroll-through. All sections flow naturally. Animations trigger correctly. Responsive at all breakpoints.

**Step 4: Commit**
```bash
git add index.html
git commit -m "feat: complete homepage with about teaser and CTA section"
```

---

### Task H5: Create About Page — Hero & Story

**Files:**
- Create: `about.html`

**Step 1: Build about page structure**

Use the `frontend-design` skill. Create `about.html` with:
- Same HTML structure pattern as index.html (same nav, footer, CSS/JS imports)
- SEO: title "About — Boss Collaborative", unique meta description
- `class="page-about"` on `<body>`
- Hero section: "Meet Annemarie Boss" heading, subheading about her role
- Story section: 2-3 paragraphs about her background, philosophy, experience (use content from current site's about page as starting point)
- Professional photo placeholder (styled div with aspect ratio)
- `data-animate` attributes on content blocks

**Step 2: Verify**

Open in browser. Check nav links work between home and about. Responsive check.

**Step 3: Commit**
```bash
git add about.html
git commit -m "feat: add about page with hero and founder story"
```

---

### Task H6: Complete About Page — Approach, Values, CTA

**Files:**
- Modify: `about.html`
- Modify: `css/pages.css` (about section only)

**Step 1: Add approach section**

Below the story, add:
- "How I Work" heading
- 4-step visual process: Discovery → Design → Facilitation → Follow-Through
- Each step as a card or visual block with icon, name, and short description
- Horizontal on desktop, vertical stack on mobile

**Step 2: Add values section**

Below approach, add:
- Mission and Vision as two visual blocks side by side
- Mission: "Boss Collaborative designs and facilitates collaborative experiences that help teams navigate complexity, align strategy, and co-create innovative solutions."
- Vision: "We envision a future where our most complex challenges are met with creativity, collaboration, and solutions rooted in abundance."
- Styled with accent borders or background treatments

**Step 3: Add CTA**

- "Let's Collaborate" section with discovery call CTA
- Similar pattern to homepage CTA but can use secondary color (`--accent-secondary`)

**Step 4: Add page-specific styles**

In `css/pages.css` under `/* === ABOUT PAGE === */`, add styles for the approach steps, values blocks, and any about-specific layout.

**Step 5: Verify**

Full about page scroll-through. Nav between all completed pages. Responsive check.

**Step 6: Commit**
```bash
git add about.html css/pages.css
git commit -m "feat: complete about page with approach, values, and CTA"
```

---

## Services + Contact Lead Tasks

> **BLOCKED BY:** Tasks F1-F4 must be complete before starting.

### Task S1: Create Services Page — Hero & First 3 Services

**Files:**
- Create: `services.html`

**Step 1: Build services page structure**

Use the `frontend-design` skill. Create `services.html` with:
- Same HTML structure pattern (nav, footer, CSS/JS imports)
- SEO: title "Services — Boss Collaborative", unique meta description
- `class="page-services"` on `<body>`
- Hero section: "How We Work" heading, subtitle about collaborative approach
- First 3 service deep dives with alternating left/right layout:
  1. **Workshop Facilitation** — Groups of 10-500+. Ideation, decision-making, alignment. Who it's for: organizations needing to bring large groups together around shared goals.
  2. **Strategy & Planning** — Leadership team facilitation. Priority clarification, strategic alignment. Who it's for: executive teams navigating complex decisions.
  3. **Program Design & Launch** — Cross-sector program creation. Education, science, public service. Who it's for: organizations launching new initiatives.
- Each service: heading, description, "who it's for" line, expected outcomes
- `data-animate` on each service block

**Step 2: Verify**

Open in browser. Check alternating layout works. Responsive at all breakpoints.

**Step 3: Commit**
```bash
git add services.html
git commit -m "feat: add services page with first 3 service sections"
```

---

### Task S2: Add Remaining Services & Process Overview

**Files:**
- Modify: `services.html`

**Step 1: Add last 3 services**

Continue the alternating layout:
4. **Innovation & Change Facilitation** — Creative tools and systems thinking. Organizational transformation. Who it's for: teams facing significant change or stalled innovation.
5. **Team Offsites** — Clarity, cohesion, cultural alignment. Who it's for: teams needing reset, bonding, and strategic focus.
6. **Custom Consulting** — Tailored engagements for unique challenges. Who it's for: organizations with needs that don't fit a standard category.

**Step 2: Add process overview**

Below all services, add:
- "Our Process" heading
- 4-step horizontal visual: Discovery → Design → Facilitation → Impact
- Each step with icon, name, and one-line description
- Connected by lines/arrows on desktop, stacked on mobile
- Styled distinctly from the approach section on the About page

**Step 3: Verify**

Full services page review. All 6 services display correctly with alternating layout.

**Step 4: Commit**
```bash
git add services.html
git commit -m "feat: add remaining services and process overview"
```

---

### Task S3: Add Services CTA & Page Styles

**Files:**
- Modify: `services.html`
- Modify: `css/pages.css` (services section only)

**Step 1: Add CTA section**

Bottom of services page:
- "Not Sure What You Need?" heading
- "Every challenge is different. Schedule a free discovery call and we'll figure out the right approach together."
- Primary CTA button: "Schedule a Discovery Call"

**Step 2: Add page-specific styles**

In `css/pages.css` under `/* === SERVICES PAGE === */`, add:
- Alternating service section layout styles
- Process step connector/arrow styles
- Any service-page-specific responsive adjustments

**Step 3: Verify & commit**
```bash
git add services.html css/pages.css
git commit -m "feat: complete services page with CTA and page styles"
```

---

### Task S4: Create Contact Page — Layout & Form

**Files:**
- Create: `contact.html`

**Step 1: Build contact page**

Use the `frontend-design` skill. Create `contact.html` with:
- Same HTML structure pattern (nav, footer, CSS/JS imports)
- SEO: title "Contact — Boss Collaborative", unique meta description
- `class="page-contact"` on `<body>`
- Hero: "Let's Start a Conversation" heading
- Two-column layout:
  - **Left column:** Contact form with fields:
    - Name (text input, required, min 2 chars)
    - Email (email input, required)
    - Message (textarea, required, min 10 chars)
    - Submit button: "Send Message" (primary style)
    - Form `action` set to Formspree endpoint placeholder (https://formspree.io/f/YOUR_ID)
    - Client-side validation with HTML5 attributes
  - **Right column:**
    - Email: annemarie@bosscollaborative.com (mailto link)
    - LinkedIn: linkedin.com/in/annemarieboss1
    - "Prefer to talk?" subheading with Calendly CTA
    - Placeholder div for Calendly inline widget

**Step 2: Verify**

Check two-column layout. Form validation works. Stacks on mobile. Links are correct.

**Step 3: Commit**
```bash
git add contact.html
git commit -m "feat: add contact page with form and contact info"
```

---

### Task S5: Contact Form Integration & Calendly

**Files:**
- Modify: `contact.html`

**Step 1: Add Calendly embed**

Add Calendly inline widget script and embed div in the right column:
```html
<!-- Calendly inline widget -->
<div class="calendly-inline-widget" data-url="https://calendly.com/annemarie-bosscollaborative/discovery" style="min-width:320px;height:630px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

Note: The Calendly URL is a placeholder. Annemarie will need to provide her actual Calendly link.

**Step 2: Enhance form with submission feedback**

Add minimal JS for form submission UX:
- On submit, show a "Thank you! We'll be in touch within 24 hours." message
- Disable submit button after click to prevent double-submit
- If using Formspree, handle the redirect/AJAX response

**Step 3: Verify**

Test form validation (try empty fields, invalid email). Check Calendly widget loads (or gracefully shows placeholder if URL is wrong).

**Step 4: Commit**
```bash
git add contact.html
git commit -m "feat: integrate Calendly widget and form submission handling"
```

---

### Task S6: Polish Services & Contact Pages

**Files:**
- Modify: `services.html`
- Modify: `contact.html`
- Modify: `css/pages.css` (services + contact sections)

**Step 1: Add contact page styles**

In `css/pages.css` under `/* === CONTACT PAGE === */`, add:
- Two-column responsive layout styles
- Form field styling (consistent with design system)
- Calendly widget container styling
- Success message styling

**Step 2: Responsive polish**

Review both pages at 375px, 768px, 1200px:
- Fix any layout issues
- Ensure touch targets are 44px+ on mobile
- Check all `data-animate` attributes are present for scroll animations
- Verify nav and footer match across all pages

**Step 3: Commit**
```bash
git add services.html contact.html css/pages.css
git commit -m "feat: polish services and contact pages, responsive fixes"
```

---

## Content & SEO Lead Tasks

> **BLOCKED BY:** Tasks F1-F4 must be complete before starting.

### Task C1: Create Case Studies Index Page

**Files:**
- Create: `case-studies.html`

**Step 1: Build case studies index**

Use the `frontend-design` skill. Create `case-studies.html` with:
- Same HTML structure pattern (nav, footer, CSS/JS imports)
- SEO: title "Case Studies — Boss Collaborative", unique meta description
- `class="page-case-studies"` on `<body>`
- Hero: "Our Work in Action" heading, subtitle about real results
- 3 case study cards in responsive grid:
  1. **NASA: Aligning 500+ Scientists** — Challenge: Large-scale scientific collaboration. Category tag: "Workshop Facilitation"
  2. **The Dali Museum: Reimagining Community Programs** — Challenge: Creative program innovation. Category tag: "Program Design"
  3. **City of St. Petersburg: Strategic Planning for Growth** — Challenge: Government stakeholder alignment. Category tag: "Strategy & Planning"
- Each card: category tag, title, one-line challenge description, "Read Case Study →" link
- Cards link to individual pages in `case-studies/` directory
- `data-animate="fade-up"` with staggered delays

**Step 2: Verify & commit**
```bash
git add case-studies.html
git commit -m "feat: add case studies index page with 3 study cards"
```

---

### Task C2: Create NASA Workshop Case Study

**Files:**
- Create: `case-studies/nasa-workshop.html`

**Step 1: Build NASA case study detail page**

Use the `frontend-design` skill. Create the detail page with:
- Same HTML structure (nav, footer, CSS/JS)
- SEO: title "NASA Workshop Case Study — Boss Collaborative"
- `class="page-case-studies"` on `<body>`
- Structured as: Challenge → Approach → Outcome
- **Challenge:** NASA needed to align 500+ scientists and researchers across multiple disciplines for a collaborative workshop. Traditional meeting formats weren't working for this scale.
- **Approach:** Designed a multi-day facilitated workshop using creative collaboration techniques, breakout groups, and structured ideation sessions. Focused on building shared understanding across disciplinary silos.
- **Outcome:** Successfully facilitated alignment across all participants. Generated actionable collaborative frameworks. Follow-up sessions showed sustained cross-team collaboration.
- Pull quote from the engagement (placeholder — Annemarie can replace with real quote)
- Key stats sidebar (participants, duration, outcome metrics)
- "Back to Case Studies" link
- CTA: "Facing a similar challenge?"

Note: All case study content is placeholder. Annemarie should review and replace with actual details.

**Step 2: Verify & commit**
```bash
git add case-studies/nasa-workshop.html
git commit -m "feat: add NASA workshop case study detail page"
```

---

### Task C3: Create Dali Museum & City of St. Pete Case Studies

**Files:**
- Create: `case-studies/dali-innovation.html`
- Create: `case-studies/city-stpete.html`

**Step 1: Build Dali Museum case study**

Same structure as NASA study:
- **Challenge:** The Dali Museum wanted to reimagine their community engagement programs to be more innovative and reach new audiences.
- **Approach:** Facilitated creative design sessions with museum staff and community stakeholders. Used design thinking and artistic ideation to develop new program concepts.
- **Outcome:** Launched redesigned community programs. Increased engagement and audience diversity. New programs became models for other cultural institutions.

**Step 2: Build City of St. Pete case study**

Same structure:
- **Challenge:** The City of St. Petersburg needed strategic planning facilitation to align diverse stakeholders around growth priorities.
- **Approach:** Designed a series of facilitated planning sessions bringing together city leaders, community representatives, and department heads. Used structured collaboration to surface priorities and build consensus.
- **Outcome:** Produced a unified strategic plan with broad stakeholder buy-in. Clear priority areas identified with actionable timelines. Model adopted for subsequent planning cycles.

**Step 3: Verify navigation**

Click through: case-studies.html → each detail → back to index. Verify all links work.

**Step 4: Commit**
```bash
git add case-studies/dali-innovation.html case-studies/city-stpete.html
git commit -m "feat: add Dali Museum and City of St. Pete case studies"
```

---

### Task C4: Create Blog Index & First Post

**Files:**
- Create: `blog.html`
- Create: `blog/power-of-facilitation.html`

**Step 1: Build blog index page**

Use the `frontend-design` skill. Create `blog.html` with:
- Same HTML structure (nav, footer, CSS/JS)
- SEO: title "Blog — Boss Collaborative | Insights on Facilitation & Collaboration"
- `class="page-blog"` on `<body>`
- Hero: "Insights & Ideas" heading
- Post grid (2-column on desktop, 1 on mobile):
  - Card with: category tag, title, date, excerpt, "Read More →" link
- 2 posts listed

**Step 2: Build first blog post**

Create `blog/power-of-facilitation.html`:
- Article page layout with `<article>` semantic element
- Title: "The Power of Facilitation in Complex Organizations"
- Date: "January 15, 2026"
- Category: "Facilitation"
- 3-4 paragraphs of well-written placeholder content about why professional facilitation matters, when organizations should invest in it, and what good facilitation looks like
- Pull quote styled with Playfair Display
- "Back to Blog" link
- CTA at bottom

**Step 3: Verify & commit**
```bash
git add blog.html blog/power-of-facilitation.html
git commit -m "feat: add blog index and first blog post"
```

---

### Task C5: Create Second Blog Post

**Files:**
- Create: `blog/navigating-complexity.html`

**Step 1: Build second blog post**

Create `blog/navigating-complexity.html`:
- Same article page structure as first post
- Title: "Navigating Complexity: When Teams Need More Than a Meeting"
- Date: "February 1, 2026"
- Category: "Strategy"
- 3-4 paragraphs about the difference between meetings and facilitated sessions, signs your team needs facilitation, and how structured collaboration produces better outcomes than unstructured discussion
- Pull quote
- "Back to Blog" link + CTA

**Step 2: Update blog.html**

Ensure both posts appear in the blog index with correct links and excerpts.

**Step 3: Verify**

Navigate: blog.html → each post → back to index. All links work.

**Step 4: Commit**
```bash
git add blog/navigating-complexity.html blog.html
git commit -m "feat: add second blog post on navigating complexity"
```

---

### Task C6: Create SEO Assets & Final Polish

**Files:**
- Create: `sitemap.xml`
- Create: `robots.txt`
- Modify: `css/pages.css` (case-studies + blog sections)

**Step 1: Create sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.bosscollaborative.com/</loc><priority>1.0</priority></url>
  <url><loc>https://www.bosscollaborative.com/about.html</loc><priority>0.8</priority></url>
  <url><loc>https://www.bosscollaborative.com/services.html</loc><priority>0.8</priority></url>
  <url><loc>https://www.bosscollaborative.com/contact.html</loc><priority>0.8</priority></url>
  <url><loc>https://www.bosscollaborative.com/case-studies.html</loc><priority>0.7</priority></url>
  <url><loc>https://www.bosscollaborative.com/case-studies/nasa-workshop.html</loc><priority>0.6</priority></url>
  <url><loc>https://www.bosscollaborative.com/case-studies/dali-innovation.html</loc><priority>0.6</priority></url>
  <url><loc>https://www.bosscollaborative.com/case-studies/city-stpete.html</loc><priority>0.6</priority></url>
  <url><loc>https://www.bosscollaborative.com/blog.html</loc><priority>0.7</priority></url>
  <url><loc>https://www.bosscollaborative.com/blog/power-of-facilitation.html</loc><priority>0.5</priority></url>
  <url><loc>https://www.bosscollaborative.com/blog/navigating-complexity.html</loc><priority>0.5</priority></url>
</urlset>
```

**Step 2: Create robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://www.bosscollaborative.com/sitemap.xml
```

**Step 3: Add page-specific styles for case studies and blog**

In `css/pages.css` under `/* === CASE STUDIES === */` and `/* === BLOG === */`:
- Case study detail page layout (challenge/approach/outcome sections)
- Stats sidebar styling
- Blog post article typography
- Blog card grid styling
- Category tag colors

**Step 4: Verify all pages**

Open every page. Check:
- All inter-page navigation works
- All scroll animations trigger
- Responsive at 375px, 768px, 1200px
- SEO meta tags present on every page
- JSON-LD on homepage

**Step 5: Commit**
```bash
git add sitemap.xml robots.txt css/pages.css
git commit -m "feat: add SEO assets (sitemap, robots.txt) and content page styles"
```

---

## Final Integration (Team Lead)

After all teammates complete their tasks:

1. **Cross-page review:** Verify consistent nav, footer, and styling across all 11 HTML files
2. **Link audit:** Click every link on every page. Fix any broken links.
3. **Deploy to GitHub Pages:** Push to GitHub, enable Pages on main branch
4. **Lighthouse audit:** Run Lighthouse on deployed site. Target 90+ on Performance, Accessibility, Best Practices, SEO.
5. **Final commit & tag**
```bash
git tag v1.0.0
git push origin main --tags
```
