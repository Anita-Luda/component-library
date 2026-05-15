/**
 * ATOMIC COMPONENT LIBRARY
 * Precise HTML blueprints for reusable components.
 */

const Library = {
    atoms: {
        // --- TEXT ---
        heading: (p) => `<h${p.level||2} class="cmp heading type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}">${p.content}</h${p.level||2}>`,
        paragraph: (p) => `<p class="cmp paragraph type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}">${p.content}</p>`,
        span: (p) => `<span class="cmp span type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}">${p.content}</span>`,
        code: (p) => `<code class="cmp code type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}">${p.content}</code>`,

        // --- DATA DISPLAY ---
        badge: (p) => `<span class="cmp badge type-${p.type||'primary'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}">${p.content}</span>`,
        chip: (p) => `<span class="cmp chip type-${p.type||'secondary'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}">${p.content}</span>`,
        tag: (p) => `<span class="cmp tag type-${p.type||'tertiary'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}">${p.content}</span>`,
        avatar: (p) => `<img src="${p.src}" alt="${p.alt}" class="cmp avatar type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}">`,
        icon: (p) => `<i data-lucide="${p.name||'sparkles'}" class="cmp-icon icon type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}"></i>`,

        // --- FEEDBACK ---
        spinner: (p) => `<span class="cmp spinner type-${p.type||'primary'} state-${p.state||'default'} ${p.classes||''}" role="status"></span>`,
        progress: (p) => `<progress class="cmp progress type-${p.type||'primary'} state-${p.state||'default'} ${p.classes||''}" value="${p.value||50}" max="100"></progress>`,
        skeleton: (p) => `<div class="cmp skeleton type-${p.type||'default'} ${p.classes||''}" aria-hidden="true" style="width:${p.width||'100%'}; height:${p.height||'20px'}"></div>`,

        // --- FORM ATOMS ---
        label: (p) => `<label class="cmp label type-${p.type||'default'} ${p.classes||''}" for="${p.for||''}">${p.content}</label>`,
        input_raw: (p) => `<input type="${p.inputType||'text'}" id="${p.id||''}" placeholder="${p.placeholder||''}" class="cmp input type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}" ${p.disabled||p.state==='disabled'?'disabled aria-disabled="true"':''} ${p.required?'required':''} ${p.value?`value="${p.value}"`:''}>`,
        textarea_raw: (p) => `<textarea id="${p.id||''}" placeholder="${p.placeholder||''}" class="cmp textarea type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}" ${p.disabled||p.state==='disabled'?'disabled aria-disabled="true"':''}></textarea>`,
        select_raw: (p) => `<select id="${p.id||''}" class="cmp select type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}" ${p.disabled||p.state==='disabled'?'disabled aria-disabled="true"':''}>${(p.options||[]).map(o=>`<option>${o}</option>`).join('')}</select>`,
        choice_raw: (p) => `<input type="${p.inputType||'checkbox'}" id="${p.id||''}" class="cmp choice type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}" ${p.disabled||p.state==='disabled'?'disabled aria-disabled="true"':''} ${p.checked?'checked':''}>`,
        range_raw: (p) => `<input type="range" class="cmp range type-${p.type||'default'} state-${p.state||'default'} ${p.classes||''}" min="0" max="100" value="${p.value||50}">`,
        button: (p) => `<button class="cmp button type-${p.type||'primary'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} ${p.classes||''}" ${p.disabled||p.state==='disabled'?'disabled aria-disabled="true"':''}>${p.content}</button>`,

        // --- STRUCTURAL ---
        th: (p) => `<th scope="col" class="cmp th type-${p.type||'default'} ${p.classes||''}">${p.content}</th>`,
        td: (p) => `<td class="cmp td type-${p.type||'default'} ${p.classes||''}">${p.content}</td>`,
        caption: (p) => `<caption class="cmp caption type-${p.type||'default'} ${p.classes||''}">${p.content}</caption>`,
        summary: (p) => `<summary class="cmp summary type-${p.type||'default'} ${p.classes||''}">${p.content}</summary>`
    },

    molecules: {
        // --- DATA DISPLAY ---
        card: (p) => {
            const h = Library.atoms.heading({ level: 3, content: p.title, classes: 'card-header', state: p.state });
            const b = Library.atoms.paragraph({ content: p.body, classes: 'card-body', state: p.state });
            const f = p.footer ? `<footer class="card-footer">${p.footer}</footer>` : '';
            return `<article class="cmp card type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} is-molecule">${h}${b}${f}</article>`;
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
        },

        // --- FEEDBACK ---
        alert: (p) => {
            const icon = Library.atoms.icon({ name: p.icon || 'alert-circle', classes: 'alert-icon' });
            const text = Library.atoms.span({ content: p.content, classes: 'alert-content' });
            return `<div class="cmp alert type-${p.type||'primary'} state-${p.state||'default'} is-molecule" role="alert">${icon}${text}</div>`;
        },
        toast: (p) => {
            const body = Library.atoms.span({ content: p.content });
            const close = Library.atoms.button({ content: '×', type: 'tertiary', classes: 'toast-close' });
            return `<div class="cmp toast type-${p.type||'default'} state-${p.state||'default'} is-molecule">${body}${close}</div>`;
        },
        modal: (p) => {
            const h = Library.atoms.heading({ level: 3, content: p.title });
            const b = Library.atoms.paragraph({ content: p.body });
            const f = `<footer class="modal-footer">${Library.atoms.button({content:'OK'})}</footer>`;
            return `<dialog class="cmp modal type-${p.type||'default'} state-${p.state||'default'} is-molecule" open>${h}${b}${f}</dialog>`;
        },
        state_block: (p) => {
            const icon = Library.atoms.icon({ name: p.icon || 'info', classes: 'state-icon' });
            const h = Library.atoms.heading({ level: 3, content: p.title });
            const b = Library.atoms.paragraph({ content: p.body });
            return `<section class="cmp state-block type-${p.type||'default'} state-${p.state||'default'} is-molecule">${icon}${h}${b}</section>`;
        },

        // --- FORM MOLECULES ---
        form_field: (p) => {
            const id = `field-${Math.random().toString(36).substr(2, 5)}`;
            const label = Library.atoms.label({ content: p.label, for: id });
            const input = p.multiline
                ? Library.atoms.textarea_raw({ id, ...p })
                : (p.options ? Library.atoms.select_raw({ id, ...p }) : Library.atoms.input_raw({ id, ...p }));
            return `<div class="cmp form-field type-${p.type||'default'} is-molecule">${label}${input}</div>`;
        },
        choice_field: (p) => {
            const id = `choice-${Math.random().toString(36).substr(2, 5)}`;
            const input = Library.atoms.choice_raw({ id, ...p });
            const label = Library.atoms.label({ content: p.label, for: id });
            return `<div class="cmp choice-field type-${p.type||'default'} is-molecule">${input}${label}</div>`;
        },
        search_field: (p) => {
            const input = Library.atoms.input_raw({ placeholder: p.placeholder, classes: 'search-input', state: p.state });
            const icon = Library.atoms.icon({ name: 'search', classes: 'search-icon' });
            const btn = Library.atoms.button({ content: 'Szukaj', type: 'primary', classes: 'search-btn' });
            return `<div class="cmp search-field type-${p.type||'default'} is-molecule">${icon}${input}${btn}</div>`;
        },
        rating_field: (p) => {
            const label = Library.atoms.label({ content: p.label });
            const stars = `<div class="stars">${[1,2,3,4,5].map(i=>Library.atoms.icon({name:'star', classes:i<=3?'active':''})).join('')}</div>`;
            return `<div class="cmp rating-field type-${p.type||'default'} is-molecule">${label}${stars}</div>`;
        }
    }
};

if (typeof module !== 'undefined') module.exports = Library;
