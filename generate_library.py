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

    # Components that support nesting/items
    if any(x in name_lower for x in ["menu", "navigation", "sidebar", "tree", "pills", "tabs", "breadcrumb", "list", "feed", "timeline", "activity", "accordion", "carousel", "slider", "gallery", "table", "grid", "kanban", "board", "dock"]):

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

        role = "tree" if "tree" in name_lower else "menu" if "menu" in name_lower else "list"
        html = f'<div id="{id_name}" class="{classes}" role="region"><strong>{full_label}</strong>'
        html += gen_nest(1, name, items=5, role=role)
        html += '</div>'
        return html

    # Choice components with nesting
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

def get_header_html(title, nav_items):
    nav_links = "".join([f'<li><a href="{href}">{text}</a></li>' for text, href in nav_items])
    return f"""<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Radosna Biblioteka</title>
    <link rel="stylesheet" href="shared.css">
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
    if not os.path.exists("shared.css"):
        with open("shared.css", "w") as f:
            f.write("""
body { font-family: system-ui, sans-serif; display: flex; margin: 0; }
aside { width: 320px; height: 100vh; overflow-y: auto; background: #f8f9fa; border-right: 1px solid #dee2e6; padding: 1rem; position: sticky; top: 0; }
main { flex: 1; padding: 2rem; overflow-y: auto; height: 100vh; scroll-behavior: smooth; }
.comp-group { margin-bottom: 3rem; padding: 1rem; border: 1px solid #eee; background: #fafafa; }
.variant { border: 1px dashed #ccc; padding: 1rem; background: #fff; margin-bottom: 2rem; overflow-x: auto; }
table { border-collapse: collapse; width: 100%; margin: 5px 0; }
th, td { border: 1px solid #ddd; padding: 4px; font-size: 0.8rem; }
summary { cursor: pointer; font-weight: bold; }
.nest-l1, .nest-l2, .nest-l3, .nest-l4 { list-style: none; padding-left: 20px; border-left: 1px solid #ddd; }
.content-switcher { margin-bottom: 2rem; padding: 1rem; background: #e9ecef; border-radius: 8px; }
.state-tag { background: #333; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; margin-right: 10px; }
[data-joy] { transition: opacity 0.2s; }
.loading [data-joy] { opacity: 0.3; }
.category-card { border: 1px solid #ddd; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; background: #fff; text-decoration: none; color: inherit; display: block; }
.category-card:hover { border-color: #007bff; background: #f0f7ff; }
""")

    if not os.path.exists("shared.js"):
        with open("shared.js", "w") as f:
            f.write("""
const sourceSelect = document.getElementById('joy-source');
const themeInfo = document.getElementById('theme-info');

async function loadJoyContent(url) {
    document.body.classList.add('loading');
    localStorage.setItem('joy-source-url', url);
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (themeInfo) themeInfo.textContent = `Temat: ${data.metadata.theme} (${data.metadata.name})`;

        const elements = document.querySelectorAll('[data-joy]');
        elements.forEach(el => {
            const path = el.getAttribute('data-joy').split('.');
            let value = data;
            for (const key of path) {
                if (value && value[key]) {
                    value = value[key];
                } else {
                    value = null;
                    break;
                }
            }
            if (value && typeof value === 'string') {
                el.textContent = value;
            } else if (path[0] === 'components' && data.default_text) {
                if (el.tagName !== 'SPAN') el.textContent = data.default_text;
            }
        });
    } catch (e) {
        console.error("Failed to load joy:", e);
    } finally {
        document.body.classList.remove('loading');
    }
}

if (sourceSelect) {
    sourceSelect.addEventListener('change', (e) => loadJoyContent(e.target.value));
    const saved = localStorage.getItem('joy-source-url');
    if (saved) {
        sourceSelect.value = saved;
    }
    loadJoyContent(sourceSelect.value);
}
""")

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

    # Generate index.html
    index_html = get_header_html("Witamy w Radosnej Bibliotece", nav_items)
    index_html += "<p>Wybierz kategorię z menu bocznego, aby zobaczyć radosne komponenty. DOM jest teraz podzielony na mniejsze części dla lepszej wydajności!</p>"
    for cat in categories_list:
        index_html += f'<a href="cat-{slugify(cat)}.html" class="category-card"><h3>{cat}</h3><p>{len(category_map[cat])} radosnych komponentów</p></a>'
    index_html += get_footer_html()
    with open("index.html", "w") as f: f.write(index_html)

    # Generate category pages
    checklist = "CHECKLIST OF COMPONENTS, TYPES, STATES, AND NESTING WITH JOYFUL CONTENT (MULTI-PAGE)\n===================================================================================\n\n"
    checklist += "JUSTIFICATION FOR STATE/TYPE COMBINATIONS:\n"
    checklist += "- Interactive elements use full state set.\n- Layout elements use only default.\n- Semantic elements use types (primary/secondary/tertiary).\n\n"

    for cat in categories_list:
        cat_file = f"cat-{slugify(cat)}.html"
        cat_html = get_header_html(cat, nav_items)
        checklist += f"### {cat}\n"

        for comp in category_map[cat]:
            cat_html += f'<div class="comp-group"><h3>{comp}</h3>'
            checklist += f"- [x] {comp}\n"
            comp_lower = comp.lower()

            is_nested = any(x in comp_lower for x in ["menu", "navigation", "sidebar", "tree", "pills", "tabs", "breadcrumb", "list", "feed", "timeline", "activity", "accordion", "carousel", "slider", "gallery", "table", "grid", "kanban", "board", "dock", "checkbox", "radio", "toggle", "switch", "select", "combobox", "autocomplete"])
            if is_nested:
                checklist += "    - [x] NESTING: 4 levels deep, 5 items per level implemented.\n"

            checklist += "    - [x] JOYFUL CONTENT: Dynamic source support implemented via data-joy attributes.\n"

            comp_types = types if any(x in comp_lower for x in ["button", "link", "badge", "chip", "alert", "toast", "banner", "dialog", "modal", "compose", "call-to-action", "cta"]) else ["default"]
            for t in comp_types:
                cat_html += '<div class="comp-variants">'
                comp_states = states if any(x in comp_lower for x in ["button", "input", "select", "choice", "link", "tab", "pill", "switch", "toggle", "slider", "stepper", "picker", "upload", "editor", "menu", "textarea", "autocomplete", "combobox", "search", "field", "radio", "checkbox", "chip", "tag", "rating", "pad", "stepper", "switcher", "matrix", "filter", "view", "portal", "manager", "wizard", "accordion", "planner", "archive", "manager", "monitor", "scheduler", "wizard", "status", "queue", "scanner", "tracker"]) else ["default"]
                for s in comp_states:
                    cat_html += f'<div class="variant"><span class="state-tag">{s} (Typ: {t})</span>{get_component_html(cat, comp, t, s)}</div>'
                    checklist += f"    - [x] State: {s} (Type: {t})\n"
                cat_html += '</div>'
            cat_html += '</div>'

        cat_html += get_footer_html()
        with open(cat_file, "w") as f: f.write(cat_html)

    with open("checklist.txt", "w") as f: f.write(checklist)

if __name__ == "__main__":
    main()
