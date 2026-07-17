# Summer's Portfolio

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🔒 Confidential / NDA case studies

> Note: this README is public. Keep client names, project codenames, and other NDA
> specifics **out of this file** — describe the approach generically only.

Some work is under NDA and **cannot be published**. This repo is public (required for free
GitHub Pages hosting), so anything committed here — including the raw source of unpublished
`.mdx` files — is world-readable. A client-side password gate does **not** fix this: the site
is static, so the full HTML still ships to every visitor, and the source is readable straight
from the public repo. Real gating would require leaving GitHub Pages for a host that enforces
auth at the edge (e.g. Cloudflare Pages + Access) — deliberately avoided here to keep hosting
free and low-maintenance.

**The strategy instead: split each confidential piece in two.**

1. **Public teaser** — an `.mdx` entry in `src/content/work/`. A sanitized, high-level summary
   with the client name, project codename, tooling, real screenshots, and specific audience
   details stripped out. Use an NDA placeholder card in `public/assets/<slug>/` as the hero —
   never a real mock. End with a "Request the full case study →" CTA.
2. **Private full version** — the candid case study with all specifics lives **outside this
   repo** as the single source of truth (kept in Obsidian under `Notes/Career/Portfolio/`).
   Assemble it into a PDF and share directly, on request, with people you're interviewing with.

### Guardrails

- `private/` is gitignored — a safety net so NDA material can never be committed even by
  accident. (Currently empty; canonical full versions live in Obsidian, not here.)
- Before publishing/committing any teaser edit, scan the **built** output (not just the
  source) for confidential terms. Keep the actual term list in the private Obsidian notes,
  not in this public file:
  ```sh
  npm run build
  page="dist/work/<slug>/index.html"
  for t in "<client>" "<codename>" "<tool>"; do   # real terms live in private notes
    grep -qi "$t" "$page" && echo "⚠️  FOUND: $t" || echo "✓ clean: $t"
  done
  ```
- Keep the teaser and the private version factually in sync so they never contradict each
  other under interview questioning.
- `dist/` is gitignored and CI rebuilds fresh, so a stale local build can't leak to
  production.
