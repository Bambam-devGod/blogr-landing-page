/* ═══════════════════════════════════════════════════════════════
   BLOGR — main.js
   Handles: dropdown menus, mobile nav toggle, scroll reveal
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Desktop Dropdown Menus ──────────────────────────────── */
  const navItems = document.querySelectorAll('.nav__item.has-dropdown');

  navItems.forEach(item => {
    const btn = item.querySelector('.nav__btn');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');

      // Close all other dropdowns first
      navItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.nav__btn').setAttribute('aria-expanded', 'false');
      });

      // Toggle this one
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    navItems.forEach(item => {
      item.classList.remove('open');
      item.querySelector('.nav__btn').setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navItems.forEach(item => {
        item.classList.remove('open');
        item.querySelector('.nav__btn').setAttribute('aria-expanded', 'false');
      });
      closeMobileMenu();
    }
  });

  /* ─── Mobile Navigation ───────────────────────────────────── */
  const hamburger    = document.querySelector('.hamburger');
  const mobileMenu   = document.querySelector('.mobile-menu');
  const mobileItems  = document.querySelectorAll('.mobile-item.has-dropdown');

  function openMobileMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Mobile sub-dropdowns (accordion style)
  mobileItems.forEach(item => {
    const btn = item.querySelector('.mobile-btn');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close sibling dropdowns
      mobileItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.mobile-btn').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close mobile menu when clicking outside it
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* ─── Scroll Reveal ───────────────────────────────────────── */
  const revealTargets = document.querySelectorAll(
    '.future__text article, .infrastructure__text, .free-open__text article, .future__illustration, .free-open__illustration, .infrastructure__illustration'
  );

  // Add reveal class
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

});
