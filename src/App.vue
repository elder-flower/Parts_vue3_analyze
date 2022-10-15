<template>
  <div>
    <label
      >名前：
      <input type="text" v-model="author.name" />
    </label>
    <br />
    <label
      >年齢：
      <input type="number" v-model="author.age" />
    </label>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import _ from 'lodash';
export default {
  name: 'App',
  setup(props, context) {
    const author = ref({
      name: '匿名',
      age: '20',
    });

    watch(
      author,
      (newValue, oldValue) => {
        console.log('newValue');
        console.log(newValue.name);
        console.log(newValue.age);
        console.log('oldValue');
        console.log(oldValue.name);
        console.log(oldValue.age);
      },
      { deep: true },
      { immediate: true }
    );

    return { author };
  },
};
</script>

<style scoped>
div {
  margin: 50px;
}
</style>
