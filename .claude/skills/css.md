---
skill-name: css
description: >
  CSS skill covering styling conventions, layout patterns, custom properties,
  responsive design, and scoped styles as used in this Astro portfolio.
trigger: >
  When the user asks to create or modify styles, fix layout issues, add
  responsive behavior, adjust colors/typography/spacing, or work with CSS
  custom properties in this project.
---

# CSS Skill

This project uses scoped `<style>` blocks in Astro components, a global stylesheet with CSS custom properties, and Radix Themes layout primitives. There is no Tailwind, CSS modules, or CSS-in-JS. Follow these rules and conventions.

## Styling Architecture

1. **`src/styles/global.css`** — Global resets, CSS custom properties (colors, typography, shadows), base element styles, utility classes. Imported once via `<MainHead>`.
2. **Scoped `<style>` in `.astro` files** — Component-specific styles. Astro automatically scopes these to the component (adds a unique attribute selector). This is the primary way styles are written.
3. **Radix Themes props** — Layout handled via `Box`, `Flex`, `Grid` component props in `.tsx` files (spacing, alignment, sizing).
4. **Inline `style` objects** — Used in React `.tsx` components as `Record<string, React.CSSProperties>`.

### When to use which

| Approach | When |
|----------|------|
| Scoped `<style>` | Default for all `.astro` component styling |
| `global.css` | Only for site-wide base styles, new custom properties, or utility classes |
| Radix props | Layout concerns in React components (`px`, `gap`, `width`, etc.) |
| Inline styles | Component-specific styles in React `.tsx` files |

## CSS Custom Properties

### Colors

All colors are defined as semantic custom properties in `global.css`. See the Radix skill for the full mapping. Key ones:

- **Text:** `--gray-0` (headings), `--gray-100`/`--gray-200` (body), `--gray-300` (secondary), `--gray-400` (muted)
- **Backgrounds:** `--gray-999` (page bg), `--gray-900` (subtle bg)
- **Borders:** `--gray-800`
- **Accent:** `--accent-regular` (solid fills), `--accent-dark` (text/links), `--accent-light`, `--accent-overlay`, `--accent-subtle-overlay`
- **Links:** `--link-color`
- **On-accent text:** `--accent-text-over`

### Typography

```css
--text-sm:   0.875rem;
--text-base: 1rem;
--text-md:   1.125rem;
--text-lg:   1.25rem;
--text-xl:   1.625rem;
--text-2xl:  2.125rem;
--text-3xl:  2.625rem;
--text-4xl:  3.5rem;
--text-5xl:  4.5rem;

--font-body:  'Lexend', system-ui, sans-serif;
--font-brand: 'Inter', system-ui, sans-serif;
```

- Body text uses `--font-body`.
- Headings, nav, and branded elements use `--font-brand`.
- Use the `--text-*` scale for `font-size` — don't use arbitrary rem/px values.

### Shadows

```css
--shadow-sm  /* cards, images — subtle */
--shadow-md  /* dropdowns, elevated surfaces */
--shadow-lg  /* modals, popovers */
```

Dark mode overrides these automatically in `global.css`.

### Transitions

```css
--theme-transition: 0.2s ease-in-out;
```

Use for all interactive state transitions (hover, focus, color changes):

```css
transition: color var(--theme-transition);
transition: color var(--theme-transition), background-color var(--theme-transition);
```

### Radix Spacing / Radius Tokens

Some components reference Radix Themes tokens directly for consistency with Radix components:

- Spacing: `--space-2`, `--space-3`, `--space-4`, `--space-6`, `--space-7` (provided by Radix Themes CSS)
- Radius: `--radius-2`, `--radius-3`, `--radius-full`
- Font: `--default-font-family`, `--font-size-2`, `--line-height-2`, `--letter-spacing-2`

Use these when styling elements that need to match Radix component sizing (e.g., BackToTop button matching Radix button sizing).

## Layout Patterns

### Page Layout

Pages use one of two patterns:

**Pattern 1: Radix layout wrappers** (index, work list, about):
```astro
<BaseLayout>
  <LayoutFlex gap="9">
    <LayoutContainer as="main">
      <!-- content -->
    </LayoutContainer>
  </LayoutFlex>
</BaseLayout>
```

**Pattern 2: Manual CSS layout** (work detail page):
```css
.page-layout {
  max-width: 83rem;
  margin-inline: auto;
  padding-inline: 1.5rem;
}
```

Both use `max-width: 83rem` as the content width cap.

### Flexbox

Flexbox is the primary layout tool. Common patterns:

```css
/* Vertical stack */
display: flex;
flex-direction: column;
gap: 1rem;

/* Horizontal row with wrapping */
display: flex;
flex-wrap: wrap;
gap: 0.5rem;

/* Centered content */
display: flex;
align-items: center;
justify-content: center;

/* Space between */
display: flex;
justify-content: space-between;
```

### Grid

CSS Grid is used for the nav on desktop:

```css
display: grid;
grid-template-columns: 1fr auto 1fr;
align-items: center;
```

### Centering

- Horizontal centering of blocks: `margin-inline: auto` with a `max-width`.
- Horizontal centering of text: `text-align: center`.
- Flex centering: `align-items: center; justify-content: center`.

## Responsive Design

### Breakpoints

The project uses a single primary breakpoint:

```css
@media (min-width: 50em) { /* ~800px — desktop */ }
```

A few components also use:

```css
@media (min-width: 60em) { /* ~960px — wide desktop, used in Nav */ }
```

