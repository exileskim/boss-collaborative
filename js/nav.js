/* ============================================
   BOSS COLLABORATIVE — Mobile Navigation
   ============================================
   Toggles mobile menu, handles close on link
   click, outside click, and Escape key.
   Prevents body scroll when menu is open.
   Traps focus within mobile menu when open.
   Zero dependencies — vanilla JS.
   ============================================ */

(() => {
  const toggle = document.querySelector('.nav-toggle');
  const backdrop = document.querySelector('.mobile-nav__backdrop');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');
  const header = document.querySelector('.site-header');

  if (!toggle) return;

  // Set initial aria-hidden state on mobile nav
  if (mobileNav) {
    mobileNav.setAttribute('aria-hidden', 'true');
  }

  // Focus trapping helpers
  function getFocusableElements() {
    if (!mobileNav) return [];
    return Array.from(
      mobileNav.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])')
    );
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;

    const focusable = getFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openMenu() {
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    if (mobileNav) {
      mobileNav.setAttribute('aria-hidden', 'false');
    }
    // Move focus to first link in mobile nav
    const focusable = getFocusableElements();
    if (focusable.length) {
      focusable[0].focus();
    }
    document.addEventListener('keydown', trapFocus);
  }

  function closeMenu() {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (mobileNav) {
      mobileNav.setAttribute('aria-hidden', 'true');
    }
    document.removeEventListener('keydown', trapFocus);
    toggle.focus();
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
    }
  });

  // Add scrolled class to header for shadow
  if (header) {
    let isScrolled = false;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 10;
        if (scrolled !== isScrolled) {
          isScrolled = scrolled;
          header.classList.toggle('site-header--scrolled', scrolled);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
