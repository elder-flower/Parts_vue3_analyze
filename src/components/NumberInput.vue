<template>
  <section class="box">
    <h1>数値</h1>

    <div class="wrap">
      <label class="label" for="num">data.number</label>
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
        <span class="unit">{{ data.unit }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
  name: 'NumberInput',
  props: ['requestData'],

  setup(props) {
    let data = reactive({
      unit: 'point',
      tit: 'numer',
    });

    //data.value = props.requestData;
    return { data };
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
