<template>
  <div>
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

    const delayFunc = _.debounce(getUpper, 1000);

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
