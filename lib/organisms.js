/**
 * ATOMIC DESIGN - ORGANISMS
 */
const Organisms = {
    // --- NAV ---
    navbar: (p = {}) => {
        const logo = Atoms.heading({ level: 2, content: 'Surreal UI' });
        const links = ['Produkty', 'Cennik', 'Kontakt'].map(l => Atoms.nav_link({ content: l })).join('');
        const user = Atoms.icon_button({ icon: 'user' });
        return `<nav class="cmp navbar ${p?.classes||''} is-organism">${logo}<div class="links">${links}</div>${user}</nav>`;
    },
    sidebar: (p = {}) => {
        const items = (p?.items||['Dashboard', 'Analizy', 'Ustawienia']).map(i => `<li class="nav-item">${Atoms.nav_link({ content: i })}</li>`).join('');
        return `<aside class="cmp sidebar ${p?.classes||''} is-organism"><nav><ul>${items}</ul></nav></aside>`;
    },
    mega_menu: (p = {}) => {
        const cols = [1,2,3,4,5].map(i => Molecules.mega_menu_column({ title: `Sekcja ${i}`, items: ['Opcja A', 'Opcja B', 'Opcja C', 'Opcja D', 'Opcja E'] })).join('');
        return `<div class="cmp mega-menu ${p?.classes||''} is-organism">${cols}</div>`;
    },

    // --- DASHBOARD / SAAS REFINED ---
    saas_user_management: (p = {}) => {
        const title = Atoms.heading({ level: 3, content: 'Zarządzanie Bytami' });
        const filter = Molecules.saas_filter_bar();
        const users = [
            {name: 'Astro', role: 'Admin', status: 'online'},
            {name: 'Luna', role: 'Moderator', status: 'offline'},
            {name: 'Void', role: 'User', status: 'online'}
        ].map(u => Molecules.saas_user_row(u)).join('');
        const bulk = Molecules.saas_bulk_actions();
        return `<section class="cmp saas-user-management ${p?.classes||''} is-organism">${title}${filter}${users}${bulk}</section>`;
    },
    saas_billing_portal: (p = {}) => {
        const title = Atoms.heading({ level: 3, content: 'Portal Płatniczy' });
        const plan = Molecules.card({
            title: 'Plan Galaktyczny',
            body: 'Aktywny do 2027. Koszt: 0 PLN (Wymiana barterowa)',
            footer: Atoms.button({ content: 'Zmień Plan', type: 'primary' })
        });
        const history = Molecules.table({
            headers: ['Data', 'Kwota', 'Status'],
            rows: [['2024-01-01', '10 ET', 'Opłacone'], ['2024-02-01', '10 ET', 'Oczekuje']]
        });
        return `<section class="cmp saas-billing-portal ${p?.classes||''} is-organism">${title}${plan}${history}</section>`;
    },
    saas_api_key_manager: (p = {}) => {
        const title = Atoms.heading({ level: 3, content: 'Klucze API' });
        const keys = [
            {name: 'Produkcyjny', key: 'sk_live_...'},
            {name: 'Testowy', key: 'sk_test_...'}
        ].map(k => `<div class="key-row">${Atoms.span({content: k.name})} ${Atoms.code({content: k.key})}</div>`).join('');
        const btn = Atoms.button({ content: 'Generuj Nowy Klucz', type: 'primary' });
        return `<section class="cmp saas-api-key-manager ${p?.classes||''} is-organism">${title}${keys}${btn}</section>`;
    },
    saas_integration_grid: (p = {}) => {
        const title = Atoms.heading({ level: 3, content: 'Integracje' });
        const grid = `<div class="grid">${[1,2,3,4].map(i => Molecules.integration_tile({ name: `App ${i}`, active: i % 2 === 0 })).join('')}</div>`;
        return `<section class="cmp saas-integration-grid ${p?.classes||''} is-organism">${title}${grid}</section>`;
    },
    saas_activity_timeline: (p = {}) => {
        const title = Atoms.heading({ level: 3, content: 'Oś Czasu Aktywności' });
        const items = [
            {content: 'Astro zalogował się do systemu', date: '10:00'},
            {content: 'Zmieniono parametry rzeczywistości', date: '11:30', type: 'success'},
            {content: 'Błąd synchronizacji z kwazarami', date: '12:00', type: 'error'}
        ].map(i => Molecules.saas_timeline_item(i)).join('');
        return `<section class="cmp saas-activity-timeline ${p?.classes||''} is-organism">${title}${items}</section>`;
    },

    analytics_grid: (p = {}) => {
        const tiles = [1,2,3,4,5].map(i => Molecules.card({ title: `Metryka ${i}`, body: 'Wartość surrealistyczna' })).join('');
        return `<section class="cmp analytics-grid ${p?.classes||''} is-organism profile-grid">${tiles}</section>`;
    },
    audit_logs: (p = {}) => {
        const table = Molecules.table({
            caption: 'Dziennik zdarzeń kosmicznych',
            headers: ['Data', 'Zdarzenie', 'Status', 'Użytkownik', 'ID'],
            rows: Array.from({length: 5}).map((_, i) => [`2024-03-0${i+1}`, `Zdarzenie ${i+1}`, 'Sukces', 'Astro', `00${i}`])
        });
        return `<section class="cmp audit-logs ${p?.classes||''} is-organism">${table}</section>`;
    },
    settings_panel: (p = {}) => {
        const h = Atoms.heading({ level: 3, content: p?.title || 'Ustawienia Profilu' });
        const fields = [
            Molecules.form_field({ label: 'Nazwa użytkownika', placeholder: 'Kowalski' }),
            Molecules.form_field({ label: 'Hasło', inputType: 'password' }),
            Molecules.form_field({ label: 'Rola', inputType: 'select' }),
            Molecules.choice_field({ label: 'Subskrypcja aktywna' }),
            Molecules.choice_field({ label: 'Powiadomienia push', isRadio: true })
        ].join('');
        const btn = Atoms.button({ content: 'Zapisz zmiany', type: 'primary' });
        return `<div class="cmp settings-panel ${p?.classes||''} is-organism">${h}${fields}${btn}</div>`;
    },

    // --- E-COMMERCE ---
    product_grid: (p = {}) => {
        const products = (p.products || [
            { title: 'Pieronica', price: '120 PLN' },
            { title: 'Gulgownik', price: '85 PLN' },
            { title: 'Młynek', price: '200 PLN' },
            { title: 'Kabel', price: '15 PLN' }
        ]).map((pr, i) => Molecules.product_card({ ...pr, src: `https://picsum.photos/seed/shop${i}/200` })).join('');
        return `<section class="cmp product-grid ${p?.classes||''} is-organism profile-grid">${products}</section>`;
    },
    cart_drawer: (p = {}) => {
        const h = Atoms.heading({ level: 3, content: 'Koszyk' });
        const items = [
            { title: 'Pieronica', qty: 1, price: '120 PLN' },
            { title: 'Gulgownik', qty: 2, price: '170 PLN' }
        ].map(it => Molecules.cart_item(it)).join('');
        const summary = `<div class="cart-summary">${Atoms.paragraph({ content: 'Suma: 290.00 PLN', classes: 'total' })}${Atoms.button({ content: 'Do kasy', type: 'primary' })}</div>`;
        return `<aside class="cmp cart-drawer ${p?.classes||''} is-organism">${h}<div class="item-list">${items}</div>${summary}</aside>`;
    },
    product_details_hero: (p = {}) => {
        const gallery = Atoms.image({ src: 'https://picsum.photos/seed/hero/600', classes: 'hero-img' });
        const info = `<div class="hero-info">
            ${Atoms.overline({ content: 'NOWOŚĆ' })}
            ${Atoms.heading({ level: 1, content: p.title || 'Młynek Kwantowy' })}
            ${Molecules.ecommerce_price_tag({ price: '199 PLN', oldPrice: '250 PLN', discount: '-20%' })}
            ${Atoms.paragraph({ type: 'lead', content: 'Urządzenie do mielenia rzeczywistości na drobne ziarna prawdopodobieństwa.' })}
            ${Molecules.ecommerce_variant_selector({ label: 'Rozmiar portalu:', options: ['Mini', 'Standard', 'Maxi'] })}
            ${Molecules.color_swatches()}
            <div class="actions">${Atoms.button({ content: 'Dodaj do koszyka', type: 'primary' })} ${Atoms.button({ content: 'Kup teraz', type: 'secondary' })}</div>
        </div>`;
        return `<section class="cmp product-hero ${p?.classes||''} is-organism">${gallery}${info}</section>`;
    },
    checkout_summary: (p = {}) => {
        const h = Atoms.heading({ level: 3, content: 'Podsumowanie zamówienia' });
        const items = Molecules.list({ items: ['Młynek Kwantowy - 199 PLN', 'Dostawa - 15 PLN'] });
        const total = Atoms.heading({ level: 4, content: 'Razem: 214 PLN' });
        const coupon = Molecules.form_field({ label: 'Kod rabatowy', placeholder: 'KOD2024' });
        const payBtn = Atoms.button({ content: 'Zapłać i zamów', type: 'primary', classes: 'w-full' });
        return `<div class="cmp checkout-summary ${p?.classes||''} is-organism">${h}${items}${coupon}${total}${payBtn}</div>`;
    },
    checkout_steps: (p = {}) => {
        const steps = ['Koszyk', 'Dostawa', 'Płatność', 'Podsumowanie'].map((s, i) => {
            const active = i === (p.currentStep || 0) ? 'is-active' : '';
            return `<span class="step ${active}">${s}</span>`;
        }).join('<span class="sep">/</span>');
        return `<nav class="cmp checkout-steps ${p?.classes||''} is-organism">${steps}</nav>`;
    },

    // --- AI ---
    chat_window: (p = {}) => {
        const messages = [
            Molecules.chat_bubble({ role: 'ai', content: 'Witaj w systemie surrealistycznym.' }),
            Molecules.chat_bubble({ role: 'user', content: 'Jaki jest sens istnienia młynek do kawy?' }),
            Molecules.chat_bubble({ role: 'ai', content: 'Młynek to portal do wymiaru kofeiny.' }),
            Molecules.chat_bubble({ role: 'user', content: 'A co z herbatą?' }),
            Molecules.chat_bubble({ role: 'ai', content: 'Herbata to szept spokoju w zgiełku wszechświata.' })
        ].join('');
        const input = Molecules.form_field({ placeholder: 'Zadaj pytanie wszechświatowi...' });
        return `<section class="cmp chat-window ${p?.classes||''} is-organism"><div class="messages">${messages}</div><div class="input-area">${input}</div></section>`;
    },
    ai_playground: (p = {}) => {
        const sidebar = Organisms.sidebar({ items: ['Historia czatów', 'Parametry modelu', 'Ustawienia API', 'Tokeny', 'Modele'] });
        const main = Organisms.chat_window();
        return `<div class="cmp ai-playground ${p?.classes||''} is-organism">${sidebar}<main>${main}</main></div>`;
    },

    // --- LAYOUT ORGANISMS ---
    dashboard_layout: (p = {}) => {
        const nav = Organisms.navbar();
        const side = Organisms.sidebar();
        const content = Organisms.analytics_grid();
        return `<div class="cmp dashboard-layout ${p?.classes||''} is-organism">${nav}<div class="body">${side}<main>${content}</main></div></div>`;
    }
};

window.Organisms = Organisms;
if (typeof module !== 'undefined') module.exports = Organisms;
