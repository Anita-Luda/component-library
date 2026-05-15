
const sourceSelect = document.getElementById('joy-source');
const themeInfo = document.getElementById('theme-info');

async function loadJoyContent(url) {
    document.body.classList.add('loading');
    localStorage.setItem('joy-source-url', url);
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (themeInfo) themeInfo.textContent = `Temat: ${data.metadata.theme} (${data.metadata.name})`;

        const elements = document.querySelectorAll('[data-joy]');
        elements.forEach(el => {
            const path = el.getAttribute('data-joy').split('.');
            let value = data;
            for (const key of path) {
                if (value && value[key]) {
                    value = value[key];
                } else {
                    value = null;
                    break;
                }
            }
            if (value && typeof value === 'string') {
                el.textContent = value;
            } else if (path[0] === 'components' && data.default_text) {
                if (el.tagName !== 'SPAN') el.textContent = data.default_text;
            }
        });
    } catch (e) {
        console.error("Failed to load joy:", e);
    } finally {
        document.body.classList.remove('loading');
    }
}

if (sourceSelect) {
    sourceSelect.addEventListener('change', (e) => loadJoyContent(e.target.value));
    const saved = localStorage.getItem('joy-source-url');
    if (saved) {
        sourceSelect.value = saved;
    }
    loadJoyContent(sourceSelect.value);
}
