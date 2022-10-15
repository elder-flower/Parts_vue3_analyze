<template>
  <div id="wrapper">
    <form>
      <label for="agree">同意する：</label>
      <input type="checkbox" id="agree" v-model="agree" />
      <!-- <input type="checkbox" id="agree" v-model="agree"
      true-value="yes" false-value="no" /> -->
    </form>
    <div>回答：{{ agree }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const agree = ref(true);

    return { agree };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 50%;
}
input {
  margin: 1em 0;
}
</style>
