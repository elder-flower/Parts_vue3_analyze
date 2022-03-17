
var $win = $(window);

var pac = 'panelactive';

var obtn = '.open-btn';
var clbtn = '.close-btn';
var cls = '#search-wrap';


function Set(){

    var type = 'click';
    
    //開くボタンを押した時には
    $( obtn ).on( type, function(){
        $(cls).addClass(pac);//#search-wrapへpanelactiveクラスを付与
        $('#search-text').focus();//テキスト入力のinputにフォーカス
    });
    //閉じるボタンを押した時には
    $( clbtn ).on( type, function(){
        $(cls).removeClass(pac);//#search-wrapからpanelactiveクラスを除去
    });
}

// ページが読み込まれたらすぐに動かしたい場合の記述
$win[0].addEventListener( 'DOMContentLoaded', Set, false );
