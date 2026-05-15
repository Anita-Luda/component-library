import json
import re

def slugify(text):
    return text.lower().strip().replace(" ", "-").replace("/", "-").replace("&", "and").replace(".", "").replace(":", "").replace("---", "-")

def get_blueprint(name):
    n = name.lower()

    # 1. Typography & Media Refinement
    if "heading" in n: return "atoms.heading"
    if "paragraph" in n: return "atoms.paragraph"
    if "blockquote" in n: return "atoms.blockquote"
    if "code inline" in n: return "atoms.code"
    if "image" in n: return "atoms.image"
    if "video" in n: return "molecules.media_block" # Refined to molecule
    if "audio" in n: return "molecules.media_block" # Refined to molecule
    if "icon" in n: return "atoms.icon"
    if "illustration" in n: return "atoms.image"
    if "lottie" in n: return "atoms.icon"
    if "caption" in n: return "atoms.span"

    # Navigation
    if "navbar" in n or "topbar" in n: return "organisms.navbar"
    if "sidebar" in n or "dock" in n: return "organisms.dashboard_layout"
    if "mega menu" in n: return "organisms.mega_menu"
    if "breadcrumbs" in n: return "molecules.breadcrumb"
    if "tabs" in n or "pills" in n: return "molecules.tabs"
    if "pagination" in n: return "molecules.pagination"
    if "wizard" in n or "step" in n: return "organisms.centered_auth"
    if "tree" in n: return "molecules.list"
    if any(x in n for x in ["nav", "link", "anchor"]): return "atoms.nav_link"

    # Layout
    if "sidebar layout" in n or "dashboard layout" in n: return "organisms.dashboard_layout"
    if "centered auth" in n: return "organisms.centered_auth"
    if "container" in n or "section" in n: return "molecules.container"
    if "grid" in n or "bento" in n or "masonry" in n: return "molecules.grid_box"
    if "stack" in n: return "molecules.stack_box"
    if "split" in n or "resizable" in n: return "molecules.split_pane"
    if "divider" in n or "spacer" in n: return "atoms.divider"

    # Input / Form
    if "button" in n or "icon button" in n: return "atoms.button"
    if "search input" in n: return "molecules.search_field"
    if "text input" in n or "textarea" in n or "select" in n or "combobox" in n: return "molecules.form_field"
    if "checkbox" in n or "radio" in n or "toggle" in n: return "molecules.choice_field"
    if "slider" in n or "range" in n: return "atoms.range_raw"

    # Feedback / State
    if "toast" in n or "snackbar" in n: return "molecules.toast"
    if "alert" in n or "banner" in n: return "molecules.alert"
    if "modal" in n or "dialog" in n or "drawer" in n: return "molecules.modal"
    if "progress" in n: return "atoms.progress"
    if "spinner" in n: return "atoms.spinner"
    if any(x in n for x in ["empty", "error", "success", "maintenance", "denied"]): return "molecules.state_block"

    # Data Display
    if "card" in n: return "molecules.card"
    if "table" in n or "grid" in n: return "molecules.table"
    if "list" in n: return "molecules.list"
    if "accordion" in n: return "molecules.accordion"
    if "timeline" in n or "activity" in n: return "molecules.timeline"
    if "statistic" in n or "kpi" in n: return "molecules.statistic"
    if "avatar" in n: return "atoms.avatar"
    if "badge" in n: return "atoms.badge"
    if "chip" in n: return "atoms.chip"
    if "tag" in n: return "atoms.tag"

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
        profile = blueprint.split('.')[0][:-1] # atom/molecule/organism
        registry.append({
            "id": slugify(line),
            "name": line,
            "category": current_category,
            "blueprint": blueprint,
            "profile": profile,
            "states": ["default", "hover", "focus", "active", "disabled", "error", "success"],
            "types": ["primary", "secondary", "tertiary"] if any(x in line.lower() for x in ["button", "badge", "chip", "alert", "tag", "toast", "banner", "nav"]) else ["default"]
        })
    with open("registry.json", "w", encoding="utf-8") as f:
        json.dump(registry, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    main()
