import json

def main():
    with open("registry.json", "r") as f:
        registry = json.load(f)

    checklist = "CHECKLIST OF DYNAMIC COMPONENTS (SPA)\n"
    checklist += "=" * 36 + "\n\n"

    checklist += "ARCHITECTURE: Dynamic SPA (Single Page Application)\n"
    checklist += "CONTENT: Surreal/Absurd Polish dummy text (auto-mapped by length)\n"
    checklist += "NESTING: Adequate per component profile (1-3 levels)\n\n"

    current_cat = None
    for comp in registry:
        if comp['category'] != current_cat:
            current_cat = comp['category']
            checklist += f"\n### {current_cat}\n"

        checklist += f"- [x] {comp['name']}\n"
        checklist += f"    - Profile: {comp['profile']}\n"
        checklist += f"    - Content: {comp['content_type']} surreal text\n"
        checklist += f"    - States: {', '.join(comp['states'])}\n"
        checklist += f"    - Types: {', '.join(comp['types'])}\n"

        # Nesting justification
        if comp['profile'] == 'atomic':
            nest = "None (Atomic item)"
        elif comp['profile'] == 'group':
            nest = "1 level (Options/Tabs/Accordion items)"
        elif comp['profile'] == 'hierarchical':
            nest = "2-3 levels (Deep navigation/Menu items)"
        elif comp['profile'] == 'data':
            nest = "Tabular (3x3 grid)"
        else:
            nest = "Default"
        checklist += f"    - Nesting: {nest}\n"

    with open("checklist.txt", "w") as f:
        f.write(checklist)

if __name__ == "__main__":
    main()
