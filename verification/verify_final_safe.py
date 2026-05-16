from playwright.sync_api import sync_playwright
import os
import subprocess
import time

def verify_final(page):
    errors = []
    page.on("pageerror", lambda err: errors.append(err.message))
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)

    try:
        page.goto("http://localhost:8103", wait_until="networkidle")
        # Atoms check
        page.wait_for_function("() => window.Atoms !== undefined", timeout=10000)
        # Catalog check
        page.wait_for_function("() => Object.keys(window.Atoms._snippets).length > 0", timeout=10000)
        num_snippets = page.evaluate("Object.keys(window.Atoms._snippets).length")
        print(f"Catalog loaded: {num_snippets} snippets.")

        # Registry check
        page.wait_for_function("() => window.registry && window.registry.length > 0", timeout=10000)
        print(f"Registry loaded: {page.evaluate('window.registry.length')} items.")

        # Render first item
        page.evaluate("renderComponent(window.registry[0])")
        page.wait_for_selector(".cmp", timeout=5000)
        print("First component rendered successfully.")

        page.screenshot(path="verification/final_verified_safe.png")
        return True
    except Exception as e:
        print(f"Verification FAILED: {e}")
        print(f"Errors found: {errors}")
        return False

if __name__ == "__main__":
    os.makedirs("verification", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        server = subprocess.Popen(["python3", "-m", "http.server", "8103"])
        time.sleep(2)
        page = browser.new_page()
        success = verify_final(page)
        server.terminate()
        browser.close()
        if not success: exit(1)
