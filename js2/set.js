var doc = document;
var totop = doc.querySelector("#page-top a");
var $win = $(window);

function Set() {
  totop.addEventListener("click", goto, false);

  function goto() {
    $("body,html").animate(
      {
        scrollTop: 0, //ページトップまでスクロール
      },
      1500,
      "easeInOutQuint"
    ); //ページトップスクロールの速さ※数字が大きいほど遅くなる, easingプラグインでアニメーション速度に変化
    //linear、swing、jswing、easeInQuad、easeOutQuad、easeInOutQuad、easeInCubic、easeOutCubic、easeInOutCubic、easeInQuart、easeOutQuart、easeInOutQuart、easeInQuint、easeOutQuint、easeInOutQuint、easeInSine、easeOutSine、easeInOutSine、easeInExpo、easeOutExpo、easeInOutExpo、easeInCirc、easeOutCirc、easeInOutCirc、easeInElastic、easeOutElastic、easeInOutElastic、easeInBack、easeOutBack、easeInOutBack、easeInBounce、easeOutBounce、easeInOutBounceなどから選択可能
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
  Set();
}
$win[0].addEventListener("DOMContentLoaded", Init, false);
