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
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M")
        os.makedirs("tests/screenshots", exist_ok=True)

        targets = [
            "User Row",
            "Filter Bar",
            "Cart Item",
            "Price Tag",
            "Task Card",
            "User/team management",
            "Product grid",
            "Sprint Board Organism"
        ]

        for name in targets:
            url_name = name.replace(" ", "%20").replace("/", "%2F")
            await page.goto(f"http://localhost:3001?component={url_name}")
            await page.wait_for_timeout(1000)
            path = f"tests/screenshots/HF_{name.replace(' ', '_').replace('/', '_')}.png"
            await page.screenshot(path=path, full_page=True)
            print(f"Captured {path}")

        await browser.close()

if __name__ == "__main__":
    server = subprocess.Popen(["python3", "-m", "http.server", "3001"])
    time.sleep(2)
    try:
        asyncio.run(capture())
    finally:
        server.terminate()
