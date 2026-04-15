import { chromium } from 'playwright';

const browser = await chromium.launch();

// Test 1: reduced motion ENABLED
const ctxReduced = await browser.newContext({ reducedMotion: 'reduce' });
const pageR = await ctxReduced.newPage();
await pageR.goto('http://localhost:4321/work/patterns/');
await pageR.waitForSelector('gifa11y-button', { state: 'attached' });
const reducedResult = await pageR.evaluate(() => {
  const wraps = document.querySelectorAll('.gifa11y-wrap');
  return Array.from(wraps).map((wrap, i) => {
    const img = wrap.querySelector('img[src$=".gif"]');
    const canvas = wrap.querySelector('canvas');
    const host = wrap.querySelector('gifa11y-button');
    const btn = host.shadowRoot.querySelector('button');
    return {
      index: i,
      mediaQueryMatches: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      gifDataState: img.getAttribute('data-gifa11y-state'),
      gifDisplay: img.style.display,
      canvasDisplay: canvas.style.display,
      buttonAriaLabel: btn.getAttribute('aria-label'),
    };
  });
});
console.log('--- REDUCED MOTION = REDUCE ---');
console.log(JSON.stringify(reducedResult, null, 2));
await pageR.screenshot({ path: '/tmp/gif-reduced.png' });

// Test 2: reduced motion default (no-preference)
const ctxNormal = await browser.newContext({ reducedMotion: 'no-preference' });
const pageN = await ctxNormal.newPage();
await pageN.goto('http://localhost:4321/work/patterns/');
await pageN.waitForSelector('gifa11y-button', { state: 'attached' });
const normalResult = await pageN.evaluate(() => {
  const wraps = document.querySelectorAll('.gifa11y-wrap');
  return Array.from(wraps).map((wrap, i) => {
    const img = wrap.querySelector('img[src$=".gif"]');
    const canvas = wrap.querySelector('canvas');
    const host = wrap.querySelector('gifa11y-button');
    const btn = host.shadowRoot.querySelector('button');
    return {
      index: i,
      mediaQueryMatches: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      gifDataState: img.getAttribute('data-gifa11y-state'),
      gifDisplay: img.style.display,
      canvasDisplay: canvas.style.display,
      buttonAriaLabel: btn.getAttribute('aria-label'),
    };
  });
});
console.log('--- REDUCED MOTION = NO-PREFERENCE ---');
console.log(JSON.stringify(normalResult, null, 2));

await browser.close();
