const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/');

  const components = [
    { name: 'User/team management', filename: 'SaaS_User_Management.png' },
    { name: 'Product Details Hero', filename: 'Ecom_Hero.png' },
    { name: 'Sprint Board Organism', filename: 'Sprint_Board.png' },
    { name: 'Tabs', filename: 'Tabs_Molecule.png' },
    { name: 'Empty state', filename: 'Empty_State.png' }
  ];

  for (const comp of components) {
    console.log(`Verifying ${comp.name}...`);
    await page.click(`text=${comp.name}`);
    await page.waitForTimeout(1000); // Wait for injection
    await page.screenshot({ path: `tests/screenshots/HF_${comp.filename}`, fullPage: true });
  }

  await browser.close();
})();
