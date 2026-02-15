/* ============================================
   BOSS COLLABORATIVE — Mobile Navigation
   ============================================
   Toggles mobile menu, handles close on link
   click, outside click, and Escape key.
   Prevents body scroll when menu is open.
   Zero dependencies — vanilla JS.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const backdrop = document.querySelector('.mobile-nav__backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');
  const header = document.querySelector('.site-header');

  if (!toggle) return;

  function openMenu() {
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function isOpen() {
    return document.body.classList.contains('nav-open');
  }

  // Toggle on hamburger click
  toggle.addEventListener('click', () => {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on backdrop click
  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Close when a nav link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      closeMenu();
      toggle.focus();
    }
  });

  // Add scrolled class to header for shadow
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});
