/**
 * ATOMIC DESIGN - MOLECULES
 */
const Molecules = {
    // --- DISPLAY ---
    card: (p = {}) => {
        const h = Atoms.heading({ level: 3, content: p.title, classes: 'card-header', state: p.state, type: p.type });
        const b = Atoms.paragraph({ content: p.body, classes: 'card-body', state: p.state, type: p.type });
        const f = p.footer ? `<footer class="card-footer">${p.footer}</footer>` : '';
        return `<article class="cmp card type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-molecule">${h}${b}${f}</article>`;
    },
    table: (p = {}) => {
        const cap = p.caption ? Atoms.caption({ content: p.caption }) : '';
        const ths = (p.headers||[]).map(h => Atoms.th({ content: h })).join('');
        const trs = (p.rows||[]).map(r => `<tr>${r.map(c => Atoms.td({ content: c })).join('')}</tr>`).join('');
        return `<table class="cmp table type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''} is-molecule profile-data">${cap}<thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
    },
    list: (p = {}) => {
        const items = (p.items||[]).map(i => `<li class="cmp list-item ${p.itemClasses||''} is-atom">${i}</li>`).join('');
        return `<ul class="cmp list type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''} is-molecule">${items}</ul>`;
    },
    accordion: (p = {}) => {
        const sum = Atoms.summary({ content: p.title });
        const content = Atoms.paragraph({ content: p.body });
        return `<details class="cmp accordion type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''} is-molecule" open>${sum}${content}</details>`;
    },
    media_block: (p = {}) => {
        const title = Atoms.heading({ level: 4, content: p.title });
        const media = p.isVideo ? `<video controls class="cmp video is-atom"><source src="#"></video>` : (p.isAudio ? `<audio controls class="cmp audio is-atom"><source src="#"></audio>` : Atoms.image({src:p.src, alt:p.title}));
        const cap = Atoms.span({ content: p.caption, classes: 'media-caption' });
        return `<figure class="cmp media-block type-${p.type||'default'} ${p.classes||''} is-molecule">${media}<figcaption>${title}${cap}</figcaption></figure>`;
    },

    // --- FORM MOLECULES ---
    form_field: (p = {}) => {
        const id = `field-${Math.random().toString(36).substr(2, 5)}`;
        const label = Atoms.label({ content: p.label, for: id });
        let input;
        if (p.inputType === 'select') {
            input = Atoms.select_raw({ id, ...p, classes: p.inputClasses });
        } else if (p.multiline) {
            input = Atoms.textarea_raw({ id, ...p, classes: p.inputClasses });
        } else {
            input = Atoms.input_raw({ id, ...p, classes: p.inputClasses });
        }
        return `<div class="cmp form-field state-${p.state||'default'} ${p.classes||''} is-molecule">${label}${input}</div>`;
    },

    choice_field: (p = {}) => {
        const id = `choice-${Math.random().toString(36).substr(2, 5)}`;
        const input = p.isRadio ? Atoms.radio({ id, ...p, classes: p.inputClasses }) : Atoms.checkbox({ id, ...p, classes: p.inputClasses });
        const label = Atoms.label({ content: p.label, for: id });
        return `<div class="cmp choice-field state-${p.state||'default'} ${p.classes||''} is-molecule">${input}${label}</div>`;
    },

    // --- NAV MOLECULES ---
    breadcrumb: (p = {}) => {
        const items = (p.items||[]).map((it, i, arr) => `<li>${Atoms.nav_link({ content: it, active: i === arr.length - 1 })}${i < arr.length - 1 ? '<span class="sep" aria-hidden="true">/</span>' : ''}</li>`).join('');
        return `<nav aria-label="Breadcrumb" class="cmp breadcrumb ${p.classes||''} is-molecule"><ul>${items}</ul></nav>`;
    },

    tabs: (p = {}) => {
        const items = (p.items||['Tab 1', 'Tab 2', 'Tab 3']).map((it, i) => `<button role="tab" aria-selected="${i===0?'true':'false'}" class="cmp tab-btn ${i===0?'is-active':''} ${p.tabClasses||''} is-atom">${it}</button>`).join('');
        return `<div role="tablist" class="cmp tabs ${p.classes||''} is-molecule">${items}</div>`;
    },

    // --- RECURSIVE / NESTED ---
    tree_item: (p = {}) => {
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

    mega_menu_column: (p = {}) => {
        const head = Atoms.heading({ level: 5, content: p.title });
        const items = (p.items||[]).map(i => `<li>${Molecules.recursive_list_item({ content: i, depth: 1, maxDepth: 4 })}</li>`).join('');
        return `<div class="cmp mega-menu-column ${p.classes||''} is-molecule">${head}<ul>${items}</ul></div>`;
    },

    recursive_list_item: (p = {}) => {
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

    // --- TASK MANAGEMENT ---
    task_card: (p = {}) => {
        const title = Atoms.heading({ level: 5, content: p.title || 'Zadanie' });
        const desc = Atoms.paragraph({ content: p.desc || 'Opis zadania surrealistycznego.' });
        const status = Atoms.badge({ content: p.status || 'To Do', type: p.statusType || 'secondary' });
        const assignee = Atoms.avatar({ src: `https://i.pravatar.cc/150?u=${p.id}`, classes: 'assignee' });
        const meta = `<div class="task-meta">${status}${assignee}</div>`;
        return `<div class="cmp task-card ${p.classes||''} is-molecule">${title}${desc}${meta}</div>`;
    },
    status_pill: (p = {}) => {
        const dot = Atoms.status_dot({ type: p.statusType || 'primary' });
        const text = Atoms.span({ content: p.content || 'Status' });
        return `<div class="cmp status-pill ${p.classes||''} is-molecule">${dot}${text}</div>`;
    },

    // --- E-COMMERCE ---
    product_card: (p = {}) => {
        const img = Atoms.image({ src: p.src || 'https://picsum.photos/seed/shop/300', alt: p.title || 'Produkt', classes: 'product-img' });
        const title = Atoms.heading({ level: 4, content: p.title || 'Nazwa Produktu' });
        const price = Atoms.span({ content: p.price || '99.99 PLN', classes: 'product-price', type: 'primary' });
        const btn = Atoms.button({ content: 'Dodaj do koszyka', type: 'primary' });
        return `<article class="cmp product-card ${p.classes||''} is-molecule">${img}${title}${price}${btn}</article>`;
    },
    cart_item: (p = {}) => {
        const img = Atoms.image({ src: p.src || 'https://picsum.photos/seed/item/80', classes: 'item-thumb' });
        const title = Atoms.span({ content: p.title || 'Produkt w koszyku', classes: 'item-title' });
        const qty = Atoms.input_raw({ inputType: "number", value: p.qty || 1, classes: 'item-qty' });
        const price = Atoms.span({ content: p.price || '49.00 PLN', classes: 'item-price' });
        const remove = Atoms.button({ content: '×', classes: 'item-remove', type: 'tertiary' });
        return `<div class="cmp cart-item ${p.classes||''} is-molecule">${img} <div>${title}${qty}</div> ${price}${remove}</div>`;
    },
    ecommerce_variant_selector: (p = {}) => {
        const label = Atoms.label({ content: p.label || 'Wybierz wariant:' });
        const options = (p.options || ['S', 'M', 'L', 'XL']).map(opt =>
            Atoms.button({ content: opt, type: 'secondary', classes: 'variant-btn' })
        ).join('');
        return `<div class="cmp variant-selector ${p.classes||''} is-molecule">${label}<div class="variant-grid">${options}</div></div>`;
    },
    ecommerce_price_tag: (p = {}) => {
        const current = Atoms.span({ content: p.price, classes: 'price-current' });
        const old = p.oldPrice ? Atoms.span({ content: p.oldPrice, classes: 'price-old' }) : '';
        const badge = p.discount ? Atoms.badge({ content: p.discount, type: 'error' }) : '';
        return `<div class="cmp price-tag ${p.classes||''} is-molecule">${old}${current}${badge}</div>`;
    },
    color_swatches: (p = {}) => {
        const label = Atoms.label({ content: 'Kolor:' });
        const swatches = `<div class="swatches">${(p.colors||['#f00','#0f0','#00f']).map(c => `<span class="swatch is-atom" style="background:${c}; width:24px; height:24px; border-radius:50%; display:inline-block; border:1px solid #ccc; cursor:pointer;"></span>`).join('')}</div>`;
        return `<div class="cmp color-swatches ${p.classes||''} is-molecule">${label}${swatches}</div>`;
    },

    // --- SAAS REFINED ---
    saas_user_row: (p = {}) => {
        const avatar = Atoms.avatar({ src: p.src, alt: p.name });
        const name = Atoms.span({ content: p.name, classes: 'user-name', type: 'primary' });
        const role = Atoms.badge({ content: p.role, type: 'secondary' });
        const status = Atoms.status_dot({ type: p.status === 'online' ? 'success' : 'disabled' });
        return `<div class="cmp saas-user-row ${p.classes||''} is-molecule">${avatar} <div>${name}${role}</div> ${status}</div>`;
    },
    saas_filter_bar: (p = {}) => {
        const search = Atoms.input_raw({ placeholder: 'Filtruj byt...' });
        const pills = ['Aktywne', 'Zarchiwizowane', 'Wersje próbne'].map(f => Molecules.filter_pill({ content: f })).join('');
        const select = Atoms.select_raw({ options: ['Sortuj wg daty', 'Sortuj wg nazwy'], state: p.state, type: p.type });
        return `<div class="cmp saas-filter-bar ${p.classes||''} is-molecule">${search}${select}<div class="pills-row">${pills}</div></div>`;
    },
    saas_bulk_actions: (p = {}) => {
        const count = Atoms.span({ content: 'Zaznaczono: 3', classes: 'bulk-count' });
        const actions = ['Usuń', 'Eksportuj', 'Zmień rolę'].map(a => Atoms.button({ content: a, type: 'secondary' })).join('');
        return `<div class="cmp saas-bulk-actions ${p.classes||''} is-molecule">${count}<div class="actions-row">${actions}</div></div>`;
    },
    saas_command_item: (p = {}) => {
        const icon = Atoms.icon({ name: p.icon || 'terminal' });
        const text = Atoms.span({ content: p.content });
        const shortcut = Atoms.kbd({ content: p.kbd || '⌘K' });
        return `<div class="cmp saas-command-item ${p.classes||''} is-molecule">${icon}${text}${shortcut}</div>`;
    },
    saas_feature_toggle: (p = {}) => {
        const h = Atoms.heading({ level: 5, content: p.title });
        const d = Atoms.paragraph({ content: p.desc, classes: 'toggle-desc' });
        const t = Atoms.toggle_raw({ checked: p.checked });
        return `<div class="cmp saas-feature-toggle ${p.classes||''} is-molecule"><div>${h}${d}</div>${t}</div>`;
    },
    saas_notification_item: (p = {}) => {
        const icon = Atoms.icon({ name: 'bell' });
        const text = Atoms.span({ content: p.content });
        const time = Atoms.time({ content: '2m temu', datetime: '2024-05-16' });
        return `<div class="cmp saas-notification-item ${p.classes||''} is-molecule">${icon}<div>${text}${time}</div></div>`;
    },
    saas_timeline_item: (p = {}) => {
        const dot = Atoms.status_dot({ type: p.type || 'primary' });
        const text = Atoms.span({ content: p.content });
        const date = Atoms.time({ content: p.date, datetime: p.date });
        return `<div class="cmp saas-timeline-item ${p.classes||''} is-molecule">${dot}<div>${text}${date}</div></div>`;
    },

    usage_meter: (p = {}) => {
        const label = Atoms.label({ content: p.label });
        const val = Atoms.span({ content: `${p.value}%`, classes: 'usage-val' });
        const bar = Atoms.progress({ value: p.value });
        return `<div class="cmp usage-meter ${p.classes||''} is-molecule">${label}${val}${bar}</div>`;
    },
    integration_tile: (p = {}) => {
        const icon = Atoms.icon({ name: 'plugin', classes: 'integration-icon' });
        const status = Atoms.status_dot({ type: p.active ? 'success' : 'disabled' });
        const name = Atoms.span({ content: p.name, classes: 'integration-name' });
        return `<div class="cmp integration-tile ${p.classes||''} is-molecule">${icon}${name}${status}</div>`;
    },
    filter_pill: (p = {}) => {
        const text = Atoms.span({ content: p.content });
        const close = Atoms.button({ content: '×', type: 'tertiary', classes: 'pill-close' });
        return `<span class="cmp filter-pill ${p.classes||''} is-molecule">${text}${close}</span>`;
    },

    // --- AI ---
    chat_bubble: (p = {}) => {
        const text = Atoms.span({ content: p.content });
        const meta = Atoms.span({ content: p.role === 'user' ? 'Ty' : 'AI', classes: 'meta' });
        return `<div class="cmp chat-bubble ${p.role} ${p.classes||''} is-molecule">${meta}${text}</div>`;
    },
    ai_citation: (p = {}) => {
        const icon = Atoms.icon({ name: 'bookmark', classes: 'citation-icon' });
        const link = Atoms.nav_link({ content: p.content, href: p.url });
        return `<span class="cmp ai-citation ${p.classes||''} is-molecule">${icon}${link}</span>`;
    },
    token_display: (p = {}) => {
        const icon = Atoms.icon({ name: 'database' });
        const count = Atoms.badge({ content: p.count, type: 'tertiary' });
        return `<div class="cmp token-display ${p.classes||''} is-molecule">${icon}<span>Tokeny:</span>${count}</div>`;
    },

    // --- FEEDBACK ---
    alert: (p = {}) => {
        const icon = Atoms.icon({ name: p.type === 'error' ? 'alert-octagon' : (p.type === 'success' ? 'check-circle' : 'info') });
        const text = Atoms.span({ content: p.content });
        return `<div class="cmp alert type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''} is-molecule" role="alert">${icon}${text}</div>`;
    },
    statistic: (p = {}) => {
        const val = Atoms.heading({ level: 2, content: p.value });
        const lab = Atoms.span({ content: p.label, classes: 'stat-label' });
        const trend = p.trend ? `<span class="trend ${p.trend > 0 ? 'up':'down'}">${p.trend}%</span>` : '';
        return `<div class="cmp statistic ${p.classes||''} is-molecule">${lab}${val}${trend}</div>`;
    },
    modal: (p = {}) => {
        const h = Atoms.heading({ level: 3, content: p.title });
        const b = Atoms.paragraph({ content: p.body });
        const close = Atoms.button({ content: 'Zamknij', type: 'tertiary' });
        return `<div class="cmp modal-overlay ${p.classes||''} is-molecule" role="dialog"><div class="modal-content">${h}${b}${close}</div></div>`;
    },
    toast: (p = {}) => {
        const icon = Atoms.icon({ name: 'bell' });
        const text = Atoms.span({ content: p.content });
        return `<div class="cmp toast type-${p.type||'default'} ${p.classes||''} is-molecule" role="status">${icon}${text}</div>`;
    }
};

window.Molecules = Molecules;
if (typeof module !== 'undefined') module.exports = Molecules;
