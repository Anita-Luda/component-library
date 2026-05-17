const fs = require('fs');
const path = require('path');

const atoms = JSON.parse(fs.readFileSync('lib/registry/atoms.json', 'utf8'));

function genSnippet(atom) {
    let html = `<!-- ${atom.name.toUpperCase()} -->\n`;
    const blueprint = atom.blueprint.replace('atoms.', '');

    atom.types.forEach(type => {
        atom.states.forEach(state => {
            const id = `atoms-${blueprint}-${type}-${state}`;
            const forceClass = (state !== 'default') ? `force-${state}` : '';
            const classes = `cmp ${blueprint.replace('_raw','')} type-${type} state-${state} ${forceClass} is-atom`.trim();
            const disabled = (state === 'disabled') ? 'disabled' : '';

            let tag = blueprint;
            if (tag === 'input_raw') tag = 'input';
            if (tag === 'textarea_raw') tag = 'textarea';
            if (tag === 'select_raw') tag = 'select';
            if (tag === 'toggle_raw') tag = 'input';
            if (tag === 'range_raw') tag = 'input';
            if (tag === 'icon_button') tag = 'button';
            if (tag === 'heading') tag = type;
            if (tag === 'paragraph') tag = 'p';
            if (tag === 'overline') tag = 'span';
            if (tag === 'badge') tag = 'span';
            if (tag === 'status_dot') tag = 'span';
            if (tag === 'streaming_dots') tag = 'span';

            let content = `{{CONTENT}}`;
            let attr = '';

            if (tag === 'input') {
                attr += ' type="text" value="{{VALUE}}"';
                content = '';
            }
            if (blueprint === 'toggle_raw') {
                attr += ' type="checkbox" role="switch"';
                content = '';
            }
            if (blueprint === 'range_raw') {
                attr += ' type="range"';
                content = '';
            }
            if (tag === 'checkbox') {
                attr += ' type="checkbox"';
                content = '';
            }
            if (tag === 'radio') {
                attr += ' type="radio"';
                content = '';
            }
            if (tag === 'img') {
                attr += ' src="{{SRC}}" alt="{{ALT}}"';
                content = '';
            }
            if (tag === 'a') {
                attr += ' href="{{HREF}}"';
            }
            if (tag === 'video' || tag === 'audio') {
                attr += ' controls';
            }

            const selfClosing = ['input', 'br', 'hr', 'img', 'col', 'wbr', 'embed'].includes(tag);
            if (selfClosing) {
                html += `<${tag} id="${id}" class="${classes}" ${attr} ${disabled}>\n`;
            } else {
                html += `<${tag} id="${id}" class="${classes}" ${attr} ${disabled}>${content}</${tag}>\n`;
            }
        });
    });
    return html + "\n";
}

let formsHtml = "<!-- PHYSICAL ATOMS CATALOG - FORMS -->\n";
let typoHtml = "<!-- PHYSICAL ATOMS CATALOG - TYPOGRAPHY -->\n";
let otherHtml = "<!-- PHYSICAL ATOMS CATALOG - OTHER -->\n";

atoms.forEach(a => {
    const snippet = genSnippet(a);
    if (a.category.includes('Form') || a.category.includes('Input')) {
        formsHtml += snippet;
    } else if (a.category.includes('Typography') || a.category.includes('Headings')) {
        typoHtml += snippet;
    } else {
        otherHtml += snippet;
    }
});

fs.writeFileSync('lib/catalog/forms.html', formsHtml);
fs.writeFileSync('lib/catalog/typography.html', typoHtml);
fs.writeFileSync('lib/catalog/other.html', otherHtml);
console.log("Generated ALL physical atoms snippets with placeholders.");
