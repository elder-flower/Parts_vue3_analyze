<template>
  <div id="wrapper">
    <div id="parent" v-on:click="onParentClick">
      <!-- <div id="parent" v-on:click.capture="onParentClick"> -->
      親要素
      <div id="my" v-on:click="onMyClick">
        <!-- <div id="my" v-on:click.self="onMyClick"> -->
        <!-- <div id="my" v-on:click.capture="onMyClick"> -->
        <!-- <div id="my" v-on:click.stop.self="onMyClick"> -->
        <!-- <div id="my" v-on:click.self.stop="onMyClick"> -->
        現在要素
        <div id="child" v-on:click="onChildClick">
          <!-- <div id="child" v-on:click.stop="onChildClick"> -->
          <!-- <div id="child" v-on:click.capture="onChildClick"> -->
          <!-- <div id="child" v-on:click.capture.stop="onChildClick"> -->
          子要素
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',

  setup() {
    const onParentClick = () => {
      console.log('#parent run...');
    };
    const onMyClick = () => {
      console.log('#my run...');
    };
    const onChildClick = () => {
      console.log('#child run...');
    };

    return { onParentClick, onMyClick, onChildClick };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
div {
  padding: 1em;
  margin: 1em;
}
#parent {
  background: #000;
}
#my {
  background: #411;
}
#child {
  background: #141;
}
</style>
