var doc = document;
var totop = doc.querySelector("#page-top a");
var $win = $(window);

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
  Set();
}
$win[0].addEventListener("load", Init, false);
