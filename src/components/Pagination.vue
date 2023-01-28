<template>
  <div class="pagination_wrapper">
    <div ref="nav_ref">
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

    <section class="lists" ref="pagination_area_ref">
      <!-- 書き換える場所 -->
      <section v-for="i in datalist.data" v-bind:key="i.id">
        <a class="list">
          list {{ i.id }} {{ i.txt }}<br />{{ i.txt2 }}<br />{{ i.txt3 }}</a
        >
      </section>
      <!-- 書き換える場所 -->
    </section>

    <div class="page_number" ref="page_number_ref">
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

    // 「nav」要素の高さを取得する用。
    const nav_ref = ref('');

    // タッチスクロール検出対象の要素取得。
    const pagination_area_ref = ref('');

    // 「footer」の高さ。
    const page_number_ref = ref('');

    const onPrevBtn = () => {};
    const onNextBtn = () => {};
    const onDotBtn = () => {};

    // 各paginationの子要素の高さの値を入れる変数。
    let list_elements_height = [];

    // 各ページの表示数を入れる配列。
    let numbers_of_display_contents = [];

    // 高さを取得し計算して分割する関数。
    const division_recalculation = () => {
      console.log('division_recalculation');
      const doc = document;
      const lists = doc.getElementsByClassName('list');
      list_elements_height = [];

      for (let aa = 0; aa < lists.length; aa++) {
        list_elements_height.push(lists[aa].clientHeight);
      }

      //console.log(lists);
      console.log(list_elements_height);

      // ブラウザの表示高さからpaginationの表示数を割り出す処理。
      if (
        nav_ref.value !== '' &&
        pagination_area_ref.value !== '' &&
        page_number_ref.value !== ''
      ) {
        numbers_of_display_contents = [];
        const html = doc.documentElement;
        const nav_area = nav_ref.value;
        const pagination_area = pagination_area_ref.value;
        const page_number_area = page_number_ref.value;

        const html_height = html.clientHeight;
        const nav_area_height = nav_area.clientHeight;
        const pagination_area_height = pagination_area.clientHeight;
        const page_number_area_height = page_number_area.clientHeight;

        console.log(html_height);
        console.log(nav_area_height);
        console.log(pagination_area_height);
        console.log(page_number_area_height);
        const pagination_max_height =
          html_height - nav_area_height - page_number_area_height;
        console.log(pagination_max_height);

        let index = 0;
        let content_height = 0;

        while (
          content_height + list_elements_height[index] <
          pagination_max_height
        ) {
          content_height += list_elements_height[index];
          index++;
        }

        console.log('content_height');
        console.log(content_height);

        numbers_of_display_contents.push(index);
        console.log(numbers_of_display_contents);
      }
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
      nav_ref,
      pagination_area_ref,
      page_number_ref,
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
