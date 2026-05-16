/**
 * ATOMIC DESIGN - ATOMS
 * Native semantic tags with ARIA roles.
 */
const Atoms = {
    // --- BASIC ---
    span: (p = {}) => `<span class="cmp span type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom" role="presentation">${p.content||''}</span>`,

    // Supporting H1-H6 explicitly
    heading: (p = {}) => {
        const lv = p.level || 1;
        // Ensuring level is between 1 and 6
        const safeLv = Math.min(Math.max(parseInt(lv), 1), 6);
        return `<h${safeLv} class="cmp heading h${safeLv} type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''} is-atom">${p.content||''}</h${safeLv}>`;
    },

    // Supporting 'default', 'lead' types
    paragraph: (p = {}) => `<p class="cmp paragraph type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''} is-atom">${p.content||''}</p>`,

    // Supporting 'overline' via span/p type
    overline: (p = {}) => `<span class="cmp overline type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''} is-atom" role="text">${p.content||''}</span>`,

    image: (p = {}) => `<img src="${p.src}" alt="${p.alt}" class="cmp image ${p.classes||''} is-atom" loading="lazy">`,

    icon: (p = {}) => `<i data-lucide="${p.name||'circle'}" class="cmp icon ${p.classes||''} is-atom" aria-hidden="true"></i>`,

    // --- INTERACTIVE ---
    button: (p = {}) => `<button class="cmp button type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom" ${p.state==='disabled'?'disabled':''}>${p.content||''}</button>`,

    icon_button: (p = {}) => `<button class="cmp icon-button type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom" aria-label="${p.label||'Przycisk'}">${Atoms.icon({name:p.icon})}</button>`,

    nav_link: (p = {}) => `<a href="${p.href||'#'}" class="cmp nav-link type-${p.type||'default'} state-${p.state||'default'} ${p.active?'is-active':''} ${p.classes||''} is-atom" ${p.active?'aria-current="page"':''}>${p.content||''}</a>`,

    // --- FORM ELEMENTS ---
    label: (p = {}) => `<label class="cmp label ${p.classes||''} is-atom" for="${p.for}">${p.content}</label>`,

    input_raw: (p = {}) => `<input type="${p.inputType||'text'}" id="${p.id}" class="cmp input-raw type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom" placeholder="${p.placeholder||''}" ${p.state==='disabled'?'disabled':''} value="${p.value||''}">`,

    textarea_raw: (p = {}) => `<textarea id="${p.id}" class="cmp textarea-raw type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom" placeholder="${p.placeholder||''}" ${p.state==='disabled'?'disabled':''}>${p.content||''}</textarea>`,

    option: (p = {}) => `<option value="${p.value}" ${p.selected?'selected':''} class="${p.classes||''}">${p.content}</option>`,

    checkbox: (p = {}) => `<input type="checkbox" id="${p.id}" class="cmp checkbox state-${p.state||'default'} ${p.classes||''} is-atom" ${p.checked?'checked':''} ${p.state==='disabled'?'disabled':''}>`,

    radio: (p = {}) => `<input type="radio" name="${p.name}" id="${p.id}" class="cmp radio state-${p.state||'default'} ${p.classes||''} is-atom" ${p.checked?'checked':''} ${p.state==='disabled'?'disabled':''}>`,

    progress: (p = {}) => `<progress class="cmp progress ${p.classes||''} is-atom" value="${p.value||0}" max="100"></progress>`,

    // --- SEMANTIC TEXT ---
    kbd: (p = {}) => `<kbd class="cmp kbd ${p.classes||''} is-atom">${p.content}</kbd>`,
    mark: (p = {}) => `<mark class="cmp mark ${p.classes||''} is-atom">${p.content}</mark>`,
    time: (p = {}) => `<time datetime="${p.datetime}" class="cmp time ${p.classes||''} is-atom">${p.content}</time>`,
    blockquote: (p = {}) => `<blockquote class="cmp blockquote ${p.classes||''} is-atom">${p.content}</blockquote>`,
    code: (p = {}) => `<code class="cmp code-inline ${p.classes||''} is-atom">${p.content}</code>`,

    // --- DATA DISPLAY ---
    caption: (p = {}) => `<caption class="cmp caption ${p.classes||''} is-atom">${p.content}</caption>`,
    th: (p = {}) => `<th class="cmp table-header ${p.classes||''} is-atom" scope="col">${p.content}</th>`,
    td: (p = {}) => `<td class="cmp table-cell ${p.classes||''} is-atom">${p.content}</td>`,
    summary: (p = {}) => `<summary class="cmp summary ${p.classes||''} is-atom">${p.content}</summary>`,
    badge: (p = {}) => `<span class="cmp badge type-${p.type||'default'} ${p.classes||''} is-atom">${p.content}</span>`,
    avatar: (p = {}) => `<div class="cmp avatar type-${p.type||'default'} ${p.classes||''} is-atom" role="img" aria-label="${p.alt||'Avatar'}"><img src="${p.src||'https://i.pravatar.cc/100'}" alt=""></div>`,
    status_dot: (p = {}) => `<span class="cmp status-dot type-${p.type||'default'} ${p.classes||''} is-atom" aria-hidden="true"></span>`,

    // --- MEDIA ---
    streaming_dots: (p = {}) => `<span class="cmp streaming-dots ${p.classes||''} is-atom" role="status"><span>.</span><span>.</span><span>.</span></span>`,
    illustration: (p = {}) => `<div class="cmp illustration ${p.classes||''} is-atom" role="img" aria-label="Ilustracja surrealistyczna"><svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="var(--color-primary-light)" opacity="0.5"/><path d="M20 80 Q 50 10 80 80" stroke="var(--color-primary)" fill="none" stroke-width="2"/></svg></div>`,
    lottie: (p = {}) => `<div class="cmp lottie-placeholder ${p.classes||''} is-atom" role="marquee" aria-label="Animacja Lottie">🌀 [Animacja: ${p.content||'Brak danych'}]</div>`
};

window.Atoms = Atoms;
if (typeof module !== 'undefined') module.exports = Atoms;
