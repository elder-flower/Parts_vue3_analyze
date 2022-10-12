<template>
  <p><a v-bind:href="url">WINGSプロジェクト</a></p>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const url = ref('https://wings.msn.to/');
    return { url };
  },
});
</script>

<style scoped>
p {
  margin: 20px;
  text-align: center;
}
</style>
