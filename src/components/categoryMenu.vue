<template>
  <main id="main">
    <Pagination
      v-bind:datalist="menuData?.data?.children"
      v-bind:contents_pos="contents_position"
      v-bind:class_name="class_name"
    >
      <template v-slot:default="slotProp">
        <!-- 書き換える場所 -->
        <section
          v-for="i in slotProp.list"
          v-bind:key="i.id"
          v-on:click="onSelect(i)"
        >
          <a class="list"> {{ i.menu_id }} {{ i.type }} </a>
        </section>
        <!-- 書き換える場所 -->
      </template>
      <!--  計測用のラッパー要素 -->
      <template v-slot:measurement="slotProp">
        <!--「Pagination」に渡された全データを生成する処理。-->
        <section
          v-for="i in slotProp.list"
          v-bind:key="i.id"
          v-on:click="onSelect(i)"
        >
          <a class="list measurement_list"> {{ i.menu_id }} {{ i.type }} </a>
        </section>
      </template></Pagination
    >
  </main>
</template>

<script>
//import Velocity from 'velocity-animate';
import { ref, reactive } from 'vue';
import Pagination from './Pagination.vue';

export default {
  name: 'categoryMenu',
  props: ['menu'],
  components: { Pagination },

  setup(props, context) {
    const menuData = reactive({ data: {}, previewID: '' });
    menuData.data = props.menu?.data ? props.menu?.data : {};
    menuData.previewID = props.menu?.previewID ? props.menu?.previewID : '';

    // console.log('categoryMenu menuData');
    // console.log(menuData);

    const onSelect = (arg) => {
      console.log('categoryMenu onSelect');
      context.emit('select', arg);
    };
    // 「pagination」の基本設定。

    // 「pagination」の基本設定。

    // 初期化時に表示するコンテンツの配列のindex位置。
    const contents_position = ref(0);

    // 計測用に取得する要素に指定するクラス名。
    const class_name = 'measurement_list';

    //「子からCategoryMenu」に戻った時の「子のコンテンツの位置」。
    let contents_index = menuData.data.children.findIndex(
      (val) => val.menu_id == menuData.previewID
    );

    if (contents_index < 0) {
      contents_index = 0;
    }

    contents_position.value = contents_index;

    return {
      menuData,
      contents_position,
      class_name,
      onSelect,
    };
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/pagination/contents.scss';
@import '@/assets/style/pagination/pagination_contents.scss';
</style>
