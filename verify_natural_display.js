const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 2000 });

  // Start local server
  const { spawn } = require('child_process');
  const server = spawn('python3', ['-m', 'http.server', '8081']);

  await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    await page.goto('http://localhost:8081');

    // 1. Check Organism (User Management)
    await page.click('summary:has-text("2. SaaS / Dashboard")');
    await page.click('a:has-text("User/team management")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/home/jules/verification/natural_organism.png', fullPage: false });

    // 2. Check Template (Dashboard)
    await page.click('summary:has-text("Templates")');
    await page.click('a:has-text("Dashboard Template")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/home/jules/verification/natural_template.png', fullPage: false });

  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
    server.kill();
  }
})();
