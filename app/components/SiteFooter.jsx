export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-copy">
          <p>RSS3</p>
          <p>Open information, rebuilt with care.</p>
        </div>
        <div className="footer-socials" aria-label="Social media">
          <a
            className="social-link"
            href="https://github.com/RSSNext"
            target="_blank"
            rel="noreferrer"
            aria-label="RSS3 on GitHub"
          >
            <span className="social-link__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  fill="currentColor"
                  d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.22.72-.5v-1.94c-2.93.64-3.55-1.24-3.55-1.24-.48-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.45 1.14 3.05.87.09-.67.36-1.14.66-1.41-2.34-.27-4.81-1.17-4.81-5.2 0-1.15.41-2.1 1.08-2.84-.11-.27-.47-1.37.1-2.86 0 0 .88-.28 2.89 1.08a10.02 10.02 0 0 1 5.26 0c2.01-1.36 2.89-1.08 2.89-1.08.57 1.49.21 2.59.1 2.86.67.74 1.08 1.69 1.08 2.84 0 4.04-2.48 4.92-4.84 5.19.37.32.7.96.7 1.94v2.88c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z"
                />
              </svg>
            </span>
            <span>GitHub</span>
          </a>
          <a
            className="social-link"
            href="https://x.com/rss3_"
            target="_blank"
            rel="noreferrer"
            aria-label="RSS3 on X"
          >
            <span className="social-link__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  fill="currentColor"
                  d="M18.9 2.25H22l-6.78 7.74L23.2 21.75h-6.24l-4.9-6.92-6.05 6.92H2.9l7.25-8.29L.8 2.25h6.4l4.43 6.27 5.48-6.27Zm-1.1 17.62h1.72L6.25 4.03H4.4l13.4 15.84Z"
                />
              </svg>
            </span>
            <span>Twitter</span>
          </a>
          <a className="social-link" href="mailto:contact@rss3.io" aria-label="Email RSS3">
            <span className="social-link__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  fill="currentColor"
                  d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v13.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25Zm2.06.39 6.43 5.36a.75.75 0 0 0 .96 0l6.43-5.36a.75.75 0 0 0-.48-.14H5.54a.75.75 0 0 0-.48.14Zm14.44 1.32-5.57 4.64a2.25 2.25 0 0 1-2.88 0L5.5 6.96v11.79c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75V6.96Z"
                />
              </svg>
            </span>
            <span>contact@rss3.io</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
