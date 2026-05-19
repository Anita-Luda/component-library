import { Library } from '../library.js';

/**
 * TEMPLATES LIBRARY
 * Page-level layouts.
 */
export const Templates = {
    dashboard(props) {
        return `
            <div class="template-dashboard is-template" id="template-dashboard-default-default">
                <div class="template-body">
                    <aside class="template-sidebar" style="background: var(--primitive-gray-50);">
                        <div style="padding: var(--primitive-space-6);">
                            <h2 style="font-size: 1.2rem; margin-bottom: var(--primitive-space-6);">Joyful Dashboard</h2>
                            <nav style="display: flex; flex-direction: column; gap: var(--primitive-space-2);">
                                ${Library.get('atoms.button', { type: 'tertiary', content: '<i data-lucide="home"></i> Home' })}
                                ${Library.get('atoms.button', { type: 'primary', content: '<i data-lucide="users"></i> Zespół' })}
                                ${Library.get('atoms.button', { type: 'tertiary', content: '<i data-lucide="shopping-cart"></i> Produkty' })}
                                ${Library.get('atoms.button', { type: 'tertiary', content: '<i data-lucide="settings"></i> Ustawienia' })}
                            </nav>
                        </div>
                    </aside>
                    <main class="template-main">
                        ${Library.get('organisms.saas_user_management')}
                    </main>
                </div>
            </div>
        `;
    },

    auth(props) {
        return `
            <div class="template-auth is-template" id="template-auth-default-default">
                <div class="auth-box">
                    <div class="molecule-card cmp" style="width: 100%; max-width: 400px; padding: var(--primitive-space-8);">
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
            <div class="template-product-page is-template" id="template-product_page-default-default">
                <div class="product-layout">
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

    article_page(props) { return this.dashboard({ title: 'Artykuł', body: 'Treść artykułu' }); },
    checkout_page(props) { return this.dashboard({ title: 'Koszyk', body: 'Twój koszyk' }); },
    landing_page(props) { return this.dashboard({ title: 'Witaj', body: 'Odkryj radosną bibliotekę' }); },
    task_dashboard(props) { return this.dashboard({ title: 'Zadania', body: 'Twoje zadania na dziś' }); }
};
