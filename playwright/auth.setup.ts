/**
 * Playwright auth setup — cookie injection.
 *
 * Usage:
 *   npx tsx playwright/auth.setup.ts <base_url> <token_cookie_value>
 *
 * Saves storage state (cookies) to playwright/.auth/user.json so that
 * subsequent scripts can load it with { storageState: '.auth/user.json' }.
 *
 * Example:
 *   npx tsx playwright/auth.setup.ts http://localhost:5173 eyJhbGci...
 */

import { chromium } from '@playwright/test';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const [,, baseUrl, token] = process.argv;

if (!baseUrl || !token) {
  console.error('Usage: npx tsx playwright/auth.setup.ts <base_url> <token>');
  process.exit(1);
}

const authFile = resolve(__dirname, '.auth/user.json');
const url = new URL(baseUrl);

const browser = await chromium.launch();
const ctx = await browser.newContext();

await ctx.addCookies([{
  name:   'token',
  value:  token,
  domain: url.hostname,
  path:   '/',
}]);

await ctx.storageState({ path: authFile });
await browser.close();

console.log(`Auth state saved → ${authFile}`);
