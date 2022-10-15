<template>
  <div>
    <label
      >num1：
      <input type="number" v-model="num1" />
    </label>
    <label
      >num2：
      <input type="number" v-model="num2" />
    </label>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import _ from 'lodash';
export default {
  name: 'App',
  setup(props, context) {
    const num1 = ref(0);
    const num2 = ref(0);
    console.log(num1.value + num2.value);

    watch(
      () => num1.value + num2.value,
      (newValue, oldValue) => {
        console.log('watch');
        console.log(num1.value + num2.value);
      },
      { deep: true }
    );

    return { num1, num2 };
  },
};
</script>

<style scoped>
div {
  margin: 50px;
}
</style>
