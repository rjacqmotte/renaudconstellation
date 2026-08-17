(() => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.nav-overlay');

  if (!toggle || !menu) return;

  // --- Détecte la page active ---
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.mobile-menu_link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('is-active');
    }
  });

  // --- Ouvre / ferme ---
  function openMenu() {
    toggle.classList.add('is-open');
    menu.classList.add('is-open');
    overlay.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus sur le premier lien
    const firstLink = menu.querySelector('.mobile-menu_link');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    toggle.classList.remove('is-open');
    menu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    toggle.focus();
  }

  function isOpen() {
    return toggle.classList.contains('is-open');
  }

  // --- Événements ---
  toggle.addEventListener('click', () => {
    isOpen() ? closeMenu() : openMenu();
  });

  // Fermer en cliquant sur l'overlay
  overlay.addEventListener('click', closeMenu);

  // Fermer en cliquant sur un lien du menu
  menu.querySelectorAll('.mobile-menu_link, .mobile-menu_btn').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fermer avec Échap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen()) closeMenu();
  });

  // Piège le focus dans le menu quand il est ouvert
  menu.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !isOpen()) return;

    const focusable = [...menu.querySelectorAll(
      'a[href], button:not([disabled])'
    )];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();
