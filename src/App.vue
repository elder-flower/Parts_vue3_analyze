<template>
  <div id="wrapper">
    <!-- <p>{{ message }}</p> -->
    <p v-html="message"></p>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    const message = ref(`<h3>WINGSプロジェクト</h3>
      <img src="https://www.web-deli.com/image/linkbanner_l.gif" alt="ロゴ" />`);

    return { message };
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
