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

  // --- Desktop : rien à faire pour le toggle ---
  function isDesktop() {
    return window.innerWidth >= 768;
  }

  // --- Ouvre / ferme ---
  function openMenu() {
    if (isDesktop()) return;
    toggle.classList.add('is-open');
    menu.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstLink = menu.querySelector('.mobile-menu_link');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    if (isDesktop()) return;
    toggle.classList.remove('is-open');
    menu.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    toggle.focus();
  }

  function isOpen() {
    return toggle.classList.contains('is-open');
  }

  // --- Réinitialise à chaque redimensionnement ---
  window.addEventListener('resize', () => {
    if (isDesktop() && isOpen()) {
      toggle.classList.remove('is-open');
      menu.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'false'); // visible sur desktop
      document.body.style.overflow = '';
    }
  });

  // --- Événements ---
  toggle.addEventListener('click', () => {
    isOpen() ? closeMenu() : openMenu();
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  menu.querySelectorAll('.mobile-menu_link, .mobile-menu_btn').forEach(link => {
    link.addEventListener('click', () => {
      if (!isDesktop()) closeMenu();
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen() && !isDesktop()) closeMenu();
  });

  // Trap focus (mobile uniquement)
  menu.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !isOpen() || isDesktop()) return;
    const focusable = [...menu.querySelectorAll('a[href], button:not([disabled])')];
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
