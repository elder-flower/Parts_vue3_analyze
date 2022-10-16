<template>
  <div id="wrapper">
    <template v-for="s in songs" v-bind:key="s.title">
      <header>{{ s.title }}</header>
      <div>{{ s.lyrics }}</div>
      <footer>{{ s.composer }} 作曲</footer>
    </template>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
  name: 'App',
  setup() {
    const songs = ref([
      {
        title: '赤とんぼ',
        lyrics: '夕焼け小焼けの赤とんぼ...',
        composer: '山田耕作',
      },
      {
        title: '荒城の月',
        lyrics: '春高楼の花の宴 巡る盃影さして...',
        composer: '瀧廉太郎',
      },
      {
        title: 'どんぐりころころ',
        lyrics: 'どんぐりころころ どんぶりこ...',
        composer: '梁田貞',
      },
      {
        title: '七つの子',
        lyrics: '烏 なぜ啼くの 烏は山に...',
        composer: '本居長世',
      },
    ]);

    return { songs };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
th,
td {
  padding: 1em 1em 1em 1em;
}
</style>
