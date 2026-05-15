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
        const items = document.querySelectorAll('.nav-item');
        items.forEach(it => {
            const visible = it.textContent.toLowerCase().includes(term);
            it.parentElement.style.display = visible ? 'block' : 'none';
        });

        // Hide/show category details based on visible children
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
        const typeHeading = document.createElement('h2');
        typeHeading.textContent = `Typ: ${type}`;
        typeHeading.style.marginTop = "40px";
        list.appendChild(typeHeading);

        const grid = document.createElement('div');
        grid.className = 'variants-grid';

        comp.states.forEach(state => {
            const variant = document.createElement('div');
            variant.className = 'variant-box';
            variant.innerHTML = `<span class="state-label">${state}</span>`;

            const element = createComponentElement(comp, type, state);
            variant.appendChild(element);
            grid.appendChild(variant);
        });

        list.appendChild(grid);
    });
}

function createComponentElement(comp, type, state) {
    const wrapper = document.createElement('div');
    const slug = comp.id;
    wrapper.className = `cmp ${slug} type-${type} state-${state} profile-${comp.profile}`;
    wrapper.id = `${slug}-${type}-${state}`;

    if (state === 'disabled') wrapper.setAttribute('aria-disabled', 'true');
    if (state === 'error') wrapper.setAttribute('aria-invalid', 'true');

    const content = getContent(comp.content_type);

    if (comp.profile === 'atomic') {
        if (slug.includes('button')) {
            const btn = document.createElement('button');
            btn.className = `cmp ${slug} type-${type} state-${state}`;
            btn.textContent = content;
            if (state === 'disabled') btn.disabled = true;
            return btn;
        }
        if (slug.includes('icon')) {
            wrapper.textContent = getContent('tiny');
            return wrapper;
        }
        wrapper.textContent = content;
    } else if (comp.profile === 'text') {
        if (slug.includes('input') || slug.includes('search') || slug.includes('otp')) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = content;
            input.className = `cmp ${slug} type-${type} state-${state}`;
            if (state === 'disabled') input.disabled = true;
            return input;
        }
        if (slug.includes('textarea') || slug.includes('editor')) {
            const area = document.createElement('textarea');
            area.placeholder = content;
            area.className = `cmp ${slug} type-${type} state-${state}`;
            if (state === 'disabled') area.disabled = true;
            return area;
        }
        wrapper.textContent = content;
    } else if (comp.profile === 'group') {
        // Adequate Nesting: Accordion/Select usually have 1 level of items
        if (slug.includes('accordion')) {
            for(let i=1; i<=3; i++) {
                const det = document.createElement('details');
                const sum = document.createElement('summary');
                sum.textContent = getContent('short');
                det.appendChild(sum);
                det.appendChild(document.createTextNode(getContent('medium')));
                wrapper.appendChild(det);
            }
        } else if (slug.includes('tabs') || slug.includes('pills')) {
            const nav = document.createElement('div');
            nav.style.display = 'flex'; nav.style.gap = '5px';
            for(let i=1; i<=3; i++) {
                const tab = document.createElement('div');
                tab.style.padding = '5px 10px'; tab.style.border = '1px solid #ccc';
                tab.textContent = getContent('short');
                nav.appendChild(tab);
            }
            wrapper.appendChild(nav);
            const body = document.createElement('div');
            body.style.padding = '10px'; body.style.border = '1px solid #eee';
            body.textContent = getContent('long');
            wrapper.appendChild(body);
        } else {
            for(let i=1; i<=3; i++) {
                const item = document.createElement('div');
                item.className = 'group-item';
                item.textContent = `${getContent('short')} ${i}`;
                wrapper.appendChild(item);
            }
        }
    } else if (comp.profile === 'hierarchical') {
        // Adequate Nesting: Tree/MegaMenu 2-3 levels
        const maxLevels = (slug.includes('mega') || slug.includes('tree')) ? 3 : 2;
        wrapper.appendChild(createNestedStructure(1, maxLevels));
    } else if (comp.profile === 'data') {
        const table = document.createElement('table');
        const tr = document.createElement('tr');
        for(let i=0; i<3; i++) {
            const th = document.createElement('th');
            th.textContent = getContent('tiny');
            tr.appendChild(th);
        }
        table.appendChild(tr);
        for(let r=1; r<=3; r++) {
            const row = document.createElement('tr');
            for(let c=1; c<=3; c++) {
                const td = document.createElement('td');
                td.textContent = getContent('short');
                row.appendChild(td);
            }
            table.appendChild(row);
        }
        return table;
    } else if (comp.profile === 'feedback') {
        const icon = document.createElement('span');
        icon.textContent = getContent('tiny') + " ";
        wrapper.appendChild(icon);
        wrapper.appendChild(document.createTextNode(content));
    } else if (comp.profile === 'layout') {
        wrapper.style.display = 'grid';
        wrapper.style.gridTemplateColumns = 'repeat(3, 1fr)';
        wrapper.style.gap = '10px';
        for(let i=0; i<3; i++) {
            const slot = document.createElement('div');
            slot.style.border = '1px dashed #ccc'; slot.style.padding = '5px';
            slot.textContent = getContent('short');
            wrapper.appendChild(slot);
        }
    }

    return wrapper;
}

function createNestedStructure(level, max) {
    if (level > max) return document.createTextNode('');
    const ul = document.createElement('ul');
    ul.className = `nest-l${level}`;
    for(let i=1; i<=2; i++) {
        const li = document.createElement('li');
        li.textContent = getContent('short');
        li.appendChild(createNestedStructure(level + 1, max));
        ul.appendChild(li);
    }
    return ul;
}

window.addEventListener('DOMContentLoaded', init);
