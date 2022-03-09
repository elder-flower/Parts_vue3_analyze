var doc = document;
var glinks = doc.querySelectorAll('.header__gmenu a');

var $btn = $('.openbtn');
var $header = $('.header');
var $win = $(window);

//スクロールをするとハンバーガーメニューに変化するための設定を関数でまとめる
function FixedAnime(){
    
    var headerH = $header.outerHeight(true);

    //ヘッダーの高さを取得
    var scroll = $win.scrollTop();
    if (scroll >= headerH){//ヘッダーの高さ以上までスクロールしたら
        $btn.addClass('fadeDown');//.openbtnにfadeDownというクラス名を付与して
        $header.addClass('dnone');//.headerにdnoneというクラス名を付与
    }else{//それ以外は
        $btn.removeClass('fadeDown');//fadeDownというクラス名を除き
        $header.removeClass('dnone');//dnoneというクラス名を除く
    }
}
//リンク先のidまでスムーススクロール
//※ページ内リンクを行わない場合は不必要なので削除してください
function page_link(){

    for( var aa = 0; aa < glinks.length; aa++){
        var glink = glinks[aa];
        glink.addEventListener('click', goto, {
            passive: true
        });

    }

    function goto( e ){

        var num = 0;
        var tar = e.target;
        var elmHash = $(tar).attr('data-href');
        var pos = $(elmHash).offset().top - num;

        $('body,html').animate({scrollTop: pos}, 1000);

    }
}
function menu(){

    $btn[0].addEventListener('click', openBtn, {
            passive: true
    });

    for( var bb = 0; bb < glinks.length; bb++){
        var glink = glinks[bb];
        glink.addEventListener('click', gmenu, {
            passive: true
        });

    }
}
function openBtn(){
    $btn.toggleClass('active');//ボタン自身に activeクラスを付与し
    $header.toggleClass('panelactive');//ヘッダーにpanelactiveクラスを付与
}

function gmenu(){
    $btn.removeClass('active');//ボタンの activeクラスを除去し
    $header.removeClass('panelactive');//ヘッダーのpanelactiveクラスも除去
}
function sanitize(){
    
    sanitize_core( glinks );

    function sanitize_core( elems ){

        if( elems == null ){
           return
        }
        
        var len = elems.length;

        if( len ){
            for( var zz = 0; zz < len; zz++){
                var elem = elems[zz];
                if( elem.hasAttribute('href') ){
                    var link = elem.getAttribute('href');
                    elem.removeAttribute('href');
                    elem.setAttribute('data-href',link);
                }
            }
        }else{
            if( elem.hasAttribute('href') ){
                var link = elems.getAttribute('href');
                elems.removeAttribute('href');
                elems.setAttribute('data-href',link);
            }

        }
    
    }
}
function Init(){

    sanitize();
    page_link();
    menu();
    FixedAnime();

}

// 画面をスクロールをしたら動かしたい場合の記述
$win[0].addEventListener( 'scroll', FixedAnime, {
    passive: true,
});
$win[0].addEventListener( 'load', Init, {
    once: true,
    passive: true,
    capture: false
});