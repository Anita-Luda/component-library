/**
 * ATOMIC DESIGN - ATOMS
 * Lookup for hardcoded HTML snippets.
 */
const Atoms = {
    _snippets: {},

    async loadCatalog() {
        // Updated file list matching the generated catalog
        const files = ['typography.html', 'forms.html', 'other.html'];
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
        console.log("Catalog fully loaded. Total snippets:", Object.keys(this._snippets).length);
    },

    _getSnippet(id, p) {
        if (this._snippets[id]) return this._snippets[id];
        console.warn(`MISSING PHYSICAL ATOM: ${id}. Ensure it exists in lib/catalog/`);
        // Fallback removed to satisfy "physical file only" requirement
        return `<span style="color:red; border:1px solid red">Missing Atom: ${id}</span>`;
    },

    // --- MAPPING ALL HTML5 TAGS ---
    a: (p = {}) => Atoms._getSnippet('atoms-a-default-default', p),
    abbr: (p = {}) => Atoms._getSnippet('atoms-abbr-default-default', p),
    acronym: (p = {}) => Atoms._getSnippet('atoms-acronym-default-default', p),
    address: (p = {}) => Atoms._getSnippet('atoms-address-default-default', p),
    article: (p = {}) => Atoms._getSnippet('atoms-article-default-default', p),
    aside: (p = {}) => Atoms._getSnippet('atoms-aside-default-default', p),
    audio: (p = {}) => Atoms._getSnippet('atoms-audio-default-default', p),
    b: (p = {}) => Atoms._getSnippet('atoms-b-default-default', p),
    bdi: (p = {}) => Atoms._getSnippet('atoms-bdi-default-default', p),
    bdo: (p = {}) => Atoms._getSnippet('atoms-bdo-default-default', p),
    big: (p = {}) => Atoms._getSnippet('atoms-big-default-default', p),
    blockquote: (p = {}) => Atoms._getSnippet('atoms-blockquote-default-default', p),
    br: (p = {}) => Atoms._getSnippet('atoms-br-default-default', p),
    button: (p = {}) => Atoms._getSnippet(`atoms-button-${p.type||'primary'}-${p.state||'default'}`, p),
    canvas: (p = {}) => Atoms._getSnippet('atoms-canvas-default-default', p),
    caption: (p = {}) => Atoms._getSnippet('atoms-caption-default-default', p),
    center: (p = {}) => Atoms._getSnippet('atoms-center-default-default', p),
    cite: (p = {}) => Atoms._getSnippet('atoms-cite-default-default', p),
    code: (p = {}) => Atoms._getSnippet('atoms-code-default-default', p),
    col: (p = {}) => Atoms._getSnippet('atoms-col-default-default', p),
    colgroup: (p = {}) => Atoms._getSnippet('atoms-colgroup-default-default', p),
    data: (p = {}) => Atoms._getSnippet('atoms-data-default-default', p),
    datalist: (p = {}) => Atoms._getSnippet('atoms-datalist-default-default', p),
    dd: (p = {}) => Atoms._getSnippet('atoms-dd-default-default', p),
    del: (p = {}) => Atoms._getSnippet('atoms-del-default-default', p),
    details: (p = {}) => Atoms._getSnippet('atoms-details-default-default', p),
    dfn: (p = {}) => Atoms._getSnippet('atoms-dfn-default-default', p),
    dialog: (p = {}) => Atoms._getSnippet('atoms-dialog-default-default', p),
    dir: (p = {}) => Atoms._getSnippet('atoms-dir-default-default', p),
    div: (p = {}) => Atoms._getSnippet('atoms-div-default-default', p),
    dl: (p = {}) => Atoms._getSnippet('atoms-dl-default-default', p),
    dt: (p = {}) => Atoms._getSnippet('atoms-dt-default-default', p),
    em: (p = {}) => Atoms._getSnippet('atoms-em-default-default', p),
    embed: (p = {}) => Atoms._getSnippet('atoms-embed-default-default', p),
    fencedframe: (p = {}) => Atoms._getSnippet('atoms-fencedframe-default-default', p),
    fieldset: (p = {}) => Atoms._getSnippet('atoms-fieldset-default-default', p),
    figcaption: (p = {}) => Atoms._getSnippet('atoms-figcaption-default-default', p),
    figure: (p = {}) => Atoms._getSnippet('atoms-figure-default-default', p),
    font: (p = {}) => Atoms._getSnippet('atoms-font-default-default', p),
    footer: (p = {}) => Atoms._getSnippet('atoms-footer-default-default', p),
    form: (p = {}) => Atoms._getSnippet('atoms-form-default-default', p),
    h1: (p = {}) => Atoms._getSnippet('atoms-h1-default-default', p),
    h2: (p = {}) => Atoms._getSnippet('atoms-h2-default-default', p),
    h3: (p = {}) => Atoms._getSnippet('atoms-h3-default-default', p),
    h4: (p = {}) => Atoms._getSnippet('atoms-h4-default-default', p),
    h5: (p = {}) => Atoms._getSnippet('atoms-h5-default-default', p),
    h6: (p = {}) => Atoms._getSnippet('atoms-h6-default-default', p),
    heading: (p = {}) => {
        const lv = p.level || 1;
        return Atoms._getSnippet(`atoms-h${lv}-default-default`, p);
    },
    header: (p = {}) => Atoms._getSnippet('atoms-header-default-default', p),
    hgroup: (p = {}) => Atoms._getSnippet('atoms-hgroup-default-default', p),
    hr: (p = {}) => Atoms._getSnippet('atoms-hr-default-default', p),
    i: (p = {}) => Atoms._getSnippet('atoms-i-default-default', p),
    iframe: (p = {}) => Atoms._getSnippet('atoms-iframe-default-default', p),
    img: (p = {}) => Atoms._getSnippet('atoms-img-default-default', p),
    image: (p = {}) => Atoms.img(p),
    input_raw: (p = {}) => Atoms._getSnippet(`atoms-input_raw-${p.type||'default'}-${p.state||'default'}`, p),
    input: (p = {}) => Atoms.input_raw(p),
    ins: (p = {}) => Atoms._getSnippet('atoms-ins-default-default', p),
    kbd: (p = {}) => Atoms._getSnippet('atoms-kbd-default-default', p),
    label: (p = {}) => Atoms._getSnippet('atoms-label-default-default', p),
    legend: (p = {}) => Atoms._getSnippet('atoms-legend-default-default', p),
    li: (p = {}) => Atoms._getSnippet('atoms-li-default-default', p),
    main: (p = {}) => Atoms._getSnippet('atoms-main-default-default', p),
    map: (p = {}) => Atoms._getSnippet('atoms-map-default-default', p),
    mark: (p = {}) => Atoms._getSnippet('atoms-mark-default-default', p),
    marquee: (p = {}) => Atoms._getSnippet('atoms-marquee-default-default', p),
    menu: (p = {}) => Atoms._getSnippet('atoms-menu-default-default', p),
    meter: (p = {}) => Atoms._getSnippet('atoms-meter-default-default', p),
    nav: (p = {}) => Atoms._getSnippet('atoms-nav-default-default', p),
    nav_link: (p = {}) => Atoms.a(p),
    nobr: (p = {}) => Atoms._getSnippet('atoms-nobr-default-default', p),
    object: (p = {}) => Atoms._getSnippet('atoms-object-default-default', p),
    ol: (p = {}) => Atoms._getSnippet('atoms-ol-default-default', p),
    optgroup: (p = {}) => Atoms._getSnippet('atoms-optgroup-default-default', p),
    option: (p = {}) => Atoms._getSnippet('atoms-option-default-default', p),
    output: (p = {}) => Atoms._getSnippet('atoms-output-default-default', p),
    p: (p = {}) => Atoms._getSnippet('atoms-p-default-default', p),
    paragraph: (p = {}) => Atoms.p(p),
    picture: (p = {}) => Atoms._getSnippet('atoms-picture-default-default', p),
    pre: (p = {}) => Atoms._getSnippet('atoms-pre-default-default', p),
    progress: (p = {}) => Atoms._getSnippet('atoms-progress-default-default', p),
    q: (p = {}) => Atoms._getSnippet('atoms-q-default-default', p),
    rb: (p = {}) => Atoms._getSnippet('atoms-rb-default-default', p),
    rp: (p = {}) => Atoms._getSnippet('atoms-rp-default-default', p),
    rt: (p = {}) => Atoms._getSnippet('atoms-rt-default-default', p),
    rtc: (p = {}) => Atoms._getSnippet('atoms-rtc-default-default', p),
    ruby: (p = {}) => Atoms._getSnippet('atoms-ruby-default-default', p),
    s: (p = {}) => Atoms._getSnippet('atoms-s-default-default', p),
    samp: (p = {}) => Atoms._getSnippet('atoms-samp-default-default', p),
    search: (p = {}) => Atoms._getSnippet('atoms-search-default-default', p),
    section: (p = {}) => Atoms._getSnippet('atoms-section-default-default', p),
    select_raw: (p = {}) => Atoms._getSnippet(`atoms-select_raw-default-${p.state||'default'}`, p),
    select: (p = {}) => Atoms.select_raw(p),
    selectedcontent: (p = {}) => Atoms._getSnippet('atoms-selectedcontent-default-default', p),
    small: (p = {}) => Atoms._getSnippet('atoms-small-default-default', p),
    span: (p = {}) => Atoms._getSnippet('atoms-span-default-default', p),
    strike: (p = {}) => Atoms._getSnippet('atoms-strike-default-default', p),
    strong: (p = {}) => Atoms._getSnippet('atoms-strong-default-default', p),
    sub: (p = {}) => Atoms._getSnippet('atoms-sub-default-default', p),
    summary: (p = {}) => Atoms._getSnippet('atoms-summary-default-default', p),
    sup: (p = {}) => Atoms._getSnippet('atoms-sup-default-default', p),
    table: (p = {}) => Atoms._getSnippet('atoms-table-default-default', p),
    tbody: (p = {}) => Atoms._getSnippet('atoms-tbody-default-default', p),
    td: (p = {}) => Atoms._getSnippet('atoms-td-default-default', p),
    textarea_raw: (p = {}) => Atoms._getSnippet(`atoms-textarea_raw-default-${p.state||'default'}`, p),
    textarea: (p = {}) => Atoms.textarea_raw(p),
    tfoot: (p = {}) => Atoms._getSnippet('atoms-tfoot-default-default', p),
    th: (p = {}) => Atoms._getSnippet('atoms-th-default-default', p),
    thead: (p = {}) => Atoms._getSnippet('atoms-thead-default-default', p),
    time: (p = {}) => Atoms._getSnippet('atoms-time-default-default', p),
    tr: (p = {}) => Atoms._getSnippet('atoms-tr-default-default', p),
    tt: (p = {}) => Atoms._getSnippet('atoms-tt-default-default', p),
    u: (p = {}) => Atoms._getSnippet('atoms-u-default-default', p),
    ul: (p = {}) => Atoms._getSnippet('atoms-ul-default-default', p),
    var: (p = {}) => Atoms._getSnippet('atoms-var-default-default', p),
    video: (p = {}) => Atoms._getSnippet('atoms-video-default-default', p),
    wbr: (p = {}) => Atoms._getSnippet('atoms-wbr-default-default', p),

    // --- REFINED BRANDED ---
    avatar: (p = {}) => Atoms._getSnippet('atoms-avatar-default-default', p),
    badge: (p = {}) => Atoms._getSnippet(`atoms-badge-${p.type||'default'}-default`, p),
    status_dot: (p = {}) => Atoms._getSnippet('atoms-status_dot-default-default', p),
    icon: (p = {}) => `<i data-lucide="${p.name||'circle'}" class="cmp icon is-atom"></i>`,
    overline: (p = {}) => Atoms._getSnippet('atoms-overline-default-default', p),
    streaming_dots: (p = {}) => `<span class="cmp streaming-dots is-atom"><span>.</span><span>.</span><span>.</span></span>`,
    illustration: (p = {}) => Atoms._getSnippet('atoms-illustration-default-default', p),
    lottie: (p = {}) => Atoms._getSnippet('atoms-lottie-default-default', p),
    toggle_raw: (p = {}) => Atoms._getSnippet(`atoms-toggle_raw-default-${p.state||'default'}`, p),
    range_raw: (p = {}) => Atoms._getSnippet(`atoms-range_raw-default-${p.state||'default'}`, p),
    icon_button: (p = {}) => Atoms._getSnippet(`atoms-icon_button-${p.type||'primary'}-${p.state||'default'}`, p),
    radio: (p = {}) => Atoms._getSnippet(`atoms-radio-default-${p.state||'default'}`, p),
    checkbox: (p = {}) => Atoms._getSnippet(`atoms-checkbox-default-${p.state||'default'}`, p)
};

window.Atoms = Atoms;
if (typeof module !== 'undefined') module.exports = Atoms;
