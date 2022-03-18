var doc = document;
var totop = doc.querySelector("#page-top a");
var $win = $(window);
var $ptop = $("#page-top");

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  var scroll = $win.scrollTop();
  if (scroll >= 100) {
    //上から100pxスクロールしたら
    $ptop.removeClass("DownMove"); //#page-topについているDownMoveというクラス名を除く
    $ptop.addClass("UpMove"); //#page-topについているUpMoveというクラス名を付与
  } else {
    if ($ptop.hasClass("UpMove")) {
      //すでに#page-topにUpMoveというクラス名がついていたら
      $ptop.removeClass("UpMove"); //UpMoveというクラス名を除き
      $ptop.addClass("DownMove"); //DownMoveというクラス名を#page-topに付与
    }
  }
}
function Set() {
  totop.addEventListener("click", goto, false);

  function goto(e) {
    var tar = e.target;
    var $tar = $(tar);

    var scroll = $win.scrollTop(); //スクロール値を取得

    if (scroll > 0) {
      $tar.addClass("floatAnime"); //クリックしたらfloatAnimeというクラス名が付与
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        800,
        function () {
          //スクロールの速さ。数字が大きくなるほど遅くなる
          $tar.removeClass("floatAnime"); //上までスクロールしたらfloatAnimeというクラス名を除く
        }
      );
    }
  }
}
function sanitize() {
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
  PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
  Set();
}
$win[0].addEventListener("scroll", PageTopAnime, false);
$win[0].addEventListener("DOMContentLoaded", Init, false);
