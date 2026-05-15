import json
import os

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
        "components": {
            "Button": "Naciśnij i zostań milionerem (emocjonalnym)",
            "Icon button": "🔘✨",
            "Text input": "Wpisz tutaj swoje najskrytsze marzenie o parówkach",
            "Textarea": "Opisz jak bardzo lubisz drapanie za uchem...",
            "Select": "Wybierz swój przeznaczenie (albo smaczka)",
            "Checkbox": "Zgadzam się na darmowe łaskotki",
            "Radio": "Wybieram: Ciasto czy Śmierć? (Wybierz ciasto)",
            "Toggle / switch": "Włącz radosne wibracje",
            "Slider": "Poziom Szczęścia (Maksimum!)",
            "Date picker": "Kiedy idziemy na lody?",
            "Search input": "Szukaj zaginionego skarbu (albo skarpetki)",
            "Paragraph": "Wesołe miasteczko w Twoim kodzie. Każdy div to karuzela, każdy span to wata cukrowa.",
            "Heading": "Królestwo Radości i Porządku",
            "Table": "Tabela Prawd Dziwnych i Zabawnych",
            "Accordion": "Rozwiń, aby zobaczyć magię!",
            "Alert": "Uwaga! Nadchodzi fala pozytywnej energii!",
            "Modal": "Niespodzianka! Ktoś Cię lubi!",
            "Card": "Karta Członkowska Klubu Optymistów",
            "Sidebar": "Pasek Boczny Pełen Przygód",
            "Navbar": "Menu Gwiezdnej Floty Radości"
        },
        "default_text": "To jest bardzo radosny komponent, który cieszy się, że go widzisz! ✨"
    }

    if theme == "space":
        content["metadata"]["name"] = "Galaktyczny Heheszek"
        content["general"]["error"] = "Czarna dziura pożarła Twoje dane, ale zostawiła brokat!"
        content["components"]["Button"] = "Odpal Hipernapęd Śmiechu!"
        content["nesting"]["level1"] = "Orbita Chwały"
        content["nesting"]["level4"] = "Czeluście Międzygalaktycznego Żartu"
    elif theme == "kitchen":
        content["metadata"]["name"] = "Kuchenne Rewolucje Śmiechu"
        content["general"]["success"] = "Upieczone idealnie! Mniam!"
        content["components"]["Button"] = "Wrzuć do Gara!"
        content["nesting"]["level1"] = "Dno Patelni"
        content["nesting"]["level4"] = "Kraina Przypalonego Karmelu"

    return content

with open('content_joy_a.json', 'w', encoding='utf-8') as f:
    json.dump(generate_joy_content("Kosmiczna Przygoda", "space"), f, ensure_ascii=False, indent=2)

with open('content_joy_b.json', 'w', encoding='utf-8') as f:
    json.dump(generate_joy_content("Magiczna Kuchnia", "kitchen"), f, ensure_ascii=False, indent=2)
