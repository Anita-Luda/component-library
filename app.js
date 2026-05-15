let registry = [];
let themes = [];
let currentTheme = null;

async function init() {
    try {
        const [regRes, themeRes] = await Promise.all([
            fetch('registry.json'),
            fetch('joy_themes.json')
        ]);
        registry = await regRes.json();
        const themeData = await themeRes.json();
        themes = themeData.themes;

        setupThemeSelect();
        setupSearch();
        renderSidebar();

        const lastCompId = localStorage.getItem('last-component-id');
        if (lastCompId) {
            const comp = registry.find(c => c.id === lastCompId);
            if (comp) renderComponent(comp);
        }

        document.body.classList.remove('loading');
    } catch (e) {
        console.error("Initialization failed", e);
    }
}

function setupThemeSelect() {
    const select = document.getElementById('theme-select');
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
    document.getElementById('current-category-name').textContent = comp.name;
    document.getElementById('category-description').textContent = comp.category;
    const list = document.getElementById('component-list');
    list.innerHTML = '';

    const blueprintPath = comp.blueprint.split('.');
    const blueprintFn = Library[blueprintPath[0]][blueprintPath[1]];

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
                level: 2,
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

            variantBox.innerHTML += blueprintFn(props);
            grid.appendChild(variantBox);
        });

        section.appendChild(grid);
        list.appendChild(section);
    });
    if (window.lucide) window.lucide.createIcons();
}

window.addEventListener('DOMContentLoaded', init);
