import json
import re

def slugify(text):
    return text.lower().strip().replace(" ", "-").replace("/", "-").replace("&", "and").replace(".", "").replace(":", "").replace("---", "-")

def get_profile(name):
    n = name.lower()
    if any(x in n for x in ["button", "link", "icon", "badge", "chip", "tag", "avatar", "spinner", "loader", "illustration", "image", "video", "audio"]):
        return "atomic"
    if any(x in n for x in ["heading", "paragraph", "caption", "blockquote", "code", "text input", "textarea", "otp", "search", "rating"]):
        return "text"
    if any(x in n for x in ["select", "combobox", "autocomplete", "checkbox", "radio", "toggle", "switch", "stepper", "picker", "upload", "accordion", "tabs", "pills", "pagination"]):
        return "group"
    if any(x in n for x in ["navbar", "sidebar", "topbar", "bottom navigation", "breadcrumbs", "mega menu", "hamburger", "context menu", "command palette", "tree", "dock", "anchor", "wizard", "step", "activity", "timeline", "carousel", "gallery", "kanban", "board", "calendar", "feed"]):
        return "hierarchical"
    if any(x in n for x in ["card", "table", "data grid", "list", "chart", "heatmap", "json viewer", "log viewer", "terminal"]):
        return "data"
    if any(x in n for x in ["container", "section", "grid", "stack", "split", "panel", "masonry", "bento", "layout"]):
        return "layout"
    if any(x in n for x in ["toast", "snackbar", "alert", "banner", "dialog", "modal", "drawer", "sheet", "tooltip", "popover", "overlay"]):
        return "feedback"
    return "atomic"

def get_content_type(name, profile):
    n = name.lower()
    if any(x in n for x in ["icon", "emoji", "tiny"]): return "tiny"
    if profile == "atomic" or any(x in n for x in ["button", "label", "chip", "badge"]): return "short"
    if any(x in n for x in ["heading", "title", "caption"]): return "medium"
    if any(x in n for x in ["article", "blog", "post", "long text", "content blocks"]): return "xl"
    if profile == "text" or profile == "feedback" or profile == "layout": return "long"
    return "medium"

def get_states(name, profile):
    n = name.lower()
    if profile in ["atomic", "text", "group", "hierarchical"] or any(x in n for x in ["card", "cell", "row", "item"]):
        return ["default", "hover", "focus", "active", "disabled", "error", "success"]
    return ["default"]

def get_types(name, profile):
    n = name.lower()
    if any(x in n for x in ["button", "link", "badge", "chip", "alert", "toast", "banner", "dialog", "modal", "cta", "call-to-action"]):
        return ["primary", "secondary", "tertiary"]
    return ["default"]

def main():
    with open("components.txt", "r") as f:
        lines = [l.strip() for l in f if l.strip()]

    registry = []
    current_category = "Unknown"

    for line in lines:
        if re.match(r'^\d+\.', line):
            current_category = line
            continue

        profile = get_profile(line)
        registry.append({
            "id": slugify(line),
            "name": line,
            "category": current_category,
            "profile": profile,
            "content_type": get_content_type(line, profile),
            "states": get_states(line, profile),
            "types": get_types(line, profile)
        })

    with open("registry.json", "w", encoding="utf-8") as f:
        json.dump(registry, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    main()
