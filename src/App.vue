<template>
  <div id="wrapper">
    <div>{{ message }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
  name: 'App',
  setup() {
    let message = ref('');

    const ROOT_URL = 'https://qiita.com/api/v2/tags/react/items?page=2';

    onMounted(async () => {
      const result = await fetch(ROOT_URL);
      const jsonData = await result.json();

      message.value = jsonData[0].rendered_body;
    });

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
input {
  margin: 1em 1em 1em 1em;
}
</style>
