<template>
  <div class="pagination_wrapper">
    <div>
      <div class="nav">
        <button
          class="triBtn prevBtn"
          v-on:click="onPrevBtn"
          ref="prevBtn_ref"
        ></button>
        <div class="nav_dot_wrapper">
          <ul class="nav_dot" ref="nav_dot_ref">
            <li v-for="j in dots" v-bind:key="j">
              <button
                v-bind:data-id="j - 1"
                v-on:click="onDotBtn"
                ref="btn_refs"
                v-bind:id="`btn${j - 1}`"
              ></button>
            </li>
          </ul>
        </div>

        <button
          class="triBtn nextBtn"
          v-on:click="onNextBtn"
          ref="nextBtn_ref"
        ></button>
      </div>
    </div>

    <section class="lists" ref="touch_area_ref">
      <!-- 書き換える場所 -->
      <section v-for="i in datalist.data" v-bind:key="i.id">
        <a class="list">
          list {{ i.id }} {{ i.txt }}<br />{{ i.txt2 }}<br />{{ i.txt3 }}</a
        >
      </section>
      <!-- 書き換える場所 -->
    </section>

    <div class="page_number">
      {{ pos + 1 }} / ページ数 : {{ dots }} / ページ毎の表示数 :
      {{ displayNumber }} / 総数 :
      {{ datalist.data.length }}
    </div>
  </div>
</template>
<script>
import {
  ref,
  reactive,
  watch,
  watchEffect,
  onBeforeUpdate,
  onBeforeMount,
  onMounted,
  onUnmounted,
} from 'vue';

export default {
  name: 'PagiNation',
  props: ['datalist', 'start_pos', 'num_of_display'],
  //emits: [''],
  setup(props) {
    const datalist = reactive({ data: [] });
    datalist.data = props.datalist;

    const pos = 0;
    const dots = 0;
    const displayNumber = 0;

    const onPrevBtn = () => {};
    const onNextBtn = () => {};
    const onDotBtn = () => {};

    let list_height_elements = [];

    // 高さを取得し計算して分割する関数。
    const division_recalculation = () => {
      console.log('division_recalculation');
      const doc = document;
      const lists = doc.getElementsByClassName('list');
      list_height_elements = [];

      for (let aa = 0; aa < lists.length; aa++) {
        list_height_elements.push(lists[aa].clientHeight);
      }

      //console.log(lists);
      console.log(list_height_elements);
    };

    watch(
      () => props.datalist,
      (newV) => {
        datalist.data = newV;
        //division_recalculation();
        setTimeout(division_recalculation, 0);
      }
    );

    /*
    watchEffect(() => {
      datalist.data = props.datalist;
      //division_recalculation();
      setTimeout(division_recalculation, 0);
    });
    */

    onMounted(() => {
      division_recalculation();
    });

    // 高さを取得し計算して分割する検証。

    return {
      datalist,
      pos,
      dots,
      displayNumber,
      onPrevBtn,
      onNextBtn,
      onDotBtn,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/pagination/pagination_layout.scss';
@import '@/assets/style/pagination/pagination_btns.scss';
@import '@/assets/style/pagination/pagination_navigation.scss';

@import '@/assets/style/pagination/contents.scss';
@import '@/assets/style/pagination/pagination_contents.scss';
</style>
