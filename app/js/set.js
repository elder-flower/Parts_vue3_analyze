var win = window;
var doc = document;

var obtns = doc.getElementsByClassName("open-btn");
var obtns_len = obtns.length;

function Set() {
  for (var aa = obtns_len; aa--; ) {
    var obtn = obtns[aa];
    obtn.addEventListener("click", exe, false);
  }
}

var pac = "panelactive";
var bac = "btnactive";
var swrap = doc.getElementById("search-wrap");
var stext = doc.getElementById("search-text");

function exe() {
  //.open-btnは、クリックごとにbtnactiveクラスを付与＆除去。1回目のクリック時は付与
  for (var bb = obtns_len; bb--; ) {
    var obtn = obtns[bb];
    obtn.classList.toggle(bac);

    var cls_lists = [...obtn.classList];
    //console.log( cls_lists );

    var flag = cls_lists.find((elm) => elm === bac);
    //console.log( flag );

    if (flag === bac) {
      obtn.setAttribute("aria-pressed", true);
    }else{
      obtn.setAttribute("aria-pressed", false);
    }
  }

  //#search-wrapへpanelactiveクラスを付与
  swrap.classList.toggle(pac);

  //テキスト入力のinputにフォーカス
  stext.focus();
}

// ページが読み込まれたらすぐに動かしたい場合の記述
win.addEventListener("DOMContentLoaded", Set, false);
