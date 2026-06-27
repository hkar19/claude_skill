---
name: playwright
description: "Take full-page screenshots of live web pages using Playwright. Supports authenticated sessions via stored cookie state (JWT token injection). Use when asked to snapshot a page, capture a UI after deploying, or produce visual evidence for a research log."
---

# Playwright Skill

## Purpose

Capture full-page screenshots of live web pages. Supports authenticated sessions by injecting a JWT cookie so protected routes are captured correctly.

All scripts live in `submodules/skills/playwright/` and are run with `node_modules/.bin/tsx` from the `submodules/skills/` directory.

---

## Triggers

Use this skill when the user says things like:

- "take a screenshot of X"
- "snapshot this page"
- "capture the UI at localhost:..."
- "screenshot the dashboard after deploying"
- "I need visual evidence of the current state of the app"

Also called by the **research** skill (Step 4.5) when a page snapshot is attached to a log entry.

---

## Requirements

From `submodules/skills/`, run:

```bash
npm install
npx playwright install chromium
```

Both only need to run once per machine. Do not use `npx tsx` — RTK intercepts it as an npm script. Always use `node_modules/.bin/tsx` directly.

---

## Auth Setup (one-time, per session)

For apps that require a login cookie (JWT), run the auth setup script once before taking screenshots. It saves the cookie as Playwright storage state so all subsequent screenshots load it automatically.

```bash
cd submodules/skills
node_modules/.bin/tsx playwright/auth.setup.ts <base_url> <token_value>
```

Example:

```bash
cd submodules/skills
node_modules/.bin/tsx playwright/auth.setup.ts http://localhost:5173 eyJhbGci...
```

The token is saved to `playwright/.auth/user.json` (git-ignored). Re-run whenever the token changes or expires.

---

## Taking a Screenshot

```bash
cd submodules/skills
node_modules/.bin/tsx playwright/screenshot.ts "<url>" "<output_path>" [wait_ms]
```

| Argument | Required | Description |
| -------- | -------- | ----------- |
| `url` | Yes | Full URL to capture (e.g. `http://localhost:5173/dashboard`) |
| `output_path` | Yes | Where to save the `.png` |
| `wait_ms` | No | Extra wait before capture (default: 1500ms). Use for animations or lazy-loaded content. |

The script automatically loads `playwright/.auth/user.json` if it exists, falling back to unauthenticated if not.

Example:

```bash
node_modules/.bin/tsx playwright/screenshot.ts http://localhost:5173/dashboard /tmp/dash.png 2000
```

---

## Multiple Pages

Call `screenshot.ts` once per URL:

```bash
cd submodules/skills
node_modules/.bin/tsx playwright/screenshot.ts http://localhost:5173/dashboard    /tmp/dash.png
node_modules/.bin/tsx playwright/screenshot.ts http://localhost:5173/asset/floor  /tmp/floor.png
node_modules/.bin/tsx playwright/screenshot.ts http://localhost:5173/reports      /tmp/reports.png
```

---

## Error Handling

| Error | Action |
| ----- | ------ |
| `tsx: command not found` | Run `npm install` in `submodules/skills`; use `node_modules/.bin/tsx`, not `npx tsx` |
| Browser executable not found | Run `npx playwright install chromium`, retry |
| Lands on login page instead of target | Run `auth.setup.ts` first; verify the token is not expired |
| Connection refused (localhost) | Dev server is not running — ask user for the correct URL |
| Non-200 / timeout | Report the URL and error to the user |
