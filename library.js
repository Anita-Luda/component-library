import { Atoms } from './lib/atoms.js';
import { Molecules } from './lib/molecules.js';
import { Organisms } from './lib/organisms.js';
import { Templates } from './lib/templates.js';

/**
 * CORE LIBRARY MANAGER
 * Connects Atomic Design layers and provides a unified fetch interface.
 */
export const Library = {
    async init() {
        await Atoms.init();
        console.log("Library initialized.");
    },

    get(path, props = {}) {
        const [layer, component] = path.split('.');
        const repo = {
            atoms: Atoms,
            molecules: Molecules,
            organisms: Organisms,
            templates: Templates
        }[layer];

        if (!repo || !repo[component]) {
            console.warn(`Library component not found: ${path}`);
            return `<div class="lib-error">Missing: ${path}</div>`;
        }

        // Auto-wrap non-interactable HTML5 tags from atoms
        if (layer === 'atoms' && !repo[component] && component.startsWith('html5')) {
             return repo.html5(component, props);
        }

        return repo[component](props);
    }
};
