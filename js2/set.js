var doc = document;
var totop = doc.querySelector('#page-top a');
var $win = $(window);
var $ptop = $('#page-top');

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {

    var scroll = $win.scrollTop();
    if (scroll >= 200){//上から200pxスクロールしたら
        $ptop.removeClass('RightMove');//#page-topについているRightMoveというクラス名を除く
        $ptop.addClass('LeftMove');//#page-topについているLeftMoveというクラス名を付与
    }else{
        if(
            $ptop.hasClass('LeftMove')){//すでに#page-topにLeftMoveというクラス名がついていたら
            $ptop.removeClass('LeftMove');//LeftMoveというクラス名を除き
            $ptop.addClass('RightMove');//RightMoveというクラス名を#page-topに付与
        }
    }
}

function Set(){

    totop.addEventListener( 'click', goto, false );
    
    function goto(){
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        
    }
}
function sanitize(){
    
    sanitize_core( totop );

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
            if( elems.hasAttribute('href') ){
                var link = elems.getAttribute('href');
                elems.removeAttribute('href');
                elems.setAttribute('data-href',link);
            }

        }
    
    }
}
function Init(){

    sanitize();
    PageTopAnime();
    Set();

}
$win[0].addEventListener( 'scroll', PageTopAnime, false );
$win[0].addEventListener( 'DOMContentLoaded', Init, false );
