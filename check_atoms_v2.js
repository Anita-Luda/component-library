const fs = require('fs');

const atomsRegistry = JSON.parse(fs.readFileSync('lib/registry/atoms.json', 'utf8'));
const catalogFiles = ['lib/catalog/forms.html', 'lib/catalog/typography.html', 'lib/catalog/other.html'];
let catalogContent = '';
catalogFiles.forEach(f => {
    if (fs.existsSync(f)) catalogContent += fs.readFileSync(f, 'utf8');
});

console.log("Registry count:", atomsRegistry.length);

const missing = [];
atomsRegistry.forEach(atom => {
    const slug = atom.blueprint.replace('atoms.', '');
    // Check all combinations of types and states defined in registry
    atom.types.forEach(type => {
        atom.states.forEach(state => {
            const id = `atoms-${slug}-${type}-${state}`;
            if (!catalogContent.includes(`id="${id}"`)) {
                missing.push(id);
            }
        });
    });
});

console.log("Missing IDs count:", missing.length);
if (missing.length > 0) {
    console.log("First 20 missing IDs:");
    console.log(missing.slice(0, 20).join('\n'));
}
