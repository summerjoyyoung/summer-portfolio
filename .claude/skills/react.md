---
skill-name: react
description: >
  React skill for building interactive components in this Astro portfolio.
  Covers hooks, component patterns, TypeScript typing, and Astro integration
  via client directives.
trigger: >
  When the user asks to create or modify React components (.tsx files),
  use React hooks, handle client-side interactivity, or integrate React
  components into Astro pages/layouts.
---

# React Skill

This project uses React 18 within Astro via `@astrojs/react`. React is used **only** for components that need client-side interactivity. Follow these rules and conventions.

## When to Use React vs Astro

- **Use `.astro` components** for static/server-rendered UI (no JS shipped). This is the default.
- **Use `.tsx` components** only when you need: state, effects, event handlers, or third-party React libraries (e.g., Embla Carousel, Radix Themes).
- When in doubt, start with `.astro`. Convert to `.tsx` only if interactivity is required.

## Project React Components

| Component | Purpose | Hooks Used |
|-----------|---------|------------|
| `ThemeWrapper.tsx` | Radix `<Theme>` provider, wraps all page content | None (pass-through) |
| `LayoutContainer.tsx` | Radix `Box` wrapper for centered max-width layout | None (pass-through) |
| `LayoutFlex.tsx` | Radix `Flex` wrapper, defaults to `direction="column"` | None (pass-through) |
| `ImageSlideshow.tsx` | Embla Carousel image slideshow with prev/next controls | `useState`, `useCallback`, `useEffect` |

## Client Directives (Astro + React)

React components used in `.astro` or `.mdx` files **must** have a `client:*` directive to hydrate. Without one, they render as static HTML with no interactivity.

| Directive | When to Use |
|-----------|-------------|
| `client:load` | Hydrate immediately on page load. Use for above-the-fold interactive content (ThemeWrapper, slideshows at top of page). |
| `client:only="react"` | Skip SSR entirely, render only on client. Use for components that depend on browser APIs or when SSR adds no value (e.g., slideshows deep in MDX content). |
| `client:visible` | Hydrate when the component scrolls into view. Use for below-the-fold interactive content to improve initial load. |
| `client:idle` | Hydrate once the browser is idle. Use for low-priority interactive elements. |

### Project conventions

- `ThemeWrapper` uses `client:load` (in BaseLayout — must hydrate immediately for theming).
- `ImageSlideshow` uses `client:load` when it's the first on a page, `client:only="react"` for subsequent instances in MDX content.
- Layout wrappers (`LayoutContainer`, `LayoutFlex`) do **not** need their own `client:*` directive — they inherit hydration from their parent `ThemeWrapper` which is already `client:load`.

## Component Patterns

### Typed Props

Always define props with TypeScript interfaces or types:

```tsx
interface Props {
  title: string;
  items: string[];
  onSelect?: (item: string) => void;
}

export default function MyComponent({ title, items, onSelect }: Props) {
  // ...
}
```

For wrapping Radix components, use `ComponentProps` to forward all props:

```tsx
import type { ComponentProps } from 'react';
import { Flex } from '@radix-ui/themes';

type Props = ComponentProps<typeof Flex>;
```

### Children

Use `ReactNode` for children props:

```tsx
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
```

### Default Exports

All React components in this project use **default exports** (not named exports). Follow this convention:

```tsx
export default function ComponentName({ ... }: Props) { ... }
```

## Hooks Reference

### State

- **`useState`** — Declare reactive state. Use for UI state (selected index, open/closed, form values).
- **`useReducer`** — Use when state transitions are complex or interdependent.

### Effects

- **`useEffect`** — Connect to external systems (event listeners, subscriptions, DOM measurement). Always return a cleanup function when adding listeners.
- **`useLayoutEffect`** — Use only when you need to measure DOM before paint (rare).

### Performance

- **`useCallback`** — Memoize callbacks passed to child components or used as effect dependencies. Used in `ImageSlideshow` for carousel callbacks.
- **`useMemo`** — Memoize expensive computed values. Don't use for trivial calculations.

### Refs

- **`useRef`** — Hold mutable values or DOM references that don't trigger re-renders.

### Context

- **`useContext`** — Read context values. Not currently used in this project (Radix Theme handles its own context internally).

## Styling in React Components

React components in this project use two approaches:

1. **Radix Themes props** — For layout (`Box`, `Flex`, `Grid`) and theming. Preferred for structural styling.

2. **Inline `style` objects** — For component-specific styles (see `ImageSlideshow.tsx`). Define as a typed `Record<string, React.CSSProperties>` object at the bottom of the file:

```tsx
const styles: Record<string, React.CSSProperties> = {
  root: { display: 'flex', flexDirection: 'column' },
  button: { border: '1px solid var(--gray-800)', ... },
};
```

### Rules

- Always reference CSS custom properties (`var(--gray-*)`, `var(--accent-*)`) — never hardcode colors.
- Use `var(--theme-transition)` for transition durations.
- For hover/focus states that can't be done inline, inject a `<style>` tag with class-scoped CSS (see `ImageSlideshow.tsx` pattern).
- Do **not** use CSS modules or styled-components — they aren't set up in this project.

## Accessibility

- Add `aria-label` to interactive elements without visible text (e.g., icon-only buttons).
- Add `aria-hidden="true"` to decorative icons.
- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`) — don't `<div>` everything.
- Ensure keyboard navigability for interactive components.

## Common Mistakes to Avoid

- Do NOT create a React component when an Astro component would suffice — every `.tsx` component ships JavaScript.
- Do NOT forget `client:*` directives when using React components in `.astro`/`.mdx` files.
- Do NOT use `useEffect` for derived state — compute it during render instead.
- Do NOT add React context providers — the project uses Radix's built-in theming. If you need shared state, discuss the approach first.
- Do NOT use `React.FC` — use plain function declarations with typed props. `React.FC` implicitly adds `children` and has other subtle issues. Write `export default function Foo({ ... }: Props)` instead of `const Foo: React.FC<Props> = ({ ... }) =>`.
- Do NOT write `import React from 'react'` — the JSX transform handles it automatically. Only import named exports you actually use: `import { useState } from 'react'`.
- Do NOT use `react-dom` directly — Astro handles rendering and hydration.

## Documentation

React 18 docs: https://react.dev/reference/react
