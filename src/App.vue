<template>
  <div id="wrapper">
    <form>
      <input type="button" value="変更" v-on:click="onclick" />
    </form>
    <ul>
      <li v-for="item in list" v-bind:key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    const list = ref(['赤パジャマ', '青パジャマ', '黄パジャマ']);
    const onclick = () => {
      //list.value[1] = '茶パジャマ';
      list.value.splice(1, 1, '茶パジャマ');
    };

    return { list, onclick };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
th,
td {
  padding: 1em 1em 1em 1em;
}
</style>
