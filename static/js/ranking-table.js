// Interactive ranking table (Fig. 1 on "Your Job Posting Is Recon").
// Progressive enhancement: the server renders every row sorted by rank with
// details visible. This script adds collapsing rows, sorting and filtering.
// No dependencies; stays within the site CSP (script-src 'self').
(function () {
  var root = document.querySelector('.rt[data-ranking]');
  if (!root) return;

  var list = root.querySelector('.rt-list');
  var rows = Array.prototype.slice.call(list.querySelectorAll('.rt-row'));
  var bandOrder = { critical: 4, high: 3, moderate: 2, low: 1 };

  // Remember the server order so "rank" sort and reset are exact.
  rows.forEach(function (r, i) { r.dataset.order = i; });

  // Enhanced mode: collapse the detail panels (CSS keys off this class).
  root.classList.add('rt--js');

  // --- Expand / collapse a row's key-exposure panel ---
  rows.forEach(function (row) {
    var btn = row.querySelector('.rt-row__main');
    btn.addEventListener('click', function () {
      var open = row.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // --- Filter by rating band ---
  var chips = Array.prototype.slice.call(root.querySelectorAll('.rt-chip'));
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.dataset.filter;
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      rows.forEach(function (row) {
        var show = f === 'all' || row.dataset.band === f;
        row.hidden = !show;
        if (!show) {
          row.classList.remove('is-open');
          row.querySelector('.rt-row__main').setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  // --- Sort ---
  var sorters = Array.prototype.slice.call(root.querySelectorAll('.rt-sort'));
  var state = { key: 'rank', dir: 1 }; // dir 1 = ascending

  function compare(key, dir) {
    return function (a, b) {
      var r;
      if (key === 'rank') {
        r = (+a.dataset.order) - (+b.dataset.order);
      } else if (key === 'score') {
        r = (+a.dataset.score) - (+b.dataset.score);
        if (r === 0) r = (+a.dataset.order) - (+b.dataset.order);
      } else if (key === 'rating') {
        r = (bandOrder[a.dataset.band] || 0) - (bandOrder[b.dataset.band] || 0);
        if (r === 0) r = (+a.dataset.order) - (+b.dataset.order);
      } else { // posting, alphabetical
        r = a.dataset.entity.localeCompare(b.dataset.entity);
      }
      return r * dir;
    };
  }

  function applySort(key) {
    if (state.key === key) {
      state.dir = -state.dir;
    } else {
      state.key = key;
      // Rank and posting read best ascending; score and rating, worst-first.
      state.dir = (key === 'score' || key === 'rating') ? -1 : 1;
    }
    rows.sort(compare(state.key, state.dir));
    rows.forEach(function (row) { list.appendChild(row); });
    sorters.forEach(function (s) {
      if (s.dataset.sort === state.key) {
        s.setAttribute('aria-sort', state.dir === 1 ? 'ascending' : 'descending');
        s.closest('.rt-h').setAttribute('data-dir', state.dir === 1 ? 'asc' : 'desc');
      } else {
        s.removeAttribute('aria-sort');
        s.closest('.rt-h').removeAttribute('data-dir');
      }
    });
  }

  sorters.forEach(function (s) {
    s.addEventListener('click', function () { applySort(s.dataset.sort); });
  });
})();
