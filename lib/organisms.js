/**
 * ATOMIC DESIGN - ORGANISMS
 */
const Organisms = {
    // --- AI ORGANISMS ---
    chat_window: (p) => {
        const header = `<header class="cmp chat-header is-molecule">${Atoms.icon({name:'bot'})}${Atoms.heading({level:3, content: p.title})}</header>`;
        const history = `<section class="chat-history is-molecule" style="flex:1; display:flex; flex-direction:column; gap:10px; overflow-y:auto; padding:10px;">
            ${Molecules.chat_bubble({role:'user', content: 'Cześć AI!'})}
            ${Molecules.chat_bubble({role:'bot', content: 'Dzień dobry, w czym mogę pomóc?'})}
            ${p.streaming ? Atoms.streaming_dots({}) : ''}
        </section>`;
        const input = `<footer class="chat-input is-molecule">${Atoms.input_raw({placeholder: 'Wpisz wiadomość...'})}${Atoms.button({content: 'Wyślij'})}</footer>`;
        return `<article class="cmp chat-organism is-organism" style="display:flex; flex-direction:column; height:500px;">${header}${history}${input}</article>`;
    },

    tool_logs: (p) => {
        const title = Atoms.heading({level:4, content:'Logi narzędzi'});
        const logs = `<div class="logs is-molecule">${[1,2].map(i => Atoms.code({content:`> Executing search_tool... ${i}`})).join('')}</div>`;
        return `<section class="cmp tool-logs-organism is-organism">${title}${logs}</section>`;
    },

    // --- OTHER ---
    navbar: (p) => {
        const logo = Atoms.heading({ level: 1, content: 'Logo', classes: 'brand' });
        const nav = `<nav class="nav-links">${(p.items||[]).map(it => Atoms.nav_link({content: it})).join('')}</nav>`;
        const actions = Atoms.button({ content: 'Wyloguj', type: 'secondary' });
        return `<header class="cmp navbar-organism is-organism">${logo}${nav}${actions}</header>`;
    },

    dashboard_layout: (p) => {
        const sidebar = `<aside class="cmp sidebar is-molecule">${Atoms.heading({level:4, content:'Menu'})}${Molecules.list({items:['Link 1','Link 2']})}</aside>`;
        const content = `<main class="cmp content is-molecule">${p.content||''}</main>`;
        return `<section class="cmp dashboard-organism is-organism">${sidebar}${content}</section>`;
    }
};

window.Organisms = Organisms;
if (typeof module !== 'undefined') module.exports = Organisms;
