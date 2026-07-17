# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Project

Personal portfolio — an Astro static site deployed to **GitHub Pages**. The repo is **public**
(required for free GitHub Pages hosting). Case studies live as `.mdx` entries in the `work`
content collection.

- **Stack:** Astro + React islands, Radix UI (`@radix-ui/themes`, colors, icons), MDX content.
- **Content:** `src/content/work/*.mdx`, schema in `src/content.config.ts`
  (`title`, `description`, `publishDate`, `tags`, `img`, `img_alt`). Rendered by
  `src/pages/work/[...slug].astro`.
- **Assets:** `public/assets/<slug>/`.

### Commands

| Command | Action |
| :-- | :-- |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | `astro check` + production build to `./dist/` |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run format` | Prettier |
| `npm run spellcheck` | cspell over content (custom words in `cspell-dict.txt`) |

## 🔒 Confidential / NDA handling — READ BEFORE EDITING CASE STUDIES

Some work is under NDA. Because the repo is public and the site is static, **anything
committed is world-readable** — including the raw source of `.mdx` files and the full built
HTML. A client-side password gate does NOT protect confidential content; it still ships to
every visitor. So confidential pieces are handled by **splitting them in two**:

1. **Public teaser** — the `.mdx` entry in this repo. Sanitized and high-level. Strips client
   names, project codenames, tooling, real screenshots, and specific audience details. Uses an
   NDA placeholder image (e.g. `public/assets/<slug>/nda-placeholder.svg`) as the hero — never
   a real mock. Ends with a "Request the full case study →" CTA.
2. **Private full version** — the candid case study with all specifics lives **outside this
   repo** (in Obsidian under `Notes/Career/Portfolio/`), as the single source of truth. Shared
   as a PDF, on request. Never copy it into this repo.

### Rules for Claude

- **This file, the README, and all committed files are PUBLIC.** Never write client names,
  project codenames, internal tool names, or other NDA specifics into anything tracked by git —
  including CLAUDE.md, README.md, commit messages, and `.mdx` source.
- **`private/` is gitignored** as a safety net. If confidential material must touch the repo
  temporarily, it goes there. Never `git add` anything under `private/`.
- **Scan the _built_ output before committing teaser edits**, not just the source (MDX can leak
  in ways the source doesn't make obvious). The real term list is kept in the private Obsidian
  notes, not here — ask the user for it or load it from Obsidian:
  ```sh
  npm run build
  page="dist/work/<slug>/index.html"
  for t in "<client>" "<codename>" "<tool>"; do
    grep -qi "$t" "$page" && echo "⚠️  FOUND: $t" || echo "✓ clean: $t"
  done
  ```
- **`//` is not a comment in MDX** — a stray `//` line renders as visible page text. Don't
  leave one in content files.
- Keep the public teaser and the private full version **factually in sync** so they never
  contradict each other under interview questioning.
- `dist/` is gitignored and CI rebuilds fresh, so stale local builds can't leak to production.

## Git conventions

- Do not add `Co-Authored-By` or any Claude/Anthropic signature to commit messages.
- Commit/push only when asked. Keep unrelated working-tree changes out of a commit unless told
  otherwise.
