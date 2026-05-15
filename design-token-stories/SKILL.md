---
name: design-token-stories
description: "Generate comprehensive Storybook story files (.stories.tsx) for all design token categories in any FE repo. Triggers when asked to 'generate token stories', 'add foundation stories', 'update design token stories', 'regenerate stories', or when a new theme is detected in the token CSS file."
---

# Design Token Stories

## Purpose

Generate and maintain a complete set of Storybook story files for every design token category defined in the repo's canonical token source.

This skill is **repo-agnostic** — paths and theme conventions are determined by reading the target repo, not by hardcoded assumptions.

---

## Inputs (determine at runtime)

Before generating, locate the following by reading the repo:

| Input | How to find it |
|-------|---------------|
| **Token source** | The canonical token CSS file — look for `token.css`, `tokens.css`, or `globals.css` that defines CSS custom properties. Ask the user if ambiguous. |
| **Output directory** | Storybook stories folder — check `.storybook/main.ts` or `.storybook/main.js` for the `stories` glob, then derive the Foundations subfolder from it (e.g. `src/stories/Foundations/`). |
| **Theme system** | Check the token file for `[data-theme='<name>']` selectors OR a `.dark` class. This determines whether `AllThemes` stories are possible. |
| **tokensByTheme utility** | Only needed if generating `AllThemes` stories. Check if it exists; if not, skip `AllThemes` or offer to create it. |

---

## Modes

| Mode | When to use |
|------|-------------|
| **A — Full generation** | No Foundations stories exist, or user asks to regenerate all |
| **B — Incremental (theme sync)** | A new theme is added; update `THEMES` const in every story file |
| **C — Category update** | A specific token category changes; update that story file only |

---

## Theme conventions

### Multi-theme repos (`[data-theme='<name>']` selectors)
- Extract theme names by scanning for `[data-theme='<name>']` in the token file
- Store as `THEMES = ['dark', 'light', 'theme-a', ...] as const`
- Generate `SingleTheme` + `AllThemes` stories
- Use a `tokensByTheme` utility to apply per-theme inline styles in `AllThemes`

### Light/dark repos (`.dark` class)
- Themes are `light` (`:root`) and `dark` (`.dark`)
- Generate `SingleTheme` only (no `AllThemes`) unless the user explicitly wants both columns
- No `tokensByTheme` utility required

---

## Outputs

Story files written to the Foundations output directory:

| Category | Story file | Export | Notes |
|----------|------------|--------|-------|
| Colors | `Colors.stories.tsx` | `SingleTheme` | Brand, status, semantic, chart |
| Type — Headings | `TypeHeadings.stories.tsx` | `SingleTheme` | Display/H1/H2/H3 scale |
| Type — Body | `TypeBody.stories.tsx` | `SingleTheme` | Body/small/label/metric scale |
| Type — Mono | `TypeMono.stories.tsx` | `SingleTheme` | Mono font specimens |
| Spacing | `Spacing.stories.tsx` | `AllTokens` | Visual ruler bars + strokes |
| Radius | `Radius.stories.tsx` | `SingleTheme` | Bordered boxes per radius step |
| Motion | `Motion.stories.tsx` | `AllTokens` | Interactive replay demos |

---

## Instructions

Follow these steps in order for Mode A.

### Step 1 — Locate and parse the token source

Read the canonical token CSS file. Extract:

- **Theme system**: `[data-theme]` selectors or `.dark` class
- **Color tokens**: brand, semantic/shadcn, status, chart
- **Typography tokens**: `--fs-*` scale, `--font-sans`, `--font-mono`
- **Spacing tokens**: `--space-*`
- **Radius tokens**: `--radius-*`
- **Stroke tokens**: `--stroke-*`
- **Motion tokens**: `--dur-*`, `--ease`

If any token category is missing from the file, report it to the user and ask whether to:
  a) Add the tokens first, then generate stories
  b) Skip that story file
  c) Generate the story with placeholder values

### Step 2 — Audit existing story files

Check if each story file exists in the output directory.

- If it exists: read it, note what's there.
- If it does not exist: mark for creation.

Report findings before writing anything.

### Step 3 — Generate / update story files

