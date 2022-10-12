<template>
  <p>{{ message }}</p>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const message = ref('皆さん、こんにちは！3');
    return { message };
  },
});
</script>

<style scoped>
p {
  margin: 20px;
  text-align: center;
}
</style>
