<template>
  <div id="wrapper">
    <span v-for="i in 10" v-bind:key="i">{{ i * 2 }}　</span>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
  name: 'App',
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
