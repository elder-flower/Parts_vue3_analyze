var doc = document;
var glinks = doc.querySelectorAll('.g-nav a');
var $win = $(window);
var $obtn = $('.openbtn');
var $gnav = $('.g-nav');
var $html = $('html');

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
      if (elem.hasAttribute("href")) {
        var link = elems.getAttribute("href");
        elems.removeAttribute("href");
        elems.setAttribute("data-href", link);
      }
    }
  }
}
function openBtn() {
  $obtn[0].addEventListener("click", gmenu, false);

  for (var aa = 0; aa < glinks.length; aa++) {
    var glink = glinks[aa];
    glink.addEventListener("click", gmenu2, {
      passive: true,
    });
  }
}
function gmenu() {
  $obtn.toggleClass("active"); //ボタン自身に activeクラスを付与し
  $html.toggleClass("panelactive"); //ナビゲーションにpanelactiveクラスを付与
}
function gmenu2() {
  $obtn.removeClass("active"); //ボタンの activeクラスを除去し
  $html.removeClass("panelactive"); //ナビゲーションのpanelactiveクラスも除去
}
function Init() {
  sanitize();
  openBtn();
}
$win[0].addEventListener("load", Init, false);
