(function () {
  var H = window.CHM;
  H.$('#featured').innerHTML = H.P.filter(function (p) { return p.featured; }).map(H.card).join('');
  H.$('#catGrid').innerHTML = H.CATS.map(function (c) {
    var n = H.P.filter(function (p) { return p.cat === c.name; }).length;
    return '<a class="cat-tile ' + c.cls + '" href="shop.html?cat=' + encodeURIComponent(c.name) + '"><img src="' + H.img(c.sku) + '" alt=""><h3>' + c.name + '</h3><p>' + n + ' produk</p></a>';
  }).join('');
})();
