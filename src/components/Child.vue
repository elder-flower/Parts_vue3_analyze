<template>
  <div v-on:click="onSelect($event)">{{ type }}</div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'C-hild',
  props: ['menu'],
  setup(props, context) {
    const type = ref(props.menu?.data?.type);
    const onSelect = (arg) => {
      console.log('child onSelect');
      console.log(arg);
      context.emit('select');
    };

    return { type, onSelect };
  },
};
</script>

<style scoped>
div {
  width: 100%;
  padding: 2em;
  margin: 0;
  pointer-events: auto;
}
</style>
