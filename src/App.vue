<template>
  <div id="wrapper">
    <ul v-for="(value, key, i) in book">
      <li>{{ key }} ：{{ value }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
  name: 'App',
  setup() {
    const book = ref({
      isbn: '978-4-7981-5757-3',
      title: 'JavaScript逆引きレシピ',
      price: 2800,
    });

    return { book };
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
