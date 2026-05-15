import json
import os

def slugify(text):
    return text.lower().strip().replace(" ", "-").replace("/", "-").replace("&", "and").replace(".", "").replace(":", "")

def generate_joy_content(source_name, theme):
    content = {
        "metadata": {
            "name": source_name,
            "theme": theme
        },
        "general": {
            "primary": "Główny Kapitan",
            "secondary": "Zastępca Szeryfa",
            "tertiary": "Trzeci Sort Radości",
            "default": "Standardowy Uśmiech",
            "hover": "Miziaj mnie więcej!",
            "focus": "Hipnoza Trwa...",
            "active": "AŁA! Nie tak mocno!",
            "disabled": "Chrapie... (Zzz)",
            "error": "Wybuchło, ale kolorowo!",
            "success": "Zwycięstwo! Pizza dla wszystkich!"
        },
        "nesting": {
            "level1": "Pierwsze Piętro Euforii",
            "level2": "Drugie Piętro Chichotu",
            "level3": "Trzecie Piętro Absurdu",
            "level4": "Piwnica z Jednorożcami"
        },
        "components": {},
        "default_text": "To jest bardzo radosny komponent, który cieszy się, że go widzisz! ✨"
    }

    # Custom theme adjustments
    if theme == "space":
        content["metadata"]["name"] = "Galaktyczny Heheszek"
        content["general"]["error"] = "Czarna dziura pożarła Twoje dane, ale zostawiła brokat!"
        content["nesting"]["level1"] = "Orbita Chwały"
        content["nesting"]["level4"] = "Czeluście Międzygalaktycznego Żartu"
    elif theme == "kitchen":
        content["metadata"]["name"] = "Kuchenne Rewolucje Śmiechu"
        content["general"]["success"] = "Upieczone idealnie! Mniam!"
        content["nesting"]["level1"] = "Dno Patelni"
        content["nesting"]["level4"] = "Kraina Przypalonego Karmelu"

    # Read components to ensure we have unique text for EACH
    if os.path.exists("components.txt"):
        with open("components.txt", "r") as f:
            lines = [l.strip() for l in f if l.strip()]

            for line in lines:
                if any(line.startswith(str(i)+".") for i in range(1,10)):
                    continue # Skip category headers

                # Generate unique content based on name and theme
                if theme == "space":
                    content["components"][line] = f"Gwiezdny {line} gotowy do startu w kosmos śmiechu!"
                elif theme == "kitchen":
                    content["components"][line] = f"Pyszny {line} prosto z radosnego piekarnika!"
                else:
                    content["components"][line] = f"Radosny {line} wita Cię z otwartymi ramionami!"

    return content

with open('content_joy_a.json', 'w', encoding='utf-8') as f:
    json.dump(generate_joy_content("Kosmiczna Przygoda", "space"), f, ensure_ascii=False, indent=2)

with open('content_joy_b.json', 'w', encoding='utf-8') as f:
    json.dump(generate_joy_content("Magiczna Kuchnia", "kitchen"), f, ensure_ascii=False, indent=2)
