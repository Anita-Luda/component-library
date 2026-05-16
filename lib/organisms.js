/**
 * ATOMIC DESIGN - ORGANISMS
 */
const Organisms = {
    // --- NAV ---
    navbar: (p) => {
        const logo = Atoms.heading({ level: 2, content: 'Surreal UI' });
        const links = ['Produkty', 'Cennik', 'Kontakt'].map(l => Atoms.nav_link({ content: l })).join('');
        const user = Atoms.icon_button({ icon: 'user' });
        return `<nav class="cmp navbar is-organism">${logo}<div class="links">${links}</div>${user}</nav>`;
    },
    sidebar: (p) => {
        const items = (p.items||['Dashboard', 'Analizy', 'Ustawienia']).map(i => `<li class="nav-item">${Atoms.nav_link({ content: i })}</li>`).join('');
        return `<aside class="cmp sidebar is-organism"><nav><ul>${items}</ul></nav></aside>`;
    },
    mega_menu: (p) => {
        const cols = [1,2,3,4,5].map(i => Molecules.mega_menu_column({ title: `Sekcja ${i}`, items: ['Opcja A', 'Opcja B', 'Opcja C', 'Opcja D', 'Opcja E'] })).join('');
        return `<div class="cmp mega-menu is-organism">${cols}</div>`;
    },

    // --- DASHBOARD / SAAS ---
    analytics_grid: (p) => {
        const tiles = [1,2,3,4,5].map(i => Molecules.card({ title: `Metryka ${i}`, body: 'Wartość surrealistyczna' })).join('');
        return `<section class="cmp analytics-grid is-organism profile-grid">${tiles}</section>`;
    },
    audit_logs: (p) => {
        const table = Molecules.table({
            caption: 'Dziennik zdarzeń kosmicznych',
            headers: ['Data', 'Zdarzenie', 'Status', 'Użytkownik', 'ID'],
            rows: Array.from({length: 5}).map((_, i) => [`2024-03-0${i+1}`, `Zdarzenie ${i+1}`, 'Sukces', 'Astro', `00${i}`])
        });
        return `<section class="cmp audit-logs is-organism">${table}</section>`;
    },
    settings_panel: (p) => {
        const h = Atoms.heading({ level: 3, content: 'Ustawienia Profilu' });
        const fields = [
            Molecules.form_field({ label: 'Nazwa użytkownika', placeholder: 'Kowalski' }),
            Molecules.form_field({ label: 'Hasło', inputType: 'password' }),
            Molecules.form_field({ label: 'Rola', inputType: 'select' }),
            Molecules.choice_field({ label: 'Subskrypcja aktywna' }),
            Molecules.choice_field({ label: 'Powiadomienia push', isRadio: true })
        ].join('');
        const btn = Atoms.button({ content: 'Zapisz zmiany', type: 'primary' });
        return `<div class="cmp settings-panel is-organism">${h}${fields}${btn}</div>`;
    },

    // --- E-COMMERCE ---
    product_grid: (p) => {
        const products = [1,2,3,4,5].map(i => Molecules.product_card({ title: `Artefakt ${i}`, price: '99.99 PLN', src: `https://picsum.photos/seed/${i}/200` })).join('');
        return `<section class="cmp product-grid is-organism profile-grid">${products}</section>`;
    },
    cart_drawer: (p) => {
        const h = Atoms.heading({ level: 3, content: 'Koszyk' });
        const items = Molecules.list({ items: ['Pieronica - 1 szt', 'Gulgownik - 2 szt', 'Młynek - 1 szt', 'Kabel - 1 szt', 'Wtyczka - 5 szt'] });
        const summary = Atoms.paragraph({ content: 'Suma: 245.00 PLN', classes: 'total' });
        const btn = Atoms.button({ content: 'Do kasy', type: 'primary' });
        return `<aside class="cmp cart-drawer is-organism">${h}${items}${summary}${btn}</aside>`;
    },
    checkout_steps: (p) => {
        const steps = ['Koszyk', 'Dostawa', 'Płatność', 'Podsumowanie', 'Potwierdzenie'].map((s, i) => `<span class="step ${i===0?'active':''}">${s}</span>`).join(' > ');
        return `<nav class="cmp checkout-steps is-organism">${steps}</nav>`;
    },

    // --- AI ---
    chat_window: (p) => {
        const messages = [
            Molecules.chat_bubble({ role: 'ai', content: 'Witaj w systemie surrealistycznym.' }),
            Molecules.chat_bubble({ role: 'user', content: 'Jaki jest sens istnienia młynek do kawy?' }),
            Molecules.chat_bubble({ role: 'ai', content: 'Młynek to portal do wymiaru kofeiny.' }),
            Molecules.chat_bubble({ role: 'user', content: 'A co z herbatą?' }),
            Molecules.chat_bubble({ role: 'ai', content: 'Herbata to szept spokoju w zgiełku wszechświata.' })
        ].join('');
        const input = Molecules.form_field({ placeholder: 'Zadaj pytanie wszechświatowi...' });
        return `<section class="cmp chat-window is-organism"><div class="messages">${messages}</div><div class="input-area">${input}</div></section>`;
    },
    ai_playground: (p) => {
        const sidebar = Organisms.sidebar({ items: ['Historia czatów', 'Parametry modelu', 'Ustawienia API', 'Tokeny', 'Modele'] });
        const main = Organisms.chat_window();
        return `<div class="cmp ai-playground is-organism">${sidebar}<main>${main}</main></div>`;
    },

    // --- LAYOUT ORGANISMS ---
    dashboard_layout: (p) => {
        const nav = Organisms.navbar();
        const side = Organisms.sidebar();
        const content = Organisms.analytics_grid();
        return `<div class="cmp dashboard-layout is-organism">${nav}<div class="body">${side}<main>${content}</main></div></div>`;
    }
};

window.Organisms = Organisms;
if (typeof module !== 'undefined') module.exports = Organisms;
