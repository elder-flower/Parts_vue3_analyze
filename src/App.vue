<template>
  <div id="wrapper">
    <div id="main" v-on:contextmenu.prevent>
      この領域では、コンテキストメニューは表示されません。
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',
  /*
  setup() {
    const message = ref('皆さん、こんにちは！');

    return { message };
  },
  */
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
#main {
  padding: 100px;
  background: #000;
}
</style>
