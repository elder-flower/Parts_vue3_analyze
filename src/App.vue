<template>
  <div id="wrapper">
    <div v-bind:style="{ backgroundColor: 'Black', fontSize: '1.5em' }">
      <!-- <div :style="{ backgroundColor: 'Aqua', fontSize: '1.5em' }"></div> -->
      <!-- <div v-bind:style="{ 'background-color': 'Aqua', 'font-size': '1.5em' }"> -->
      皆さん、こんにちは！
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',
  /*
  setup() {
    const name = ref('匿名');

    return { name };
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
select,
input {
  margin: 1em 1em 1em 1em;
}
</style>
