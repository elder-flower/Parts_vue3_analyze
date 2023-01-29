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
      <!-- 書き換える場所 -->
      <section v-for="i in lists.data" v-bind:key="i.id">
        <a class="list">
          list {{ i.id }} {{ i.txt }}<br />{{ i.txt2 }}<br />{{ i.txt3 }}</a
        >
      </section>
      <!-- 書き換える場所 -->
    </section>

    <div class="page_number" ref="page_number_ref" v-show="nav_off">
      {{ pos + 1 }} ページ / ページ数 : {{ dots }} / ページ毎の表示数 :
      {{ displayNumber }} / 総数 :
      {{ datalist.data.length }}
    </div>

    <section id="measurement" ref="measurement_ref">
      <section v-for="i in datalist.data" v-bind:key="i.id">
        <a class="measurement_list">
          list {{ i.id }} {{ i.txt }}<br />{{ i.txt2 }}<br />{{ i.txt3 }}</a
        >
      </section>
    </section>
  </div>
</template>
<script>
import {
  ref,
  reactive,
  watch,
  watchEffect,
  onBeforeUpdate,
  onBeforeMount,
  onMounted,
  onUnmounted,
} from 'vue';

export default {
  name: 'PagiNation',
  props: ['datalist', 'start_pos'],
  //emits: [''],
  setup(props) {
    const datalist = reactive({ data: undefined });
    datalist.data = props.datalist;

    /*
    console.log('datalist.data ');
    console.log(datalist.data);
    */

    // Pagination 生成処理。
    // ナビゲーションの表示切り替え。
    const nav_off = ref(true);

    if (datalist.data.length === 0 || datalist.data == undefined) {
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

    // 一度に表示する 「Pagination」の数。
    const displayNumber = ref(props.num_of_display);

    // 分割数。
    let divisionNumber = ref(0);

    // 「Pagination」の総数。
    let totalNumber = ref(0);

    // 高さを取得し計算する処理。
    // 「nav」要素の高さを取得する用。
    const nav_ref = ref('');

    // 「footer」の高さ。
    const page_number_ref = ref('');

    // 計測用のラッパー要素を取得。
    const measurement_ref = ref('');

    //「dot」ボタン要素を取得する為のref要素。
    const btn_refs = ref('');

    //「dot」ボタンのラッパー要素を取得する為のref要素。
    const nav_dot_ref = ref('');

    const prevBtn_ref = ref('');

    const nextBtn_ref = ref('');

    // 各paginationの子要素の高さの値を入れる変数。
    let list_elements_height = [];

    // 各ページの表示数を入れる配列。
    let numbers_of_display_contents = [];

    // 高さを取得し計算して分割する関数。
    const division_recalculation = async () => {
      console.log('division_recalculation');
      const doc = document;
      if (measurement_ref.value !== '') {
        const measurement_elem = measurement_ref.value;
        const lists = doc.getElementsByClassName('measurement_list');
        list_elements_height = [];

        measurement_elem.setAttribute('style', 'display:flex');

        for (let aa = 0; aa < lists.length; aa++) {
          list_elements_height.push(lists[aa].clientHeight);
        }
        measurement_elem.setAttribute('style', 'display:none');

        //console.log(lists);
        console.log(list_elements_height);
      }

      // ブラウザの表示高さからpaginationの表示数を割り出す処理。
      if (nav_ref.value !== '' && page_number_ref.value !== '') {
        numbers_of_display_contents = [];
        const html = doc.documentElement;
        const nav_area = nav_ref.value;
        const page_number_area = page_number_ref.value;

        const html_height = html.clientHeight;
        const nav_area_height = nav_area.clientHeight;
        const page_number_area_height = page_number_area.clientHeight;

        /*
        console.log(html_height);
        console.log(nav_area_height);
        console.log(pagination_area_height);
        console.log(page_number_area_height);
        */
        const pagination_max_height =
          html_height - nav_area_height - page_number_area_height;

        /*
        console.log('pagination_max_height');
        console.log(pagination_max_height);
        */

        let index = 0;

        //「offset」を取らないとレイアウト的に少しずれるので防止用。
        const offset = 50;

        while (index < list_elements_height.length) {
          let content_height = 0;

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
          numbers_of_display_contents.push(index);
        }

        console.log('numbers_of_display_contents');
        console.log(numbers_of_display_contents);
      }
    };

    // pagination生成の為の基本的パラメータを設定。
    const generatePagination = () => {
      totalNumber.value = datalist.data.length;

      // 分割数を割り出す。
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

      // データ切り出し開始位置。
      let start_index = 0;

      // データ切り出し開終了位置。
      let end_index = 0;

      let prev_pos = ref(pos.value - 1);

      /*
      console.log('pos.value');
      console.log(pos.value);
      console.log('prev_pos');
      console.log(prev_pos.value);
      */

      if (prev_pos.value < 0) {
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

        start_index = numbers_of_display_contents[prev_pos.value];
        end_index = numbers_of_display_contents[pos.value];
      }

      console.log('index');
      console.log(start_index);
      console.log(end_index);

      // 表示されるデータの配列を更新。
      lists.data = datalist.data.slice(start_index, end_index);
      //console.log(lists.data);
    };

    //「triBtn」の表示状態を更新する。
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

      if (prevBtn_ref.value !== '') {
        if (pos.value === 0) {
          prevBtn.classList.add(inactive_class);
        } else {
          prevBtn.classList.remove(inactive_class);
        }
      }

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

    const update = () => {
      division_recalculation().then(() => {
        generatePagination();
        listsUpdata();
        triBtnUpdate();
      });
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
      // dotボタンを全て取得。
      const btns = btn_refs.value;

      // アニメーション処理のために「dot」ボタンのラッパー要素を取得。
      const nav_dot = nav_dot_ref.value;
      //console.log(nav_dot.scrollWidth);

      // アニメーション移動距離。
      let distance = Number(nav_dot.scrollWidth) / dots.value;

      // dotボタンに付いている「ac_class」を省く。
      btns.forEach((btn) => {
        //console.log(btn);
        const btn_id = btn.id;

        if (btn_id === id) {
          // クリックされた「dotボタン」にクラスを付ける。
          btn.classList.add(ac_class);

          // その部分に遷移する。
          let num = Number(btn.dataset.id) - 1;

          if (num < 0) {
            num = 0;
          }

          // animation 移動量。
          const move = nav_dot.scrollLeft + distance * num;

          /*
          console.log('move');
          console.log(nav_dot.scrollLeft + distance * num);
          */
          // アニメーション実行方法

          // web animation api

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
        } else {
          btn.classList.remove(ac_class);
        }
      });
    };

    // 「dot」ボタンを押した時に実行する関数。
    const onDotBtn = (e) => {
      if (e instanceof Event) {
        // クリックされた「dotボタン」
        const clicked_btn = e.currentTarget;

        // クリックされた「dotボタン」のID
        const clicked_btn_id = clicked_btn.id;

        btnsUpdate(clicked_btn_id);

        // クリックされたdotの位置を取得。
        const btn_id = clicked_btn.dataset.id;
        //console.log(btn_id);

        pos.value = Number(btn_id);

        // 新たに表示するデータを切り出す為の処理。
        // 開始位置。
        update();
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
      const btn_id = `btn${new_pos}`;
      btnsUpdate(btn_id);

      update();
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
      const btn_id = `btn${new_pos}`;
      btnsUpdate(btn_id);

      update();
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
        init_btn.classList.add(ac_class);

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
      displayNumber,
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
