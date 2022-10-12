<template>
  <p>{{ localEmail }}</p>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  setup() {
    const email = ref('Y-Suzuki@example.com');
    //console.log(email);
    const localEmail = computed(() => {
      return email.value.split('@')[0].toLowerCase();
    });
    return { email, localEmail };
  },
});
</script>

<style scoped>
p {
  margin: 20px;
  text-align: center;
}
</style>
