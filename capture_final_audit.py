import asyncio
from playwright.async_api import async_playwright
import os
from datetime import datetime

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M")
        os.makedirs("tests/screenshots", exist_ok=True)

        # Test a few key components to verify the fix
        targets = ["Button", "Text input", "<form>", "<table>", "Progress bar"]

        for name in targets:
            url_name = name.replace(" ", "%20")
            await page.goto(f"http://localhost:3000?component={url_name}")
            await page.wait_for_timeout(1000) # Wait for fetch
            path = f"tests/screenshots/{timestamp}-AUDIT-{name.replace('<','').replace('>','')}.png"
            await page.screenshot(path=path, full_page=True)
            print(f"Captured {path}")

        await browser.close()

if __name__ == "__main__":
    import subprocess
    import time
    # Start server
    server = subprocess.Popen(["python3", "-m", "http.server", "3000"])
    time.sleep(2)
    try:
        asyncio.run(capture())
    finally:
        server.terminate()
