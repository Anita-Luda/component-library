import asyncio
from playwright.async_api import async_playwright
import os
from datetime import datetime
import subprocess
import time

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        os.makedirs("tests/screenshots/audit", exist_ok=True)

        await page.goto("http://localhost:3002/")
        await page.wait_for_timeout(2000)

        # Get all categories
        categories = await page.evaluate('''() => {
            return Array.from(document.querySelectorAll('summary')).map(s => s.textContent);
        }''')

        for cat in categories:
            print(f"Auditing category: {cat}")
            await page.click(f"text={cat}")
            # Get first few components in category
            components = await page.evaluate(f'''(catName) => {{
                const summary = Array.from(document.querySelectorAll('summary')).find(s => s.textContent === catName);
                if (!summary) return [];
                const ul = summary.parentElement.querySelector('ul');
                return Array.from(ul.querySelectorAll('a')).slice(0, 3).map(a => a.textContent);
            }}''', cat)

            for comp in components:
                print(f"  Capturing component: {comp}")
                await page.click(f"#sidebar a:text('{comp}')")
                await page.wait_for_timeout(1000)
                path = f"tests/screenshots/audit/{cat.replace(' ', '_').replace('/', '_')}_{comp.replace(' ', '_')}.png"
                await page.screenshot(path=path, full_page=True)

        await browser.close()

if __name__ == "__main__":
    server = subprocess.Popen(["python3", "-m", "http.server", "3002"])
    time.sleep(2)
    try:
        asyncio.run(capture())
    finally:
        server.terminate()
