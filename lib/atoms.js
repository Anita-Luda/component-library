/**
 * ATOMIC DESIGN - ATOMS
 */
const Atoms = {
    // --- TYPOGRAPHY ---
    heading: (p) => `<h${p.level||2} class="cmp heading type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom">${p.content}</h${p.level||2}>`,
    paragraph: (p) => `<p class="cmp paragraph type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom">${p.content}</p>`,
    span: (p) => `<span class="cmp span type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom">${p.content}</span>`,
    blockquote: (p) => `<blockquote class="cmp blockquote type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom">${p.content}</blockquote>`,
    code: (p) => `<code class="cmp code type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom">${p.content}</code>`,

    // --- DATA DISPLAY ---
    badge: (p) => `<span class="cmp badge type-${p.type||'primary'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom">${p.content}</span>`,
    chip: (p) => `<span class="cmp chip type-${p.type||'secondary'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom">${p.content}</span>`,
    tag: (p) => `<span class="cmp tag type-${p.type||'tertiary'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom">${p.content}</span>`,

    // --- ASSETS ---
    avatar: (p) => `<img src="${p.src}" alt="${p.alt||''}" class="cmp avatar type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom">`,
    image: (p) => `<img src="${p.src}" alt="${p.alt||''}" class="cmp image type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom">`,
    icon: (p) => `<i data-lucide="${p.name||'sparkles'}" class="cmp-icon icon type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom"></i>`,

    // --- FEEDBACK ---
    spinner: (p) => `<span class="cmp spinner type-${p.type||'primary'} state-${p.state||'default'} ${p.classes||''} is-atom" role="status"></span>`,
    progress: (p) => `<progress class="cmp progress type-${p.type||'primary'} state-${p.state||'default'} ${p.classes||''} is-atom" value="${p.value||50}" max="100"></progress>`,
    skeleton: (p) => `<div class="cmp skeleton type-${p.type||'default'} ${p.classes||''} is-atom" aria-hidden="true" style="width:${p.width||'100%'}; height:${p.height||'20px'}"></div>`,
    status_dot: (p) => `<span class="cmp status-dot type-${p.type||'success'} is-atom" title="${p.content||'Status'}"></span>`,
    streaming_dots: (p) => `<div class="cmp streaming-container is-atom"><span class="cmp streaming-dot"></span><span class="cmp streaming-dot"></span><span class="cmp streaming-dot"></span></div>`,

    // --- FORMS ---
    label: (p) => `<label class="cmp label type-${p.type||'default'} ${p.classes||''} is-atom" for="${p.for||''}">${p.content}</label>`,
    input_raw: (p) => `<input type="${p.inputType||'text'}" id="${p.id||''}" placeholder="${p.placeholder||''}" class="cmp input type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom" ${p.disabled||p.state==='disabled'?'disabled aria-disabled="true"':''}>`,
    textarea_raw: (p) => `<textarea id="${p.id||''}" placeholder="${p.placeholder||''}" class="cmp textarea type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom" ${p.disabled||p.state==='disabled'?'disabled aria-disabled="true"':''}></textarea>`,
    button: (p) => `<button class="cmp button type-${p.type||'primary'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom" ${p.disabled||p.state==='disabled'?'disabled aria-disabled="true"':''}>${p.content}</button>`,
    nav_link: (p) => `<a href="${p.href||'#'}" class="cmp nav-link type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''} is-atom" ${p.active?'aria-current="page"':''}>${p.content}</a>`,

    // --- STRUCTURAL ---
    th: (p) => `<th scope="col" class="cmp th type-${p.type||'default'} is-atom">${p.content}</th>`,
    td: (p) => `<td class="cmp td type-${p.type||'default'} is-atom">${p.content}</td>`,
    caption: (p) => `<caption class="cmp caption type-${p.type||'default'} is-atom">${p.content}</caption>`,
    summary: (p) => `<summary class="cmp summary type-${p.type||'default'} is-atom">${p.content}</summary>`,
    divider: (p) => `<hr class="cmp divider type-${p.type||'default'} is-atom">`
};

window.Atoms = Atoms;
if (typeof module !== 'undefined') module.exports = Atoms;
