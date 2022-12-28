<template>
  <main>
    <div class="nav">
      <button class="triBtn leftBtn" v-on:click="onPrevBtn"></button>
      <ul class="nav_dot">
        <li v-for="j in dots" v-bind:key="j">
          <button
            v-bind:data-id="j - 1"
            v-on:click="onDotBtn"
            ref="btn_refs"
            v-bind:id="`btn${j - 1}`"
          ></button>
        </li>
      </ul>
      <button class="triBtn rightBtn" v-on:click="onNextBtn"></button>
    </div>

    <section class="lists">
      <section v-for="i in lists.data" v-bind:key="i.id">
        list {{ i.id }}
      </section>
    </section>
  </main>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import Pagination from './components/Pagination.vue';

export default {
  name: 'App',
  //components: { Pagination },

  setup() {
    // 「dotボタン」に付けるクラス名。
    const ac_class = 'dot_active';

    //「dotボタン」要素を取得する為のref要素。
    const btn_refs = ref('');

    // 仮想受信したデータ。
    const data = [];

    // 50個のダミーデータ。
    for (let i = 1; i < 51; i++) {
      data.push({ id: i, txt: `txt${i}` });
    }

    // 初期化時の位置を指定する変数。
    const pos_init = 0;

    // 現在表示している「Pagination」の位置。
    const pos = ref(pos_init);

    // 「Pagination」の総数。
    const totalNumber = data.length;

    // 一度に表示する 「Pagination」の数。
    const displayNumber = 9;

    // 分割数を割り出す。
    let divisionNumber = Math.floor(totalNumber / displayNumber);

    // 一度に表示する数から余りを算出。
    const remainder = totalNumber % displayNumber;

    // dot navigation の数を算出。
    let dots = divisionNumber;
    console.log(dots);

    // 余りがある場合は、「dots」の数を1つ増やす。
    if (remainder !== 0) {
      dots = divisionNumber + 1;
    }

    // 受信したデータから表示するデータを切り出す為の処理。

    // 表示されるデータの配列。リアクティブにする為、「eactive」でラッピング。
    let lists = reactive({
      data: [],
    });

    // 表示するデータを更新する関数。
    const listsUpdata = () => {
      const start = pos.value * displayNumber;

      // 終了位置。
      const end = start + displayNumber;

      // 表示されるデータの配列を更新。
      lists.data = data.slice(start, end);
    };

    listsUpdata();

    onMounted(() => {
      //console.log('Component is onMounted!');

      // dotボタンを全て取得。
      const btns = btn_refs.value;

      // 初期化時の位置に該当するdotボタンにクラスを付ける。
      const init_btn = btns[pos_init];
      init_btn.classList.add(ac_class);

      /*
      その部分に繊維する。
      var element = document.getElementById('btn4');
      element.scrollIntoView({ behavior: 'smooth' });
      */
    });

    const btnsUpdata = (id = 0) => {
      // dotボタンを全て取得。
      const btns = btn_refs.value;

      /*
        console.log('btn_refs');
        console.log(btn_refs.value);
      */

      // dotボタンに付いている「ac_class」を省く。
      btns.forEach((btn) => {
        //console.log(btn);
        const btn_id = btn.id;

        if (btn_id === id) {
          // クリックされた「dotボタン」にクラスを付ける。
          btn.classList.add(ac_class);

          // その部分に繊維する。
          btn.scrollIntoView({ behavior: 'smooth' });
        } else {
          btn.classList.remove(ac_class);
        }
      });
    };

    // 「dots」ボタンを押した時の実行処理関数。
    const onDotBtn = (e) => {
      if (e instanceof Event) {
        // クリックされた「dotボタン」
        const clicked_btn = e.currentTarget;

        // クリックされた「dotボタン」のID
        const clicked_btn_id = clicked_btn.id;

        btnsUpdata(clicked_btn_id);

        // クリックされたdotの位置を取得。
        const btn_id = clicked_btn.dataset.id;
        //console.log(btn_id);

        pos.value = Number(btn_id);

        // 新たに表示するデータを切り出す為の処理。
        // 開始位置。
        listsUpdata();
      }
    };

    const onPrevBtn = () => {
      let new_pos = pos.value - 1;

      if (new_pos < 0) {
        new_pos = 0;
      }

      pos.value = new_pos;

      const btn_id = `btn${new_pos}`;
      btnsUpdata(btn_id);

      listsUpdata();
    };

    const onNextBtn = () => {
      let new_pos = pos.value + 1;

      const last = dots - 1;

      if (new_pos > last) {
        new_pos = last;
      }
      pos.value = new_pos;

      const btn_id = `btn${new_pos}`;
      btnsUpdata(btn_id);

      listsUpdata();
    };

    return { lists, dots, onDotBtn, btn_refs, onPrevBtn, onNextBtn };
  },
};
</script>
<style lang="scss" scoped>
@import './assets/style/variables.scss';
@import './assets/style/reset_btn.scss';
@import './assets/style/base.scss';
@import './assets/style/pagination.scss';
</style>
