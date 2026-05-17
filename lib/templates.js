import { Library } from '../library.js';

/**
 * TEMPLATES LIBRARY
 * Page-level layouts.
 */
export const Templates = {
    dashboard(props) {
        return `
            <div class="template-dashboard cmp">
                <aside class="sidebar">Sidebar Content</aside>
                <main class="main">
                    ${Library.get('organisms.workspaceSwitcher', { title: props.title })}
                    <div class="grid">
                        ${Library.get('organisms.productCard', { name: props.body })}
                        ${Library.get('organisms.productCard', { name: 'Second Item' })}
                    </div>
                </main>
            </div>
        `;
    },

    auth(props) {
        return `
            <div class="template-auth cmp">
                <div class="auth-card">
                    ${Library.get('atoms.heading', { type: 'h2', content: props.title })}
                    ${Library.get('molecules.inputGroup', { label: 'Email', value: 'user@example.com' })}
                    ${Library.get('molecules.inputGroup', { label: 'Password', type: 'password' })}
                    ${Library.get('atoms.button', { type: 'primary', content: 'Zaloguj się' })}
                </div>
            </div>
        `;
    }
};
