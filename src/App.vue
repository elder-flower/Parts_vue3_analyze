<template>
  <div>
    <!--mouseenter／mouseleaveイベント-->
    <div id="outer" v-on:mouseenter="onmousein" v-on:mouseleave="onmouseout">
      <!--mouseover／mouseoutイベント-->
      <!-- <div id="outer"
    v-on:mouseover="onmousein" v-on:mouseout="onmouseout"> -->

      外（outer）
      <p id="inner">内（innner）</p>
    </div>
    <div v-html="result"></div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'App',
  setup(props, context) {
    let result = ref('');

    const onmousein = (e) => {
      result.value += `Enter:${e.target.id}<br />`;
    };
    const onmouseout = (e) => {
      result.value += `Leave:${e.target.id}<br />`;
    };
    return { result, onmousein, onmouseout };
  },
};
</script>

<style scoped>
#outer {
  height: 200px;
  width: 200px;
  margin-left: 100px;
  padding: 10px;
  border: 1px solid blue;
}

#inner {
  height: 100px;
  width: 100px;
  margin-left: 40px;
  padding: 10px;
  border: 1px solid red;
}
</style>
