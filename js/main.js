$(function () {
    //webフォント読み込みのブレをなくす為の記述
    $('html').addClass('wf-active');

    const window_width = $(window).width(); //画面の横幅取得　JSのwindow.innerWidthと一緒
    const place_max = $('.nav a').length;   //navクラスの数を取得 詳細ページの総数
    const place_id = location.search.replace('?id=', '');//URLのページid
    //http://www.htmq.com/js/location_search.shtml?aaa location.searchでURLのサーチ情報を取得する
    const change_time = 1500;

    let thumbnail_postion = 0;               //スマホTOPのスライド位置
    let thumbnail_count = 1;                 //スマホTOPのスライド番目

    //スマホTOPページのスライド関数
    function mySlide(type) {
        if (type === 'prev') {  //もし引数typeがprevだったら
            thumbnail_postion -= window_width;
            thumbnail_count--;
            //thumbnail_postion = thumbnail_postion - window_width
            //1引く
            if (thumbnail_count === 1) {
                $('[data-slide="prev"]').fadeOut();
            }
            //もしサムネイルカウントが1なら＜がフェードアウトする
        }
        if (type === 'next') {
            thumbnail_postion += window_width;
            //スマホpxcel375であれば376になる
            thumbnail_count++;

            if (thumbnail_count <= place_max) {
                $('[data-slide="prev"]').fadeIn();
            } else {
                thumbnail_postion = 0;
                thumbnail_count = 1;
                $('[data-slide="prev"]').fadeOut();
            }
            //もしサムネイルカウントが詳細ページの数より小さければ、
            //＜はフェードインせよ。違ければ、トップスライド位置と番号を元に戻し、
            //<はフェードアウトせよ
        }
        $('.main').animate({
            scrollLeft: thumbnail_postion
        });
        //animate関数は数値しか使えない
        //scrollLeftは左端からスクロールした時のピクセル数
        //つまりスマホの横幅分＋1pxcel横にずらす

        $('.nav a').removeClass('is-active');
        $('.nav a').eq(thumbnail_count - 1).addClass('is-active');
        //eqはeq(2)などでインデックス番号を返す
        //サムネイルカウントー1のnav aにis-activeクラスを追加する
        //is-activeクラスがついていると下線と重なっているaタグがopacity:1となる
    }
    
    //スマホ時のみ
    if (window_width <= 768) {
        $('[data-slide]').on('click', function () {
            let slide_type = $(this).attr('data-slide');
            //data-slide属性の値を取得する
            mySlide(slide_type);
            //<>をクリック時にmySlide関数に引数prevかnextをいれる
        });
    } else {
        if ($('body').attr('id') === 'page-index') {
            //もしbodyのidがpage-index(トップページなら)
            setInterval(function(){
                const random = Math.floor( Math.random() * place_max );
                $('.thumbnail li').removeClass('is-active');
                $('.thumbnail li').eq(random).addClass('is-active');
            }, change_time);
            //setIntervalは一定時間ごとに処理する関数
            //chamge_time=1500msごとにランダムのインデックス番号のliにis-activeクラスを付与する
        }
    }
    //詳細ページ
    if ($('body').attr('id') === 'page-place') {
        //もしbodyのidがpage-place(詳細ページなら)
        $('.place_img img').attr('src', 'img/place/' + place_id + '.jpg');
        //写真のソースをimgフォルダのplace_id(定数)に変える
        $('[data-place]').each(function(index, el) {
            let place_key = $(this).attr('data-place');
            //data-place属性の値を取得
            if($(this)[0].tagName == 'A'){
                $(this).attr('href', place[place_id - 1][place_key]);
                //もしtagnameがAタグならそのhref属性をmaster.jsで指定したplace配列の
                //place_id - 1番目の値名の値に変更する
            }else{
                $(this).text(place[place_id - 1][place_key]);
                //違う場合は、textの中身を変更する
            }				
        });
        setTimeout(function(){
            $('.loader-wrap').remove();
        },1000)
    }
});