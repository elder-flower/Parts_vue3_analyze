<template>
  <div class="pagination_wrapper">
    <div ref="nav_ref" v-show="nav_off">
      <div class="nav">
        <button
          class="triBtn prevBtn"
          v-on:click="onPrevBtn"
          ref="prevBtn_ref"
        ></button>
        <div class="nav_dot_wrapper">
          <ul class="nav_dot" ref="nav_dot_ref">
            <li v-for="j in dots" v-bind:key="j">
              <button
                v-bind:data-id="j - 1"
                v-on:click="onDotBtn"
                ref="btn_refs"
                v-bind:id="`btn${j - 1}`"
              ></button>
            </li>
          </ul>
        </div>

        <button
          class="triBtn nextBtn"
          v-on:click="onNextBtn"
          ref="nextBtn_ref"
        ></button>
      </div>
    </div>

    <section class="lists">
      <slot v-bind:list="lists.data" name="default"></slot>
    </section>

    <div class="page_number" ref="page_number_ref" v-show="nav_off">
      {{ pos + 1 }} ページ / ページ数 : {{ dots }} / ページ毎の表示数 :
      {{ lists.data.length }} / 総数 :
      {{ datalist.data.length }}
    </div>

    <!--  計測用のラッパー要素 -->
    <section id="measurement" ref="measurement_ref">
      <!--「Pagination」に渡された全データを生成する処理。-->
      <slot v-bind:list="datalist.data" name="measurement"></slot>
    </section>
  </div>
</template>
<script>
import {
  ref,
  reactive,
  watch,
  // watchEffect,
  // onBeforeUpdate,
  // onBeforeMount,
  onMounted,
  onUnmounted,
} from 'vue';

