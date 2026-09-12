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
  const container = document.getElementById('mobilizon-events');
  if (!container) return;

  const icsUrl = container.dataset.ics;
  const loading = container.querySelector('.group-agenda_loading');
  const listEl = container.querySelector('.group-agenda_list');
  const fallback = container.querySelector('.group-agenda_fallback');

  // déplie les lignes iCalendar qui commencent par un espace/tabs
  function unfoldLines(text){
    return text.replace(/\r\n[ \t]/g, '');
  }

  // parse quelques formats communs de date iCal
  function parseICalDate(s){
    if(!s) return null;
    // UTC 20250912T150000Z
    if(/^\d{8}T\d{6}Z$/.test(s)) return new Date(s);
    // local 20250912T150000
    if(/^\d{8}T\d{6}$/.test(s)){
      const y=s.slice(0,4), mo=s.slice(4,6), d=s.slice(6,8), hh=s.slice(9,11)||'00', mm=s.slice(11,13)||'00', ss=s.slice(13,15)||'00';
      return new Date(y, mo-1, d, hh, mm, ss);
    }
    // date-only 20250912
    if(/^\d{8}$/.test(s)){
      const y=s.slice(0,4), mo=s.slice(4,6), d=s.slice(6,8);
      return new Date(y, mo-1, d);
    }
    const parsed = Date.parse(s);
    return isNaN(parsed) ? null : new Date(parsed);
  }

  // parse minimaliste d'un fichier ICS en extrayant SUMMARY, DTSTART, DTEND, LOCATION, URL, DESCRIPTION
  function parseICS(text){
    text = unfoldLines(text);
    const parts = text.split(/BEGIN:VEVENT/).slice(1);
    return parts.map(p => {
      // accepte les propriétés avec paramètres, ex. DTSTART;TZID=Europe/Brussels:...
      const getSingle = key => {
        const m = p.match(new RegExp('^' + key + '(?:;[^:]*)?:[ \t]*([^\r\n]+)', 'm'));
        return m ? m[1].trim() : null;
      };
      const getMulti = key => {
        const m = p.match(new RegExp('^' + key + '(?:;[^:]*)?:([\s\S]*?)(?:\r\n[A-Z][A-Z0-9-]*:|$)', 'm'));
        return m ? m[1].trim() : null;
      };
      const summary = getSingle('SUMMARY') || getMulti('SUMMARY');
      const dtstartRaw = getSingle('DTSTART') || getMulti('DTSTART');
      const dtendRaw = getSingle('DTEND') || getMulti('DTEND');
      return {
        summary: summary,
        dtstart: parseICalDate(dtstartRaw),
        dtend: parseICalDate(dtendRaw),
        location: getSingle('LOCATION') || getMulti('LOCATION'),
        url: getSingle('URL') || getMulti('URL'),
        description: getMulti('DESCRIPTION') || getSingle('DESCRIPTION') || null
      };
    });
  }

  function formatDate(d){
    if(!d) return '';
    const opts = { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' };
    return d.toLocaleString('fr-FR', opts);
  }

  async function load(){
    try{
      const res = await fetch(icsUrl);
      if(!res.ok) throw new Error('HTTP ' + res.status);
      const txt = await res.text();
      const events = parseICS(txt).filter(e => e.dtstart && e.dtstart >= new Date()).sort((a,b) => a.dtstart - b.dtstart).slice(0,6);

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

        const a = document.createElement('a');
        a.href = ev.url || 'https://mobilizon.be/@renaud_jacqmotte_constellations';
        a.target = '_blank';
        a.rel = 'noopener';

        const title = document.createElement('strong');
        title.textContent = ev.summary || 'Événement';

        const meta = document.createElement('div');
        meta.className = 'agenda-meta';
        meta.textContent = `${formatDate(ev.dtstart)}${ev.location ? ' · ' + ev.location : ''}`;

        a.appendChild(title);
        a.appendChild(meta);

        // description / commentaires (si présents)
        if (ev.description) {
          const desc = document.createElement('div');
          desc.className = 'agenda-desc';
          // Unescape iCalendar-specific escapes (\\n, \\, \\, \;, \\,) and preserve newlines
          let raw = ev.description;
          raw = raw.replace(/\\n/g, '\n')
                   .replace(/\\,/g, ',')
                   .replace(/\\;/g, ';')
                   .replace(/\\\\/g, '\\')
                   .trim();
          // Escaper le HTML pour éviter tout XSS puis remplacer les nouvelles lignes par des <br>
          const escapeHtml = s => s.replace(/&/g, '&amp;')
                                    .replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/"/g, '&quot;')
                                    .replace(/'/g, '&#39;');
          desc.innerHTML = escapeHtml(raw).replace(/\n/g, '<br>');
          li.appendChild(desc);
        }

        li.insertBefore(a, li.firstChild);
        ul.appendChild(li);
      });

      // bouton vers mobilizon
      const actions = document.createElement('div');
      actions.className = 'agenda-actions';
      const btn = document.createElement('a');
      btn.className = 'agenda-btn';
      btn.href = 'https://mobilizon.be/@renaud_jacqmotte_constellations';
      btn.target = '_blank';
      btn.rel = 'noopener';
      btn.textContent = "Voir les événements sur mobilizon.be";
      actions.appendChild(btn);

      listEl.appendChild(ul);
      listEl.appendChild(actions);

    }catch(err){
      // en cas d'erreur, afficher le fallback (lien vers Mobilizon)
      console.warn('Mobilizon events load failed', err);
      if (loading) loading.hidden = true;
      if (listEl) listEl.hidden = true;
      if (fallback) fallback.hidden = false;
    }
  }

  // script chargé avec defer : petit délai pour s'assurer du rendu
  setTimeout(load, 200);
})();
