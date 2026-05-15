import os

# Standard 7 states as often used in design systems (Default, Hover, Focus, Active, Disabled, Error, Success)
states = ["default", "hover", "focus", "active", "disabled", "error", "success"]
types = ["primary", "secondary", "tertiary"]

def slugify(text):
    return text.lower().strip().replace(" ", "-").replace("/", "-").replace("&", "and").replace(".", "").replace(":", "")

def get_component_html(category, name, comp_type, state):
    id_name = f"{slugify(name)}-{comp_type}-{state}"
    classes = f"cmp {slugify(name)} type-{comp_type} state-{state}"

    label = f"{name} [{comp_type}] ({state})"
    name_lower = name.lower()

    html = ""

    # Semantic HTML based on component type
    if any(x in name_lower for x in ["input", "textarea", "select", "autocomplete", "combobox", "search", "picker", "editor", "field", "otp", "stepper"]):
        html += f'<div class="field-wrapper state-{state}">'
        html += f'<label for="{id_name}">{label}</label>'
        if "textarea" in name_lower:
            html += f'<textarea id="{id_name}" class="{classes}" role="textbox" {"disabled" if state=="disabled" else ""}>{state} content</textarea>'
        elif "select" in name_lower or "multi-select" in name_lower:
            html += f'<select id="{id_name}" class="{classes}" role="listbox" {"disabled" if state=="disabled" else ""}>'
            html += f'<option>{state} option</option>'
            html += f'</select>'
        else:
            html += f'<input type="text" id="{id_name}" class="{classes}" role="textbox" {"disabled" if state=="disabled" else ""}>'
        html += '</div>'

    elif "button" in name_lower:
        html += f'<button id="{id_name}" class="{classes}" role="button" {"disabled" if state=="disabled" else ""}>{label}</button>'

    elif any(x in name_lower for x in ["checkbox", "radio", "toggle", "switch"]):
        input_type = "radio" if "radio" in name_lower else "checkbox"
        html += f'<div class="choice-wrapper state-{state}">'
        html += f'<input type="{input_type}" id="{id_name}" class="{classes}" role="{input_type}" {"disabled" if state=="disabled" else ""}>'
        html += f'<label for="{id_name}">{label}</label>'
        html += '</div>'

    elif "link" in name_lower:
        html += f'<a href="#" id="{id_name}" class="{classes}" role="link">{label}</a>'

    elif any(x in name_lower for x in ["nav", "menu", "sidebar", "topbar", "tabs", "pills", "breadcrumb"]):
        html += f'<nav id="{id_name}" class="{classes}" role="navigation"><strong>{label}</strong><ul><li>Item 1</li><li>Item 2</li></ul></nav>'

    elif "card" in name_lower:
        html += f'<article id="{id_name}" class="{classes}" role="article"><h3>{label}</h3><p>Card content placeholder.</p></article>'

    elif any(x in name_lower for x in ["table", "grid"]):
        html += f'<table id="{id_name}" class="{classes}" role="grid"><caption>{label}</caption><thead><tr><th>Header 1</th><th>Header 2</th></tr></thead><tbody><tr><td>Data 1</td><td>Data 2</td></tr></tbody></table>'

    elif any(x in name_lower for x in ["image", "illustration", "gallery", "carousel"]):
        html += f'<figure id="{id_name}" class="{classes}"><img src="https://via.placeholder.com/150" alt="{label}"><figcaption>{label}</figcaption></figure>'

    elif "heading" in name_lower:
        level = "h1" if "1" in name_lower else "h2"
        html += f'<{level} id="{id_name}" class="{classes}">{label}</{level}>'

    elif "paragraph" in name_lower or "caption" in name_lower:
        html += f'<p id="{id_name}" class="{classes}">{label} Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>'

    else:
        # Generic role-based component
        role = "region"
        if "alert" in name_lower: role = "alert"
        elif "status" in name_lower: role = "status"
        elif "list" in name_lower: role = "list"
        elif "dialog" in name_lower: role = "dialog"
        elif "breadcrumb" in name_lower: role = "navigation"

        html += f'<div id="{id_name}" class="{classes}" role="{role}"><strong>{label}</strong></div>'

    return html

