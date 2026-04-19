// ─── PDF Generator (Puppeteer) ────────────────────────────────────────────────
//
// Takes an HTML string, renders it headlessly, and returns a PDF Buffer.
// Uses puppeteer in server-only context (Next.js API route).

import puppeteer, { Browser } from 'puppeteer';

let _browser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (_browser && _browser.connected) return _browser;

  _browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--font-render-hinting=none',
    ],
  });

  return _browser;
}

export interface GeneratePdfOptions {
  html: string;
  filename?: string;
}

export async function generatePdf(html: string): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    });

    // Wait for Google Fonts to load (if any)
    await page.evaluate(() => document.fonts.ready);

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true,
    });

    return Buffer.from(pdf);
  } finally {
    await page.close();
  }
}

// ─── Cleanup on process exit ──────────────────────────────────────────────────

if (typeof process !== 'undefined') {
  process.on('exit', async () => {
    if (_browser) await _browser.close();
  });
}
