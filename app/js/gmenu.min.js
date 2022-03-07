var doc = document;
var has_childs = doc.querySelectorAll('.has-child>a');
var $win = $(window);
var ac = 'active';

var mq = matchMedia('(max-width: 768px)');

//ドロップダウンの設定を関数でまとめる
function mediaQueriesWin(){

    var $has_child = $(".has-child>a");
    var event_str = 'click';

    if( mq.matches ){//横幅が768px以下の場合
        
        sanitize();

        $has_child.off(event_str);	//has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
        $has_child.on(event_str, function() {//has-childクラスがついたaタグをクリックしたら
            var parentElem =  $(this).parent();// aタグから見た親要素の<li>を取得し
            $(parentElem).toggleClass(ac);//矢印方向を変えるためのクラス名を付与して
            $(parentElem).children('ul').stop().slideToggle(500);//liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
        });

    }else{
        
        unsanitize();

        $has_child.off(event_str);//has-childクラスがついたaタグのonイベントをoff(無効)にし
        $has_child.removeClass(ac);//activeクラスを削除
        $('.has-child').children('ul').css("display","");//スライドトグルで動作したdisplayも無効化にする

    }

}
//「a」要素を必ず使いEvent.preventDefault() を避ける必要がある場合。
function sanitize(){
    
    sanitize_core( has_childs );

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
function unsanitize(){
    
    unsanitize_core( has_childs );

    function unsanitize_core( elems ){

        if( elems == null ){
           return
        }
        
        
        var len2 = elems.length;
        
        if( len2 ){
            for( var yy = 0; yy < len2; yy++){

                var elem = elems[yy];
                if( elem.hasAttribute('data-href') ){
                    var link = elem.getAttribute('data-href');
                    elem.removeAttribute('data-href');
                    elem.setAttribute('href',link);
                }

            }

        }else{

            if( elems.hasAttribute('data-href') ){
                var link = elems.getAttribute('data-href');
                elems.removeAttribute('data-href');
                elems.setAttribute('href',link);
            }

        }
    
    }
}
mq.addListener( mediaQueriesWin );
$win[0].addEventListener( 'DOMContentLoaded', mediaQueriesWin, false );