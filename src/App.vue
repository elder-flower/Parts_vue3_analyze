<template>
  <div id="wrapper">
    <form>
      <label for="million">百万：</label>
      <input
        type="radio"
        id="million"
        v-model="unit"
        v-on:change="onchange"
        v-bind:value="{ name: '百万', size: 1000000 }"
      /><br />
      <label for="billion">十億：</label>
      <input
        type="radio"
        id="billion"
        v-model="unit"
        v-on:change="onchange"
        v-bind:value="{ name: '十億', size: 1000000000 }"
      /><br />
      <label for="trillion">一兆：</label>
      <input
        type="radio"
        id="trillion"
        v-model="unit"
        v-on:change="onchange"
        v-bind:value="{ name: '一兆', size: 1000000000000 }"
      />
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    const unit = ref({
      name: '',
      size: '',
    });
    const onchange = () => {
      console.log(`${unit.value.name}：${unit.value.size}`);
    };
    return { unit, onchange };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
input {
  margin: 1em 1em 1em 1em;
}
</style>
