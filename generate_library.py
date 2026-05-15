import os

states = ["default", "hover", "focus", "active", "disabled", "error", "success"]
types = ["primary", "secondary", "tertiary"]

def slugify(text):
    return text.lower().strip().replace(" ", "-").replace("/", "-").replace("&", "and").replace(".", "").replace(":", "")

def gen_nest(level, max_level=4, items=5, tag="ul", item_tag="li", role="list"):
    if level > max_level: return ""
    html = f'<{tag} role="{role}" class="nest-l{level}">'
    for i in range(1, items + 1):
        html += f'<{item_tag} class="item-l{level}">Item {i} (Level {level})'
        html += gen_nest(level + 1, max_level, items, tag, item_tag, role)
        html += f'</{item_tag}>'
    html += f'</{tag}>'
    return html

def get_component_html(category, name, comp_type, state):
    id_name = f"{slugify(name)}-{comp_type}-{state}"
    classes = f"cmp {slugify(name)} type-{comp_type} state-{state}"
    label_text = f"{name} [{comp_type}] ({state})"
    name_lower = name.lower()
    aria_attr = ""
    if state == "disabled": aria_attr += ' aria-disabled="true"'
    if state == "error": aria_attr += ' aria-invalid="true"'

    # Components that support nesting/items
    if any(x in name_lower for x in ["menu", "navigation", "sidebar", "tree", "pills", "tabs", "breadcrumb", "list", "feed", "timeline", "activity", "accordion", "carousel", "slider", "gallery", "table", "grid", "kanban", "board", "dock"]):

        if any(x in name_lower for x in ["table", "grid"]):
            html = f'<table id="{id_name}" class="{classes}" role="grid"><caption>{label_text}</caption>'
            html += '<thead><tr><th>L1 Col</th><th>L2 Col</th><th>L3 Col</th><th>L4 Col</th><th>L5 Col</th></tr></thead><tbody>'
            for i in range(1, 6):
                html += f'<tr><td>Row {i} (L1)</td><td colspan="4">'
                # Nesting inside table cell
                html += f'<table role="grid"><tr><td>SubRow {i}.1 (L2)</td><td colspan="3">'
                html += f'<table role="grid"><tr><td>SubRow {i}.1.1 (L3)</td><td colspan="2">'
                html += f'<table role="grid"><tr><td>SubRow {i}.1.1.1 (L4)</td><td>5 items here: '
                html += ", ".join([f"Item {j}" for j in range(1,6)])
                html += '</td></tr></table></td></tr></table></td></tr></table></td></tr>'
            html += '</tbody></table>'
            return html

        if "accordion" in name_lower:
            html = f'<div id="{id_name}" class="{classes}">'
            for i in range(1, 6):
                html += f'<details class="acc-l1"><summary>Accordion {i} (L1)</summary>'
                for j in range(1, 6):
                    html += f'<details class="acc-l2" style="margin-left:20px;"><summary>Nested {i}.{j} (L2)</summary>'
                    for k in range(1, 6):
                        html += f'<details class="acc-l3" style="margin-left:20px;"><summary>Deep {i}.{j}.{k} (L3)</summary>'
                        html += f'<ul class="acc-l4" style="margin-left:20px;">'
                        for l in range(1, 6): html += f'<li>Leaf {l} (L4)</li>'
                        html += '</ul></details>'
                    html += '</details>'
                html += '</details>'
            html += '</div>'
            return html

        # General list-based nesting
        role = "tree" if "tree" in name_lower else "menu" if "menu" in name_lower else "list"
        html = f'<div id="{id_name}" class="{classes}" role="region" aria-label="{label_text}"><strong>{label_text}</strong>'
        html += gen_nest(1, role=role)
        html += '</div>'
        return html

    # Choice components with nesting
    if any(x in name_lower for x in ["checkbox", "radio", "toggle", "switch", "select", "combobox", "autocomplete"]):
        html = f'<div class="{classes}-group"><strong>{label_text}</strong>'
        for i in range(1, 6):
            iid = f"{id_name}-{i}"
            if "select" in name_lower or "combobox" in name_lower:
                # Select nesting is simulated with optgroups or lists
                html += f'<div class="select-sim">Option {i} (L1)'
            else:
                input_type = "radio" if "radio" in name_lower else "checkbox"
                checked = ' checked' if (i == 1 and state in ["active", "success"]) else ""
                html += f'<div class="choice-wrap"><input type="{input_type}" id="{iid}"{checked}{aria_attr}><label for="{iid}">Choice {i} (L1)</label>'

            # Nesting levels 2-4
            html += f'<div style="margin-left:20px;">'
            for j in range(1, 6):
                html += f'<div>Item {i}.{j} (L2)'
                html += f'<div style="margin-left:20px;">'
                for k in range(1, 6):
                    html += f'<div>Item {i}.{j}.{k} (L3)'
                    html += f'<div style="margin-left:20px;">'
                    for l in range(1, 6): html += f'<div>Leaf {i}.{j}.{k}.{l} (L4)</div>'
                    html += '</div></div>'
                html += '</div></div>'
            html += '</div></div>'
        html += '</div>'
        return html

    # Default simple components
    if "button" in name_lower:
        return f'<button id="{id_name}" class="{classes}" role="button"{aria_attr} {"disabled" if state=="disabled" else ""}>{label_text}</button>'
    if "link" in name_lower:
        return f'<a href="#" id="{id_name}" class="{classes}" role="link"{aria_attr}>{label_text}</a>'
    if any(x in name_lower for x in ["toast", "alert", "banner", "snackbar"]):
        role = "alert" if state == "error" else "status"
        return f'<div id="{id_name}" class="{classes}" role="{role}" aria-live="polite"><strong>{name}:</strong> {label_text}</div>'

    return f'<div id="{id_name}" class="{classes}" role="region"><strong>{label_text}</strong></div>'

