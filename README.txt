CHEMAROME OFFICIAL STORE — Website E-Commerce (HTML + CSS + JavaScript)
=========================================================================

ISI PROYEK
- index.html       : Homepage (hero, featured products, kategori, keunggulan, testimoni)
- shop.html        : Katalog produk (search, filter kategori, urut harga, pagination)
- categories.html  : Lima kategori produk (klik untuk memfilter katalog)
- product.html     : Detail produk (dibuka lewat tombol View Details)
- cart.html        : Keranjang belanja (LocalStorage)
- checkout.html    : Checkout + simulasi pembayaran + tombol WhatsApp
- about.html       : Profil perusahaan
- contact.html     : Kontak, formulir pesan, tombol WhatsApp
- assets/css/style.css
- assets/js/       : config.js (pengaturan toko), data.js (data produk), app.js (keranjang & layout bersama), serta skrip tiap halaman
- assets/images/   : logo, hero, dan gambar 12 produk (SVG, dibuat khusus)

CARA MENJALANKAN SECARA LOKAL
1. Ekstrak chemarome-store.zip.
2. Klik dua kali index.html (terbuka di browser). Tidak perlu server.
   Catatan: font Google Fonts butuh internet; tanpa internet, tampilan memakai font cadangan.

CARA UPLOAD KE INFINITYFREE
1. Login ke InfinityFree > Control Panel (cPanel) > Online File Manager
   (atau gunakan FTP, mis. FileZilla, dengan data FTP dari akun hosting).
2. Buka folder "htdocs".
3. Hapus file bawaan "index2.html" (jika ada), lalu upload SELURUH ISI folder
   chemarome-store (index.html, halaman lain, dan folder assets) ke dalam htdocs.
   Pastikan index.html langsung berada di htdocs (bukan di dalam subfolder).
4. Buka alamat domain Anda (mis. namaanda.infinityfreeapp.com). Website langsung aktif.
   Jika tampilan belum berubah, tunggu beberapa menit atau tekan Ctrl+F5.

YANG WAJIB ANDA GANTI (assets/js/config.js)
- whatsapp     : nomor WhatsApp toko, format 6281234567890 (tanpa + dan tanpa 0 di depan)
- phoneDisplay : nomor yang ditampilkan di website
- email        : alamat email toko (juga ada di contact.html, bagian "Email")
- shipping     : tarif ongkir simulasi (Reguler, Hemat, Instan)

CATATAN
- Website ini statis: tidak memakai PHP maupun MySQL, jadi aman dan ringan di InfinityFree.
- Keranjang dan riwayat pesanan disimpan di browser (LocalStorage), tidak di server.
- Checkout adalah SIMULASI. Tidak ada integrasi otomatis dengan bank atau payment gateway.
  Nomor Virtual Account yang tampil hanyalah contoh; gambar QRIS ada di assets/images/qris.jpeg (ganti file ini untuk memperbarui); konfirmasi pesanan dikirim lewat WhatsApp.
- Testimoni di homepage berupa contoh teks untuk keperluan tugas, bukan ulasan pelanggan nyata.
- Data produk (nama, SKU, ukuran, harga, stok) ada di assets/js/data.js.
- Peta di halaman Contact memakai OpenStreetMap dan butuh internet.
