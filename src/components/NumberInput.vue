<template>
  <section class="box">
    <h1>数値</h1>

    <div class="wrap">
      <label class="label" for="num">{{ title }}</label>
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
        <span class="unit">{{ token }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive, onBeforeUpdate } from 'vue';
export default {
  name: 'NumberInput',
  props: ['data'],

  setup(props) {
    let reqData = ref(props.data);
    let token = reqData.value[0].token;
    let title = reqData.value[0].title;

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate');
      reqData = ref(props.data);
      token = reqData.value[0].token;
      title = reqData.value[0].title;
    });
    return { reqData, token, title };
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
