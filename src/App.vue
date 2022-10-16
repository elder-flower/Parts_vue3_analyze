<template>
  <div id="wrapper">
    <MyHello />
  </div>
</template>

<script>
import MyHello from './components/MyHello.vue';
export default {
  name: 'App',
  components: { MyHello },
  /*
  setup() {
    const name = ref('Vue.js');

    return { name };
  },
  */
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
</style>
