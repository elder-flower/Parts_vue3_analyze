<template>
  <categoryMenu></categoryMenu>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import categoryMenu from './components/categoryMenu.vue';
export default {
  name: 'App',
  components: { categoryMenu },
  setup() {
    const menuData = reactive({ data: {} });
    menuData.data = categroyData;

    return { menuData };
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
      type: 'text',
    },
    {
      menu_id: 'd',
      type: 'text',
    },
    {
      menu_id: 'e',
      type: 'text',
    },
    {
      menu_id: 'f',
      type: 'text',
    },
    {
      menu_id: 'g',
      type: 'text',
    },
    {
      menu_id: 'h',
      type: 'text',
    },
  ],
};
</script>

<style scoped>
div {
  margin: 50px;
}
</style>
