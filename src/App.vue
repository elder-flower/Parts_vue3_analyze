<template>
  <div>
    <img
      v-bind:src="path"
      alt="ロゴ画像"
      v-on:mouseenter="onmouseenter"
      v-on:mouseleave="onmouseleave"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup(props, context) {
    let path = ref('https://www.web-deli.com/image/linkbanner_l.gif');

    onmouseenter = () => {
      path.value = 'https://www.web-deli.com/image/home_chara.gif';
    };
    onmouseleave = () => {
      path.value = 'https://www.web-deli.com/image/linkbanner_l.gif';
    };
    return { path, onmouseenter, onmouseleave };
  },
};
</script>

<style scoped>
div {
  margin: 50px;
}
</style>
