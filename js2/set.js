
var $win = $(window);
var obtn = '.open-btn';
var pac = 'panelactive';
var ac = 'btnactive';
var cls = '#search-wrap';


function Set(){

    var type = 'click';
    $obtn = $( obtn );

    //開閉ボタンを押した時には
    $obtn.on( type, function(){

        $obtn.toggleClass( ac );//.open-btnは、クリックごとにbtnactiveクラスを付与＆除去。1回目のクリック時は付与
        $( cls ).toggleClass(pac);//#search-wrapへpanelactiveクラスを付与
        $('#search-text').focus();//テキスト入力のinputにフォーカス

        var flag = $obtn.hasClass( ac );
        $obtn[0].setAttribute('aria-pressed', flag);

    });

}

// ページが読み込まれたらすぐに動かしたい場合の記述
$win[0].addEventListener( 'DOMContentLoaded', Set, false );
