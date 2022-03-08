var doc = document;
var glinks = doc.querySelectorAll('.header__gmenu a');
var $win = $(window);

//スクロールすると上部に固定させるための設定を関数でまとめる
function FixedAnime() {
    
    var $header = $('.header');

    var headerH = $header.outerHeight(true);
    var scroll = $win.scrollTop();
    if (scroll >= headerH){//headerの高さ以上になったら
        $header.addClass('fixed');//fixedというクラス名を付与
    }else{//それ以外は
        $header.removeClass('fixed');//fixedというクラス名を除去
    }

}

// Scrollイベント中に「Event.preventDefault()」があるとJS的に良くないので「Event.preventDefault()」を使わない為の回避処理。
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
function tolink(){
    //ナビゲーションをクリックした際のスムーススクロール
        
    for( var aa = 0; aa < glinks.length; aa++){
        var glink = glinks[aa];
        
        //「option.passive」はIE11では非対応。
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
$win[0].addEventListener( 'scroll', FixedAnime, false);
$win[0].addEventListener( 'load', Init, false );

