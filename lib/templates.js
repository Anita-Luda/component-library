/**
 * ATOMIC DESIGN - TEMPLATES
 * Defining structural layouts without final data (content-agnostic slots).
 */
const Templates = {
    dashboard: (p) => {
        const nav = Organisms.navbar();
        const side = Organisms.sidebar({ items: ['Dashboard', 'Statystyki', 'Raporty', 'Użytkownicy', 'Ustawienia'] });
        const grid = Organisms.analytics_grid();
        const logs = Organisms.audit_logs();

        return `
            <div class="cmp template-dashboard ${p?.classes||''} is-template">
                <header class="template-header">${nav}</header>
                <div class="template-body">
                    <aside class="template-sidebar">${side}</aside>
                    <main class="template-main">
                        <section class="section-top">${grid}</section>
                        <section class="section-bottom">${logs}</section>
                    </main>
                </div>
            </div>
        `;
    },

    landing_page: (p) => {
        const nav = Organisms.navbar();
        const hero = Molecules.card({
            title: 'Witaj w Przyszłości',
            body: 'Nasze rozwiązanie surrealistyczne zrewolucjonizuje Twoje postrzeganie rzeczywistości.',
            footer: Atoms.button({ content: 'Zacznij teraz', type: 'primary' })
        });
        const features = Organisms.analytics_grid(); // Reused as features grid
        const cta = Molecules.alert({ content: 'Dołącz do 5000+ zadowolonych bytów już dziś!', type: 'success' });

        return `
            <div class="cmp template-landing ${p?.classes||''} is-template">
                <header>${nav}</header>
                <main>
                    <section class="hero-section">${hero}</section>
                    <section class="features-section">
                        ${Atoms.heading({ level: 2, content: 'Dlaczego My?' })}
                        ${features}
                    </section>
                    <section class="cta-section">${cta}</section>
                </main>
                <footer class="template-footer">
                    ${Atoms.paragraph({ content: '© 2026 Surreal Systems. Wszystkie prawa wyśnione.' })}
                </footer>
            </div>
        `;
    },

    product_page: (p) => {
        const nav = Organisms.navbar();
        const product = Molecules.product_card({
            title: 'Artefakt Nieskończoności',
            price: '1,234.56 PLN',
            src: 'https://picsum.photos/seed/product/400/400'
        });
        const details = Molecules.accordion({
            title: 'Specyfikacja Techniczna',
            body: 'Wymiary: 4D, Materiał: Gwiezdny pył, Gwarancja: Wieczysta.'
        });
        const reviews = Molecules.list({
            items: ['Wspaniały produkt!', 'Zmienił moje życie.', 'Nieco zbyt fioletowy.']
        });

        return `
            <div class="cmp template-product ${p?.classes||''} is-template">
                <header>${nav}</header>
                <main class="product-layout">
                    <div class="product-main">${product}</div>
                    <div class="product-details">
                        ${details}
                        ${Atoms.heading({ level: 3, content: 'Opinie' })}
                        ${reviews}
                    </div>
                </main>
            </div>
        `;
    },

    article_page: (p) => {
        const nav = Organisms.navbar();
        const header = Atoms.heading({ level: 1, content: 'Odkrycie Kwantowej Kuchni' });
        const meta = Atoms.span({ content: 'Opublikowano: 15 maja 2026 | Autor: Astro', classes: 'meta' });
        const content = `
            ${Atoms.paragraph({ content: 'Naukowcy odkryli, że zupa pomidorowa w stanie splątanym smakuje lepiej.' })}
            ${Molecules.media_block({ title: 'Laboratorium smaku', src: 'https://picsum.photos/seed/science/600/300' })}
            ${Atoms.paragraph({ content: 'Eksperymenty wykazały, że dodatek bazylii zwiększa koherencję wywaru.' })}
            ${Atoms.blockquote({ content: 'To mały krok dla kucharza, ale wielki dla gastronomii.' })}
        `;
        const sidebar = Molecules.list({
            items: ['Powiązane: Cząstki cebuli', 'Podobne: Mechanika makaronu']
        });

        return `
            <div class="cmp template-article ${p?.classes||''} is-template">
                <header>${nav}</header>
                <div class="article-container">
                    <main class="article-main">
                        <header>${header}${meta}</header>
                        <article>${content}</article>
                    </main>
                    <aside class="article-sidebar">
                        ${Atoms.heading({ level: 3, content: 'Więcej w temacie' })}
                        ${sidebar}
                    </aside>
                </div>
            </div>
        `;
    },

    auth_page: (p) => {
        const logo = Atoms.heading({ level: 2, content: 'Surreal Auth' });
        const form = Organisms.settings_panel({ title: 'Zaloguj się' }); // Reused as login form

        return `
            <div class="cmp template-auth ${p?.classes||''} is-template">
                <main class="auth-box">
                    ${logo}
                    ${form}
                    <div class="auth-links">
                        ${Atoms.nav_link({ content: 'Zapomniałeś hasła?' })} |
                        ${Atoms.nav_link({ content: 'Utwórz konto' })}
                    </div>
                </main>
            </div>
        `;
    }
};

window.Templates = Templates;
if (typeof module !== 'undefined') module.exports = Templates;
