// =============================================================
// Overlay open / close (hash-based, earendil letter style)
// =============================================================

(function () {
  function openOverlay(el) {
    document.querySelectorAll('.updates-overlay.is-open').forEach(o => {
      if (o !== el) { o.classList.remove('is-open'); }
    });
    el.classList.add('is-open');
    document.body.classList.add('has-overlay');
  }

  function closeOverlay(el) {
    el.classList.add('is-closing');
    setTimeout(() => {
      el.classList.remove('is-open', 'is-closing');
      if (!document.querySelector('.updates-overlay.is-open')) {
        document.body.classList.remove('has-overlay');
      }
    }, 360);
  }

  function handleHash() {
    const hash = location.hash;
    const target = hash && hash !== '#' ? document.querySelector(hash) : null;

    if (target && target.classList.contains('updates-overlay')) {
      openOverlay(target);
    } else {
      document.querySelectorAll('.updates-overlay.is-open').forEach(closeOverlay);
    }
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();

  document.querySelectorAll('.updates-dismiss').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const overlay = btn.closest('.updates-overlay');
      if (overlay) {
        closeOverlay(overlay);
        history.replaceState(null, '', location.pathname);
      }
    });
  });

  document.querySelectorAll('.updates-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (!e.target.closest('.updates-letter')) {
        closeOverlay(overlay);
        history.replaceState(null, '', location.pathname);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.updates-overlay.is-open').forEach(o => {
        closeOverlay(o);
        history.replaceState(null, '', location.pathname);
      });
    }
  });
})();
