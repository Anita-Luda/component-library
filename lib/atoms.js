/**
 * ATOMS LIBRARY
 * Lowest level components (HTML5 tags).
 * All atoms are LOADED from physical files in /lib/catalog/
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
        console.log("Atoms Catalog initialized from physical files.");
    },

    _getSnippet(blueprint, type, state, content = '') {
        const id = `atoms-${blueprint.replace('atoms.', '')}-${type}-${state}`;
        const el = this._catalog.getElementById(id);

        if (!el) {
            console.warn(`Atom not found: ${id}`);
            return `<span class="error-missing">Missing Atom: ${id}</span>`;
        }

        let html = el.outerHTML;

        // Content Injection Logic
        // 1. Primary content
        if (content) {
            html = html.replace('{{CONTENT}}', content);
        } else {
            // Fallback for empty content placeholder if needed
            html = html.replace('{{CONTENT}}', '');
        }

        // 2. Attribute placeholders
        html = html.replace('{{VALUE}}', content || '');
        html = html.replace('{{SRC}}', 'https://picsum.photos/200');
        html = html.replace('{{ALT}}', content || 'Image');
        html = html.replace('{{HREF}}', '#');

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

    // Catch-all for HTML5 tags that use default/default
    html5(tag, props = {}) {
        return this._getSnippet(tag, 'default', 'default', props.content);
    }
};
