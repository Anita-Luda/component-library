/**
 * ATOMIC DESIGN - ATOMS
 * Native semantic tags with ARIA roles.
 * All atoms return PURE HTML strings.
 */
const Atoms = {
    // --- TYPOGRAPHY ---
    span: (p = {}) => {
        const classes = `cmp span type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        return `<span class="${classes}" role="presentation">${p.content||''}</span>`;
    },

    heading: (p = {}) => {
        const lv = Math.min(Math.max(parseInt(p.level || 1), 1), 6);
        const classes = `cmp heading h${lv} type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        return `<h${lv} class="${classes}">${p.content||''}</h${lv}>`;
    },

    paragraph: (p = {}) => {
        const classes = `cmp paragraph type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        return `<p class="${classes}">${p.content||''}</p>`;
    },

    overline: (p = {}) => {
        const classes = `cmp overline type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        return `<span class="${classes}" role="text">${p.content||''}</span>`;
    },

    // --- INTERACTIVE ---
    button: (p = {}) => {
        const classes = `cmp button type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = p.state === 'disabled' ? 'disabled' : '';
        return `<button class="${classes}" ${attr}>${p.content||''}</button>`;
    },

    icon_button: (p = {}) => {
        const classes = `cmp icon-button type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = p.state === 'disabled' ? 'disabled' : '';
        const icon = `<i data-lucide="${p.icon||'circle'}" aria-hidden="true"></i>`;
        return `<button class="${classes}" aria-label="${p.label||'Przycisk'}" ${attr}>${icon}</button>`;
    },

    nav_link: (p = {}) => {
        const classes = `cmp nav-link type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.active?'is-active':''} ${p.classes||''} is-atom`;
        const attr = p.active ? 'aria-current="page"' : '';
        return `<a href="${p.href||'#'}" class="${classes}" ${attr}>${p.content||''}</a>`;
    },

    // --- FORM ELEMENTS ---
    label: (p = {}) => {
        const classes = `cmp label ${p.classes||''} is-atom`;
        return `<label class="${classes}" for="${p.for||''}">${p.content||''}</label>`;
    },

    input_raw: (p = {}) => {
        const type = p.inputType || p.type || "text";
        const classes = `cmp input-raw type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = p.state === 'disabled' ? 'disabled' : '';
        return `<input type="${type}" id="${p.id||''}" class="${classes}" placeholder="${p.placeholder||''}" ${attr} value="${p.value||''}">`;
    },

    textarea_raw: (p = {}) => {
        const classes = `cmp textarea-raw type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = p.state === 'disabled' ? 'disabled' : '';
        return `<textarea id="${p.id||''}" class="${classes}" placeholder="${p.placeholder||''}" ${attr}>${p.content||''}</textarea>`;
    },

    select_raw: (p = {}) => {
        const classes = `cmp select-raw type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = p.state === 'disabled' ? 'disabled' : '';
        const options = (p.options || ['Opcja 1', 'Opcja 2']).map(o => `<option>${o}</option>`).join('');
        return `<select id="${p.id||''}" class="${classes}" ${attr}>${options}</select>`;
    },

    checkbox: (p = {}) => {
        const classes = `cmp checkbox state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = (p.checked ? 'checked' : '') + ' ' + (p.state === 'disabled' ? 'disabled' : '');
        return `<input type="checkbox" id="${p.id||''}" class="${classes}" ${attr}>`;
    },

    radio: (p = {}) => {
        const classes = `cmp radio state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = (p.checked ? 'checked' : '') + ' ' + (p.state === 'disabled' ? 'disabled' : '');
        return `<input type="radio" name="${p.name||'radio-group'}" id="${p.id||''}" class="${classes}" ${attr}>`;
    },

    toggle_raw: (p = {}) => {
        const classes = `cmp toggle-raw state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = (p.checked ? 'checked' : '') + ' ' + (p.state === 'disabled' ? 'disabled' : '');
        return `<input type="checkbox" role="switch" id="${p.id||''}" class="${classes}" ${attr}>`;
    },

    range_raw: (p = {}) => {
        const classes = `cmp range-raw state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom`;
        const attr = p.state === 'disabled' ? 'disabled' : '';
        return `<input type="range" id="${p.id||''}" class="${classes}" min="${p.min||0}" max="${p.max||100}" value="${p.value||50}" ${attr}>`;
    },

    // --- DATA & TABLES ---
    th: (p = {}) => `<th class="cmp table-header ${p.classes||''} is-atom" scope="col">${p.content||''}</th>`,
    td: (p = {}) => `<td class="cmp table-cell ${p.classes||''} is-atom">${p.content||''}</td>`,
    caption: (p = {}) => `<caption class="cmp caption ${p.classes||''} is-atom">${p.content||''}</caption>`,
    summary: (p = {}) => `<summary class="cmp summary ${p.classes||''} is-atom">${p.content||''}</summary>`,

    // --- DATA & MEDIA ---
    image: (p = {}) => `<img src="${p.src||'https://picsum.photos/200'}" alt="${p.alt||''}" class="cmp image ${p.classes||''} is-atom" loading="lazy">`,

    icon: (p = {}) => `<i data-lucide="${p.name||'circle'}" class="cmp icon ${p.classes||''} is-atom" aria-hidden="true"></i>`,

    progress: (p = {}) => `<progress class="cmp progress ${p.classes||''} is-atom" value="${p.value||0}" max="100"></progress>`,

    badge: (p = {}) => `<span class="cmp badge type-${p.type||'default'} ${p.classes||''} is-atom">${p.content||''}</span>`,

    avatar: (p = {}) => {
        return `<div class="cmp avatar type-${p.type||'default'} ${p.classes||''} is-atom" role="img" aria-label="${p.alt||'Avatar'}">
            <img src="${p.src||'https://i.pravatar.cc/100'}" alt="">
        </div>`;
    },

    status_dot: (p = {}) => `<span class="cmp status-dot type-${p.type||'default'} ${p.classes||''} is-atom" aria-hidden="true"></span>`,

    code: (p = {}) => `<code class="cmp code-inline ${p.classes||''} is-atom">${p.content||''}</code>`,

    kbd: (p = {}) => `<kbd class="cmp kbd ${p.classes||''} is-atom">${p.content||''}</kbd>`,

    time: (p = {}) => `<time datetime="${p.datetime||''}" class="cmp time ${p.classes||''} is-atom">${p.content||''}</time>`,

    streaming_dots: (p = {}) => `<span class="cmp streaming-dots ${p.classes||''} is-atom" role="status"><span>.</span><span>.</span><span>.</span></span>`,

    illustration: (p = {}) => `<div class="cmp illustration ${p.classes||''} is-atom" role="img" aria-label="Ilustracja surrealistyczna"><svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#e2e8f0" opacity="0.5"/><path d="M20 80 Q 50 10 80 80" stroke="#64748b" fill="none" stroke-width="2"/></svg></div>`,

    lottie: (p = {}) => `<div class="cmp lottie-placeholder ${p.classes||''} is-atom" role="marquee" aria-label="Animacja Lottie">🌀 [Animacja: ${p.content||'Ładowanie...'}]</div>`
};

window.Atoms = Atoms;
if (typeof module !== 'undefined') module.exports = Atoms;
