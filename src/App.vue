<template>
  <section>
    <template v-if="menuData.data.type === 'categroy'">
      <categoryMenu
        v-bind:menu="menuData"
        v-on:select="onNavigate"
      ></categoryMenu
    ></template>
    <template v-else-if="menuData.data.type === 'number'"
      ><child v-bind:menu="menuData" v-on:select="onNavigate2"></child
    ></template>
    <template v-else-if="menuData.data.type === 'text'">
      <child v-bind:menu="menuData" v-on:select="onNavigate2"></child>
    </template>
    <template v-else-if="menuData.data.type === 'text2'">
      <child v-bind:menu="menuData" v-on:select="onNavigate2"></child>
    </template>
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
    const menuData = reactive({ data: {} });
    menuData.data = categroyData;

    const onNavigate = (arg_type) => {
      console.log('onNavigate');
      console.log(arg_type);

      const arr = categroyData.children.filter((val) => val.type === arg_type);

      menuData.data = arr[0];
      console.log(menuData.data);
    };

    const onNavigate2 = () => {
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
  ],
};
</script>

<style scoped>
div {
  margin: 50px;
}
</style>
