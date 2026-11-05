(function () {
  var H = window.CHM, C = H.C;
  H.$$('[data-wa]').forEach(function (a) { a.href = H.waLink(); a.target = '_blank'; a.rel = 'noopener'; });
  H.$('#cForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var n = H.$('#cn').value.trim(), m = H.$('#cm').value.trim(), s = H.$('#cs').value.trim(), em = H.$('#ce').value.trim();
    if (!n || !m || !/^\S+@\S+\.\S+$/.test(em)) { H.toast('Isi nama, email yang valid, dan pesan Anda'); return; }
    var text = 'Halo ' + C.storeName + ',\n\nNama: ' + n + '\nEmail: ' + em + (s ? '\nSubjek: ' + s : '') + '\n\n' + m;
    window.open(H.waLink(text), '_blank', 'noopener');
    H.toast('Pesan disiapkan di WhatsApp — tekan kirim di sana'); this.reset();
  });
})();
