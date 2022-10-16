<template>
  <div id="wrapper">
    <a v-bind:style="{ 'tap-highlight-color': 'Aqua' }" v-bind:href="url">
      {{ url }}
    </a>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',

  setup() {
    const url = ref('https://wings.msn.to/');
    return { url };
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
