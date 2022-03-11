var win = window;
var doc = document;

var obtn_class_name = "openbtn";
var add_class_name = "open";

var root = doc.getElementsByTagName("html");
var obtns = doc.getElementsByClassName(obtn_class_name);
var obtns_len = obtns.length;

// ページが読み込まれたらすぐに動かしたい場合の記述
win.addEventListener("DOMContentLoaded", openBtn, false);

function openBtn() {
  for (var aa = obtns_len; aa--; ) {
    var obtn = obtns[aa];
    obtn.addEventListener("click", gmenu, false);
  }
}

function gmenu() {
  root[0].classList.toggle(add_class_name);
}
