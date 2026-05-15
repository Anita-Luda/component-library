/**
 * ATOMIC DESIGN - MOLECULES
 */
const Molecules = {
    // --- AI MOLECULES ---
    chat_bubble: (p) => {
        const text = Atoms.span({ content: p.content });
        const meta = Atoms.span({ content: p.role === 'user' ? 'Ty' : 'AI', classes: 'meta' });
        return `<div class="cmp chat-bubble ${p.role} is-molecule">${meta}${text}</div>`;
    },
    ai_citation: (p) => {
        const icon = Atoms.icon({ name: 'bookmark', classes: 'citation-icon' });
        const link = Atoms.nav_link({ content: p.content, href: p.url });
        return `<span class="cmp ai-citation is-molecule">${icon}${link}</span>`;
    },
    token_display: (p) => {
        const icon = Atoms.icon({ name: 'database' });
        const count = Atoms.badge({ content: p.count, type: 'tertiary' });
        return `<div class="cmp token-display is-molecule">${icon}<span>Tokeny:</span>${count}</div>`;
    },

    // --- DISPLAY ---
    card: (p) => {
        const h = Atoms.heading({ level: 3, content: p.title, classes: 'card-header', state: p.state });
        const b = Atoms.paragraph({ content: p.body, classes: 'card-body', state: p.state });
        const f = p.footer ? `<footer class="card-footer">${p.footer}</footer>` : '';
        return `<article class="cmp card type-${p.type||'default'} state-${p.state||'default'} ${p.state!=='default'?'force-'+p.state:''} is-molecule">${h}${b}${f}</article>`;
    },
    table: (p) => {
        const cap = p.caption ? Atoms.caption({ content: p.caption }) : '';
        const ths = (p.headers||[]).map(h => Atoms.th({ content: h })).join('');
        const trs = (p.rows||[]).map(r => `<tr>${r.map(c => Atoms.td({ content: c })).join('')}</tr>`).join('');
        return `<table class="cmp table type-${p.type||'default'} state-${p.state||'default'} is-molecule profile-data">${cap}<thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
    },
    list: (p) => {
        const items = (p.items||[]).map(i => `<li class="cmp list-item is-atom">${i}</li>`).join('');
        return `<ul class="cmp list type-${p.type||'default'} state-${p.state||'default'} is-molecule">${items}</ul>`;
    },
    accordion: (p) => {
        const sum = Atoms.summary({ content: p.title });
        const content = Atoms.paragraph({ content: p.body });
        return `<details class="cmp accordion type-${p.type||'default'} state-${p.state||'default'} is-molecule" open>${sum}${content}</details>`;
    },
    media_block: (p) => {
        const title = Atoms.heading({ level: 4, content: p.title });
        const media = p.isVideo ? `<video controls class="cmp video is-atom"><source src="#"></video>` : (p.isAudio ? `<audio controls class="cmp audio is-atom"><source src="#"></audio>` : Atoms.image({src:p.src, alt:p.title}));
        const cap = Atoms.span({ content: p.caption, classes: 'media-caption' });
        return `<figure class="cmp media-block type-${p.type||'default'} is-molecule">${media}<figcaption>${title}${cap}</figcaption></figure>`;
    },

    // --- FORMS ---
    form_field: (p) => {
        const id = `field-${Math.random().toString(36).substr(2, 5)}`;
        const label = Atoms.label({ content: p.label, for: id });
        const input = p.multiline ? Atoms.textarea_raw({ id, ...p }) : Atoms.input_raw({ id, ...p });
        return `<div class="cmp form-field is-molecule">${label}${input}</div>`;
    },

    // --- NAV ---
    breadcrumb: (p) => {
        const items = (p.items||[]).map((it, i, arr) => `<li>${Atoms.nav_link({ content: it, active: i === arr.length - 1 })}${i < arr.length - 1 ? '<span class="sep">/</span>' : ''}</li>`).join('');
        return `<nav aria-label="Breadcrumb" class="cmp breadcrumb is-molecule"><ul>${items}</ul></nav>`;
    }
};

window.Molecules = Molecules;
if (typeof module !== 'undefined') module.exports = Molecules;
