import { Library } from '../library.js';

/**
 * TEMPLATES LIBRARY
 * Page-level layouts.
 */
export const Templates = {
    dashboard(props) {
        return `
            <div class="template-dashboard is-template" id="template-dashboard-default-default" style="display: flex; flex-direction: column; min-height: 800px; border: 1px solid var(--admin-border); background: white;">
                ${Library.get('organisms.navbar')}
                <div class="template-body" style="display: flex; flex: 1; overflow: hidden;">
                    <aside class="template-sidebar" style="background: var(--primitive-gray-50); width: 260px; border-right: 1px solid var(--admin-border);">
                        <div style="padding: var(--primitive-space-6);">
                            <nav style="display: flex; flex-direction: column; gap: var(--primitive-space-2);">
                                ${Library.get('atoms.button', { type: 'tertiary', content: '<i data-lucide="home"></i> Home' })}
                                ${Library.get('atoms.button', { type: 'primary', content: '<i data-lucide="users"></i> Zespół' })}
                                ${Library.get('atoms.button', { type: 'tertiary', content: '<i data-lucide="shopping-cart"></i> Produkty' })}
                                ${Library.get('atoms.button', { type: 'tertiary', content: '<i data-lucide="settings"></i> Ustawienia' })}
                            </nav>
                        </div>
                    </aside>
                    <main class="template-main" style="flex: 1; padding: var(--primitive-space-8); overflow-y: auto;">
                        ${Library.get('organisms.saas_user_management')}
                        <div style="margin-top: 40px;">
                            ${Library.get('organisms.analytics_grid')}
                        </div>
                    </main>
                </div>
            </div>
        `;
    },

    auth(props) {
        return `
            <div class="template-auth is-template" id="template-auth-default-default" style="min-height: 600px; display: flex; align-items: center; justify-content: center; background: var(--primitive-gray-50); border: 1px solid var(--admin-border);">
                <div class="auth-box">
                    <div class="molecule-card cmp" style="width: 100%; min-width: 360px; max-width: 400px; padding: var(--primitive-space-8); background: white; box-shadow: var(--admin-shadow); border-radius: var(--semantic-shape-radius-large);">
                        ${Library.get('atoms.heading', { type: 'h2', content: props.title || 'Witaj ponownie' })}
                        <p style="color: var(--semantic-color-text-muted); margin-bottom: var(--primitive-space-6);">Zaloguj się do swojego radosnego konta.</p>
                        <div style="display: flex; flex-direction: column; gap: var(--primitive-space-4);">
                            ${Library.get('molecules.inputGroup', { label: 'Email', value: 'uzytkownik@joy.ai' })}
                            ${Library.get('molecules.inputGroup', { label: 'Hasło', type: 'password', value: '********' })}
                            ${Library.get('atoms.button', { type: 'primary', content: 'Zaloguj się' })}
                        </div>
                        <div style="margin-top: var(--primitive-space-6); text-align: center; font-size: 0.875rem;">
                            Nie masz konta? ${Library.get('atoms.a', { content: 'Zarejestruj się' })}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    product_page(props) {
        return `
            <div class="template-product-page is-template" id="template-product_page-default-default" style="padding: 64px 24px; background: white; border: 1px solid var(--admin-border);">
                <div class="product-layout" style="max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
                    <div class="product-gallery">
                         <img src="https://picsum.photos/seed/joyproduct/600/600" style="width: 100%; border-radius: var(--semantic-shape-radius-large);" alt="Produkt">
                    </div>
                    <div class="product-info" style="display: flex; flex-direction: column; gap: var(--primitive-space-6);">
                        ${Library.get('atoms.heading', { type: 'h1', content: props.title || 'Super Produkt Joyful' })}
                        ${Library.get('molecules.ecommerce_price_tag', { price: '299.00', oldPrice: '399.00' })}
                        <p>${props.content || 'To jest najbardziej zaawansowany i radosny produkt w naszej kolekcji. Posiada certyfikat szczęścia i 100% czystej logiki kwantowej.'}</p>
                        <div class="actions flex-row">
                             ${Library.get('atoms.button', { type: 'primary', content: 'Dodaj do koszyka' })}
                             ${Library.get('atoms.icon_button', { type: 'secondary', content: '<i data-lucide="heart"></i>' })}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    article_page(props) {
        return `
            <div class="template-article is-template" id="template-article_page-default-default">
                ${Library.get('organisms.navbar')}
                <div class="article-container" style="max-width: 1000px; margin: 0 auto; padding: 64px 24px;">
                    <header style="margin-bottom: 48px;">
                        ${Library.get('atoms.badge', { type: 'secondary', content: 'Technologia' })}
                        <h1 style="font-size: 3.5rem; margin: 16px 0;">Przyszłość Radosnych Interfejsów</h1>
                        <div class="flex-row" style="gap: 16px; color: var(--admin-text-muted);">
                            <span>19 Maja 2024</span> • <span>5 min czytania</span>
                        </div>
                    </header>
                    <div style="font-size: 1.25rem; line-height: 1.8; color: var(--admin-text);">
                        <p style="font-weight: 600; font-size: 1.5rem; margin-bottom: 32px;">Interfejsy przyszłości nie będą tylko narzędziami, ale radosnymi towarzyszami naszej codziennej pracy i twórczości.</p>
                        <p>Wyobraź sobie świat, w którym każdy przycisk, każdy formularz i każda animacja są zaprojektowane tak, aby wywoływać uśmiech na Twojej twarzy. To nie jest utopia, to nasza wizja Atomic AI Design.</p>
                        <img src="https://picsum.photos/seed/article/800/400" style="width: 100%; border-radius: 16px; margin: 40px 0;" alt="Featured">
                        <p>Kluczem do tego sukcesu jest trójwarstwowa tokenizacja, która pozwala nam na nieskończoną elastyczność przy zachowaniu pełnej spójności wizualnej.</p>
                    </div>
                </div>
            </div>
        `;
    },
    checkout_page(props) {
        return `
            <div class="template-checkout is-template" id="template-checkout_page-default-default">
                ${Library.get('organisms.navbar')}
                <div style="max-width: 1200px; margin: 0 auto; padding: 48px 24px;">
                    <h1 style="margin-bottom: 32px;">Twój Koszyk</h1>
                    ${Library.get('organisms.checkout_steps')}
                </div>
            </div>
        `;
    },
    landing_page(props) {
        return `
            <div class="template-landing is-template" id="template-landing_page-default-default">
                ${Library.get('organisms.navbar')}
                <section style="padding: 100px 24px; text-align: center; background: linear-gradient(180deg, var(--primitive-blue-100) 0%, white 100%);">
                    <h1 style="font-size: 4rem; margin-bottom: 24px;">Projektuj z Radością</h1>
                    <p style="font-size: 1.5rem; color: var(--admin-text-muted); max-width: 700px; margin: 0 auto 48px auto;">
                        Najbardziej kompletna i elastyczna biblioteka komponentów HTML5 oparta na zasadach Atomic Design i logice kwantowej.
                    </p>
                    <div class="flex-row" style="justify-content: center; gap: 16px;">
                        ${Library.get('atoms.button', { type: 'primary', content: 'Zacznij teraz - za darmo' })}
                        ${Library.get('atoms.button', { type: 'secondary', content: 'Zobacz dokumentację' })}
                    </div>
                </section>
                <section style="padding: 80px 24px; max-width: 1200px; margin: 0 auto;">
                    ${Library.get('organisms.product_grid')}
                </section>
            </div>
        `;
    },
    task_dashboard(props) {
        return `
            <div class="template-task-dashboard is-template" id="template-task_dashboard-default-default" style="display: flex; flex-direction: column; min-height: 800px; border: 1px solid var(--admin-border); background: white;">
                ${Library.get('organisms.navbar')}
                <div style="flex: 1; overflow: hidden; padding: 24px; display: flex; flex-direction: column;">
                    <header class="flex-between" style="margin-bottom: 24px;">
                        <h1 style="margin:0">Zarządzanie Projektami</h1>
                        <div class="flex-row" style="gap:12px;">
                            ${Library.get('molecules.pills', { items: ['Wszystkie', 'Moje', 'Przypisane'] })}
                        </div>
                    </header>
                    <div style="flex: 1; overflow: auto;">
                        ${Library.get('organisms.sprint_board')}
                    </div>
                </div>
            </div>
        `;
    }
};
