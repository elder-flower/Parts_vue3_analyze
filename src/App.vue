<template>
  <div>
    <button v-on:click="onclick('ようこそ！')">クリック</button>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    onclick = (message) => {
      console.log(message);
    };

    return { onclick };
  },
};
</script>

<style scoped>
div {
  margin: 50px;
}
</style>
