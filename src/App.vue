<template>
  <main id="main">
    <Pagination v-bind:datalist="data.list" v-bind:start_pos="start_position">
      <template v-slot:default="slotProp">
        <!-- 書き換える場所 -->
        <section v-for="i in slotProp.list" v-bind:key="i.id">
          <a class="list">
            list {{ i.id }} {{ i.txt }}<br />{{ i.txt2 }}<br />{{ i.txt3 }}</a
          >
        </section>
        <!-- 書き換える場所 -->
      </template>
      <!--  計測用のラッパー要素 -->
      <template v-slot:measurement="slotProp">
        <!--「Pagination」に渡された全データを生成する処理。-->
        <section v-for="i in slotProp.list" v-bind:key="i.id">
          <a class="measurement_list">
            list {{ i.id }} {{ i.txt }}<br />{{ i.txt2 }}<br />{{ i.txt3 }}</a
          >
        </section>
      </template>
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

      // ダミーデータ。
      for (let i = 1; i < totalNumber; i++) {
        data2.push({ id: i, txt: `txt${i}` });
      }

      data.list = data2;
    };

    // 改行で要素の高さを変更したダミーデータ。
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
