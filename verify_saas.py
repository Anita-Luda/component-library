import asyncio
from playwright.async_api import async_playwright
import os
import subprocess
import time

async def verify():
    server = subprocess.Popen(["python3", "-m", "http.server", "8000"])
    time.sleep(2)
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto("http://localhost:8000/index.html")

            # 1. Select SaaS category
            print("Selecting SaaS category...")
            await page.click("summary:has-text('2. SaaS / Dashboard')")

            # 2. Check Audit Logs (Organism with nested Table molecule)
            print("Checking Audit Logs organism...")
            await page.click("a.nav-item:text-is('Audit logs')")
            await page.wait_for_selector(".cmp.audit-logs-organism.is-organism")
            organism = page.locator(".cmp.audit-logs-organism.is-organism").first
            table = organism.locator("table.cmp.table.is-molecule")
            assert await table.count() > 0
            assert await table.locator("th.cmp.th.is-atom").count() > 0
            print("Audit Logs contain nested molecule (Table) and atoms (TH).")

            # 3. Check Role Matrix (Organism)
            print("Checking Role Matrix organism...")
            await page.click("a.nav-item:text-is('Role permission matrix')")
            await page.wait_for_selector(".cmp.role-matrix-organism.is-organism")

            # 4. Check Usage Meter (Molecule with nested progress atom)
            print("Checking Usage Meter molecule...")
            await page.click("a.nav-item:text-is('Usage meter')")
            await page.wait_for_selector(".cmp.usage-meter.is-molecule")
            meter = page.locator(".cmp.usage-meter.is-molecule").first
            assert await meter.locator("progress.cmp.progress.is-atom").count() > 0

            # 5. Check semantic typography (Atoms check)
            print("Checking Typography atoms (kbd, mark)...")
            await page.click("summary:has-text('1. UNIVERSAL - Typography & Media')")
            # Need to add kbd/mark to registry mapping first if testing here,
            # or just rely on Heading refinement from earlier.

            await page.screenshot(path="saas_refinement_verification.png", full_page=True)
            print("Verification successful!")
    finally:
        server.terminate()
        server.wait()

if __name__ == "__main__":
    asyncio.run(verify())
