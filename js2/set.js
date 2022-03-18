var doc = document;
var totop = doc.querySelector("#page-top a");
var $win = $(window);
var $ptop = $("#page-top");
var $hbtn = $(".hide-btn");

//スクロールした際の動きを関数でまとめる
function setFadeElement() {
  var windowH = $win.height(); //ウィンドウの高さを取得
  var scroll = $win.scrollTop(); //スクロール値を取得

  //出現範囲の指定
  var contentsTop = Math.round($("#area-2").offset().top); //要素までの高さを四捨五入した値で取得
  var contentsH = $("#area-3").outerHeight(true); //要素の高さを取得

  //2つ目の出現範囲の指定※任意
  //var contentsTop2 = Math.round($('#area-5').offset().top);	//要素までの高さを取得
  //var contentsH2 = $('#area-5').outerHeight(true);//要素の高さを取得

  //出現範囲内に入ったかどうかをチェック
  if (
    scroll + windowH >= contentsTop &&
    scroll + windowH <= contentsTop + contentsH
  ) {
    $ptop.addClass("UpMove"); //入っていたらUpMoveをクラス追加
    $ptop.removeClass("DownMove"); //DownMoveを削除
    $hbtn.removeClass("hide-btn"); //hide-btnを削除
  } //2つ目の出現範囲に入ったかどうかをチェック※任意
  // else if(scroll+windowH >= contentsTop2 && scroll+windowH <= contentsTop2+contentsH2){
  //$ptop.addClass("UpMove");    //入っていたらUpMoveをクラス追加
  //$ptop.removeClass("DownMove");   //DownMoveを削除
  //}//それ以外は
  else {
    //サイト表示時にDownMoveクラスを一瞬付与させないためのクラス付け。hide-btnがなければ下記の動作を行う
    if (!$hbtn.length) {
      //DownMoveをクラス追加
      $ptop.addClass("DownMove");

      //UpMoveを削除
      $ptop.removeClass("UpMove");
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
  setFadeElement();
  Set();
}
$win[0].addEventListener("scroll", setFadeElement, false);
$win[0].addEventListener("DOMContentLoaded", Init, false);
