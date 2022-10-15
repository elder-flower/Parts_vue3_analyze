<template>
  <p>{{ localEmail }}</p>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    const email = ref('Y-Suzuki@example.com');
    const localEmail = computed(() => {
      return email.value.split('@')[0].toLowerCase();
    });
    return { email, localEmail };
  },
};
</script>

<style scoped>
div {
  margin: 20px;
  text-align: center;
}
</style>
