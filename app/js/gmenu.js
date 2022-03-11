const win = window;
const $obtn = $(".openbtn");

// ページが読み込まれたらすぐに動かしたい場合の記述

win.addEventListener("load", openBtn, false);
function openBtn() {
  $obtn.each(function (i, elem) {
    elem.addEventListener("click", gmenu, false);
  });
}

function gmenu() {
  $obtn.toggleClass("active");
}
