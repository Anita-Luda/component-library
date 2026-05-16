/**
 * ATOMIC DESIGN - ATOMS
 * Lookup for hardcoded HTML snippets.
 */
const Atoms = {
    _snippets: {},

    async loadCatalog() {
        const files = ['typography.html', 'forms.html', 'data.html', 'inline.html', 'blocks.html', 'lists.html', 'media.html', 'tables.html', 'inline_context.html'];
        for (const file of files) {
            try {
                const res = await fetch(`lib/catalog/${file}`);
                if (!res.ok) throw new Error(`Status ${res.status}`);
                const html = await res.text();
                const temp = document.createElement('div');
                temp.innerHTML = html;
                temp.querySelectorAll('[id]').forEach(el => {
                    this._snippets[el.id] = el.outerHTML;
                });
            } catch (e) {
                console.error("Failed to load catalog file:", file, e);
            }
        }
        console.log(`Catalog fully loaded. Total snippets: ${Object.keys(this._snippets).length}`);
    },

    _getSnippet(id, fallbackFn, p) {
        const parts = id.split('-');
        if (parts.length > 1) {
            const contextId = `html5-${parts[1]}-context`;
            if (this._snippets[contextId]) return this._snippets[contextId];
        }
        if (this._snippets[id]) return this._snippets[id];
        return fallbackFn(p);
    },

    _wrap(tag, p, extraAttr = '') {
        const type = p.type || 'default';
        const state = p.state || 'default';
        const forceClass = (state !== 'default') ? `force-${state}` : '';
        const customClasses = p.classes || '';
        const classes = `cmp ${tag} type-${type} state-${state} ${forceClass} ${customClasses} is-atom`.trim();
        return `<${tag} class="${classes}" ${extraAttr}>${p.content || ''}</${tag}>`;
    },

    // --- MAPPING ALL HTML5 TAGS ---
    a: (p = {}) => Atoms._getSnippet('atoms-a-default-default', (p) => Atoms._wrap('a', p, 'href="#"'), p),
    abbr: (p = {}) => Atoms._getSnippet('atoms-abbr-default-default', (p) => Atoms._wrap('abbr', p, 'title="Abbreviation"'), p),
    acronym: (p = {}) => Atoms._getSnippet('atoms-acronym-default-default', (p) => Atoms._wrap('acronym', p, 'title="Acronym"'), p),
    address: (p = {}) => Atoms._getSnippet('atoms-address-default-default', (p) => Atoms._wrap('address', p), p),
    article: (p = {}) => Atoms._getSnippet('atoms-article-default-default', (p) => Atoms._wrap('article', p), p),
    aside: (p = {}) => Atoms._getSnippet('atoms-aside-default-default', (p) => Atoms._wrap('aside', p), p),
    audio: (p = {}) => Atoms._getSnippet('atoms-audio-default-default', (p) => Atoms._wrap('audio', p, 'controls'), p),
    b: (p = {}) => Atoms._getSnippet('atoms-b-default-default', (p) => Atoms._wrap('b', p), p),
    bdi: (p = {}) => Atoms._getSnippet('atoms-bdi-default-default', (p) => Atoms._wrap('bdi', p), p),
    bdo: (p = {}) => Atoms._getSnippet('atoms-bdo-default-default', (p) => Atoms._wrap('bdo', p, 'dir="rtl"'), p),
    big: (p = {}) => Atoms._getSnippet('atoms-big-default-default', (p) => Atoms._wrap('big', p), p),
    blockquote: (p = {}) => Atoms._getSnippet('atoms-blockquote-default-default', (p) => Atoms._wrap('blockquote', p), p),
    br: (p = {}) => Atoms._getSnippet('atoms-br-default-default', (p) => '<br>', p),
    button: (p = {}) => Atoms._getSnippet(`atoms-button-${p.type||'primary'}-${p.state||'default'}`, (p) => Atoms._wrap('button', p), p),
    canvas: (p = {}) => Atoms._getSnippet('atoms-canvas-default-default', (p) => Atoms._wrap('canvas', p), p),
    caption: (p = {}) => Atoms._getSnippet('atoms-caption-default-default', (p) => Atoms._wrap('caption', p), p),
    center: (p = {}) => Atoms._getSnippet('atoms-center-default-default', (p) => Atoms._wrap('center', p), p),
    cite: (p = {}) => Atoms._getSnippet('atoms-cite-default-default', (p) => Atoms._wrap('cite', p), p),
    code: (p = {}) => Atoms._getSnippet('atoms-code-default-default', (p) => Atoms._wrap('code', p), p),
    col: (p = {}) => Atoms._getSnippet('atoms-col-default-default', (p) => '<col>', p),
    colgroup: (p = {}) => Atoms._getSnippet('atoms-colgroup-default-default', (p) => Atoms._wrap('colgroup', p), p),
    data: (p = {}) => Atoms._getSnippet('atoms-data-default-default', (p) => Atoms._wrap('data', p, 'value="42"'), p),
    datalist: (p = {}) => Atoms._getSnippet('atoms-datalist-default-default', (p) => Atoms._wrap('datalist', p), p),
    dd: (p = {}) => Atoms._getSnippet('atoms-dd-default-default', (p) => Atoms._wrap('dd', p), p),
    del: (p = {}) => Atoms._getSnippet('atoms-del-default-default', (p) => Atoms._wrap('del', p), p),
    details: (p = {}) => Atoms._getSnippet('atoms-details-default-default', (p) => Atoms._wrap('details', p), p),
    dfn: (p = {}) => Atoms._getSnippet('atoms-dfn-default-default', (p) => Atoms._wrap('dfn', p), p),
    dialog: (p = {}) => Atoms._getSnippet('atoms-dialog-default-default', (p) => Atoms._wrap('dialog', p, 'open'), p),
    dir: (p = {}) => Atoms._getSnippet('atoms-dir-default-default', (p) => Atoms._wrap('dir', p), p),
    div: (p = {}) => Atoms._getSnippet('atoms-div-default-default', (p) => Atoms._wrap('div', p), p),
    dl: (p = {}) => Atoms._getSnippet('atoms-dl-default-default', (p) => Atoms._wrap('dl', p), p),
    dt: (p = {}) => Atoms._getSnippet('atoms-dt-default-default', (p) => Atoms._wrap('dt', p), p),
    em: (p = {}) => Atoms._getSnippet('atoms-em-default-default', (p) => Atoms._wrap('em', p), p),
    embed: (p = {}) => Atoms._getSnippet('atoms-embed-default-default', (p) => Atoms._wrap('embed', p, 'src="#"'), p),
    fencedframe: (p = {}) => Atoms._wrap('fencedframe', p),
    fieldset: (p = {}) => Atoms._getSnippet('atoms-fieldset-default-default', (p) => Atoms._wrap('fieldset', p), p),
    figcaption: (p = {}) => Atoms._getSnippet('atoms-figcaption-default-default', (p) => Atoms._wrap('figcaption', p), p),
    figure: (p = {}) => Atoms._getSnippet('atoms-figure-default-default', (p) => Atoms._wrap('figure', p), p),
    font: (p = {}) => Atoms._getSnippet('atoms-font-default-default', (p) => Atoms._wrap('font', p, 'color="blue"'), p),
    footer: (p = {}) => Atoms._getSnippet('atoms-footer-default-default', (p) => Atoms._wrap('footer', p), p),
    form: (p = {}) => Atoms._getSnippet('atoms-form-default-default', (p) => Atoms._wrap('form', p, 'action="#"'), p),
    h1: (p = {}) => Atoms._getSnippet('atoms-h1-default-default', (p) => Atoms._wrap('h1', p), p),
    h2: (p = {}) => Atoms._getSnippet('atoms-h2-default-default', (p) => Atoms._wrap('h2', p), p),
    h3: (p = {}) => Atoms._getSnippet('atoms-h3-default-default', (p) => Atoms._wrap('h3', p), p),
    h4: (p = {}) => Atoms._getSnippet('atoms-h4-default-default', (p) => Atoms._wrap('h4', p), p),
    h5: (p = {}) => Atoms._getSnippet('atoms-h5-default-default', (p) => Atoms._wrap('h5', p), p),
    h6: (p = {}) => Atoms._getSnippet('atoms-h6-default-default', (p) => Atoms._wrap('h6', p), p),
    heading: (p = {}) => {
        const lv = p.level || 1;
        if (Atoms[`h${lv}`]) return Atoms[`h${lv}`](p);
        return Atoms.h1(p);
    },
    header: (p = {}) => Atoms._getSnippet('atoms-header-default-default', (p) => Atoms._wrap('header', p), p),
    hgroup: (p = {}) => Atoms._getSnippet('atoms-hgroup-default-default', (p) => Atoms._wrap('hgroup', p), p),
    hr: (p = {}) => Atoms._getSnippet('atoms-hr-default-default', (p) => '<hr>', p),
    i: (p = {}) => Atoms._getSnippet('atoms-i-default-default', (p) => Atoms._wrap('i', p), p),
    iframe: (p = {}) => Atoms._getSnippet('atoms-iframe-default-default', (p) => Atoms._wrap('iframe', p, 'src="about:blank"'), p),
    img: (p = {}) => Atoms._getSnippet('atoms-img-default-default', (p) => Atoms._wrap('img', p, 'src="https://picsum.photos/100"'), p),
    image: (p = {}) => Atoms.img(p),
    input_raw: (p = {}) => Atoms._getSnippet(`atoms-input_raw-${p.type||'default'}-${p.state||'default'}`, (p) => {
        const typeAttr = p.inputType ? `type="${p.inputType}"` : 'type="text"';
        return Atoms._wrap('input', p, typeAttr);
    }, p),
    input: (p = {}) => Atoms.input_raw(p),
    ins: (p = {}) => Atoms._getSnippet('atoms-ins-default-default', (p) => Atoms._wrap('ins', p), p),
    kbd: (p = {}) => Atoms._getSnippet('atoms-kbd-default-default', (p) => Atoms._wrap('kbd', p), p),
    label: (p = {}) => Atoms._getSnippet('atoms-label-default-default', (p) => Atoms._wrap('label', p), p),
    legend: (p = {}) => Atoms._getSnippet('atoms-legend-default-default', (p) => Atoms._wrap('legend', p), p),
    li: (p = {}) => Atoms._getSnippet('atoms-li-default-default', (p) => Atoms._wrap('li', p), p),
    main: (p = {}) => Atoms._getSnippet('atoms-main-default-default', (p) => Atoms._wrap('main', p), p),
    map: (p = {}) => Atoms._getSnippet('atoms-map-default-default', (p) => Atoms._wrap('map', p), p),
    mark: (p = {}) => Atoms._getSnippet('atoms-mark-default-default', (p) => Atoms._wrap('mark', p), p),
    marquee: (p = {}) => Atoms._getSnippet('atoms-marquee-default-default', (p) => Atoms._wrap('marquee', p), p),
    menu: (p = {}) => Atoms._getSnippet('atoms-menu-default-default', (p) => Atoms._wrap('menu', p), p),
    meter: (p = {}) => Atoms._getSnippet('atoms-meter-default-default', (p) => Atoms._wrap('meter', p, 'value="0.6"'), p),
    nav: (p = {}) => Atoms._getSnippet('atoms-nav-default-default', (p) => Atoms._wrap('nav', p), p),
    nav_link: (p = {}) => Atoms.a(p),
    nobr: (p = {}) => Atoms._getSnippet('atoms-nobr-default-default', (p) => Atoms._wrap('span', p, 'style="white-space:nowrap"'), p),
    object: (p = {}) => Atoms._getSnippet('atoms-object-default-default', (p) => Atoms._wrap('object', p), p),
    ol: (p = {}) => Atoms._getSnippet('atoms-ol-default-default', (p) => Atoms._wrap('ol', p), p),
    optgroup: (p = {}) => Atoms._getSnippet('atoms-optgroup-default-default', (p) => Atoms._wrap('optgroup', p, 'label="Grupa"'), p),
    option: (p = {}) => Atoms._getSnippet('atoms-option-default-default', (p) => Atoms._wrap('option', p), p),
    output: (p = {}) => Atoms._getSnippet('atoms-output-default-default', (p) => Atoms._wrap('output', p), p),
    p: (p = {}) => Atoms._getSnippet('atoms-p-default-default', (p) => Atoms._wrap('p', p), p),
    paragraph: (p = {}) => Atoms.p(p),
    picture: (p = {}) => Atoms._getSnippet('atoms-picture-default-default', (p) => Atoms._wrap('picture', p), p),
    pre: (p = {}) => Atoms._getSnippet('atoms-pre-default-default', (p) => Atoms._wrap('pre', p), p),
    progress: (p = {}) => Atoms._getSnippet('atoms-progress-default-default', (p) => Atoms._wrap('progress', p, 'value="50" max="100"'), p),
    q: (p = {}) => Atoms._getSnippet('atoms-q-default-default', (p) => Atoms._wrap('q', p), p),
    rb: (p = {}) => Atoms._getSnippet('atoms-rb-default-default', (p) => Atoms._wrap('rb', p), p),
    rp: (p = {}) => Atoms._getSnippet('atoms-rp-default-default', (p) => Atoms._wrap('rp', p), p),
    rt: (p = {}) => Atoms._getSnippet('atoms-rt-default-default', (p) => Atoms._wrap('rt', p), p),
    rtc: (p = {}) => Atoms._wrap('rtc', p),
    ruby: (p = {}) => Atoms._getSnippet('atoms-ruby-default-default', (p) => Atoms._wrap('ruby', p), p),
    s: (p = {}) => Atoms._getSnippet('atoms-s-default-default', (p) => Atoms._wrap('s', p), p),
    samp: (p = {}) => Atoms._getSnippet('atoms-samp-default-default', (p) => Atoms._wrap('samp', p), p),
    search: (p = {}) => Atoms._getSnippet('atoms-search-default-default', (p) => Atoms._wrap('search', p), p),
    section: (p = {}) => Atoms._getSnippet('atoms-section-default-default', (p) => Atoms._wrap('section', p), p),
    select_raw: (p = {}) => Atoms._getSnippet('atoms-select_raw-default-default', (p) => Atoms._wrap('select', p), p),
    select: (p = {}) => Atoms.select_raw(p),
    selectedcontent: (p = {}) => Atoms._wrap('selectedcontent', p),
    small: (p = {}) => Atoms._getSnippet('atoms-small-default-default', (p) => Atoms._wrap('small', p), p),
    span: (p = {}) => Atoms._getSnippet('atoms-span-default-default', (p) => Atoms._wrap('span', p), p),
    strike: (p = {}) => Atoms._getSnippet('atoms-strike-default-default', (p) => Atoms._wrap('strike', p), p),
    strong: (p = {}) => Atoms._getSnippet('atoms-strong-default-default', (p) => Atoms._wrap('strong', p), p),
    sub: (p = {}) => Atoms._getSnippet('atoms-sub-default-default', (p) => Atoms._wrap('sub', p), p),
    summary: (p = {}) => Atoms._getSnippet('atoms-summary-default-default', (p) => Atoms._wrap('summary', p), p),
    sup: (p = {}) => Atoms._getSnippet('atoms-sup-default-default', (p) => Atoms._wrap('sup', p), p),
    table: (p = {}) => Atoms._getSnippet('atoms-table-default-default', (p) => Atoms._wrap('table', p), p),
    tbody: (p = {}) => Atoms._getSnippet('atoms-tbody-default-default', (p) => Atoms._wrap('tbody', p), p),
    td: (p = {}) => Atoms._getSnippet('atoms-td-default-default', (p) => Atoms._wrap('td', p), p),
    textarea_raw: (p = {}) => Atoms._getSnippet('atoms-textarea_raw-default-default', (p) => Atoms._wrap('textarea', p), p),
    textarea: (p = {}) => Atoms.textarea_raw(p),
    tfoot: (p = {}) => Atoms._getSnippet('atoms-tfoot-default-default', (p) => Atoms._wrap('tfoot', p), p),
    th: (p = {}) => Atoms._getSnippet('atoms-th-default-default', (p) => Atoms._wrap('th', p), p),
    thead: (p = {}) => Atoms._getSnippet('atoms-thead-default-default', (p) => Atoms._wrap('thead', p), p),
    time: (p = {}) => Atoms._getSnippet('atoms-time-default-default', (p) => Atoms._wrap('time', p, 'datetime="2024"'), p),
    tr: (p = {}) => Atoms._getSnippet('atoms-tr-default-default', (p) => Atoms._wrap('tr', p), p),
    tt: (p = {}) => Atoms._getSnippet('atoms-tt-default-default', (p) => Atoms._wrap('tt', p), p),
    u: (p = {}) => Atoms._getSnippet('atoms-u-default-default', (p) => Atoms._wrap('u', p), p),
    ul: (p = {}) => Atoms._getSnippet('atoms-ul-default-default', (p) => Atoms._wrap('ul', p), p),
    var: (p = {}) => Atoms._getSnippet('atoms-var-default-default', (p) => Atoms._wrap('var', p), p),
    video: (p = {}) => Atoms._getSnippet('atoms-video-default-default', (p) => Atoms._wrap('video', p, 'controls'), p),
    wbr: (p = {}) => Atoms._getSnippet('atoms-wbr-default-default', (p) => '<wbr>', p),

    // --- REFINED BRANDED ---
    avatar: (p = {}) => Atoms._getSnippet('atoms-avatar-default-default', (p) => Atoms._wrap('div', p), p),
    badge: (p = {}) => Atoms._getSnippet('atoms-badge-default-default', (p) => Atoms._wrap('span', p), p),
    status_dot: (p = {}) => Atoms._getSnippet('atoms-status_dot-default-default', (p) => Atoms._wrap('span', p), p),
    icon: (p = {}) => `<i data-lucide="${p.name||'circle'}" class="cmp icon is-atom"></i>`,
    overline: (p = {}) => Atoms._getSnippet('atoms-overline-default-default', (p) => Atoms._wrap('span', p), p),
    streaming_dots: (p = {}) => `<span class="cmp streaming-dots is-atom"><span>.</span><span>.</span><span>.</span></span>`,
    illustration: (p = {}) => Atoms._wrap('div', p),
    lottie: (p = {}) => Atoms._wrap('div', p),
    toggle_raw: (p = {}) => Atoms._getSnippet('atoms-toggle_raw-default-default', (p) => {
        return Atoms._wrap('input', p, 'type="checkbox" role="switch"');
    }, p),
    range_raw: (p = {}) => Atoms._getSnippet('atoms-range_raw-default-default', (p) => {
        return Atoms._wrap('input', p, 'type="range"');
    }, p),
    icon_button: (p = {}) => Atoms._getSnippet(`atoms-icon_button-${p.type||'primary'}-${p.state||'default'}`, (p) => {
        return Atoms._wrap('button', p, 'aria-label="Przycisk"');
    }, p),
    radio: (p = {}) => Atoms._getSnippet(`atoms-radio-default-${p.state||'default'}`, (p) => {
        return Atoms._wrap('input', p, 'type="radio"');
    }, p),
    checkbox: (p = {}) => Atoms._getSnippet(`atoms-checkbox-default-${p.state||'default'}`, (p) => {
        return Atoms._wrap('input', p, 'type="checkbox"');
    }, p)
};

window.Atoms = Atoms;
if (typeof module !== 'undefined') module.exports = Atoms;
