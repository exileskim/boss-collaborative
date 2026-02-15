/* ============================================
   BOSS COLLABORATIVE — Scroll Animations
   ============================================
   Uses IntersectionObserver to trigger CSS
   animations when elements with [data-animate]
   enter the viewport. Animates once, then
   unobserves. Respects prefers-reduced-motion.
   Zero dependencies — vanilla JS.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Make everything visible immediately
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('is-visible');
    });
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
});
