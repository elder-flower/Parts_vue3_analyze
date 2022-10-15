<template>
  <div id="wrapper">
    <form>
      <label for="os">お使いのOSは？</label><br />
      <select id="os" v-model="os">
        <option value="">OSを選択してください</option>
        <option>Windows</option>
        <option>Linux</option>
        <option>macOS</option>
      </select>
    </form>
    <p>回答：{{ os }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const os = ref('');
    return { os };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 50%;
}
select {
  margin: 1em 1em 1em 1em;
}
</style>
