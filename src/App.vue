<template>
  <div>
    <p><a target="_blank" v-bind:href="url">ライフサイクルフック</a></p>
    <p>
      <a target="_blank" v-bind:href="url2"
        >Vue.js(v3)のライフサイクルを確認する！(Composition API)</a
      >
    </p>
  </div>
</template>

<script>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';
export default {
  name: 'App',
  setup() {
    onBeforeMount(() => {
      console.log('Component is onBeforeMount!');
    });
    onMounted(() => {
      console.log('Component is mounted!');
    });
    onBeforeUpdate(() => {
      console.log('Component is onBeforeUpdate!');
    });
    onUpdated(() => {
      console.log('Component is monUpdated!');
    });
    onBeforeUnmount(() => {
      console.log('Component is onBeforeUnmount!');
    });
    onUnmounted(() => {
      console.log('Component is onUnmounted!');
    });

    const url = ref(
      'https://v3.ja.vuejs.org/guide/composition-api-lifecycle-hooks.html'
    );
    const url2 = ref('https://codelikes.com/vue-lifecycle-composition/');
    return { url, url2 };
  },
};
</script>

<style scoped>
div {
  margin: 20px;
  text-align: center;
}
</style>