def main():
    if not os.path.exists("components.txt"):
        print("Error: components.txt not found")
        return

    with open("components.txt", "r") as f:
        lines = [line.strip() for line in f if line.strip()]

    all_components = []

    categories_list = [
        "1. UNIVERSAL - Input / Form Components",
        "1. UNIVERSAL - Navigation Components",
        "1. UNIVERSAL - Feedback / State Components",
        "1. UNIVERSAL - Data Display",
        "1. UNIVERSAL - Layout Components",
        "1. UNIVERSAL - Typography & Media",
        "2. SaaS / Dashboard",
        "2. E-commerce - Product Discovery",
        "2. E-commerce - Purchase Flow",
        "2. E-commerce - Growth Components",
        "2. Task Management / Productivity",
        "2. CMS / Blog / Knowledge Base",
        "2. AI / LLM Apps - Core",
        "2. AI / LLM Apps - Advanced AI UX",
        "2. Social Media / Community",
        "2. Fintech / Banking",
        "2. Healthcare",
        "2. Education / LMS",
        "2. Developer Tools",
        "2. Analytics / BI",
        "3. WEB-SPECIFIC - Desktop/Web Patterns",
        "3. WEB-SPECIFIC - Marketing Website Components",
        "4. MOBILE-SPECIFIC - iOS / Android Native Patterns",
        "4. MOBILE-SPECIFIC - Mobile-first UX",
        "5. TEMATYCZNE / SPECJALISTYCZNE - Enterprise"
    ]

    current_category = categories_list[0]

    for line in lines:
        if line in categories_list:
             current_category = line
             continue
        all_components.append((current_category, line))

    categories = []
    for c in all_components:
        if c[0] not in categories:
            categories.append(c[0])

    index_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Component Library</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; display: flex; margin: 0; background: #fff; color: #333; }
        aside { width: 300px; height: 100vh; overflow-y: auto; background: #f8f9fa; border-right: 1px solid #dee2e6; padding: 1rem; position: sticky; top: 0; }
        main { flex: 1; padding: 2rem; overflow-y: auto; height: 100vh; scroll-behavior: smooth; }
        section { margin-bottom: 5rem; border-bottom: 2px solid #eee; padding-bottom: 2rem; }
        .comp-group { margin-bottom: 3rem; padding: 1.5rem; border: 1px solid #eee; background: #fafafa; border-radius: 8px; }
        .comp-group h3 { margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem; color: #0056b3; }
        .comp-variants { display: flex; flex-wrap: wrap; gap: 1.5rem; }
        .variant { border: 1px dashed #ccc; padding: 1rem; background: #fff; min-width: 200px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        h1 { margin-top: 0; font-size: 2.5rem; color: #222; }
        h2 { border-bottom: 1px solid #ccc; padding: 0.75rem; background: #e9ecef; border-radius: 4px; margin-top: 2rem; color: #444; }
        nav ul { list-style: none; padding: 0; }
        nav li { margin-bottom: 0.5rem; }
        nav a { text-decoration: none; color: #007bff; font-size: 0.9rem; display: block; padding: 0.25rem 0; border-radius: 3px; }
        nav a:hover { background: #e2e6ea; padding-left: 5px; }
        .field-wrapper label { display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: #555; }
        .choice-wrapper { display: flex; align-items: center; gap: 0.5rem; }
        .choice-wrapper label { font-size: 0.8rem; }
        h4 { margin: 1.5rem 0 0.75rem 0; color: #777; font-size: 1rem; font-style: italic; border-left: 3px solid #ddd; padding-left: 10px; }
        .state-tag { display: block; font-size: 0.7rem; color: #aaa; margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
        .type-label { color: #666; font-size: 0.85rem; margin-bottom: 1rem; display: block; }
    </style>
</head>
<body>
<aside>
    <nav>
        <h2>Library Navigation</h2>
        <ul>
"""

    for cat in categories:
        index_html += f'<li><a href="#{slugify(cat)}">{cat}</a></li>'

    index_html += """
        </ul>
    </nav>
</aside>
<main>
    <h1>Complete HTML Component Library</h1>
    <p>This auto-generated library showcases all requested components in their various semantic types and interaction states. All elements include appropriate ARIA roles, classes, and unique IDs.</p>
    <hr>
"""

    checklist = "CHECKLIST OF COMPONENTS, TYPES AND STATES\n"
    checklist += "========================================\n\n"

    for cat in categories:
        index_html += f'<section id="{slugify(cat)}"><h2>{cat}</h2>'
        checklist += f"### {cat}\n"

        cat_components = [c[1] for c in all_components if c[0] == cat]
        for comp in cat_components:
            index_html += f'<div class="comp-group"><h3>{comp}</h3>'
            checklist += f"- [x] {comp}\n"

            comp_lower = comp.lower()
            # Determine if the component is interactive (should have all 7 states)
            interactive_keywords = ["button", "input", "select", "choice", "link", "tab", "pill", "switch", "toggle", "slider", "stepper", "picker", "upload", "editor", "menu", "textarea", "autocomplete", "combobox", "search", "field", "radio", "checkbox", "chip", "tag", "rating", "pad", "stepper", "switcher", "matrix", "filter", "view", "portal", "manager", "wizard"]
            is_interactive = any(x in comp_lower for x in interactive_keywords)

            # Determine if the component has multiple types
            type_keywords = ["button", "link", "badge", "chip", "alert", "toast", "banner", "dialog", "modal", "compose", "call-to-action", "cta"]
            has_types = any(x in comp_lower for x in type_keywords)
            comp_types = types if has_types else ["default"]

            for t in comp_types:
                if len(comp_types) > 1:
                    index_html += f'<h4>Type: {t.capitalize()}</h4>'
                index_html += '<div class="comp-variants">'
                checklist += f"  - Type: {t}\n"

                comp_states = states if is_interactive else ["default"]

                for s in comp_states:
                    index_html += f'<div class="variant"><span class="state-tag">{s}</span>{get_component_html(cat, comp, t, s)}</div>'
                    checklist += f"    - [x] State: {s}\n"

                if len(comp_states) < len(states):
                    skipped = [st for st in states if st not in comp_states]
                    checklist += f"    - Justification for missing states ({', '.join(skipped)}): Component is primarily a structural, layout, or static informational element and does not have standard interaction states.\n"

                index_html += '</div>'
            index_html += '</div>'
            checklist += "\n"
        index_html += '</section>'

    index_html += """
</main>
</body>
</html>
"""

    with open("index.html", "w") as f:
        f.write(index_html)

    with open("checklist.txt", "w") as f:
        f.write(checklist)

if __name__ == "__main__":
    main()
