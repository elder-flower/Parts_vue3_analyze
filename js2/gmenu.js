var doc = document;
var glinks = document.querySelectorAll(".header__gmenu a");
var $win = $(window);
var $header = $(".header");
var headerH = $header.outerHeight(true); //headerの高さを取得

var beforePos = 0; //スクロールの値の比較用の設定

//スクロール途中でヘッダーが消え、上にスクロールすると復活する設定を関数にまとめる
function ScrollAnime() {
  var elemTop = $("#area-2").offset().top; //#area-2の位置まできたら
  var scroll = $win.scrollTop();

  //ヘッダーの出し入れをする
  if (scroll == beforePos) {
    //IE11対策で処理を入れない
  } else if (elemTop > scroll || 0 > scroll - beforePos) {
    //ヘッダーが上から出現する
    $header.removeClass("UpMove"); //.headerにUpMoveというクラス名を除き
    $header.addClass("DownMove"); //.headerにDownMoveのクラス名を追加
  } else {
    //ヘッダーが上に消える
    $header.removeClass("DownMove"); //.headerにDownMoveというクラス名を除き
    $header.addClass("UpMove"); //.headerにUpMoveのクラス名を追加
  }

  beforePos = scroll; //現在のスクロール値を比較用のbeforePosに格納
}
//リンク先のidまでスムーススクロール
//※ページ内リンクを行わない場合は不必要なので削除してください
function gmenu() {
  for (var aa = 0; aa < glinks.length; aa++) {
    var glink = glinks[aa];
    glink.addEventListener("click", goto, {
      passive: true,
    });
  }

  function goto(e) {
    var tar = e.target;

    var elmHash = tar.getAttribute("data-href");
    var pos = $(elmHash).offset().top - headerH; //header分の高さを引いた高さまでスクロール
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
  ScrollAnime();
}
// 画面をスクロールをしたら動かしたい場合の記述
$win[0].addEventListener("scroll", ScrollAnime, {
  passive: true,
});
$win[0].addEventListener("load", Init, {
  once: true,
  passive: true,
  capture: false,
});
