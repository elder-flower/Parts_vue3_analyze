<template>
  <div id="wrapper">
    <div class="small" v-bind:class="[colorClass, { frame: isChange }]">
      皆さん、こんにちは！
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  name: 'App',

  setup() {
    const colorClass = ref('color');
    const isChange = ref(true);

    return { colorClass, isChange };
  },
};
</script>

<style scoped>
#wrapper {
  margin: 50px auto;
  width: 90%;
  text-align: center;
}
.color {
  color: #faa;
}
.frame {
  margin: 1em 1em 1em 1em;
}
</style>
