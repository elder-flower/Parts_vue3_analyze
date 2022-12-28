<template>
  <main>
    <ul class="nav_dot">
      <li v-for="j in dots" v-bind:key="j">
        <button
          v-bind:data-id="j - 1"
          v-on:click="onDotBtn"
          ref="btn_refs"
        ></button>
      </li>
    </ul>
    <section class="lists">
      <section v-for="i in lists.data" v-bind:key="i.id">
        list {{ i.id }}
      </section>
    </section>
  </main>
</template>

<script>
import { ref, reactive } from 'vue';
import Pagination from './components/Pagination.vue';

export default {
  name: 'App',
  //components: { Pagination },

  setup() {
    // 仮想受信したデータ。
    const data = [];

    const btn_refs = ref('');

    // 50個のダミーデータ。
    for (let i = 1; i < 51; i++) {
      data.push({ id: i, txt: `txt${i}` });
    }

    // 現在表示している「Pagination」の位置。
    const pos = ref(0);

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

    // 余りがある場合は、「dots」の数を1つ増やす。
    if (remainder !== 0) {
      dots = divisionNumber + 1;
    }

    // 受信したデータから表示するデータを切り出す為の処理。

    // 開始位置。
    let start = pos.value * displayNumber;

    // 終了位置。
    let end = start + displayNumber;

    // 受信したデータから表示するデータを切り出す。
    const init_lists = data.slice(start, end);

    // 表示されるデータの配列。リアクティブにする為、「eactive」でラッピング。
    let lists = reactive({
      data: init_lists,
    });

    // 「dots」ボタンを押した時の実行処理関数。
    const onDotBtn = (e) => {
      if (e instanceof Event) {
        const btn = e.currentTarget;

        console.log('btn_refs');
        console.log(btn_refs.value);

        const ac_class = 'active';
        const lis = btn_refs.value;

        lis.forEach((li) => {
          console.log(li);
          li.classList.remove(ac_class);
        });

        btn.classList.add(ac_class);

        // クリックされたdotの位置を取得。
        const btn_id = btn.dataset.id;
        //console.log(btn_id);

        pos.value = Number(btn_id);

        // 新たに表示するデータを切り出す為の処理。
        // 開始位置。
        start = pos.value * displayNumber;

        // 終了位置。
        end = start + displayNumber;

        // 表示されるデータの配列を更新。
        lists.data = data.slice(start, end);
      }
    };

    return { lists, dots, onDotBtn, btn_refs };
  },
};
</script>
<style lang="scss" scoped>
@import './assets/style/variables.scss';
@import './assets/style/reset_btn.scss';
@import './assets/style/base.scss';
@import './assets/style/pagination.scss';
</style>
