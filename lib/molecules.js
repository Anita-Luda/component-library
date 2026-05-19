import { Library } from '../library.js';

/**
 * MOLECULES LIBRARY
 * Medium-level components built strictly from Atoms.
 */
export const Molecules = {
    inputGroup(props) {
        const label = Library.get('atoms.label', { content: props.label });
        const input = Library.get('atoms.input_raw', { type: props.type, state: props.state, content: props.value });
        const hint = props.hint ? `<small class="hint">${props.hint}</small>` : '';

        return `
            <div class="molecule-input-group cmp" role="group" id="molecule-input_group-default-default">
                ${label}
                ${input}
                ${hint}
            </div>
        `;
    },

    empty_state(props) {
        return `
            <div class="molecule-empty-state cmp is-molecule" style="flex-direction: column; align-items: center; justify-content: center; padding: 48px; text-align: center; background: white; border: 1px dashed var(--admin-border); width: 100%;">
                <div style="width: 64px; height: 64px; background: var(--primitive-gray-50); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: var(--admin-text-muted);">
                    <i data-lucide="package-search" style="width: 32px; height: 32px;"></i>
                </div>
                <h3 style="margin:0 0 8px 0;">Brak danych do wyświetlenia</h3>
                <p style="color: var(--admin-text-muted); max-width: 300px; margin-bottom: 24px;">Wygląda na to, że nie mamy jeszcze nic w tej sekcji. Dodaj swój pierwszy element!</p>
                ${Library.get('atoms.button', { type: 'primary', content: 'Dodaj teraz' })}
            </div>
        `;
    },

    skeleton_loader(props) {
        return `
            <div class="molecule-skeleton is-molecule" style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
                <div style="height: 24px; width: 60%; background: linear-gradient(90deg, #f0f2f5 25%, #e1e4e8 50%, #f0f2f5 75%); background-size: 200% 100%; border-radius: 4px; animation: shimmer 1.5s infinite;"></div>
                <div style="height: 100px; background: linear-gradient(90deg, #f0f2f5 25%, #e1e4e8 50%, #f0f2f5 75%); background-size: 200% 100%; border-radius: 8px; animation: shimmer 1.5s infinite;"></div>
                <style>@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }</style>
            </div>
        `;
    },

    toast(props) {
        return `
            <div class="molecule-toast cmp type-${props.type || 'success'} state-default" role="status" id="molecule-toast-default-default">
                <div class="toast-body">${props.content || 'Powiadomienie radosne.'}</div>
            </div>
        `;
    },

    searchBar(props) {
        const input = Library.get('atoms.input_raw', { content: props.placeholder || 'Szukaj...' });
        const button = Library.get('atoms.button', { type: 'primary', content: 'Szukaj' });

        return `
            <div class="molecule-search-bar cmp" role="search" id="molecule-search_bar-default-default">
                ${input}
                ${button}
            </div>
        `;
    },

    pagination(props) {
        const prev = Library.get('atoms.button', { type: 'secondary', content: '«' });
        const next = Library.get('atoms.button', { type: 'secondary', content: '»' });
        const page = Library.get('atoms.span', { content: 'Strona 1 z 10' });

        return `
            <nav class="molecule-pagination cmp" aria-label="Pagination" id="molecule-pagination-default-default">
                ${prev} ${page} ${next}
            </nav>
        `;
    },

    breadcrumbs(props) {
        const items = (props.items || ['Home', 'Kategoria', 'Produkt']).map(item =>
            Library.get('atoms.a', { content: item })
        ).join(' <span class="sep">/</span> ');

        return `<nav class="molecule-breadcrumbs cmp" aria-label="Breadcrumb" id="molecule-breadcrumbs-default-default">${items}</nav>`;
    },

    table(props) {
        const caption = props.caption || 'Tabela';
        return `<div class="molecule-table-wrapper cmp" id="molecule-table-default-default" role="group">${Library.get('atoms.table', { content: caption })}</div>`;
    },

    list(props) {
        const items = (props.items || [props.content || 'Element 1', 'Element 2', 'Element 3']).map(item =>
            Library.get('atoms.li', { content: item })
        ).join('');
        return `<div class="molecule-list-wrapper cmp" id="molecule-list-default-default" role="list">${Library.get('atoms.ul', { content: items })}</div>`;
    },

    card(props) {
        const title = props.title ? `<h3>${props.title}</h3>` : '';
        const body = props.content || props.body || 'Treść karty';
        return `
            <div class="molecule-card cmp state-default" role="article" id="molecule-card-default-default">
                ${title}
                <div class="card-body">${body}</div>
                ${props.footer ? `<div class="card-footer">${props.footer}</div>` : ''}
            </div>
        `;
    },

    form_field(props) {
        const label = props.label || 'Etykieta';
        const input = Library.get('atoms.input_raw', props);
        const id = props.id || `molecule-form_field-${props.type || 'default'}-${props.state || 'default'}`;
        return `
            <div class="molecule-form-field cmp type-${props.type || 'default'} state-${props.state || 'default'}" id="${id}">
                <label class="label">${label}</label>
                ${input}
                <small class="hint">Podpowiedź do pola</small>
            </div>
        `;
    },

    choice_field(props) {
        const atom = props.id && props.id.includes('checkbox') ? 'atoms.checkbox' : 'atoms.radio';
        const input = Library.get(atom, props);
        const id = props.id || `molecule-choice_field-${props.type || 'default'}-${props.state || 'default'}`;
        return `
            <div class="molecule-choice-field cmp type-${props.type || 'default'} state-${props.state || 'default'}" id="${id}">
                <label class="choice-label">${input} <span>${props.content || 'Opcja'}</span></label>
            </div>
        `;
    },

    alert(props) {
        const id = props.id || `molecule-alert-${props.type || 'primary'}-default`;
        const icon = props.type === 'error' ? 'alert-circle' : props.type === 'success' ? 'check-circle' : 'info';
        return `
            <div class="molecule-alert cmp type-${props.type || 'primary'} state-default" role="alert" id="${id}">
                <i data-lucide="${icon}"></i>
                <div class="alert-content">${props.content || 'Wiadomość systemowa'}</div>
            </div>
        `;
    },

    modal(props) {
        return `
            <div class="molecule-modal-overlay cmp state-default" id="molecule-modal-default-default" style="position: relative; z-index: 10;">
                <div class="molecule-modal" role="dialog" aria-modal="true" style="background: white; padding: var(--primitive-space-6); border-radius: var(--semantic-shape-radius-large); box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                    <header class="flex-between" style="margin-bottom: var(--primitive-space-4);">
                        <h3 style="margin:0">${props.title || 'Dialog'}</h3>
                        ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="x"></i>' })}
                    </header>
                    <div class="modal-body" style="margin-bottom: var(--primitive-space-6);">${props.content || 'Treść okna.'}</div>
                    <footer class="flex-row" style="justify-content: flex-end; gap: var(--primitive-space-3);">
                        ${Library.get('atoms.button', { type: 'tertiary', content: 'Anuluj' })}
                        ${Library.get('atoms.button', { type: 'primary', content: 'Zatwierdź' })}
                    </footer>
                </div>
            </div>
        `;
    },

    breadcrumb(props) { return this.breadcrumbs(props); },
    token_display(props) { return this.token_counter(props); },

    product_card(props) {
        return `
            <div class="molecule-product-card cmp is-molecule" style="flex-direction: column; align-items: stretch; padding: 0; overflow: hidden; width: 240px; background: white; border: 1px solid var(--admin-border); border-radius: 12px; transition: transform 0.2s;">
                <div style="position: relative;">
                    <img src="https://picsum.photos/seed/${props.title || 'Product'}/240/180" style="width: 100%; display: block;" alt="Product">
                    <div style="position: absolute; top: 12px; right: 12px;">
                        ${Library.get('atoms.icon_button', { type: 'secondary', content: '<i data-lucide="heart"></i>' })}
                    </div>
                </div>
                <div style="padding: 16px;">
                    <div style="font-weight: 700; font-size: 1rem; margin-bottom: 8px;">${props.title || 'Produkt Premium'}</div>
                    ${this.ecommerce_price_tag({ price: '199.00', oldPrice: '249.00' })}
                    <div style="margin-top: 16px;">
                        ${Library.get('atoms.button', { type: 'primary', content: 'Do koszyka', style: 'width: 100%' })}
                    </div>
                </div>
            </div>
        `;
    },

    tabs(props) {
        const items = (props.items || ['Aktywne', 'Zakończone', 'Archiwum']).map((item, i) =>
            `<button class="tab-item ${i===0 ? 'is-active' : ''}" role="tab" aria-selected="${i===0}" style="padding: 8px 16px; border: none; background: none; border-bottom: 2px solid ${i===0 ? 'var(--semantic-color-action-primary-bg)' : 'transparent'}; font-weight: ${i===0 ? '700' : '400'}; cursor: pointer;">${item}</button>`
        ).join('');
        return `<div class="molecule-tabs cmp" role="tablist" style="display: flex; gap: 8px; border-bottom: 1px solid var(--admin-border); width: 100%;">${items}</div>`;
    },

    pills(props) {
        const items = (props.items || ['Tag 1', 'Tag 2', 'Tag 3']).map((item, i) =>
            Library.get('atoms.badge', { type: i===0 ? 'primary' : 'tertiary', content: item })
        ).join('');
        return `<div class="molecule-pills cmp" style="display: flex; gap: 8px; border:none; background:none;">${items}</div>`;
    },

    accordion(props) {
        const items = Array(3).fill(0).map((_, i) => `
            <details style="border: 1px solid var(--admin-border); border-radius: 8px; margin-bottom: 8px; width: 100%;">
                <summary style="padding: 12px; font-weight: 600; cursor: pointer;">Sekcja ${i+1}</summary>
                <div style="padding: 12px; border-top: 1px solid var(--admin-border);">${props.content || 'Treść akordeonu rozwijana radosnym kliknięciem.'}</div>
            </details>
        `).join('');
        return `<div class="molecule-accordion cmp" style="flex-direction: column; align-items: stretch; border:none; background:none; width:100%;">${items}</div>`;
    },

    timeline(props) {
        const items = Array(3).fill(0).map((_, i) => `
            <div class="timeline-item" style="display: flex; gap: 16px; position: relative; padding-bottom: 24px;">
                <div class="dot" style="width: 12px; height: 12px; background: var(--primitive-blue-500); border-radius: 50%; margin-top: 6px; z-index: 1;"></div>
                ${i < 2 ? '<div class="line" style="position: absolute; left: 5px; top: 18px; bottom: 0; width: 2px; background: var(--admin-border);"></div>' : ''}
                <div>
                    <div style="font-weight: 700; font-size: 0.9rem;">Zdarzenie ${i+1}</div>
                    <div style="font-size: 0.8rem; color: var(--admin-text-muted);">12:00, Dzisiaj</div>
                </div>
            </div>
        `).join('');
        return `<div class="molecule-timeline cmp" style="flex-direction: column; align-items: start; border:none; background:none;">${items}</div>`;
    },

    stepper(props) {
        const steps = ['Koszyk', 'Dostawa', 'Płatność'].map((s, i) => `
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: ${i===0 ? 'var(--primitive-blue-500)' : 'var(--admin-border)'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem;">${i+1}</div>
                <span style="font-size: 0.85rem; font-weight: ${i===0 ? '700' : '400'};">${s}</span>
                ${i < 2 ? '<div style="width: 40px; height: 1px; background: var(--admin-border);"></div>' : ''}
            </div>
        `).join('');
        return `<div class="molecule-stepper cmp" style="gap: 16px; border:none; background:none;">${steps}</div>`;
    },

    otp_input(props) {
        const inputs = Array(4).fill(0).map(() =>
            `<input type="text" maxlength="1" style="width: 40px; height: 48px; text-align: center; font-size: 1.5rem; font-weight: 700; border: 1px solid var(--admin-border); border-radius: 8px;">`
        ).join('');
        return `<div class="molecule-otp cmp" style="gap: 12px; border:none; background:none;">${inputs}</div>`;
    },

    tree_item(props) {
        return `
            <div class="molecule-tree-item" style="padding-left: 20px;">
                <div class="flex-row" style="align-items: center; gap: 8px; padding: 4px 0;">
                    <i data-lucide="chevron-right" style="width: 16px;"></i>
                    <i data-lucide="folder" style="width: 16px; color: var(--primitive-blue-500);"></i>
                    <span>${props.content || 'Katalog'}</span>
                </div>
                <div class="tree-children" style="border-left: 1px solid var(--admin-border); margin-left: 7px;">
                     <div style="padding-left: 20px; padding: 4px 0 4px 20px;">
                        <i data-lucide="file-text" style="width: 16px; color: var(--admin-text-muted);"></i>
                        <span>index.html</span>
                     </div>
                </div>
            </div>
        `;
    },

    // AI Specific Molecules
    ai_typing_indicator(props) {
        return `
            <div class="molecule-ai-typing cmp streaming-dots" style="background: var(--primitive-gray-100); border:none; padding: 12px 20px; border-radius: 20px; width: fit-content;">
                <span>●</span><span>●</span><span>●</span>
            </div>
        `;
    },

    token_counter(props) {
        return `
            <div class="molecule-token-counter cmp" style="font-size: 0.75rem; gap: 8px; padding: 4px 12px; background: var(--primitive-gray-900); color: white; border-radius: 100px;">
                <i data-lucide="zap" style="width: 12px;"></i>
                <span>Tokens: 1,240 / 4,000</span>
            </div>
        `;
    },

    ai_citation(props) {
        return `
            <div class="molecule-ai-citation cmp" style="padding: 8px; gap: 8px; font-size: 0.8rem; background: var(--primitive-blue-100); border: 1px solid var(--primitive-blue-500); border-radius: 6px;">
                <span style="font-weight: 700; color: var(--primitive-blue-500);">[1]</span>
                <span>Dokumentacja Atomic AI v2.4</span>
            </div>
        `;
    },

    statistic(props) {
        return `
            <div class="molecule-statistic cmp" style="flex-direction: column; align-items: start; gap: 4px; padding: 20px; width: 200px;">
                <div style="font-size: 0.8rem; color: var(--admin-text-muted); font-weight: 600;">${props.label || 'Przychód'}</div>
                <div style="font-size: 1.75rem; font-weight: 800;">${props.value || '$42,000'}</div>
                <div style="font-size: 0.75rem; color: var(--primitive-green-500); font-weight: 700;">+12.4% vs last month</div>
            </div>
        `;
    },

    media_block(props) {
        return `
            <div class="molecule-media-block cmp" style="flex-direction: column; align-items: stretch; padding: 0; overflow: hidden; width: 300px;">
                <img src="https://picsum.photos/seed/${props.content}/300/200" style="width: 100%; display: block;" alt="Media">
                <div style="padding: 12px;">
                    <div style="font-weight: 700;">Tytuł mediów</div>
                    <div style="font-size: 0.8rem; color: var(--admin-text-muted);">Opis lub podpis dolny mediów.</div>
                </div>
            </div>
        `;
    },

    grid_layout(props) {
        return `
            <div class="molecule-grid-layout cmp is-molecule" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; width: 100%; border:none; background:none; padding:0;">
                ${Array(4).fill(0).map(() => `<div style="background: var(--primitive-gray-100); height: 100px; border-radius: 8px; border: 1px dashed var(--admin-border);"></div>`).join('')}
            </div>
        `;
    },

    bento_grid(props) {
        return `
            <div class="molecule-bento-grid cmp is-molecule" style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 120px); gap: 16px; width: 100%; border:none; background:none; padding:0;">
                <div style="grid-column: span 2; background: var(--primitive-blue-100); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primitive-blue-500); font-weight: 700;">Main Feature</div>
                <div style="background: var(--primitive-gray-100); border-radius: 12px;"></div>
                <div style="background: var(--primitive-gray-100); border-radius: 12px;"></div>
                <div style="grid-column: span 2; background: var(--primitive-gray-200); border-radius: 12px;"></div>
            </div>
        `;
    },

    masonry_layout(props) {
        return `
            <div class="molecule-masonry cmp is-molecule" style="display: flex; gap: 16px; width: 100%; border:none; background:none; padding:0;">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">
                    <div style="height: 150px; background: var(--primitive-gray-100); border-radius: 8px;"></div>
                    <div style="height: 100px; background: var(--primitive-gray-100); border-radius: 8px;"></div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">
                    <div style="height: 80px; background: var(--primitive-gray-100); border-radius: 8px;"></div>
                    <div style="height: 170px; background: var(--primitive-gray-100); border-radius: 8px;"></div>
                </div>
            </div>
        `;
    },

    // SaaS Specific Molecules
    saas_user_row(props) {
        const avatar = Library.get('atoms.avatar', { content: '<i data-lucide="user"></i>' });
        const name = Library.get('atoms.span', { content: props.name || 'Jan Kowalski' });
        const email = Library.get('atoms.span', { content: props.email || 'jan@example.com' });
        const role = Library.get('atoms.badge', { type: 'secondary', content: props.role || 'Admin' });
        const actions = Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="more-horizontal"></i>' });

        return `
            <div class="saas-user-row cmp is-molecule" id="molecule-saas_user_row-default-default">
                <div class="flex-row" style="align-items: center; gap: var(--primitive-space-4);">
                    ${avatar}
                    <div style="display: flex; flex-direction: column;">
                        <strong>${name}</strong>
                        <small style="color: var(--semantic-color-text-muted);">${email}</small>
                    </div>
                </div>
                <div class="flex-row" style="align-items: center; gap: var(--primitive-space-4);">
                    ${role}
                    ${actions}
                </div>
            </div>
        `;
    },

    saas_filter_bar(props) {
        return `
            <div class="saas-filter-bar cmp is-molecule" id="molecule-saas_filter_bar-default-default">
                ${Library.get('atoms.input_raw', { placeholder: 'Szukaj...' })}
                <div class="pills-row">
                    ${Library.get('atoms.badge', { type: 'primary', content: 'Wszystkie' })}
                    ${Library.get('atoms.badge', { type: 'tertiary', content: 'Aktywne' })}
                    ${Library.get('atoms.badge', { type: 'tertiary', content: 'Oczekujące' })}
                </div>
                <div style="margin-left: auto;">
                     ${Library.get('atoms.button', { type: 'secondary', content: '<i data-lucide="filter"></i> Filtruj' })}
                </div>
            </div>
        `;
    },

    // E-commerce Molecules
    cart_item(props) {
        return `
            <div class="cart-item cmp is-molecule" id="molecule-cart_item-default-default">
                <img src="https://picsum.photos/seed/${props.name}/60/60" class="item-thumb" alt="Produkt">
                <div style="flex: 1;">
                    <div style="font-weight: 700;">${props.name || 'Produkt Joyful'}</div>
                    <div style="font-size: 0.8rem; color: var(--semantic-color-text-muted);">Rozmiar: M, Kolor: Niebieski</div>
                </div>
                <div class="item-qty">
                    ${Library.get('atoms.input_raw', { type: 'default', content: '1' })}
                </div>
                <div class="item-price">129.00 PLN</div>
                ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="trash-2"></i>' })}
            </div>
        `;
    },

    ecommerce_price_tag(props) {
        return `
            <div class="price-tag cmp is-molecule" id="molecule-price_tag-default-default">
                <span class="price-current">${props.price || '99.99'} PLN</span>
                <span class="price-old">${props.oldPrice || '149.99'} PLN</span>
            </div>
        `;
    },

    // Task Management Molecules
    task_card(props) {
        return `
            <div class="task-card cmp is-molecule" id="molecule-task_card-default-default" role="article">
                <div style="font-weight: 700; margin-bottom: var(--primitive-space-2);">${props.title || 'Zadanie do wykonania'}</div>
                <div style="font-size: 0.875rem; color: var(--semantic-color-text-muted);">${props.desc || 'Krótki opis zadania w projekcie.'}</div>
                <div class="task-meta">
                    <div class="status-pill cmp" style="font-size: 0.7rem; padding: 2px 8px;">W TOKU</div>
                    <img src="https://i.pravatar.cc/24?u=${props.title}" class="assignee" style="border-radius: 50%;" alt="User">
                </div>
            </div>
        `;
    }
};
