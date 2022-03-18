var doc = document;
var totop = doc.querySelector("#page-top a");
var $win = $(window);
var $ptop = $("#page-top");
var $footer = $("#footer");

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  var scroll = $win.scrollTop(); //スクロール値を取得
  if (scroll >= 200) {
    //200pxスクロールしたら
    $ptop.removeClass("DownMove"); // DownMoveというクラス名を除去して
    $ptop.addClass("UpMove"); // UpMoveというクラス名を追加して出現
  } else {
    //それ以外は
    if ($ptop.hasClass("UpMove")) {
      //UpMoveというクラス名が既に付与されていたら
      $ptop.removeClass("UpMove"); //  UpMoveというクラス名を除去し
      $ptop.addClass("DownMove"); // DownMoveというクラス名を追加して非表示
    }
  }

  var wH = window.innerHeight; //画面の高さを取得
  var footerPos = $footer.offset().top; //footerの位置を取得
  if (scroll + wH >= footerPos + 10) {
    var pos = scroll + wH - footerPos + 10; //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
    $ptop.css("bottom", pos); //#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
  } else {
    //それ以外は
    if ($ptop.hasClass("UpMove")) {
      //UpMoveというクラス名がついていたら
      $ptop.css("bottom", "10px"); // 下から10pxの位置にページリンクを指定
    }
  }
}
function Set() {
  totop.addEventListener("click", goto, false);

  function goto() {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
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
  PageTopAnime();
  Set();
}
$win[0].addEventListener("scroll", PageTopAnime, false);
$win[0].addEventListener("DOMContentLoaded", Init, false);
