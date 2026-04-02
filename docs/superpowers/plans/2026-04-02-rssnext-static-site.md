# RSSNext Static Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a lightweight static homepage for RSSNext that presents its vision, Folo, and RSSHub through an editorial single-page experience.

**Architecture:** Use a framework-free static site with semantic HTML, one shared stylesheet, and a small progressive-enhancement script for reveal and parallax effects. Keep the layout content-led, avoid product-card patterns, and differentiate Folo and RSSHub through distinct abstract visual systems.

**Tech Stack:** HTML, CSS, vanilla JavaScript

---

## File Map

- Create: `index.html` — single-page structure and English copy
- Create: `styles.css` — layout, typography, abstract visuals, motion, responsive rules
- Create: `script.js` — scroll state, reveal animation, subtle hero motion, active nav sync
- Modify: `README.md` — optional only if verification notes are needed; otherwise leave untouched
- Create: `docs/superpowers/plans/2026-04-02-rssnext-static-site.md` — this implementation plan

### Task 1: Build semantic page structure

**Files:**
- Create: `index.html`

- [ ] **Step 1: Add the document shell and global metadata**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RSSNext</title>
    <meta
      name="description"
      content="RSSNext builds products and infrastructure for a more readable open web."
    />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <script src="./script.js" defer></script>
  </body>
</html>
```

- [ ] **Step 2: Add the single-page section structure**

```html
<header class="site-header">...</header>
<main>
  <section id="hero">...</section>
  <section id="vision">...</section>
  <section id="folo">...</section>
  <section id="rsshub">...</section>
  <section id="ecosystem">...</section>
</main>
<footer class="site-footer">...</footer>
```

- [ ] **Step 3: Fill each section with concise English copy from the approved spec**

```html
<h1>An open web, readable again.</h1>
<p>RSSNext builds products and infrastructure for people who still believe open information should stay open.</p>
<a href="#vision">Read the vision</a>
```

- [ ] **Step 4: Add clear outbound links for Folo, RSSHub, docs, and GitHub**

```html
<a href="https://folo.is/" target="_blank" rel="noreferrer">Visit Folo</a>
<a href="https://github.com/RSSNext/Folo" target="_blank" rel="noreferrer">View Folo on GitHub</a>
```

- [ ] **Step 5: Verify section anchors are complete**

Run: `rg -n "id=|href=\"#" index.html`
Expected: hero, vision, folo, rsshub, ecosystem anchors all match the navigation links

### Task 2: Implement editorial layout and visual systems

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Add design tokens and base typography**

```css
:root {
  --bg: #f4f0e8;
  --surface: rgba(255, 255, 255, 0.58);
  --text: #131110;
  --muted: #625a52;
  --line: rgba(19, 17, 16, 0.12);
  --folo: #5f6d96;
  --rsshub: #a45f2a;
  --max-width: 1240px;
}
```

- [ ] **Step 2: Style a full-bleed hero without boxed cards**

```css
.hero {
  min-height: 100svh;
  display: grid;
  align-items: end;
}
```

- [ ] **Step 3: Build a typographic vision section with three short statements**

```css
.vision-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}
```

- [ ] **Step 4: Create separate abstract visual grammars for Folo and RSSHub**

```css
.chapter--folo .chapter-art { /* stacked rails and flowing layers */ }
.chapter--rsshub .chapter-art { /* nodes, routes, expanding paths */ }
```

- [ ] **Step 5: Add responsive rules so the editorial rhythm survives on mobile**

Run: `rg -n "@media" styles.css`
Expected: breakpoints cover header, hero, vision grid, chapter layouts, and footer

### Task 3: Add restrained motion and progressive enhancement

**Files:**
- Create: `script.js`

- [ ] **Step 1: Add reveal-on-scroll logic for marked sections**

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.2 });
```

- [ ] **Step 2: Add subtle hero motion driven by pointer or scroll position**

```js
window.addEventListener('pointermove', (event) => {
  document.documentElement.style.setProperty('--pointer-x', `${event.clientX}`);
});
```

- [ ] **Step 3: Sync active nav state with the visible section**

```js
const sections = document.querySelectorAll('main section[id]');
```

- [ ] **Step 4: Respect reduced-motion preferences**

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.documentElement.classList.add('reduced-motion');
}
```

- [ ] **Step 5: Run a syntax check**

Run: `node --check script.js`
Expected: no output

### Task 4: Verify the static site manually in a browser

**Files:**
- Verify: `index.html`
- Verify: `styles.css`
- Verify: `script.js`

- [ ] **Step 1: Start a local static server**

Run: `python3 -m http.server 4173`
Expected: serving the repository root at `http://localhost:4173`

- [ ] **Step 2: Open the page and inspect desktop layout**

Check: hero presence, spacing, section transitions, external links, and chapter distinction

- [ ] **Step 3: Inspect mobile width**

Check: no collapsed card-grid feeling, copy remains readable, nav remains usable

- [ ] **Step 4: Capture any visual issues and fix them in place**

Check: alignment, overflow, awkward animation, weak hierarchy, low-contrast text

### Task 5: Audit and finalize

**Files:**
- Review: `index.html`
- Review: `styles.css`
- Review: `script.js`

- [ ] **Step 1: Review the page against the approved design spec**

Run: `rg -n "Hero|Vision|Folo|RSSHub|ecosystem" docs/superpowers/specs/2026-04-02-rssnext-static-site-design.md`
Expected: every required section appears in the implementation

- [ ] **Step 2: Review UI code against web interface guidelines**

Run: fetch the latest guidelines and inspect `index.html`, `styles.css`, and `script.js`
Expected: either no issues or a short fix list applied immediately

- [ ] **Step 3: Sanity-check the final file set**

Run: `ls -1`
Expected: `index.html`, `styles.css`, `script.js`, `README.md`, `docs/`

## Self-Review

- Spec coverage: the tasks above cover structure, copy, visual language, motion, responsiveness, and lightweight delivery.
- Placeholder scan: no `TODO`, `TBD`, or vague “implement later” language remains.
- Consistency: section IDs, chapter names, and file responsibilities stay consistent across all tasks.
