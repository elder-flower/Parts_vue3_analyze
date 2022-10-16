<template>
  <div id="wrapper">
    <form>
      <label for="name">氏名：</label>
      <input type="text" id="name" v-model="name" />
    </form>
    <div v-once>はじめまして、{{ name }} さん。</div>
    <div>はじめまして、{{ name }} さん。</div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    const name = ref('匿名');

    return { name };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
select,
input {
  margin: 1em 1em 1em 1em;
}
</style>
