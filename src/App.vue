<template>
  <section>
    <template v-if="menuData.data.type === 'categroy'">
      <categoryMenu
        v-bind:menu="menuData"
        v-on:select="onNavigate"
      ></categoryMenu
    ></template>
    <template v-else-if="menuData.data.type !== 'categroy'"
      ><child v-bind:menu="menuData" v-on:select="onNavigate2"></child
    ></template>
  </section>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import categoryMenu from './components/categoryMenu.vue';
import child from './components/Child.vue';
export default {
  name: 'App',
  components: { categoryMenu, child },
  setup() {
    const menuData = reactive({
      data: {},
      previewID: '',
    });
    menuData.data = categroyData;

    const onNavigate = (arg) => {
      console.log('App onNavigate');

      const arr = categroyData.children.filter(
        (val) => val.menu_id === arg.menu_id
      );

      menuData.data = arr[0];
      menuData.previewID = arg.menu_id;

      console.log('App menuData');
      console.log(menuData);
    };

    const onNavigate2 = () => {
      //menuData.data = {};
      menuData.data = categroyData;
    };

    return { menuData, onNavigate, onNavigate2 };
  },
};

const categroyData = {
  type: 'categroy',
  children: [
    {
      menu_id: 'a',
      type: 'number',
    },
    {
      menu_id: 'b',
      type: 'text',
    },
    {
      menu_id: 'c',
      type: 'text2',
    },
    {
      menu_id: 'd',
      type: 'text2',
    },
    {
      menu_id: 'e',
      type: 'text2',
    },
    {
      menu_id: 'f',
      type: 'text2',
    },
    {
      menu_id: 'g',
      type: 'text2',
    },
    {
      menu_id: 'h',
      type: 'text2',
    },
    {
      menu_id: 'i',
      type: 'text2',
    },
    {
      menu_id: 'j',
      type: 'text2',
    },
    {
      menu_id: 'k',
      type: 'text2',
    },
    {
      menu_id: 'l',
      type: 'text2',
    },
    {
      menu_id: 'm',
      type: 'text2',
    },
    {
      menu_id: 'n',
      type: 'text2',
    },
    {
      menu_id: 'o',
      type: 'text2',
    },

    {
      menu_id: 'p',
      type: 'text2',
    },
    {
      menu_id: 'q',
      type: 'text2',
    },
    {
      menu_id: 'r',
      type: 'text2',
    },
    {
      menu_id: 's',
      type: 'text2',
    },
    {
      menu_id: 't',
      type: 'text2',
    },
    {
      menu_id: 'u',
      type: 'text2',
    },
    {
      menu_id: 'w',
      type: 'text2',
    },
    {
      menu_id: 'x',
      type: 'text2',
    },

    {
      menu_id: 'y',
      type: 'text2',
    },
    {
      menu_id: 'z',
      type: 'text2',
    },
  ],
};
</script>

<style scoped>
div {
  margin: 50px;
}
</style>
