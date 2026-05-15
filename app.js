let registry = [];
let themes = [];
let currentTheme = null;

const stateList = ["default", "hover", "focus", "active", "disabled", "error", "success"];

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

        // Initialize Lucide icons if available
        if (window.lucide) {
            window.lucide.createIcons();
        }
    } catch (e) {
        console.error("Initialization failed", e);
    }
}

function setupThemeSelect() {
    const select = document.getElementById('theme-select');
    themes.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.name;
        select.appendChild(opt);
    });

    const savedTheme = localStorage.getItem('current-theme-id') || themes[0].id;
    select.value = savedTheme;
    currentTheme = themes.find(t => t.id === savedTheme);

    select.addEventListener('change', (e) => {
        currentTheme = themes.find(t => t.id === e.target.value);
        localStorage.setItem('current-theme-id', currentTheme.id);
        refreshContent();
    });
}

function setupSearch() {
    const search = document.getElementById('comp-search');
    search.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(it => {
            const visible = it.textContent.toLowerCase().includes(term);
            it.parentElement.style.display = visible ? 'block' : 'none';
        });

        const categories = document.querySelectorAll('#category-nav details');
        categories.forEach(det => {
            const hasVisibleChild = Array.from(det.querySelectorAll('.nav-item')).some(li => li.parentElement.style.display !== 'none');
            det.style.display = (hasVisibleChild || term === '') ? 'block' : 'none';
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
            a.className = 'nav-item';
            a.textContent = comp.name;
            a.href = "#";
            a.addEventListener('click', (e) => {
                e.preventDefault();
                renderComponent(comp);
            });
            li.appendChild(a);
            ul.appendChild(li);
        });

        details.appendChild(ul);
        nav.appendChild(details);
    });
}

function refreshContent() {
    const activeCompId = localStorage.getItem('last-component-id');
    if (activeCompId) {
        const comp = registry.find(c => c.id === activeCompId);
        if (comp) renderComponent(comp);
    }
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

    comp.types.forEach(type => {
        const section = document.createElement('section');
        section.ariaLabel = `Warianty typu ${type}`;

        const typeHeading = document.createElement('h2');
        typeHeading.textContent = `Typ: ${type}`;
        section.appendChild(typeHeading);

        const grid = document.createElement('div');
        grid.className = 'variants-grid';

        comp.states.forEach(state => {
            const variant = document.createElement('article');
            variant.className = 'variant-box';
            variant.innerHTML = `<header><span class="state-label">${state}</span></header>`;

            const element = createComponentElement(comp, type, state);
            variant.appendChild(element);
            grid.appendChild(variant);
        });

        section.appendChild(grid);
        list.appendChild(section);
    });

    if (window.lucide) window.lucide.createIcons();
}

function getIcon(name = 'sparkles') {
    const icons = ['sparkles', 'rocket', 'zap', 'ghost', 'flame', 'smile', 'cookie', 'coffee', 'cloud', 'moon'];
    const icon = icons[Math.floor(Math.random() * icons.length)];
    return `<i data-lucide="${icon}" class="cmp-icon"></i>`;
}

