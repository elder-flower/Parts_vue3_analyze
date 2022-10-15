<template>
  <p>
    <a target="_blank" v-bind:href="url"
      >Vue Composition APIで$nextTick()を使う方法</a
    >
  </p>
  <p>
    <a target="_blank" v-bind:href="url2">【Vue.js】 DOMを直接操作 $el $ref</a>
  </p>
  <p ref="elem">{{ message }}</p>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
export default {
  name: 'App',
  setup(props, context) {
    const url = ref(
      'https://qiita.com/engineerYodaka/items/48ba7b7a560e75dcc447'
    );
    const url2 = ref('https://qiita.com/smkhkc/items/fefe0c6060978846a2b4');

    const elem = ref(null);

    let message = ref('こんにちは、世界！');

    onMounted(() => {
      message.value = 'はじめまして、Vue.js！';

      console.log(elem._value.textContent.includes(message.value));

      nextTick(() => {
        console.log(elem._value.textContent.includes(message.value));
      });
    });

    return { url, url2, elem, message };
  },
};
</script>

<style scoped>
p {
  margin: 20px;
  text-align: center;
}
</style>
