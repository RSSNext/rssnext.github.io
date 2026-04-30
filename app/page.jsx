import HomeInteractions from "./components/HomeInteractions";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#vision">
        Skip to main content
      </a>
      <div className="page-noise" aria-hidden="true" />
      <a className="top-banner" href="/blog/the-next-stage-of-rss3.html">
        <span className="wrap">
          <span className="top-banner__inner">
            <span className="top-banner__label">Latest</span>
            <span className="top-banner__text">The Next Stage of RSS3</span>
          </span>
        </span>
      </a>

      <SiteHeader withSectionTracking />

      <main>
        <section id="hero" className="hero">
          <div className="wrap hero-layout">
            <div className="hero-copy" data-reveal="">
              <p className="eyebrow">RSS3</p>
              <h1>An open web, readable again.</h1>
              <p className="lead">
                RSS3 builds products and infrastructure for people who still believe open
                information should stay open.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="#vision">
                  Read the vision
                </a>
                <a className="button button--ghost" href="#ecosystem">
                  See the works
                </a>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="hero-aura hero-aura--cool" />
              <div className="hero-aura hero-aura--warm" />
              <div className="hero-plane hero-plane--one" />
              <div className="hero-plane hero-plane--two" />
              <div className="hero-plane hero-plane--three" />
              <div className="hero-trace hero-trace--one" />
              <div className="hero-trace hero-trace--two" />
              <div className="hero-node hero-node--one" />
              <div className="hero-node hero-node--two" />
              <div className="hero-node hero-node--three" />
            </div>
          </div>
        </section>

        <section id="vision" className="section section--vision">
          <div className="wrap">
            <div className="vision-lead">
              <div className="section-heading" data-reveal="">
                <p className="eyebrow">Vision</p>
                <h2>RSS never left. It just needed a better shape.</h2>
              </div>

              <aside className="vision-note" data-reveal="">
                <p className="vision-note__eyebrow">Open information, rebuilt.</p>
                <p className="vision-note__copy">
                  RSS3 keeps the idea simple: keep information portable, keep
                  distribution open, and shape that network into products people actually
                  want to use.
                </p>
              </aside>
            </div>

            <div className="vision-grid">
              <article className="vision-item" data-reveal="">
                <h3>The open web never went away.</h3>
                <p>Open feeds still matter because public information should stay portable.</p>
              </article>
              <article className="vision-item" data-reveal="">
                <h3>What changed is how we build for it.</h3>
                <p>Better tools can make old protocols feel current again.</p>
              </article>
              <article className="vision-item" data-reveal="">
                <h3>RSS3 turns that belief into products.</h3>
                <p>One chapter focuses on reading. The other keeps the network open.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="folo" className="section chapter chapter--folo">
          <div className="wrap chapter-layout">
            <div className="chapter-copy" data-reveal="">
              <p className="eyebrow">Chapter 01 - Folo</p>
              <h2>A quieter way to follow what matters.</h2>
              <p className="chapter-lead">
                Folo turns scattered sources into one calmer timeline: easier to scan,
                easier to return to, and easier to keep close.
              </p>
              <p>
                It treats reading as an attention problem, not a notification problem. The
                result is a feed that feels ordered instead of noisy.
              </p>
              <ul className="chapter-tags" aria-label="Folo themes">
                <li>Timeline</li>
                <li>Curation</li>
                <li>Attention</li>
              </ul>
              <div className="link-row">
                <a href="https://folo.is/" target="_blank" rel="noreferrer">
                  Visit Folo
                </a>
                <a href="https://github.com/RSSNext/Folo" target="_blank" rel="noreferrer">
                  View Folo on GitHub
                </a>
              </div>
            </div>

            <div className="chapter-art chapter-art--folo" aria-hidden="true" data-reveal="">
              <div className="folo-stage">
                <div className="folo-rail folo-rail--one" />
                <div className="folo-rail folo-rail--two" />
                <div className="folo-rail folo-rail--three" />
                <div className="folo-card folo-card--one" />
                <div className="folo-card folo-card--two" />
                <div className="folo-card folo-card--three" />
                <div className="folo-card folo-card--four" />
              </div>
            </div>
          </div>
        </section>

        <section id="rsshub" className="section chapter chapter--rsshub">
          <div className="wrap chapter-layout chapter-layout--reverse">
            <div className="chapter-art chapter-art--rsshub" aria-hidden="true" data-reveal="">
              <div className="rsshub-stage">
                <div className="rsshub-route rsshub-route--one" />
                <div className="rsshub-route rsshub-route--two" />
                <div className="rsshub-route rsshub-route--three" />
                <div className="rsshub-route rsshub-route--four" />
                <div className="rsshub-node rsshub-node--one" />
                <div className="rsshub-node rsshub-node--two" />
                <div className="rsshub-node rsshub-node--three" />
                <div className="rsshub-node rsshub-node--four" />
                <div className="rsshub-node rsshub-node--five" />
                <div className="rsshub-node rsshub-node--six" />
              </div>
            </div>

            <div className="chapter-copy" data-reveal="">
              <p className="eyebrow">Chapter 02 - RSSHub</p>
              <h2>Infrastructure for the readable web.</h2>
              <p className="chapter-lead">
                RSSHub keeps the network open by turning more sources into feeds, at a
                scale few open projects ever reach.
              </p>
              <p>
                It is the long-running layer beneath countless reading workflows: the
                route system, the instances, and the public infrastructure that keeps RSS
                useful.
              </p>
              <ul className="chapter-tags" aria-label="RSSHub themes">
                <li>Network</li>
                <li>Routes</li>
                <li>Openness</li>
              </ul>
              <div className="chapter-note">
                <strong>Everything is RSSible.</strong>
                <span>One of the world's largest RSS networks.</span>
              </div>
              <div className="link-row">
                <a href="https://docs.rsshub.app/" target="_blank" rel="noreferrer">
                  Read the docs
                </a>
                <a href="https://github.com/DIYgod/RSSHub" target="_blank" rel="noreferrer">
                  View RSSHub on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="rss3" className="section chapter chapter--rss3">
          <div className="wrap chapter-layout">
            <div className="chapter-copy" data-reveal="">
              <p className="eyebrow">Chapter 03 - $RSS3</p>
              <h2>
                <span className="chapter-token">$RSS3</span> The link between
                infrastructure and adoption.
              </h2>
              <p className="chapter-lead">
                $RSS3 connects infrastructure and products across RSS3, linking open data,
                applications, and the value they generate.
              </p>
              <p>
                It gives contributors, developers, and users a shared stake in the
                ecosystem so it grows as one.
              </p>
              <ul className="chapter-tags" aria-label="RSS3 themes">
                <li>Open Data</li>
                <li>Applications</li>
                <li>Shared Stake</li>
              </ul>
              <div className="link-row">
                <a href="/blog/about-rss3.html">About $RSS3</a>
                <a href="/migration/">Migration Portal</a>
              </div>
            </div>

            <div className="chapter-art chapter-art--rss3" aria-hidden="true" data-reveal="">
              <div className="rss3-stage">
                <div className="rss3-beam rss3-beam--one" />
                <div className="rss3-beam rss3-beam--two" />
                <div className="rss3-panel rss3-panel--one" />
                <div className="rss3-panel rss3-panel--two" />
                <div className="rss3-panel rss3-panel--three" />
                <div className="rss3-orbit rss3-orbit--one" />
                <div className="rss3-orbit rss3-orbit--two" />
                <div className="rss3-node rss3-node--one" />
                <div className="rss3-node rss3-node--two" />
                <div className="rss3-node rss3-node--three" />
                <div className="rss3-node rss3-node--four" />
              </div>
            </div>
          </div>
        </section>

        <section id="blog" className="section section--blog">
          <div className="wrap">
            <div className="section-heading" data-reveal="">
              <h2>Blog</h2>
            </div>

            <div className="blog-grid">
              <a className="blog-card" href="/blog/the-next-stage-of-rss3.html" data-reveal="">
                <h3>The Next Stage of RSS3</h3>
                <span className="blog-card__cta">Read article</span>
              </a>

              <a className="blog-card" href="/blog/about-rss3.html" data-reveal="">
                <h3>About $RSS3</h3>
                <span className="blog-card__cta">Read article</span>
              </a>
            </div>
          </div>
        </section>

        <section id="ecosystem" className="section section--ecosystem">
          <div className="wrap ecosystem-layout">
            <div className="section-heading" data-reveal="">
              <p className="eyebrow">Open ecosystem</p>
              <h2>Built in public, growing in the open.</h2>
              <p>
                RSS3 is a shared direction across products, infrastructure, and the open
                communities that keep readable information alive.
              </p>
            </div>

            <div className="ecosystem-links" data-reveal="">
              <a href="https://github.com/RSSNext" target="_blank" rel="noreferrer">
                <span className="link-label">RSS3</span>
                <span className="link-copy">Explore the GitHub organization</span>
              </a>
              <a href="https://folo.is/" target="_blank" rel="noreferrer">
                <span className="link-label">Folo</span>
                <span className="link-copy">Follow everything in one place</span>
              </a>
              <a href="https://docs.rsshub.app/" target="_blank" rel="noreferrer">
                <span className="link-label">RSSHub</span>
                <span className="link-copy">Read the RSSHub docs</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <HomeInteractions />
    </>
  );
}
