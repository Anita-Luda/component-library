const fs = require('fs');

const atomsRegistry = JSON.parse(fs.readFileSync('lib/registry/atoms.json', 'utf8'));
const catalogFiles = ['lib/catalog/forms.html', 'lib/catalog/typography.html', 'lib/catalog/other.html'];
let catalogContent = '';
catalogFiles.forEach(f => {
    if (fs.existsSync(f)) catalogContent += fs.readFileSync(f, 'utf8');
});

const missing = [];
atomsRegistry.forEach(atom => {
    const slug = atom.blueprint.replace('atoms.', '');
    const type = atom.types[0] || 'default';
    const state = atom.states[0] || 'default';
    const id = `atoms-${slug}-${type}-${state}`;
    if (!catalogContent.includes(`id="${id}"`)) {
        missing.push(id);
    }
});

if (missing.length > 0) {
    console.log("Missing Atoms in Catalog:");
    console.log(missing.join('\n'));
} else {
    console.log("All registry atoms found in catalog.");
}
