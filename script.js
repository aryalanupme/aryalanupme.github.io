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

  // Progressive enhancement: content is visible by default. Only items below the
  // initial viewport are prepared for reveal animation after this file loads.
  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const cutoff = window.innerHeight * 0.92;
    const animatedItems = revealItems.filter((item) => {
      const top = item.getBoundingClientRect().top;
      if (top > cutoff) {
        item.classList.add('reveal-ready');
        return true;
      }
      item.classList.add('visible');
      return false;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    animatedItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  // Resource availability checking is optional. Plain links remain the core behavior.
  // When served over HTTP(S), missing draft PDFs are marked instead of failing silently.
  const resourceLinks = document.querySelectorAll('[data-resource-check]');
  if (resourceLinks.length && window.location.protocol.startsWith('http')) {
    resourceLinks.forEach(async (link) => {
      const url = link.dataset.resourceCheck;
      try {
        const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        if (!response.ok) throw new Error('missing');
      } catch (_) {
        link.classList.add('resource-unavailable');
        link.setAttribute('aria-disabled', 'true');
        link.removeAttribute('target');
        link.addEventListener('click', (event) => event.preventDefault());
        link.textContent = 'PDF being finalized';
      }
    });
  }
})();
