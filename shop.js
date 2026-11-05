(function () {
  var H = window.CHM, PER = 8;
  var qs = new URLSearchParams(location.search);
  var st = { q: qs.get('q') || '', cat: qs.get('cat') || 'all', sort: 'default', page: 1 };
  var $q = H.$('#q'), $cat = H.$('#cat'), $sort = H.$('#sort'), $grid = H.$('#grid'), $info = H.$('#info'), $pager = H.$('#pager'), $chips = H.$('#chips');
  var cats = ['all'].concat(H.CATS.map(function (c) { return c.name; }));
  if (cats.indexOf(st.cat) < 0) st.cat = 'all';
  $q.value = st.q;
  $cat.innerHTML = cats.map(function (c) { return '<option value="' + c + '">' + (c === 'all' ? 'Semua kategori' : c) + '</option>'; }).join('');
  $cat.value = st.cat;

  function filtered() {
    var q = st.q.trim().toLowerCase();
    var r = H.P.filter(function (p) {
      return (st.cat === 'all' || p.cat === st.cat) && (!q || (p.name + ' ' + p.sku + ' ' + p.cat).toLowerCase().indexOf(q) >= 0);
    });
    if (st.sort === 'asc') r.sort(function (a, b) { return a.price - b.price; });
    if (st.sort === 'desc') r.sort(function (a, b) { return b.price - a.price; });
    if (st.sort === 'name') r.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return r;
  }
  function render() {
    var r = filtered(), pages = Math.max(1, Math.ceil(r.length / PER));
    if (st.page > pages) st.page = pages;
    var from = (st.page - 1) * PER, part = r.slice(from, from + PER);
    $chips.innerHTML = cats.map(function (c) { return '<button class="chip' + (st.cat === c ? ' on' : '') + '" data-c="' + c + '">' + (c === 'all' ? 'Semua' : c) + '</button>'; }).join('');
    $info.textContent = r.length ? 'Menampilkan ' + (from + 1) + '–' + (from + part.length) + ' dari ' + r.length + ' produk' : '0 produk ditemukan';
    $grid.innerHTML = part.length ? part.map(H.card).join('') : '<div class="empty" style="grid-column:1/-1"><h3>Produk tidak ditemukan</h3><p>Coba kata kunci lain atau tampilkan semua kategori.</p><button class="btn btn-primary" id="reset">Reset filter</button></div>';
    var b = '';
    if (pages > 1) {
      b += '<button data-p="' + (st.page - 1) + '"' + (st.page === 1 ? ' disabled' : '') + ' aria-label="Sebelumnya">‹</button>';
      for (var i = 1; i <= pages; i++) b += '<button data-p="' + i + '" class="' + (i === st.page ? 'on' : '') + '">' + i + '</button>';
      b += '<button data-p="' + (st.page + 1) + '"' + (st.page === pages ? ' disabled' : '') + ' aria-label="Berikutnya">›</button>';
    }
    $pager.innerHTML = b;
  }
  $q.addEventListener('input', function () { st.q = this.value; st.page = 1; render(); });
  $cat.addEventListener('change', function () { st.cat = this.value; st.page = 1; render(); });
  $sort.addEventListener('change', function () { st.sort = this.value; st.page = 1; render(); });
  $chips.addEventListener('click', function (e) { var b = e.target.closest('[data-c]'); if (b) { st.cat = b.getAttribute('data-c'); $cat.value = st.cat; st.page = 1; render(); } });
  $pager.addEventListener('click', function (e) { var b = e.target.closest('[data-p]'); if (b && !b.disabled) { st.page = +b.getAttribute('data-p'); render(); window.scrollTo({ top: 120, behavior: 'smooth' }); } });
  $grid.addEventListener('click', function (e) { if (e.target.id === 'reset') { st = { q: '', cat: 'all', sort: 'default', page: 1 }; $q.value = ''; $cat.value = 'all'; $sort.value = 'default'; render(); } });
  render();
})();
