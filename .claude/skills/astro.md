---
skill-name: astro
description: >
  Astro framework skill for building, modifying, and debugging this portfolio site.
  Use when the task involves Astro components, pages, layouts, content collections,
  routing, styling, or integrations.
trigger: >
  When the user asks to create, edit, or debug Astro components, pages, layouts,
  content collections, or anything related to the Astro framework in this project.
---

# Astro Skill

You are working on an Astro 5 portfolio site. Follow these rules and conventions.

## Project Overview

- **Framework:** Astro 5 with MDX and React integrations
- **Styling:** Radix UI Themes + Radix Colors (slate gray scale, purple accent) + scoped `<style>` blocks in `.astro` files
- **Icons:** `@radix-ui/react-icons`
- **TypeScript:** Strict mode (`astro/tsconfigs/strict`)
- **Content:** MDX-based content collections in `src/content/work/`

## Project Structure

```
src/
  components/    # .astro and .tsx components
  content/
    config.ts    # Content collection schemas (Zod)
    work/        # MDX case study files
  layouts/
    BaseLayout.astro  # Main HTML shell with Nav, Footer, ThemeWrapper
  pages/
    index.astro
    about.astro
    work.astro
    work/[...slug].astro  # Dynamic routes for content collection
    404.astro
  styles/
    global.css    # Global styles, Radix color tokens, CSS custom properties
```

## Astro Conventions

### Components

- **Astro components** (`.astro`): Use for static/server-rendered UI. Props go in the frontmatter (`---`) block with a `Props` interface. Styles use scoped `<style>` tags.
- **React components** (`.tsx`): Use only when client-side interactivity is required (e.g., carousels, theme toggling). Must use a `client:*` directive when used in `.astro` files (e.g., `client:load`, `client:visible`).
- Prefer `.astro` components over `.tsx` unless interactivity is needed — they ship zero JS by default.

### Pages & Routing

- File-based routing in `src/pages/`.
- Dynamic routes use `[...slug].astro` pattern with `getStaticPaths()`.
- All pages wrap content in `<BaseLayout>`.
- Use `<ClientRouter />` (from `astro:transitions`) for view transitions — it's already in BaseLayout.

### Content Collections

- Defined in `src/content/config.ts` using `defineCollection` and Zod schemas.
- The `work` collection schema requires: `title`, `description`, `publishDate`, `tags` (string[]), `img`, and optional `img_alt`.
- Query with `getCollection('work')` and `getEntry('work', slug)` from `astro:content`.
- Content files are `.mdx` — they support Astro/React components inline.

### Styling

- Global CSS custom properties are defined in `src/styles/global.css`.
- Color system uses Radix Colors mapped to semantic variables (`--gray-0` through `--gray-999`, `--accent-*`).
- Use existing CSS custom properties (e.g., `var(--gray-0)`, `var(--accent-regular)`) — do NOT introduce new color values or hardcode hex codes.
- Scoped styles in `.astro` files are preferred over global CSS for component-specific styling.
- Responsive breakpoint: `@media (min-width: 50em)` for desktop.
- The project uses Radix Themes layout components: `LayoutContainer` and `LayoutFlex` (React wrappers around Radix's `Container` and `Flex`).

### Integrations & Packages

- Install official integrations via `npx astro add <integration>` (e.g., `npx astro add tailwind`).
- Install other packages via `npm install <package>` — never edit `package.json` manually.

## Commands

- `npm run dev` — Start dev server (localhost:4321)
- `npm run build` — Type-check then build (`astro check && astro build`)
- `npm run preview` — Preview production build
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` / `npm run format:check` — Prettier
- `npm run spellcheck` — cspell

## Key Patterns in This Project

- `BaseLayout.astro` wraps everything: `<MainHead>`, `<ClientRouter>`, `<Nav>`, `<ThemeWrapper client:load>`, `<Footer>`.
- `ThemeWrapper.tsx` is a React component that provides Radix theme context — it uses `client:load`.
- The `<slot />` pattern is used extensively for composition in layout and wrapper components.
- Work/portfolio pages use the content collection pattern with `[...slug].astro`.

## Common Mistakes to Avoid

- Do NOT use `Astro.glob()` — it's deprecated in Astro 5. Use `getCollection()` from `astro:content` instead.
- Do NOT use the old `Content` component import pattern. In Astro 5, use `render()` to get the `<Content />` component from collection entries.
- Do NOT forget `client:*` directives on React components — without them, React components render as static HTML with no interactivity.
- Do NOT add new global CSS when scoped styles will do.
- Do NOT hardcode color values — always use the existing CSS custom properties.
- Verify Astro APIs against current docs — features like content collections, actions, and view transitions have changed significantly across versions.

## Documentation

If you need to look up current Astro APIs or best practices, use the Astro Docs MCP server at `https://mcp.docs.astro.build/mcp` or consult `https://docs.astro.build`. AI knowledge of Astro may be outdated — always verify.
