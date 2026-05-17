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
            <div class="molecule-input-group cmp" role="group">
                ${label}
                ${input}
                ${hint}
            </div>
        `;
    },

    searchBar(props) {
        const input = Library.get('atoms.input_raw', { content: props.placeholder || 'Szukaj...' });
        const button = Library.get('atoms.button', { type: 'primary', content: 'Szukaj' });

        return `
            <div class="molecule-search-bar cmp" role="search">
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
            <nav class="molecule-pagination cmp" aria-label="Pagination">
                ${prev} ${page} ${next}
            </nav>
        `;
    },

    breadcrumbs(props) {
        const items = (props.items || ['Home', 'Kategoria', 'Produkt']).map(item =>
            Library.get('atoms.a', { content: item })
        ).join(' <span class="sep">/</span> ');

        return `<nav class="molecule-breadcrumbs cmp" aria-label="Breadcrumb">${items}</nav>`;
    }
};
