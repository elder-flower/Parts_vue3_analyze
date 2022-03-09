var doc = document;
var glinks = doc.querySelectorAll("#g-navi li a");
var $win = $(window);
var $nav = $("#sub-area nav");

var mq = matchMedia("(min-width: 768px)");

function Sticky() {
  if (mq.matches) {
    /*768px以上にIE用のJSをきかせる*/
    Stickyfill.add($nav);
  } else {
    Stickyfill.remove($nav);
  }
}
function gmenu() {
  for (var aa = 0; aa < glinks.length; aa++) {
    var glink = glinks[aa];
    glink.addEventListener("click", goto, {
      passive: true,
    });
  }
  function goto(e) {
    var num = 0;
    var tar = e.target;
    var elmHash = tar.getAttribute("data-href");
    var pos = $(elmHash).offset().top - num;
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
  Sticky();
}
mq.addListener(Sticky);
$win[0].addEventListener("load", Init, {
  once: true,
  passive: true,
  capture: false,
});
