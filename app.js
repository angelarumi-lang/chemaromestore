(function () {
  var C = window.CHM_CONFIG, P = window.CHM_PRODUCTS, CATS = window.CHM_CATEGORIES;
  var KEY = 'chm_cart';
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function rp(n) { return 'Rp' + Number(n).toLocaleString('id-ID'); }
  function byS(sku) { return P.filter(function (p) { return p.sku === sku; })[0]; }
  function img(sku) { return 'assets/images/products/' + sku + '.svg'; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  function getCart() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY) || '[]');
      return (Array.isArray(c) ? c : []).filter(function (i) { return byS(i.sku) && i.qty > 0; });
    } catch (e) { return []; }
  }
  function saveCart(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} updateBadge(); }
  function count() { return getCart().reduce(function (a, i) { return a + i.qty; }, 0); }
  function subtotal() { return getCart().reduce(function (a, i) { return a + i.qty * byS(i.sku).price; }, 0); }
  function addToCart(sku, qty) {
    qty = qty || 1; var p = byS(sku); if (!p) return false;
    var c = getCart(), it = c.filter(function (i) { return i.sku === sku; })[0];
    var cur = it ? it.qty : 0;
    if (cur + qty > p.stock) { toast('Stok ' + p.name + ' hanya ' + p.stock + ' unit'); return false; }
    if (it) it.qty += qty; else c.push({ sku: sku, qty: qty });
    saveCart(c); toast(p.name + ' ditambahkan ke keranjang'); return true;
  }
  function setQty(sku, qty) {
    var p = byS(sku), c = getCart();
    if (qty > p.stock) { toast('Stok maksimal ' + p.stock + ' unit'); qty = p.stock; }
    c = c.map(function (i) { return i.sku === sku ? { sku: sku, qty: qty } : i; }).filter(function (i) { return i.qty > 0; });
    saveCart(c);
  }
  function removeItem(sku) { saveCart(getCart().filter(function (i) { return i.sku !== sku; })); }
  function clearCart() { saveCart([]); }

  var tt;
  function toast(msg) {
    var t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }
  function updateBadge() { $$('.cart-count').forEach(function (b) { var n = count(); b.textContent = n; b.setAttribute('data-n', n); }); }

  function card(p) {
    var low = p.stock <= 60 ? '<span class="badge low">Stok terbatas</span>' : '';
    return '<article class="card"><a class="card-img" href="product.html?sku=' + p.sku + '"><img src="' + img(p.sku) + '" alt="' + esc(p.name) + '" loading="lazy"><span class="badge">' + p.cat + '</span>' + low + '</a>' +
      '<div class="card-body"><p class="sku">' + p.sku + '</p><h3><a href="product.html?sku=' + p.sku + '">' + esc(p.name) + '</a></h3>' +
      '<p class="meta">' + p.size + ' &nbsp;•&nbsp; Stok: ' + p.stock + '</p><p class="price">' + rp(p.price) + '</p>' +
      '<div class="actions"><a class="btn btn-ghost" href="product.html?sku=' + p.sku + '">View Details</a><button class="btn btn-primary" data-add="' + p.sku + '">Add to Cart</button></div></div></article>';
  }

  var ICON = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };

  function header() {
    var pg = document.body.getAttribute('data-page') || '';
    var links = [['index', 'Home', 'index.html'], ['shop', 'Shop', 'shop.html'], ['categories', 'Categories', 'categories.html'], ['about', 'About Us', 'about.html'], ['contact', 'Contact', 'contact.html']];
    var el = $('#site-header'); if (!el) return;
    el.className = 'site-header';
    el.innerHTML = '<div class="container nav"><a class="brand" href="index.html"><img src="assets/images/logo.svg" alt=""><span><b>Chemarome</b><small>OFFICIAL STORE</small></span></a>' +
      '<ul class="nav-links" id="navLinks">' + links.map(function (l) { return '<li><a href="' + l[2] + '"' + (pg === l[0] ? ' class="active" aria-current="page"' : '') + '>' + l[1] + '</a></li>'; }).join('') + '</ul>' +
      '<div class="nav-right"><a class="cart-btn" href="cart.html" aria-label="Keranjang belanja">' + ICON.cart + '<span class="cart-count" data-n="0"></span></a><button class="menu-btn" id="menuBtn" aria-label="Buka menu" aria-expanded="false">' + ICON.menu + '</button></div></div>';
    $('#menuBtn').addEventListener('click', function () { var o = $('#navLinks').classList.toggle('open'); this.setAttribute('aria-expanded', o); });
  }
  function footer() {
    var el = $('#site-footer'); if (!el) return; el.className = 'site-footer';
    el.innerHTML = '<div class="container foot"><div><a class="brand" href="index.html"><img src="assets/images/logo.svg" alt=""><span><b>Chemarome</b><small>OFFICIAL STORE</small></span></a><p style="margin-top:14px">Komposisi wewangian dengan warisan Eropa dari Barcelona, untuk parfum, perawatan tubuh, pewangi rumah tangga, dan industri.</p></div>' +
      '<div><h4>Belanja</h4><ul><li><a href="shop.html">Semua Produk</a></li><li><a href="categories.html">Kategori</a></li><li><a href="cart.html">Keranjang</a></li><li><a href="checkout.html">Checkout</a></li></ul></div>' +
      '<div><h4>Perusahaan</h4><ul><li><a href="about.html">About Us</a></li><li><a href="contact.html">Contact</a></li></ul></div>' +
      '<div><h4>Hubungi Kami</h4><ul><li>' + esc(C.address) + '</li><li>' + esc(C.phoneDisplay) + '</li><li>' + esc(C.email) + '</li></ul></div></div>' +
      '<div class="copy"><div class="container">© ' + new Date().getFullYear() + ' ' + esc(C.storeName) + '. Website ini dibuat untuk keperluan tugas mata kuliah E-Commerce.</div></div>';
  }
  function waLink(text) { return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(text || 'Halo Chemarome Official Store, saya ingin bertanya.'); }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]'); if (b) { e.preventDefault(); addToCart(b.getAttribute('data-add'), 1); }
  });
  header(); footer(); updateBadge();
  window.addEventListener('storage', updateBadge);

  window.CHM = { $: $, $$: $$, rp: rp, byS: byS, img: img, esc: esc, getCart: getCart, addToCart: addToCart, setQty: setQty, removeItem: removeItem, clearCart: clearCart, subtotal: subtotal, count: count, toast: toast, card: card, ICON: ICON, waLink: waLink, P: P, CATS: CATS, C: C };
})();
