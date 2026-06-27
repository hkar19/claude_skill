/**
 * Captures right-click context menu + both placement panels on the floor plan canvas.
 *
 * Usage:
 *   node_modules/.bin/tsx playwright/capture-floor-plan-interactions.ts
 */

import { chromium } from '@playwright/test';
import { resolve, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const authFile  = resolve(__dirname, '.auth/user.json');
const OUT       = resolve(__dirname, '../../docs/research/log/screenshots');

const BASE_URL  = 'http://localhost:5173';
const FP_URL    = `${BASE_URL}/asset/floor-plans/fp000001-0000-0000-0000-000000000001`;

if (!existsSync(authFile)) {
  console.error('No auth state found. Run auth.setup.ts first.');
  process.exit(1);
}

const browser = await chromium.launch();

async function newPage() {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    storageState: authFile,
  });
  return ctx.newPage();
}

// Canvas div has class "select-none" and the onContextMenu handler
const CANVAS_SEL = 'div.select-none';

async function rightClickCanvas(page: Awaited<ReturnType<typeof newPage>>) {
  await page.goto(FP_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const canvas = page.locator(CANVAS_SEL).first();
  const box    = await canvas.boundingBox();
  if (!box) throw new Error('Canvas div not found');

  // Use locator.click with right button so Playwright fires the contextmenu event
  await canvas.click({
    button:   'right',
    position: { x: box.width * 0.45, y: box.height * 0.45 },
  });
  await page.waitForTimeout(400);
  return { page, box };
}

// ── 1. Context menu ────────────────────────────────────────────────────────────

{
  const { page } = await rightClickCanvas(await newPage());
  await page.screenshot({ path: `${OUT}/floor-plan-ctx-menu.png`, fullPage: true });
  console.log('saved floor-plan-ctx-menu.png');
  await page.close();
}

// ── 2. "Place Existing Beacon" modal ──────────────────────────────────────────

{
  const { page } = await rightClickCanvas(await newPage());

  // Buttons use onMouseDown — move over the button then fire mouse.down
  const placeBtn = page.getByText('Place Existing Beacon');
  const btnBox   = await placeBtn.boundingBox();
  if (!btnBox) throw new Error('Place Existing button not found');

  await page.mouse.move(btnBox.x + btnBox.width / 2, btnBox.y + btnBox.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(600);
  await page.mouse.up();

  await page.screenshot({ path: `${OUT}/floor-plan-place-existing.png`, fullPage: true });
  console.log('saved floor-plan-place-existing.png');
  await page.close();
}

// ── 3. "Create & Place New Beacon" modal ──────────────────────────────────────

{
  const { page } = await rightClickCanvas(await newPage());

  const createBtn = page.getByText('Create & Place New Beacon');
  const btnBox    = await createBtn.boundingBox();
  if (!btnBox) throw new Error('Create & Place button not found');

  await page.mouse.move(btnBox.x + btnBox.width / 2, btnBox.y + btnBox.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(600);
  await page.mouse.up();

  await page.screenshot({ path: `${OUT}/floor-plan-create-place.png`, fullPage: true });
  console.log('saved floor-plan-create-place.png');
  await page.close();
}

await browser.close();
console.log('Done.');
