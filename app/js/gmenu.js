var doc = document;
var glinks = doc.querySelectorAll('.header__gmenu a');
var $win = $(window);

//スクロール途中からヘッダーを出現させるための設定を関数でまとめる
function FixedAnime() {
    var $header = $('.header');

    var elemTop = $('#area-2').offset().top;//#area-3の位置まできたら
    var scroll = $win.scrollTop();
    
    if(scroll <= 20){//上から20pxスクロールされたら

        $header.addClass('DownMove');//DownMoveというクラス名を除き

    } else if (scroll >= elemTop){

            $header.removeClass('UpMove');//.headerについているUpMoveというクラス名を除く
            $header.addClass('DownMove');//.headerについているDownMoveというクラス名を付与

    }else{

            if($header.hasClass('DownMove')){//すでに.headerにDownMoveというクラス名がついていたら
                $header.removeClass('DownMove');//DownMoveというクラス名を除き
                $header.addClass('UpMove');//UpnMoveというクラス名を付与
            }
    }
}
function sanitize(){
    
    sanitize_core( glinks);

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
function tolink(){
    //ナビゲーションをクリックした際のスムーススクロール
        
    for( var aa = 0; aa < glinks.length; aa++){
        var glink = glinks[aa];
        glink.addEventListener('click', move, {
            passive: true
        });

    }

}
function move( e ){

    var th = e.target;
    var num = 140;
    
    var elmHash = $(th).attr('data-href'); //hrefの内容を取得
    var pos = Math.round($(elmHash).offset().top - num );//headerの高さを引く

    $('body,html').animate({scrollTop: pos}, 500);//取得した位置にスクロール※数値が大きいほどゆっくりスクロール

}

function Init(){

    sanitize();
    tolink();
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