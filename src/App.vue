<template>
  <div id="wrapper">
    <p v-cloak>{{ message }}</p>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',

  setup() {
    const message = ref('皆さん、こんにちは！');

    return { message };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
[v-cloak] {
  display: none;
}
</style>
