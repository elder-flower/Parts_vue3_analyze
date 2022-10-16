<template>
  <div>こんにちは、{{ name }}！</div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'MyChild',
  setup() {
    const name = ref('MyChild components');

    return { name };
  },
};
</script>

<style scoped>
div {
  margin: 1em;
}
</style>
