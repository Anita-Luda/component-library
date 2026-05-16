/**
 * ATOMIC DESIGN - ATOMS
 * Lookup for hardcoded HTML snippets.
 */
const Atoms = {
    _snippets: {},

    async loadCatalog() {
        const files = ['typography.html', 'forms.html', 'data.html'];
        for (const file of files) {
            const res = await fetch(`lib/catalog/${file}`);
            const html = await res.text();
            const temp = document.createElement('div');
            temp.innerHTML = html;
            temp.querySelectorAll('[id]').forEach(el => {
                this._snippets[el.id] = el.outerHTML;
            });
        }
    },

    _getSnippet(id, fallbackFn, p) {
        if (this._snippets[id]) return this._snippets[id];
        return fallbackFn(p);
    },

    // --- TYPOGRAPHY ---
    span: (p = {}) => Atoms._getSnippet(`atoms-span-${p.type||'default'}-${p.state||'default'}`, (p) => {
        const classes = `cmp span type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        return `<span class="${classes}" role="presentation">${p.content||''}</span>`;
    }, p),

    heading: (p = {}) => {
        const lv = p.level || 1;
        const id = `atoms-heading-h${lv}-${p.state||'default'}`;
        return Atoms._getSnippet(id, (p) => {
            const safeLv = Math.min(Math.max(parseInt(lv), 1), 6);
            const classes = `cmp heading h${safeLv} type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
            return `<h${safeLv} class="${classes}">${p.content||''}</h${safeLv}>`;
        }, p);
    },

    paragraph: (p = {}) => Atoms._getSnippet(`atoms-paragraph-${p.type||'default'}-${p.state||'default'}`, (p) => {
        const classes = `cmp paragraph type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        return `<p class="${classes}">${p.content||''}</p>`;
    }, p),

    overline: (p = {}) => Atoms._getSnippet(`atoms-overline-${p.type||'default'}-${p.state||'default'}`, (p) => {
        const classes = `cmp overline type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        return `<span class="${classes}" role="text">${p.content||''}</span>`;
    }, p),

    // --- INTERACTIVE ---
    button: (p = {}) => Atoms._getSnippet(`atoms-button-${p.type||'default'}-${p.state||'default'}`, (p) => {
        const classes = `cmp button type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = p.state === 'disabled' ? 'disabled' : '';
        return `<button class="${classes}" ${attr}>${p.content||''}</button>`;
    }, p),

    icon_button: (p = {}) => Atoms._getSnippet(`atoms-icon_button-${p.type||'default'}-${p.state||'default'}`, (p) => {
        const classes = `cmp icon-button type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = p.state === 'disabled' ? 'disabled' : '';
        const icon = `<i data-lucide="${p.icon||'circle'}" aria-hidden="true"></i>`;
        return `<button class="${classes}" aria-label="${p.label||'Przycisk'}" ${attr}>${icon}</button>`;
    }, p),

    nav_link: (p = {}) => `<a href="${p.href||'#'}" class="cmp nav-link type-${p.type||'default'} state-${p.state||'default'} ${p.active?'is-active':''} ${p.classes||''} is-atom" ${p.active?'aria-current="page"':''}>${p.content||''}</a>`,

    // --- FORM ELEMENTS ---
    label: (p = {}) => `<label class="cmp label ${p.classes||''} is-atom" for="${p.for||''}">${p.content||''}</label>`,

    input_raw: (p = {}) => Atoms._getSnippet(`atoms-input_raw-${p.type||'default'}-${p.state||'default'}`, (p) => {
        const type = p.inputType || p.type || "text";
        const classes = `cmp input-raw type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = p.state === 'disabled' ? 'disabled' : '';
        return `<input type="${type}" id="${p.id||''}" class="${classes}" placeholder="${p.placeholder||''}" ${attr} value="${p.value||''}">`;
    }, p),

    textarea_raw: (p = {}) => Atoms._getSnippet(`atoms-textarea_raw-${p.type||'default'}-${p.state||'default'}`, (p) => `<textarea id="${p.id||''}" class="cmp textarea-raw type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom" placeholder="${p.placeholder||''}" ${p.state==='disabled'?'disabled':''}>${p.content||''}</textarea>`, p),

    select_raw: (p = {}) => Atoms._getSnippet(`atoms-select_raw-${p.type||'default'}-${p.state||'default'}`, (p) => {
        const classes = `cmp select-raw type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = p.state === 'disabled' ? 'disabled' : '';
        const options = (p.options || ['Opcja 1', 'Opcja 2']).map(o => `<option>${o}</option>`).join('');
        return `<select id="${p.id||''}" class="${classes}" ${attr}>${options}</select>`;
    }, p),

    checkbox: (p = {}) => Atoms._getSnippet(`atoms-checkbox-${p.type||'default'}-${p.state||'default'}`, (p) => {
        const classes = `cmp checkbox state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = (p.checked ? 'checked' : '') + ' ' + (p.state === 'disabled' ? 'disabled' : '');
        return `<input type="checkbox" id="${p.id||''}" class="${classes}" ${attr}>`;
    }, p),

    radio: (p = {}) => Atoms._getSnippet(`atoms-radio-${p.type||'default'}-${p.state||'default'}`, (p) => `<input type="radio" name="${p.name||'radio-group'}" id="${p.id||''}" class="cmp radio state-${p.state||'default'} ${p.classes||''} is-atom" ${p.checked?'checked':''} ${p.state==='disabled'?'disabled':''}>`, p),

    toggle_raw: (p = {}) => Atoms._getSnippet(`atoms-toggle_raw-${p.type||'default'}-${p.state||'default'}`, (p) => {
        const classes = `cmp toggle-raw state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = (p.checked ? 'checked' : '') + ' ' + (p.state === 'disabled' ? 'disabled' : '');
        return `<input type="checkbox" role="switch" id="${p.id||''}" class="${classes}" ${attr}>`;
    }, p),

    range_raw: (p = {}) => Atoms._getSnippet(`atoms-range_raw-${p.type||'default'}-${p.state||'default'}`, (p) => `<input type="range" id="${p.id||''}" class="cmp range-raw state-${p.state||'default'} ${p.classes||''} is-atom" min="${p.min||0}" max="${p.max||100}" value="${p.value||50}" ${p.state==='disabled'?'disabled':''}>`, p),

    // --- DATA & TABLES ---
    th: (p = {}) => `<th class="cmp table-header ${p.classes||''} is-atom" scope="col">${p.content||''}</th>`,
    td: (p = {}) => `<td class="cmp table-cell ${p.classes||''} is-atom">${p.content||''}</td>`,
    caption: (p = {}) => `<caption class="cmp caption ${p.classes||''} is-atom">${p.content||''}</caption>`,
    summary: (p = {}) => `<summary class="cmp summary ${p.classes||''} is-atom">${p.content||''}</summary>`,

    // --- DATA & MEDIA ---
    image: (p = {}) => `<img src="${p.src||'https://picsum.photos/200'}" alt="${p.alt||''}" class="cmp image ${p.classes||''} is-atom" loading="lazy">`,

    icon: (p = {}) => `<i data-lucide="${p.name||'circle'}" class="cmp icon ${p.classes||''} is-atom" aria-hidden="true"></i>`,

    progress: (p = {}) => Atoms._getSnippet(`atoms-progress-${p.type||'default'}-${p.state||'default'}`, (p) => `<progress class="cmp progress ${p.classes||''} is-atom" value="${p.value||0}" max="100"></progress>`, p),

    badge: (p = {}) => Atoms._getSnippet(`atoms-badge-${p.type||'default'}-${p.state||'default'}`, (p) => `<span class="cmp badge type-${p.type||'default'} ${p.classes||''} is-atom">${p.content||''}</span>`, p),

    avatar: (p = {}) => Atoms._getSnippet(`atoms-avatar-${p.type||'default'}-${p.state||'default'}`, (p) => {
        return `<div class="cmp avatar type-${p.type||'default'} ${p.classes||''} is-atom" role="img" aria-label="${p.alt||'Avatar'}"><img src="${p.src||'https://i.pravatar.cc/100'}" alt=""></div>`;
    }, p),

    status_dot: (p = {}) => Atoms._getSnippet(`atoms-status_dot-${p.type||'default'}-${p.state||'default'}`, (p) => `<span class="cmp status-dot type-${p.type||'default'} ${p.classes||''} is-atom" aria-hidden="true"></span>`, p),

    code: (p = {}) => Atoms._getSnippet(`atoms-code-default-default`, (p) => `<code class="cmp code-inline ${p.classes||''} is-atom">${p.content||''}</code>`, p),

    kbd: (p = {}) => Atoms._getSnippet(`atoms-kbd-default-default`, (p) => `<kbd class="cmp kbd ${p.classes||''} is-atom">${p.content||''}</kbd>`, p),

    time: (p = {}) => `<time datetime="${p.datetime||''}" class="cmp time ${p.classes||''} is-atom">${p.content||''}</time>`,

    streaming_dots: (p = {}) => `<span class="cmp streaming-dots ${p.classes||''} is-atom" role="status"><span>.</span><span>.</span><span>.</span></span>`,

    illustration: (p = {}) => `<div class="cmp illustration ${p.classes||''} is-atom" role="img" aria-label="Ilustracja surrealistyczna"><svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#e2e8f0" opacity="0.5"/><path d="M20 80 Q 50 10 80 80" stroke="#64748b" fill="none" stroke-width="2"/></svg></div>`,

    lottie: (p = {}) => `<div class="cmp lottie-placeholder ${p.classes||''} is-atom" role="marquee" aria-label="Animacja Lottie">🌀 [Animacja: ${p.content||'Ładowanie...'}]</div>`
};

window.Atoms = Atoms;
if (typeof module !== 'undefined') module.exports = Atoms;
