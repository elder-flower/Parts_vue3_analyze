<template>
  <div>
    <img v-bind:src="path" v-on:error="onerror" />
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup(props, context) {
    let path = ref('./images/wings.jpg');

    onerror = () => {
      path.value = './images/noimage.jpg';
    };
    return { path, onerror };
  },
};
</script>

<style scoped></style>
