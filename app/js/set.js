var win = window;
var doc = document;

var obtns = doc.getElementsByClassName("open-btn");
var obtns_len = obtns.length;

var clbtns = doc.getElementsByClassName("close-btn");
var clbtns_len = clbtns.length;

var swrap = doc.getElementById("search-wrap");
var stext = doc.getElementById("search-text");

var pa_class_name = "panelactive";

function Set() {
  for (var aa = obtns_len; aa--; ) {
    var obtn = obtns[aa];
    obtn.addEventListener("click", addClass, false);
  }
  for (var bb = clbtns_len; bb--; ) {
    var clbtn = clbtns[bb];
    clbtn.addEventListener("click", removeClass, false);
  }
}

function addClass() {
  //IE11では使えないっぽい。
  swrap.classList.add(pa_class_name); //#search-wrapへpanelactiveクラスを付与
  stext.focus(); //テキスト入力のinputにフォーカス
}

function removeClass() {
  //IE11では使えないっぽい。
  swrap.classList.remove(pa_class_name); //#search-wrapからpanelactiveクラスを除去
}

// ページが読み込まれたらすぐに動かしたい場合の記述
win.addEventListener("DOMContentLoaded", Set, false);
