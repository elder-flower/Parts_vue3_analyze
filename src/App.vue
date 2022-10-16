<template>
  <div id="wrapper">
    <form>
      <label for="temperature">サウナの温度：</label>
      <input
        type="text"
        id="temperature"
        v-model.number="temperature"
        v-on:change="onchange"
      />
      <p>{{ temperature }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    let temperature = ref('');

    const onchange = () => {
      console.log(temperature.value.toFixed(10));
    };

    return { temperature, onchange };
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
