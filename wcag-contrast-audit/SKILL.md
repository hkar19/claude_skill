---
name: wcag-contrast-audit
description: "Audit design-token-based UI components or the token source file itself for WCAG 2 AA contrast compliance, report failing pairs, and apply fixes or suggestions. Triggers when asked to 'ensure contrast', 'check WCAG', 'fix accessibility', 'audit contrast', 'new theme', 'add theme', or 'check contrast for theme'."
---

# WCAG Contrast Audit

This skill has two modes:

| Mode | Use when |
| ---- | -------- |
| **A — Component audit** | Auditing a React/TSX component that references design tokens |
| **B — Token-file audit** (`design-contrast-check`) | Adding a new theme to `tokens.css` and validating the whole file |

---

## Mode A — Component audit

### Purpose

Audit a React/TSX component that uses CSS custom property design tokens for
WCAG 2 AA contrast compliance, identify failing color pairs, and fix them by
updating token references or adding accessible token variants to the token
source file.

Thresholds applied:
- **Text** (any `<span>`, `<p>`, rendered string): 4.5:1 (WCAG 1.4.3 normal text)
- **Icons / graphical UI elements**: 3.0:1 (WCAG 1.4.11 non-text contrast)

---

### Inputs

1. **Component file** — the `.tsx` file to audit
2. **Tokens CSS file** — typically `packages/tokens/src/tokens.css`; defines
   CSS custom properties for `[data-theme="dark"]` and `[data-theme="light"]`

---

### Outputs

- A contrast report printed to stdout listing every checked pair with its ratio
  and pass/fail status
- Fixed component file (updated class names / token references)
- Updated tokens CSS file if new semantic tokens were required

---

### Instructions

### 1 — Identify color pairs

Read the component and list every `fg → bg` pair:

- `text-(--token)` classes → foreground token
- `bg-(--token)` classes → background token of the containing element
- For icons inside soft-badge elements, the background is the alpha-blended
  result of the soft token over the parent surface token

Typical component backgrounds: `--surface`, `--surface-2`, `--canvas`, `--sidebar`.

### 2 — Build a pairs JSON file

Create a temporary `pairs.json` (delete after use) using the schema below.
Use `type: "icon"` (3:1 threshold) for icon elements; `type: "text"` (4.5:1)
for everything else.

For semi-transparent soft-badge backgrounds, supply `bgBase`, `bg`, and `alpha`:

```json
[
  { "fg": "--text",   "bg": "--surface", "type": "text", "label": "value text" },
  { "fg": "--label",  "bg": "--surface", "type": "text", "label": "label span (11px)" },
  { "fg": "--brand",  "bg": "--brand-soft", "bgBase": "--surface", "alpha": 0.16,
    "type": "icon", "label": "brand icon on soft badge (dark)" }
]
```

The `alpha` field must match the opacity used in the token definition
(e.g. `rgba(37,99,235,0.16)` → `"alpha": 0.16`).

### 3 — Run the checker

```bash
node submodules/skill/wcag-contrast-audit/check-contrast.js \
  <path/to/tokens.css> \
  pairs.json
```

The script exits with code 0 (all pass) or 1 (one or more failures). It prints
a report for both `dark` and `light` themes automatically.

### 4 — Fix failures

Apply fixes in this priority order:

**A. Swap to an existing passing token**
If a semantically close token already passes in both themes, prefer it:
- `--label` failing → try `--text-2` (secondary text; passes in both themes for the ds-industrial token set)

**B. Add a new semantic text token**
When the base token is dual-purpose (e.g. `--brand` used both as button bg and
as icon/text color) and changing it would break other usages:

1. Add a new token pair to the CSS file — one value per theme:
   ```css
   /* in :root / [data-theme="dark"] */
   --text-brand:   #93C5FD;   /* accessible brand-blue text on dark surfaces */
   --text-warning: #FFB729;   /* accessible amber on dark surfaces */

   /* in [data-theme="light"] */
   --text-brand:   #2563EB;
   --text-warning: #B45309;   /* darker amber, accessible on light surfaces */
   ```
