import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        page.on("console", lambda msg: print(f"CONSOLE: {msg.type}: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        await page.goto("http://localhost:3000")
        await page.wait_for_timeout(3000)
        await browser.close()

if __name__ == "__main__":
    import subprocess
    import time
    server = subprocess.Popen(["python3", "-m", "http.server", "3000"])
    time.sleep(2)
    try:
        asyncio.run(run())
    finally:
        server.terminate()
