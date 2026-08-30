const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'docs', 'visual-qa', 'images');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function capture() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();

    // Desktop
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    // Find the Pricing section by heading text 'Nos offres' (from content/pricing.json)
    const headings = await page.$x('//h3[contains(normalize-space(.), "Nos offres") or contains(normalize-space(.), "Offres")]');
    if (headings.length === 0) {
      console.warn('Pricing heading not found; capturing full page as fallback');
      await page.screenshot({ path: path.join(OUT_DIR, 'pricing-desktop-1.png'), fullPage: true });
    } else {
      const h = headings[0];
      // get closest section ancestor
      const sectionHandle = await page.evaluateHandle(el => {
        let node = el;
        while (node && node.tagName !== 'SECTION') node = node.parentElement;
        return node || document.body;
      }, h);

      const box = await sectionHandle.boundingBox();
      if (box) {
        await page.screenshot({ path: path.join(OUT_DIR, 'pricing-desktop-1.png'), clip: { x: box.x, y: box.y, width: Math.min(box.width, 1200), height: Math.min(box.height, 1000) } });
      } else {
        await page.screenshot({ path: path.join(OUT_DIR, 'pricing-desktop-1.png'), fullPage: true });
      }
    }

    // Mobile
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(OUT_DIR, 'pricing-mobile-1.png'), fullPage: false });

    // Focus state: focus first CTA button in the pricing section
    const ctas = await page.$x('//section//button');
    if (ctas.length > 0) {
      await ctas[0].focus();
      await page.waitForTimeout(250);
      await page.screenshot({ path: path.join(OUT_DIR, 'pricing-focus-1.png'), fullPage: false });
    } else {
      console.warn('No CTA button found to capture focus state');
    }

    console.log('Screenshots saved to', OUT_DIR);
  } finally {
    await browser.close();
  }
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
