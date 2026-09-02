const { chromium, devices } = require('playwright');
const fs = require('fs');
(async () => {
  await fs.promises.mkdir('docs/visual-qa/images', { recursive: true });
  const browser = await chromium.launch();
  // Desktop
  let context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  let page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const h3 = page.locator('text=Nos offres').first();
  const section = h3.locator('xpath=ancestor::section[1]');
  // add subtle highlight overlay for CTA
  await page.evaluate(() => {
    const s = document.createElement('style');
    s.innerHTML = `
      .__qa_highlight_cta { box-shadow: 0 0 0 4px rgba(236,72,153,0.18) inset; }
      .__qa_overlay_label { position: absolute; background: rgba(0,0,0,0.7); color: white; padding: 6px 8px; font-size:12px; border-radius:4px; z-index:9999; }
    `;
    document.head.appendChild(s);
  });
  // highlight first CTA
  const firstBtn = await section.locator('button').first();
  await firstBtn.evaluate((el)=>el.classList.add('__qa_highlight_cta'));
  await section.screenshot({ path: 'docs/visual-qa/images/pricing-desktop-1.png' });
  await context.close();

  // Mobile
  context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true });
  page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const h3m = page.locator('text=Nos offres').first();
  const sectionm = h3m.locator('xpath=ancestor::section[1]');
  await page.evaluate(() => {
    document.querySelectorAll('.__qa_highlight_cta').forEach(e=>e.classList.remove('__qa_highlight_cta'));
  });
  const firstBtnM = await sectionm.locator('button').first();
  await firstBtnM.evaluate((el)=>el.classList.add('__qa_highlight_cta'));
  await sectionm.screenshot({ path: 'docs/visual-qa/images/pricing-mobile-1.png' });
  await context.close();

  // Focus state: desktop-sized context, focus first CTA and screenshot
  context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const h3f = page.locator('text=Nos offres').first();
  const sectionf = h3f.locator('xpath=ancestor::section[1]');
  const btn = sectionf.locator('button').first();
  await btn.focus();
  // ensure focus-visible styles render
  await page.keyboard.press('Tab');
  await sectionf.screenshot({ path: 'docs/visual-qa/images/pricing-focus-1.png' });
  await context.close();

  await browser.close();
  console.log('Screenshots saved to docs/visual-qa/images/');
})();
