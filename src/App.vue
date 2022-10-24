<template>
  <div id="wrapper">
    <NumberInput v-bind:data="menuData"></NumberInput>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, reactive } from 'vue';
import NumberInput from './components/NumberInput.vue';

//https://www.google.com/search?q=firefox+webkit-inner-spin-button&lr=lang_ja&sa=X&ved=2ahUKEwjQjdT3_fX6AhX1gVYBHS-pAs4QuAF6BAgIEAE&biw=938&bih=793&dpr=2

// https://qiita.com/mrpero/items/c562cf9c2493bbbfe431

export default {
  name: 'App',
  components: { NumberInput },

  setup() {
    let menuData = ref([
      {
        title: '',
        token: '',
      },
    ]);

    //console.log(menuData);

    const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1';
    const QUERYSTRING = '?token=token123';

    const get = async () => {
      //const response = await fetch(ROOT_URL);
      const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
      //console.log(response);
      const arr = await response.data;

      menuData.value = arr;
      console.log(menuData);
    };

    get();

    return { menuData };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
