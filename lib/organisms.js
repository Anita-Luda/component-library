/**
 * ATOMIC DESIGN - ORGANISMS
 */
const Organisms = {
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
