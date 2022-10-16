<template>
  <div>こんにちは、{{ name }}！</div>
  <my-child />
</template>

<script>
import { ref } from 'vue';
import MyChild from './MyChild.vue';
export default {
  name: 'MyParent',
  components: { MyChild },
  setup() {
    const name = ref('MyParent components');

    return { name };
  },
};
</script>

<style scoped>
div {
  margin: 1em;
}
</style>
