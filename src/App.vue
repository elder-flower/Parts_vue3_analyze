<template>
  <div id="wrapper">
    <div v-bind:style="[color, size]">皆さん、こんにちは！</div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',

  setup() {
    const color = reactive({
      backgroundColor: 'Brown',
      color: 'White',
    });
    const size = reactive({
      fontSize: '1.5em',
    });

    return { color, size };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
select,
input {
  margin: 1em 1em 1em 1em;
}
</style>