def main():
    with open("components.txt", "r") as f:
        lines = [l.strip() for l in f if l.strip()]
    categories_list = [
        "1. UNIVERSAL - Input / Form Components", "1. UNIVERSAL - Navigation Components",
        "1. UNIVERSAL - Feedback / State Components", "1. UNIVERSAL - Data Display",
        "1. UNIVERSAL - Layout Components", "1. UNIVERSAL - Typography & Media",
        "2. SaaS / Dashboard", "2. E-commerce - Product Discovery",
        "2. E-commerce - Purchase Flow", "2. E-commerce - Growth Components",
        "2. Task Management / Productivity", "2. CMS / Blog / Knowledge Base",
        "2. AI / LLM Apps - Core", "2. AI / LLM Apps - Advanced AI UX",
        "2. Social Media / Community", "2. Fintech / Banking", "2. Healthcare",
        "2. Education / LMS", "2. Developer Tools", "2. Analytics / BI",
        "3. WEB-SPECIFIC - Desktop/Web Patterns", "3. WEB-SPECIFIC - Marketing Website Components",
        "4. MOBILE-SPECIFIC - iOS / Android Native Patterns", "4. MOBILE-SPECIFIC - Mobile-first UX",
        "5. TEMATYCZNE / SPECJALISTYCZNE - Enterprise"
    ]
    all_components = []
    current_category = categories_list[0]
    for line in lines:
        if line in categories_list: current_category = line; continue
        all_components.append((current_category, line))

    index_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nested Component Library</title>
    <style>
        body { font-family: system-ui, sans-serif; display: flex; margin: 0; }
        aside { width: 300px; height: 100vh; overflow-y: auto; background: #f8f9fa; border-right: 1px solid #dee2e6; padding: 1rem; position: sticky; top: 0; }
        main { flex: 1; padding: 2rem; overflow-y: auto; height: 100vh; scroll-behavior: smooth; }
        .comp-group { margin-bottom: 3rem; padding: 1rem; border: 1px solid #eee; background: #fafafa; }
        .variant { border: 1px dashed #ccc; padding: 1rem; background: #fff; margin-bottom: 2rem; overflow-x: auto; }
        table { border-collapse: collapse; width: 100%; margin: 5px 0; }
        th, td { border: 1px solid #ddd; padding: 4px; font-size: 0.8rem; }
        summary { cursor: pointer; font-weight: bold; }
        .nest-l1, .nest-l2, .nest-l3, .nest-l4 { list-style: none; padding-left: 20px; border-left: 1px solid #ddd; }
    </style>
</head>
<body><aside><nav><ul>"""
    categories = []
    for c in all_components:
        if c[0] not in categories: categories.append(c[0])
    for cat in categories:
        index_html += f'<li><a href="#{slugify(cat)}">{cat}</a></li>'
    index_html += '</ul></nav></aside><main><h1>Nested Component Library (4 Levels, 5 Items)</h1>'

    checklist = "CHECKLIST OF COMPONENTS, TYPES, STATES, AND NESTING\n====================================================\n\n"

    for cat in categories:
        index_html += f'<section id="{slugify(cat)}"><h2>{cat}</h2>'
        checklist += f"### {cat}\n"
        cat_components = [c[1] for c in all_components if c[0] == cat]
        for comp in cat_components:
            index_html += f'<div class="comp-group"><h3>{comp}</h3>'
            checklist += f"- [x] {comp}\n"
            comp_lower = comp.lower()

            is_nested = any(x in comp_lower for x in ["menu", "navigation", "sidebar", "tree", "pills", "tabs", "breadcrumb", "list", "feed", "timeline", "activity", "accordion", "carousel", "slider", "gallery", "table", "grid", "kanban", "board", "dock", "checkbox", "radio", "toggle", "switch", "select", "combobox", "autocomplete"])
            if is_nested:
                checklist += "    - [x] NESTING: 4 levels deep, 5 items per level implemented.\n"

            comp_types = types if any(x in comp_lower for x in ["button", "link", "badge", "chip", "alert", "toast", "banner", "dialog", "modal", "compose", "call-to-action", "cta"]) else ["default"]
            for t in comp_types:
                index_html += '<div class="comp-variants">'
                comp_states = states if any(x in comp_lower for x in ["button", "input", "select", "choice", "link", "tab", "pill", "switch", "toggle", "slider", "stepper", "picker", "upload", "editor", "menu", "textarea", "autocomplete", "combobox", "search", "field", "radio", "checkbox", "chip", "tag", "rating", "pad", "stepper", "switcher", "matrix", "filter", "view", "portal", "manager", "wizard", "accordion"]) else ["default"]
                for s in comp_states:
                    index_html += f'<div class="variant"><span class="state-tag">{s} (Type: {t})</span>{get_component_html(cat, comp, t, s)}</div>'
                    checklist += f"    - [x] State: {s} (Type: {t})\n"
                index_html += '</div>'
            index_html += '</div>'
        index_html += '</section>'

    index_html += "</main></body></html>"
    with open("index.html", "w") as f: f.write(index_html)
    with open("checklist.txt", "w") as f: f.write(checklist)

if __name__ == "__main__":
    main()
