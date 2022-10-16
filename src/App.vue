<template>
  <div id="wrapper">
    <form>
      <label for="memo">メモ：</label>
      <!-- ユーザの入力から空白を自動的に取り除きたいとき -->
      <input type="text" id="memo" v-model.trim="memo" v-on:change="onchange" />
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    let memo = ref('');

    const onchange = () => {
      console.log(`入力値は「${memo.value}」です。`);
    };

    return { memo, onchange };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
input {
  margin: 1em 1em 1em 1em;
}
</style>
