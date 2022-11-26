<template>
  <div id="wrapper">
    <NumberInput
      v-bind:data="menuData"
      v-bind:position="position"
      v-on:next-pos="onPos"
      v-on:get-cancel="onGetCancel"
    ></NumberInput>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, reactive, computed } from 'vue';
import NumberInput from './components/NumberInput.vue';

//https://www.google.com/search?q=firefox+webkit-inner-spin-button&lr=lang_ja&sa=X&ved=2ahUKEwjQjdT3_fX6AhX1gVYBHS-pAs4QuAF6BAgIEAE&biw=938&bih=793&dpr=2

// https://qiita.com/mrpero/items/c562cf9c2493bbbfe431

export default {
  name: 'App',
  components: { NumberInput },

  setup() {
    const menuData = reactive({
      val: [
        {
          token: 'point',
          title: 'numer',
          updated_at: 0,
          id: 0,
        },
        {
          token: 'point',
          title: 'numer',
          updated_at: 0,
          id: 1,
        },
        {
          token: 'point',
          title: 'numer',
          updated_at: 0,
          id: 2,
        },
      ],
    });

    //「computed」より関数定義してget後に発動した方が管理しやすい。
    const menuData2 = () => {
      menuData.val.forEach((elem) => {
        //console.log(elem);
        elem.id += 'a';
      });

      //受信したデータのパス変換はここでやった方がよさそう。
    };

    menuData2();

    const position = ref(0);

    // axiosでリクエスト中の処理をキャンセルする
    // https://www.suzu6.net/posts/315-axios-request-cancel/

    // 意外と知られていないJavaScriptライブラリaxiosの7つの設定方法
    // https://iwb.jp/javascript-library-axios-settings/#2_timeout

    const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1';
    const QUERYSTRING = '?token=token123';

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // リクエスト後の処理。
    axios.interceptors.response.use(
      (response) => {
        // 2xx の範囲内にあるステータス コードにより、この関数がトリガーされます
        // 成功時の処理

        //console.log(response.status);
        return response;
      },
      (error) => {
        console.log('error');
        console.log(error);
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        }
        // 2xx の範囲外のステータス コードにより、この関数がトリガーされます
        // 失敗時の処理

        //省略可能なプロパティ
        // https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#-%E7%9C%81%E7%95%A5%E5%8F%AF%E8%83%BD%E3%81%AA%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3
        switch (error.response?.status) {
          case 400:
            console.log(error.message);
            throw Error('INVALID_TOKEN');
          case 401:
            console.log(error.message);
            throw Error('UNAUTHORIZED');
          case 500:
            console.log(error.message);
            throw Error('INTERNAL_SERVER_ERROR');
          case 502:
            console.log(error.message);
            throw Error('BAD_GATEWAY');
          case 404:
            console.log(error.message);
            throw Error('NOT_FOUND');
          default:
            console.log(error.message);
            throw Error('UNHANDLED_ERROR');
          // 例外処理
        }
      }
    );

    const get = async () => {
      //const response = await fetch(ROOT_URL);
      const response = await axios.get(
        `${ROOT_URL}/events${QUERYSTRING}`,
        { timeout: 5000 },
        {
          // キャンセルのトークン
          cancelToken: source.token,
        }
      );
      /*
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
          } else {
            // handle error
          }
        });
        */
      //console.log(response);
      const arr = await response.data;
      console.log(arr);
      menuData.val = arr;
      menuData2();
    };

    const onPos = (num) => {
      /*
      console.log('onPos num');
      console.log(num);
      */
      position.value = num;
    };
    const onGetCancel = () => {
      console.log('onGetCancel');
      source.cancel();
    };
    get();
    //onGetCancel();
    return { menuData, menuData2, onPos, position, onGetCancel };
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