Write or overwrite each story file following the conventions below.

#### Conventions (all story files)

**Imports**

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
```

Use the framework's re-export of `@storybook/react` types if the project uses a framework wrapper (e.g. `@storybook/nextjs-vite`).

**Meta**

```tsx
const meta: Meta = {
  title: 'Tokens/<Category>',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;
```

**Token references in styles**

- Never hardcode pixel values that exist as tokens — use `var(--token-name)`.
- Use the semantic tokens available in the repo. Common mappings:

| Logical role | shadcn/Radix token | QMS-specific |
|---|---|---|
| Page background | `var(--background)` | — |
| Surface/card | `var(--card)` | — |
| Muted surface | `var(--muted)` | — |
| Primary text | `var(--foreground)` | `var(--color-qms-text-base)` |
| Secondary text | `var(--muted-foreground)` | — |
| Brand color | `var(--primary)` | `var(--color-qms-blue)` |
| Border | `var(--border)` | `var(--color-qms-border)` |
| Focus ring | `var(--ring)` | — |
| Sans font | `var(--font-sans)` | — |
| Mono font | `var(--font-mono)` | — |

Adapt to whatever tokens are actually defined in the repo's token file.

#### Colors.stories.tsx

Group swatches into sections:
- **Brand** colors (primary action, hover states, accents)
- **Neutrals** (white → near-black scale)
- **Status** (success, warning, error, extended palette)
- **Semantic** (shadcn/Radix: `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--background`, `--card`, `--border`, `--input`, `--ring`)
- **Charts** (`--chart-1` through `--chart-5`)

For each swatch, show: colored box, token name, hex value (if known), and a short purpose label.

#### TypeHeadings.stories.tsx

Display the heading scale (`--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-h3`) in `var(--font-sans)`. For each entry show: token name, size spec, and a domain-appropriate sample string.

#### TypeBody.stories.tsx

Display the body/label/metric scale. For metric sizes render a value + unit pair. For label size apply `textTransform: 'uppercase'` and wide tracking.

#### TypeMono.stories.tsx

Display mono font specimens using `var(--font-mono)`: token names, timestamps/IDs, metric values, and a code block sample.

#### Spacing.stories.tsx

Render each `--space-*` token as a horizontal bar whose width equals its value, plus a token name and pixel label. Also show stroke tokens as horizontal lines. Export `AllTokens` (not `SingleTheme`) — spacing is theme-invariant.

#### Radius.stories.tsx

Render each `--radius-*` token as a 96×64 box with `background: var(--card)` and `border: 1px solid var(--ring)`. Show token name, pixel value, and purpose label below each box.

#### Motion.stories.tsx

For each duration token, render an interactive "replay" demo: a pill bar that animates from 0% → 100% width using that duration and `var(--ease)` on each button click. Use `React.useState` to re-trigger. Also show a static token reference table. Export `AllTokens` — motion is theme-invariant.

---

### Step 4 — Report

Output a summary table:

| File | Action | Notes |
|------|--------|-------|
| Colors.stories.tsx | Created / Updated | — |
| Spacing.stories.tsx | Created | Tokens added to token.css first |
| ... | ... | ... |

---

## Storybook title namespace

All Foundations stories live under `Tokens/`:

| Story | Title |
|-------|-------|
| Colors | `Tokens/Colors` |
| TypeHeadings | `Tokens/Typography/Headings` |
| TypeBody | `Tokens/Typography/Body` |
| TypeMono | `Tokens/Typography/Mono` |
| Spacing | `Tokens/Spacing` |
| Radius | `Tokens/Radius` |
| Motion | `Tokens/Motion` |

---

## Notes

- Never hardcode values that already exist as tokens.
- `AllThemes` stories require a `tokensByTheme` utility that maps theme names to JavaScript style objects. Only generate them if such a utility exists or the user asks for it to be created.
- When adding missing tokens to the token CSS file, also add them to any file that actually loads in the browser (e.g. `globals.css`), since some repos keep `token.css` as a documentation/tooling-only file.
- For Mode B (incremental theme sync), only update the `THEMES` const and affected component logic. Do not rewrite story files wholesale.
