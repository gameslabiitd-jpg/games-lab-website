/**
 * GooeyFilter — hidden SVG filter that merges nearby blurred shapes into
 * organic blobs via the classic blur-then-threshold-alpha trick.
 *
 * Apply to a container with `style={{ filter: 'url(#<id>)' }}`. All
 * descendants get gooey-merged together. Higher `strength` = more blur =
 * larger merge radius.
 *
 * Safari note: the host SVG is hidden with width/height 0 — NOT
 * `display:none`. WebKit won't resolve `filter: url(#id)` when the SVG that
 * defines the filter is `display:none`, which makes the effect silently fail
 * (you'd see the raw, un-merged shapes). 0×0 keeps it out of layout while
 * leaving the filter resolvable in every browser.
 *
 * Source: 21st.dev gooey-filter recipe (danielpetho). Render once near
 * the consumer; multiple instances are fine if `id` is unique.
 */
export function GooeyFilter({
  id = "goo-filter",
  strength = 10,
}: {
  id?: string
  strength?: number
}) {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          {/* Alpha threshold: amplify alpha by 19 and shift -9, hard-edging soft blurs */}
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}
