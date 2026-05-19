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
        setupStyleSelect();
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
        refreshCurrentComponent();
    });
}

function setupStyleSelect() {
    const select = document.getElementById('style-select');
    if (!select) return;

    const savedStyle = localStorage.getItem('current-style') || 'modern';
    select.value = savedStyle;
    document.documentElement.setAttribute('data-style', savedStyle);

    select.addEventListener('change', (e) => {
        const style = e.target.value;
        document.documentElement.setAttribute('data-style', style);
        localStorage.setItem('current-style', style);
        refreshCurrentComponent();
    });
}

function refreshCurrentComponent() {
    const lastCompId = localStorage.getItem('last-component-id');
    if (lastCompId) renderComponent(registry.find(c => c.id === lastCompId));
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

        // Wrap in code-capable container if it's a showcase item
        const wrapped = `
            <div class="variant-box">
                <button class="code-trigger" title="Pokaż kod HTML"><i data-lucide="code"></i></button>
                <div class="code-panel">
                    <button class="copy-btn">Kopiuj</button>
                    <code class="html-content">${escapeHTML(rendered)}</code>
                </div>
                ${rendered}
            </div>
        `;

        html = html.replace(full, wrapped);
    }
    return html;
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
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

            const props = {
                type: profile.currentType || 'default',
                state,
                content: getContent(comp.profile === 'atom' ? 'short' : 'medium'),
                title: getContent('medium'),
                src: `https://picsum.photos/seed/${comp.id}/100/100`,
                alt: 'Asset'
            };

            const rendered = Library.get(comp.blueprint, props);

            variantBox.innerHTML = `
                <header class="flex-between" style="width:100%">
                    <span class="state-label">${state}</span>
                    <button class="code-trigger" title="Pokaż kod HTML"><i data-lucide="code"></i></button>
                </header>
                <div class="code-panel">
                    <button class="copy-btn">Kopiuj</button>
                    <code class="html-content">${escapeHTML(rendered)}</code>
                </div>
                ${rendered}
            `;
            grid.appendChild(variantBox);
        });
        section.appendChild(grid);
        list.appendChild(section);
    });
    if (window.lucide) window.lucide.createIcons();
    attachCodeEvents();
}

function attachCodeEvents() {
    document.querySelectorAll('.code-trigger').forEach(btn => {
        btn.onclick = () => {
            const panel = btn.parentElement.querySelector('.code-panel');
            panel.classList.toggle('active');
        };
    });

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.onclick = () => {
            const code = btn.parentElement.querySelector('.html-content').textContent;
            navigator.clipboard.writeText(code);
            const originalText = btn.textContent;
            btn.textContent = 'Skopiowano!';
            btn.style.background = '#145c2a';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '#444';
            }, 2000);
        };
    });
}

window.addEventListener('DOMContentLoaded', init);