2. Update the component to reference the new token.

**C. Never change a background token** (`--surface`, `--brand-soft`, etc.) to
fix foreground contrast — that alters the visual design across the system.
Only change or add *foreground* tokens.

### 5 — Verify

Re-run the checker with the same `pairs.json` to confirm exit code 0, then
delete the temp file.

---

## Reference: ds-industrial token baseline (2025-05)

| Token            | Dark value  | Light value | Notes |
|------------------|-------------|-------------|-------|
| `--surface`      | `#354358`   | `#FFFFFF`   | card/tile bg |
| `--text`         | `#FAFAFA`   | `#0F1722`   | primary text — always passes |
| `--text-2`       | `#C4CDE0`   | `#4A5566`   | secondary text — always passes on `--surface` |
| `--label`        | `#687484`   | `#687484`   | **fails 4.5:1 in dark** on `--surface` |
| `--brand`        | `#2563EB`   | `#2563EB`   | **fails in dark** as text/icon on `--surface` |
| `--amber`        | `#FFB729`   | `#FFB729`   | **fails in light** as text/icon on `--surface` |
| `--red`          | `#FC5A5A`   | `#FC5A5A`   | **fails in both themes** as icon on soft badge |
| `--text-brand`   | `#93C5FD`   | `#2563EB`   | accessible brand-hued text (added by this skill) |
| `--text-warning` | `#FFB729`   | `#B45309`   | accessible amber text (added by this skill) |

---

## Mode B — Token-file audit (`design-contrast-check`)

### Purpose

Validate that every new theme block added to `tokens.css` passes WCAG 2 AA
before it is committed. Extends the audit script with the new theme's pairs,
runs the full audit, and surfaces violations with suggested fixes.

**No writes to `tokens.css`** — all output is advisory.

---

### Inputs

1. `packages/tokens/src/tokens.css` with the new theme block already in place.
2. `apps/storybook/scripts/audit-contrast.js` — the audit runner.

---

### Outputs

- Contrast report (stdout) across all themes.
- Violations listed with suggested foreground token replacements.

---

### Instructions

#### 1 — Classify new theme tokens

Read the new `[data-theme="..."]` block. Classify each token:

- **Foreground candidates**: `--text-*`, `--label`, `--border*`, `--icon-*`, `--cta-fg`
- **Background candidates**: `--canvas`, `--surface*`, `--sidebar`, `--*-soft`, `--cta*`, `--brand`

#### 2 — Extend AUDIT_PAIRS if needed

Open `apps/storybook/scripts/audit-contrast.js`. For every foreground token the
new theme defines, confirm it appears in at least one `AUDIT_PAIRS` entry against
a relevant background. If missing, add the pair:

```js
{ fg: '--<new-fg>', bg: '--<new-bg>', label: '<description>', min: 4.5 },
```

Use `min: 3.0` for borders and non-text graphical elements.

Stage the updated script alongside `tokens.css`.

#### 3 — Run the audit

```bash
node apps/storybook/scripts/audit-contrast.js
```

#### 4 — Report violations with suggestions

For each failure:

```
[<theme>] <label>
  <fg-token> on <bg-token>
  Ratio: <x>:1  (needs ≥ <min>:1)
  Suggestion: <...>
```

Apply suggestions in this priority order:

| Failing fg token    | Suggested replacement | When |
| ------------------- | --------------------- | ---- |
| `--brand`           | `--text-brand`        | Always |
| `--amber`           | `--text-warning`      | Always |
| `--red`             | `--text-error`        | Always |
| `--label`           | `--text-2`            | When `--text-2` passes for that theme |
| A new custom token  | Add `--text-<role>`   | No existing token covers it — see Step 5 |

Never suggest changing a **background** token.

#### 5 — Propose new semantic tokens (no writes)

If no existing token can substitute, describe the required addition and present
it for team review:

```
Proposed addition to [data-theme="<new-theme>"] in tokens.css:
  --text-<role>: <hex>;   /* <ratio>:1 on --<bg> — passes <min>:1 */
```

Verify the value would pass before suggesting it.