function createComponentElement(comp, type, state) {
    const tag = comp.tag || 'div';
    const el = document.createElement(tag);
    const slug = comp.id;

    el.className = `cmp ${slug} type-${type} state-${state} profile-${comp.profile}`;
    el.id = `cmp-${slug}-${type}-${state}`;

    // WCAG & ARIA
    if (comp.role) el.setAttribute('role', comp.role);
    if (state === 'disabled') {
        el.setAttribute('aria-disabled', 'true');
        if (['button', 'input', 'select', 'textarea'].includes(tag)) el.disabled = true;
    }
    if (state === 'error') el.setAttribute('aria-invalid', 'true');

    const content = getContent(comp.content_type);

    // Profile-based rendering
    if (comp.profile === 'atomic') {
        if (tag === 'img') {
            el.src = `https://picsum.photos/seed/${slug}/200/200`;
            el.alt = content;
        } else {
            let html = comp.has_icon ? getIcon() : '';
            html += `<span>${content}</span>`;
            el.innerHTML = html;
        }
    }
    else if (comp.profile === 'text') {
        if (tag === 'input') {
            el.type = 'text';
            el.placeholder = content;
            el.setAttribute('aria-label', comp.name);
        } else if (tag === 'textarea') {
            el.placeholder = content;
            el.setAttribute('aria-label', comp.name);
        } else {
            el.textContent = content;
        }
    }
    else if (comp.profile === 'group') {
        if (tag === 'select') {
            for(let i=1; i<=3; i++) {
                const opt = document.createElement('option');
                opt.textContent = getContent('short');
                el.appendChild(opt);
            }
        } else if (tag === 'details') {
            const sum = document.createElement('summary');
            sum.textContent = getContent('short');
            el.appendChild(sum);
            const p = document.createElement('p');
            p.textContent = getContent('medium');
            el.appendChild(p);
        } else if (tag === 'ul' || tag === 'ol') {
            for(let i=1; i<=3; i++) {
                const li = document.createElement('li');
                li.textContent = getContent('short');
                el.appendChild(li);
            }
        } else if (tag === 'nav') {
            // Tabs/Pills simulation
            const ul = document.createElement('ul');
            ul.role = 'tablist';
            for(let i=1; i<=3; i++) {
                const li = document.createElement('li');
                li.role = 'presentation';
                const btn = document.createElement('button');
                btn.role = 'tab';
                btn.textContent = getContent('tiny');
                btn.ariaSelected = i === 1 ? 'true' : 'false';
                li.appendChild(btn);
                ul.appendChild(li);
            }
            el.appendChild(ul);
        } else if (tag === 'input') {
            // Checkbox/Radio wrapper
            const wrap = document.createElement('label');
            wrap.className = 'choice-wrap';
            el.type = slug.includes('radio') ? 'radio' : 'checkbox';
            wrap.appendChild(el);
            wrap.appendChild(document.createTextNode(" " + getContent('short')));
            return wrap;
        }
    }
    else if (comp.profile === 'hierarchical') {
        el.appendChild(createNestedSemanticStructure(1, 2, tag === 'ol' ? 'ol' : 'ul'));
    }
    else if (comp.profile === 'data') {
        if (tag === 'table') {
            const caption = document.createElement('caption');
            caption.textContent = content;
            el.appendChild(caption);
            const thead = document.createElement('thead');
            const trh = document.createElement('tr');
            for(let i=0; i<3; i++) {
                const th = document.createElement('th');
                th.scope = 'col';
                th.textContent = getContent('tiny');
                trh.appendChild(th);
            }
            thead.appendChild(trh);
            el.appendChild(thead);
            const tbody = document.createElement('tbody');
            for(let r=0; r<3; r++) {
                const tr = document.createElement('tr');
                for(let c=0; c<3; c++) {
                    const td = document.createElement('td');
                    td.textContent = getContent('short');
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            el.appendChild(tbody);
        } else if (tag === 'figure') {
            const img = document.createElement('img');
            img.src = `https://picsum.photos/seed/${slug}/600/300`;
            img.alt = content;
            el.appendChild(img);
            const cap = document.createElement('figcaption');
            cap.textContent = content;
            el.appendChild(cap);
        }
    }
    else if (comp.profile === 'layout' || comp.profile === 'feedback') {
        if (tag === 'dialog') {
            el.innerHTML = `<form method="dialog"><h3>${getContent('medium')}</h3><p>${getContent('long')}</p><button>Zamknij</button></form>`;
            el.setAttribute('open', ''); // For preview
            el.style.position = 'static'; el.style.display = 'block'; // Force visible in grid
        } else {
            let html = comp.has_icon ? getIcon() : '';
            html += `<h3>${getContent('medium')}</h3><p>${getContent('long')}</p>`;
            el.innerHTML = html;
        }
    }

    return el;
}

function createNestedSemanticStructure(level, max, listTag) {
    if (level > max) return document.createTextNode('');
    const list = document.createElement(listTag);
    for(let i=1; i<=2; i++) {
        const li = document.createElement('li');
        li.textContent = getContent('short');
        li.appendChild(createNestedSemanticStructure(level + 1, max, listTag));
        list.appendChild(li);
    }
    return list;
}

window.addEventListener('DOMContentLoaded', init);
