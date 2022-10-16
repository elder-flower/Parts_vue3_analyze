<template>
  <div id="wrapper">
    <input type="button" value="結果表示" v-on:click.once="onclick" />
    <p>今日の運勢は{{ result }}点です。</p>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',

  setup() {
    const result = ref('－');
    const onclick = () => {
      result.value = Math.floor(Math.random() * 100) + 1;
    };

    return { result, onclick };
  },
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
