import { Library } from './library.js';
import { Atoms } from './lib/atoms.js';

let registry = [];
let themes = [];
let currentTheme = null;

async function init() {
    try {
        await Library.init();

        const [regAtoms, regMols, regOrgs, regTemps, themeRes] = await Promise.all([
            fetch('lib/registry/atoms.json'),
            fetch('lib/registry/molecules.json'),
            fetch('lib/registry/organisms.json'),
            fetch('lib/registry/templates.json'),
            fetch('joy_themes.json')
        ]);

        const segments = await Promise.all([
            regAtoms.json(), regMols.json(), regOrgs.json(), regTemps.json()
        ]);

        registry = segments.flat();
        window.registry = registry;

        const themeData = await themeRes.json();
        themes = themeData.themes;

        setupThemeSelect();
        setupSearch();
        renderSidebar();

        const params = new URLSearchParams(window.location.search);
        const urlCompId = params.get('component');
        const lastCompId = localStorage.getItem('last-component-id');

        let targetComp = null;
        if (urlCompId) {
            targetComp = registry.find(c => c.id === urlCompId || c.name === urlCompId);
        } else if (lastCompId) {
            targetComp = registry.find(c => c.id === lastCompId);
        }

        if (targetComp) renderComponent(targetComp);

        document.body.classList.remove('loading');
    } catch (e) {
        console.error("Initialization failed", e);
    }
}

function setupThemeSelect() {
    const select = document.getElementById('theme-select');
    if (!select) return;
    themes.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id; opt.textContent = t.name;
        select.appendChild(opt);
    });

    const savedTheme = localStorage.getItem('current-theme-id') || themes[0].id;
    select.value = savedTheme;
    currentTheme = themes.find(t => t.id === savedTheme);

    select.addEventListener('change', (e) => {
        currentTheme = themes.find(t => t.id === e.target.value);
        localStorage.setItem('current-theme-id', currentTheme.id);
        const lastCompId = localStorage.getItem('last-component-id');
        if (lastCompId) renderComponent(registry.find(c => c.id === lastCompId));
    });
}

function setupSearch() {
    const search = document.getElementById('comp-search');
    if(!search) return;
    search.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.nav-item').forEach(it => {
            const visible = it.textContent.toLowerCase().includes(term);
            it.parentElement.style.display = visible ? 'block' : 'none';
        });
    });
}

function renderSidebar() {
    const nav = document.getElementById('category-nav');
    if (!nav) return;
    const categories = [...new Set(registry.map(c => c.category))];
    categories.forEach(cat => {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = cat;
        details.appendChild(summary);
        const ul = document.createElement('ul');
        registry.filter(c => c.category === cat).forEach(comp => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'nav-item'; a.textContent = comp.name; a.href = "#";
            a.addEventListener('click', (e) => { e.preventDefault(); renderComponent(comp); });
            li.appendChild(a); ul.appendChild(li);
        });
        details.appendChild(ul); nav.appendChild(details);
    });
}

function getContent(type) {
    if (!currentTheme) return "...";
    const pool = currentTheme.content[type] || currentTheme.content.medium;
    return pool[Math.floor(Math.random() * pool.length)];
}

async function renderComponent(comp) {
    localStorage.setItem('last-component-id', comp.id);
    document.getElementById('current-category-name').textContent = comp.name;
    document.getElementById('category-description').textContent = comp.category;
    const list = document.getElementById('component-list');
    list.innerHTML = '<div class="loading-spinner">Wczytywanie...</div>';

    // Try to load hand-written showcase first
    const showcaseMap = {
        '1. UNIVERSAL - Input / Form': 'forms',
        '1. UNIVERSAL - Typography & Media': 'typography',
        '1. UNIVERSAL - Data Display': 'data_display',
        '1. UNIVERSAL - Feedback / State': 'feedback'
    };

    const showcaseFile = showcaseMap[comp.category];
    if (showcaseFile) {
        try {
            const res = await fetch(`lib/showcase/${showcaseFile}.html`);
            if (res.ok) {
                let html = await res.text();
                html = await parseShowcase(html, comp);
                list.innerHTML = html;
                if (window.lucide) window.lucide.createIcons();
                return;
            }
        } catch(e) { console.warn("Showcase not found, falling back to generator"); }
    }

    // Fallback to generator
    renderGeneratedShowcase(comp);
}

async function parseShowcase(html, comp) {
    // Replace {{atoms.tag.type.state}} with real library calls
    const regex = /\{\{(atoms|molecules|organisms)\.([a-z0-9_]+)(\.([a-z0-9_]+))?(\.([a-z0-9_]+))?\}\}/g;

    // We use a trick to wait for all replacements
    const matches = Array.from(html.matchAll(regex));
    for (const match of matches) {
        const [full, layer, component, , type, , state] = match;
        const props = {
            type: type || 'default',
            state: state || 'default',
            content: getContent(layer === 'atoms' ? 'short' : 'medium'),
            title: getContent('medium'),
            label: getContent('short'),
            placeholder: getContent('short'),
            src: `https://picsum.photos/seed/${component}/100/100`,
            alt: 'Asset',
            items: [getContent('short'), getContent('short')],
            caption: getContent('medium')
        };
        const rendered = Library.get(`${layer}.${component}`, props);
        html = html.replace(full, rendered);
    }
    return html;
}

function renderGeneratedShowcase(comp) {
    const list = document.getElementById('component-list');
    list.innerHTML = '';

    const targetProfiles = comp.profile === 'template' ? [comp] : comp.types.map(t => ({...comp, currentType: t}));

    targetProfiles.forEach(profile => {
        const section = document.createElement('section');
        section.innerHTML = `<h2>Wariant: ${profile.currentType || profile.name}</h2>`;
        const grid = document.createElement('div');
        grid.className = 'variants-grid';

        const states = profile.states || ['default'];
        states.forEach(state => {
            const variantBox = document.createElement('article');
            variantBox.className = 'variant-box';
            variantBox.innerHTML = `<header><span class="state-label">${state}</span></header>`;

            const props = {
                type: profile.currentType || 'default',
                state,
                content: getContent(comp.profile === 'atom' ? 'short' : 'medium'),
                title: getContent('medium'),
                src: `https://picsum.photos/seed/${comp.id}/100/100`,
                alt: 'Asset'
            };

            variantBox.innerHTML += Library.get(comp.blueprint, props);
            grid.appendChild(variantBox);
        });
        section.appendChild(grid);
        list.appendChild(section);
    });
    if (window.lucide) window.lucide.createIcons();
}

window.addEventListener('DOMContentLoaded', init);
