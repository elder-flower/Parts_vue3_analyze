<template>
  <p>現在時刻：{{ current.toLocaleString() }}</p>
</template>

<script>
import { ref, onBeforeUnmount, onRenderTracked, onRenderTriggered } from 'vue';
export default {
  name: 'App',
  setup() {
    let current = ref(new Date());

    const win = window;
    const timer = win.setInterval(() => {
      current.value = new Date();
    }, 1000);

    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    onRenderTracked((e) => {
      console.log('onRenderTracked');
      console.log(e);
    });

    onRenderTriggered((e) => {
      console.log('onRenderTriggered');
      console.log(e);
    });

    return { current };
  },
};
</script>

<style scoped>
div {
  margin: 20px;
  text-align: center;
}
</style>
