<template>
  <p><input type="button" value="クリック" v-bind:disabled="flag" /></p>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const flag = ref(true);
    return { flag };
  },
});
</script>

<style scoped>
p {
  margin: 20px;
  text-align: center;
}
</style>
