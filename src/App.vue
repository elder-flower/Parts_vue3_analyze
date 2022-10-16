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

    // リクエスト前の処理。
    axios.interceptors.request.use(
      (request) => {
        console.log(request.url);
        return request;
      },
      (error) => {
        console.log(error);
        //throw Error(error);
      }
    );

    // リクエスト後の処理。
    axios.interceptors.response.use(
      (response) => {
        // 2xx の範囲内にあるステータス コードにより、この関数がトリガーされます
        // 成功時の処理

        //console.log(response.status);
        return response;
      },
      (error) => {
        // 2xx の範囲外のステータス コードにより、この関数がトリガーされます
        // 失敗時の処理

        //省略可能なプロパティ
        // https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#-%E7%9C%81%E7%95%A5%E5%8F%AF%E8%83%BD%E3%81%AA%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3
        switch (error.response?.status) {
          case 400:
            throw Error('INVALID_TOKEN');
          case 401:
            throw Error('UNAUTHORIZED');
          case 500:
            throw Error('INTERNAL_SERVER_ERROR');
          case 502:
            throw Error('BAD_GATEWAY');
          case 404:
            throw Error('NOT_FOUND');
          default:
            throw Error('UNHANDLED_ERROR');
          // 例外処理
        }
      }
    );

    onMounted(async () => {
      //const response = await fetch(ROOT_URL);
      const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
      //console.log(response);
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
