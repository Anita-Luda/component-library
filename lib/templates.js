/**
 * ATOMIC DESIGN - TEMPLATES
 */
const Templates = {
    blog_layout: (p) => {
        const header = Organisms.navbar({items:['Start','Blog']});
        const content = `<div class="blog-grid">${p.children||''}</div>`;
        return `<div class="cmp blog-template is-template">${header}${content}</div>`;
    }
};

window.Templates = Templates;
if (typeof module !== 'undefined') module.exports = Templates;
