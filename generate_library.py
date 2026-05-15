import os
import json

states = ["default", "hover", "focus", "active", "disabled", "error", "success"]
types = ["primary", "secondary", "tertiary"]

def slugify(text):
    return text.lower().strip().replace(" ", "-").replace("/", "-").replace("&", "and").replace(".", "").replace(":", "")

def gen_nest(level, name, max_level=4, items=5, tag="ul", item_tag="li", role="list"):
    if level > max_level: return ""
    html = f'<{tag} role="{role}" class="nest-l{level}">'
    for i in range(1, items + 1):
        html += f'<{item_tag} class="item-l{level}"><span data-joy="nesting.level{level}">Poziom {level}</span> {i}'
        html += gen_nest(level + 1, name, max_level, items, tag, item_tag, role)
        html += f'</{item_tag}>'
    html += f'</{tag}>'
    return html

def get_component_html(category, name, comp_type, state):
    id_name = f"{slugify(name)}-{comp_type}-{state}"
    classes = f"cmp {slugify(name)} type-{comp_type} state-{state}"

    label_text_base = f'<span data-joy="components.{name}">{name}</span>'
    type_state_info = f' [<span data-joy="general.{comp_type}">{comp_type}</span>] (<span data-joy="general.{state}">{state}</span>)'
    full_label = f"{label_text_base}{type_state_info}"

    name_lower = name.lower()
    aria_attr = ""
    if state == "disabled": aria_attr += ' aria-disabled="true"'
    if state == "error": aria_attr += ' aria-invalid="true"'

    if any(x in name_lower for x in ["table", "grid"]):
        html = f'<table id="{id_name}" class="{classes}" role="grid"><caption>{full_label}</caption>'
        html += '<thead><tr><th>L1 Col</th><th>L2 Col</th><th>L3 Col</th><th>L4 Col</th><th>L5 Col</th></tr></thead><tbody>'
        for i in range(1, 6):
            html += f'<tr><td><span data-joy="nesting.level1">Row</span> {i}</td><td colspan="4">'
            html += f'<table role="grid"><tr><td><span data-joy="nesting.level2">SubRow</span> {i}.1</td><td colspan="3">'
            html += f'<table role="grid"><tr><td><span data-joy="nesting.level3">SubRow</span> {i}.1.1</td><td colspan="2">'
            html += f'<table role="grid"><tr><td><span data-joy="nesting.level4">SubRow</span> {i}.1.1.1</td><td>5 items: '
            html += ", ".join([f"Item {j}" for j in range(1,6)])
            html += '</td></tr></table></td></tr></table></td></tr></table></td></tr>'
        html += '</tbody></table>'
        return html

    if "accordion" in name_lower:
        html = f'<div id="{id_name}" class="{classes}">'
        for i in range(1, 6):
            html += f'<details class="acc-l1"><summary><span data-joy="components.{name}">{name}</span> {i} (L1)</summary>'
            for j in range(1, 6):
                html += f'<details class="acc-l2" style="margin-left:20px;"><summary><span data-joy="nesting.level2">Nested</span> {i}.{j}</summary>'
                for k in range(1, 6):
                    html += f'<details class="acc-l3" style="margin-left:20px;"><summary><span data-joy="nesting.level3">Deep</span> {i}.{j}.{k}</summary>'
                    html += f'<ul class="acc-l4" style="margin-left:20px;">'
                    for l in range(1, 6): html += f'<li><span data-joy="nesting.level4">Leaf</span> {l}</li>'
                    html += '</ul></details>'
                html += '</details>'
            html += '</details>'
        html += '</div>'
        return html

    if any(x in name_lower for x in ["menu", "navigation", "sidebar", "tree", "pills", "tabs", "breadcrumb", "list", "feed", "timeline", "activity", "carousel", "slider", "gallery", "kanban", "board", "dock"]):
        role = "tree" if "tree" in name_lower else "menu" if "menu" in name_lower else "list"
        html = f'<div id="{id_name}" class="{classes}" role="region"><strong>{full_label}</strong>'
        html += gen_nest(1, name, items=5, role=role)
        html += '</div>'
        return html

    if any(x in name_lower for x in ["checkbox", "radio", "toggle", "switch", "select", "combobox", "autocomplete"]):
        html = f'<div class="{classes}-group"><strong>{full_label}</strong>'
        for i in range(1, 6):
            iid = f"{id_name}-{i}"
            if "select" in name_lower or "combobox" in name_lower:
                html += f'<div class="select-sim"><span data-joy="nesting.level1">Option</span> {i}'
            else:
                input_type = "radio" if "radio" in name_lower else "checkbox"
                checked = ' checked' if (i == 1 and state in ["active", "success"]) else ""
                html += f'<div class="choice-wrap"><input type="{input_type}" id="{iid}"{checked}{aria_attr}><label for="{iid}"><span data-joy="nesting.level1">Choice</span> {i}</label>'

            html += f'<div style="margin-left:20px;">'
            for j in range(1, 6):
                html += f'<div><span data-joy="nesting.level2">Item</span> {i}.{j}'
                html += f'<div style="margin-left:20px;">'
                for k in range(1, 6):
                    html += f'<div><span data-joy="nesting.level3">Item</span> {i}.{j}.{k}'
                    html += f'<div style="margin-left:20px;">'
                    for l in range(1, 6): html += f'<div><span data-joy="nesting.level4">Leaf</span> {i}.{j}.{k}.{l}</div>'
                    html += '</div></div>'
                html += '</div></div>'
            html += '</div></div>'
        html += '</div>'
        return html

    if "button" in name_lower:
        return f'<button id="{id_name}" class="{classes}" role="button"{aria_attr} {"disabled" if state=="disabled" else ""}>{full_label}</button>'
    if "link" in name_lower:
        return f'<a href="#" id="{id_name}" class="{classes}" role="link"{aria_attr}>{full_label}</a>'
    if any(x in name_lower for x in ["toast", "alert", "banner", "snackbar"]):
        role = "alert" if state == "error" else "status"
        return f'<div id="{id_name}" class="{classes}" role="{role}" aria-live="polite"><strong><span data-joy="components.{name}">{name}</span>:</strong> {full_label}</div>'
    if "paragraph" in name_lower:
        return f'<p id="{id_name}" class="{classes}" data-joy="components.Paragraph">Baaardzo długi i radosny tekst...</p>'
    if "heading" in name_lower:
        return f'<h1 id="{id_name}" class="{classes}" data-joy="components.Heading">Wielki Radosny Nagłówek</h1>'

    return f'<div id="{id_name}" class="{classes}" role="region"><strong>{full_label}</strong> <span data-joy="default_text">...</span></div>'

