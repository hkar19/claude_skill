#!/usr/bin/env node
/**
 * WCAG 2 AA contrast checker for design-token-based components.
 *
 * Usage:
 *   node check-contrast.js <tokens.css> [--theme dark|light]
 *
 * Reads a CSS token file, then accepts pairs on stdin:
 *   fg=<token>  bg=<token>  [alpha=<0-1>]  [type=text|icon]  [label=<name>]
 *   fg=<token>  bg=<token>  [alpha=<0-1>]  [type=text|icon]  [label=<name>]
 *   ...
 *
 * Or pass pairs as a second JSON file:
 *   node check-contrast.js <tokens.css> <pairs.json> [--theme dark|light]
 *
 * pairs.json format:
 *   [
 *     { "fg": "--brand", "bg": "--surface", "type": "text", "label": "label span" },
 *     { "fg": "--brand", "bg": "--brand-soft", "bgBase": "--surface", "alpha": 0.16, "type": "icon", "label": "trend icon" }
 *   ]
 *
 * type: "text" → 4.5:1 threshold (WCAG 1.4.3 normal text)
 *        "icon" → 3.0:1 threshold (WCAG 1.4.11 non-text)
 *
 * bgBase + alpha: when bg is a semi-transparent token, bgBase is the opaque
 * surface beneath it. The script alpha-blends them before computing contrast.
 */

const fs   = require('fs');
const path = require('path');

// ── helpers ──────────────────────────────────────────────────────────────────

function srgbToLinear(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(r, g, b) {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function contrastRatio(l1, l2) {
  const [lo, hi] = l1 < l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

function hexToRgb(hex) {
  const n = Number.parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function alphaBlend(baseHex, r, g, b, alpha) {
  const [br, bg, bb] = hexToRgb(baseHex);
  return [
    br * (1 - alpha) + r * alpha,
    bg * (1 - alpha) + g * alpha,
    bb * (1 - alpha) + b * alpha,
  ];
}

// ── token parser ─────────────────────────────────────────────────────────────
// Extracts CSS custom properties from a tokens CSS file, grouped by theme.
// Returns { dark: {name: hex}, light: {name: hex}, medical: {…}, … }
// Parses all [data-theme='<name>'] selectors dynamically.

function selectorThemes(selector, knownThemes) {
  const targets = [];
  // :root block always maps to 'dark' (canonical default)
  if (/:root/.test(selector)) targets.push('dark');
  // match both single and double-quoted data-theme attributes
  const re = /\[data-theme=['"]([^'"]+)['"]\]/g;
  let m;
  while ((m = re.exec(selector)) !== null) {
    const name = m[1];
    if (!knownThemes.has(name)) knownThemes.add(name);
    targets.push(name);
  }
  return targets;
}

function extractProps(body) {
  const props = {};
  const hexRe  = /(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8})/g;
  const rgbaRe = /(--[\w-]+)\s*:\s*rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g;
  let m;
  while ((m = hexRe.exec(body)) !== null) props[m[1]] = m[2];
  while ((m = rgbaRe.exec(body)) !== null) {
    // Store RGB part as hex; embedded alpha is ignored (pairs JSON supplies it)
    props[m[1]] = '#' + [m[2], m[3], m[4]]
      .map(n => Number.parseInt(n, 10).toString(16).padStart(2, '0')).join('');
  }
  return props;
}

function parseTokens(cssText) {
  const knownThemes = new Set(['dark']);
  const themes  = { dark: {} };
  const blockRe = /([^{]+)\{([^}]+)\}/g;
  let m;
  while ((m = blockRe.exec(cssText)) !== null) {
    const targets = selectorThemes(m[1].trim(), knownThemes);
    if (!targets.length) continue;
    // ensure all discovered themes have an object
    for (const t of targets) { if (!themes[t]) themes[t] = {}; }
    const props = extractProps(m[2]);
    for (const [k, v] of Object.entries(props)) {
      for (const t of targets) themes[t][k] = v;
    }
  }
  // Every non-dark theme inherits root/dark tokens it doesn't override
  for (const theme of Object.keys(themes)) {
    if (theme === 'dark') continue;
    for (const [k, v] of Object.entries(themes.dark)) {
      if (!(k in themes[theme])) themes[theme][k] = v;
    }
  }
  return themes;
}

// ── resolve a token to hex ────────────────────────────────────────────────────

function resolve(tokenOrHex, themeTokens) {
  if (tokenOrHex.startsWith('#')) return tokenOrHex;
  const v = themeTokens[tokenOrHex];
  if (!v) throw new Error(`Token not found: ${tokenOrHex}`);
  return v;
}

// ── main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (!args.length || args[0] === '--help') {
  console.log(__filename.split('/').pop() + ' <tokens.css> [pairs.json] [--theme dark|light]');
  process.exit(0);
}

const tokensFile = args[0];
const themeArg   = args.includes('--theme') ? args[args.indexOf('--theme') + 1] : null;
const pairsFile  = args.find(a => a.endsWith('.json'));

const css    = fs.readFileSync(tokensFile, 'utf8');
const tokens = parseTokens(css);

let pairs;
if (pairsFile) {
  pairs = JSON.parse(fs.readFileSync(pairsFile, 'utf8'));
} else {
  // read from stdin (one JSON object per line)
  const lines = fs.readFileSync('/dev/stdin', 'utf8').trim().split('\n');
  pairs = lines.map(l => JSON.parse(l));
}

const themesToCheck = themeArg ? [themeArg] : Object.keys(tokens);

let anyFail = false;
const TEXT_THRESHOLD = 4.5;
const ICON_THRESHOLD = 3.0;

for (const theme of themesToCheck) {
  const t = tokens[theme];
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`Theme: ${theme}  (surface bg = ${t['--surface'] || 'N/A'})`);
  console.log('─'.repeat(60));

  for (const pair of pairs) {
    const { fg, bg, bgBase, alpha, label = '', type = 'text' } = pair;
    const threshold = type === 'icon' ? ICON_THRESHOLD : TEXT_THRESHOLD;

    try {
      const fgHex  = resolve(fg, t);
      const [fr, fg_, fb] = hexToRgb(fgHex);
      const fgLum  = relativeLuminance(fr, fg_, fb);

      let bgLum;
      if (bgBase && alpha != null) {
        // semi-transparent overlay: blend bg rgba onto bgBase
        const bgBaseHex = resolve(bgBase, t);
        const bgHex     = resolve(bg, t);
        const [br, bg__, bb] = hexToRgb(bgHex);
        const [er, eg, eb]   = alphaBlend(bgBaseHex, br, bg__, bb, alpha);
        bgLum = relativeLuminance(er, eg, eb);
      } else {
        const bgHex = resolve(bg, t);
        const [br, bg__, bb] = hexToRgb(bgHex);
        bgLum = relativeLuminance(br, bg__, bb);
      }

      const ratio = contrastRatio(fgLum, bgLum);
      const pass  = ratio >= threshold;
      const mark  = pass ? '✓' : '✗';
      const note  = pass ? '' : ` ← FAILS (need ${threshold}:1)`;
      const bgDesc = bgBase ? `${bg}@${alpha} on ${bgBase}` : bg;
      console.log(`${mark} ${(label || `${fg} on ${bgDesc}`).padEnd(45)} ${ratio.toFixed(2)}:1${note}`);
      if (!pass) anyFail = true;
    } catch (e) {
      console.log(`? ${label || `${fg} on ${bg}`}: ${e.message}`);
    }
  }
}

process.exit(anyFail ? 1 : 0);
