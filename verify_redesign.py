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
        os.makedirs("tests/screenshots/redesign", exist_ok=True)

        targets = [
            ("atoms-button-primary-default", "Atom_Button"),
            ("atoms-h1-default-default", "Atom_H1"),
            ("molecule-tabs-default-default", "Molecule_Tabs"),
            ("organism-saas_user_management-default-default", "Organism_UserMgmt"),
            ("template-auth-default-default", "Template_Auth")
        ]

        await page.goto("http://localhost:3003/")
        await page.wait_for_timeout(2000)

        for comp_id, name in targets:
             # Find the component name in sidebar and click
             # Or just use the URL param if app.js supports it well
             url_name = name.replace("_", " ")
             # For some we might need specific names from registry
             await page.goto(f"http://localhost:3003/?component={url_name}")
             await page.wait_for_timeout(1000)
             await page.screenshot(path=f"tests/screenshots/redesign/{name}.png", full_page=True)

        await browser.close()

if __name__ == "__main__":
    server = subprocess.Popen(["python3", "-m", "http.server", "3003"])
    time.sleep(2)
    try:
        asyncio.run(capture())
    finally:
        server.terminate()
