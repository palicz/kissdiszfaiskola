# Design System Document

## 1. Overview & Creative North Star: "The Botanical Atelier"

This design system is a departure from the generic, saturated aesthetics often found in commercial horticulture. Our Creative North Star is **"The Botanical Atelier"**—a digital experience that feels like walking into a high-end, curated glasshouse. It balances the wild, organic nature of flora with the disciplined, editorial precision of a premium lifestyle publication.

The "template" look is intentionally broken through:

- **Intentional Asymmetry:** Utilizing the Spacing Scale (specifically `spacing-2` and `spacing-3` from the updated theme's scale for content blocks, translating to rough visual equivalents of 16px and 20px in narrative) to create offset layouts that mimic the natural growth of a garden.
- **Overlapping Surfaces:** Allowing high-quality botanical imagery to bleed across background color shifts.
- **High-Contrast Typography:** Pairing the authoritative, high-fashion stroke of `Newsreader` with the invisible utility of `Inter`.

## 2. Colors & Surface Philosophy

We use a palette of deep forest greens and earthen tones to evoke depth and history. This is a sophisticated "living" palette, avoiding the plastic vibrance of digital-first greens.

### Tonal Hierarchy

- **Primary (`#01403A`):** Our "Deep Forest." Used for core brand moments and high-contrast text.
- **Secondary (`#8DA399`):** Our "Soft Sage." Used for supporting elements and calming backgrounds.
- **Tertiary (`#C07A66`):** Our "Terracotta & Soil." These warm earth tones provide the necessary organic warmth to balance the cool greens.

### The "No-Line" Rule

To maintain an editorial feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined solely through background color shifts or the Spacing Scale.

- _Example:_ A product grid in `surface-container-low` should sit directly on a `surface` background without a stroke.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers—like stacked sheets of fine, textured paper.

- **Layer 1 (The Earth):** `surface` (`#FAF9F6`) or `surface-dim` (`#dbdad7`) for the main canvas.
- **Layer 2 (The Plinth):** `surface-container-low` for large content blocks.
- **Layer 3 (The Specimen):** `surface-container-lowest` (`#ffffff`) for elevated cards or callouts.

### The "Glass & Signature Texture" Rule

Use Glassmorphism for floating navigation or overlaying labels. Utilize `surface` at 80% opacity with a `20px` backdrop blur. For Hero sections, use a subtle radial gradient transitioning from `primary` (`#01403A`) to `primary-container` (`#01403A` when `seed_color_hex` is the primary and no container variant is explicitly defined) to add "soul" and prevent the flat-screen effect.

## 3. Typography: The Editorial Voice

Our typography is the backbone of our "Professional & Organic" promise.

- **Display & Headlines (Newsreader):** This high-end serif carries the brand’s heritage. `display-lg` (3.5rem) should be used with tight letter-spacing for a "Vogue-botanical" feel.
- **Body & Utility (Inter):** A clean, modern sans-serif. Use `body-lg` (1rem) for readability. Its neutrality allows the botanical photography and serif headings to take center stage.
- **Labeling:** `label-md` and `label-sm` should always be in `on-surface-variant` (`#404947`) to remain present but secondary.

## 4. Elevation & Depth

We achieve hierarchy through **Tonal Layering** rather than structural lines.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift that mimics heavy-weight paper stock.
- **Ambient Shadows:** If a floating effect is required (e.g., a modal or a primary CTA), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 40, 36, 0.06);`. The shadow color is a tinted version of our `primary` green, not grey.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at 15% opacity. Never use 100% opaque borders.
- **Glassmorphism:** For top navigation bars, use semi-transparent `surface` with a backdrop blur to let the vibrant plant photography "bleed" through as the user scrolls.

## 5. Components

### Buttons

- **Primary:** Background `primary` (`#01403A`), text `on-primary`. Roundedness `rounded-1` (0.125rem) to reflect the subtle roundedness. Use a subtle 0.5s transition on hover to `primary-container`.
- **Secondary (Ghost):** No background. Text `primary`. A `Ghost Border` using `outline-variant` at 20% opacity.
- **Tertiary:** Text `tertiary` (`#C07A66`) with a `1.5` spacing underline.

### Cards & Lists

- **Cards:** Forbid divider lines. Use `surface-container-highest` for the card body and `spacing-4` for internal padding (as per theme, `spacing` is 2, so `spacing-4` is a bit ambiguous here without a scale; assuming a consistent multiplier).
- **Lists:** Separate items using vertical white space (`spacing-3`) or a subtle shift from `surface` to `surface-container-low`.

### Input Fields

- **Styling:** Use `surface-container-high` for the input background. No border. On focus, transition to a `1px` `primary` bottom-border only.
- **Labels:** Use `label-md` in `on-surface-variant`, placed `spacing-1` above the field.

### Signature Component: "The Specimen Tag"

- **Chips:** Selection chips for plant categories should use `secondary-container` (`#cee5da`) with `on-secondary-container` (`#52675e`) text. Use `rounded-1` to mimic the organic shape of a leaf with subtle roundedness.

## 6. Do's and Don'ts

### Do

- **Do** use asymmetrical margins (e.g., `spacing-2` on left, `spacing-1` on right) to create a rhythmic, organic flow (translated from original narrative to fit the current `spacing: 2` scale, where `spacing-16` and `spacing-8` were mentioned).
- **Do** prioritize high-resolution, naturally lit photography over icons.
- **Do** use `tertiary-fixed` (`#ffdbd1`) for small accents to provide a "sand/clay" warmth to the layout.
- **Do** ensure text on `primary` backgrounds uses the `on-primary` token for AA accessibility.

### Don't

- **Don't** use 1px solid black or dark grey borders. They break the organic "Botanical Atelier" feel.
- **Don't** use "Plastic Greens" (e.g., #00FF00). Stick strictly to the forest and sage tokens provided.
- **Don't** use standard "Drop Shadows." Use the Ambient Shadow guidelines (low opacity, tinted green).
- **Don't** crowd the layout. If in doubt, increase the spacing to the next tier in the scale (e.g., move from `spacing-1` to `spacing-2`).
