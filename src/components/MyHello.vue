<template>
  <div>こんにちは、{{ name }}！</div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'MyHello',
  setup() {
    const name = ref('Vue2.js');

    return { name };
  },
};
</script>

<style scoped></style>
