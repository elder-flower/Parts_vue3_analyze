var doc = document;

var togo = doc.querySelector(".js-scroll a");
var totop = doc.querySelector(".js-pagetop a");

var $win = $(window);
var $js_scroll = $(".js-scroll");
var $js_ptop = $(".js-pagetop");
var $bdy = $("body,html");

//スクロールした際の動きを関数でまとめる
function PageTopCheck() {
  var winScrollTop = $win.scrollTop();
  var secondTop = $("#area-2").offset().top - 150; //#area-2の上から150pxの位置まで来たら

  if (winScrollTop >= secondTop) {
    $js_scroll.removeClass("scroll-view"); //.js-scrollからscroll-viewというクラス名を除去
    $js_ptop.addClass("scroll-view"); //.js-pagetopにscroll-viewというクラス名を付与
  } else {
    //元に戻ったら
    $js_scroll.addClass("scroll-view"); //.js-scrollからscroll-viewというクラス名を付与
    $js_ptop.removeClass("scroll-view"); //.js-pagetopからscroll-viewというクラス名を除去
  }
}

function Set() {
  togo.addEventListener("click", goto, false);

  totop.addEventListener("click", topto, false);

  function goto(e) {
    var tar = e.target;

    var elmHash = tar.getAttribute("data-href"); //hrefの内容を取得

    var pos = $(elmHash).offset().top;
    $bdy.animate({ scrollTop: pos }, pos); //#area-2にスクロール
  }
  function topto() {
    $bdy.animate({ scrollTop: 0 }, 500); //それ以外はトップへスクロール。数字が大きくなるほどゆっくりスクロール
  }
}
function sanitize() {
  sanitize_core(togo);
  sanitize_core(totop);

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
  PageTopCheck();
  Set();
}
$win[0].addEventListener("scroll", PageTopCheck, false);
$win[0].addEventListener("DOMContentLoaded", Init, false);
