import { Library } from '../library.js';

/**
 * ORGANISMS LIBRARY
 * High-level domain components built from Molecules and Atoms.
 */
export const Organisms = {
    workspaceSwitcher(props) {
        const title = Library.get('atoms.heading', { type: 'h4', content: props.title || 'Workspace' });
        const select = Library.get('atoms.select_raw', { content: 'Wybierz przestrzeń...' });

        return `
            <div class="organism-workspace-switcher cmp">
                ${title}
                ${select}
            </div>
        `;
    },

    productCard(props) {
        const img = Library.get('atoms.img', { content: props.name });
        const title = Library.get('atoms.heading', { type: 'h5', content: props.name || 'Produkt' });
        const price = Library.get('atoms.span', { content: props.price || '99.99 PLN' });
        const btn = Library.get('atoms.button', { type: 'primary', content: 'Do koszyka' });

        return `
            <div class="organism-product-card cmp">
                ${img}
                <div class="content">
                    ${title}
                    ${price}
                    ${btn}
                </div>
            </div>
        `;
    },

    chatWindow(props) {
        const header = Library.get('atoms.header', { content: 'AI Assistant' });
        const history = `<div class="chat-history">${Library.get('atoms.p', { content: 'Cześć! W czym mogę pomóc?' })}</div>`;
        const input = Library.get('atoms.input_raw', { content: 'Zadaj pytanie...' });
        const send = Library.get('atoms.button', { type: 'primary', content: 'Wyślij' });

        return `
            <div class="organism-chat-window cmp">
                ${header}
                ${history}
                <div class="input-area">
                    ${input} ${send}
                </div>
            </div>
        `;
    },

    userManagement(props) {
        const title = Library.get('atoms.heading', { type: 'h3', content: 'Zarządzanie użytkownikami' });
        const table = Library.get('atoms.table', { content: 'Tabela użytkowników' });

        return `
            <section class="organism-user-mgmt cmp">
                ${title}
                ${table}
            </section>
        `;
    }
};
