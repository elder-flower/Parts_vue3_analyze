<template>
  <div id="wrapper">
    <MyParent />
  </div>
</template>

<script>
import MyParent from './components/MyParent.vue';
export default {
  name: 'App',
  components: { MyParent },
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
