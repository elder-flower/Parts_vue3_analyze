<template>
  <section class="box">
    <h1>数値</h1>

    <div class="wrap">
      <label class="label" for="num">{{ menuData.val[0].title }}</label>
      <div class="input">
        <input
          type="number"
          inputmode="numeric"
          name="num"
          id="num"
          required
          size="10"
          min="1"
          max="100"
          value="0"
          step="1"
        />
        <span class="unit">{{ menuData.val[0].token }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive, watch } from 'vue';
export default {
  name: 'NumberInput',
  props: ['data'],

  setup(props) {
    let menuData = reactive({
      val: props.data.val,
    });

    // 以下を追加しないと非同期で受信したデータを子コンポーネントで更新されない。
    watch(
      () => props.data.val,
      (newV) => {
        menuData.val = newV;
      }
    );

    /*
    以下では駄目。
    watch(
      () => props.data,
      (newV) => {
        menuData.val = newV;
      }
    );
    */

    return { menuData };
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  padding: 30px;
  text-align: end;
}
.wrap {
  text-align: start;
}
.input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input input {
  /*
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  */
  width: calc(100% - 2em);
  margin: 0 2em 0 0;
}
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
