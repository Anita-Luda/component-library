import { Library } from '../library.js';

/**
 * ORGANISMS LIBRARY
 * High-level domain components.
 */
export const Organisms = {
    saas_user_management(props) {
        const filterBar = Library.get('molecules.saas_filter_bar');
        const users = [
            { name: 'Adam Nowak', email: 'adam@joy.ai', role: 'Administrator' },
            { name: 'Ewa Kowalska', email: 'ewa@joy.ai', role: 'Editor' },
            { name: 'Marek Wisła', email: 'marek@joy.ai', role: 'Viewer' }
        ].map(u => Library.get('molecules.saas_user_row', u)).join('');

        return `
            <div class="organism-saas-user-management cmp is-organism" id="organism-saas_user_management-default-default">
                <header class="flex-between" style="margin-bottom: var(--primitive-space-6);">
                    <h2 style="margin:0">Zarządzanie Zespołem</h2>
                    ${Library.get('atoms.button', { type: 'primary', content: '<i data-lucide="user-plus"></i> Zaproś' })}
                </header>
                ${filterBar}
                <div class="user-list mt-xl" style="display: flex; flex-direction: column; gap: 1px; background: var(--primitive-gray-200); border: 1px solid var(--primitive-gray-200); border-radius: var(--semantic-shape-radius);">
                    ${users}
                </div>
            </div>
        `;
    },

    product_grid(props) {
        const cards = Array(4).fill(0).map((_, i) => Library.get('molecules.card', {
            title: `Produkt Joyful #${i+1}`,
            content: 'Opis niesamowitego produktu z naszej radosnej biblioteki, który odmieni Twoje życie.',
            footer: `
                <div class="flex-between" style="width: 100%;">
                    ${Library.get('molecules.ecommerce_price_tag', { price: (Math.random() * 100 + 50).toFixed(2) })}
                    ${Library.get('atoms.button', { type: 'primary', content: 'Do koszyka' })}
                </div>
            `
        })).join('');

        return `<div class="organism-product-grid cmp variants-grid is-organism" id="organism-product_grid-default-default">${cards}</div>`;
    },

    sprint_board(props) {
        const columns = [
            { title: 'Do zrobienia', tasks: ['Zaprojektować logo', 'Ustawić środowisko'] },
            { title: 'W trakcie', tasks: ['Implementacja atomów'] },
            { title: 'Gotowe', tasks: ['Audyt UI'] }
        ].map(col => `
            <div class="kanban-column is-molecule" style="flex: 1; min-width: 250px; background: var(--primitive-gray-100); padding: var(--primitive-space-4); border-radius: var(--semantic-shape-radius);">
                <div class="column-header">
                    <h3 style="margin:0">${col.title}</h3>
                    ${Library.get('atoms.badge', { content: col.tasks.length })}
                </div>
                <div class="task-list mt-xl" style="display: flex; flex-direction: column; gap: var(--primitive-space-3);">
                    ${col.tasks.map(t => Library.get('molecules.task_card', { title: t })).join('')}
                    ${Library.get('atoms.button', { type: 'tertiary', content: '<i data-lucide="plus"></i> Dodaj zadanie' })}
                </div>
            </div>
        `).join('');

        return `<div class="organism-sprint-board cmp is-organism" id="organism-sprint_board-default-default" style="display: flex; gap: var(--primitive-space-6); overflow-x: auto; padding: var(--primitive-space-4);">${columns}</div>`;
    },

    chat_window(props) {
        return `
            <div class="organism-chat molecule-card cmp" id="organism-chat_window-default-default">
                <div class="chat-messages" style="height: 200px; overflow-y: auto;">
                    <p><strong>AI:</strong> Jak mogę Ci dzisiaj pomóc w radosny sposób?</p>
                </div>
                <div class="chat-input flex-gap">
                    ${Library.get('atoms.input_raw', { content: 'Wpisz wiadomość...' })}
                    ${Library.get('atoms.button', { type: 'primary', content: 'Wyślij' })}
                </div>
            </div>
        `;
    },

    // Domain Organisms
    navbar(props) {
        return `
            <nav class="organism-navbar cmp is-organism" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; width: 100%; background: white; border-bottom: 1px solid var(--admin-border);">
                <div class="logo" style="font-weight: 800; font-size: 1.25rem; color: var(--primitive-blue-500);">JOY.AI</div>
                <div class="nav-links flex-row" style="gap: 24px;">
                    <a href="#" style="text-decoration: none; color: var(--admin-text); font-weight: 500;">Produkty</a>
                    <a href="#" style="text-decoration: none; color: var(--admin-text); font-weight: 500;">Cennik</a>
                    <a href="#" style="text-decoration: none; color: var(--admin-text); font-weight: 500;">O nas</a>
                </div>
                <div class="actions flex-row" style="gap: 12px;">
                    ${Library.get('atoms.button', { type: 'tertiary', content: 'Logowanie' })}
                    ${Library.get('atoms.button', { type: 'primary', content: 'Zacznij za darmo' })}
                </div>
            </nav>
        `;
    },

    sidebar(props) {
        return `
            <aside class="organism-sidebar is-organism" style="width: 260px; height: 100%; background: var(--primitive-gray-50); border-right: 1px solid var(--admin-border); display: flex; flex-direction: column; padding: 24px;">
                <div class="sidebar-header" style="margin-bottom: 32px;">
                    <div style="font-weight: 800; color: var(--primitive-blue-500);">JOYFUL DASHBOARD</div>
                </div>
                <nav class="sidebar-nav" style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                    ${Library.get('atoms.button', { type: 'primary', content: '<i data-lucide="layout-grid"></i> Dashboard' })}
                    ${Library.get('atoms.button', { type: 'tertiary', content: '<i data-lucide="users"></i> Użytkownicy' })}
                    ${Library.get('atoms.button', { type: 'tertiary', content: '<i data-lucide="settings"></i> Ustawienia' })}
                </nav>
                <div class="sidebar-footer" style="padding-top: 24px; border-top: 1px solid var(--admin-border);">
                    ${Library.get('molecules.saas_user_row', { name: 'Marek Dev', email: 'marek@joy.ai', role: 'Dev' })}
                </div>
            </aside>
        `;
    },

    analytics_grid(props) {
        const stats = [
            { label: 'Użytkownicy', value: '12,402' },
            { label: 'Konwersja', value: '3.42%' },
            { label: 'Odrzucenia', value: '42.1%' },
            { label: 'Przychód', value: '$12,840' }
        ].map(s => Library.get('molecules.statistic', s)).join('');
        return `<div class="organism-analytics-grid variants-grid is-organism" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 24px; width: 100%;">${stats}</div>`;
    },

    settings_panel(props) {
        return `
            <div class="organism-settings-panel cmp is-organism" style="flex-direction: column; align-items: stretch; padding: 32px; gap: 32px; background: white; width: 100%;">
                <section>
                    <h3 style="margin-top:0">Profil publiczny</h3>
                    <p style="color: var(--admin-text-muted); font-size: 0.9rem;">Zarządzaj swoimi danymi widocznymi dla innych.</p>
                    <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 24px; max-width: 400px;">
                        ${Library.get('molecules.inputGroup', { label: 'Nazwa użytkownika', value: 'joy_user_1' })}
                        ${Library.get('molecules.inputGroup', { label: 'Bio', value: 'Pasjonat radosnych interfejsów.' })}
                    </div>
                </section>
                <section style="padding-top: 32px; border-top: 1px solid var(--admin-border);">
                    <h3>Powiadomienia</h3>
                    <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 24px;">
                        <label class="choice-item">${Library.get('atoms.checkbox.default.default')} <span>Email o nowych logowaniach</span></label>
                        <label class="choice-item">${Library.get('atoms.checkbox.default.default')} <span>Miesięczny raport aktywności</span></label>
                    </div>
                </section>
            </div>
        `;
    },

    saas_api_key_manager(props) {
        const keys = [
            { name: 'Produkcyjny', key: 'pk_live_********************' },
            { name: 'Testowy', key: 'pk_test_********************' }
        ].map(k => `
            <div class="flex-between" style="padding: 12px; background: var(--primitive-gray-50); border-radius: 8px;">
                <div>
                    <div style="font-weight: 700; font-size: 0.9rem;">${k.name}</div>
                    <code style="font-size: 0.8rem; color: var(--admin-text-muted);">${k.key}</code>
                </div>
                <div class="flex-row" style="gap: 8px;">
                    ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="copy"></i>' })}
                    ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="trash-2"></i>' })}
                </div>
            </div>
        `).join('');

        return `
            <div class="organism-api-manager is-organism molecule-card cmp" style="flex-direction: column; align-items: stretch; padding: 24px; width: 100%;">
                <header class="flex-between" style="margin-bottom: 24px;">
                    <h3 style="margin:0">Klucze API</h3>
                    ${Library.get('atoms.button', { type: 'primary', content: 'Generuj nowy' })}
                </header>
                <div style="display: flex; flex-direction: column; gap: 12px;">${keys}</div>
            </div>
        `;
    },

    product_details_hero(props) {
        return `
            <div class="organism-product-hero is-organism" style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 48px; background: white; border-radius: 16px; border: 1px solid var(--admin-border); width: 100%;">
                <div class="product-visual">
                    <img src="https://picsum.photos/seed/joyhero/500/500" style="width: 100%; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);" alt="Product">
                </div>
                <div class="product-details" style="display: flex; flex-direction: column; justify-content: center;">
                    ${Library.get('atoms.badge', { type: 'primary', content: 'Nowość 2024' })}
                    <h1 style="font-size: 3rem; margin: 16px 0;">Ultra Joyful Pro</h1>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primitive-blue-500); margin-bottom: 24px;">$249.99</div>
                    <p style="font-size: 1.1rem; color: var(--admin-text-muted); line-height: 1.6; margin-bottom: 32px;">
                        Doświadcz niespotykanej dotąd radości z użytkowania najbardziej zaawansowanego interfejsu opartego na logice kwantowej i marzeniach.
                    </p>
                    <div class="flex-row" style="gap: 16px;">
                        ${Library.get('atoms.button', { type: 'primary', content: 'Dodaj do koszyka' })}
                        ${Library.get('atoms.button', { type: 'secondary', content: 'Kup teraz' })}
                    </div>
                </div>
            </div>
        `;
    },

    checkout_summary(props) {
        return `
            <div class="organism-checkout-summary is-organism molecule-card cmp" style="flex-direction: column; align-items: stretch; padding: 24px; background: white; width: 100%; position: sticky; top: 24px;">
                <h3 style="margin-top:0">Podsumowanie</h3>
                <div style="display: flex; flex-direction: column; gap: 12px; margin: 24px 0;">
                    <div class="flex-between"><span>Wartość koszyka</span><span>299.00 PLN</span></div>
                    <div class="flex-between"><span>Dostawa</span><span style="color: var(--primitive-green-500);">FREE</span></div>
                    <div class="flex-between" style="font-weight: 800; font-size: 1.25rem; padding-top: 12px; border-top: 2px solid var(--admin-border);">
                        <span>Razem</span><span>299.00 PLN</span>
                    </div>
                </div>
                ${Library.get('atoms.button', { type: 'primary', content: 'Przejdź do płatności' })}
                <div style="text-align: center; margin-top: 16px; font-size: 0.8rem; color: var(--admin-text-muted);">
                    Bezpieczna płatność z JOY.PAY
                </div>
            </div>
        `;
    },

    mega_menu(props) {
        return `
            <div class="organism-mega-menu is-organism" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; padding: 32px; background: white; border: 1px solid var(--admin-border); border-radius: 12px; width: 100%; box-shadow: 0 15px 30px rgba(0,0,0,0.15);">
                ${Array(4).fill(0).map((_, i) => `
                    <div>
                        <h4 style="margin-top:0; border-bottom: 1px solid var(--admin-border); padding-bottom: 8px;">Kategoria ${i+1}</h4>
                        <ul style="padding:0; display:flex; flex-direction:column; gap:8px;">
                            <li><a href="#" style="text-decoration:none; color:var(--admin-text); font-size: 0.9rem;">Link pomocniczy A</a></li>
                            <li><a href="#" style="text-decoration:none; color:var(--admin-text); font-size: 0.9rem;">Link pomocniczy B</a></li>
                            <li><a href="#" style="text-decoration:none; color:var(--admin-text); font-size: 0.9rem;">Link pomocniczy C</a></li>
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
    },

    saas_integration_grid(props) {
        const integrations = ['Slack', 'Discord', 'GitHub', 'Linear', 'Notion', 'Figma'].map(name => `
            <div class="molecule-card cmp" style="flex-direction: row; gap: 16px; padding: 16px;">
                <div style="width: 40px; height: 40px; background: var(--primitive-gray-100); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="box"></i>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 0.9rem;">${name}</div>
                    <div style="font-size: 0.75rem; color: var(--admin-text-muted);">Połączone</div>
                </div>
                ${Library.get('atoms.toggle_raw', { state: 'default' })}
            </div>
        `).join('');
        return `<div class="organism-integrations variants-grid is-organism" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; width: 100%;">${integrations}</div>`;
    },

    saas_activity_timeline(props) {
        return `
            <div class="organism-activity molecule-card cmp" style="flex-direction: column; align-items: stretch; padding: 24px; width: 100%;">
                <h3 style="margin-top:0; margin-bottom: 24px;">Ostatnia aktywność</h3>
                ${Library.get('molecules.timeline')}
            </div>
        `;
    },

    permission_matrix(props) {
        const roles = ['Admin', 'Editor', 'Viewer'];
        const perms = ['Odczyt', 'Zapis', 'Usuwanie', 'Zarządzanie'];
        return `
            <div class="organism-permissions cmp is-organism" style="flex-direction: column; align-items: stretch; padding: 24px; background: white; border-radius: 12px; border: 1px solid var(--admin-border); width: 100%;">
                <h3 style="margin-top:0">Matryca uprawnień</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--admin-border);">
                            <th style="text-align: left; padding: 12px;">Uprawnienie</th>
                            ${roles.map(r => `<th style="padding: 12px;">${r}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${perms.map(p => `
                            <tr style="border-bottom: 1px solid var(--admin-border);">
                                <td style="padding: 12px; font-weight: 600;">${p}</td>
                                ${roles.map(() => `<td style="text-align: center; padding: 12px;">${Library.get('atoms.checkbox.default.default')}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    org_hierarchy(props) {
        return `
            <div class="organism-org-tree cmp is-organism" style="flex-direction: column; align-items: stretch; padding: 24px; background: white; border-radius: 12px; border: 1px solid var(--admin-border); width: 100%;">
                <h3 style="margin-top:0">Struktura organizacyjna</h3>
                <div style="margin-top: 16px;">
                    ${Library.get('molecules.tree_item', { content: 'Zarząd' })}
                    <div style="padding-left: 20px; border-left: 1px dashed var(--admin-border); margin-left: 20px;">
                        ${Library.get('molecules.tree_item', { content: 'Dział IT' })}
                        ${Library.get('molecules.tree_item', { content: 'Marketing' })}
                    </div>
                </div>
            </div>
        `;
    },

    compliance_dashboard(props) {
        return `
            <div class="organism-compliance cmp is-organism" style="flex-direction: column; align-items: stretch; gap: 24px; width: 100%;">
                <header class="flex-between">
                    <h2 style="margin:0">Zgodność i Bezpieczeństwo</h2>
                    ${Library.get('atoms.badge', { type: 'success', content: '98% COMPLIANT' })}
                </header>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                    ${Library.get('molecules.statistic', { label: 'Ostatni audyt', value: '12 Maj' })}
                    ${Library.get('molecules.statistic', { label: 'Otwarte zgłoszenia', value: '2' })}
                    ${Library.get('molecules.statistic', { label: 'Czas odpowiedzi', value: '4h' })}
                </div>
                <div class="molecule-card cmp" style="padding: 24px; flex-direction: column; align-items: stretch;">
                    <h3>Statusy certyfikatów</h3>
                    ${Library.get('molecules.list', { items: ['ISO 27001 - Aktywny', 'SOC2 Type II - W trakcie', 'GDPR - Spełniony'] })}
                </div>
            </div>
        `;
    },

    activity_feed(props) {
        const activities = [
            { user: 'Adam Nowak', action: 'opublikował nowy artykuł', time: '2 min temu' },
            { user: 'Ewa Kowalska', action: 'dodała komentarz', time: '15 min temu' },
            { user: 'Marek Wisła', action: 'zmienił status projektu', time: '1h temu' }
        ].map(a => `
            <div class="activity-item" style="display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--admin-border);">
                ${Library.get('atoms.avatar', { content: '<i data-lucide="user"></i>' })}
                <div>
                    <div><strong>${a.user}</strong> ${a.action}</div>
                    <div style="font-size: 0.8rem; color: var(--admin-text-muted);">${a.time}</div>
                </div>
            </div>
        `).join('');
        return `
            <div class="organism-feed molecule-card cmp" style="flex-direction: column; align-items: stretch; padding: 24px; width: 100%;">
                <h3 style="margin-top:0">Kanał aktywności</h3>
                <div style="display: flex; flex-direction: column;">${activities}</div>
                <div style="margin-top: 16px; text-align: center;">
                    ${Library.get('atoms.button', { type: 'tertiary', content: 'Pokaż więcej' })}
                </div>
            </div>
        `;
    },

    dashboard_layout(props) {
        return `
            <div class="organism-dashboard-layout is-organism" style="display: flex; height: 600px; width: 100%; border: 1px solid var(--admin-border); border-radius: 12px; overflow: hidden;">
                ${this.sidebar()}
                <div style="flex: 1; display: flex; flex-direction: column; overflow: hidden;">
                    ${this.navbar()}
                    <main style="flex: 1; padding: 32px; overflow-y: auto; background: var(--primitive-gray-50);">
                        ${this.analytics_grid()}
                        <div style="margin-top: 32px;">
                            ${this.saas_user_management()}
                        </div>
                    </main>
                </div>
            </div>
        `;
    },

    saas_billing_portal(props) {
        return `
            <div class="organism-billing-portal cmp is-organism" style="flex-direction: column; align-items: stretch; padding: 32px; gap: 32px; background: white; width: 100%;">
                <header>
                    <h2 style="margin:0">Subskrypcja i płatności</h2>
                    <p style="color: var(--admin-text-muted);">Zarządzaj swoim planem i fakturami.</p>
                </header>
                <div class="flex-row" style="gap: 24px; align-items: stretch;">
                    <div class="molecule-card cmp" style="flex: 1; flex-direction: column; align-items: start; padding: 24px;">
                        ${Library.get('atoms.badge', { type: 'primary', content: 'Plan PRO' })}
                        <div style="font-size: 2rem; font-weight: 800; margin: 16px 0;">$49<span style="font-size: 1rem; font-weight: 400; color: var(--admin-text-muted);">/miesiąc</span></div>
                        <p style="font-size: 0.9rem;">Następna płatność: 12 Czerwca 2024</p>
                        ${Library.get('atoms.button', { type: 'secondary', content: 'Zmień plan' })}
                    </div>
                    <div class="molecule-card cmp" style="flex: 1; flex-direction: column; align-items: start; padding: 24px;">
                        <h4 style="margin:0 0 16px 0;">Metoda płatności</h4>
                        <div class="flex-row" style="gap: 12px; margin-bottom: 24px;">
                            <i data-lucide="credit-card" style="width: 32px; height: 32px;"></i>
                            <div>
                                <div style="font-weight: 700;">Visa **** 4242</div>
                                <div style="font-size: 0.8rem; color: var(--admin-text-muted);">Wygasa: 12/26</div>
                            </div>
                        </div>
                        ${Library.get('atoms.button', { type: 'tertiary', content: 'Aktualizuj kartę' })}
                    </div>
                </div>
            </div>
        `;
    },

    checkout_steps(props) {
        return `
            <div class="organism-checkout-flow is-organism" style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px; width: 100%;">
                <div style="display: flex; flex-direction: column; gap: 24px;">
                    <div class="molecule-card cmp" style="flex-direction: column; align-items: stretch; padding: 24px;">
                        <h3 style="margin-top:0">1. Dane dostawy</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
                            ${Library.get('molecules.inputGroup', { label: 'Imię', value: 'Jan' })}
                            ${Library.get('molecules.inputGroup', { label: 'Nazwisko', value: 'Kowalski' })}
                            <div style="grid-column: span 2;">
                                ${Library.get('molecules.inputGroup', { label: 'Adres', value: 'ul. Radosna 12/4' })}
                            </div>
                        </div>
                    </div>
                    <div class="molecule-card cmp" style="flex-direction: column; align-items: stretch; padding: 24px; opacity: 0.6;">
                        <h3 style="margin-top:0">2. Płatność</h3>
                    </div>
                </div>
                <div>
                    ${this.checkout_summary()}
                </div>
            </div>
        `;
    },

    ai_playground(props) {
        return `
            <div class="organism-ai-playground is-organism" style="display: flex; flex-direction: column; height: 500px; width: 100%; border: 1px solid var(--admin-border); border-radius: 12px; background: white; overflow: hidden;">
                <header class="flex-between" style="padding: 16px 24px; border-bottom: 1px solid var(--admin-border);">
                    <div style="font-weight: 700;">AI Playground</div>
                    <div class="flex-row" style="gap: 12px;">
                        ${Library.get('atoms.badge', { type: 'success', content: 'GPT-4 connected' })}
                        ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="settings"></i>' })}
                    </div>
                </header>
                <div style="flex: 1; display: flex; overflow: hidden;">
                    <div style="flex: 1; display: flex; flex-direction: column; padding: 24px; gap: 16px; overflow-y: auto;">
                        <div class="chat-bubble bot" style="background: var(--primitive-gray-100); padding: 12px 16px; border-radius: 12px; max-width: 80%;">Witaj! W czym mogę Ci dzisiaj pomóc?</div>
                        <div class="chat-bubble user" style="align-self: flex-end; background: var(--primitive-blue-500); color: white; padding: 12px 16px; border-radius: 12px; max-width: 80%;">Wygeneruj mi radosny komponent React.</div>
                        ${Library.get('molecules.ai_typing_indicator')}
                    </div>
                    <aside style="width: 240px; border-left: 1px solid var(--admin-border); padding: 16px; background: var(--primitive-gray-50);">
                        <h4 style="margin-top:0">Parametry</h4>
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            <div>
                                <label style="font-size: 0.75rem; font-weight: 700; display: block; margin-bottom: 4px;">Temperature</label>
                                ${Library.get('atoms.range_raw', { state: 'default' })}
                            </div>
                            ${Library.get('molecules.token_counter')}
                        </div>
                    </aside>
                </div>
                <footer style="padding: 16px 24px; border-top: 1px solid var(--admin-border);">
                    <div class="flex-row" style="gap: 12px;">
                        <div style="flex: 1;">${Library.get('atoms.input_raw', { placeholder: 'Wpisz polecenie...' })}</div>
                        ${Library.get('atoms.button', { type: 'primary', content: 'Wyślij' })}
                    </div>
                </footer>
            </div>
        `;
    },

    // Catch-all for registry items
    get(blueprint, props = {}) {
        const parts = blueprint.split('.');
        const method = parts[parts.length - 1];
        if (this[method]) return this[method](props);

        // Fallback to Molecule or Card if specific organism not found
        return Library.get('molecules.card', { title: `Organizm: ${method}`, content: 'Automatyczny placeholder organizmu.' });
    }
};
