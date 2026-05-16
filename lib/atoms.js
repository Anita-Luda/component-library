/**
 * ATOMIC DESIGN - ATOMS
 * Native semantic tags with ARIA roles.
 */
const Atoms = {
    // --- BASIC ---
    span: (p) => `<span class="cmp span type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} is-atom" role="presentation">${p.content||''}</span>`,

    heading: (p) => {
        const lv = p.level || 1;
        return `<h${lv} class="cmp heading h${lv} type-${p.type||'default'} state-${p.state||'default'} is-atom">${p.content||''}</h${lv}>`;
    },

    paragraph: (p) => `<p class="cmp paragraph type-${p.type||'default'} state-${p.state||'default'} is-atom">${p.content||''}</p>`,

    image: (p) => `<img src="${p.src}" alt="${p.alt}" class="cmp image is-atom" loading="lazy">`,

    icon: (p) => `<i data-lucide="${p.name||'circle'}" class="cmp icon is-atom ${p.classes||''}" aria-hidden="true"></i>`,

    // --- INTERACTIVE ---
    button: (p) => `<button class="cmp button type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} is-atom" ${p.state==='disabled'?'disabled':''}>${p.content||''}</button>`,

    icon_button: (p) => `<button class="cmp icon-button type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} is-atom" aria-label="${p.label||'Przycisk'}">${Atoms.icon({name:p.icon})}</button>`,

    nav_link: (p) => `<a href="${p.href||'#'}" class="cmp nav-link type-${p.type||'default'} state-${p.state||'default'} ${p.active?'is-active':''} is-atom" ${p.active?'aria-current="page"':''}>${p.content||''}</a>`,

    // --- FORM ELEMENTS ---
    label: (p) => `<label class="cmp label is-atom" for="${p.for}">${p.content}</label>`,

    input_raw: (p) => `<input type="${p.inputType||'text'}" id="${p.id}" class="cmp input-raw type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} is-atom" placeholder="${p.placeholder||''}" ${p.state==='disabled'?'disabled':''} value="${p.value||''}">`,

    textarea_raw: (p) => `<textarea id="${p.id}" class="cmp textarea-raw type-${p.type||'default'} state-${p.state||'default'} ${p.state && p.state!=='default'?'force-'+p.state:''} is-atom" placeholder="${p.placeholder||''}" ${p.state==='disabled'?'disabled':''}>${p.content||''}</textarea>`,

    option: (p) => `<option value="${p.value}" ${p.selected?'selected':''}>${p.content}</option>`,

    checkbox: (p) => `<input type="checkbox" id="${p.id}" class="cmp checkbox state-${p.state||'default'} is-atom" ${p.checked?'checked':''} ${p.state==='disabled'?'disabled':''}>`,

    radio: (p) => `<input type="radio" name="${p.name}" id="${p.id}" class="cmp radio state-${p.state||'default'} is-atom" ${p.checked?'checked':''} ${p.state==='disabled'?'disabled':''}>`,

    progress: (p) => `<progress class="cmp progress is-atom" value="${p.value||0}" max="100"></progress>`,

    // --- SEMANTIC TEXT ---
    kbd: (p) => `<kbd class="cmp kbd is-atom">${p.content}</kbd>`,
    mark: (p) => `<mark class="cmp mark is-atom">${p.content}</mark>`,
    time: (p) => `<time datetime="${p.datetime}" class="cmp time is-atom">${p.content}</time>`,
    blockquote: (p) => `<blockquote class="cmp blockquote is-atom">${p.content}</blockquote>`,
    code: (p) => `<code class="cmp code-inline is-atom">${p.content}</code>`,

    // --- DATA DISPLAY ---
    caption: (p) => `<caption class="cmp caption is-atom">${p.content}</caption>`,
    th: (p) => `<th class="cmp table-header is-atom" scope="col">${p.content}</th>`,
    td: (p) => `<td class="cmp table-cell is-atom">${p.content}</td>`,
    summary: (p) => `<summary class="cmp summary is-atom">${p.content}</summary>`,
    badge: (p) => `<span class="cmp badge type-${p.type||'default'} is-atom">${p.content}</span>`,
    avatar: (p) => `<div class="cmp avatar type-${p.type||'default'} is-atom" role="img" aria-label="${p.alt||'Avatar'}"><img src="${p.src||'https://i.pravatar.cc/100'}" alt=""></div>`,
    status_dot: (p) => `<span class="cmp status-dot type-${p.type||'default'} is-atom" aria-hidden="true"></span>`,

    // --- MEDIA ---
    streaming_dots: (p) => `<span class="cmp streaming-dots is-atom" role="status"><span>.</span><span>.</span><span>.</span></span>`,
    illustration: (p) => `<div class="cmp illustration is-atom" role="img" aria-label="Ilustracja surrealistyczna"><svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="var(--color-primary-light)" opacity="0.5"/><path d="M20 80 Q 50 10 80 80" stroke="var(--color-primary)" fill="none" stroke-width="2"/></svg></div>`,
    lottie: (p) => `<div class="cmp lottie-placeholder is-atom" role="marquee" aria-label="Animacja Lottie">🌀 [Animacja: ${p.content||'Brak danych'}]</div>`
};

window.Atoms = Atoms;
if (typeof module !== 'undefined') module.exports = Atoms;
