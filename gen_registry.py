import json
import re

def slugify(text):
    return text.lower().strip().replace(" ", "-").replace("/", "-").replace("&", "and").replace(".", "").replace(":", "").replace("---", "-")

def get_blueprint(name):
    n = name.lower()
    # 1. Input / Form Refinement
    if "button" in n: return "atoms.button"
    if "icon button" in n: return "atoms.button"
    if "search input" in n or "search-input" in n: return "molecules.search_field"
    if "text input" in n: return "molecules.form_field"
    if "textarea" in n: return "molecules.form_field"
    if "select" in n or "combobox" in n or "autocomplete" in n: return "molecules.form_field"
    if "checkbox" in n: return "molecules.choice_field"
    if "radio" in n: return "molecules.choice_field"
    if "toggle" in n or "switch" in n: return "molecules.choice_field"
    if "slider" in n or "range" in n: return "atoms.range_raw"
    if "rating" in n: return "molecules.rating_field"
    if "otp" in n: return "molecules.form_field"
    if "date picker" in n or "time picker" in n or "color picker" in n: return "molecules.form_field"
    if "upload" in n: return "molecules.form_field"
    if "editor" in n: return "molecules.form_field"
    if "signature" in n: return "molecules.state_block"
    if "tag input" in n: return "molecules.form_field"
    if "stepper" in n: return "molecules.form_field"

    # Feedback / State
    if "toast" in n or "snackbar" in n: return "molecules.toast"
    if "alert" in n or "banner" in n: return "molecules.alert"
    if "dialog" in n or "modal" in n: return "molecules.modal"
    if "drawer" in n or "sheet" in n: return "molecules.modal"
    if "tooltip" in n or "popover" in n: return "atoms.span"
    if "progress" in n: return "atoms.progress"
    if "skeleton" in n: return "atoms.skeleton"
    if "spinner" in n: return "atoms.spinner"
    if any(x in n for x in ["empty", "error", "success", "maintenance", "offline", "denied", "loading-overlay"]):
        return "molecules.state_block"

    # Data Display
    if "card" in n: return "molecules.card"
    if "table" in n or "grid" in n: return "molecules.table"
    if "list" in n: return "molecules.list"
    if "accordion" in n: return "molecules.accordion"
    if "timeline" in n or "activity feed" in n: return "molecules.timeline"
    if "statistic" in n or "kpi" in n: return "molecules.statistic"
    if "avatar" in n: return "atoms.avatar"
    if "badge" in n: return "atoms.badge"
    if "chip" in n: return "atoms.chip"
    if "tag" in n: return "atoms.tag"
    if "code block" in n: return "atoms.code"

    # Defaults
    if "heading" in n: return "atoms.heading"
    if "paragraph" in n: return "atoms.paragraph"
    return "atoms.span"

def main():
    with open("components.txt", "r") as f:
        lines = [l.strip() for l in f if l.strip()]

    registry = []
    current_category = "Unknown"
    for line in lines:
        if re.match(r'^\d+\.', line):
            current_category = line
            continue
        blueprint = get_blueprint(line)
        profile = "atomic" if "atoms" in blueprint else "molecule"
        registry.append({
            "id": slugify(line),
            "name": line,
            "category": current_category,
            "blueprint": blueprint,
            "profile": profile,
            "states": ["default", "hover", "focus", "active", "disabled", "error", "success"],
            "types": ["primary", "secondary", "tertiary"] if any(x in line.lower() for x in ["button", "badge", "chip", "alert", "tag", "toast", "banner"]) else ["default"]
        })
    with open("registry.json", "w", encoding="utf-8") as f:
        json.dump(registry, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    main()
