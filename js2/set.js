var doc = document;
var glinks = doc.querySelectorAll('#page-link a[href*="#"]');
var $win = $(window);

function Set() {
  var offset = 122;

  for (var aa = 0; aa < glinks.length; aa++) {
    var glink = glinks[aa];
    glink.addEventListener("click", goto, {
      passive: true,
    });
  }

  function goto(e) {
    var tar = e.target;
    var elmHash = tar.getAttribute("data-href"); //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
    var pos = $(elmHash).offset().top - offset; //idの上部の距離からHeaderの高さを引いた値を取得
    $("body,html").animate({ scrollTop: pos }, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
  }
}
function sanitize() {
  sanitize_core(glinks);

  function sanitize_core(elems) {
    if (elems == null) {
      return;
    }

    var len = elems.length;

    if (len) {
      for (var zz = 0; zz < len; zz++) {
        var elem = elems[zz];
        if (elem.hasAttribute("href")) {
          var link = elem.getAttribute("href");
          elem.removeAttribute("href");
          elem.setAttribute("data-href", link);
        }
      }
    } else {
      if (elems.hasAttribute("href")) {
        var link = elems.getAttribute("href");
        elems.removeAttribute("href");
        elems.setAttribute("data-href", link);
      }
    }
  }
}
function Init() {
  sanitize();
  Set();
}
$win[0].addEventListener("DOMContentLoaded", Init, false);
