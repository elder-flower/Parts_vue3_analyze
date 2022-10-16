<template>
  <div id="wrapper">
    <MyParent your-name="鈴木2"></MyParent>
    <!-- <MyParent your-name="鈴木"></MyParent> -->
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
