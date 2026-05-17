import { Library } from './library.js';
import { Atoms } from './lib/atoms.js';

let registry = [];
let themes = [];
let currentTheme = null;

async function init() {
    try {
        // Load catalog first
        await Library.init();

        const [regAtoms, regMols, regOrgs, regTemps, themeRes] = await Promise.all([
            fetch('lib/registry/atoms.json'),
            fetch('lib/registry/molecules.json'),
            fetch('lib/registry/organisms.json'),
            fetch('lib/registry/templates.json'),
            fetch('joy_themes.json')
        ]);

        const segments = await Promise.all([
            regAtoms.json(),
            regMols.json(),
            regOrgs.json(),
            regTemps.json()
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

function renderComponent(comp) {
    localStorage.setItem('last-component-id', comp.id);
    const titleEl = document.getElementById('current-category-name');
    if (titleEl) titleEl.textContent = comp.name;
    const descEl = document.getElementById('category-description');
    if (descEl) descEl.textContent = comp.category;
    const list = document.getElementById('component-list');
    if (!list) return;
    list.innerHTML = '';

    if (comp.profile === 'template') {
        const section = document.createElement('section');
        section.className = 'template-showcase';
        const props = {
            title: getContent('medium'),
            body: getContent('long')
        };
        section.innerHTML = Library.get(comp.blueprint, props);
        list.appendChild(section);
    } else {
        comp.types.forEach(type => {
            const section = document.createElement('section');
            section.innerHTML = `<h2>Typ: ${type}</h2>`;
            const grid = document.createElement('div');
            grid.className = 'variants-grid';

            comp.states.forEach(state => {
                const variantBox = document.createElement('article');
                variantBox.className = 'variant-box';
                variantBox.innerHTML = `<header><span class="state-label">${state}</span></header>`;

                const isVideo = comp.id.includes('video');
                const isAudio = comp.id.includes('audio');

                const props = {
                    type, state,
                    content: getContent(comp.profile === 'atom' ? 'short' : 'medium'),
                    level: type.startsWith('h') ? parseInt(type.substring(1)) : 2,
                    src: `https://picsum.photos/seed/${comp.id}/100/100`,
                    alt: 'Asset',
                    placeholder: getContent('short'),
                    headers: ['Kolumna 1', 'Kolumna 2'],
                    rows: [[getContent('tiny'), getContent('short')]],
                    items: [getContent('short'), getContent('short')],
                    title: getContent('medium'),
                    label: getContent('short'),
                    value: 42,
                    body: getContent('long'),
                    caption: getContent('medium'),
                    isVideo, isAudio,
                    footer: Atoms.badge({ content: getContent('tiny'), type: 'primary' })
                };

                let html = Library.get(comp.blueprint, props);
                variantBox.innerHTML += (html || '');
                grid.appendChild(variantBox);
            });

            section.appendChild(grid);
            list.appendChild(section);
        });
    }
    if (window.lucide) window.lucide.createIcons();
}

window.addEventListener('DOMContentLoaded', init);
