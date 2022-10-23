<template>
  <div id="wrapper">
    <NumberInput request_data="menuData"></NumberInput>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import NumberInput from './components/NumberInput.vue';
export default {
  name: 'App',
  components: { NumberInput },

  setup() {
    let menuData = ref('');

    const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1';
    const QUERYSTRING = '?token=token123';

    const get = async () => {
      //const response = await fetch(ROOT_URL);
      const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
      //console.log(response);
      const arr = await response.data;
      //console.log(arr);
      menuData.value = arr;
    };

    get();

    return { menuData };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
</style>