def get_header_html(title, nav_items, extra_css=None):
    nav_links = "".join([f'<li><a href="{href}">{text}</a></li>' for text, href in nav_items])
    css_links = f'<link rel="stylesheet" href="admin-panel.css">'
    if extra_css:
        for css in extra_css:
            css_links += f'\n    <link rel="stylesheet" href="{css}">'

    return f"""<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Radosna Biblioteka</title>
    {css_links}
</head>
<body>
<aside>
    <div class="content-switcher">
        <label for="joy-source"><strong>Źródło Radości:</strong></label>
        <select id="joy-source">
            <option value="content_joy_a.json">Kosmiczna Przygoda (A)</option>
            <option value="content_joy_b.json">Magiczna Kuchnia (B)</option>
        </select>
        <p id="theme-info" style="font-size: 0.8rem; margin-top: 10px; color: #666;"></p>
    </div>
    <nav>
        <strong>Kategorie:</strong>
        <ul>
            <li><a href="index.html">🏠 Strona Główna</a></li>
            {nav_links}
        </ul>
    </nav>
</aside>
<main>
    <h1>{title}</h1>
"""

def get_footer_html():
    return """
</main>
<script src="shared.js"></script>
</body></html>"""

def main():
    with open("components.txt", "r") as f:
        lines = [l.strip() for l in f if l.strip()]

    categories_list = []
    category_map = {}
    current_category = None

    for line in lines:
        if any(line.startswith(f"{i}. ") for i in range(1, 10)):
            current_category = line
            categories_list.append(current_category)
            category_map[current_category] = []
        elif current_category:
            category_map[current_category].append(line)

    nav_items = [(cat, f"cat-{slugify(cat)}.html") for cat in categories_list]

    category_files_map = {
        "1. UNIVERSAL": "universal.css",
        "2. SaaS / Dashboard": "saas.css",
        "2. E-commerce": "ecommerce.css",
        "2. Task Management": "productivity.css",
        "2. CMS": "cms.css",
        "2. AI / LLM Apps": "ai.css",
        "2. Social Media": "social.css",
        "2. Fintech": "fintech.css",
        "2. Healthcare": "healthcare.css",
        "2. Education": "education.css",
        "2. Developer Tools": "dev-tools.css",
        "2. Analytics": "analytics.css",
        "3. WEB-SPECIFIC": "web-specific.css",
        "4. MOBILE-SPECIFIC": "mobile-specific.css",
        "5. TEMATYCZNE": "enterprise.css"
    }

    # Generate index.html
    index_html = get_header_html("Witamy w Radosnej Biblioteka", nav_items)
    index_html += "<p>Wybierz kategorię z menu bocznego, aby zobaczyć radosne komponenty.</p>"
    for cat in categories_list:
        index_html += f'<a href="cat-{slugify(cat)}.html" class="category-card"><h3>{cat}</h3><p>{len(category_map[cat])} radosnych komponentów</p></a>'
    index_html += get_footer_html()
    with open("index.html", "w") as f: f.write(index_html)

    # Generate category pages
    for cat in categories_list:
        cat_file = f"cat-{slugify(cat)}.html"

        extra_css = ["universal.css"]
        for prefix, css in category_files_map.items():
            if cat.startswith(prefix):
                if css not in extra_css: extra_css.append(css)

        cat_html = get_header_html(cat, nav_items, extra_css=extra_css)

        for comp in category_map[cat]:
            cat_html += f'<div class="comp-group"><h3>{comp}</h3>'
            comp_lower = comp.lower()
            comp_types = types if any(x in comp_lower for x in ["button", "link", "badge", "chip", "alert", "toast", "banner", "dialog", "modal", "compose", "call-to-action", "cta"]) else ["default"]
            for t in comp_types:
                cat_html += '<div class="comp-variants">'
                comp_states = states if any(x in comp_lower for x in ["button", "input", "select", "choice", "link", "tab", "pill", "switch", "toggle", "slider", "stepper", "picker", "upload", "editor", "menu", "textarea", "autocomplete", "combobox", "search", "field", "radio", "checkbox", "chip", "tag", "rating", "pad", "stepper", "switcher", "matrix", "filter", "view", "portal", "manager", "wizard", "accordion", "planner", "archive", "manager", "monitor", "scheduler", "wizard", "status", "queue", "scanner", "tracker"]) else ["default"]
                for s in comp_states:
                    cat_html += f'<div class="variant"><span class="state-tag">{s} (Typ: {t})</span>{get_component_html(cat, comp, t, s)}</div>'
                cat_html += '</div>'
            cat_html += '</div>'

        cat_html += get_footer_html()
        with open(cat_file, "w") as f: f.write(cat_html)

if __name__ == "__main__":
    main()
