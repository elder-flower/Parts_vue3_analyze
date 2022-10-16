<template>
  <div>こんにちは、{{ yourName }}さん！</div>
</template>

<script>
//import { ref } from 'vue';
export default {
  name: 'MyParent',
  props: ['yourName'],
  /*
  setup() {
    const name = ref('MyParent components');

    return { name };
  },
  */
};
</script>

<style scoped>
div {
  margin: 1em;
}
</style>
