(function () {
  var H = window.CHM, sku = new URLSearchParams(location.search).get('sku'), p = H.byS(sku), box = H.$('#pd');
  if (!p) { box.innerHTML = '<div class="empty"><h3>Produk tidak ditemukan</h3><p>Produk yang Anda cari tidak tersedia.</p><a class="btn btn-primary" href="shop.html">Kembali ke Shop</a></div>'; return; }
  document.title = p.name + ' — Chemarome Official Store';
  H.$('#crumb').textContent = p.name;
  var qty = 1;
  box.innerHTML = '<div class="pd"><div class="pd-img"><img src="' + H.img(p.sku) + '" alt="' + H.esc(p.name) + '"></div><div>' +
    '<span class="tag">' + p.cat + '</span><h1>' + H.esc(p.name) + '</h1><p style="color:var(--muted)">' + H.esc(p.desc) + '</p><p class="price">' + H.rp(p.price) + '</p>' +
    '<table class="spec"><tr><th>SKU</th><td>' + p.sku + '</td></tr><tr><th>Kategori</th><td>' + p.cat + '</td></tr><tr><th>Ukuran</th><td>' + p.size + '</td></tr><tr><th>Stok</th><td>' + p.stock + ' unit' + (p.stock <= 60 ? ' (terbatas)' : '') + '</td></tr></table>' +
    '<div class="pd-actions"><div class="qty"><button id="minus" aria-label="Kurangi">−</button><span id="q">1</span><button id="plus" aria-label="Tambah">+</button></div>' +
    '<button class="btn btn-primary btn-lg" id="add">Add to Cart</button><button class="btn btn-ghost btn-lg" id="buy">Beli Sekarang</button></div></div></div>';
  var $q = H.$('#q');
  H.$('#minus').onclick = function () { if (qty > 1) $q.textContent = --qty; };
  H.$('#plus').onclick = function () { if (qty < p.stock) $q.textContent = ++qty; else H.toast('Stok maksimal ' + p.stock + ' unit'); };
  H.$('#add').onclick = function () { H.addToCart(p.sku, qty); };
  H.$('#buy').onclick = function () { if (H.addToCart(p.sku, qty)) location.href = 'checkout.html'; };
  H.$('#related').innerHTML = H.P.filter(function (x) { return x.cat === p.cat && x.sku !== p.sku; }).concat(H.P.filter(function (x) { return x.cat !== p.cat; })).slice(0, 4).map(H.card).join('');
})();
