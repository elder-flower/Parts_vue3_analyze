<template>
  <main id="main">
    <Pagination v-bind:datalist="data" />
  </main>
</template>

<script>
//import Velocity from 'velocity-animate';
import { ref } from 'vue';
import Pagination from './components/Pagination.vue';

export default {
  name: 'App',
  components: { Pagination },

  setup() {
    // 仮想受信したデータ生成処理。
    // 仮想受信したデータ。
    let data = ref('[]');

    const data_generate = () => {
      const data2 = [];
      // 50個のダミーデータ。
      for (let i = 1; i < 111; i++) {
        data2.push({ id: i, txt: `txt${i}` });
      }

      data.value = data2;
    };

    const data_generate2 = () => {
      console.log('data_generate2');
      const data2 = [];
      // 50個のダミーデータ。
      for (let i = 1; i < 111; i++) {
        data2.push({ id: i, txt: `txt:${i}:a` });
      }
      data.value = data2;
    };

    data_generate();

    setTimeout(data_generate2, 2000);

    // / 仮想受信したデータ生成処理。
    return { data };
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/pagination/contents.scss';
</style>
