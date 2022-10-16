<template>
  <div id="wrapper">
    <form>
      <label for="name">氏名：</label>
      <input type="text" id="name" v-on:keyup.ctrl.q="help" v-model="name" />
      <!-- <input type="text" v-on:keyup.ctrl.exact.q="help" v-model="name" /> -->
    </form>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',

  setup() {
    const name = ref('匿名');
    const help = () => {
      window.alert('氏名（漢字）を入力してください');
    };

    return { name, help };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
</style>
