import os

states = ["default", "hover", "focus", "active", "disabled", "error", "success"]
types = ["primary", "secondary", "tertiary"]

def slugify(text):
    return text.lower().strip().replace(" ", "-").replace("/", "-").replace("&", "and").replace(".", "").replace(":", "")

def get_base_tokens(slug):
    return [
        f"padding: var(--cmp-{slug}-padding);",
        f"margin: var(--cmp-{slug}-margin);",
        f"background: var(--cmp-{slug}-bg);",
        f"color: var(--cmp-{slug}-color);",
        f"border: var(--cmp-{slug}-border);",
        f"border-radius: var(--cmp-{slug}-border-radius);",
        f"font-size: var(--cmp-{slug}-font-size);",
        f"font-weight: var(--cmp-{slug}-font-weight);",
        f"line-height: var(--cmp-{slug}-line-height);",
        f"box-shadow: var(--cmp-{slug}-shadow);",
        f"transition: var(--cmp-{slug}-transition);",
        f"width: var(--cmp-{slug}-width);",
        f"height: var(--cmp-{slug}-height);",
        f"opacity: var(--cmp-{slug}-opacity);",
        f"cursor: var(--cmp-{slug}-cursor);",
        f"outline: var(--cmp-{slug}-outline);",
        f"display: var(--cmp-{slug}-display);",
        f"gap: var(--cmp-{slug}-gap);"
    ]

def get_state_tokens(slug, state):
    return [
        f"background: var(--cmp-{slug}-{state}-bg);",
        f"color: var(--cmp-{slug}-{state}-color);",
        f"border-color: var(--cmp-{slug}-{state}-border-color);",
        f"box-shadow: var(--cmp-{slug}-{state}-shadow);",
        f"opacity: var(--cmp-{slug}-{state}-opacity);",
        f"outline: var(--cmp-{slug}-{state}-outline);"
    ]

def get_type_tokens(slug, t):
    return [
        f"background: var(--cmp-{slug}-{t}-bg);",
        f"color: var(--cmp-{slug}-{t}-color);",
        f"border-color: var(--cmp-{slug}-{t}-border-color);"
    ]

def generate_css_for_components(components, filename):
    css_content = f"/* CSS for {filename} */\n\n"
    # Use a set to avoid duplicate rules if component names repeat
    seen_slugs = set()
    for comp in components:
        slug = slugify(comp)
        if slug in seen_slugs:
            continue
        seen_slugs.add(slug)

        # Base
        css_content += f".cmp.{slug} {{\n  " + "\n  ".join(get_base_tokens(slug)) + "\n}\n\n"

        # States
        for s in states:
            if s == "default": continue
            css_content += f".cmp.{slug}.state-{s} {{\n  " + "\n  ".join(get_state_tokens(slug, s)) + "\n}\n\n"

        # Types
        for t in types:
            css_content += f".cmp.{slug}.type-{t} {{\n  " + "\n  ".join(get_type_tokens(slug, t)) + "\n}\n\n"
            # State-Type combinations
            for s in states:
                if s == "default": continue
                css_content += f".cmp.{slug}.type-{t}.state-{s} {{\n  background: var(--cmp-{slug}-{t}-{s}-bg);\n  color: var(--cmp-{slug}-{t}-{s}-color);\n}}\n\n"

    with open(filename, "w") as f:
        f.write(css_content)

def main():
    with open("components.txt", "r") as f:
        lines = [l.strip() for l in f if l.strip()]

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

    file_to_components = {}

    current_file = None

    for line in lines:
        matched_file = None
        for cat_prefix, filename in category_files_map.items():
            if line.startswith(cat_prefix):
                matched_file = filename
                break

        if matched_file:
            current_file = matched_file
            if current_file not in file_to_components:
                file_to_components[current_file] = []
        elif current_file and not any(line.startswith(str(i)+".") for i in range(1,10)):
            # It's a component
            file_to_components[current_file].append(line)

    for filename, components in file_to_components.items():
        generate_css_for_components(components, filename)

if __name__ == "__main__":
    main()
