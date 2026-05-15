/**
 * ATOMIC COMPONENT LIBRARY
 * Precise HTML blueprints for reusable components.
 */

const Library = {
    atoms: {
        // --- TEXT ---
        heading: (props) => {
            const { level = 2, content = '', type = 'default', state = 'default', classes = '' } = props;
            const force = state !== 'default' ? `force-${state}` : '';
            return `<h${level} class="cmp heading type-${type} state-${state} ${force} ${classes}">${content}</h${level}>`;
        },
        paragraph: (props) => {
            const { content = '', type = 'default', state = 'default', classes = '' } = props;
            const force = state !== 'default' ? `force-${state}` : '';
            return `<p class="cmp paragraph type-${type} state-${state} ${force} ${classes}">${content}</p>`;
        },
        span: (props) => {
            const { content = '', type = 'default', state = 'default', classes = '' } = props;
            const force = state !== 'default' ? `force-${state}` : '';
            return `<span class="cmp span type-${type} state-${state} ${force} ${classes}">${content}</span>`;
        },
        code: (props) => {
            const { content = '', type = 'default', state = 'default', classes = '' } = props;
            const force = state !== 'default' ? `force-${state}` : '';
            return `<code class="cmp code type-${type} state-${state} ${force} ${classes}">${content}</code>`;
        },

        // --- DATA DISPLAY ---
        badge: (props) => {
            const { content = '', type = 'primary', state = 'default', classes = '' } = props;
            const force = state !== 'default' ? `force-${state}` : '';
            return `<span class="cmp badge type-${type} state-${state} ${force} ${classes}">${content}</span>`;
        },
        chip: (props) => {
            const { content = '', type = 'secondary', state = 'default', classes = '' } = props;
            const force = state !== 'default' ? `force-${state}` : '';
            return `<span class="cmp chip type-${type} state-${state} ${force} ${classes}">${content}</span>`;
        },
        tag: (props) => {
            const { content = '', type = 'tertiary', state = 'default', classes = '' } = props;
            const force = state !== 'default' ? `force-${state}` : '';
            return `<span class="cmp tag type-${type} state-${state} ${force} ${classes}">${content}</span>`;
        },
        avatar: (props) => {
            const { src = '', alt = '', type = 'default', state = 'default', classes = '' } = props;
            const force = state !== 'default' ? `force-${state}` : '';
            return `<img src="${src}" alt="${alt}" class="cmp avatar type-${type} state-${state} ${force} ${classes}">`;
        },
        icon: (props) => {
            const { name = 'sparkles', type = 'default', state = 'default', classes = '' } = props;
            const force = state !== 'default' ? `force-${state}` : '';
            return `<i data-lucide="${name}" class="cmp-icon icon type-${type} state-${state} ${force} ${classes}"></i>`;
        },

        // --- TABLE ELEMENTS ---
        th: (p) => `<th scope="col" class="cmp th type-${p.type||'default'} ${p.classes||''}">${p.content}</th>`,
        td: (p) => `<td class="cmp td type-${p.type||'default'} ${p.classes||''}">${p.content}</td>`,
        caption: (p) => `<caption class="cmp caption type-${p.type||'default'} ${p.classes||''}">${p.content}</caption>`,

        // --- FORM ELEMENTS ---
        button: (props) => {
            const { content = '', type = 'primary', state = 'default', classes = '', disabled = false } = props;
            const force = state !== 'default' ? `force-${state}` : '';
            const dis = disabled || state === 'disabled' ? 'disabled aria-disabled="true"' : '';
            return `<button class="cmp button type-${type} state-${state} ${force} ${classes}" ${dis}>${content}</button>`;
        },
        input: (props) => {
            const { placeholder = '', type = 'default', state = 'default', classes = '', disabled = false } = props;
            const force = state !== 'default' ? `force-${state}` : '';
            const dis = disabled || state === 'disabled' ? 'disabled aria-disabled="true"' : '';
            return `<input type="text" placeholder="${placeholder}" class="cmp input type-${type} state-${state} ${force} ${classes}" ${dis}>`;
        },
        summary: (p) => `<summary class="cmp summary type-${p.type||'default'} ${p.classes||''}">${p.content}</summary>`
    },

    molecules: {
        card: (p) => {
            const h = Library.atoms.heading({ level: 3, content: p.title, classes: 'card-header', state: p.state });
            const b = Library.atoms.paragraph({ content: p.body, classes: 'card-body', state: p.state });
            const f = p.footer ? `<footer class="card-footer">${p.footer}</footer>` : '';
            const force = p.state !== 'default' ? `force-${p.state}` : '';
            return `<article class="cmp card type-${p.type||'default'} state-${p.state||'default'} ${force} is-molecule">${h}${b}${f}</article>`;
        },
        table: (p) => {
            const cap = p.caption ? Library.atoms.caption({ content: p.caption }) : '';
            const ths = (p.headers||[]).map(h => Library.atoms.th({ content: h })).join('');
            const trs = (p.rows||[]).map(r => `<tr>${r.map(c => Library.atoms.td({ content: c })).join('')}</tr>`).join('');
            return `<table class="cmp table type-${p.type||'default'} state-${p.state||'default'} is-molecule profile-data">${cap}<thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
        },
        list: (p) => {
            const items = (p.items||[]).map(i => `<li class="cmp list-item is-atom">${i}</li>`).join('');
            return `<ul class="cmp list type-${p.type||'default'} state-${p.state||'default'} is-molecule">${items}</ul>`;
        },
        accordion: (p) => {
            const sum = Library.atoms.summary({ content: p.title });
            const content = Library.atoms.paragraph({ content: p.body });
            return `<details class="cmp accordion type-${p.type||'default'} state-${p.state||'default'} is-molecule" open>${sum}${content}</details>`;
        },
        timeline: (p) => {
            const items = (p.items||[]).map(i => `<li class="cmp timeline-item is-atom">${i}</li>`).join('');
            return `<div class="cmp timeline type-${p.type||'default'} state-${p.state||'default'} is-molecule"><ul>${items}</ul></div>`;
        },
        statistic: (p) => {
            const label = Library.atoms.span({ content: p.label, classes: 'stat-label' });
            const value = Library.atoms.span({ content: p.value, classes: 'stat-value', type: 'primary' });
            return `<div class="cmp statistic type-${p.type||'default'} state-${p.state||'default'} is-molecule">${label}${value}</div>`;
        }
    }
};

if (typeof module !== 'undefined') module.exports = Library;
