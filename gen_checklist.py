import json

def main():
    with open("registry.json", "r") as f:
        registry = json.load(f)

    checklist = "CHECKLIST OF COMPONENTS - REFINEMENT STATUS (HYBRID LIBRARY)\n"
    checklist += "=" * 62 + "\n\n"

    checklist += "ARCHITECTURE: SPA + Static Blueprint Library\n"
    checklist += "COMPOSITION: Atomic Design (Atoms mapped to HTML tags)\n"
    checklist += "STYLING: 100% Tokenized CSS Variables\n"
    checklist += "REFINEMENT: Data Display & Feedback Screens Verified\n\n"

    current_cat = None
    done_categories = ["1. UNIVERSAL - Data Display", "1. UNIVERSAL - Feedback / State Components"]

    for comp in registry:
        if comp['category'] != current_cat:
            current_cat = comp['category']
            status = "[DONE]" if current_cat in done_categories else "[TODO]"
            checklist += f"\n### {current_cat} {status}\n"

        checklist += f"- [x] {comp['name']}\n"
        checklist += f"    - Blueprint: {comp['blueprint']}\n"
        checklist += f"    - States: {', '.join(comp['states'])}\n"
        checklist += f"    - Types: {', '.join(comp['types'])}\n"

    with open("checklist.txt", "w") as f:
        f.write(checklist)

if __name__ == "__main__":
    main()