### Mobile-First Approach

Styles are written mobile-first. Base styles define mobile layout, then `@media (min-width: 50em)` overrides for desktop:

```css
.component {
  flex-direction: column;     /* mobile: stack */
  text-align: center;         /* mobile: centered text */
}

@media (min-width: 50em) {
  .component {
    flex-direction: row;      /* desktop: side by side */
    text-align: left;         /* desktop: left-aligned */
  }
}
```

### Common Responsive Patterns

- **Stack to row:** `flex-direction: column` -> `flex-direction: row`
- **Show/hide:** `display: none` -> `display: block` (sidebar, back link)
- **Font size scaling:** Smaller `--text-*` values on mobile, larger on desktop
- **Padding scaling:** Tighter padding on mobile, more generous on desktop
- **Text width:** `max-width` in `ch` units for readability (e.g., `max-width: 54ch`)

### Accessibility Media Queries

The project also uses:

```css
@media (hover: hover) { /* hover styles only for devices that support hover */ }
@media (forced-colors: active) { /* high contrast mode overrides */ }
```

Use `@media (hover: hover)` for hover effects and `@media (forced-colors: active)` when using custom colors for active/selected states.

## Scoped Style Patterns

### Astro Scoping

Styles in `<style>` blocks are scoped automatically. To target elements inside child components or rendered content (e.g., MDX), use the `:global()` modifier:

```css
/* Target all direct children of .main-content (from MDX rendering) */
.main-content > :global(* + *) { margin-top: 1rem; }

/* Target headings rendered by MDX */
.main-content :global(h2) { margin-top: var(--space-7); }

/* Target SVGs inside child components */
.back-to-top :global(svg) { transform: rotate(-90deg); }
```

### Radix Class Borrowing

Some components apply Radix Themes classes directly to plain HTML elements to get Radix styling without importing React components:

```astro
<!-- Button styling via Radix classes -->
<a class="rt-reset rt-BaseButton rt-Button rt-r-size-3 rt-variant-solid"
   data-accent-color="purple" href={href}>
  <slot />
</a>

<!-- Badge/pill styling -->
<span class="rt-Badge rt-r-size-3 rt-variant-outline"
      data-accent-color="purple" data-radius="full">
  <slot />
</span>

<!-- Card styling -->
<a class="card rt-BaseCard rt-Card rt-r-size-2 rt-variant-surface" href={url}>
```

This avoids shipping React JS for purely visual components. Use `data-accent-color` and `data-radius` attributes for Radix theming.

### Utility Classes

Defined in `global.css`:

- **`.sr-only`** — Visually hidden, accessible to screen readers.
- **`.link-underline`** — Animated underline on hover/focus (transparent -> currentColor).

## Interaction Styles

### Hover/Focus

**Always pair `:hover` and `:focus` on the same rule.** Keyboard users navigate via focus, not hover — omitting `:focus` makes interactive elements invisible to them. This applies even when the hover is inside a `@media (hover: hover)` block.

```css
/* Correct — keyboard users get the same feedback */
@media (hover: hover) {
  .card:hover,
  .card:focus {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}

/* Wrong — keyboard users get nothing */
@media (hover: hover) {
  .card:hover {
    transform: translateY(-2px);
  }
}
```

The `:focus` rule should live **outside** the `@media (hover: hover)` guard if you want focus styles to apply on touch devices too (usually correct). Only put `:hover` inside the guard:

```css
/* Best practice */
.card:focus {
  box-shadow: var(--shadow-md);
}

@media (hover: hover) {
  .card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}
```

### Active State

For buttons, style `:active` with a slightly darker accent:

```css
.button:hover  { background-color: var(--accent-9); }
.button:active { background-color: var(--accent-10); }
```

### Transitions

Always use `var(--theme-transition)` for duration. List each property explicitly (don't use `transition: all`):

```css
transition:
  color var(--theme-transition),
  background-color var(--theme-transition),
  box-shadow var(--theme-transition);
```

### Visibility Toggling

For show/hide animations (e.g., BackToTop button), use opacity + pointer-events + transform:

```css
.element {
  opacity: 0;
  pointer-events: none;
  transform: translateY(0.5rem);
  transition: opacity var(--theme-transition), transform var(--theme-transition);
}
.element.visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
```

## Text Truncation

For clamping text to N lines:

```css
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
```

## Images

Standard image treatment in this project:

```css
img {
  border-radius: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-800);
}
```

## Common Mistakes to Avoid

- Do NOT use `transition: all` — list specific properties.
- Do NOT hardcode color values — use `var(--gray-*)` and `var(--accent-*)`.
- Do NOT hardcode font sizes — use the `--text-*` scale.
- Do NOT add global styles when scoped styles will do.
- Do NOT use `:hover` without also styling `:focus` — keyboard users rely on focus, not hover. See the Hover/Focus section for the correct pattern.
- Do NOT forget `@media (min-width: 50em)` — styles must work mobile-first.
- Do NOT introduce Tailwind, CSS modules, styled-components, or any other CSS tooling.
- Do NOT use `!important` — fix specificity issues properly (the Radix root theme override is a good example of using selector specificity instead).
- Do NOT use arbitrary `z-index` values — the nav uses `9999`, the back-to-top uses `50`.

## Reference

- MDN CSS Reference: https://developer.mozilla.org/en-US/docs/Web/CSS
- Astro scoped styles: https://docs.astro.build/en/guides/styling/