export default {
  name: 'PagiNation',
  props: ['datalist', 'start_pos', 'class_name'],
  //emits: [''],
  setup(props) {
    // 「PagiNation」で表示させるデータ（型：配列）
    const datalist = reactive({ data: [] });
    datalist.data = props.datalist;

    const measurement_class_name = props.class_name;

    /*
    console.log('datalist.data ');
    console.log(datalist.data);
    */

    // Pagination 生成処理。

    // ナビゲーションの表示切り替え。
    const nav_off = ref(true);

    if (datalist.data.length < 2 || datalist.data == undefined) {
      nav_off.value = false;
    }

    // 「dotボタン」に付けるクラス名。
    const ac_class = 'dot_active';

    // 初期化時の位置を指定する変数。
    const pos_init = props.start_pos;

    // 現在表示している「Pagination」の位置。
    const pos = ref(pos_init);

    // 「dot」ボタンの数
    let dots = ref(0);

    // 分割数。
    let divisionNumber = ref(0);

    // 「Pagination」の総数。
    let totalNumber = ref(0);

    // 高さを取得し計算する処理。

    // 「nav」要素を取得する為のref要素。
    const nav_ref = ref('');

    // 「footer」要素を取得する為のref要素。
    const page_number_ref = ref('');

    // 計測用のラッパー要素を取得する為のref要素。
    const measurement_ref = ref('');

    //「dot」ボタン要素を取得する為のref要素。
    const btn_refs = ref('');

    //「dot」ボタンのラッパー要素を取得する為のref要素。
    const nav_dot_ref = ref('');

    //「前へ」ボタンのラッパー要素を取得する為のref要素。
    const prevBtn_ref = ref('');

    //「次へ」ボタンのラッパー要素を取得する為のref要素。
    const nextBtn_ref = ref('');

    // 「Pagination」の各子要素の高さの値を入れる変数。
    let list_elements_height = [];

    // 各ページの表示数を入れる配列。
    let numbers_of_display_contents = [];

    // 高さを取得し計算して分割する関数。
    const division_recalculation = async () => {
      console.log('division_recalculation');

      const doc = document;

      // 計測用の各子要素の表示高さを取得する処理。
      if (measurement_ref.value !== '') {
        // 計測用の要素が取得出来た場合。

        const measurement_elem = measurement_ref.value;

        // 計測用の各子要素を取得。
        const lists = doc.getElementsByClassName(measurement_class_name);

        // 計測用の各子要素の表示高さを入れる配列。初期化する。
        list_elements_height = [];

        // 計測用の要素を一瞬だけ表示する。
        measurement_elem.setAttribute('style', 'display:flex');

        // 計測用の各子要素の表示高さを取得。
        for (let aa = 0; aa < lists.length; aa++) {
          list_elements_height.push(lists[aa].clientHeight);
        }

        // 計測用の要素を非表示にする。
        measurement_elem.setAttribute('style', 'display:none');

        //console.log(lists);
        //console.log(list_elements_height);
      }

      // ブラウザの表示高さから「Pagination」の表示数を割り出す処理。
      if (nav_ref.value !== '' && page_number_ref.value !== '') {
        // 各ページの表示数を入れる配列。初期化。
        numbers_of_display_contents = [];

        const html = doc.documentElement;
        const nav_area = nav_ref.value;
        const page_number_area = page_number_ref.value;

        // ブラウザの表示領域の高さを取得。
        const html_height = html.clientHeight;

        //「nav」要素の表示領域の高さを取得。
        const nav_area_height = nav_area.clientHeight;

        //「footer」要素の表示領域の高さを取得。
        const page_number_area_height = page_number_area.clientHeight;

        /*
        console.log(html_height);
        console.log(nav_area_height);
        console.log(pagination_area_height);
        console.log(page_number_area_height);
        */

        //「Pagination」要素が表示出来る高さを算出。
        const pagination_max_height =
          html_height - nav_area_height - page_number_area_height;

        /*
        console.log('pagination_max_height');
        console.log(pagination_max_height);
        */

        //「limit」回数 While ループしたら強制終了させる。
        const limit = 50;
        let count = 0;

        // 1ページ毎に表示させる数を入れる変数。
        let index = 0;

        //「Pagination」要要素が表示出来る高さから「offset」を取る。（「offset」で引かないとレイアウト的に少しずれるので防止用。）
        const offset = 50;

        //「表示出来る高さ」から表示数を算出する処理。
        while (index < list_elements_height.length) {
          let content_height = 0;

          //「Pagination」要要素が表示出来る高さ（「offset」で引いた値）まで子要素を足す。
          while (
            content_height + list_elements_height[index] + offset <
            pagination_max_height
          ) {
            content_height += list_elements_height[index];
            index++;
          }
          /*
          console.log('content_height');
          console.log(content_height);
          */

          //「1つのページに表示する数」が決まったので配列に追加。
          numbers_of_display_contents.push(index);
          count++;
          if (count > limit) {
            break;
          }
        }

        // 各ページの表示数が決まり、値が格納された配列。
        console.log('numbers_of_display_contents');
        console.log(numbers_of_display_contents);
      }
    };

    // 「Pagination」生成の為の基本的パラメータを設定。
    const generatePagination = () => {
      // 総数
      totalNumber.value = datalist.data.length;

      // 高さを算出した結果を元に「分割数」を割り出す。
      divisionNumber.value = numbers_of_display_contents.length;

      // 「dot」ボタンの数を算出。
      dots.value = divisionNumber.value;
    };

    // 表示されるデータの配列。リアクティブにする為、「reactive」でラッピング。
    let lists = reactive({
      data: [],
    });

    // 表示するデータを更新する関数。
    const listsUpdata = () => {
      //console.log('listsUpdata');

      // ページの表示サイズ変更で「pos(現在地)」がページ分割数の数を超えた際の回避処理。
      if (pos.value > numbers_of_display_contents.length) {
        pos.value = numbers_of_display_contents.length - 1;
      }

      // データ切り出し開始位置。
      let start_index = 0;

      // データ切り出し開終了位置。
      let end_index = 0;

      // 現在地の一つ前のpos値。
      let prev_pos = ref(pos.value - 1);

      /*
      console.log('pos.value');
      console.log(pos.value);
      console.log('prev_pos');
      console.log(prev_pos.value);
      */

      if (prev_pos.value < 0) {
        // 現在地が1番最初の時。

        //console.log('prev_pos.value < 0');
        start_index = 0;

        end_index = numbers_of_display_contents[pos.value];
        if (end_index === undefined) {
          end_index = datalist.data.length;
        }
      } else {
        /*
        console.log('not prev_pos.value < 0');
        console.log(numbers_of_display_contents[pos.value]);
        console.log(numbers_of_display_contents[prev_pos.value]);
        */
        // 表示開始位置
        start_index = numbers_of_display_contents[prev_pos.value];

        // 表示終了位置
        end_index = numbers_of_display_contents[pos.value];
      }

      console.log('index');
      console.log(start_index);
      console.log(end_index);

      // ページの表示サイズ変更で「undefined」になった際の回避処理。

      if (start_index === undefined || end_index === undefined) {
        start_index = 0;
        end_index = 3;
      }

      // 表示されるデータの配列を更新。
      lists.data = datalist.data.slice(start_index, end_index);
      //console.log(lists.data);
    };

    // ページの存在状況により「triBtn」の表示状態を更新する。
    const triBtnUpdate = () => {
      //console.log('triBtnUpdate');
      // ページ位置で開始位置と一番最後の位置ではそれぞれ「prevBtn」と「nextBtn」が非アクティブになる際のクラス名。
      const inactive_class = 'inactive';

      const prevBtn = prevBtn_ref.value;
      const nextBtn = nextBtn_ref.value;

      /*
      console.log('pos.value');
      console.log(pos.value);
      */

      //「前のページ」が存在しない場合は「前へ」ボタンの非表示処理。
      if (prevBtn_ref.value !== '') {
        if (pos.value === 0) {
          prevBtn.classList.add(inactive_class);
        } else {
          prevBtn.classList.remove(inactive_class);
        }
      }

      //「次のページ」が存在しない場合は「次へ」ボタンの非表示処理。
      if (nextBtn_ref.value !== '') {
        if (pos.value === dots.value - 1) {
          nextBtn.classList.add(inactive_class);
        } else {
          nextBtn.classList.remove(inactive_class);
        }
      }

      /*
      console.log('pos.value');
      console.log(pos.value);

      console.log('dots.value');
      console.log(dots.value);
              */
    };

    // 高さを再計算し「Pagination」を再生成する処理。
    const update = (id = 0) => {
      division_recalculation().then(() => {
        generatePagination();
        listsUpdata();
        triBtnUpdate();

        setTimeout(() => {
          btnsUpdate(id);
        });
      }, 0);
    };

    update();

    watch(
      () => props.datalist,
      (newV) => {
        datalist.data = newV;
        //division_recalculation();
        setTimeout(update, 0);
      }
    );

    /*
    watchEffect(() => {
      datalist.data = props.datalist;
      //division_recalculation();
      setTimeout(division_recalculation, 0);
    });
    */

    // 「dotBtn」の表示状態を更新する。
    const btnsUpdate = (id = 0) => {
      console.log('btnsUpdate');
      //console.log(id);

      let id2 = id;

      // dotボタンを全て取得。
      const btns = btn_refs.value;
      /*
      console.log('btns.length');
      console.log(btns.length);
      */

      // アニメーション処理のために「dot」ボタンのラッパー要素を取得。
      const nav_dot = nav_dot_ref.value;
      //console.log(nav_dot.scrollWidth);

      /// アニメーション移動距離を案出。
      let distance = Number(nav_dot.scrollWidth) / dots.value;

      /*
      console.log('nav_dot.scrollWidth');
      console.log(nav_dot.scrollWidth);
      */

      // ページ数が多い時から少ない時に可変して最後のページ数より現在地が超えていた時の補正。
      if (id > btns.length - 1) {
        id2 = btns.length - 1;
      }

      // 移動アニメーションが実行された時に「true」になるflag。
      let move_flag = false;

      // 現在地に該当する「dot」ボタンに「ac_class」を付与してそれ以外のdotボタンに付いている「ac_class」を省く。
      if (btns.length !== 0) {
        btns.forEach((btn) => {
          //console.log(btn);
          const btn_id = btn.id;
          //console.log(btn_id);

          if (btn_id === `btn${id2}`) {
            // クリックされた「dotボタン」にクラスを付ける。
            btn.classList.add(ac_class);

            // その部分に遷移するアニメーション処理。
            let num = Number(btn.dataset.id) - 1;

            if (num < 0) {
              num = 0;
            }

            // animation 移動量。
            const move = nav_dot.scrollLeft + distance * num;

            console.log('move');
            console.log(nav_dot.scrollLeft + distance * num);

            // アニメーション実行方法

            // web animation api

            // アニメーション実行。
            nav_dot.animate([{ transform: `translate(${move * -1}px,0)` }], {
              duration: 500,
              fill: 'forwards',
            });

            // 「web animation api」より動作が重い。
            // Velocity(nav_dot, { translateX: move * -1 }, { duration: 500 });
            // Velocity(nav_dot, { translate: move * -1 }, { duration: 500 });

            // iOS Safariでは正常に動かず。
            //btn.scrollIntoView({ behavior: 'smooth' });

            // / アニメーション実行方法

            // アニメーションを実行したので「true」
            move_flag = true;
          } else {
            btn.classList.remove(ac_class);
          }
        });
      }

      // ページ数が多い時から少ない時に可変して最後のページ数より現在地が超えていた時。
      // 移動アニメーションが実行されない場合で「dot」が表示されていなかった場合の回避処理。
      if (!move_flag) {
        nav_dot.animate([{ transform: `translate(${0}px,0)` }], {
          duration: 500,
          fill: 'forwards',
        });
      }
    };

    // 「dot」ボタンを押した時に実行する関数。
    const onDotBtn = (e) => {
      if (e instanceof Event) {
        // クリックされた「dotボタン」
        const clicked_btn = e.currentTarget;

        // クリックされた「dotボタン」のID
        // 例「btn1」
        /*
        const clicked_btn_id_str = clicked_btn.id;
        console.log(clicked_btn_id_str);

        const clicked_btn_id = Number(clicked_btn_id_str.split('btn')[1]);
        console.log('clicked_btn_id');
        console.log(clicked_btn_id);
        */

        // クリックされたdotの位置を取得。
        const btn_id = clicked_btn.dataset.id;
        console.log(btn_id);

        //現在地を再設定。
        pos.value = Number(btn_id);

        // 新たに表示するデータを切り出す為の処理。
        // 開始位置。
        //update(clicked_btn_id);
        update(btn_id);
      }
    };

    //「前へ」のボタンが押された時に実行する関数。
    const onPrevBtn = () => {
      let new_pos = pos.value - 1;

      if (new_pos < 0) {
        new_pos = 0;
      }

      pos.value = new_pos;

      //「dot」ボタンの表示を更新。
      update(new_pos);
    };

    //「次へ」のボタンが押された時に実行する関数。
    const onNextBtn = () => {
      let new_pos = pos.value + 1;

      const last = dots.value - 1;

      if (new_pos > last) {
        new_pos = last;
      }
      pos.value = new_pos;

      //「dot」ボタンの表示を更新。
      update(new_pos);
    };

    onMounted(() => {
      division_recalculation().then(() => {
        generatePagination();
        listsUpdata();
        // 初期化処理。
        // dotボタンを全て取得。
        const btns = btn_refs.value;

        // 初期化時の位置に該当するdotボタンにクラスを付ける。
        const init_btn = btns[pos_init];
        /*
        console.log('init_btn');
        console.log(init_btn);
        */

        if (init_btn !== undefined) {
          init_btn.classList.add(ac_class);
        }

        triBtnUpdate();
        // /初期化処理。
      });
    });

    onUnmounted(() => {});

    // 高さを取得し計算して分割する検証。

    return {
      datalist,
      lists,
      nav_ref,
      nav_dot_ref,
      prevBtn_ref,
      nextBtn_ref,
      btn_refs,
      page_number_ref,
      measurement_ref,
      pos,
      dots,
      onDotBtn,
      onPrevBtn,
      onNextBtn,
      nav_off,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/pagination/pagination_layout.scss';
@import '@/assets/style/pagination/pagination_btns.scss';
@import '@/assets/style/pagination/pagination_navigation.scss';

@import '@/assets/style/pagination/contents.scss';
@import '@/assets/style/pagination/pagination_contents.scss';
</style>
