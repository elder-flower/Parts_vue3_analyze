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
      <input type="text" v-model="name" />
    </label>
    <p>入力された値：{{ upperName }}</p>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import _ from 'lodash';
export default {
  name: 'App',
  setup(props, context) {
    const name = ref('');
    let upperName = ref('');

    const getUpper = () => {
      upperName.value = name.value.toUpperCase();
    };

    const delayFunc = _.debounce(getUpper, 200);

    watch(name, () => {
      delayFunc();
    });

    return { name, upperName };
  },
};
</script>

<style scoped>
div {
  margin: 50px;
}
</style>
