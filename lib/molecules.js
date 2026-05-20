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

    carousel(props) {
        return `
            <div class="molecule-carousel cmp" style="flex-direction: column; align-items: stretch; padding: 0; width: 400px; position: relative; border: 1px solid var(--admin-border); border-radius: 12px; overflow: hidden;">
                <div class="carousel-track" style="display: flex; width: 100%; background: var(--primitive-gray-100); height: 200px; align-items: center; justify-content: center;">
                     <img src="https://picsum.photos/seed/${props.content}/400/200" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="carousel-nav" style="position: absolute; top: 50%; width: 100%; display: flex; justify-content: space-between; transform: translateY(-50%); padding: 0 16px; pointer-events: none;">
                    <button class="cmp button" style="pointer-events: auto; width: 32px; height: 32px; padding: 0; justify-content: center; border-radius: 50%;"><i data-lucide="chevron-left"></i></button>
                    <button class="cmp button" style="pointer-events: auto; width: 32px; height: 32px; padding: 0; justify-content: center; border-radius: 50%;"><i data-lucide="chevron-right"></i></button>
                </div>
                <div style="padding: 16px; text-align: center;">
                    <div style="display: flex; gap: 8px; justify-content: center;">
                        <span style="width: 8px; height: 8px; background: var(--admin-accent); border-radius: 50%;"></span>
                        <span style="width: 8px; height: 8px; background: var(--admin-border); border-radius: 50%;"></span>
                        <span style="width: 8px; height: 8px; background: var(--admin-border); border-radius: 50%;"></span>
                    </div>
                </div>
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

    select(props) {
        return `
            <div class="molecule-select-group cmp" style="flex-direction: column; align-items: stretch; gap: 8px; width: 100%;">
                ${Library.get('atoms.label', { content: props.label || 'Wybierz kategorię' })}
                <div style="position: relative; display: flex; align-items: center;">
                    ${Library.get('atoms.select_raw', { state: props.state, content: '<option>Opcja 1</option><option>Opcja 2</option>' })}
                </div>
            </div>
        `;
    },

    bottom_nav(props) {
        const items = ['Home', 'Search', 'Notifications', 'Profile'].map((item, i) => `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; color: ${i===0 ? 'var(--admin-accent)' : 'var(--admin-text-muted)'}; cursor: pointer;">
                <i data-lucide="${item.toLowerCase() === 'home' ? 'home' : item.toLowerCase() === 'search' ? 'search' : item.toLowerCase() === 'notifications' ? 'bell' : 'user'}" style="width: 20px;"></i>
                <span style="font-size: 0.7rem; font-weight: 600;">${item}</span>
            </div>
        `).join('');
        return `
            <nav class="molecule-bottom-nav cmp" style="display: flex; justify-content: space-around; padding: 12px; background: white; border: 1px solid var(--admin-border); border-radius: 100px; width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                ${items}
            </nav>
        `;
    },

    hamburger_menu(props) {
        return `
            <button class="molecule-hamburger cmp" style="width: 48px; height: 48px; padding: 0; justify-content: center; border-radius: 8px; flex-direction: column; gap: 4px; border: 1px solid var(--admin-border);">
                <span style="width: 24px; height: 2px; background: currentColor;"></span>
                <span style="width: 24px; height: 2px; background: currentColor;"></span>
                <span style="width: 24px; height: 2px; background: currentColor;"></span>
            </button>
        `;
    },

    context_menu(props) {
        return `
            <ul class="molecule-context-menu cmp" style="flex-direction: column; align-items: stretch; width: 180px; background: white; border: 1px solid var(--admin-border); border-radius: 8px; padding: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); list-style: none;">
                <li style="padding: 8px 12px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 8px;"><i data-lucide="edit-2" style="width:14px;"></i> Edytuj</li>
                <li style="padding: 8px 12px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 8px;"><i data-lucide="copy" style="width:14px;"></i> Duplikuj</li>
                <li style="width: 100%; height: 1px; background: var(--admin-border); margin: 4px 0;"></li>
                <li style="padding: 8px 12px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 8px; color: var(--primitive-red-500);"><i data-lucide="trash-2" style="width:14px;"></i> Usuń</li>
            </ul>
        `;
    },

    command_palette(props) {
        return `
            <div class="molecule-command-palette cmp" style="flex-direction: column; align-items: stretch; width: 100%; max-width: 500px; background: white; border: 1px solid var(--admin-border); border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.15); overflow: hidden;">
                <div style="padding: 16px; border-bottom: 1px solid var(--admin-border); display: flex; align-items: center; gap: 12px;">
                    <i data-lucide="search" style="color: var(--admin-text-muted);"></i>
                    <input type="text" placeholder="Wpisz polecenie lub szukaj..." style="border:none; outline:none; flex: 1; font-size: 1rem;">
                    ${Library.get('atoms.badge', { type: 'tertiary', content: 'ESC' })}
                </div>
                <div style="padding: 8px;">
                    <div style="font-size: 0.7rem; font-weight: 700; color: var(--admin-text-muted); padding: 8px 12px; text-transform: uppercase;">Szybkie akcje</div>
                    <div style="padding: 10px 12px; border-radius: 8px; background: var(--primitive-blue-500); color: white; display: flex; align-items: center; gap: 12px; cursor: pointer;">
                        <i data-lucide="plus-circle" style="width: 18px;"></i> Nowy projekt
                    </div>
                    <div style="padding: 10px 12px; border-radius: 8px; display: flex; align-items: center; gap: 12px; cursor: pointer;">
                        <i data-lucide="settings" style="width: 18px;"></i> Ustawienia konta
                    </div>
                </div>
            </div>
        `;
    },

    dock(props) {
        const items = ['Layout', 'Type', 'Colors', 'Assets', 'Publish'].map((item, i) => `
            <div style="width: 48px; height: 48px; background: white; border: 1px solid var(--admin-border); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.2s;">
                <i data-lucide="${i===0 ? 'grid' : i===1 ? 'type' : i===2 ? 'palette' : i===3 ? 'image' : 'send'}" style="width: 24px;"></i>
            </div>
        `).join('');
        return `
            <div class="molecule-dock cmp" style="gap: 12px; padding: 12px; background: var(--primitive-gray-50); border: 1px solid var(--admin-border); border-radius: 24px; width: fit-content; margin: 0 auto;">
                ${items}
            </div>
        `;
    },

    tooltip(props) {
        return `
            <div style="position: relative; padding: 20px;">
                ${Library.get('atoms.button', { type: 'secondary', content: 'Hover me' })}
                <div class="molecule-tooltip cmp" style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 12px; background: var(--primitive-gray-900); color: white; padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; white-space: nowrap; z-index: 10;">
                    To jest radosny tooltip!
                    <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: var(--primitive-gray-900);"></div>
                </div>
            </div>
        `;
    },

    popover(props) {
        return `
            <div style="position: relative; padding: 20px;">
                ${Library.get('atoms.button', { type: 'primary', content: 'Kliknij' })}
                <div class="molecule-popover cmp" style="position: absolute; top: 100%; left: 0; margin-top: 12px; width: 240px; background: white; border: 1px solid var(--admin-border); border-radius: 12px; padding: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); z-index: 10;">
                    <h4 style="margin: 0 0 8px 0;">Szybki podgląd</h4>
                    <p style="font-size: 0.8rem; color: var(--admin-text-muted); margin-bottom: 16px;">Tutaj znajdziesz szczegółowe informacje o wybranym elemencie Twojego projektu.</p>
                    ${Library.get('atoms.button', { type: 'secondary', content: 'Dowiedz się więcej', style: 'width: 100%' })}
                </div>
            </div>
        `;
    },

    progress_bar(props) {
        const value = props.value || 65;
        return `
            <div class="molecule-progress cmp" style="flex-direction: column; align-items: stretch; gap: 8px; width: 100%;">
                <div class="flex-between" style="font-size: 0.8rem; font-weight: 700;">
                    <span>Postęp zadania</span>
                    <span>${value}%</span>
                </div>
                <div style="height: 8px; background: var(--primitive-gray-200); border-radius: 100px; overflow: hidden;">
                    <div style="width: ${value}%; height: 100%; background: var(--primitive-green-500); transition: width 0.3s ease;"></div>
                </div>
            </div>
        `;
    },

    spinner(props) {
        return `
            <div class="molecule-spinner cmp" style="justify-content: center; padding: 20px;">
                <div class="spinner-icon" style="width: 40px; height: 40px; border: 4px solid var(--primitive-gray-200); border-top-color: var(--admin-accent); border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
            </div>
        `;
    },

    chip(props) {
        return `
            <div class="molecule-chip cmp" style="display: flex; align-items: center; gap: 8px; padding: 4px 12px; background: var(--primitive-gray-100); border: 1px solid var(--admin-border); border-radius: 100px; width: fit-content;">
                <span style="font-size: 0.85rem; font-weight: 600;">${props.content || 'Tag radosny'}</span>
                <i data-lucide="x" style="width: 14px; cursor: pointer; color: var(--admin-text-muted);"></i>
            </div>
        `;
    },

    avatar_group(props) {
        const avatars = [1,2,3].map(i => `
            <div style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; background: var(--primitive-blue-100); display: flex; align-items: center; justify-content: center; margin-left: -8px;">
                <i data-lucide="user" style="width: 16px;"></i>
            </div>
        `).join('');
        return `
            <div class="molecule-avatar-group cmp" style="display: flex; padding-left: 8px; border:none; background:none;">
                ${avatars}
                <div style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; background: var(--primitive-gray-200); display: flex; align-items: center; justify-content: center; margin-left: -8px; font-size: 0.7rem; font-weight: 700;">+5</div>
            </div>
        `;
    },

    kpi_tile(props) {
        return `
            <div class="molecule-kpi cmp" style="flex-direction: column; align-items: stretch; padding: 24px; min-width: 200px; background: white; border: 1px solid var(--admin-border); border-radius: 16px; box-shadow: var(--admin-shadow);">
                <div class="flex-between" style="margin-bottom: 12px;">
                    <div style="width: 40px; height: 40px; background: var(--primitive-blue-100); color: var(--primitive-blue-600); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="trending-up"></i>
                    </div>
                    <span style="font-size: 0.75rem; color: var(--primitive-green-500); font-weight: 700; background: var(--primitive-green-100); padding: 2px 8px; border-radius: 100px;">+18%</span>
                </div>
                <div style="font-size: 0.85rem; color: var(--admin-text-muted); font-weight: 600;">${props.label || 'Aktywni użytkownicy'}</div>
                <div style="font-size: 2rem; font-weight: 800; margin-top: 4px;">${props.value || '12,480'}</div>
            </div>
        `;
    },

    activity_item(props) {
        return `
            <div class="molecule-activity cmp" style="gap: 16px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--admin-border);">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primitive-gray-100); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i data-lucide="user" style="width: 20px;"></i>
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.9rem;"><strong>Jan Kowalski</strong> ${props.content || 'dodał nowy komentarz w projekcie'}</div>
                    <div style="font-size: 0.75rem; color: var(--admin-text-muted);">2 godziny temu</div>
                </div>
            </div>
        `;
    },

    terminal_block(props) {
        return `
            <div class="molecule-terminal cmp" style="flex-direction: column; align-items: stretch; background: #000; border-radius: 8px; overflow: hidden; width: 100%; color: #0f0; font-family: 'Courier New', monospace; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <div style="background: #333; padding: 6px 12px; display: flex; gap: 6px;">
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: #ff5f56;"></span>
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: #ffbd2e;"></span>
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: #27c93f;"></span>
                </div>
                <div style="padding: 16px; font-size: 0.85rem;">
                    <div>$ npm install @joy/core</div>
                    <div style="color: #888;">> downloading dependencies...</div>
                    <div>$ joy start</div>
                    <div style="color: #fff;">Server running at http://localhost:3000</div>
                    <div style="animation: blink 1s step-end infinite;">_</div>
                </div>
                <style>@keyframes blink { 50% { opacity: 0; } }</style>
            </div>
        `;
    },

    date_picker(props) {
        return `
            <div class="molecule-date-picker cmp" style="flex-direction: column; align-items: stretch; gap: 8px; width: 100%;">
                ${Library.get('atoms.label', { content: props.label || 'Wybierz datę' })}
                <div style="position: relative;">
                    ${Library.get('atoms.input_raw', { type: 'default', content: '2024-05-19' })}
                    <i data-lucide="calendar" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 18px; color: var(--admin-text-muted); pointer-events: none;"></i>
                </div>
            </div>
        `;
    },

    time_picker(props) {
        return `
            <div class="molecule-time-picker cmp" style="flex-direction: column; align-items: stretch; gap: 8px; width: 100%;">
                ${Library.get('atoms.label', { content: props.label || 'Wybierz godzinę' })}
                <div style="position: relative;">
                    ${Library.get('atoms.input_raw', { type: 'default', content: '12:00' })}
                    <i data-lucide="clock" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 18px; color: var(--admin-text-muted); pointer-events: none;"></i>
                </div>
            </div>
        `;
    },

    color_picker(props) {
        return `
            <div class="molecule-color-picker cmp" style="align-items: center; gap: 12px; width: 100%;">
                <div style="width: 42px; height: 42px; border-radius: 10px; background: var(--primitive-blue-500); border: 3px solid white; box-shadow: 0 0 0 1px var(--admin-border); cursor: pointer; flex-shrink: 0;"></div>
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 0.9rem;">${props.label || 'Główny kolor'}</div>
                    <code style="font-size: 0.8rem; color: var(--admin-text-muted);">#004b9c</code>
                </div>
                ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="copy"></i>' })}
            </div>
        `;
    },

    slider(props) {
        return `
            <div class="molecule-slider cmp" style="flex-direction: column; align-items: stretch; gap: 12px; width: 100%;">
                <div class="flex-between">
                    ${Library.get('atoms.label', { content: props.label || 'Głośność' })}
                    <span style="font-weight: 700; font-size: 0.9rem;">75%</span>
                </div>
                ${Library.get('atoms.range_raw', { state: props.state })}
            </div>
        `;
    },

    rating_input(props) {
        const stars = Array(5).fill(0).map((_, i) =>
            `<i data-lucide="star" style="width: 24px; height: 24px; cursor: pointer; fill: ${i < 4 ? 'var(--primitive-yellow-400)' : 'none'}; color: ${i < 4 ? 'var(--primitive-yellow-400)' : 'var(--admin-border)'};"></i>`
        ).join('');
        return `
            <div class="molecule-rating cmp" style="flex-direction: column; align-items: start; gap: 8px;">
                ${Library.get('atoms.label', { content: props.label || 'Ocena produktu' })}
                <div style="display: flex; gap: 4px;">${stars}</div>
            </div>
        `;
    },

    tag_input(props) {
        return this.multi_select({ label: props.label || 'Tagi' });
    },

    signature_pad(props) {
        return `
            <div class="molecule-signature cmp" style="flex-direction: column; align-items: stretch; gap: 8px; width: 100%;">
                ${Library.get('atoms.label', { content: props.label || 'Podpis elektroniczny' })}
                <div style="height: 120px; background: white; border: 1px solid var(--admin-border); border-radius: 8px; position: relative; cursor: crosshair;">
                    <canvas style="width: 100%; height: 100%;"></canvas>
                    <div style="position: absolute; bottom: 8px; right: 8px;">
                        ${Library.get('atoms.button', { type: 'tertiary', content: 'Wyczyść' })}
                    </div>
                </div>
            </div>
        `;
    },

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

    combobox(props) {
        return `
            <div class="molecule-combobox cmp" style="flex-direction: column; align-items: stretch; gap: 8px; position: relative; width: 100%;">
                ${Library.get('atoms.label', { content: props.label || 'Wybierz opcję' })}
                <div style="position: relative; display: flex; align-items: center;">
                    ${Library.get('atoms.input_raw', { placeholder: props.placeholder || 'Szukaj lub wybierz...', state: props.state })}
                    <i data-lucide="chevrons-up-down" style="position: absolute; right: 12px; width: 16px; color: var(--admin-text-muted); pointer-events: none;"></i>
                </div>
                ${props.state === 'focus' || props.state === 'active' ? `
                    <ul role="listbox" style="position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid var(--admin-border); border-radius: 8px; margin-top: 4px; padding: 4px; z-index: 10; box-shadow: 0 4px 12px rgba(0,0,0,0.1); list-style: none;">
                        <li role="option" style="padding: 8px 12px; border-radius: 4px; cursor: pointer; background: var(--primitive-blue-100); color: var(--primitive-blue-700); font-weight: 600;">Opcja A</li>
                        <li role="option" style="padding: 8px 12px; border-radius: 4px; cursor: pointer;">Opcja B</li>
                        <li role="option" style="padding: 8px 12px; border-radius: 4px; cursor: pointer;">Opcja C</li>
                    </ul>
                ` : ''}
            </div>
        `;
    },

    multi_select(props) {
        return `
            <div class="molecule-multi-select cmp" style="flex-direction: column; align-items: stretch; gap: 8px; width: 100%;">
                ${Library.get('atoms.label', { content: props.label || 'Tagi' })}
                <div style="display: flex; flex-wrap: wrap; gap: 6px; padding: 6px; border: 1px solid var(--admin-border); border-radius: 8px; background: white; min-height: 42px;">
                    ${Library.get('atoms.badge', { type: 'secondary', content: 'Design <i data-lucide="x" style="width:12px; cursor:pointer;"></i>' })}
                    ${Library.get('atoms.badge', { type: 'secondary', content: 'Code <i data-lucide="x" style="width:12px; cursor:pointer;"></i>' })}
                    <input type="text" placeholder="Dodaj..." style="border:none; outline:none; flex: 1; min-width: 60px; font-size: 0.9rem;">
                </div>
            </div>
        `;
    },

    file_upload(props) {
        return `
            <div class="molecule-file-upload cmp" style="flex-direction: column; align-items: stretch; gap: 12px; width: 100%;">
                ${Library.get('atoms.label', { content: props.label || 'Załącz plik' })}
                <div style="border: 2px dashed var(--admin-border); border-radius: 12px; padding: 32px; text-align: center; background: var(--primitive-gray-50); cursor: pointer; transition: all 0.2s;">
                    <i data-lucide="upload-cloud" style="width: 48px; height: 48px; color: var(--admin-text-muted); margin-bottom: 12px;"></i>
                    <div style="font-weight: 700;">Przeciągnij i upuść plik</div>
                    <div style="font-size: 0.8rem; color: var(--admin-text-muted); margin-top: 4px;">PNG, JPG lub PDF do 10MB</div>
                </div>
            </div>
        `;
    },

    rich_text_editor(props) {
        return `
            <div class="molecule-editor cmp" style="flex-direction: column; align-items: stretch; border: 1px solid var(--admin-border); border-radius: 12px; overflow: hidden; width: 100%;">
                <div class="editor-toolbar" style="padding: 8px; background: var(--primitive-gray-50); border-bottom: 1px solid var(--admin-border); display: flex; gap: 4px;">
                    ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="bold"></i>' })}
                    ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="italic"></i>' })}
                    ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="list"></i>' })}
                    <div style="width: 1px; background: var(--admin-border); margin: 4px;"></div>
                    ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="link"></i>' })}
                    ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="image"></i>' })}
                </div>
                <div class="editor-content" contenteditable="true" style="padding: 16px; min-height: 150px; background: white; outline: none;">
                    <p>Zacznij pisać radosną treść...</p>
                </div>
            </div>
        `;
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

    code_block(props) {
        return `
            <div class="molecule-code-block cmp" style="flex-direction: column; align-items: stretch; background: #1e1e1e; border-radius: 8px; overflow: hidden; width: 100%; color: #d4d4d4; font-family: monospace;">
                <div class="code-header" style="padding: 8px 16px; background: #333; display: flex; justify-content: space-between; font-size: 0.8rem;">
                    <span>${props.title || 'script.js'}</span>
                    <i data-lucide="copy" style="width: 14px; cursor: pointer;"></i>
                </div>
                <pre style="padding: 16px; margin: 0; overflow-x: auto;"><code>${props.content || 'const joy = () => {\n  console.log("Radość!");\n};'}</code></pre>
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
    },

    // SaaS Specialized Molecules
    saas_billing_plan(props) {
        return `
            <div class="saas-billing-plan cmp is-molecule" style="flex-direction: column; align-items: stretch; padding: 32px; border: 2px solid ${props.type === 'primary' ? 'var(--admin-accent)' : 'var(--admin-border)'}; border-radius: 20px; background: white; width: 300px; position: relative;">
                ${props.type === 'primary' ? '<span style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--admin-accent); color: white; padding: 4px 12px; border-radius: 100px; font-size: 0.7rem; font-weight: 800;">POLECANE</span>' : ''}
                <div style="font-weight: 800; font-size: 1.25rem; margin-bottom: 8px;">${props.title || 'Pro Plan'}</div>
                <div style="display: flex; align-items: baseline; gap: 4px; margin-bottom: 24px;">
                    <span style="font-size: 2.5rem; font-weight: 800;">$49</span>
                    <span style="color: var(--admin-text-muted);">/msc</span>
                </div>
                <ul style="list-style: none; padding: 0; margin: 0 0 32px 0; display: flex; flex-direction: column; gap: 12px;">
                    <li style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem;"><i data-lucide="check" style="width:16px; color: var(--primitive-green-500);"></i> Nieograniczone projekty</li>
                    <li style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem;"><i data-lucide="check" style="width:16px; color: var(--primitive-green-500);"></i> 50GB przestrzeni</li>
                    <li style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem;"><i data-lucide="check" style="width:16px; color: var(--primitive-green-500);"></i> Wsparcie 24/7</li>
                </ul>
                ${Library.get('atoms.button', { type: props.type === 'primary' ? 'primary' : 'secondary', content: 'Wybierz plan', style: 'width: 100%' })}
            </div>
        `;
    },

    saas_webhook_item(props) {
        return `
            <div class="saas-webhook-item cmp is-molecule" style="gap: 16px; align-items: center; padding: 16px; background: white; border: 1px solid var(--admin-border); border-radius: 12px; width: 100%;">
                <div style="width: 40px; height: 40px; background: var(--primitive-gray-100); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i data-lucide="webhook" style="width: 20px;"></i>
                </div>
                <div style="flex: 1; overflow: hidden;">
                    <div style="font-weight: 700; font-size: 0.9rem;">Order Created Notification</div>
                    <code style="font-size: 0.75rem; color: var(--admin-text-muted); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">https://api.myapp.com/webhooks/orders</code>
                </div>
                <div class="flex-row" style="gap: 8px;">
                    ${Library.get('atoms.badge', { type: 'success', content: 'Active' })}
                    ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="edit-2"></i>' })}
                    ${Library.get('atoms.icon_button', { type: 'tertiary', content: '<i data-lucide="trash-2"></i>' })}
                </div>
            </div>
        `;
    },

    saas_feature_flag(props) {
        return `
            <div class="saas-feature-flag cmp is-molecule" style="justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--admin-border); width: 100%;">
                <div style="display: flex; flex-direction: column;">
                    <div style="font-weight: 700;">Beta: New Dashboard Layout</div>
                    <div style="font-size: 0.8rem; color: var(--admin-text-muted);">Enables the experimental grid-based layout for all users.</div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    ${Library.get('atoms.badge', { type: 'secondary', content: 'v2.4.0' })}
                    <div role="switch" aria-checked="true" style="width: 44px; height: 24px; background: var(--admin-accent); border-radius: 100px; position: relative; cursor: pointer;">
                        <div style="width: 18px; height: 18px; background: white; border-radius: 50%; position: absolute; right: 3px; top: 3px;"></div>
                    </div>
                </div>
            </div>
        `;
    },

    saas_settings_section(props) {
        return `
            <div class="saas-settings-section cmp is-molecule" style="flex-direction: column; align-items: stretch; gap: 24px; width: 100%; max-width: 800px; padding: 32px; background: white; border: 1px solid var(--admin-border); border-radius: 16px;">
                <header>
                    <h3 style="margin:0 0 4px 0;">${props.title || 'Ustawienia Profilu'}</h3>
                    <p style="margin:0; color: var(--admin-text-muted); font-size: 0.9rem;">Zarządzaj swoimi danymi osobowymi i preferencjami konta.</p>
                </header>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                         ${this.inputGroup({ label: 'Imię', value: 'Jan' })}
                         ${this.inputGroup({ label: 'Nazwisko', value: 'Kowalski' })}
                    </div>
                    ${this.inputGroup({ label: 'Email', value: 'jan@joy.ai' })}
                </div>
                <footer class="flex-row" style="justify-content: flex-end; gap: 12px; border-top: 1px solid var(--admin-border); padding-top: 24px; margin-top: 8px;">
                    ${Library.get('atoms.button', { type: 'tertiary', content: 'Anuluj' })}
                    ${Library.get('atoms.button', { type: 'primary', content: 'Zapisz zmiany' })}
                </footer>
            </div>
        `;
    },

    // E-commerce Specialized Molecules
    ecommerce_variant_selector(props) {
        return `
            <div class="ecommerce-variant-selector cmp is-molecule" style="flex-direction: column; align-items: stretch; gap: 12px; width: 100%;">
                <div style="font-weight: 700; font-size: 0.85rem;">WYBIERZ KOLOR</div>
                <div class="flex-row" style="gap: 8px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: #000; border: 2px solid var(--admin-accent); cursor: pointer; padding: 2px;"><div style="width: 100%; height: 100%; border-radius: 50%; border: 2px solid white;"></div></div>
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: #ccc; cursor: pointer;"></div>
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: #004b9c; cursor: pointer;"></div>
                </div>
                <div style="font-weight: 700; font-size: 0.85rem; margin-top: 8px;">ROZMIAR</div>
                <div class="flex-row" style="gap: 8px;">
                    ${Library.get('atoms.button', { type: 'secondary', content: 'S', style: 'min-width: 44px' })}
                    ${Library.get('atoms.button', { type: 'primary', content: 'M', style: 'min-width: 44px' })}
                    ${Library.get('atoms.button', { type: 'secondary', content: 'L', style: 'min-width: 44px' })}
                </div>
            </div>
        `;
    },

    ecommerce_order_summary(props) {
        return `
            <div class="ecommerce-order-summary cmp is-molecule" style="flex-direction: column; align-items: stretch; gap: 16px; padding: 24px; background: var(--primitive-gray-50); border-radius: 16px; width: 100%; max-width: 360px;">
                <h3 style="margin:0">Podsumowanie</h3>
                <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem;">
                    <div class="flex-between"><span>Wartość produktów</span><span>258.00 PLN</span></div>
                    <div class="flex-between"><span>Dostawa</span><span>15.00 PLN</span></div>
                    <div class="flex-between" style="color: var(--primitive-green-500);"><span>Zniżka (JOY10)</span><span>-25.80 PLN</span></div>
                </div>
                <div style="height: 1px; background: var(--admin-border);"></div>
                <div class="flex-between" style="font-weight: 800; font-size: 1.25rem;">
                    <span>Razem</span>
                    <span>247.20 PLN</span>
                </div>
                ${Library.get('atoms.button', { type: 'primary', content: 'Przejdź do płatności', style: 'width: 100%; margin-top: 8px;' })}
            </div>
        `;
    },

    ecommerce_payment_selector(props) {
        return `
            <div class="ecommerce-payment-selector cmp is-molecule" style="flex-direction: column; align-items: stretch; gap: 12px; width: 100%;">
                <div style="padding: 16px; border: 2px solid var(--admin-accent); border-radius: 12px; background: white; display: flex; align-items: center; gap: 16px; cursor: pointer;">
                    <div style="width: 20px; height: 20px; border-radius: 50%; border: 6px solid var(--admin-accent); flex-shrink: 0;"></div>
                    <i data-lucide="credit-card" style="width: 24px;"></i>
                    <div style="flex: 1; font-weight: 700;">Karta płatnicza</div>
                </div>
                <div style="padding: 16px; border: 1px solid var(--admin-border); border-radius: 12px; background: white; display: flex; align-items: center; gap: 16px; cursor: pointer;">
                    <div style="width: 20px; height: 20px; border-radius: 50%; border: 1px solid var(--admin-border); flex-shrink: 0;"></div>
                    <img src="https://picsum.photos/seed/blik/32/32" style="width: 32px; height: 32px; border-radius: 4px;" alt="BLIK">
                    <div style="flex: 1; font-weight: 700;">BLIK</div>
                </div>
            </div>
        `;
    },

    // Task Management & Social Specialized Molecules
    task_subtask_item(props) {
        return `
            <div class="task-subtask cmp is-molecule" style="gap: 12px; align-items: center; padding: 8px 0; width: 100%;">
                <input type="checkbox" style="width: 18px; height: 18px;">
                <span style="flex: 1; font-size: 0.9rem;">${props.content || 'Przygotować specyfikację techniczną'}</span>
                ${Library.get('atoms.avatar', { content: '<i data-lucide="user"></i>' })}
            </div>
        `;
    },

    task_time_tracker(props) {
        return `
            <div class="task-time-tracker cmp is-molecule" style="gap: 16px; align-items: center; padding: 12px 20px; background: var(--primitive-gray-900); color: white; border-radius: 12px; width: fit-content;">
                <div style="display: flex; flex-direction: column;">
                    <div style="font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.6);">CZAS PRACY</div>
                    <div style="font-size: 1.25rem; font-weight: 800; font-family: monospace;">02:45:18</div>
                </div>
                <button style="width: 40px; height: 40px; border-radius: 50%; border: none; background: var(--primitive-red-500); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="square" style="width: 16px; fill: white;"></i>
                </button>
            </div>
        `;
    },

    social_reactions(props) {
        return `
            <div class="social-reactions cmp is-molecule" style="gap: 8px; border:none; background:none; padding:0;">
                <div style="padding: 4px 12px; background: var(--primitive-blue-100); border: 1px solid var(--primitive-blue-300); border-radius: 100px; display: flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 700; cursor: pointer;">
                    <span>👍</span> <span>24</span>
                </div>
                <div style="padding: 4px 12px; background: var(--primitive-gray-100); border: 1px solid var(--admin-border); border-radius: 100px; display: flex; align-items: center; gap: 6px; font-size: 0.85rem; cursor: pointer;">
                    <span>❤️</span> <span>12</span>
                </div>
                <div style="padding: 4px 12px; background: var(--primitive-gray-100); border: 1px solid var(--admin-border); border-radius: 100px; display: flex; align-items: center; gap: 6px; font-size: 0.85rem; cursor: pointer;">
                    <span>🔥</span> <span>8</span>
                </div>
            </div>
        `;
    },

    // AI Specialized Molecules
    ai_model_selector(props) {
        return `
            <div class="ai-model-selector cmp is-molecule" style="gap: 12px; padding: 4px; background: var(--primitive-gray-100); border-radius: 12px; border: 1px solid var(--admin-border); width: fit-content;">
                <button style="padding: 8px 16px; border: none; background: white; border-radius: 8px; font-weight: 700; font-size: 0.85rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 8px;">
                    <i data-lucide="zap" style="width: 14px; color: var(--primitive-blue-500);"></i> GPT-4o
                </button>
                <button style="padding: 8px 16px; border: none; background: transparent; border-radius: 8px; font-weight: 600; font-size: 0.85rem; color: var(--admin-text-muted); display: flex; align-items: center; gap: 8px;">
                    <i data-lucide="sparkles" style="width: 14px;"></i> Claude 3.5
                </button>
            </div>
        `;
    },

    ai_prompt_template(props) {
        return `
            <div class="ai-prompt-template cmp is-molecule" style="flex-direction: column; align-items: stretch; gap: 8px; padding: 16px; background: white; border: 1px solid var(--admin-border); border-radius: 12px; width: 240px; cursor: pointer; transition: all 0.2s;">
                <div style="width: 32px; height: 32px; background: var(--primitive-blue-100); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="pen-tool" style="width: 16px; color: var(--primitive-blue-600);"></i>
                </div>
                <div style="font-weight: 700; font-size: 0.9rem; margin-top: 8px;">${props.title || 'Creative Writing'}</div>
                <div style="font-size: 0.8rem; color: var(--admin-text-muted); line-height: 1.4;">Zoptymalizowany pod kątem radosnych i kreatywnych tekstów...</div>
            </div>
        `;
    },

    ai_context_indicator(props) {
        return `
            <div class="ai-context-indicator cmp is-molecule" style="gap: 12px; align-items: center; width: 100%;">
                <div style="flex: 1; height: 4px; background: var(--primitive-gray-200); border-radius: 2px; overflow: hidden; position: relative;">
                    <div style="position: absolute; left: 0; top: 0; height: 100%; width: 70%; background: var(--primitive-blue-500);"></div>
                </div>
                <span style="font-size: 0.75rem; font-weight: 700; color: var(--admin-text-muted); white-space: nowrap;">70% context used</span>
            </div>
        `;
    }
};
