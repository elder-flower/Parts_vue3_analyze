<template>
  <div id="wrapper">
    <form>
      <div>お使いのOSは？</div>
      <label for="windows">Windows</label>
      <input type="checkbox" id="windows" value="Windows" v-model="os" />
      <label for="linux">Linux</label>
      <input type="checkbox" id="linux" value="Linux" v-model="os" />
      <label for="mac">macOS</label>
      <input type="checkbox" id="mac" value="macOS" v-model="os" />
    </form>
    <p>回答：{{ os_strs }}</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    const os = ref(['Windows', 'macOS']);
    const os_strs = computed(() => {
      const os_str = os.value.join(' , ');
      return os_str;
    });
    return { os, os_strs };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 50%;
}
input {
  margin: 1em 2em 1em 1em;
}
</style>
