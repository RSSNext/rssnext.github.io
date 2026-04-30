const navItems = [
  ["Vision", "/#vision", "vision"],
  ["Folo", "/#folo", "folo"],
  ["RSSHub", "/#rsshub", "rsshub"],
  ["$RSS3", "/#rss3", "rss3"],
  ["Blog", "/#blog", "blog"],
  ["Ecosystem", "/#ecosystem", "ecosystem"],
];

export default function SiteHeader({ activeItem = null, withSectionTracking = false }) {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="/#hero" aria-label="RSS3 home">
          <img className="brand-mark" src="/assets/logo.png" alt="" aria-hidden="true" />
          <span className="brand-text">RSS3</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {navItems.map(([label, href, key]) => (
            <a
              key={key}
              href={href}
              className={activeItem === key ? "is-active" : undefined}
              aria-current={activeItem === key ? "page" : undefined}
              data-section-link={withSectionTracking ? key : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
