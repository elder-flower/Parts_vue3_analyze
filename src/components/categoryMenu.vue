<template>
  <main id="main">
    <Pagination
      v-bind:datalist="data"
      v-bind:start_pos="start_position"
      v-bind:num_of_display="number_of_display_contents"
    >
      <template v-slot:default="slotProp">
        <section v-for="i in slotProp.list" v-bind:key="i.id">
          <a class="list"> list {{ i.id }} {{ i.txt }} </a>
        </section>
      </template></Pagination
    >
  </main>
</template>

<script>
//import Velocity from 'velocity-animate';
import { ref } from 'vue';
import Pagination from './Pagination.vue';

export default {
  name: 'categoryMenu',
  components: { Pagination },

  setup() {
    // 「pagination」の基本設定。

    // 初期化時に表示するページ位置。
    const start_position = 0;

    // 1ページに表示するコンテンツ数。
    let number_of_display_contents = ref(7);

    // /「pagination」の基本設定。
    // 仮想受信したデータ生成処理。

    // 仮想受信したデータ総数。
    let totalNumber = 21;

    // 仮想受信したデータ。
    let data = ref('[]');

    const data_generate = () => {
      const data2 = [];
      // 50個のダミーデータ。
      for (let i = 1; i < totalNumber; i++) {
        data2.push({ id: i, txt: `txt${i}` });
      }

      data.value = data2;
    };

    const data_generate2 = () => {
      number_of_display_contents.value = 4;
      totalNumber = 18;
      console.log('data_generate2');
      const data2 = [];
      // 50個のダミーデータ。
      for (let i = 1; i < totalNumber; i++) {
        data2.push({ id: i, txt: `txt:${i}:a` });
      }
      data.value = data2;
    };

    data_generate();

    setTimeout(data_generate2, 2000);

    // / 仮想受信したデータ生成処理。

    return { data, start_position, number_of_display_contents };
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/pagination/contents.scss';
@import '@/assets/style/pagination/pagination_contents.scss';
</style>
