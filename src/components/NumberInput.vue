<template>
  <div>{{ data }}</div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'NumberInput',
  props: ['requestData'],

  setup(props) {
    const data = ref(props.requestData);
    console.log(data.value);

    return { data };
  },
};
</script>

<style scoped>
div {
  margin: 1em;
}
</style>
