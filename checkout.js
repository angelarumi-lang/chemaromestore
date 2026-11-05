(function () {
  var H = window.CHM, C = H.C, SH = C.shipping;
  var PAY = [['qris', 'QRIS', 'Scan dengan aplikasi e-wallet/mobile banking'], ['bca', 'Virtual Account BCA', 'Transfer melalui BCA'], ['mandiri', 'Virtual Account Mandiri', 'Transfer melalui Mandiri'], ['gopay', 'GoPay', 'Bayar dengan GoPay'], ['ovo', 'OVO', 'Bayar dengan OVO'], ['dana', 'DANA', 'Bayar dengan DANA'], ['cod', 'COD', 'Bayar tunai saat pesanan diterima']];
  var cart = H.getCart();
  if (!cart.length) {
    H.$('#coMain').innerHTML = '<div class="empty"><h3>Keranjang Anda kosong</h3><p>Tambahkan produk terlebih dahulu sebelum checkout.</p><a class="btn btn-primary" href="shop.html">Ke Shop</a></div>'; return;
  }
  H.$('#coForm').style.display = '';
  H.$('#shipOpts').innerHTML = Object.keys(SH).map(function (k, i) {
    return '<label class="opt"><input type="radio" name="ship" value="' + k + '"' + (i === 0 ? ' checked' : '') + '><span>' + SH[k].label + '<small>' + SH[k].eta + '</small></span><b>' + H.rp(SH[k].cost) + '</b></label>';
  }).join('');
  H.$('#payOpts').innerHTML = PAY.map(function (p, i) {
    return '<label class="opt"><input type="radio" name="pay" value="' + p[0] + '"' + (i === 0 ? ' checked' : '') + '><span>' + p[1] + '<small>' + p[2] + '</small></span></label>';
  }).join('');
  H.$('#sumList').innerHTML = cart.map(function (i) { var p = H.byS(i.sku); return '<div class="row"><span>' + H.esc(p.name) + ' ×' + i.qty + '</span><span>' + H.rp(p.price * i.qty) + '</span></div>'; }).join('');
  var sub = H.subtotal();
  function val(n) { return (document.querySelector('input[name="' + n + '"]:checked') || {}).value; }
  function totals() {
    var ship = SH[val('ship')].cost; H.$('#sSub').textContent = H.rp(sub); H.$('#sShip').textContent = H.rp(ship); H.$('#sTotal').textContent = H.rp(sub + ship); return sub + ship;
  }
  document.addEventListener('change', function (e) { if (e.target.name === 'ship') totals(); });
  totals();

  function setErr(id, msg) { var f = H.$('#' + id), e = H.$('#e-' + id); f.classList.toggle('invalid', !!msg); e.textContent = msg || ''; return !msg; }
  function valid() {
    var n = H.$('#name').value.trim(), w = H.$('#wa').value.replace(/[\s-]/g, ''), a = H.$('#addr').value.trim();
    var ok = setErr('name', n.length < 3 ? 'Masukkan nama lengkap (minimal 3 karakter).' : '');
    ok = setErr('wa', /^(\+?62|0)8\d{7,12}$/.test(w) ? '' : 'Masukkan nomor WhatsApp yang valid, contoh 0812xxxxxxxx.') && ok;
    ok = setErr('addr', a.length < 10 ? 'Tulis alamat lengkap (jalan, kecamatan, kota, kode pos).' : '') && ok;
    return ok;
  }
  H.$('#coForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!valid()) { H.toast('Lengkapi data pada formulir terlebih dahulu'); var f = H.$('.invalid'); if (f) f.focus(); return; }
    var total = totals(), s = SH[val('ship')], payKey = val('pay'), pay = PAY.filter(function (p) { return p[0] === payKey; })[0][1];
    var d = new Date(), id = 'CHM-' + d.getFullYear() + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2) + '-' + Math.floor(1000 + Math.random() * 9000);
    var order = { id: id, date: d.toISOString(), name: H.$('#name').value.trim(), wa: H.$('#wa').value.trim(), addr: H.$('#addr').value.trim(), note: H.$('#note').value.trim(), items: cart, ship: s.label, shipCost: s.cost, pay: pay, subtotal: sub, total: total };
    try { var o = JSON.parse(localStorage.getItem('chm_orders') || '[]'); o.push(order); localStorage.setItem('chm_orders', JSON.stringify(o)); } catch (x) {}
    var lines = cart.map(function (i) { var p = H.byS(i.sku); return '- ' + p.name + ' (' + p.sku + ') x' + i.qty + ' = ' + H.rp(p.price * i.qty); }).join('\n');
    var msg = 'Halo ' + C.storeName + ', saya ingin konfirmasi pesanan:\n\nNo. Pesanan: ' + id + '\nNama: ' + order.name + '\nWhatsApp: ' + order.wa + '\nAlamat: ' + order.addr + (order.note ? '\nCatatan: ' + order.note : '') + '\n\nProduk:\n' + lines + '\n\nSubtotal: ' + H.rp(sub) + '\nPengiriman (' + s.label + '): ' + H.rp(s.cost) + '\nTotal: ' + H.rp(total) + '\nPembayaran: ' + pay + '\n\nTerima kasih.';
    var extra;
    if (payKey === 'qris') extra = '<div class="qris-box"><img class="qris-img" src="assets/images/qris.jpeg" alt="QRIS GoPay Merchant a.n. Angel Arumi Sipayo" width="320"><p class="qris-total">Bayar sebesar <b>' + H.rp(total) + '</b></p><p class="qris-hint">Scan QRIS di atas dengan GoPay, BCA, Mandiri, BNI, BRI, atau e-wallet/mobile banking lainnya. Setelah membayar, kirim bukti pembayaran lewat WhatsApp.</p><a class="btn btn-ghost" href="assets/images/qris.jpeg" download="QRIS-Chemarome.jpeg">Unduh QRIS</a></div>';
    else if (payKey === 'bca' || payKey === 'mandiri') extra = '<p>Nomor Virtual Account (simulasi):</p><div class="code">' + (payKey === 'bca' ? '39201' : '88608') + String(Math.floor(1e9 + Math.random() * 9e9)) + '</div>';
    else if (payKey === 'cod') extra = '<p>Siapkan pembayaran tunai sebesar <b>' + H.rp(total) + '</b> saat pesanan tiba.</p>';
    else extra = '<p>Pembayaran melalui <b>' + pay + '</b> (simulasi). Kirim detail pesanan ke WhatsApp untuk konfirmasi.</p>';
    H.$('#mId').textContent = id; H.$('#mTotal').textContent = H.rp(total); H.$('#mPay').innerHTML = extra;
    H.$('#mWa').href = H.waLink(msg);
    H.$('#modal').classList.add('open'); H.clearCart();
  });
})();
