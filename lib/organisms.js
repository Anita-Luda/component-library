import { Library } from '../library.js';

/**
 * ORGANISMS LIBRARY
 * High-level domain components.
 */
export const Organisms = {
    user_matrix(props) {
        const table = Library.get('molecules.table', { caption: 'Zarządzanie Zespołem' });
        const button = Library.get('atoms.button', { type: 'primary', content: 'Dodaj Członka' });
        return `
            <div class="organism-user-matrix cmp" id="organism-user_matrix-default-default">
                <header class="flex-between">
                    <h2>Użytkownicy</h2>
                    ${button}
                </header>
                ${table}
            </div>
        `;
    },

    product_grid(props) {
        const cards = Array(4).fill(0).map(() => Library.get('molecules.card', {
            title: 'Produkt Joyful',
            content: 'Opis niesamowitego produktu z naszej radosnej biblioteki.',
            footer: Library.get('atoms.button', { type: 'primary', content: 'Kup Teraz' })
        })).join('');

        return `<div class="organism-product-grid cmp variants-grid" id="organism-product_grid-default-default">${cards}</div>`;
    },

    kanban_board(props) {
        const columns = ['Do zrobienia', 'W trakcie', 'Gotowe'].map(col => `
            <div class="kanban-column molecule-card cmp">
                <h3>${col}</h3>
                ${Library.get('molecules.card', { content: 'Zadanie 1' })}
                ${Library.get('molecules.card', { content: 'Zadanie 2' })}
            </div>
        `).join('');

        return `<div class="organism-kanban cmp variants-grid" id="organism-kanban_board-default-default">${columns}</div>`;
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

    // Catch-all for registry items
    get(blueprint, props = {}) {
        const parts = blueprint.split('.');
        const method = parts[parts.length - 1];
        if (this[method]) return this[method](props);

        // Fallback to Molecule or Card if specific organism not found
        return Library.get('molecules.card', { title: `Organizm: ${method}`, content: 'Automatyczny placeholder organizmu.' });
    }
};
