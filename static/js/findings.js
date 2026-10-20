// Interactive findings tables (```findings blocks in investigations).
// Progressive enhancement: without JavaScript every finding and its details are visible.
// With it: search, host / scan / severity / tag filters, and rows that open for details.
// No dependencies; stays within the site CSP (script-src 'self').
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('[data-findings]'), function (root) {
    var tools = root.querySelector('.r-findings__tools');
    var rows = Array.prototype.slice.call(root.querySelectorAll('.r-findings__item'));
    var result = root.querySelector('.r-findings__result');
    var search = root.querySelector('.r-findings__search');
    var hidden = (root.getAttribute('data-hide') || '').split(' ').filter(Boolean);
    var state = { host: '', scan: '', sev: '', tag: '', q: '' };

    function detailOf(row) {
      var next = row.nextElementSibling;
      return next && next.classList.contains('r-findings__detail') ? next : null;
    }

    // Collapse details; the + button opens them.
    rows.forEach(function (row) {
      var d = detailOf(row);
      var btn = row.querySelector('.r-expand');
      if (d) d.hidden = true;
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', function () {
          var open = btn.getAttribute('aria-expanded') !== 'true';
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          btn.textContent = open ? '−' : '+';
          if (d) d.hidden = !open;
        });
      }
    });

    function apply() {
      var shown = 0;
      var q = state.q.toLowerCase();
      rows.forEach(function (row) {
        var sev = row.getAttribute('data-sev');
        var ok =
          (!state.host || row.getAttribute('data-host') === state.host) &&
          (!state.scan || (row.getAttribute('data-scans') || '').indexOf(state.scan) !== -1) &&
          (!state.tag || ('|' + row.getAttribute('data-tags') + '|').indexOf('|' + state.tag + '|') !== -1) &&
          (!q || (row.getAttribute('data-text') || '').indexOf(q) !== -1) &&
          (state.sev ? sev === state.sev : hidden.indexOf(sev) === -1);
        row.hidden = !ok;
        var d = detailOf(row);
        if (d) {
          var btn = row.querySelector('.r-expand');
          d.hidden = !ok || !btn || btn.getAttribute('aria-expanded') !== 'true';
        }
        if (ok) shown++;
      });
      var note = shown + ' shown';
      if (!state.sev && hidden.length) {
        note += ' · ' + hidden.map(function (h) { return h === 'info' ? 'informational' : h; }).join(', ') + ' hidden';
      }
      if (result) result.textContent = note;
    }

    // Segmented controls (host, scan): one active button each.
    Array.prototype.forEach.call(root.querySelectorAll('.r-seg'), function (seg) {
      var buttons = Array.prototype.slice.call(seg.querySelectorAll('button'));
      buttons.forEach(function (b) {
        b.addEventListener('click', function () {
          buttons.forEach(function (x) {
            var on = x === b;
            x.classList.toggle('is-active', on);
            x.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          if (b.hasAttribute('data-host')) state.host = b.getAttribute('data-host');
          if (b.hasAttribute('data-scan')) state.scan = b.getAttribute('data-scan');
          apply();
        });
      });
    });

    // Severity and tag chips: click to filter, click again to clear.
    function chips(attr, key) {
      var list = Array.prototype.slice.call(root.querySelectorAll('.r-fchip[' + attr + ']'));
      list.forEach(function (c) {
        c.addEventListener('click', function () {
          var v = c.getAttribute(attr);
          state[key] = state[key] === v ? '' : v;
          list.forEach(function (x) {
            var on = x.getAttribute(attr) === state[key];
            x.classList.toggle('is-active', on);
            x.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          apply();
        });
      });
    }
    chips('data-sev', 'sev');
    chips('data-tag', 'tag');

    if (search) search.addEventListener('input', function () { state.q = search.value.trim(); apply(); });

    if (tools) tools.hidden = false;
    apply();
  });
})();
