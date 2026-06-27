/**
 * Playwright screenshot runner — auth-aware.
 *
 * Usage:
 *   npx tsx playwright/screenshot.ts <url> <output_path> [wait_ms]
 *
 * Loads stored auth state from playwright/.auth/user.json if it exists.
 * Falls back to an unauthenticated context if the file is missing.
 *
 * Example:
 *   npx tsx playwright/screenshot.ts http://localhost:5173/dashboard /tmp/dash.png 2000
 */

import { chromium } from '@playwright/test';
import { resolve, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const [,, url, outputPath, waitMsArg] = process.argv;

if (!url || !outputPath) {
  console.error('Usage: npx tsx playwright/screenshot.ts <url> <output_path> [wait_ms]');
  process.exit(1);
}

const waitMs   = parseInt(waitMsArg ?? '1500', 10);
const authFile = resolve(__dirname, '.auth/user.json');
const hasAuth  = existsSync(authFile);

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport:     { width: 1440, height: 900 },
  ...(hasAuth ? { storageState: authFile } : {}),
});

if (hasAuth) {
  console.log(`Using auth state from ${authFile}`);
} else {
  console.warn('No auth state found — screenshotting without authentication.');
}

const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
if (waitMs > 0) await page.waitForTimeout(waitMs);
await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(`Saved → ${outputPath}`);
