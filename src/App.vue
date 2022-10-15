<template>
  <div>
    <p>
      <a
        target="_blank"
        href="https://qiita.com/doz13189/items/d09cfc6e1ff38621c2cc"
        >Vue 3 の Composition API における watch vs watchEffect</a
      >
    </p>
    <div>
      <label
        >名前：
        <input type="text" v-model="name" />
      </label>
      <br />
      <label
        >年齢：
        <input type="number" v-model="age" />
      </label>
      <p>入力された値：{{ name }}</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import _ from 'lodash';
export default {
  name: 'App',
  setup(props, context) {
    const name = ref('匿名');
    const age = ref(20);

    watch([name, age], (newValue, oldValue) => {
      console.log('newValue');
      console.log(newValue);
      console.log('oldValue');
      console.log(oldValue);
    });

    return { name, age };
  },
};
</script>

<style scoped>
div {
  margin: 50px;
}
</style>
