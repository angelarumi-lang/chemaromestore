(function () {
  var H = window.CHM, list = H.$('#items'), sum = H.$('#sum');
  function render() {
    var c = H.getCart();
    if (!c.length) {
      list.innerHTML = '<div class="empty"><h3>Keranjang Anda masih kosong</h3><p>Pilih produk wewangian favorit Anda di katalog.</p><a class="btn btn-primary" href="shop.html">Mulai Belanja</a></div>';
      sum.style.display = 'none'; return;
    }
    sum.style.display = '';
    list.innerHTML = c.map(function (i) {
      var p = H.byS(i.sku);
      return '<div class="cart-item"><img src="' + H.img(p.sku) + '" alt="' + H.esc(p.name) + '"><div><h3><a href="product.html?sku=' + p.sku + '">' + H.esc(p.name) + '</a></h3><p class="meta">' + p.sku + ' • ' + p.size + '</p><p class="meta">' + H.rp(p.price) + ' / unit</p><button class="rm" data-rm="' + p.sku + '">Hapus</button></div>' +
        '<div><div class="qty"><button data-m="' + p.sku + '" aria-label="Kurangi">−</button><span>' + i.qty + '</span><button data-p="' + p.sku + '" aria-label="Tambah">+</button></div><p class="line-total">' + H.rp(p.price * i.qty) + '</p></div></div>';
    }).join('');
    H.$('#itemCount').textContent = H.count();
    H.$('#subtotal').textContent = H.rp(H.subtotal());
    H.$('#total').textContent = H.rp(H.subtotal());
  }
  list.addEventListener('click', function (e) {
    var t = e.target.closest('button'); if (!t) return;
    var q = function (s) { return H.getCart().filter(function (i) { return i.sku === s; })[0].qty; };
    if (t.dataset.rm) { H.removeItem(t.dataset.rm); H.toast('Produk dihapus dari keranjang'); }
    else if (t.dataset.m) H.setQty(t.dataset.m, q(t.dataset.m) - 1);
    else if (t.dataset.p) H.setQty(t.dataset.p, q(t.dataset.p) + 1);
    render();
  });
  H.$('#clear').addEventListener('click', function () { if (confirm('Kosongkan semua isi keranjang?')) { H.clearCart(); render(); } });
  render();
})();
