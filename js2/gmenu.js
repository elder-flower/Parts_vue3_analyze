var doc = document;
var glinks = doc.querySelectorAll(".header__gmenu a");
var $win = $(window);
var $header = $(".header");

//スクロール途中からヘッダーの高さを変化させるための設定を関数でまとめる
function FixedAnime() {
  var headerH = $header.outerHeight(true); //headerの高さを取得

  //ヘッダーの高さを取得
  var scroll = $win.scrollTop();
  if (scroll >= headerH) {
    //ヘッダーの高さを超えたら
    $header.addClass("HeightMin"); //.headerについているHeightMinというクラス名を付与
  } else {
    $header.removeClass("HeightMin"); //HeightMinというクラス名を除去
  }
}
function gmenu(flag) {
  for (var aa = 0; aa < glinks.length; aa++) {
    var glink = glinks[aa];
    glink.addEventListener("click", goto, {
      passive: true,
    });
  }

  function goto(e) {
    var tar = e.target;
    var headerVal = $header.outerHeight(true); //現在のheaderの高さを取得

    //ヘッダーが高さの状態を取得してスクロールする範囲を調整する
    var scroll = $win.scrollTop(); //スクロール
    var adjust = 0; //調整の変数
    if (scroll <= headerVal) {
      //スクロールとヘッダーの高さを取得
      adjust = 70; //スクロール値がヘッダーの高さ以内であれば調整変数に70を入れる
    }

    var elmHash = tar.getAttribute("data-href"); //hrefを取得
    var pos = $(elmHash).offset().top - headerVal - adjust; //クリックしたheader分の高さと調整分を引いた高さまでスクロール

    $("body,html").animate({ scrollTop: pos }, 1000);
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
      if (elem.hasAttribute("href")) {
        var link = elems.getAttribute("href");
        elems.removeAttribute("href");
        elems.setAttribute("data-href", link);
      }
    }
  }
}
function Init() {
  sanitize();
  gmenu();
  FixedAnime();
}
// 画面をスクロールをしたら動かしたい場合の記述
$win[0].addEventListener("scroll", FixedAnime, {
  passive: true,
});
$win[0].addEventListener("load", Init, {
  once: true,
  passive: true,
  capture: false,
});
