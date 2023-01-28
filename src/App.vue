<template>
  <main id="main">
    <Pagination v-bind:datalist="data.list" v-bind:start_pos="start_position">
    </Pagination>
  </main>
</template>

<script>
import { ref, reactive, watchEffect } from 'vue';
import Pagination from './components/Pagination.vue';

export default {
  name: 'App',
  components: { Pagination },

  setup() {
    // 「pagination」の基本設定。

    // 初期化時に表示するページ位置。
    const start_position = 0;

    // /「pagination」の基本設定。
    // 仮想受信したデータ生成処理。

    // 仮想受信したデータ総数。
    let totalNumber = 21;

    // 仮想受信したデータ。
    let data = reactive({
      list: [],
    });

    const data_generate = () => {
      const data2 = [];
      // 50個のダミーデータ。
      for (let i = 1; i < totalNumber; i++) {
        data2.push({ id: i, txt: `txt${i}` });
      }

      data.list = data2;
    };

    const data_generate2 = () => {
      totalNumber = 18;
      console.log('data_generate2');
      const data2 = [];
      // 50個のダミーデータ。
      for (let i = 1; i < totalNumber; i++) {
        data2.push({
          id: i,
          txt: `txt:${i}`,
          txt2: `aaaaaaaaaaaaaaaaaa`,
          txt3: `bbbbbbbbbbbbbbbbbbbbbbb`,
        });
      }
      data.list = data2;
    };

    data_generate();

    //setTimeout(data_generate2, 2000);

    // / 仮想受信したデータ生成処理。

    return { data, start_position };
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/pagination/contents.scss';
@import '@/assets/style/pagination/pagination_contents.scss';
</style>
