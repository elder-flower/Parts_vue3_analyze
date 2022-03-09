const doc = document;
const glinks = doc.querySelectorAll(".header__gmenu a");
const $header = $(".header");
const $html = $("html");
const $btn = $(".openbtn");
const $win = $(window);

function iObserver() {
  const spoints = doc.querySelectorAll(".scroll-point");
  const fd = "fadeDown";
  const dnone = "dnone";

  const options = {
    root: null, // 今回はビューポートをルート要素とする
    rootMargin: "-30% 0px", // ビューポートの中心を判定基準にする
    threshold: 0, // 閾値は0
  };

  const observer = new IntersectionObserver(scroll_check, options);

  // それぞれの「.scroll-point'」を監視する
  spoints.forEach((point) => {
    observer.observe(point);
  });

  function scroll_check(entries) {
    //console.log( entries );

    // 交差検知をしたもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
    entries.forEach((entry) => {
      //console.log( entry.isIntersecting );
      if (entry.isIntersecting) {
        $btn.removeClass(fd);
        $header.removeClass(dnone);
      } else {
        $btn.addClass(fd);
        $header.addClass(dnone);
      }
    });
  }
}
//リンク先のidまでスムーススクロール
//※ページ内リンクを行わない場合は不必要なので削除してください
function page_link() {
  for (let glink of glinks) {
    glink.addEventListener("click", goto, {
      passive: true,
    });
  }

  function goto(e) {
    const num = 0;
    const tar = e.target;
    const elmHash = $(tar).attr("data-href");
    const pos = $(elmHash).offset().top - num;

    $("body,html").animate({ scrollTop: pos }, 1000);
  }
}
function menu() {
  $btn[0].addEventListener("click", openBtn, {
    passive: true,
  });

  for (let glink of glinks) {
    glink.addEventListener("click", gmenu, {
      passive: true,
    });
  }
}
function openBtn() {
  $btn.toggleClass("active"); //ボタン自身に activeクラスを付与し
  $html.toggleClass("panelactive"); //ヘッダーにpanelactiveクラスを付与
}

function gmenu() {
  $btn.removeClass("active"); //ボタンの activeクラスを除去し
  $html.removeClass("panelactive"); //ヘッダーのpanelactiveクラスも除去
}
function sanitize() {
  sanitize_core(glinks);

  function sanitize_core(elems) {
    if (elems == null) {
      return;
    }

    if (elems.length) {
      for (const elem of elems) {
        if (elem.hasAttribute("href")) {
          const link = elem.getAttribute("href");
          elem.removeAttribute("href");
          elem.setAttribute("data-href", link);
        }
      }
    } else {
      if (elem.hasAttribute("href")) {
        const link = elems.getAttribute("href");
        elems.removeAttribute("href");
        elems.setAttribute("data-href", link);
      }
    }
  }
}
function Init() {
  sanitize();
  page_link();
  menu();
  iObserver();
}
$win[0].addEventListener("load", Init, {
  once: true,
  passive: true,
  capture: false,
});
