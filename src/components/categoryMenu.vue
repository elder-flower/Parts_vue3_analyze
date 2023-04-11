<template>
  <main id="main">
    <Pagination
      v-bind:datalist="menuData?.data?.children"
      v-bind:start_pos="start_position"
      v-bind:num_of_display="number_of_display_contents"
    >
      <template v-slot:default="slotProp">
        <section
          v-for="i in slotProp.list"
          v-bind:key="i.id"
          v-on:click="onSelect(i.type)"
        >
          <a class="list"> {{ i.menu_id }} {{ i.type }} </a>
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
    const menuData = reactive({ data: {} });
    menuData.data = props.menu?.data ? props.menu?.data : {};

    console.log('props.menu');
    console.log(props.menu);

    const onSelect = (arg) => {
      console.log('onSelect');
      console.log(arg);
      context.emit('select', arg);
    };
    // 「pagination」の基本設定。

    // 初期化時に表示するページ位置。
    const start_position = ref(0);

    // 1ページに表示するコンテンツ数。
    let number_of_display_contents = ref(7);
    // /「pagination」の基本設定。

    return { menuData, start_position, number_of_display_contents, onSelect };
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/pagination/contents.scss';
@import '@/assets/style/pagination/pagination_contents.scss';
</style>
