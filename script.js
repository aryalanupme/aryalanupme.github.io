(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  const closeMenu = () => {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };

  const openMenu = () => {
    if (!nav || !toggle) return;
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.contains('open') ? closeMenu() : openMenu();
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('open')) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    }, { passive: true });
  }

  // Core content never depends on animation or network checks.
  // Native links, MathML, and answer disclosures remain usable without JavaScript.
})();
