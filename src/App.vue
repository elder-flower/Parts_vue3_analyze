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

    const get = async () => {
      //const response = await fetch(ROOT_URL);
      const response = await axios
        .get(
          `${ROOT_URL}/events${QUERYSTRING}`,
          { timeout: 5000 },
          {
            // キャンセルのトークン
            cancelToken: source.token,
          }
        )
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
          } else {
            // handle error
          }
        });
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
    onGetCancel();
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
