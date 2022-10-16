<template>
  <div id="wrapper">
    <form>
      <label for="name">氏名：</label>
      <input type="text" id="name" v-model.lazy="myName" />
    </form>
    <div>こんにちは、{{ myName }} さん！</div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    let myName = ref('匿名');
    return { myName };
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
