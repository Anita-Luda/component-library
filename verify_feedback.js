const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080?component=1.%20UNIVERSAL%20-%20Feedback%20/%20State');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'check_feedback.png', fullPage: true });
  await browser.close();
})();
