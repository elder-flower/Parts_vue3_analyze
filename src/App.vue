<template>
  <div id="wrapper">
    <select v-model="attr">
      <option>height</option>
      <option>width</option>
    </select>
    <input type="text" size="5" v-model="size" /><br />
    <img src="https://wings.msn.to/image/wings.jpg" v-bind:[attr]="size" />
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    const attr = ref('width');
    const size = ref(100);

    return { attr, size };
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
