<template>
  <form>
    <label for="name">氏名：</label>
    <input type="text" id="name" v-model="myName" />
  </form>
  <div>こんにちは、{{ myName }} さん！</div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const myName = ref('');

    return { myName };
  },
};
</script>

<style scoped>
form {
  margin: 50px auto;
  width: 90%;
}
div {
  margin: 50px;
  text-align: center;
}
</style>
