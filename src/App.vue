<template>
  <div>
    <p>
      <a
        target="_blank"
        href="https://qiita.com/doz13189/items/d09cfc6e1ff38621c2cc"
        >Vue 3 の Composition API における watch vs watchEffect</a
      >
    </p>
    <label
      >名前：
      <input type="text" v-model="author.name" />
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
      age: '',
    });

    /*
    「watch」は正常に動作しない。
    watch('author.name', (newValue, oldValue) => {
      console.log('newValue');
      console.log(newValue.name);
      console.log('oldValue');
      console.log(oldValue.name);
    });
    */

    watch(
      author,
      (newValue, oldValue) => {
        console.log('newValue');
        console.log(newValue.name);
        console.log('oldValue');
        console.log(oldValue.name);
      },
      { deep: true }
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
