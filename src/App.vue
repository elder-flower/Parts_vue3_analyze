<template>
  <div id="main" v-on:mousemove="onmousemove">
    screen: {{ screenX }}/{{ screenY }}<br />
    page: {{ pageX }}/{{ pageY }}<br />
    client: {{ clientX }}/{{ clientY }}<br />
    offset: {{ offsetX }}/{{ offsetY }}
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const screenX = ref(0);
    const screenY = ref(0);
    const pageX = ref(0);
    const pageY = ref(0);
    const clientX = ref(0);
    const clientY = ref(0);
    const offsetX = ref(0);
    const offsetY = ref(0);

    const onmousemove = (e) => {
      screenX.value = e.screenX;
      screenY.value = e.screenY;
      pageX.value = e.pageX;
      pageY.value = e.pageY;
      clientX.value = e.clientX;
      clientY.value = e.clientY;
      offsetX.value = e.offsetX;
      offsetY.value = e.offsetY;
    };
    return {
      screenX,
      screenY,
      pageX,
      pageY,
      clientX,
      clientY,
      offsetX,
      offsetY,
      onmousemove,
    };
  },
};
</script>

<style scoped>
#main {
  position: absolute;
  margin: 50px;
  top: 20px;
  left: 20px;
  height: 150px;
  width: 500px;
  border: solid 1px #000;
}
</style>
