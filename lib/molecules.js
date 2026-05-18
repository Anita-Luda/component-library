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
        return `<div class="molecule-table-wrapper cmp" id="molecule-table-default-default">${Library.get('atoms.table', { content: caption })}</div>`;
    },

    list(props) {
        return Library.get('atoms.ul', { content: props.content || 'Element' });
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
        return `
            <div class="molecule-alert cmp type-${props.type || 'primary'} state-default" role="alert" id="${id}">
                <div class="alert-content">${props.content || 'Wiadomość systemowa'}</div>
            </div>
        `;
    },

    modal(props) {
        return `
            <div class="molecule-modal-overlay cmp state-default" id="molecule-modal-default-default">
                <div class="molecule-modal" role="dialog" aria-modal="true">
                    <header><h3>${props.title || 'Dialog'}</h3></header>
                    <div class="modal-body">${props.content || 'Treść okna.'}</div>
                    <footer>${Library.get('atoms.button', { type: 'primary', content: 'Zamknij' })}</footer>
                </div>
            </div>
        `;
    }
};
