---
skill-name: radix
description: >
  Radix UI skill covering Themes, Colors, Icons, and layout components as used
  in this portfolio. Use when the task involves styling, theming, color tokens,
  layout primitives, or icons.
trigger: >
  When the user asks to create or modify UI that involves Radix Themes components,
  Radix Colors tokens, Radix Icons, layout, or theming in this project.
---

# Radix UI Skill

This project uses three Radix packages: **Themes** (layout + theming), **Colors** (color tokens), and **Icons**. Follow these rules and conventions.

## Packages in Use

| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/themes` | ^3.3.0 | Theme provider, layout primitives (Box, Flex, Grid) |
| `@radix-ui/colors` | ^3.0.0 | 12-step color scales (CSS custom properties) |
| `@radix-ui/react-icons` | ^1.3.2 | SVG icon components |

## Theme Configuration

The app is wrapped in a `<Theme>` component via `ThemeWrapper.tsx`:

```tsx
<Theme appearance="inherit" accentColor="purple" grayColor="slate" panelBackground="translucent">
```

- **Accent color:** `purple`
- **Gray scale:** `slate`
- **Appearance:** `inherit` (follows system/parent)
- ThemeWrapper is a React component rendered with `client:load` in BaseLayout

### Radix root theme override

The project overrides the Radix root theme's `min-height: 100vh` to prevent layout issues with the nav/footer flex layout:

```css
.radix-themes[data-is-root-theme='true'] {
  min-height: 0;
  background-color: transparent;
}
```

Do NOT remove this override or set `min-height` back on the root theme.

## Color System

### 12-Step Scale (Radix Colors)

Each color (slate, purple) provides 12 steps with specific intended uses:

| Steps | Purpose | Example |
|-------|---------|---------|
| 1-2 | Backgrounds | App background, subtle background |
| 3-5 | Interactive component fills | Hover, active, selected states |
| 6-8 | Borders and separators | Subtle borders, strong borders |
| 9-10 | Solid colors | Buttons, badges, solid fills |
| 11-12 | Accessible text | High-contrast text on any background |

Access via CSS custom properties: `var(--slate-6)`, `var(--purple-9)`, `var(--purple-a4)` (alpha variant).

### Project Color Mapping

The project maps Radix color steps to semantic custom properties in `global.css`. **Always use these semantic variables**, not raw Radix steps directly:

**Gray scale** (mapped from slate, inverted numbering — lower = darker):
- `--gray-0` / `--gray-50`: `slate-12` — headings, high-contrast text
- `--gray-100` / `--gray-200`: `slate-11` — body text
- `--gray-300`: `slate-10` — secondary text
- `--gray-400`: `slate-9` — muted text, descriptions
- `--gray-500`: `slate-8`
- `--gray-600`: `slate-7`
- `--gray-700`: `slate-6`
- `--gray-800`: `slate-5` — borders, dividers
- `--gray-900`: `slate-2` — subtle backgrounds
- `--gray-999`: `slate-1` — main page background
- `--gray-999_40`: `slate-a4`

**Accent** (mapped from purple):
- `--accent-light`: `purple-10`
- `--accent-regular`: `purple-9` — solid fills (buttons, badges)
- `--accent-dark`: `purple-11` — high-contrast text/links
- `--accent-overlay`: `purple-a6`
- `--accent-subtle-overlay`: `purple-a4`
- `--accent-text-over`: `slate-1` — text on accent backgrounds
- `--link-color`: `purple-11`

### Dark Mode

Dark mode is handled automatically by Radix Colors CSS imports. The project imports both light and dark variants:

```css
@import '@radix-ui/colors/slate.css';
@import '@radix-ui/colors/slate-dark.css';
@import '@radix-ui/colors/slate-alpha.css';
@import '@radix-ui/colors/slate-dark-alpha.css';
/* same for purple */
```

Radix Colors flips all 12 steps automatically when `.dark` is on the root. Only shadows need manual dark-mode overrides (already done in `global.css`).

### Rules

- **Never hardcode hex/rgb color values.** Always use `var(--gray-*)` or `var(--accent-*)`.
- **Never use raw Radix steps** (e.g., `var(--slate-9)`) in components — use the semantic variables.
- If you need a new semantic variable, define it in `global.css` mapped to a Radix step.
- Use alpha variants (`-a1` through `-a12`) for overlays and translucent fills.

## Layout Components

### Project Wrappers

The project has two custom layout wrappers around Radix primitives:

**`LayoutContainer`** — Replaces the `.wrapper` utility. Renders a `Box` with full width, `max-width: 83rem`, centered, `px="5"`. Supports `as` prop for semantic elements.

```tsx
<LayoutContainer as="main">...</LayoutContainer>
```

**`LayoutFlex`** — Thin wrapper around `Flex` with `direction="column"` as default. All Flex props forwarded.

```tsx
<LayoutFlex gap="9">...</LayoutFlex>
```

Use these wrappers instead of creating new layout utilities.

### Radix Layout Primitives

When you need layout beyond the wrappers, use Radix primitives directly:

**Box** — Base layout block. Props: `as`, `asChild`, `display`, `p`/`px`/`py`/`pt`/`pr`/`pb`/`pl`, `m`/`mx`/`my`/`mt`/`mr`/`mb`/`ml`, `width`/`minWidth`/`maxWidth`, `height`/`minHeight`/`maxHeight`, `position`, `inset`/`top`/`right`/`bottom`/`left`, `overflow`/`overflowX`/`overflowY`, `flexBasis`/`flexShrink`/`flexGrow`, `gridArea`/`gridColumn`/`gridRow`.

**Flex** — Flexbox container. Additional props: `direction`, `align`, `justify` (`"start"` | `"center"` | `"end"` | `"between"`), `wrap` (`"nowrap"` | `"wrap"` | `"wrap-reverse"`), `gap`/`gapX`/`gapY`.

**Grid** — CSS Grid container. Additional props: `columns`, `rows`, `areas`, `flow`, `align`, `justify`, `gap`/`gapX`/`gapY`.

### Responsive Props

All layout props accept responsive objects keyed by breakpoint:

```tsx
<Box px={{ initial: '3', sm: '5', lg: '7' }}>
```

### Spacing Scale

Gap, padding, and margin props accept scale values `"0"` through `"9"`. These map to Radix's spacing scale (e.g., `"1"` = 4px, `"3"` = 12px, `"5"` = 24px, `"9"` = 64px approximately). Use these scale values rather than arbitrary CSS values where possible.

### `asChild` Pattern

Use `asChild` to merge Radix layout props onto a child element instead of rendering a wrapper:

```tsx
<Box asChild width="100%" px="5">
  <main>...</main>
