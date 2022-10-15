<template>
  <div id="wrapper">
    <form>
      <div>お使いのOSは？</div>
      <select v-model="os" multiple size="3">
        <option>Windows</option>
        <option>Linux</option>
        <option>macOS</option>
      </select>
    </form>
    <p>回答：{{ os_strs }}</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    const os = ref(['macOS']);
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
select {
  margin: 1em 1em 1em 1em;
}
</style>
