<template>
  <p>{{ email.split('@')[0].toLowerCase() }}</p>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const email = ref('Y-Suzuki@example.com');
    return { email };
  },
});
</script>

<style scoped>
p {
  margin: 20px;
  text-align: center;
}
</style>
