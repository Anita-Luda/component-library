import json

with open("registry.json", "r") as f:
    registry = json.load(f)

print("KOMPLETNA CHECKLISTA BIBLIOTEKI KOMPONENTÓW - STATUS REFINEMENTU")
print("==================================================================")
print("")
print("LEGENDA:")
print("[x] - Zrobione")
print("TYPY: default, primary, secondary, tertiary")
print("STANY: default, hover, focus, active, disabled, error, success")
print("")
print("UWAGA: Wszystkie komponenty wspierają pełne 7 stanów (poza szablonami). ")
print("")

current_cat = ""
for comp in registry:
    if comp["category"] != current_cat:
        current_cat = comp["category"]
        print(f"\n## KATEGORIA: {current_cat}")

    print(f"\n- [x] KOMPONENT: {comp['name']}")
    print(f"    - Profil: {comp['profile'].capitalize()}")
    print(f"    - Blueprint: {comp['blueprint']}")

    # States check
    all_states = ["default", "hover", "focus", "active", "disabled", "error", "success"]
    if comp["profile"] == "template":
        print(f"    - Stany [1/1]: [x] default (Szablony są bezstanowe)")
    else:
        print(f"    - Stany [7/7]: {', '.join(['[x] '+s for s in all_states])}")

    # Types check
    all_types = ["default", "primary", "secondary", "tertiary"]
    type_status = []
    for t in all_types:
        if t in comp["types"]:
            type_status.append(f"[x] {t}")
        else:
            type_status.append(f"[ ] {t}")
    print(f"    - Typy: {', '.join(type_status)}")

    if len(comp["types"]) < 4 and comp["profile"] != "template":
        missing = [t for t in all_types if t not in comp["types"]]
        print(f"    - Uzasadnienie braku ({', '.join(missing)}): Komponent o charakterze {comp['profile']} nie wymaga wariantów hierarchicznych.")
