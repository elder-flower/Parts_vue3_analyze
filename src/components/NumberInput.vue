<template>
  <section class="box">
    <h1>数値</h1>

    <div class="wrap">
      <label class="label" for="num">{{ data[position].title }}</label>
      <div class="input">
        <input
          type="text"
          inputmode="text"
          name="num"
          id="num"
          required
          size="10"
          min="1"
          max="100"
          step="1"
          v-bind:value="data[position].updated_at"
        />

        <span class="unit">{{ data[position].token }}</span>
      </div>
      <div class="status">
        <p>{{ data[position].id }}</p>
        <button v-on:click="onNextPos">btn</button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue';
export default {
  name: 'NumberInput',
  props: ['data', 'position'],
  emits: ['nextPos'],
  setup(props, context) {
    let menuData = reactive({
      val: props.data.val,
      pos: props.position,
    });

    /*
    受け取った「props.data.val」を子コンポーネントで加工する場合に問題が発生している。「watch」後の処理とか、「onNextPos」関数の「menuData.val.length」とか。
    親で加工してもらった方が安全。
    */
    /*
    この「computed」はネットワーク受信前のデータで配列の値が1個しかないための初期データの加工処理を施そうとしたが、ref等の段階ですべき事だった。
   */
    const data = computed(() => {
      let arr = [
        {
          title: 'no data0',
          updated_at: 'no data',
          token: 'no data',
          id: 'no data',
        },
        {
          title: 'no data1',
          updated_at: 'no data',
          token: 'no data',
          id: 'no data',
        },
        {
          title: 'no data2',
          updated_at: 'no data',
          token: 'no data',
          id: 'no data',
        },
        {
          title: 'no data3',
          updated_at: 'no data',
          token: 'no data',
          id: 'no data',
        },
      ];
      if (Array.isArray(menuData.val)) {
        arr = menuData.val;
      }
      return arr;
    });

    // 以下を追加しないと非同期で受信したデータを子コンポーネントで更新されない。
    watch(
      () => props.data.val,
      (newV) => {
        menuData.val = newV;
      }
    );
    watch(
      () => props.position,
      (newV) => {
        menuData.pos = newV;
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
    const onNextPos = () => {
      const now = Number(menuData.pos);
      let next;
      if (now >= menuData.val.length - 1) {
        next = 0;
      } else {
        next = now + 1;
      }
      context.emit('nextPos', Number(next));
    };

    return { menuData, onNextPos, data };
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  padding: 30px;
  text-align: end;
}
.status {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.status button {
  margin: 1em 0 1em auto;
  display: block;
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
