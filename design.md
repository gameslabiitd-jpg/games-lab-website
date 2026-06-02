# Design — GAMES Lab IIT Delhi

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre

**Editorial** — academic research lab voice. Restrained, document-like, lets
the work carry the page. The lab studies games but is not a game studio; the
visual language is sober with selective playful moments inside the headline
copy, not in the chrome.

## Macrostructure family

Three page-type families. Within a family, pages share macrostructure; they
vary only in component archetypes.

- **Marketing pages** (`/`, `/about`): **Marquee Hero**. Big type-and-video
  hero on `/`; condensed hero + editorial sections on `/about`. CTA voice:
  inline text links by default, ink pill for the single primary action.
- **Catalog pages** (`/research`, `/games`, `/news`, `/team`): **Long Document
  with portfolio-grid sections**. A descriptive lead at top, a short
  intro paragraph, then a grid or list of items. No `§01 / §02 / §03`
  catalog-numbering chrome — items are real things with real authors and
  years, not numbered entries.
- **Detail pages** (`/team/[slug]`): **Long Document**. Single-column read,
  generous measure, sectioned by hairline rule.

## Theme

Custom palette anchored on warm cream paper + warm near-black ink + a deep
academic burgundy used as a 1–3% accent. No purple, no gradient orbs, no
glass. The chromatic budget is intentionally low — the work in the cards
should be the visual interest.

- `--color-paper`      `oklch(96.5% 0.003 85)`  /* ≈ #FAFAF7 — page bg */
- `--color-paper-2`    `oklch(93.5% 0.005 80)`  /* ≈ #F2EDE2 — section bands */
- `--color-paper-3`    `oklch(89%   0.008 80)`  /* ≈ #E5DECD — card surface / hover */
- `--color-ink`        `oklch(15%   0.006 50)`  /* ≈ #161310 — primary text */
- `--color-ink-2`      `oklch(36%   0.008 50)`  /* ≈ #564E40 — body text */
- `--color-ink-3`      `oklch(56%   0.010 50)`  /* ≈ #888070 — meta / captions */
- `--color-rule`       `oklch(85%   0.010 80)`  /* ≈ #D8D0BE — hairline */
- `--color-rule-soft`  `oklch(90%   0.008 80)`  /* ≈ #E5DECD — softest divider */
- `--color-accent`     `oklch(40%   0.13  30)`  /* ≈ #7E2A1F — burgundy, ≤3% per viewport */
- `--color-accent-ink` `oklch(98%   0.003 85)`  /* ≈ #FBF8F2 — text on accent */
- `--color-focus`      `oklch(55%   0.20  25)`  /* ≈ #B43726 — focus ring */

## Typography

Single typeface. **Inter** carries display, body, and meta — weight contrast
does the hierarchy work. No secondary display face. (User mandate after
trying EB Garamond, Instrument Serif, and Newsreader pairings.)

- **Display**: Inter, weight 800–900, tracking `-0.02em`, line-height `0.95`
- **Body**: Inter, weight 400, line-height `1.55`
- **Caps / eyebrow**: Inter, weight 600, letter-spacing `0.18em`, uppercase
- **Display tracking**: `-0.02em` (tight) for headlines
- **Display scale anchor**: `--text-display` = `clamp(2.5rem, 8vw, 6rem)`

## Spacing

4-point named scale. Values live in `tokens.css`. Pages must use named tokens
(`var(--space-md)`), never raw values. Sections breathe at `--space-2xl` to
`--space-3xl` vertical; inside a section, components use `--space-md` to
`--space-lg`.

## Motion

- **Easings**: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-in: cubic-bezier(0.4, 0, 1, 0.4)`, `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`. Never the browser default `ease`.
- **Durations**: `--dur-short: 220ms`, `--dur-medium: 400ms`, `--dur-long: 700ms`.
- **Reveal pattern**: a single fade-up on scroll-into-view (`opacity` + `translateY(8px)`). One pattern, used consistently. No directional left/right reveals, no scale-on-reveal.
- **Reduced motion**: opacity-only at ≤150ms; transforms collapsed.
- **Lenis smooth scroll** stays — it's already in the project and tuned. The hero scroll-scrub mechanic is exempt from the global reveal pattern (it has its own state machine).

## Microinteractions stance

- **Silent success** — no celebratory toasts. State changes show on the element itself (icon swap, label change, line draw).
- **Hover delay** 800ms on tooltips, 0ms on focus tooltips.
- **No motion celebration on hover** — card hover is a 1-2px translate-y lift + slight image scale (1.03), nothing bouncier.
- **Underlines** appear on hover for inline text links via `text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 4px;`. No animated underline draws.

## CTA voice

- **Primary CTA**: ink pill (`bg-ink` text-`paper`), `padding: 0.875rem 1.5rem`, `border-radius: var(--radius-pill)`. Hover: drops 1px and shows a 6% accent ring. One primary CTA per viewport.
- **Secondary CTA**: outlined pill, ink border at 30% opacity, ink text. Hover: solid ink fill.
- **Tertiary CTA**: inline text link with arrow (`text → on hover translates`). Used for nav and "view all" links inside catalog pages.
- **Mailto / contact**: tertiary by default. Footer treats the address as masthead info, not a CTA.

## Per-page allowances

- **Marketing pages** MAY use the hero video scrub (Marquee Hero archetype only). No other enrichment.
- **Catalog pages** MUST NOT use enrichment — the work itself (real images) carries the visual interest.
- **Detail pages**: typography only.

## What pages MUST share

- The original GAMES Lab wordmark + icon (`/images/Brand/Logo.svg`)
- The accent burgundy and its placement (≤3% per viewport)
- Inter as the only typeface
- The CTA voice (pill shape, border-radius, padding rhythm)
- Section heading rhythm (eyebrow caps + display heading stacked, never the two-column "hanging header" template)
- The single fade-up reveal pattern

## What pages MAY differ on

- Lead paragraph length (homepage hero has one sentence; about page has a manifesto-length opening; catalog pages have a one-line intro)
- Grid column counts (research = 1-col list; games = 3-col cards; news = 3-col cards; team = wrap grid)
- Featured-item treatment on `/games` and `/news` (full-bleed cinematic card vs. the standard grid card)

## Exports

Drop-in formats for re-using this design system in other projects.

### tokens.css

The canonical `:root` block lives in `src/app/globals.css`. It is the single
source of truth; Tailwind's `@theme inline` block reads from those CSS
variables so utilities like `bg-paper`, `text-ink`, `border-rule` work out
of the box.

### Tailwind v4 `@theme`

```css
@theme inline {
  --color-paper:      var(--color-paper);
  --color-ink:        var(--color-ink);
  --color-accent:     var(--color-accent);
  --font-sans:        var(--font-inter), "Inter", system-ui, sans-serif;
  --font-display:     var(--font-inter), "Inter", system-ui, sans-serif;
}
```

### DTCG `tokens.json`

```json
{
  "color": {
    "paper":  { "$value": "oklch(96.5% 0.003 85)", "$type": "color" },
    "ink":    { "$value": "oklch(15% 0.006 50)",   "$type": "color" },
    "accent": { "$value": "oklch(40% 0.13 30)",    "$type": "color" }
  },
  "font": {
    "sans":    { "$value": "Inter", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1.5rem", "$type": "dimension" }
  }
}
```
