# RSSNext Static Site Design

## Summary

Build a minimal static homepage for RSSNext that presents the project's vision and flagship works in a calm, editorial tone. The site should balance two audiences: people discovering RSSNext for the first time and developers familiar with open-source RSS tools.

The page should feel like a brand essay rather than a product marketing site. It must lead with the belief behind RSSNext, then unfold into two distinct chapters for Folo and RSSHub, ending with a concise ecosystem section and footer.

## Goals

- Present RSSNext as a clear point of view about the open web and readable information.
- Give equal narrative weight to Folo and RSSHub.
- Keep the site fully static and lightweight for GitHub Pages.
- Distinguish the homepage from `folo.is` by avoiding a direct product-landing-page treatment.
- Use abstract visuals instead of product screenshots.

## Non-Goals

- Do not build a multi-page site for the first version.
- Do not add CMS, runtime data fetching, or third-party API dependencies.
- Do not recreate the full feature set or screenshots from Folo or RSSHub.
- Do not turn the site into a badge wall, dashboard, or metrics-heavy project index.

## Audience

### Primary audience

- Curious users who want to understand what RSSNext stands for.
- Developers and open-source users who want to understand the relationship between Folo and RSSHub.

### Desired first impression

- Calm
- Intentional
- Open-web native
- Modern but not trendy

## Site Structure

The site is a single-page experience with this order:

1. Hero
2. Vision
3. Folo chapter
4. RSSHub chapter
5. Open ecosystem
6. Footer

## Section Details

### 1. Hero

**Purpose**

Introduce RSSNext as a belief before introducing it as a collection of projects.

**Content**

- RSSNext wordmark / name
- One strong headline
- One short supporting paragraph
- Primary CTA: `Read the vision`
- Secondary navigation links that hint at later sections

**Headline direction**

Preferred headline:

`An open web, readable again.`

Alternative headline candidates:

- `Open information should stay open.`
- `RSS is not over. It is being rebuilt.`

**Visual direction**

- Large editorial spacing
- Warm off-white page tone
- Slow, abstract information-flow shapes in the background
- No screenshot, mock device, or product UI card in the hero

### 2. Vision

**Purpose**

Turn the emotional tone of the hero into a precise point of view.

**Content format**

Three short statements, not a long manifesto.

**Statement direction**

- `The open web never went away.`
- `What changed is how we build for it.`
- `RSSNext turns that belief into products.`

**Visual direction**

- Mostly typographic
- Tight but readable rhythm
- Subtle transition from the hero's abstract flow into more structured composition

### 3. Folo Chapter

**Purpose**

Present Folo as RSSNext's reading product: clarity, organization, and sustained attention.

**Narrative role**

This chapter should feel like the first practical expression of the RSSNext vision.

**Headline direction**

Preferred headline:

`A quieter way to follow what matters.`

**Supporting copy direction**

Explain that Folo organizes information into a cleaner timeline and a more focused reading experience without turning the section into a feature list.

**Visual system**

- Abstract timeline fragments
- Layered streams
- Ordered stacks
- Controlled directional motion

**Color treatment**

- Slightly cooler than the base page palette
- Deep blue-gray or slate accents

**Links**

- `Visit folo.is`
- `View Folo on GitHub`

### 4. RSSHub Chapter

**Purpose**

Present RSSHub as the infrastructure layer: network scale, routing, openness, and longevity.

**Narrative role**

This chapter should feel complementary to Folo, not subordinate to it.

**Headline direction**

Preferred headline:

`Infrastructure for the readable web.`

**Supporting copy direction**

Explain that RSSHub is one of the world's largest RSS networks and a long-running open-source foundation for readable information.

**Stable facts allowed**

- `Everything is RSSible.`
- `The world's largest RSS network`
- `Over 5,000 global instances`

**Visual system**

- Node-and-route structures
- Connection density
- Expanding paths
- Network-oriented composition

**Color treatment**

- Slightly warmer than the base page palette
- Low-saturation orange, copper, or rust accents

**Links**

- `Visit RSSHub`
- `Read the docs`
- `View RSSHub on GitHub`

### 5. Open Ecosystem

**Purpose**

Conclude that RSSNext is not only two projects, but an ongoing effort to build and maintain open information tools in public.

**Headline direction**

Preferred headline:

`Built in public, growing in the open.`

**Content**

- Short closing paragraph
- Outbound links to RSSNext GitHub, Folo, RSSHub, and community entry points

**Visual direction**

- A restrained synthesis of the previous two visual systems
- Less dramatic than the project chapters
- Clear transition into footer information

### 6. Footer

**Purpose**

End quietly and cleanly.

**Content**

- RSSNext name
- Minimal link list
- One short closing line if needed

## Copy Style

### Tone

- Calm
- Precise
- Declarative
- Confident without sounding promotional

### Rules

- Prefer short sentences over manifesto paragraphs.
- Do not use startup cliches or vague future-facing claims.
- Do not repeat the same open-web/community language in every section.
- Avoid feature-checklist writing.
- Each section gets one clear message.

## Visual Design System

### Overall palette

- Warm off-white or paper-like background
- Near-black typography
- One neutral system across the page
- One cool accent family for Folo
- One warm accent family for RSSHub

### Typography

- Strong editorial heading scale
- Generous spacing
- Minimal decorative styling
- High readability on both desktop and mobile

### Imagery

- No product screenshots in the first version
- No device mockups
- No generated collage aesthetic
- Use custom abstract SVG or CSS-driven shapes

### Motion

Keep motion restrained and purposeful:

- One subtle hero drift or parallax effect
- One entrance treatment for chapters on scroll
- One hover treatment for links and calls to action

If motion is removed entirely, the design should still feel complete.

## Technical Approach

### Stack

Keep the implementation framework-free for the first version.

Expected file structure:

- `index.html`
- `styles.css`
- `script.js`
- `assets/`

### Reasoning

- Matches the repository's current simplicity
- Ideal for GitHub Pages
- Keeps maintenance low
- Supports a fast, static, content-led page

### Implementation principles

- Prefer semantic HTML
- Use CSS for layout, typography, and most motion
- Use minimal JavaScript only for progressive enhancement
- Keep the page accessible and readable without animation

## Content Sources

Use only stable information from the provided references:

- RSSNext profile README
- Folo repository and site
- RSSHub repository

Do not depend on live badges, dynamic counters, or third-party embeds for the first version.

## Success Criteria

- The first screen feels unmistakably like RSSNext, not a generic product landing page.
- The site communicates a point of view before it communicates features.
- Folo and RSSHub feel equally important but clearly different in role.
- The abstract visuals are legible and purposeful.
- The page remains lightweight, static, and responsive.
- Mobile layout keeps the editorial rhythm rather than collapsing into stacked generic cards.

## Risks And Mitigations

### Risk: the site becomes too abstract

**Mitigation**

Keep copy concrete and ensure each chapter clearly names the project and its role.

### Risk: Folo and RSSHub blur together

**Mitigation**

Use different visual grammars and accent families for each chapter.

### Risk: the page looks like a generic startup site

**Mitigation**

Avoid hero cards, feature grids, excessive badges, and common SaaS layouts.

## Out Of Scope For Initial Build

- Additional pages
- Dark mode
- Dynamic metrics
- Multi-language support
- Blog, news, or changelog sections
