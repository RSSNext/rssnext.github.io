const root = document.documentElement;
const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
const revealTargets = document.querySelectorAll('[data-reveal]');
const pageSections = [...document.querySelectorAll('main section[id]')];
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let reducedMotion = reducedMotionQuery.matches;

const setReducedMotion = (matches) => {
  reducedMotion = matches;
  root.classList.toggle('reduced-motion', matches);
};

setReducedMotion(reducedMotion);

if (typeof reducedMotionQuery.addEventListener === 'function') {
  reducedMotionQuery.addEventListener('change', (event) => setReducedMotion(event.matches));
}

if (!reducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

    if (!visibleEntry) {
      return;
    }

    const currentId = visibleEntry.target.id;

    sectionLinks.forEach((link) => {
      link.classList.toggle('is-active', link.dataset.sectionLink === currentId);
    });
  },
  {
    threshold: [0.3, 0.5, 0.7],
    rootMargin: '-20% 0px -45% 0px',
  }
);

pageSections.forEach((section) => sectionObserver.observe(section));

const syncScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  root.style.setProperty('--scroll', progress.toFixed(4));
};

syncScrollProgress();
window.addEventListener('scroll', syncScrollProgress, { passive: true });
window.addEventListener('resize', syncScrollProgress);

if (!reducedMotion) {
  window.addEventListener(
    'pointermove',
    (event) => {
      const x = `${((event.clientX / window.innerWidth) * 100).toFixed(2)}%`;
      const y = `${((event.clientY / window.innerHeight) * 100).toFixed(2)}%`;
      root.style.setProperty('--pointer-x', x);
      root.style.setProperty('--pointer-y', y);
    },
    { passive: true }
  );
}
