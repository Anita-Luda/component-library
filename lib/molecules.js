/**
 * ATOMIC DESIGN - MOLECULES
 */
const Molecules = {
    // --- DISPLAY ---
    card: (p) => {
        const h = Atoms.heading({ level: 3, content: p.title, classes: 'card-header', state: p.state, type: p.type });
        const b = Atoms.paragraph({ content: p.body, classes: 'card-body', state: p.state, type: p.type });
        const f = p.footer ? `<footer class="card-footer">${p.footer}</footer>` : '';
        return `<article class="cmp card type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-molecule">${h}${b}${f}</article>`;
    },
    table: (p) => {
        const cap = p.caption ? Atoms.caption({ content: p.caption }) : '';
        const ths = (p.headers||[]).map(h => Atoms.th({ content: h })).join('');
        const trs = (p.rows||[]).map(r => `<tr>${r.map(c => Atoms.td({ content: c })).join('')}</tr>`).join('');
        return `<table class="cmp table type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''} is-molecule profile-data">${cap}<thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
    },
    list: (p) => {
        const items = (p.items||[]).map(i => `<li class="cmp list-item ${p.itemClasses||''} is-atom">${i}</li>`).join('');
        return `<ul class="cmp list type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''} is-molecule">${items}</ul>`;
    },
    accordion: (p) => {
        const sum = Atoms.summary({ content: p.title });
        const content = Atoms.paragraph({ content: p.body });
        return `<details class="cmp accordion type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''} is-molecule" open>${sum}${content}</details>`;
    },
    media_block: (p) => {
        const title = Atoms.heading({ level: 4, content: p.title });
        const media = p.isVideo ? `<video controls class="cmp video is-atom"><source src="#"></video>` : (p.isAudio ? `<audio controls class="cmp audio is-atom"><source src="#"></audio>` : Atoms.image({src:p.src, alt:p.title}));
        const cap = Atoms.span({ content: p.caption, classes: 'media-caption' });
        return `<figure class="cmp media-block type-${p.type||'default'} ${p.classes||''} is-molecule">${media}<figcaption>${title}${cap}</figcaption></figure>`;
    },

    // --- FORM MOLECULES ---
    form_field: (p) => {
        const id = `field-${Math.random().toString(36).substr(2, 5)}`;
        const label = Atoms.label({ content: p.label, for: id });
        let input;
        if (p.inputType === 'select') {
            const opts = (p.options||['Opcja 1','Opcja 2','Opcja 3']).map(o => Atoms.option({ content: o, value: o })).join('');
            input = `<select id="${id}" class="cmp select-raw state-${p.state||'default'} ${p.inputClasses||''} is-atom">${opts}</select>`;
        } else if (p.multiline) {
            input = Atoms.textarea_raw({ id, ...p, classes: p.inputClasses });
        } else {
            input = Atoms.input_raw({ id, ...p, classes: p.inputClasses });
        }
        return `<div class="cmp form-field state-${p.state||'default'} ${p.classes||''} is-molecule">${label}${input}</div>`;
    },

    choice_field: (p) => {
        const id = `choice-${Math.random().toString(36).substr(2, 5)}`;
        const input = p.isRadio ? Atoms.radio({ id, ...p, classes: p.inputClasses }) : Atoms.checkbox({ id, ...p, classes: p.inputClasses });
        const label = Atoms.label({ content: p.label, for: id });
        return `<div class="cmp choice-field state-${p.state||'default'} ${p.classes||''} is-molecule">${input}${label}</div>`;
    },

    // --- NAV MOLECULES ---
    breadcrumb: (p) => {
        const items = (p.items||[]).map((it, i, arr) => `<li>${Atoms.nav_link({ content: it, active: i === arr.length - 1 })}${i < arr.length - 1 ? '<span class="sep" aria-hidden="true">/</span>' : ''}</li>`).join('');
        return `<nav aria-label="Breadcrumb" class="cmp breadcrumb ${p.classes||''} is-molecule"><ul>${items}</ul></nav>`;
    },

    tabs: (p) => {
        const items = (p.items||['Tab 1', 'Tab 2', 'Tab 3']).map((it, i) => `<button role="tab" aria-selected="${i===0?'true':'false'}" class="cmp tab-btn ${i===0?'is-active':''} ${p.tabClasses||''} is-atom">${it}</button>`).join('');
        return `<div role="tablist" class="cmp tabs ${p.classes||''} is-molecule">${items}</div>`;
    },

    // --- RECURSIVE / NESTED ---
    tree_item: (p) => {
        const depth = p.depth || 0;
        const maxDepth = 4;
        const itemsCount = 5;

        let subItems = '';
        if (depth < maxDepth) {
            subItems = '<ul>' + Array.from({length: itemsCount}).map((_, i) =>
                `<li>${Molecules.tree_item({ content: `${p.content}.${i+1}`, depth: depth + 1 })}</li>`
            ).join('') + '</ul>';
        }

        return `<details class="cmp tree-item ${p.classes||''} is-molecule" ${depth===0?'open':''}>
            <summary>${Atoms.icon({name: depth < maxDepth ? 'folder' : 'file'})} ${p.content}</summary>
            ${subItems}
        </details>`;
    },

    mega_menu_column: (p) => {
        const head = Atoms.heading({ level: 5, content: p.title });
        const items = (p.items||[]).map(i => `<li>${Molecules.recursive_list_item({ content: i, depth: 1, maxDepth: 4 })}</li>`).join('');
        return `<div class="cmp mega-menu-column ${p.classes||''} is-molecule">${head}<ul>${items}</ul></div>`;
    },

    recursive_list_item: (p) => {
        const depth = p.depth || 0;
        const maxDepth = p.maxDepth || 1;
        const itemsCount = 5;
        let sub = '';
        if (depth < maxDepth) {
            sub = '<ul>' + Array.from({length: itemsCount}).map((_, i) =>
                `<li>${Molecules.recursive_list_item({ content: `${p.content}.${i+1}`, depth: depth + 1, maxDepth })}</li>`
            ).join('') + '</ul>';
        }
        return `<span class="${p.classes||''}">${p.content}</span>${sub}`;
    },

    // --- E-COMMERCE ---
    product_card: (p) => {
        const img = Atoms.image({ src: p.src, alt: p.title, classes: 'product-img' });
        const title = Atoms.heading({ level: 4, content: p.title });
        const price = Atoms.span({ content: p.price, classes: 'product-price', type: 'primary' });
        const btn = Atoms.button({ content: 'Dodaj do koszyka', type: 'primary' });
        return `<article class="cmp product-card ${p.classes||''} is-molecule">${img}${title}${price}${btn}</article>`;
    },
    color_swatches: (p) => {
        const label = Atoms.label({ content: 'Kolor:' });
        const swatches = `<div class="swatches">${(p.colors||['#f00','#0f0','#00f']).map(c => `<span class="swatch is-atom" style="background:${c}; width:24px; height:24px; border-radius:50%; display:inline-block; border:1px solid #ccc; cursor:pointer;"></span>`).join('')}</div>`;
        return `<div class="cmp color-swatches ${p.classes||''} is-molecule">${label}${swatches}</div>`;
    },

    // --- SAAS ---
    usage_meter: (p) => {
        const label = Atoms.label({ content: p.label });
        const val = Atoms.span({ content: `${p.value}%`, classes: 'usage-val' });
        const bar = Atoms.progress({ value: p.value });
        return `<div class="cmp usage-meter ${p.classes||''} is-molecule">${label}${val}${bar}</div>`;
    },
    integration_tile: (p) => {
        const icon = Atoms.icon({ name: 'plugin', classes: 'integration-icon' });
        const status = Atoms.status_dot({ type: p.active ? 'success' : 'disabled' });
        const name = Atoms.span({ content: p.name, classes: 'integration-name' });
        return `<div class="cmp integration-tile ${p.classes||''} is-molecule">${icon}${name}${status}</div>`;
    },
    filter_pill: (p) => {
        const text = Atoms.span({ content: p.content });
        const close = Atoms.button({ content: '×', type: 'tertiary', classes: 'pill-close' });
        return `<span class="cmp filter-pill ${p.classes||''} is-molecule">${text}${close}</span>`;
    },

    // --- AI ---
    chat_bubble: (p) => {
        const text = Atoms.span({ content: p.content });
        const meta = Atoms.span({ content: p.role === 'user' ? 'Ty' : 'AI', classes: 'meta' });
        return `<div class="cmp chat-bubble ${p.role} ${p.classes||''} is-molecule">${meta}${text}</div>`;
    },
    ai_citation: (p) => {
        const icon = Atoms.icon({ name: 'bookmark', classes: 'citation-icon' });
        const link = Atoms.nav_link({ content: p.content, href: p.url });
        return `<span class="cmp ai-citation ${p.classes||''} is-molecule">${icon}${link}</span>`;
    },
    token_display: (p) => {
        const icon = Atoms.icon({ name: 'database' });
        const count = Atoms.badge({ content: p.count, type: 'tertiary' });
        return `<div class="cmp token-display ${p.classes||''} is-molecule">${icon}<span>Tokeny:</span>${count}</div>`;
    },

    // --- FEEDBACK ---
    alert: (p) => {
        const icon = Atoms.icon({ name: p.type === 'error' ? 'alert-octagon' : (p.type === 'success' ? 'check-circle' : 'info') });
        const text = Atoms.span({ content: p.content });
        return `<div class="cmp alert type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''} is-molecule" role="alert">${icon}${text}</div>`;
    },
    statistic: (p) => {
        const val = Atoms.heading({ level: 2, content: p.value });
        const lab = Atoms.span({ content: p.label, classes: 'stat-label' });
        const trend = p.trend ? `<span class="trend ${p.trend > 0 ? 'up':'down'}">${p.trend}%</span>` : '';
        return `<div class="cmp statistic ${p.classes||''} is-molecule">${lab}${val}${trend}</div>`;
    },
    modal: (p) => {
        const h = Atoms.heading({ level: 3, content: p.title });
        const b = Atoms.paragraph({ content: p.body });
        const close = Atoms.button({ content: 'Zamknij', type: 'tertiary' });
        return `<div class="cmp modal-overlay ${p.classes||''} is-molecule" role="dialog"><div class="modal-content">${h}${b}${close}</div></div>`;
    },
    toast: (p) => {
        const icon = Atoms.icon({ name: 'bell' });
        const text = Atoms.span({ content: p.content });
        return `<div class="cmp toast type-${p.type||'default'} ${p.classes||''} is-molecule" role="status">${icon}${text}</div>`;
    }
};

window.Molecules = Molecules;
if (typeof module !== 'undefined') module.exports = Molecules;
