/* ============================================
   BOSS COLLABORATIVE — Scroll Animations
   ============================================
   Uses IntersectionObserver to trigger CSS
   animations when elements with [data-animate]
   enter the viewport. Animates once, then
   unobserves. Respects prefers-reduced-motion
   and reacts to live preference changes.
   Zero dependencies — vanilla JS.
   ============================================ */

// Signal that JS is available so CSS can scope animation-hiding to .js
document.documentElement.classList.add('js');

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function revealAll() {
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  // Fallback if IntersectionObserver is not supported
  if (!('IntersectionObserver' in window)) {
    revealAll();
    return;
  }

  if (prefersReducedMotion.matches) {
    revealAll();
    return;
  }

  const animatedElements = document.querySelectorAll('[data-animate]');

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // React to live reduced-motion preference changes
  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      revealAll();
      observer.disconnect();
    }
  });
})();
