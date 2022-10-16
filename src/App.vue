<template>
  <div id="wrapper">
    <!--<div>{{ message }}</div> -->
    <div v-html="message"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
export default {
  name: 'App',
  setup() {
    let message = ref('');

    const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1';
    const QUERYSTRING = '?token=token123';

    onMounted(async () => {
      //const response = await fetch(ROOT_URL);
      const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
      console.log(response);
      const arr = await response.data;

      /*
      for (const a in arr) {
        //console.log(arr[a]);
        message.value += `<p>${arr[a].title}</p>`;
      }
      */
      for (const a of arr) {
        //console.log(a);
        message.value += `<p>${a.title}</p>`;
      }
      /*
      arr.forEach((val) => {
        console.log(val);
        message.value += `<p>${val.title}</p>`;
      });
      */
    });

    return { message };
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
