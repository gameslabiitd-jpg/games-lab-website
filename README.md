# GAMES Lab — IIT Delhi

The official website for the **GAMES Lab** (Gaming, Augmented & Mixed‑Reality
Experiences and Simulations) at IIT Delhi — an interdisciplinary collective
working at the intersection of play, immersive technology, and design research.

The site showcases the lab's games, research and publications, team, and latest
updates, with an editorial visual language and motion‑led interactions.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript + React 19 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (oklch design tokens) |
| Animation | [`motion`](https://motion.dev) (Framer Motion), [GSAP](https://gsap.com) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering) smooth scroll |
| Fonts | Inter via `next/font` |
| Deploy | Cloudflare Pages — static export (`out/`), auto‑deploys the `main` branch |

> **Note:** This is Next.js **16**, which has breaking changes vs. older versions.
> See `AGENTS.md` — read the relevant guide in `node_modules/next/dist/docs/`
> before changing framework‑level code.

---

## Getting started

**Prerequisites:** Node.js 20+ and npm.

```bash
# install dependencies
npm install

# start the dev server (http://localhost:3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Pages hot‑reload as you edit.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## Project structure

```
src/
├── app/                  # App Router routes (one folder per page)
│   ├── page.tsx          # Home
│   ├── about/            # About the lab
│   ├── games/            # Games catalogue (with category filter)
│   ├── news/             # News & updates
│   ├── publications/     # Research publications
│   ├── team/             # Team index + /team/[slug] detail pages
│   ├── layout.tsx        # Root layout (nav, footer, fonts)
│   └── globals.css       # Design tokens + global styles
├── components/
│   ├── sections/         # Home page sections (Hero, Intro, MediaStack, …)
│   ├── games/            # Games catalogue + filter
│   ├── team/ research/ about/  # Page‑specific blocks
│   ├── layout/           # Navbar, footer
│   ├── animations/       # ScrollReveal, Lenis provider, progress bar
│   └── ui/               # Reusable primitives (Button, Tag, Counter, …)
├── data/                 # Content lives here (edit these to update the site)
│   ├── games.ts          # Games catalogue (tabletop + digital)
│   ├── news.ts           # Latest updates / news items
│   ├── research.ts       # Publications
│   └── team.ts           # Team members
├── hooks/                # Custom React hooks
└── lib/                  # Helpers (cn, gsap setup)
public/
├── images/               # Site imagery (games, news, home, team, …)
└── videos/               # Web‑optimised clips
```

---

## Editing content

Most updates **don't require touching components** — edit the typed data files
in `src/data/`:

- **Games** → `games.ts`. The first tag drives the format (`"Tabletop"` /
  `"Digital"`); tags also power the catalogue's category filter, which is
  derived automatically from the data.
- **News / updates** → `news.ts`. The first three appear in the homepage
  "Latest updates" section; the `featured` item becomes the hero on `/news`.
- **Team** → `team.ts`. Each member's `skills` array renders under
  "Areas of Interest".
- **Publications** → `research.ts`.

### Adding images & video

Source media is large; compress before committing so the site stays fast.
Images are kept ≤ ~1920px wide; videos are encoded H.264 / yuv420p / faststart
with audio stripped (the homepage deck plays muted). Example pipeline (ffmpeg):

```bash
# image → max 1600px wide, quality 3
ffmpeg -i input.jpg -vf "scale='min(1600,iw)':-2" -q:v 3 public/images/news/out.jpg

# video → max 1280px wide, H.264, no audio, web‑streamable
ffmpeg -i input.mp4 -an -vf "scale='min(1280,iw)':-2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -movflags +faststart \
  public/videos/out.mp4
```

Then reference the new path from the relevant file in `src/data/` (or the
component, for homepage media).

---

## Deployment

The site is a **fully static export** (`output: "export"` in `next.config.ts`),
hosted on **Cloudflare Pages**. `npm run build` produces an `out/` folder with
all HTML/CSS/JS and assets — no Node server is needed at runtime.

### Ship changes

The `main` branch auto‑deploys. To ship:

```bash
git add .
git commit -m "your message"
git push origin main
```

Run `npm run build` locally first to catch type/build errors and confirm `out/`
is generated before pushing.

### One‑time Cloudflare Pages setup (dashboard)

Connect the GitHub repo in the Cloudflare dashboard → **Workers & Pages → Create
→ Pages → Connect to Git**, then set:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Environment variable | `NODE_VERSION` = `20` (matches `.nvmrc`) |

Then attach the custom domain under the Pages project → **Custom domains → Set up
a domain**. Since the domain is registered with Cloudflare, DNS records are added
automatically — no manual nameserver changes needed.

> Static-export notes: `next/image` runs with `images.unoptimized` (Cloudflare
> has no Next image server), and every route is prerendered at build time. Keep
> any single file in `public/` under Cloudflare's 25 MiB per‑file limit.
