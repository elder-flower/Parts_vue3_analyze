<template>
  <div class="pagination_wrapper">
    <div>
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

    <section class="lists" ref="touch_area_ref">
      <!-- 書き換える場所 -->
      <slot v-bind:list="lists.data"></slot>
      <!-- 書き換える場所 -->
    </section>

    <div class="page_number">
      {{ pos + 1 }} / ページ数 : {{ dots }} / ページ毎の表示数 :
      {{ displayNumber }} / 総数 :
      {{ datalist.data.length }}
    </div>
  </div>
</template>
<script>
import {
  ref,
  reactive,
  watchEffect,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
} from 'vue';

export default {
  name: 'PagiNation',
  props: ['datalist', 'start_pos', 'num_of_display'],
  //emits: [''],
  setup(props) {
    // 親から渡されたデータ。
    const datalist = reactive({ data: [] });
    datalist.data = props.datalist;

    // 「dotボタン」に付けるクラス名。
    const ac_class = 'dot_active';

    // タッチスクロール検出対象の要素取得。
    const touch_area_ref = ref('');

    //「dot」ボタン要素を取得する為のref要素。
    const btn_refs = ref('');

    //「dot」ボタンのラッパー要素を取得する為のref要素。
    const nav_dot_ref = ref('');

    const prevBtn_ref = ref('');

    const nextBtn_ref = ref('');

    // Pagination 生成処理。
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

    // 一度に表示する数から余りを算出。
    let remainder = ref(0);

    // 「Pagination」の総数。
    let totalNumber = ref(0);

    const generatePagination = () => {
      totalNumber.value = datalist.data.length;

      // 分割数を割り出す。
      divisionNumber.value = Math.floor(
        totalNumber.value / displayNumber.value
      );

      remainder.value = totalNumber.value % displayNumber.value;

      // 「dot」ボタンの数を算出。
      dots.value = divisionNumber.value;

      // 余りがある場合は、「dot」ボタンの数を1つ増やす。
      if (remainder.value !== 0) {
        dots.value = divisionNumber.value + 1;
      }
    };

    generatePagination();

    // 受信したデータから表示するデータを切り出す為の処理。

    // 表示されるデータの配列。リアクティブにする為、「reactive」でラッピング。
    let lists = reactive({
      data: [],
    });

    // 表示するデータを更新する関数。
    const listsUpdata = () => {
      console.log('listsUpdata');
      // データ切り出し開始位置。
      const start = pos.value * displayNumber.value;

      // データ切り出し開終了位置。
      const end = start + displayNumber.value;

      // 表示されるデータの配列を更新。
      lists.data = datalist.data.slice(start, end);
    };

    // 表示を更新。
    listsUpdata();

    //「triBtn」の表示状態を更新する。
    const triBtnUpdate = () => {
      console.log('triBtnUpdate');
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

      console.log('pos.value');
      console.log(pos.value);
      console.log('dots.value');
      console.log(dots.value);
    };

    // 動的に「datalist.data」が変更になった場合に変更に追従する処理。
    watchEffect(() => {
      datalist.data = props.datalist;
      displayNumber.value = props.num_of_display;

      // 端数がある場合、「空」Object で埋める。
      /*
      while (datalist.data.length % displayNumber !== 0) {
        datalist.data.push({});
      }
      */

      console.log('watchEffect');

      generatePagination();

      // 表示を更新。
      listsUpdata();
      triBtnUpdate();
    });

    // / 動的に「datalist.data」が変更になった場合に変更に追従する処理。

    // ナビゲーション関連の処理

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
        //listsUpdata();
        triBtnUpdate();
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

      //listsUpdata();
      triBtnUpdate();
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

      //listsUpdata();
      triBtnUpdate();
    };
    // / ナビゲーション関連の処理

    // タッチスクロールイベント関連処理。
    // タッチスクロールで「pagination」の切り替えを行う場合は「true」;
    const isScrollSnap = false;

    onBeforeUpdate(() => {
      // 横タッチスクロールした際に少しずれる為、完全固定させる為にhtml要素に「overflow-y:hidden」を付ける。
      const html = document.documentElement;

      if (isScrollSnap) {
        html.setAttribute('style', 'overflow-x: hidden;');
      } else {
        html.removeAttribute('style');
      }
    });

    // タッチスクロール検出処理
    // タッチスクロールした際の座標の履歴を格納する配列。
    let touch_scroll_log = [];

    //「touchmove」用の通常動作をキャンセルしてx座標を配列に追加する関数。
    const touchDownAction = (e) => {
      e.preventDefault();
      touch_scroll_log.push(e.touches[0].clientX);
      //console.log(touch_scroll_log);
    };
    // タッチスクロール検出時の実行関数。
    const touchScrollDetection = (e) => {
      e.preventDefault();

      const touchScrollDetectionMove = () => {
        //console.log('touchScrollDetectionMove');
        // この距離以上に横スクロールされたら、その時点で次のデータを表示。。
        const distance = 10;

        // 配列の一番最後のindex。
        const last = touch_scroll_log.length - 1;

        // 一番最初の座標。
        const first_scroll = touch_scroll_log[0];

        // 一番最後の座標。
        const last_scroll = touch_scroll_log[last];

        if (isNaN(last_scroll - first_scroll)) {
          return;
        }
        /*
        console.log('last_scroll - first_scroll');
        console.log(last_scroll - first_scroll);

        */

        // 右方向の場合は「true」
        let isRight = '';

        if (last_scroll - first_scroll > 0) {
          isRight = true;
        } else {
          isRight = false;
        }

        if (isRight) {
          if (last_scroll - first_scroll > distance) {
            // 閾値を超えた場合は、表示の切り替え処理。
            onPrevBtn();
          }
        } else {
          if (last_scroll - first_scroll < distance * -1) {
            // 閾値を超えた場合は、表示の切り替え処理。
            onNextBtn();
          }
        }

        // タッチスクロールした際の座標の履歴を初期化。
        touch_scroll_log = [];
      };

      touchScrollDetectionMove();
    };

    // /タッチスクロール検出処理
    onMounted(() => {
      //console.log('Component is onMounted!');

      // 初期化処理。
      // dotボタンを全て取得。
      const btns = btn_refs.value;

      // 初期化時の位置に該当するdotボタンにクラスを付ける。
      const init_btn = btns[pos_init];
      init_btn.classList.add(ac_class);

      triBtnUpdate();
      // /初期化処理。

      // 横タッチスクロール検出処理。
      // main要素にイベントリスナーを設定する。
      const touch_area = touch_area_ref.value;
      //console.log(touch_area);

      if (isScrollSnap) {
        touch_area.addEventListener('touchmove', touchDownAction, {
          passive: false,
        });
        touch_area.addEventListener('touchend', touchScrollDetection, {
          passive: false,
        });
      }

      // / 横タッチスクロール検出処理。
    });

    onUnmounted(() => {
      //console.log('Component is onUnmounted!');

      // 横タッチスクロール検出の解除処理。
      // main要素にイベントリスナーを設定する。
      const touch_area = touch_area_ref.value;
      //console.log(touch_area);

      if (isScrollSnap) {
        touch_area.removeEventListener('touchmove', touchDownAction, {
          passive: false,
        });
        touch_area.removeEventListener('touchend', touchScrollDetection, {
          passive: false,
        });
      }

      // / 横タッチスクロール検出の解除処理。
    });
    // /タッチスクロールイベント関連処理。

    return {
      datalist,
      lists,
      onDotBtn,
      btn_refs,
      onPrevBtn,
      onNextBtn,
      touch_area_ref,
      nav_dot_ref,
      prevBtn_ref,
      nextBtn_ref,
      pos,
      divisionNumber,
      dots,
      displayNumber,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/pagination/pagination_layout.scss';
@import '@/assets/style/pagination/pagination_btns.scss';
@import '@/assets/style/pagination/pagination_navigation.scss';
</style>