</Box>
```

This is how `LayoutContainer` works — it avoids an extra `<div>`.

## Icons

Import from `@radix-ui/react-icons`. They are React components that render inline SVGs.

```tsx
import { ArrowRightIcon, CodeIcon } from '@radix-ui/react-icons';

<ArrowRightIcon width="1.2em" height="1.2em" aria-hidden="true" />
```

### Conventions

- Always set `aria-hidden="true"` on decorative icons.
- Size icons relative to text with `em` units (e.g., `width="1.33em" height="1.33em"`).
- Icons used in this project: `ArrowLeftIcon`, `ArrowRightIcon`, `CodeIcon`, `Pencil2Icon`, `PaperPlaneIcon`, `SunIcon`, `MoonIcon`, `HamburgerMenuIcon`.
- Browse the full icon set at https://www.radix-ui.com/icons.

## Common Mistakes to Avoid

- Do NOT introduce Tailwind or other utility class libraries — this project uses Radix Themes + scoped CSS.
- Do NOT use Radix Themes typography components (Text, Heading) — the project uses plain HTML elements styled via `global.css`.
- Do NOT hardcode colors. Use semantic CSS custom properties.
- Do NOT bypass the `LayoutContainer`/`LayoutFlex` wrappers for page-level layout — use them for consistency.
- Do NOT forget `client:load` (or appropriate directive) when using Radix layout components in `.astro` files — they are React components and need hydration for interactive features. For purely structural layout, consider whether a plain HTML element with scoped styles would be simpler.
- Do NOT remove the `.radix-themes[data-is-root-theme='true']` override in `global.css`.
