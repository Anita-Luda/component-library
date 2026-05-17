/**
 * ATOMS LIBRARY
 * Lowest level components (HTML5 tags).
 * All atoms are LOADED from physical files in /lib/catalog/
 * MANUALLY AUTHORED.
 */
export const Atoms = {
    _catalog: null,

    async init() {
        if (this._catalog) return;

        // Load multiple catalog segments
        const sources = ['forms.html', 'typography.html', 'other.html'];
        let fullHtml = '';

        for(const src of sources) {
            try {
                const res = await fetch(`./lib/catalog/${src}`);
                if (res.ok) fullHtml += await res.text();
            } catch(e) {
                console.error(`Failed to load catalog segment: ${src}`, e);
            }
        }

        const parser = new DOMParser();
        this._catalog = parser.parseFromString(fullHtml, 'text/html');
        console.log("Atoms Catalog initialized from physical files (Manual).");
    },

    _getSnippet(blueprint, type, state, content = '') {
        const id = `atoms-${blueprint.replace('atoms.', '')}-${type}-${state}`;
        const el = this._catalog.getElementById(id);

        if (!el) {
            console.warn(`Atom not found: ${id}`);
            return `<span class="error-missing">Missing Atom: ${id}</span>`;
        }

        // Clone element to avoid modifying catalog
        const clone = el.cloneNode(true);
        let html = clone.outerHTML;

        // Content Injection Logic
        // We use global replace to catch all occurrences (e.g. inside nested tags)
        const safeContent = content || '';

        html = html.replaceAll('{{CONTENT}}', safeContent);
        html = html.replaceAll('{{VALUE}}', safeContent);
        html = html.replaceAll('{{SRC}}', `https://picsum.photos/seed/${id}/100`);
        html = html.replaceAll('{{ALT}}', safeContent || 'Asset');
        html = html.replaceAll('{{HREF}}', '#');

        return html;
    },

    button(props) {
        return this._getSnippet('button', props.type || 'default', props.state || 'default', props.content);
    },

    icon_button(props) {
        return this._getSnippet('icon_button', props.type || 'primary', props.state || 'default', props.content);
    },

    input_raw(props) {
        return this._getSnippet('input_raw', props.type || 'default', props.state || 'default', props.content);
    },

    textarea_raw(props) {
        return this._getSnippet('textarea_raw', props.type || 'default', props.state || 'default', props.content);
    },

    select_raw(props) {
        return this._getSnippet('select_raw', props.type || 'default', props.state || 'default', props.content);
    },

    toggle_raw(props) {
        return this._getSnippet('toggle_raw', props.type || 'default', props.state || 'default', props.content);
    },

    range_raw(props) {
        return this._getSnippet('range_raw', props.type || 'default', props.state || 'default', props.content);
    },

    radio(props) {
        return this._getSnippet('radio', props.type || 'default', props.state || 'default', props.content);
    },

    checkbox(props) {
        return this._getSnippet('checkbox', props.type || 'default', props.state || 'default', props.content);
    },

    badge(props) {
        return this._getSnippet('badge', props.type || 'default', props.state || 'default', props.content);
    },

    overline(props) {
        return this._getSnippet('overline', props.type || 'default', props.state || 'default', props.content);
    },

    heading(props) {
        return this._getSnippet('heading', props.type || 'h1', props.state || 'default', props.content);
    },

    paragraph(props) {
        return this._getSnippet('paragraph', props.type || 'default', props.state || 'default', props.content);
    },

    avatar(props) {
        return this._getSnippet('avatar', props.type || 'default', props.state || 'default', props.content);
    },

    status_dot(props) {
        return this._getSnippet('status_dot', props.type || 'default', props.state || 'default', props.content);
    },

    progress(props) {
        return this._getSnippet('progress', props.type || 'default', props.state || 'default', props.content);
    },

    streaming_dots(props) {
        return this._getSnippet('streaming_dots', props.type || 'default', props.state || 'default', props.content);
    },

    // Catch-all for HTML5 tags
    html5(tag, props = {}) {
        return this._getSnippet(tag, 'default', 'default', props.content);
    },

    // Direct access by blueprint name (legacy support)
    get(blueprint, props = {}) {
        const parts = blueprint.split('.');
        const method = parts[parts.length - 1];
        if (this[method]) return this[method](props);

        // Final fallback: try to find by raw tag name in catalog
        return this._getSnippet(method, 'default', 'default', props.content);
    }
};
