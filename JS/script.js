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

/* Mobilizon events loader */
(function(){
  // Ce script sert uniquement à la page qui contient cet agenda.
  const container = document.getElementById('mobilizon-events');
  if (!container) return;

  const icsUrl = container.dataset.ics;
  const loading = container.querySelector('.group-agenda_loading');
  const listEl = container.querySelector('.group-agenda_list');
  const fallback = container.querySelector('.group-agenda_fallback');

  // Le parseur fournit des dates JavaScript ; on les présente selon le format demandé dans la feuille de route.
  function formatDate(date){
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function formatTime(date){
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${date.getHours()}h${minutes === '00' ? '' : minutes}`;
  }

  function appendMissingField(parent, message, eventUrl){
    // Garder la carte et permettre de retrouver les détails directement sur Mobilizon.
    const warning = document.createElement('p');
    warning.className = 'agenda-field-error type-body u-text-muted';
    warning.append(document.createTextNode(`${message} `));

    const link = document.createElement('a');
    link.href = eventUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'u-text-primary';
    link.textContent = "Consulter l'événement sur Mobilizon.";
    warning.appendChild(link);
    parent.appendChild(warning);
  }

  async function load(){
    try{
      // Le flux public reste la source des événements ; aucun descriptif n'est récupéré pour l'affichage.
      const res = await fetch(icsUrl);
      if(!res.ok) throw new Error('HTTP ' + res.status);
      const txt = await res.text();
      const events = parseMobilizonICS(txt)
        // Un événement sans date reste visible pour afficher l'avertissement plutôt que de le cacher.
        .filter(event => !event.dtstart || !event.dtstartHasTime || event.dtstart >= new Date())
        .sort((a, b) => {
          if (!a.dtstart) return 1;
          if (!b.dtstart) return -1;
          return a.dtstart - b.dtstart;
        })
        .slice(0, 6);

      if(events.length === 0){
        throw new Error('Aucun événement trouvé');
      }

      // rendu simple
      if (loading) loading.hidden = true;
      if (listEl) listEl.hidden = false;
      if (fallback) fallback.hidden = true;

      const ul = document.createElement('ul');
      ul.className = 'agenda-list';

      events.forEach(ev => {
        const li = document.createElement('li');
        li.className = 'agenda-item';
        // L'URL propre à l'événement est préférable ; le profil sert de lien de secours.
        const eventUrl = ev.url || 'https://mobilizon.be/@renaud_jacqmotte_constellations';

        const primary = document.createElement('div');
        primary.className = 'agenda-primary';

        const secondary = document.createElement('div');
        secondary.className = 'agenda-secondary';

        const dateEl = document.createElement('time');
        dateEl.className = 'agenda-date type-item-title u-text-default';
        if (ev.dtstart) {
          dateEl.setAttribute('datetime', ev.dtstart.toISOString());
          dateEl.textContent = formatDate(ev.dtstart);
          primary.appendChild(dateEl);
        } else {
          appendMissingField(primary, 'La date est impossible à afficher.', eventUrl);
        }

        if (ev.location) {
          const loc = document.createElement('div');
          loc.className = 'agenda-location type-label u-text-primary-strong';
          loc.textContent = ev.location;
          primary.appendChild(loc);
        } else {
          appendMissingField(primary, 'Le lieu est impossible à afficher.', eventUrl);
        }

        if (ev.summary) {
          const titleLink = document.createElement('a');
          titleLink.href = eventUrl;
          titleLink.target = '_blank';
          titleLink.rel = 'noopener';

          const title = document.createElement('strong');
          title.className = 'type-body u-text-muted';
          title.textContent = ev.summary;
          titleLink.appendChild(title);
          secondary.appendChild(titleLink);
        } else {
          appendMissingField(secondary, 'Le titre est impossible à afficher.', eventUrl);
        }

        const timeParts = [];
        if (ev.dtstartHasTime && ev.dtendHasTime) {
          timeParts.push(`de ${formatTime(ev.dtstart)} à ${formatTime(ev.dtend)}`);
        } else {
          if (ev.dtstartHasTime) timeParts.push(`début à ${formatTime(ev.dtstart)}`);
          if (ev.dtendHasTime) timeParts.push(`fin à ${formatTime(ev.dtend)}`);
        }
        if (timeParts.length) {
          const time = document.createElement('span');
          time.className = 'agenda-time type-body u-text-muted';
          time.textContent = timeParts.join(', ');
          secondary.appendChild(time);
        }
        if (!ev.dtstartHasTime) appendMissingField(secondary, "L'heure de début est impossible à afficher.", eventUrl);
        if (!ev.dtendHasTime) appendMissingField(secondary, "L'heure de fin est impossible à afficher.", eventUrl);

        li.appendChild(primary);
        li.appendChild(secondary);
        ul.appendChild(li);
      });

      // bouton vers mobilizon
      const actions = document.createElement('div');
      actions.className = 'agenda-actions';
      const btn = document.createElement('a');
      btn.className = 'agenda-btn type-action u-text-primary';
      btn.href = 'https://mobilizon.be/@renaud_jacqmotte_constellations';
      btn.target = '_blank';
      btn.rel = 'noopener';
      btn.textContent = "Voir les événements sur mobilizon.be";
      actions.appendChild(btn);

      listEl.appendChild(ul);
      listEl.appendChild(actions);

    }catch(err){
      // Si le flux est inaccessible ou vide, garder un lien utile vers le profil Mobilizon.
      console.warn('Mobilizon events load failed', err);
      if (loading) loading.hidden = true;
      if (listEl) listEl.hidden = true;
      if (fallback) fallback.hidden = false;
    }
  }

  // script chargé avec defer : petit délai pour s'assurer du rendu
  setTimeout(load, 200);
})();
