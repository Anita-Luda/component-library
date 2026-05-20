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
        os.makedirs("tests/screenshots/layout", exist_ok=True)

        targets = [
            ("Dashboard Template", "Dashboard"),
            ("Auth Page Template", "Auth"),
            ("Dashboard layout", "Layout_Dashboard"),
            ("Chat window", "AI_Chat"),
            ("Carousel", "Carousel")
        ]

        for name, filename in targets:
            url_name = name.replace(" ", "%20")
            await page.goto(f"http://localhost:3004?component={url_name}")
            await page.wait_for_timeout(2000)
            path = f"tests/screenshots/layout/{filename}.png"
            await page.screenshot(path=path, full_page=True)
            print(f"Captured {path}")

        await browser.close()

if __name__ == "__main__":
    server = subprocess.Popen(["python3", "-m", "http.server", "3004"])
    time.sleep(2)
    try:
        asyncio.run(capture())
    finally:
        server.terminate()
